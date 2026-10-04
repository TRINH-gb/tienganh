import { VocabularyItem, VocabCategory, QuizQuestion, WordDeepDive, CefrLevel } from '../types';

export const API_KEY_STORAGE_KEY = 'evm_gemini_api_key';
export const MODEL_STORAGE_KEY = 'evm_gemini_model';

export const SUPPORTED_MODELS = [
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    tag: 'Mặc định (Khuyên dùng)',
    description: 'Thế hệ mới nhất, phản hồi siêu tốc, tối ưu ngữ liệu đề thi THPT.',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    tag: 'Ổn định cao',
    description: 'Mô hình tốc độ cao, hạn ngạch rộng, xử lý mượt mà và bền bỉ.',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    tag: 'Dự phòng chuyên sâu',
    description: 'Tư duy học thuật chuyên sâu, phân tích cấu trúc đề thi chuẩn xác.',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

export const DEFAULT_MODEL_ID = 'gemini-2.0-flash';

export const FALLBACK_CHAIN = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro'
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
  // Auto-migrate away from deprecated, preview, or invalid model names
  if (
    !saved ||
    saved.includes('3.8') ||
    saved.includes('3-') ||
    saved.includes('2.5') ||
    saved.includes('-preview') ||
    !SUPPORTED_MODELS.some((m) => m.id === saved)
  ) {
    localStorage.setItem(MODEL_STORAGE_KEY, DEFAULT_MODEL_ID);
    return DEFAULT_MODEL_ID;
  }
  return saved;
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

3. Tone: Professional, academic, supportive, bilingual English-Vietnamese.

4. Academic Exam Vocabulary Proposal Standards:
   - All synonym and antonym suggestions must be authentic, highly accurate to the specific sentence context, and strictly conform to CEFR B1-C1 standards for Vietnam's National High School Graduation Exam (THPT Quốc Gia).
   - Closed-Loop Lexical Bank: Once a contextual synonym/antonym family is established for a word, questions testing that word in new quiz rounds must select answers from this verified family.

5. Strict Grammatical Form Concordance (Quy tắc tương hợp dạng từ):
   - In multiple-choice questions (especially Synonyms, Antonyms, and Sentence Completion), options and correct answers MUST match the exact inflection of the target word in context (e.g. plural noun 'fluctuations' requires plural options 'variations'; past tense 'manipulated' requires past options 'controlled').
   - The Substitution Test: Replacing the target word in the sentence with the correct answer must always produce a 100% grammatically perfect sentence.

6. Comprehensive Synonym/Antonym Coverage Across All Lexical Types:
   - In Vietnam's National High School Graduation Exam, Synonym (CLOSEST) and Antonym (OPPOSITE) questions test BOTH single words AND multi-word expressions (Phrasal verbs, Collocations, Idioms, Prepositional phrases).
   - Every vocabulary item in the user's notebook regardless of type can and must be tested in Closest/Opposite formats.`;

/**
 * Extracts and parses JSON from raw Gemini output that might be wrapped in markdown code blocks.
 */
function extractJsonFromText(rawText: string): any {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Phản hồi từ AI rỗng.');
  }

  const cleaned = rawText.trim();

  // Try direct parse first
  try {
    return JSON.parse(cleaned);
  } catch {
    // Continue to extract
  }

  // Extract from markdown code fences if present anywhere in the text
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch && fenceMatch[1]) {
    const candidate = fenceMatch[1].trim();
    try {
      return JSON.parse(candidate);
    } catch {
      // Continue to bracket matcher
    }
  }

  // Check for outermost object {...}
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const candidate = cleaned.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch {
      try {
        const fixed = candidate.replace(/,\s*([}\]])/g, '$1');
        return JSON.parse(fixed);
      } catch {
        // Fall through
      }
    }
  }

  // Check for outermost array [...]
  const firstBracket = cleaned.indexOf('[');
  const lastBracket = cleaned.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket > firstBracket) {
    const candidate = cleaned.slice(firstBracket, lastBracket + 1);
    try {
      return JSON.parse(candidate);
    } catch {
      try {
        const fixed = candidate.replace(/,\s*([}\]])/g, '$1');
        return JSON.parse(fixed);
      } catch {
        // Fall through
      }
    }
  }

  throw new Error('Không thể giải mã dữ liệu JSON trả về từ AI.');
}

/**
 * Robustly extracts the array of quiz questions from any AI JSON response structure.
 */
export function extractQuestionsArray(parsed: any): any[] {
  if (Array.isArray(parsed)) return parsed;
  if (parsed && typeof parsed === 'object') {
    if (Array.isArray(parsed.questions)) return parsed.questions;
    if (Array.isArray(parsed.quiz)) return parsed.quiz;
    if (Array.isArray(parsed.data)) return parsed.data;
    if (Array.isArray(parsed.items)) return parsed.items;
    for (const key of Object.keys(parsed)) {
      if (Array.isArray(parsed[key]) && parsed[key].length > 0) {
        return parsed[key];
      }
    }
  }
  return [];
}

/**
 * Robustly extracts the array of vocabulary items from any AI JSON response structure.
 */
export function extractVocabArray(parsed: any): any[] {
  if (Array.isArray(parsed)) return parsed;
  if (parsed && typeof parsed === 'object') {
    if (Array.isArray(parsed.vocabulary)) return parsed.vocabulary;
    if (Array.isArray(parsed.vocab)) return parsed.vocab;
    if (Array.isArray(parsed.words)) return parsed.words;
    if (Array.isArray(parsed.items)) return parsed.items;
    if (Array.isArray(parsed.data)) return parsed.data;
    for (const key of Object.keys(parsed)) {
      if (Array.isArray(parsed[key]) && parsed[key].length > 0) {
        return parsed[key];
      }
    }
  }
  return [];
}

function cleanModelId(model: string): string {
  return model.replace(/^models\//, '').trim();
}

/**
 * Dynamically queries Google AI Studio for the real list of models supporting generateContent.
 */
export async function getLiveModelsFromGoogle(apiKey: string): Promise<string[]> {
  try {
    const key = apiKey.trim();
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-goog-api-key': key
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.models && Array.isArray(data.models)) {
      const candidates: string[] = data.models
        .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
        .map((m: any) => cleanModelId(m.name));

      const valid = candidates.filter(
        (id) =>
          !id.includes('deprecated') &&
          !id.includes('-tts') &&
          !id.includes('audio') &&
          !id.includes('embedding') &&
          !id.includes('imagen') &&
          !id.includes('2.5-flash-lite') && // Exclude known 404 in Google AI Studio
          !id.includes('3-flash') && // Exclude experimental previews that cause generateContent errors
          !id.includes('3-pro')
      );

      // Stable priority sorting:
      // 0: gemini-2.0-flash
      // 1: gemini-1.5-flash
      // 2: gemini-1.5-pro
      // 3: other flash models
      return valid.sort((a, b) => {
        const getScore = (name: string) => {
          if (name === 'gemini-2.0-flash') return 0;
          if (name === 'gemini-1.5-flash') return 1;
          if (name === 'gemini-1.5-pro') return 2;
          if (name.includes('2.0-flash')) return 3;
          if (name.includes('1.5-flash')) return 4;
          if (name.includes('flash')) return 5;
          return 6;
        };
        const scoreA = getScore(a);
        const scoreB = getScore(b);
        if (scoreA !== scoreB) return scoreA - scoreB;
        return a.localeCompare(b);
      });
    }
  } catch (err) {
    console.warn('[EVM Gemini Service] Could not fetch live models:', err);
  }
  return [];
}

/**
 * Direct call to Google Gemini REST API
 */
