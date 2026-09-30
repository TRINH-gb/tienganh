import { VocabularyItem, VocabCategory, QuizQuestion, WordDeepDive, CefrLevel } from '../types';

export const API_KEY_STORAGE_KEY = 'evm_gemini_api_key';
export const MODEL_STORAGE_KEY = 'evm_gemini_model';

export const SUPPORTED_MODELS = [
  {
    id: 'gemini-3-flash-preview',
    name: 'Gemini 3 Flash Preview',
    tag: 'Mặc định (Default)',
    description: 'Tốc độ phản hồi cực nhanh, tối ưu bóc tách ngữ liệu đề thi THPT và chi phí quota.',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'gemini-3-pro-preview',
    name: 'Gemini 3 Pro Preview',
    tag: 'Suy luận sâu',
    description: 'Mô hình mạnh mẽ nhất, suy luận ngôn ngữ học sâu sắc, phân tích bẫy đề thi sắc bén.',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    tag: 'Dự phòng ổn định',
    description: 'Hạn ngạch ổn định cao, đảm bảo hoạt động liên tục khi các model preview bận rộn.',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
  }
];

export const DEFAULT_MODEL_ID = 'gemini-3-flash-preview';

export const FALLBACK_CHAIN = [
  'gemini-3-flash-preview',
  'gemini-3-pro-preview',
  'gemini-2.5-flash'
];

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  const localKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  if (localKey && localKey.trim()) return localKey.trim();
  // Fallback to Vite env if provided
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (envKey && typeof envKey === 'string' && envKey.trim()) {
    return envKey.trim();
  }
  return '';
}

export function setStoredApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
  }
}

export function getStoredModel(): string {
  if (typeof window === 'undefined') return DEFAULT_MODEL_ID;
  const saved = localStorage.getItem(MODEL_STORAGE_KEY);
  if (saved && SUPPORTED_MODELS.some((m) => m.id === saved)) {
    return saved;
  }
  return DEFAULT_MODEL_ID;
}

export function setStoredModel(modelId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(MODEL_STORAGE_KEY, modelId);
  }
}

export const SYSTEM_INSTRUCTION_EVM = `You are an AI English Exam Vocabulary Architect (EVM) - an applied linguistics and English pedagogy specialist focused on Vietnam's National High School Graduation Exam (Kỳ thi Tốt nghiệp THPT Quốc Gia môn Tiếng Anh).

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

/**
 * Extracts and parses JSON from raw Gemini output that might be wrapped in markdown code blocks.
 */
function extractJsonFromText(rawText: string): any {
  let cleaned = rawText.trim();
  // Remove markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\r?\n?/, '').replace(/\r?\n?```$/, '').trim();
  }
  // Try direct parse
  try {
    return JSON.parse(cleaned);
  } catch (initialErr) {
    // Look for first '{' or '[' and last '}' or ']'
    const firstBrace = cleaned.indexOf('{');
    const firstBracket = cleaned.indexOf('[');
    let startIdx = -1;
    if (firstBrace !== -1 && firstBracket !== -1) {
      startIdx = Math.min(firstBrace, firstBracket);
    } else if (firstBrace !== -1) {
      startIdx = firstBrace;
    } else {
      startIdx = firstBracket;
    }

    const lastBrace = cleaned.lastIndexOf('}');
    const lastBracket = cleaned.lastIndexOf(']');
    const endIdx = Math.max(lastBrace, lastBracket);

    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      const slice = cleaned.slice(startIdx, endIdx + 1);
      return JSON.parse(slice);
    }
    throw initialErr;
  }
}

/**
 * Direct call to Google Gemini REST API
 */
async function callGeminiDirect(
  model: string,
  apiKey: string,
  prompt: string,
  systemInstruction: string = SYSTEM_INSTRUCTION_EVM
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload: any = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2
    }
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let errCode = response.status;
    let errStatus = '';
    let errMsg = '';
    try {
      const errData = await response.json();
      if (errData.error) {
        errCode = errData.error.code || errCode;
        errStatus = errData.error.status || '';
        errMsg = errData.error.message || '';
      }
    } catch {
      errMsg = await response.text().catch(() => 'Network/HTTP error');
    }

    const formattedError = `[${errCode} ${errStatus}] ${errMsg || `HTTP ${response.statusText}`}`;
    throw new Error(formattedError);
  }

  const result = await response.json();
  const textOutput = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('Gemini model không trả về nội dung.');
  }

  return textOutput;
}

/**
 * Executes a call with automatic fallback retry across models in FALLBACK_CHAIN.
 * Retains step context and notifies callers when falling back.
 */
