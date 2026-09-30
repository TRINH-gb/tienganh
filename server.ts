import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION_EVM = `You are an AI English Exam Vocabulary Architect (EVM) - an applied linguistics and English pedagogy specialist focused on Vietnam's National High School Graduation Exam (Kỳ thi Tốt nghiệp THPT Quốc Gia môn Tiếng Anh).

Your role is a learning coordinator and corpus analysis architect:
1. Analysis & Extraction: Identify linguistic components from exam texts into 5 core categories:
   - Single words: Single words of B1-C1 difficulty according to CEFR common in reading comprehension, sentence completion, or vocabulary questions.
   - Phrasal verbs: Multi-word verbs (e.g. bring about, take after, look into).
   - Collocations: Natural co-occurrences of words (e.g. make a decision, reach an agreement, fulfill a requirement).
   - Idioms: Idiomatic expressions appearing in readings or conversational exchanges (e.g. burn the midnight oil, a drop in the ocean).
   - Prepositions: Dependent prepositions & prepositional phrases (e.g. fond of, independent of, at the expense of).

2. Contextualization:
   - Provide standard International Phonetic Alphabet (IPA) in Oxford/Cambridge standard.
   - Vietnamese translation strictly accurate to the context in the exam.
   - Original exam context sentence preserving original sentence from the text with the target word/phrase bolded or highlighted.
   - Pedagogical notes: CEFR level, collocations, or common exam traps (bẫy đề thi THPT).

3. Tone: Professional, academic, supportive, bilingual English-Vietnamese.`;

// API: Extract Vocabulary from Exam Text
app.post('/api/extract-vocabulary', async (req, res) => {
  try {
    const { examText, examTitle, categories } = req.body;

    if (!examText || typeof examText !== 'string' || !examText.trim()) {
      return res.status(400).json({ error: 'Nội dung đề thi không được để trống.' });
    }

    const categoryConstraint = categories && Array.isArray(categories) && categories.length > 0
      ? `Focus particularly on these categories: ${categories.join(', ')}.`
      : `Categorize all items into the 5 standard categories: 'Single word', 'Phrasal verb', 'Collocation', 'Idiom', 'Preposition'.`;

    const prompt = `Analyze the following English exam text/questions. Extract key vocabulary items suitable for students preparing for the Vietnam National High School Graduation Exam (Tốt nghiệp THPT).

${categoryConstraint}

Exam title/source: ${examTitle || 'Đề thi trích dẫn'}
Exam Content:
"""
${examText.slice(0, 15000)}
"""

Extract high-yield items. For each item:
- type: Exactly one of ['Single word', 'Phrasal verb', 'Collocation', 'Idiom', 'Preposition']
- term: The exact target word or phrase in root/canonical form
- ipa: International Phonetic Alphabet (e.g. /meɪk ə dɪˈsɪʒn/)
- meaning: Precise Vietnamese translation in this exam context
- context: The exact or faithfully reproduced sentence from the exam where it appeared, with the term surrounded by **bold** (e.g. "After much thought, she had to **make a decision** about her major.")
- cefrLevel: CEFR difficulty level ('B1', 'B2', 'C1')
- examTip: Short pedagogical note or tip in Vietnamese (e.g. bẫy dễ nhầm lẫn, từ đồng nghĩa hoặc giới từ đi kèm hay gặp trong đề THPT)

Return between 8 and 25 most valuable vocabulary items.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_EVM,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: 'Brief pedagogical overview of the vocabulary difficulty and thematic focus of this exam text in Vietnamese.'
            },
            vocabulary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: {
                    type: Type.STRING,
                    description: "Category: 'Single word', 'Phrasal verb', 'Collocation', 'Idiom', or 'Preposition'"
                  },
                  term: {
                    type: Type.STRING,
                    description: 'Vocabulary term or phrase'
                  },
                  ipa: {
                    type: Type.STRING,
                    description: 'IPA phonetic transcription'
                  },
                  meaning: {
                    type: Type.STRING,
                    description: 'Vietnamese contextual translation'
                  },
                  context: {
                    type: Type.STRING,
                    description: 'Original sentence from the exam with the term in bold markdown'
                  },
                  cefrLevel: {
                    type: Type.STRING,
                    description: 'Estimated CEFR level: B1, B2, or C1'
                  },
                  examTip: {
                    type: Type.STRING,
                    description: 'Vietnamese pedagogical exam note or tip'
                  }
                },
                required: ['type', 'term', 'ipa', 'meaning', 'context', 'cefrLevel']
              }
            }
          },
          required: ['summary', 'vocabulary']
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini model did not return text response.');
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/extract-vocabulary:', error);
    return res.status(500).json({
      error: error.message || 'Lỗi xử lý trích xuất từ vựng từ đề thi.'
    });
  }
});

// API: Generate AI Quiz from User's Personal Vocabulary List
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { vocabularyList, count = 5, questionTypes } = req.body;

    if (!Array.isArray(vocabularyList) || vocabularyList.length === 0) {
      return res.status(400).json({ error: 'Danh sách từ vựng cá nhân không được để trống.' });
    }

    const typesFilter = questionTypes && questionTypes.length > 0
      ? questionTypes.join(', ')
      : 'Fill-in-the-blank, Synonyms/Antonyms, Sentence Completion';

    const vocabSummary = vocabularyList.slice(0, 30).map((v: any) => ({
      term: v.term,
      type: v.type,
      meaning: v.meaning,
      context: v.context
    }));

    const prompt = `Act as the EVM Architect to create high-quality multiple choice exam questions strictly following the format of Vietnam's National High School Graduation Exam (Tốt nghiệp THPT).

USER'S TARGET VOCABULARY LIST:
${JSON.stringify(vocabSummary, null, 2)}

SPECIFICATIONS:
1. Target Question Types to generate: ${typesFilter}
   - 'Fill-in-the-blank': Create a rich, clear contextual sentence with a blank (e.g. "_______") requiring the exact target word/phrase.
   - 'Synonyms/Antonyms': Closest in meaning (Synonym) or Opposite in meaning (Antonym) with the target vocabulary underlined or capitalized in a full contextual sentence.
   - 'Sentence Completion': Test grammatical usage, dependent preposition, or collocation in a complete sentence.
2. IMPORTANT RULE: Only test vocabulary items from the user's provided list! Distractors (wrong options) can be other natural English words/collocations appropriate for THPT level.
3. Number of questions to generate: ${Math.min(Number(count) || 5, 15)}
4. Each question must have:
   - type: 'Fill-in-the-blank' | 'Synonyms/Antonyms' | 'Sentence Completion'
   - subtype: 'Synonym' | 'Antonym' | 'None'
   - targetTerm: the exact word/collocation being tested
   - question: The full sentence with the prompt (e.g., "Mark the letter A, B, C, or D to indicate the word(s) CLOSEST in meaning to the underlined word in the following question: ...")
   - options: object with keys 'A', 'B', 'C', 'D'
   - correctAnswer: 'A' | 'B' | 'C' | or 'D'
   - explanation: Thorough, encouraging explanation in Vietnamese detailing why the correct answer fits and what each distractor means.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_EVM,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  subtype: { type: Type.STRING },
                  targetTerm: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.OBJECT,
                    properties: {
                      A: { type: Type.STRING },
                      B: { type: Type.STRING },
                      C: { type: Type.STRING },
                      D: { type: Type.STRING },
                    },
                    required: ['A', 'B', 'C', 'D']
                  },
                  correctAnswer: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ['id', 'type', 'targetTerm', 'question', 'options', 'correctAnswer', 'explanation']
              }
            }
          },
          required: ['questions']
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Gemini model did not return text response.');
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/generate-quiz:', error);
    return res.status(500).json({
      error: error.message || 'Lỗi tạo bài tập trắc nghiệm AI.'
    });
  }
});