async function callGeminiDirect(
  model: string,
  apiKey: string,
  prompt: string,
  systemInstruction: string = SYSTEM_INSTRUCTION_EVM,
  pdfBase64?: string
): Promise<string> {
  const cleanModel = cleanModelId(model);
  const key = apiKey.trim();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${key}`;

  const parts: any[] = [];
  if (pdfBase64 && typeof pdfBase64 === 'string' && pdfBase64.trim()) {
    // Official Google Gemini REST API schema: inlineData with mimeType and base64 data
    parts.push({
      inlineData: {
        mimeType: 'application/pdf',
        data: pdfBase64.trim()
      }
    });
  }
  parts.push({ text: prompt });

  const payload: any = {
    contents: [
      {
        parts: parts
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.1,
      maxOutputTokens: 8192
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
      'Content-Type': 'application/json',
      'x-goog-api-key': key
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

  // 1. Fetch live models directly from Google AI Studio for this specific key
  const liveModels = await getLiveModelsFromGoogle(apiKey);

  const preferredModel = cleanModelId(getStoredModel());
  const modelsToTry: string[] = [];

  // Prioritize user's preferred model first
  if (preferredModel) {
    modelsToTry.push(preferredModel);
  }

  // Next, add the verified stable FALLBACK_CHAIN models
  for (const m of FALLBACK_CHAIN) {
    const clean = cleanModelId(m);
    if (!modelsToTry.includes(clean)) {
      modelsToTry.push(clean);
    }
  }

  // Then add any additional live models that Google returned
  for (const lm of liveModels) {
    if (!modelsToTry.includes(lm)) {
      modelsToTry.push(lm);
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

  const key = apiKey.trim();
  try {
    const liveModels = await getLiveModelsFromGoogle(key);
    const targetModel =
      liveModels.length > 0 && liveModels.includes(cleanModelId(model))
        ? cleanModelId(model)
        : liveModels[0] || cleanModelId(model);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${key}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': key
      },
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

    return {
      success: true,
      message: `Kết nối thành công với Google AI Studio (Model khả dụng: ${targetModel})!`
    };
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
  onModelFallback?: (failedModel: string, nextModel: string, error: string) => void,
  pdfBase64?: string,
  prioritizeYellowHighlights: boolean = true
): Promise<ExtractionResult> {
  const categoryConstraint =
    categories && categories.length > 0
      ? `Focus particularly on these categories: ${categories.join(', ')}.`
      : `Categorize all items into the 5 standard categories: 'Single word', 'Phrasal verb', 'Collocation', 'Idiom', 'Preposition'.`;

  const highlightSection = (prioritizeYellowHighlights || pdfBase64)
    ? `
CRITICAL TARGET INSTRUCTION - MANDATORY FOCUS ON YELLOW HIGHLIGHTED TERMS:
The uploaded exam document contains specific target vocabulary items, collocations, phrasal verbs, idioms, and prepositions HIGHLIGHTED IN YELLOW (màu vàng / yellow highlighter / yellow background shading / marker / annotations) by the teacher.

YOUR HIGHEST PRIORITY IS TO EXTRACT 100% OF THESE YELLOW-HIGHLIGHTED ITEMS:
1. VISUAL SCANNING: Scrutinize every page and line of the PDF to identify ALL words, phrases, phrasal verbs, collocations, idioms, and prepositions that have a YELLOW background or yellow highlight mark, OR are tagged with [BÔI VÀNG: ...] or ==...== in the text.
2. EXHAUSTIVE EXTRACTION MANDATE: You MUST extract 100% of these yellow-highlighted items without skipping or omitting any. If there are 12 yellow-highlighted terms in the PDF, you must extract all 12.
3. For each extracted item:
   - "term": Canonical/dictionary base form of the word or phrase (e.g. "make a decision", "break down", "look forward to", "in terms of").
   - "type": Classify accurately into one of: 'Single word', 'Phrasal verb', 'Collocation', 'Idiom', 'Preposition'.
   - "ipa": Standard Cambridge/Oxford phonetic transcription (e.g. "/meɪk ə dɪˈsɪʒ.ən/").
   - "meaning": Accurate Vietnamese translation fitting the exact context of the exam sentence.
   - "context": EXACT sentence from the exam where the word appears, with the target term enclosed in **bold**.
   - "cefrLevel": CEFR difficulty ('B1', 'B2', or 'C1').
   - "examTip": Pedagogical note explaining common exam traps, prepositions, or distractors tested in Vietnam's National High School Graduation Exam (Tốt nghiệp THPT).
   - "isHighlighted": true (set to true for all items that were highlighted in yellow).
4. In addition to all yellow-highlighted items, you may also include any other high-yield B1-C1 vocabulary items from the exam, but yellow-highlighted terms are MANDATORY.`
    : '';

  const prompt = `Act as the AI English Exam Vocabulary Architect (EVM) specializing in Vietnam's National High School Graduation Exam (Tốt nghiệp THPT môn Tiếng Anh).

${highlightSection}

CATEGORIES CONSTRAINT:
${categoryConstraint}

EXAM TITLE / SOURCE: ${examTitle || 'Đề thi trích dẫn'}

${pdfBase64 ? 'NOTE: The complete authentic exam PDF document is attached as inline document data. Please inspect it visually page by page to detect all yellow-highlighted terms and read all text.' : ''}
${examText ? `EXAM TEXT CONTEXT:\n"""\n${examText.slice(0, 20000)}\n"""` : ''}

REQUIRED JSON OUTPUT FORMAT:
Ensure the response is valid JSON matching this schema:
{
  "summary": "Tóm tắt sư phạm ngắn gọn bằng tiếng Việt: Nêu rõ tổng số từ/cụm từ bôi vàng đã nhận diện thành công từ PDF, các cấu trúc phân hóa cao và độ khó tổng thể.",
  "vocabulary": [
    {
      "type": "Collocation",
      "term": "make an effort",
      "ipa": "/meɪk ən ˈefət/",
      "meaning": "nỗ lực, cố gắng",
      "context": "Young graduates must **make an effort** to cultivate skills.",
      "cefrLevel": "B1",
      "examTip": "Bẫy thi THPT: Luôn đi với động từ make (không dùng do an effort).",
      "isHighlighted": true
    }
  ]
}`;

  if (onStepProgress) onStepProgress(1, 'running', 'Đang phân tích cấu trúc & quét thị giác nhận diện từ bôi vàng...');

  try {
    const extractionResult = await executeWithFallback(async (model, apiKey) => {
      const rawText = await callGeminiDirect(model, apiKey, prompt, SYSTEM_INSTRUCTION_EVM, pdfBase64);
      const parsed = extractJsonFromText(rawText);
      const vocabList = extractVocabArray(parsed);
      if (!vocabList || !Array.isArray(vocabList) || vocabList.length === 0) {
        throw new Error(`Model ${model} không trả về danh sách từ vựng hợp lệ.`);
      }

      const formatted: VocabularyItem[] = vocabList.map((item: any, idx: number) => ({
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
        addedAt: new Date().toISOString(),
        isHighlighted: Boolean(item.isHighlighted)
      }));

      return {
        summary: parsed.summary || 'Đã phân tích và trích xuất thành công ngữ liệu đề thi.',
        vocabulary: formatted
      };
    }, onModelFallback);

    if (onStepProgress) {
      onStepProgress(1, 'completed', 'Đã phân tích xong cấu trúc ngữ liệu.');
      onStepProgress(2, 'completed', 'Đã phân loại thành công các nhóm từ vựng.');
      onStepProgress(3, 'completed', 'Quy trình hoàn tất!');
    }

    return extractionResult;
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
export interface PreviousQuestionHistory {
  term: string;
  type?: string;
  subtype?: string;
  question?: string;
  testedFocus?: string;
  correctAnswerText?: string;
  suggestedSynonyms?: string[];
  suggestedAntonyms?: string[];
}

const QUIZ_HISTORY_STORAGE_KEY = 'evm_quiz_question_history';

export function getStoredQuizHistory(): PreviousQuestionHistory[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(QUIZ_HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredQuizHistory(history: PreviousQuestionHistory[]): void {
  if (typeof window === 'undefined') return;
  try {
    const trimmed = history.slice(-60);
    localStorage.setItem(QUIZ_HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('[EVM] Failed to save quiz history:', e);
  }
}

export function extractSuggestedWords(explanation: string): { synonyms: string[]; antonyms: string[] } {
  const synonyms: string[] = [];
  const antonyms: string[] = [];
  if (!explanation) return { synonyms, antonyms };

  const parseList = (str: string) => {
    return str
      .split(/[,;\n•]/)
      .map((w) => w.replace(/\([^)]*\)/g, '').trim().replace(/^['"`\-\s]+|['"`\-\s\.]+$/g, ''))
      .filter((w) => w.length > 0 && !w.toLowerCase().includes('không có') && !w.toLowerCase().includes('n/a'));
  };

  const synMatch = explanation.match(/(?:từ đồng nghĩa|các từ đồng nghĩa|đồng nghĩa|closest|synonym)[^:\n]*:\s*([^\n\.]+)/i);
  if (synMatch && synMatch[1]) {
    synonyms.push(...parseList(synMatch[1]));
  }

  const antMatch = explanation.match(/(?:từ trái nghĩa|các từ trái nghĩa|trái nghĩa|opposite|antonym)[^:\n]*:\s*([^\n\.]+)/i);
  if (antMatch && antMatch[1]) {
    antonyms.push(...parseList(antMatch[1]));
  }

  return { synonyms, antonyms };
}