export async function executeWithFallback<T>(
  taskFn: (model: string, apiKey: string) => Promise<T>,
  onFallback?: (failedModel: string, nextModel: string, error: string) => void
): Promise<T> {
  const apiKey = getStoredApiKey();
  if (!apiKey) {
    throw new Error('Chưa thiết lập Gemini API Key. Vui lòng nhấn "Lấy API key để sử dụng app" trên thanh điều hướng để nhập key.');
  }

  const preferredModel = getStoredModel();
  // Build model try order: preferred model first, then the remaining models in fallback chain
  const modelsToTry: string[] = [preferredModel];
  for (const m of FALLBACK_CHAIN) {
    if (!modelsToTry.includes(m)) {
      modelsToTry.push(m);
    }
  }

  let lastError: Error | null = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    try {
      return await taskFn(currentModel, apiKey);
    } catch (err: any) {
      lastError = err;
      const errorMsg = err?.message || String(err);
      console.warn(`[EVM Gemini Service] Model ${currentModel} failed:`, errorMsg);

      if (i < modelsToTry.length - 1) {
        const nextModel = modelsToTry[i + 1];
        if (onFallback) {
          onFallback(currentModel, nextModel, errorMsg);
        }
      }
    }
  }

  // If all models failed, throw the verbatim error from the last model
  throw (
    lastError ||
    new Error('Tất cả các model AI trong danh sách dự phòng đều thất bại. Vui lòng kiểm tra lại API Key hoặc quota.')
  );
}

/**
 * Lightweight test to verify an API Key with a model.
 */
export async function testApiKey(
  apiKey: string,
  model: string = DEFAULT_MODEL_ID
): Promise<{ success: boolean; message: string }> {
  if (!apiKey || !apiKey.trim()) {
    return { success: false, message: 'Vui lòng nhập API Key.' };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Respond with JSON: {"status":"ok"}' }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const code = errData.error?.code || response.status;
      const status = errData.error?.status || '';
      const msg = errData.error?.message || response.statusText;
      return {
        success: false,
        message: `[${code} ${status}] ${msg}`
      };
    }

    return { success: true, message: `Kết nối thành công với ${model}!` };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Lỗi mạng hoặc không thể kết nối tới Google AI Studio.'
    };
  }
}

/**
 * Task 1: Extract Vocabulary from Exam Text with multi-step support
 */
export interface ExtractionResult {
  summary: string;
  vocabulary: VocabularyItem[];
}