// API: Expand single word (deep dive into word family, exam collocations, common traps)
app.post('/api/expand-word', async (req, res) => {
  try {
    const { term, context } = req.body;
    if (!term) {
      return res.status(400).json({ error: 'Từ vựng không được để trống.' });
    }

    const prompt = `Provide an in-depth linguistic and pedagogical breakdown for the vocabulary item "${term}" tailored for Vietnam National High School Exam (THPT Quốc Gia).
${context ? `Context in exam: "${context}"` : ''}

Include:
1. Word family (Noun, Verb, Adjective, Adverb forms with meaning)
2. High-frequency collocations & idioms often seen in THPT exams
3. Common exam traps (Bẫy đề thi - e.g. easily confused words like economic/economical, sensitive/sensible, etc.)
4. 2 high-yield sample sentences with Vietnamese translations`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_EVM,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            term: { type: Type.STRING },
            wordFamily: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  pos: { type: Type.STRING, description: 'Part of speech: Noun, Verb, Adj, Adv' },
                  word: { type: Type.STRING },
                  meaning: { type: Type.STRING }
                },
                required: ['pos', 'word', 'meaning']
              }
            },
            commonCollocations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phrase: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                  example: { type: Type.STRING }
                },
                required: ['phrase', 'meaning', 'example']
              }
            },
            examTraps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            sampleSentences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  en: { type: Type.STRING },
                  vi: { type: Type.STRING }
                },
                required: ['en', 'vi']
              }
            }
          },
          required: ['term', 'wordFamily', 'commonCollocations', 'examTraps', 'sampleSentences']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/expand-word:', error);
    return res.status(500).json({ error: error.message || 'Lỗi tra cứu mở rộng từ vựng.' });
  }
});

// Setup Vite middlewares in development or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[EVM Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