export interface TermLexicalProfile {
  term: string;
  testedSynonyms: string[];
  testedAntonyms: string[];
  allProposedSynonyms: string[];
  allProposedAntonyms: string[];
  remainingSynonyms: string[];
  remainingAntonyms: string[];
}

export function buildTermLexicalProfiles(
  history: PreviousQuestionHistory[]
): Map<string, TermLexicalProfile> {
  const profileMap = new Map<string, TermLexicalProfile>();

  for (const h of history) {
    if (!h.term) continue;
    const termKey = h.term.trim().toLowerCase();
    let profile = profileMap.get(termKey);
    if (!profile) {
      profile = {
        term: h.term.trim(),
        testedSynonyms: [],
        testedAntonyms: [],
        allProposedSynonyms: [],
        allProposedAntonyms: [],
        remainingSynonyms: [],
        remainingAntonyms: []
      };
      profileMap.set(termKey, profile);
    }

    const answer = (h.correctAnswerText || '').trim();
    if (h.type === 'Synonyms/Antonyms') {
      if (h.subtype === 'Synonym' && answer && !profile.testedSynonyms.some((x) => x.toLowerCase() === answer.toLowerCase())) {
        profile.testedSynonyms.push(answer);
      } else if (h.subtype === 'Antonym' && answer && !profile.testedAntonyms.some((x) => x.toLowerCase() === answer.toLowerCase())) {
        profile.testedAntonyms.push(answer);
      }
    }

    // Merge suggestedSynonyms if provided
    if (h.suggestedSynonyms && Array.isArray(h.suggestedSynonyms)) {
      for (const syn of h.suggestedSynonyms) {
        const s = syn.trim();
        if (s && !profile.allProposedSynonyms.some((x) => x.toLowerCase() === s.toLowerCase())) {
          profile.allProposedSynonyms.push(s);
        }
      }
    }

    // Merge suggestedAntonyms if provided
    if (h.suggestedAntonyms && Array.isArray(h.suggestedAntonyms)) {
      for (const ant of h.suggestedAntonyms) {
        const a = ant.trim();
        if (a && !profile.allProposedAntonyms.some((x) => x.toLowerCase() === a.toLowerCase())) {
          profile.allProposedAntonyms.push(a);
        }
      }
    }

    // Ensure tested words are always in allProposed lists
    if (h.subtype === 'Synonym' && answer) {
      if (!profile.allProposedSynonyms.some((x) => x.toLowerCase() === answer.toLowerCase())) {
        profile.allProposedSynonyms.unshift(answer);
      }
    }
    if (h.subtype === 'Antonym' && answer) {
      if (!profile.allProposedAntonyms.some((x) => x.toLowerCase() === answer.toLowerCase())) {
        profile.allProposedAntonyms.unshift(answer);
      }
    }
  }

  // Calculate remaining un-tested candidates
  for (const profile of profileMap.values()) {
    profile.remainingSynonyms = profile.allProposedSynonyms.filter(
      (s) => !profile.testedSynonyms.some((t) => t.toLowerCase() === s.toLowerCase())
    );
    profile.remainingAntonyms = profile.allProposedAntonyms.filter(
      (a) => !profile.testedAntonyms.some((t) => t.toLowerCase() === a.toLowerCase())
    );
  }

  return profileMap;
}

const STRICT_UNCOUNTABLE_NOUNS = new Set([
  'information', 'advice', 'equipment', 'furniture', 'evidence',
  'knowledge', 'news', 'homework', 'luggage', 'baggage', 'traffic'
]);

/**
 * Inflects a word or phrase to match the grammatical inflection (plural, past, gerund, 3rd person)
 * of the target word used in context.
 */
export function harmonizeWordForm(
  word: string,
  targetInSentence: string,
  baseTerm?: string
): string {
  if (!word || !targetInSentence) return word;
  const trimmedWord = word.trim();
  const tgt = targetInSentence.trim().toLowerCase();
  const base = (baseTerm || '').trim().toLowerCase();

  // If already matches exact case or ends similarly, keep
  if (trimmedWord.toLowerCase() === tgt) return trimmedWord;

  // Handle multi-word phrases: inflect the head/final word
  const parts = trimmedWord.split(/\s+/);
  if (parts.length > 1) {
    const lastWord = parts[parts.length - 1];
    const inflectedLast = harmonizeWordForm(lastWord, targetInSentence, baseTerm);
    parts[parts.length - 1] = inflectedLast;
    return parts.join(' ');
  }

  const w = trimmedWord;
  const wLower = w.toLowerCase();

  if (STRICT_UNCOUNTABLE_NOUNS.has(wLower)) {
    return w;
  }

  // 1. Plural Concordance:
  // e.g. base: 'fluctuation', target in sentence: 'fluctuations'
  const isTargetPlural =
    (base && (tgt === `${base}s` || tgt === `${base}es` || (base.endsWith('y') && tgt === `${base.slice(0, -1)}ies`))) ||
    (tgt.endsWith('s') && !tgt.endsWith('ss') && !tgt.endsWith('us') && !tgt.endsWith('is') && tgt.length > 3 && (!base || !base.endsWith('s')));

  if (isTargetPlural) {
    if (!wLower.endsWith('s')) {
      // Irregular plurals
      if (wLower === 'criterion') return w === w.toUpperCase() ? 'CRITERIA' : 'criteria';
      if (wLower === 'phenomenon') return w === w.toUpperCase() ? 'PHENOMENA' : 'phenomena';
      if (wLower === 'analysis') return w === w.toUpperCase() ? 'ANALYSES' : 'analyses';
      if (wLower === 'crisis') return w === w.toUpperCase() ? 'CRISES' : 'crises';

      if (wLower.endsWith('y') && !/[aeiou]y$/i.test(wLower)) {
        return w.slice(0, -1) + (w === w.toUpperCase() ? 'IES' : 'ies');
      }
      if (/(?:s|x|z|ch|sh)$/i.test(wLower)) {
        return w + (w === w.toUpperCase() ? 'ES' : 'es');
      }
      return w + (w === w.toUpperCase() ? 'S' : 's');
    }
    return w;
  }

  // 1b. Singular Concordance:
  // e.g. target is singular 'fluctuation', but option was generated as 'variations'
  const isTargetSingular = base && tgt === base && !tgt.endsWith('s');
  if (isTargetSingular) {
    if (wLower === 'criteria') return w === w.toUpperCase() ? 'CRITERION' : 'criterion';
    if (wLower === 'phenomena') return w === w.toUpperCase() ? 'PHENOMENON' : 'phenomenon';
    if (wLower === 'analyses') return w === w.toUpperCase() ? 'ANALYSIS' : 'analysis';
    if (wLower === 'crises') return w === w.toUpperCase() ? 'CRISIS' : 'crisis';

    if (wLower.endsWith('ies') && wLower.length > 4 && !/[aeiou]ies$/i.test(wLower)) {
      return w.slice(0, -3) + (w === w.toUpperCase() ? 'Y' : 'y');
    }
    if (wLower.endsWith('es') && /(?:s|x|z|ch|sh)es$/i.test(wLower)) {
      return w.slice(0, -2);
    }
    if (wLower.endsWith('s') && !wLower.endsWith('ss') && !wLower.endsWith('us') && !wLower.endsWith('is') && wLower.length > 3) {
      return w.slice(0, -1);
    }
  }

  // 2. Past Tense / Past Participle Concordance (-ed):
  // e.g. base: 'manipulate', target in sentence: 'manipulated'
  const isTargetPast =
    (base && (tgt === `${base}d` || tgt === `${base}ed` || (base.endsWith('y') && tgt === `${base.slice(0, -1)}ied`))) ||
    (tgt.endsWith('ed') && tgt.length > 4 && (!base || !base.endsWith('ed')));

  if (isTargetPast) {
    if (!wLower.endsWith('ed')) {
      if (wLower === 'make') return w === w.toUpperCase() ? 'MADE' : 'made';
      if (wLower === 'take') return w === w.toUpperCase() ? 'TOOK' : 'took';
      if (wLower === 'bring') return w === w.toUpperCase() ? 'BROUGHT' : 'brought';

      if (wLower.endsWith('e')) {
        return w + (w === w.toUpperCase() ? 'D' : 'd');
      }
      if (wLower.endsWith('y') && !/[aeiou]y$/i.test(wLower)) {
        return w.slice(0, -1) + (w === w.toUpperCase() ? 'IED' : 'ied');
      }
      if (/(?:control|stop|drop|plan|prefer)$/i.test(wLower)) {
        const lastChar = w.slice(-1);
        return w + lastChar + (w === w.toUpperCase() ? 'ED' : 'ed');
      }
      return w + (w === w.toUpperCase() ? 'ED' : 'ed');
    }
    return w;
  }

  // 3. Present Participle / Gerund Concordance (-ing):
  // e.g. base: 'manipulate', target in sentence: 'manipulating'
  const isTargetIng =
    (base && (tgt === `${base.replace(/e$/, '')}ing` || tgt === `${base}ing`)) ||
    (tgt.endsWith('ing') && tgt.length > 5 && (!base || !base.endsWith('ing')));

  if (isTargetIng) {
    if (!wLower.endsWith('ing')) {
      if (wLower.endsWith('ie')) {
        return w.slice(0, -2) + (w === w.toUpperCase() ? 'YING' : 'ying');
      }
      if (wLower.endsWith('e') && !wLower.endsWith('ee')) {
        return w.slice(0, -1) + (w === w.toUpperCase() ? 'ING' : 'ing');
      }
      if (/(?:control|stop|drop|plan)$/i.test(wLower)) {
        const lastChar = w.slice(-1);
        return w + lastChar + (w === w.toUpperCase() ? 'ING' : 'ing');
      }
      return w + (w === w.toUpperCase() ? 'ING' : 'ing');
    }
    return w;
  }

  return w;
}