export async function extractVocabularyWithFallback(
  examText: string,
  examTitle: string,
  categories: VocabCategory[],
  onStepProgress?: (step: 1 | 2 | 3, status: 'running' | 'completed' | 'failed', message?: string) => void,
  onModelFallback?: (failedModel: string, nextModel: string, error: string) => void
): Promise<ExtractionResult> {
  const categoryConstraint =
    categories && categories.length > 0
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

Return between 8 and 25 most valuable vocabulary items.
Ensure the response is valid JSON matching this schema:
{
  "summary": "Brief pedagogical overview of the vocabulary difficulty and thematic focus of this exam text in Vietnamese.",
  "vocabulary": [
    {
      "type": "Collocation",
      "term": "make a decision",
      "ipa": "/meɪk ə dɪˈsɪʒn/",
      "meaning": "đưa ra quyết định",
      "context": "She had to **make a decision** about her career.",
      "cefrLevel": "B1",
      "examTip": "Đi với động từ 'make', bẫy đề thi thường thay bằng 'do a decision' (sai)."
    }
  ]
}`;

  if (onStepProgress) onStepProgress(1, 'running', 'Đang phân tích cấu trúc & ngữ liệu bài thi...');

  try {
    const rawText = await executeWithFallback(async (model, apiKey) => {
      return await callGeminiDirect(model, apiKey, prompt);
    }, onModelFallback);

    if (onStepProgress) onStepProgress(1, 'completed', 'Đã phân tích xong cấu trúc ngữ liệu.');
    if (onStepProgress) onStepProgress(2, 'running', 'Đang phân tách 5 nhóm từ vựng & IPA chuẩn hóa...');

    const parsed = extractJsonFromText(rawText);
    if (!parsed.vocabulary || !Array.isArray(parsed.vocabulary)) {
      throw new Error('Dữ liệu phân tích trả về không đúng cấu trúc danh sách từ vựng.');
    }

    if (onStepProgress) onStepProgress(2, 'completed', 'Đã phân loại thành công các nhóm từ vựng.');
    if (onStepProgress) onStepProgress(3, 'running', 'Đang tổng hợp mẹo thi THPT & hoàn tất sổ từ...');

    const formatted: VocabularyItem[] = parsed.vocabulary.map((item: any, idx: number) => ({
      id: `extracted-${Date.now()}-${idx}`,
      term: String(item.term || '').trim(),
      type: (item.type || 'Single word') as VocabCategory,
      ipa: String(item.ipa || ''),
      meaning: String(item.meaning || ''),
      context: String(item.context || ''),
      cefrLevel: (item.cefrLevel || 'B2') as CefrLevel,
      examTip: String(item.examTip || ''),
      sourceExam: examTitle,
      status: 'Chưa thuộc',
      interactionCount: 0,
      quizCorrectCount: 0,
      quizTotalCount: 0,
      addedAt: new Date().toISOString()
    }));

    if (onStepProgress) onStepProgress(3, 'completed', 'Quy trình hoàn tất!');

    return {
      summary: parsed.summary || 'Đã phân tích và trích xuất thành công ngữ liệu đề thi.',
      vocabulary: formatted
    };
  } catch (err: any) {
    // If extraction failed, mark active steps as failed
    if (onStepProgress) {
      onStepProgress(2, 'failed', 'Đã dừng do lỗi');
      onStepProgress(3, 'failed', 'Đã dừng do lỗi');
    }
    throw err;
  }
}

/**
 * Task 2: Generate AI Quiz from vocabulary items
 */
export async function generateQuizWithFallback(
  vocabularyList: VocabularyItem[],
  count: number = 5,
  questionTypes: string[] = ['Fill-in-the-blank', 'Synonyms/Antonyms', 'Sentence Completion'],
  onModelFallback?: (failedModel: string, nextModel: string, error: string) => void
): Promise<QuizQuestion[]> {
  const typesFilter = questionTypes && questionTypes.length > 0
    ? questionTypes.join(', ')
    : 'Fill-in-the-blank, Synonyms/Antonyms, Sentence Completion';

  const vocabSummary = vocabularyList.slice(0, 30).map((v) => ({
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
   - id: unique string id
   - type: 'Fill-in-the-blank' | 'Synonyms/Antonyms' | 'Sentence Completion'
   - subtype: 'Synonym' | 'Antonym' | 'None'
   - targetTerm: the exact word/collocation being tested
   - question: The full sentence with the prompt
   - options: object with keys 'A', 'B', 'C', 'D'
   - correctAnswer: 'A' | 'B' | 'C' | 'D'
   - explanation: Thorough, encouraging explanation in Vietnamese detailing why the correct answer fits and what each distractor means.

Return a JSON object with:
{
  "questions": [
    {
      "id": "q1",
      "type": "Sentence Completion",
      "subtype": "None",
      "targetTerm": "make a decision",
      "question": "Students must _______ a decision regarding their university preferences before July.",
      "options": {
        "A": "take",
        "B": "make",
        "C": "do",
        "D": "bring"
      },
      "correctAnswer": "B",
      "explanation": "Cụm cố định (Collocation) chuẩn là 'make a decision' (đưa ra quyết định). Các đáp án khác không kết hợp tự nhiên với 'decision'."
    }
  ]
}`;

  const rawText = await executeWithFallback(async (model, apiKey) => {
    return await callGeminiDirect(model, apiKey, prompt);
  }, onModelFallback);

  const parsed = extractJsonFromText(rawText);
  if (!parsed.questions || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('Dữ liệu câu hỏi trắc nghiệm không hợp lệ.');
  }

  return parsed.questions;
}

/**
 * Task 3: Expand single word deep dive
 */
export async function expandWordWithFallback(
  term: string,
  context?: string,
  onModelFallback?: (failedModel: string, nextModel: string, error: string) => void
): Promise<WordDeepDive> {
  const prompt = `Provide an in-depth linguistic and pedagogical breakdown for the vocabulary item "${term}" tailored for Vietnam National High School Exam (THPT Quốc Gia).
${context ? `Context in exam: "${context}"` : ''}

Include:
1. Word family (Noun, Verb, Adjective, Adverb forms with meaning)
2. High-frequency collocations & idioms often seen in THPT exams
3. Common exam traps (Bẫy đề thi - e.g. easily confused words like economic/economical, sensitive/sensible, etc.)
4. 2 high-yield sample sentences with Vietnamese translations

Return valid JSON in this exact structure:
{
  "term": "${term}",
  "wordFamily": [
    { "pos": "Noun", "word": "example", "meaning": "ví dụ" }
  ],
  "commonCollocations": [
    { "phrase": "example phrase", "meaning": "nghĩa", "example": "câu ví dụ" }
  ],
  "examTraps": [
    "Lưu ý bẫy đề thi thường gặp..."
  ],
  "sampleSentences": [
    { "en": "English sentence", "vi": "Bản dịch tiếng Việt" }
  ]
}`;

  const rawText = await executeWithFallback(async (model, apiKey) => {
    return await callGeminiDirect(model, apiKey, prompt);
  }, onModelFallback);

  const parsed = extractJsonFromText(rawText);
  return parsed as WordDeepDive;
}