export function cleanAndSeparateInstruction(
  rawInstruction: string | undefined,
  rawQuestion: string,
  type: string,
  subtype?: string,
  explanation?: string
): { instruction: string; question: string; resolvedSubtype: 'Synonym' | 'Antonym' | 'None' } {
  let instruction = (rawInstruction || '').trim();
  let question = (rawQuestion || '').trim();

  // Determine/Refine subtype for Synonyms/Antonyms
  let resolvedSubtype: 'Synonym' | 'Antonym' | 'None' = (subtype as any) || 'None';
  if (type === 'Synonyms/Antonyms') {
    const combinedLower = `${instruction} ${question} ${explanation || ''}`.toLowerCase();
    if (resolvedSubtype !== 'Antonym' && resolvedSubtype !== 'Synonym') {
      if (
        combinedLower.includes('opposite') ||
        combinedLower.includes('trái nghĩa') ||
        combinedLower.includes('antonym')
      ) {
        resolvedSubtype = 'Antonym';
      } else {
        resolvedSubtype = 'Synonym';
      }
    }
  }

  // Common patterns where instruction is prepended to question sentence:
  const instructionRegexes = [
    /^(?:Mark the letter [A-D](?:,\s*[A-D])*(?:,\s*or\s*[A-D])?(?:\s+on your answer sheet)?\s+to indicate the (?:word\(s\)|word|phrase) (?:CLOSEST|OPPOSITE) in meaning to the underlined (?:word\(s\)|word|phrase)?\s+in (?:the following question|each of the following questions|the following sentence)[\.:]?\s*)/i,
    /^(?:Mark the letter [A-D](?:,\s*[A-D])*(?:,\s*or\s*[A-D])?(?:\s+on your answer sheet)?\s+to indicate the [^.]+(?:following question|following questions|following sentence|following sentences)[\.:]?\s*)/i,
    /^(?:Choose the (?:letter|word|phrase|correct answer|best answer)[^.]+(?:following question|following questions|following sentence|following sentences)[\.:]?\s*)/i,
    /^(?:Indicate the (?:word\(s\)|word|phrase) (?:CLOSEST|OPPOSITE) in meaning[^.]+(?:following question|following questions)[\.:]?\s*)/i
  ];

  for (const regex of instructionRegexes) {
    const match = question.match(regex);
    if (match) {
      if (!instruction) {
        instruction = match[0].trim().replace(/[\.:]$/, '.');
      }
      question = question.slice(match[0].length).trim();
      break;
    }
  }

  // Strip accidental "Question X:" prefix if present
  question = question.replace(/^Question\s+\d+[:\.]\s*/i, '').trim();

  // Ensure Synonyms/Antonyms instruction has explicit CLOSEST or OPPOSITE
  if (type === 'Synonyms/Antonyms') {
    if (resolvedSubtype === 'Antonym' && !instruction.includes('OPPOSITE')) {
      instruction = 'Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) OPPOSITE in meaning to the underlined word in the following question.';
    } else if (resolvedSubtype === 'Synonym' && !instruction.includes('CLOSEST')) {
      instruction = 'Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) CLOSEST in meaning to the underlined word in the following question.';
    }
  }

  // If instruction is still empty or minimal, build standard Ministry instruction
  if (!instruction || instruction.length < 15) {
    if (type === 'Synonyms/Antonyms') {
      if (resolvedSubtype === 'Antonym') {
        instruction = 'Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) OPPOSITE in meaning to the underlined word in the following question.';
      } else {
        instruction = 'Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) CLOSEST in meaning to the underlined word in the following question.';
      }
    } else if (type === 'Fill-in-the-blank') {
      instruction = 'Mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase to complete the following sentence.';
    } else if (type === 'Sentence Completion') {
      instruction = 'Choose 1 correct word from the word box and type it into the blank to complete the sentence.';
    } else {
      instruction = 'Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to the following question.';
    }
  }

  return { instruction, question, resolvedSubtype };
}

export async function generateQuizWithFallback(
  vocabularyList: VocabularyItem[],
  count: number = 5,
  questionTypes: string[] = ['Fill-in-the-blank', 'Synonyms/Antonyms', 'Sentence Completion'],
  onModelFallback?: (failedModel: string, nextModel: string, error: string) => void,
  history: PreviousQuestionHistory[] = []
): Promise<QuizQuestion[]> {
  const allowedTypes = questionTypes && questionTypes.length > 0
    ? questionTypes
    : ['Fill-in-the-blank', 'Synonyms/Antonyms', 'Sentence Completion'];

  const vocabSummary = vocabularyList.slice(0, 30).map((v) => ({
    term: v.term,
    type: v.type,
    meaning: v.meaning,
    context: v.context
  }));

  const profileMap = buildTermLexicalProfiles(history);

  let historySection = '';
  if (history && history.length > 0) {
    const recentHistory = history.slice(-15).map((h, i) => {
      let flipAction = 'Đổi câu văn ngữ cảnh mới';
      if (h.type === 'Synonyms/Antonyms') {
        if (h.subtype === 'Synonym') {
          flipAction = 'ĐÃ KIỂM TRA ĐỒNG NGHĨA (CLOSEST) -> NẾU CHỌN LẠI TỪ NÀY Ở LƯỢT NÀY, BẮT BUỘC ĐẢO CHIỀU SANG TÌM TỪ TRÁI NGHĨA (OPPOSITE)!';
        } else if (h.subtype === 'Antonym') {
          flipAction = 'ĐÃ KIỂM TRA TRÁI NGHĨA (OPPOSITE) -> NẾU CHỌN LẠI TỪ NÀY Ở LƯỢT NÀY, BẮT BUỘC ĐẢO CHIỀU SANG TÌM TỪ ĐỒNG NGHĨA (CLOSEST)!';
        }
      } else if (h.type === 'Fill-in-the-blank') {
        flipAction = `Đã kiểm tra điền '${h.testedFocus || h.correctAnswerText || 'từ này'}' -> Lượt này có thể chuyển sang kiểm tra Đồng nghĩa / Trái nghĩa hoặc điền thành phần khuyết khác`;
      }

      return {
        index: i + 1,
        targetTerm: h.term,
        previousQuestionType: h.type,
        previousSubtype: h.subtype || 'None',
        previousCorrectAnswerWord: h.correctAnswerText || 'N/A',
        testedFocus: h.testedFocus || h.correctAnswerText || 'N/A',
        mandatoryActionIfReused: flipAction,
        previousQuestionSnippet: h.question ? h.question.slice(0, 90) : ''
      };
    });

    const termProfiles = Array.from(profileMap.values()).map((p) => ({
      term: p.term,
      testedSynonyms: p.testedSynonyms,
      testedAntonyms: p.testedAntonyms,
      establishedSynonymsBank: p.allProposedSynonyms,
      untestedSynonymsRemaining: p.remainingSynonyms,
      establishedAntonymsBank: p.allProposedAntonyms,
      untestedAntonymsRemaining: p.remainingAntonyms
    }));

    historySection = `
DANH SÁCH CÁC CÂU HỎI ĐÃ KIỂM TRA Ở CÁC LƯỢT TRƯỚC (PREVIOUS QUIZ HISTORY):
${JSON.stringify(recentHistory, null, 2)}

NGÂN HÀNG TỪ ĐỒNG NGHĨA / TRÁI NGHĨA ĐÃ XÁC LẬP THEO TỪNG TỪ (ESTABLISHED TERM LEXICAL PROFILES):
${JSON.stringify(termProfiles, null, 2)}

QUY TẮC BẮT BUỘC KHI TẠO ĐỀ MỚI (MANDATORY RULES FOR NEW QUIZ GENERATION):
1. NGUYÊN TẮC KHÉP KÍN & KIỂM TRA ĐÚNG CÁC TỪ ĐÃ ĐỀ XUẤT (CLOSED-LOOP LEXICAL RULE):
   - ĐỐI VỚI CÁC TỪ ĐÃ CÓ TRONG NGÂN HÀNG ĐỀ XUẤT Ở TRÊN (như 'manipulate'):
     * ĐÁP ÁN ĐÚNG CỦA CÂU HỎI TIẾP THEO BẮT BUỘC PHẢI CHỌN TỪ CHÍNH DANH SÁCH ĐÃ ĐỀ XUẤT TRÊN! Tuyệt đối không chọn đáp án ngoài danh sách đề xuất.
     * NẾU RA CÂU HỎI ĐỒNG NGHĨA (CLOSEST):
       -> BẮT BUỘC chọn đáp án đúng từ danh sách các từ đồng nghĩa CHƯA KIỂM TRA ("untestedSynonymsRemaining")!
       -> TUYỆT ĐỐI KHÔNG lặp lại đáp án đã kiểm tra ở lượt trước (ví dụ: lượt trước đã kiểm tra 'control' thì lượt này BẮT BUỘC chọn từ khác như 'influence', 'sway',...).
     * NẾU RA CÂU HỎI TRÁI NGHĨA (OPPOSITE - ƯU TIÊN ĐẢO CHIỀU):
       -> BẮT BUỘC chọn đáp án đúng từ danh sách các từ trái nghĩa đã đề xuất ("establishedAntonymsBank" / "untestedAntonymsRemaining").
     * TRONG PHẦN GIẢI THÍCH (EXPLANATION):
       -> Mục "• Các từ đồng nghĩa chuẩn cùng ngữ cảnh:" BẮT BUỘC PHẢI LIỆT KÊ ĐỦ CẢ: từ đáp án câu này, TẤT CẢ các từ đã kiểm tra ở các lượt trước (ví dụ: 'control') và các từ đã đề xuất! TUYỆT ĐỐI KHÔNG ĐƯỢC BỎ SÓT từ đã kiểm tra!
       -> Mục "• Các từ trái nghĩa chuẩn cùng ngữ cảnh:" BẮT BUỘC giữ nguyên đầy đủ bộ từ trái nghĩa đã đề xuất.

2. QUY TẮC ĐẢO CHIỀU ĐỒNG NGHĨA <-> TRÁI NGHĨA (CRITICAL SYNONYM <-> ANTONYM FLIP RULE):
   - KHI TẠO BỘ ĐỀ MỚI, BẠN HOÀN TOÀN ĐƯỢC PHÉP VÀ ĐẶC BIỆT KHUYẾN KHÍCH CHỌN LẠI CÙNG MỘT TỪ ĐÃ KIỂM TRA Ở LƯỢT TRƯỚC ĐỂ ĐẢO CHIỀU:
     * NẾU CÂU TRƯỚC ĐÃ CHO TÌM TỪ ĐỒNG NGHĨA (CLOSEST / SYNONYM) CHO TỪ ĐÓ:
       -> Ở LƯỢT NÀY BẮT BUỘC PHẢI CHUYỂN SANG TÌM TỪ TRÁI NGHĨA (OPPOSITE / ANTONYM) CỦA TỪ ĐÓ (với câu ngữ cảnh mới, đáp án đúng là từ trái nghĩa trong ngân hàng đề xuất)!
     * NẾU CÂU TRƯỚC ĐÃ CHO TÌM TỪ TRÁI NGHĨA (OPPOSITE / ANTONYM) CHO TỪ ĐÓ:
       -> Ở LƯỢT NÀY BẮT BUỘC PHẢI CHUYỂN SANG TÌM TỪ ĐỒNG NGHĨA (CLOSEST / SYNONYM) CỦA TỪ ĐÓ!
     * NẾU CÂU TRƯỚC ĐÃ CHO ĐIỀN TỪ (FILL-IN-THE-BLANK):
       -> Ở lượt này có thể chuyển sang tìm Đồng nghĩa hoặc Trái nghĩa!

3. ĐỐI VỚI COLLOCATION / PHRASAL VERB / IDIOM / CỤM TỪ:
   - Nếu chọn lại cụm từ đó: BẮT BUỘC kiểm tra một thành phần khuyết khác!
     * Ví dụ: Nếu lượt trước kiểm tra điền chữ 'make' trong 'make an impact' ('_______ an impact'), lượt này BẮT BUỘC điền chữ 'impact' ('make a profound _______').
     * Ví dụ: Nếu lượt trước kiểm tra 'take' trong 'take after' ('_______ after'), lượt này BẮT BUỘC kiểm tra giới từ 'after' ('take _______').

4. CÂN BẰNG GIỮA TỪ ĐẢO CHIỀU VÀ TỪ MỚI:
   - Hãy kết hợp nhịp nhàng: vừa chọn lại các từ của lượt trước để đảo chiều (Đồng nghĩa <-> Trái nghĩa), vừa chọn các từ mới trong danh sách để người học được củng cố và mở rộng tối đa!
`;
  }

  // Dynamic Type Constraint instructions
  let typeConstraintNotice = '';
  if (allowedTypes.length === 1) {
    typeConstraintNotice = `
CRITICAL MANDATORY CONSTRAINT - 100% STRICT QUESTION TYPE:
The user has EXCLUSIVELY selected ONLY ONE question type: "${allowedTypes[0]}".
YOU MUST ONLY GENERATE QUESTIONS OF TYPE: "${allowedTypes[0]}".
IT IS STRICTLY FORBIDDEN to generate any other question type!
DO NOT generate "Synonyms/Antonyms" or any unselected type!
EVERY SINGLE QUESTION (all ${count} questions) in the returned JSON array MUST have: "type": "${allowedTypes[0]}".
`;
  } else {
    typeConstraintNotice = `
CRITICAL MANDATORY CONSTRAINT - STRICT QUESTION TYPES:
The user has selected ONLY these question types: [${allowedTypes.join(', ')}].
All generated questions must strictly belong to one of these allowed types: [${allowedTypes.join(', ')}].
DO NOT generate any question type that is not in this allowed list!
`;
  }

  // Dynamic specifications for ONLY the allowed types
  const specList: string[] = [];
  if (allowedTypes.includes('Fill-in-the-blank')) {
    specList.push(`- 'Fill-in-the-blank':
    * Create a rich, authentic contextual sentence with a blank ("_______") requiring the exact target word/phrase or a key constituent.
    * The sentence MUST contain the blank "_______".
    * Instruction MUST be: "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase to complete the following sentence."
    * subtype: "None".`);
  }
  if (allowedTypes.includes('Synonyms/Antonyms')) {
    specList.push(`- 'Synonyms/Antonyms':
    * "subtype" MUST be explicitly 'Synonym' or 'Antonym' (NEVER 'None').
    * If 'Synonym': Instruction MUST state "CLOSEST in meaning": "Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) CLOSEST in meaning to the underlined word in the following question." The target word in the sentence MUST be enclosed in **bold** or CAPITALIZED.
    * If 'Antonym': Instruction MUST state "OPPOSITE in meaning": "Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) OPPOSITE in meaning to the underlined word in the following question." The target word in the sentence MUST be enclosed in **bold** or CAPITALIZED.`);
  }
  if (allowedTypes.includes('Sentence Completion')) {
    specList.push(`- 'Sentence Completion' (Dạng Tự Gõ Hoàn Thành Câu Với Hộp 3 Từ Vựng):
    * Create an authentic sentence with a blank ("_______") where the correct word to fill in is ONE of the words in the user's vocabulary list.
    * "wordBoxOptions": An array of EXACTLY 3 words from the user's vocabulary notebook (1 target word + 2 other distractor words from the user's vocabulary list).
    * "correctWordAnswer": The exact target word (matching one of the 3 words in wordBoxOptions).
    * "instruction": "Choose 1 correct word from the word box and type it into the blank to complete the sentence."
    * "options": { "A": word1, "B": word2, "C": word3, "D": "" }
    * "correctAnswer": The letter corresponding to the correct word ("A", "B", or "C").
    * subtype: "None".`);
  }

  // Dynamic few-shot JSON example tailored ONLY to allowed types
  const exampleQuestions: any[] = [];
  if (allowedTypes.includes('Fill-in-the-blank')) {
    exampleQuestions.push({
      id: "q1",
      type: "Fill-in-the-blank",
      subtype: "None",
      targetTerm: "sophisticated",
      testedFocus: "từ 'sophisticated'",
      instruction: "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase to complete the following sentence.",
      question: "Modern self-driving cars rely on _______ AI algorithms to navigate through bustling urban traffic safely.",
      options: {
        A: "sophisticated",
        B: "primitive",
        C: "fragile",
        D: "casual"
      },
      correctAnswer: "A",
      explanation: "Từ 'sophisticated' mang nghĩa tinh vi, tinh xảo, hiện đại, rất phù hợp khi nói về thuật toán AI của xe tự hành."
    });
    if (allowedTypes.length === 1) {
      exampleQuestions.push({
        id: "q2",
        type: "Fill-in-the-blank",
        subtype: "None",
        targetTerm: "make an impact",
        testedFocus: "impact (trong collocation 'make an impact')",
        instruction: "Mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase to complete the following sentence.",
        question: "The new community campaign is expected to make a profound _______ on local environmental awareness.",
        options: {
          A: "impact",
          B: "force",
          C: "conflict",
          D: "affect"
        },
        correctAnswer: "A",
        explanation: "Cụm danh từ cố định (Collocation) chuẩn là 'make an impact on' (tạo sức ảnh hưởng lớn đến)."
      });
    }
  }
  if (allowedTypes.includes('Synonyms/Antonyms') && exampleQuestions.length < 2) {
    exampleQuestions.push({
      id: "q_syn",
      type: "Synonyms/Antonyms",
      subtype: "Synonym",
      targetTerm: "fluctuation",
      testedFocus: "fluctuations (Dạng số nhiều - Plural noun)",
      instruction: "Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) CLOSEST in meaning to the underlined word in the following question.",
      question: "Throughout the period, there were **fluctuations** in both groups, with a decline followed by an increase.",
      options: {
        A: "stabilities",
        B: "variations",
        C: "constancies",
        D: "uniformities"
      },
      correctAnswer: "B",
      suggestedSynonyms: ["variations", "shifts", "swings", "oscillations"],
      suggestedAntonyms: ["stabilities", "continuities"],
      explanation: "Từ 'fluctuations' (danh từ số nhiều: những sự biến động, dao động) đồng nghĩa với 'variations' (những sự biến thiên/thay đổi).\n• Các từ đồng nghĩa chuẩn cùng ngữ cảnh: variations, shifts, swings, oscillations\n• Các từ trái nghĩa chuẩn cùng ngữ cảnh: stabilities, continuities"
    });
  }
  if (allowedTypes.includes('Sentence Completion') && exampleQuestions.length < 2) {
    exampleQuestions.push({
      id: "q_sc",
      type: "Sentence Completion",
      subtype: "None",
      targetTerm: "take after",
      wordBoxOptions: ["take after", "bring about", "cut corners"],
      correctWordAnswer: "take after",
      testedFocus: "cụm động từ 'take after'",
      instruction: "Choose 1 correct word from the word box and type it into the blank to complete the sentence.",
      question: "In terms of temperament, the young boy seems to _______ his grandfather.",
      options: {
        A: "take after",
        B: "bring about",
        C: "cut corners",
        D: ""
      },
      correctAnswer: "A",
      explanation: "Cụm động từ 'take after' có nghĩa là giống ai đó (về ngoại hình hoặc tính cách)."
    });
  }

  const prompt = `Act as the EVM Architect to create high-quality multiple choice exam questions strictly following the format of Vietnam's National High School Graduation Exam (Tốt nghiệp THPT).

USER'S TARGET VOCABULARY LIST (Prioritized order):
${JSON.stringify(vocabSummary, null, 2)}
${historySection}
${typeConstraintNotice}
SPECIFICATIONS:
1. Target Question Types to generate:
${specList.join('\n')}

2. STRICT SEPARATION OF INSTRUCTION AND QUESTION SENTENCE (QUAN TRỌNG):
   - "instruction": MANDATORY standard THPT exam direction in English. MUST be separate from the sentence!
   - "question": ONLY the authentic context sentence containing the blank ("_______") or the capitalized/bold target word. DO NOT include the instruction prefix inside "question"!
   - "testedFocus": A concise phrase stating only the tested constituent (e.g. "impact", "take", "sophisticated"). DO NOT include any meta-commentary like "(đề trước đã ra...)".

3. Number of questions to generate: ${Math.min(Number(count) || 5, 15)}
4. Distractors (wrong options) must be natural, plausible THPT-level distractors.
5. Provide clear pedagogical explanation in Vietnamese.
   CRITICAL NEGATIVE CONSTRAINT FOR EXPLANATION:
   - NEVER mention previous rounds, quiz history, "lượt trước", "lượt này", "vòng trước", "đề trước", "đã kiểm tra ... trước đó" in the explanation.
   - ONLY explain the grammatical rule, vocabulary meaning, or collocation directly for the learner.

6. TIÊU CHUẨN ĐỀ XUẤT TỪ VỰNG CHUẨN XÁC & NGUYÊN TẮC NGÂN HÀNG KHÉP KÍN (CLOSED-LOOP LEXICAL POOL):
   - ĐỀ XUẤT CHUẨN MỰC HỌC THUẬT (CEFR B1-C1) THEO ĐÚNG NGỮ CẢNH ĐỀ THI THPT:
     * Mỗi câu hỏi Đồng nghĩa / Trái nghĩa (Synonyms/Antonyms) BẮT BUỘC phải đề xuất:
       - 3 - 5 từ đồng nghĩa chuẩn ngữ cảnh vào trường "suggestedSynonyms"
       - 2 - 4 từ trái nghĩa chuẩn ngữ cảnh vào trường "suggestedAntonyms"
     * Mọi từ đề xuất phải TUYỆT ĐỐI CHUẨN XÁC THEO ĐÚNG NGỮ CẢNH VÀ CÙNG TỪ LOẠI (Part of Speech) trong câu văn (theo từ điển Oxford / Cambridge chuẩn mực).
   - NGUYÊN TẮC KHÉP KÍN (ĐÃ ĐỀ XUẤT TỪ NÀO THÌ CÂU HỎI TIẾP THEO KIỂM TRA TỪ ĐÓ):
     * ĐÁP ÁN ĐÚNG CỦA CÂU HỎI BẮT BUỘC PHẢI NẰM TRONG CHÍNH DANH SÁCH ĐỀ XUẤT ĐÓ!
     * Khi người học tạo bộ đề mới: Nếu chọn lại từ đã có ngân hàng đề xuất từ trước (xem ESTABLISHED TERM LEXICAL PROFILES), BẮT BUỘC chọn đáp án đúng từ chính danh sách đã đề xuất đó (chọn từ đồng nghĩa hoặc trái nghĩa chưa kiểm tra, tuyệt đối không ra từ lạ ngoài danh sách).
   - TRÌNH BÀY ĐỒNG BỘ TRONG LỜI GIẢI (EXPLANATION):
     Sau phần giải nghĩa câu và phân tích đáp án, BẮT BUỘC ghi rõ bộ từ vựng chuẩn cùng ngữ cảnh (bao hàm cả từ đáp án đúng và toàn bộ các từ đã kiểm tra ở các lượt trước, TUYỆT ĐỐI KHÔNG ĐƯỢC BỎ SÓT từ đã kiểm tra):
     • Các từ đồng nghĩa chuẩn cùng ngữ cảnh: [danh sách từ đồng nghĩa, ví dụ: control, influence, sway, steer, exploit]
     • Các từ trái nghĩa chuẩn cùng ngữ cảnh: [danh sách từ trái nghĩa, ví dụ: leave alone, respect, liberate]

7. CRITICAL: STRICT GRAMMATICAL FORM CONCORDANCE (QUY TẮC FORM TỪ - ĐẶC BIỆT CHÚ Ý):
   - QUY TẮC PHÉP THẾ HOÀN HẢO (PERFECT SUBSTITUTION TEST): Khi thay thế từ đáp án vào vị trí của từ gạch chân/in đậm trong câu, câu văn BẮT BUỘC PHẢI CHUẨN XÁC 100% VỀ MẶT NGỮ PHÁP!
   - BẮT BUỘC CÙNG DẠNG THỨC CHIA NGỮ PHÁP (INFLECTION / FORM TỪ):
     * NẾU TỪ TRONG CÂU LÀ DANH TỪ SỐ NHIỀU (PLURAL NOUN):
       Ví dụ: Câu có "there were **fluctuations**" -> ĐÁP ÁN ĐÚNG BẮT BUỘC PHẢI Ở DẠNG SỐ NHIỀU: "variations" (TUYỆT ĐỐI KHÔNG ĐƯỢC để số ít "variation")! Cả 4 phương án A, B, C, D đều phải chia ở dạng số nhiều tương ứng!
     * NẾU TỪ TRONG CÂU LÀ ĐỘNG TỪ QUÁ KHỨ / PHÂN TỪ (V-ed / V2 / V3):
       Ví dụ: Câu có "algorithm **manipulated** data" -> ĐÁP ÁN ĐÚNG BẮT BUỘC PHẢI LÀ "controlled" / "influenced" (TUYỆT ĐỐI KHÔNG ĐƯỢC để nguyên thể "control")!
     * NẾU TỪ TRONG CÂU LÀ V-ing (GERUND / PARTICIPLE):
       Ví dụ: Câu có "**manipulating** voters" -> ĐÁP ÁN ĐÚNG BẮT BUỘC PHẢI LÀ "controlling" / "influencing"!
     * NẾU TỪ TRONG CÂU LÀ NGÔI 3 SỐ ÍT (V-s / V-es):
       Ví dụ: Câu có "she **manipulates**" -> ĐÁP ÁN ĐÚNG BẮT BUỘC PHẢI LÀ "controls" / "influences"!
   - TUYỆT ĐỐI KHÔNG ĐỂ XẢY RA LỖI LỆCH FORM TỪ (như câu có 'fluctuations' mà đáp án lại là 'variation')!

8. RÀ SOÁT VÀ PHÂN BỔ ĐỒNG NGHĨA / TRÁI NGHĨA CHO MỌI THỂ LOẠI TỪ VỰNG (ALL CATEGORIES):
   - ĐẶC BIỆT LƯU Ý: Dạng bài Đồng nghĩa (CLOSEST) và Trái nghĩa (OPPOSITE) KHÔNG ĐƯỢC chỉ giới hạn ở từ đơn (Single words)!
   - BẮT BUỘC rà soát và tạo câu hỏi Đồng nghĩa / Trái nghĩa cho cả CỤM TỪ (Phrasal verb, Collocation, Idiom, Prepositional phrase) theo đúng cấu trúc chuẩn của đề thi THPT Quốc Gia:
     * Phrasal verb: 'bring about' <-> 'cause' (CLOSEST) / 'prevent' (OPPOSITE); 'phase out' <-> 'gradually eliminate' (CLOSEST) / 'introduce' (OPPOSITE)
     * Collocation: 'take advantage of' <-> 'make use of' (CLOSEST) / 'miss out on' (OPPOSITE); 'make an effort' <-> 'try hard' (CLOSEST) / 'slacken' (OPPOSITE)
     * Idiom: 'turn a blind eye to' <-> 'ignore' (CLOSEST) / 'pay attention to' (OPPOSITE); 'think out of the box' <-> 'think creatively' (CLOSEST) / 'follow conventions' (OPPOSITE); 'cut corners' <-> 'act carelessly' (CLOSEST) / 'do things thoroughly' (OPPOSITE)
     * Preposition phrase: 'dependent on' <-> 'reliant on' (CLOSEST) / 'independent of' (OPPOSITE); 'deprived of' <-> 'lacking' (CLOSEST) / 'provided with' (OPPOSITE)
   - LUÂN PHIÊN RÀ SOÁT TẤT CẢ CÁC TỪ TRONG DANH SÁCH ĐƯỢC GỬI:
     Hãy ưu tiên chọn các từ ở đầu danh sách (đây là các từ chưa từng được kiểm tra ở dạng này). Phải đảm bảo mọi từ trong sổ tay đều được tạo câu hỏi, tuyệt đối không chỉ chọn lặp đi lặp lại 1-2 từ cũ!

Return valid JSON in this exact structure:
{
  "questions": ${JSON.stringify(exampleQuestions, null, 2)}
}`;

  const formattedQuestions = await executeWithFallback(async (model, apiKey) => {
    const rawText = await callGeminiDirect(model, apiKey, prompt);
    const parsed = extractJsonFromText(rawText);
    const questionsRaw = extractQuestionsArray(parsed);
    if (!questionsRaw || !Array.isArray(questionsRaw) || questionsRaw.length === 0) {
      throw new Error(`Model ${model} không trả về danh sách câu hỏi hợp lệ.`);
    }

    const formatted: QuizQuestion[] = questionsRaw.map((item: any, idx: number) => {
      let type = (item.type || allowedTypes[0]) as QuizQuestion['type'];

      // Strict Code-level enforcement: If Gemini deviated from allowedTypes, force it!
      if (!allowedTypes.includes(type)) {
        type = allowedTypes[0] as QuizQuestion['type'];
      }

      let rawQuestion = String(item.question || '').trim();

      // If type is Fill-in-the-blank or Sentence Completion, ensure question has "_______"
      if (type === 'Fill-in-the-blank' || type === 'Sentence Completion') {
        if (!rawQuestion.includes('_______') && !rawQuestion.includes('______') && !rawQuestion.includes('____')) {
          if (/\*\*[^*]+\*\*/.test(rawQuestion)) {
            rawQuestion = rawQuestion.replace(/\*\*[^*]+\*\*/, '_______');
          } else if (item.targetTerm && rawQuestion.toLowerCase().includes(item.targetTerm.toLowerCase())) {
            const re = new RegExp(item.targetTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            rawQuestion = rawQuestion.replace(re, '_______');
          } else {
            const capsMatch = rawQuestion.match(/\b[A-Z]{3,}\b/);
            if (capsMatch) {
              rawQuestion = rawQuestion.replace(capsMatch[0], '_______');
            }
          }
        }
      }

      // If type is Synonyms/Antonyms, ensure target word is formatted and not a blank
      if (type === 'Synonyms/Antonyms') {
        if (rawQuestion.includes('_______') && item.targetTerm) {
          rawQuestion = rawQuestion.replace('_______', `**${item.targetTerm}**`);
        } else if (!rawQuestion.includes('**') && item.targetTerm && rawQuestion.toLowerCase().includes(item.targetTerm.toLowerCase())) {
          const re = new RegExp(`\\b${item.targetTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
          rawQuestion = rawQuestion.replace(re, `**${item.targetTerm}**`);
        }
      }

      const { instruction, question, resolvedSubtype } = cleanAndSeparateInstruction(
        item.instruction,
        rawQuestion,
        type,
        item.subtype,
        item.explanation
      );

      let sanitizedExplanation = String(item.explanation || '').trim();
      // Strip any accidental meta-commentary regarding previous rounds or question history
      sanitizedExplanation = sanitizedExplanation
        .replace(/(?:Lượt|Vòng|Đề|Câu)\s+(?:trước|này|sau|cũ)\s+(?:đã\s+)?(?:kiểm tra|ra|hỏi|thi)[^.]*[\.]?/gi, '')
        .replace(/\(?(?:lượt|vòng|đề|câu)\s+(?:trước|này|sau|cũ)[^)]*\)?/gi, '')
        .trim();

      let sanitizedFocus = String(item.testedFocus || '').trim();
      sanitizedFocus = sanitizedFocus
        .replace(/\(?(?:đề|lượt|vòng|câu)\s+(?:trước|này|sau|cũ)[^)]*\)?/gi, '')
        .trim();

      const targetKey = String(item.targetTerm || '').trim().toLowerCase();
      const profile = profileMap.get(targetKey);

      // Extract target word as it appears directly in the question sentence:
      let targetInSentence = '';
      const boldMatch = question.match(/\*\*([^*]+)\*\*/);
      if (boldMatch && boldMatch[1]) {
        targetInSentence = boldMatch[1].trim();
      } else if (item.targetTerm) {
        const termRegex = new RegExp(`\\b(${item.targetTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[a-z]*)\\b`, 'i');
        const termMatch = question.match(termRegex);
        if (termMatch && termMatch[1]) {
          targetInSentence = termMatch[1].trim();
        } else {
          targetInSentence = item.targetTerm;
        }
      }

      let optA = String(item.options?.A || '').trim();
      let optB = String(item.options?.B || '').trim();
      let optC = String(item.options?.C || '').trim();
      let optD = String(item.options?.D || '').trim();

      const oldCorrectWord = String(item.options?.[item.correctAnswer] || '').trim();

      // Harmonize options to match targetInSentence inflection
      if (type === 'Synonyms/Antonyms' && targetInSentence) {
        optA = harmonizeWordForm(optA, targetInSentence, item.targetTerm);
        optB = harmonizeWordForm(optB, targetInSentence, item.targetTerm);
        optC = harmonizeWordForm(optC, targetInSentence, item.targetTerm);
        optD = harmonizeWordForm(optD, targetInSentence, item.targetTerm);
      }

      const optionsMap: Record<string, string> = { A: optA, B: optB, C: optC, D: optD };
      const correctWord = optionsMap[item.correctAnswer] || oldCorrectWord;

      // Extract suggested words from JSON fields or explanation text
      const extractedFromExp = extractSuggestedWords(item.explanation || '');
      const itemSyns: string[] = Array.isArray(item.suggestedSynonyms) && item.suggestedSynonyms.length > 0
        ? item.suggestedSynonyms.map((s: any) => String(s).trim())
        : extractedFromExp.synonyms;
      const itemAnts: string[] = Array.isArray(item.suggestedAntonyms) && item.suggestedAntonyms.length > 0
        ? item.suggestedAntonyms.map((a: any) => String(a).trim())
        : extractedFromExp.antonyms;

      // Harmonize itemSyns and itemAnts as well
      const harmonizedItemSyns = itemSyns.map((s) => harmonizeWordForm(s, targetInSentence, item.targetTerm));
      const harmonizedItemAnts = itemAnts.map((a) => harmonizeWordForm(a, targetInSentence, item.targetTerm));

      // Build unified full synonym & antonym sets
      const unifiedSynonymsSet = new Set<string>();
      const unifiedAntonymsSet = new Set<string>();

      // 1. If we have a profile from history, add all previously known & tested words
      if (profile) {
        profile.allProposedSynonyms.forEach((w) => {
          if (w.trim()) unifiedSynonymsSet.add(harmonizeWordForm(w.trim(), targetInSentence, item.targetTerm));
        });
        profile.testedSynonyms.forEach((w) => {
          if (w.trim()) unifiedSynonymsSet.add(harmonizeWordForm(w.trim(), targetInSentence, item.targetTerm));
        });
        profile.allProposedAntonyms.forEach((w) => {
          if (w.trim()) unifiedAntonymsSet.add(harmonizeWordForm(w.trim(), targetInSentence, item.targetTerm));
        });
        profile.testedAntonyms.forEach((w) => {
          if (w.trim()) unifiedAntonymsSet.add(harmonizeWordForm(w.trim(), targetInSentence, item.targetTerm));
        });
      }

      // 2. Add current question's correct answer to the appropriate set
      if (type === 'Synonyms/Antonyms') {
        if (resolvedSubtype === 'Synonym' && correctWord) {
          unifiedSynonymsSet.add(correctWord);
        } else if (resolvedSubtype === 'Antonym' && correctWord) {
          unifiedAntonymsSet.add(correctWord);
        }
      }

      // 3. Add current item's suggested words
      harmonizedItemSyns.forEach((w) => { if (w && w.trim()) unifiedSynonymsSet.add(w.trim()); });
      harmonizedItemAnts.forEach((w) => { if (w && w.trim()) unifiedAntonymsSet.add(w.trim()); });

      const finalSynonyms = Array.from(unifiedSynonymsSet).filter(Boolean);
      const finalAntonyms = Array.from(unifiedAntonymsSet).filter(Boolean);

      // If correctWord was inflected (e.g. variation -> variations), update occurrences in sanitizedExplanation
      if (correctWord && oldCorrectWord && correctWord !== oldCorrectWord) {
        const replaceRegex = new RegExp(`(?<=['"\\s(]|^)${oldCorrectWord}(?=[)'"\\s.,;]|$)`, 'g');
        sanitizedExplanation = sanitizedExplanation.replace(replaceRegex, correctWord);
      }

      // Clean and rebuild explanation bullet points for Synonyms/Antonyms
      if (type === 'Synonyms/Antonyms' && (finalSynonyms.length > 0 || finalAntonyms.length > 0)) {
        let baseExplanation = sanitizedExplanation
          .replace(/(?:^|\n)[•\-\*]?\s*(?:từ|các từ)?\s*đồng nghĩa[^:\n]*:[^\n]+/gi, '')
          .replace(/(?:^|\n)[•\-\*]?\s*(?:từ|các từ)?\s*trái nghĩa[^:\n]*:[^\n]+/gi, '')
          .trim();

        const bullets: string[] = [];
        if (finalSynonyms.length > 0) {
          bullets.push(`• Các từ đồng nghĩa chuẩn cùng ngữ cảnh: ${finalSynonyms.join(', ')}`);
        }
        if (finalAntonyms.length > 0) {
          bullets.push(`• Các từ trái nghĩa chuẩn cùng ngữ cảnh: ${finalAntonyms.join(', ')}`);
        }

        sanitizedExplanation = `${baseExplanation}\n${bullets.join('\n')}`.trim();
      }

      let wordBoxOptions: string[] | undefined = undefined;
      let correctWordAnswer: string | undefined = undefined;

      if (type === 'Sentence Completion') {
        const targetTerm = String(item.targetTerm || '').trim();
        correctWordAnswer = targetTerm;

        // Collect all available words from user's notebook
        const notebookTerms = vocabularyList.map((v) => v.term.trim()).filter((t) => t.length > 0);
        const otherTerms = notebookTerms.filter((t) => t.toLowerCase() !== targetTerm.toLowerCase());

        let boxWords: string[] = [];
        if (Array.isArray(item.wordBoxOptions) && item.wordBoxOptions.length === 3) {
          // Verify that all 3 words are strictly from the student's notebook
          const validWords = item.wordBoxOptions
            .map((w: any) => String(w).trim())
            .filter((w: string) => notebookTerms.some((nt) => nt.toLowerCase() === w.toLowerCase()));
          const hasTarget = validWords.some((w: string) => w.toLowerCase() === targetTerm.toLowerCase());
          if (validWords.length === 3 && hasTarget) {
            boxWords = validWords;
          }
        }

        // Guarantee that wordBoxOptions has exactly 3 words, all from student's notebook:
        if (boxWords.length !== 3) {
          const pickedDistractors = [...otherTerms].sort(() => Math.random() - 0.5).slice(0, 2);
          boxWords = [targetTerm, ...pickedDistractors].sort(() => Math.random() - 0.5);
        }

        wordBoxOptions = boxWords;
        const matchedTarget = boxWords.find((w) => w.toLowerCase() === targetTerm.toLowerCase()) || targetTerm;
        correctWordAnswer = matchedTarget;
        optA = boxWords[0] || targetTerm;
        optB = boxWords[1] || '';
        optC = boxWords[2] || '';
        optD = '';
      }

      return {
        id: item.id || `q-${Date.now()}-${idx}`,
        type,
        subtype: resolvedSubtype,
        targetTerm: String(item.targetTerm || '').trim(),
        instruction,
        question,
        testedFocus: sanitizedFocus,
        options: {
          A: optA,
          B: optB,
          C: optC,
          D: optD
        },
        correctAnswer: (['A', 'B', 'C', 'D'].includes(item.correctAnswer)
          ? item.correctAnswer
          : 'A') as 'A' | 'B' | 'C' | 'D',
        explanation: sanitizedExplanation,
        suggestedSynonyms: finalSynonyms,
        suggestedAntonyms: finalAntonyms,
        wordBoxOptions,
        correctWordAnswer
      };
    });

    return formatted;
  }, onModelFallback);

  return formattedQuestions;
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

  const parsed = await executeWithFallback(async (model, apiKey) => {
    const rawText = await callGeminiDirect(model, apiKey, prompt);
    const result = extractJsonFromText(rawText);
    if (!result || typeof result !== 'object') {
      throw new Error(`Model ${model} không trả về dữ liệu mở rộng từ vựng hợp lệ.`);
    }
    return result as WordDeepDive;
  }, onModelFallback);

  return parsed;
}
