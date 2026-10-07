import { VocabularyItem, VocabCategory, QuizQuestion, WordDeepDive, CefrLevel, GrammarPracticeQuestion } from '../types';

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
    id: 'gemini-1.5-flash-8b',
    name: 'Gemini 1.5 Flash-8B',
    tag: 'Dự phòng siêu nhẹ',
    description: 'Mô hình gọn nhẹ, phản hồi cực nhanh khi mạng chập chờn.',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

export const DEFAULT_MODEL_ID = 'gemini-2.0-flash';

export const FALLBACK_CHAIN = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b'
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
    saved.includes('1.5-pro') ||
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
   - Every vocabulary item in the user's notebook regardless of type can and must be tested in Closest/Opposite formats.

7. Strict Anti-Redundancy & Zero-Trivial-Words Principle (Nguyên tắc Triệt tiêu Từ thừa & Tinh chọn Phân hóa Điểm 8+ 9+):
   - ABSOLUTE PROHIBITION ON ELEMENTARY/COMMON WORDS: Never extract basic A1-A2 or everyday conversational words (e.g. people, person, student, school, book, learn, study, teacher, friend, child, good, bad, happy, important, problem, different, country, world, activity, need, help, make, take, do, go, come, get, have, etc.). High school exam candidates already know these.
   - ABSOLUTE PROHIBITION ON EXAM META-WORDS: Never extract exam instruction or reading prompt words (e.g. according to, passage, paragraph, author, mention, refer to, best title, true/false, following, statement, question, option, answer, blank, line, sentence).
   - NO BARE PREPOSITIONS: Never extract standalone isolated prepositions (in, on, at, for, with, by) unless part of a genuine dependent preposition structure (e.g. capable of) or complete prepositional phrase (e.g. at the expense of).
   - MAXIMUM DISTINCTION FOCUS: Prioritize high-yield Collocations, Phrasal verbs, Idioms, and advanced academic single words (B2-C1) that determine scores 8+ and 9+ in Vietnam's National High School Graduation Exam.`;
/**
 * Cleans and repairs JSON strings from LLM outputs.
 */
function cleanAndRepairJson(raw: string): string {
  let cleaned = raw.trim().replace(/^\uFEFF/, '');

  // Extract markdown code blocks if any
  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch && fenceMatch[1]) {
    cleaned = fenceMatch[1].trim();
  } else {
    // If no fence, try outermost { ... } or [ ... ]
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');

    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket) && lastBrace > firstBrace) {
      cleaned = cleaned.slice(firstBrace, lastBrace + 1);
    } else if (firstBracket !== -1 && lastBracket > firstBracket) {
      cleaned = cleaned.slice(firstBracket, lastBracket + 1);
    }
  }

  // Remove trailing commas before closing braces/brackets
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');

  return cleaned;
}

function sanitizeControlCharsInStrings(raw: string): string {
  let result = '';
  let inString = false;
  let escapeNext = false;

  for (let i = 0; i < raw.length; i++) {
    const char = raw[i];

    if (escapeNext) {
      result += char;
      escapeNext = false;
      continue;
    }

    if (char === '\\') {
      escapeNext = true;
      result += char;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      result += char;
      continue;
    }

    if (inString) {
      if (char === '\n') {
        result += '\\n';
        continue;
      }
      if (char === '\r') {
        result += '\\r';
        continue;
      }
      if (char === '\t') {
        result += '\\t';
        continue;
      }
      const code = char.charCodeAt(0);
      if (code < 32) {
        continue;
      }
    }

    result += char;
  }
  return result;
}

/**
 * Extracts and parses JSON from raw Gemini output that might be wrapped in markdown code blocks.
 */
function extractJsonFromText(rawText: string): any {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Phản hồi từ AI rỗng.');
  }

  const trimmed = rawText.trim();

  // Attempt 1: Direct JSON parse
  try {
    return JSON.parse(trimmed);
  } catch {}

  // Attempt 2: Clean fences, outermost brackets, and trailing commas
  const repaired = cleanAndRepairJson(trimmed);
  try {
    return JSON.parse(repaired);
  } catch {}

  // Attempt 3: Sanitize unescaped newlines/tabs inside strings on the repaired string
  try {
    const sanitized = sanitizeControlCharsInStrings(repaired);
    return JSON.parse(sanitized);
  } catch {}

  // Attempt 4: Sanitize raw trimmed
  try {
    const sanitizedRaw = sanitizeControlCharsInStrings(trimmed);
    return JSON.parse(sanitizedRaw);
  } catch {}

  console.error('[extractJsonFromText] Could not parse AI response. Raw output was:', rawText);
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

let liveModelsCache: { key: string; models: string[]; expiry: number } | null = null;

/**
 * Dynamically queries Google AI Studio for the real list of models supporting generateContent.
 * Caches results for 30 minutes to eliminate redundant HTTP requests on every AI action.
 */
export async function getLiveModelsFromGoogle(apiKey: string): Promise<string[]> {
  const key = apiKey.trim();
  const now = Date.now();
  if (liveModelsCache && liveModelsCache.key === key && liveModelsCache.expiry > now && liveModelsCache.models.length > 0) {
    return liveModelsCache.models;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-goog-api-key': key
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
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
          !id.includes('image') &&
          !id.includes('preview') &&
          !id.includes('experimental') &&
          !id.includes('2.5') && // Exclude 2.5 models because of strict 20 RPD free tier limits
          !id.includes('1.5-pro') && // Exclude 1.5-pro because Google returns 404 on v1beta
          !id.includes('3-') &&
          !id.includes('3.')
      );

      // Stable priority sorting:
      // 0: gemini-2.0-flash (fastest, lowest latency)
      // 1: gemini-1.5-flash
      // 2: gemini-1.5-flash-8b
      const sorted = valid.sort((a, b) => {
        const getScore = (name: string) => {
          if (name === 'gemini-2.0-flash') return 0;
          if (name === 'gemini-1.5-flash') return 1;
          if (name === 'gemini-1.5-flash-8b') return 2;
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

      if (sorted.length > 0) {
        liveModelsCache = { key, models: sorted, expiry: now + 30 * 60 * 1000 };
      }
      return sorted;
    }
  } catch (err) {
    console.warn('[EVM Gemini Service] Could not fetch live models:', err);
  }
  return [];
}

/**
 * Direct call to Google Gemini REST API with strict timeout to prevent infinite UI freezes.
 */
async function callGeminiDirect(
  model: string,
  apiKey: string,
  prompt: string,
  systemInstruction: string = SYSTEM_INSTRUCTION_EVM,
  fileBase64?: string,
  fileMimeType?: string,
  temperature: number = 0.1,
  maxOutputTokens: number = 4096,
  timeoutMs: number = 22000
): Promise<string> {
  const cleanModel = cleanModelId(model);
  const key = apiKey.trim();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${key}`;

  const parts: any[] = [];
  if (fileBase64 && typeof fileBase64 === 'string' && fileBase64.trim()) {
    // Official Google Gemini REST API schema: inlineData with mimeType and base64 data
    parts.push({
      inlineData: {
        mimeType: fileMimeType || 'application/pdf',
        data: fileBase64.trim()
      }
    });
  }
  parts.push({ text: prompt });

  const payload: any = {
    contents: [
      {
        role: 'user',
        parts: parts
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: Math.max(0.0, Math.min(1.0, temperature)),
      maxOutputTokens: Math.max(512, Math.min(8192, maxOutputTokens))
    }
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': key
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

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
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error(`Model ${cleanModel} phản hồi quá thời gian (${Math.round(timeoutMs / 1000)}s). Đang tự động chuyển model khác.`);
    }
    throw err;
  }
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

  const rawPreferred = cleanModelId(getStoredModel());
  const preferredModel = rawPreferred.includes('1.5-pro') ? DEFAULT_MODEL_ID : rawPreferred;
  const modelsToTry: string[] = [];

  if (liveModels && liveModels.length > 0) {
    // If the user's preferred model is confirmed alive by Google AI Studio, put it first
    if (preferredModel && liveModels.includes(preferredModel)) {
      modelsToTry.push(preferredModel);
    }
    // Then add all remaining live models that Google returned
    for (const m of liveModels) {
      if (!modelsToTry.includes(m)) {
        modelsToTry.push(m);
      }
    }
  } else {
    // Fallback if live models query failed
    if (preferredModel) {
      modelsToTry.push(preferredModel);
    }
    for (const m of FALLBACK_CHAIN) {
      const clean = cleanModelId(m);
      if (!modelsToTry.includes(clean)) {
        modelsToTry.push(clean);
      }
    }
  }

  // Limit to at most 3 candidate models to prevent long hanging loops
  const candidatesToTry = modelsToTry.slice(0, 3);

  let lastError: Error | null = null;

  for (let i = 0; i < candidatesToTry.length; i++) {
    const currentModel = candidatesToTry[i];
    try {
      return await taskFn(currentModel, apiKey);
    } catch (err: any) {
      lastError = err;
      const errorMsg = err?.message || String(err);
      console.warn(`[EVM Gemini Service] Model ${currentModel} failed:`, errorMsg);

      // Fatal errors indicating the API key is completely invalid or permissions are blocked
      const isKeyInvalid =
        errorMsg.includes('API_KEY_INVALID') ||
        errorMsg.includes('PERMISSION_DENIED') ||
        errorMsg.includes('API key not valid');

      // If the browser device is definitively offline, abort immediately
      const isDeviceOffline = typeof navigator !== 'undefined' && navigator.onLine === false;

      if (isKeyInvalid || isDeviceOffline) {
        throw err;
      }

      // If 429 / RESOURCE_EXHAUSTED or other model-specific errors, continue to the next candidate model
      if (i < candidatesToTry.length - 1) {
        const nextModel = candidatesToTry[i + 1];
        if (onFallback) {
          onFallback(currentModel, nextModel, errorMsg);
        }
      }
    }
  }

  // If all models failed, provide a user-friendly error message
  const lastMsg = lastError?.message || String(lastError || '');
  if (lastMsg.includes('429') || lastMsg.includes('RESOURCE_EXHAUSTED')) {
    throw new Error(
      'Hạn ngạch API Key của bạn trên Google AI Studio đã tạm thời đạt giới hạn hôm nay trên các mô hình Gemini. Vui lòng thử lại sau hoặc nhập API Key khác (hoặc sử dụng ngân hàng đề thi có sẵn).'
    );
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
        contents: [{ role: 'user', parts: [{ text: 'Respond with JSON: {"status":"ok"}' }] }],
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
 * Blacklist of redundant exam meta-words, conversational stop words, and basic A1-A2 vocabulary
 * that should NEVER be extracted into the notebook for Vietnam's National High School Exam.
 */
export const REDUNDANT_WORDS_BLACKLIST = new Set([
  // Reading comprehension & exam question meta-words
  'according to', 'passage', 'paragraph', 'author', 'mention', 'mentions', 'mentioned',
  'refer to', 'refers to', 'referred to', 'imply', 'implies', 'implied', 'infer', 'infers',
  'inferred', 'best title', 'title', 'true', 'false', 'not true', 'following', 'statement',
  'question', 'option', 'answer', 'blank', 'line', 'sentence', 'closest in meaning',
  'opposite in meaning', 'closest', 'opposite', 'meaning', 'synonym', 'antonym',
  // Everyday basic elementary words (A1-A2) that high school candidates already know
  'people', 'person', 'student', 'students', 'teacher', 'teachers', 'school', 'schools',
  'study', 'studies', 'learn', 'learned', 'learning', 'book', 'books', 'live', 'lived',
  'living', 'work', 'worked', 'working', 'job', 'jobs', 'life', 'day', 'days', 'year',
  'years', 'time', 'times', 'world', 'country', 'countries', 'problem', 'problems',
  'thing', 'things', 'way', 'ways', 'good', 'bad', 'new', 'old', 'big', 'small', 'easy',
  'hard', 'important', 'different', 'help', 'helps', 'helped', 'helping', 'need', 'needs',
  'needed', 'try', 'tries', 'tried', 'want', 'wants', 'wanted', 'look', 'looks', 'looked',
  'see', 'saw', 'seen', 'think', 'thought', 'know', 'knew', 'known', 'make', 'do', 'have',
  'get', 'go', 'come', 'take', 'give', 'use', 'find', 'tell', 'say', 'said', 'man', 'men',
  'woman', 'women', 'child', 'children', 'boy', 'girl', 'friend', 'friends', 'family',
  'families', 'home', 'house', 'place', 'water', 'food', 'city', 'cities'
]);

export function isRedundantVocabItem(item: Partial<VocabularyItem>): boolean {
  const termLower = String(item.term || '').trim().toLowerCase();
  if (!termLower) return true;

  // Single bare prepositions without collocation context
  if (item.type === 'Preposition') {
    const barePrepositions = [
      'in', 'on', 'at', 'for', 'with', 'about', 'by', 'of', 'to', 'from',
      'into', 'onto', 'under', 'over', 'between', 'among', 'through', 'during',
      'before', 'after', 'above', 'below', 'behind'
    ];
    if (barePrepositions.includes(termLower)) return true;
  }

  // Exact match with blacklist
  if (REDUNDANT_WORDS_BLACKLIST.has(termLower)) {
    return true;
  }

  // Partial match with common exam meta patterns
  if (
    termLower.startsWith('according to') ||
    termLower.includes('paragraph ') ||
    termLower.includes('passage ') ||
    termLower.includes('best title') ||
    termLower.includes('not true') ||
    termLower === 'the passage' ||
    termLower === 'the author'
  ) {
    return true;
  }

  return false;
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
  fileBase64?: string,
  prioritizeHighlights: boolean = true,
  fileMimeType: string = 'application/pdf',
  strictHighlightOnly: boolean = false
): Promise<ExtractionResult> {
  const categoryConstraint =
    categories && categories.length > 0
      ? `Focus particularly on these categories: ${categories.join(', ')}.`
      : `Categorize all items into the 5 standard categories: 'Single word', 'Phrasal verb', 'Collocation', 'Idiom', 'Preposition'.`;

  const isImage = Boolean(fileMimeType && fileMimeType.startsWith('image/'));
  // If strictHighlightOnly is selected OR it's an image, we enforce strict highlight-only extraction
  const isStrictHighlight = strictHighlightOnly || isImage;

  let highlightSection = '';
  if (isStrictHighlight) {
    highlightSection = `
CRITICAL TARGET INSTRUCTION - STRICT HIGHLIGHT-ONLY EXTRACTION (CHỈ NHẬN DIỆN VỆT BÚT HIGHLIGHT / DẠ QUANG - LOẠI BỎ 100% TỪ THỪA):
The user has selected STRICT HIGHLIGHT MODE. You must ONLY extract vocabulary items that have been highlighted with a HIGHLIGHTER PEN / BÚT DẠ QUANG (any neon color: yellow/vàng, green/xanh lá, orange/cam, pink/hồng, blue/xanh dương, purple/tím...), or marked with [BÔI VÀNG: ...] or ==...== in the document.

STRICT VISUAL & LOGICAL EXTRACTION MANDATES:
1. ONLY EXTRACT HIGHLIGHTED WORDS/PHRASES (CHỈ TRÍCH XUẤT TỪ CÓ VỆT BÚT HIGHLIGHT):
   - Visually scan the entire document/image line by line.
   - Detect ALL words, phrases, phrasal verbs, collocations, idioms, and prepositions that have a translucent neon/colored highlighter stroke covering the text.
   - ABSOLUTE PROHIBITION ON UNHIGHLIGHTED WORDS: DO NOT extract ANY unhighlighted words from reading comprehension texts, passages, or questions. Zero unhighlighted words allowed!
   - Every extracted item MUST have "isHighlighted": true.

2. STRICT EXCLUSION - COMPLETELY IGNORE CIRCLED & UNDERLINED WORDS (TUYỆT ĐỐI BỎ QUA TỪ KHOANH TRÒN HOẶC GẠCH CHÂN):
   - DO NOT extract words, phrases, options, or letters that are CIRCLED with pen or pencil (e.g. circled multiple-choice answers A, B, C, D, circled question numbers).
   - DO NOT extract words that are UNDERLINED with pen, pencil, or ruler (gạch chân bằng bút bi, bút chì).
   - Pen circles and underlines are exam-taking marks or answer selections, NOT target vocabulary. Completely ignore them!

3. EXHAUSTIVE EXTRACTION MANDATE:
   - Extract 100% of the highlighted items without omitting any word/phrase covered by highlighter ink.

4. For each extracted item:
   - "term": Canonical/dictionary base form of the word or phrase (e.g. "make a decision", "break down", "look forward to", "in terms of", "sustainable").
   - "type": Classify accurately into one of: 'Single word', 'Phrasal verb', 'Collocation', 'Idiom', 'Preposition'.
   - "ipa": Standard Cambridge/Oxford phonetic transcription (e.g. "/meɪk ə dɪˈsɪʒ.ən/").
   - "meaning": Accurate Vietnamese translation fitting the exact context of the exam sentence.
   - "context": EXACT sentence from the exam where the word appears, with the target term enclosed in **bold**.
   - "cefrLevel": CEFR difficulty ('B1', 'B2', or 'C1').
   - "examTip": Pedagogical note explaining common exam traps, prepositions, or distractors tested in Vietnam's National High School Graduation Exam (Tốt nghiệp THPT).
   - "isHighlighted": true`;
  } else {
    highlightSection = `
CRITICAL TARGET INSTRUCTION - SMART HIGH-YIELD THPTQG EXTRACTION (TINH LỌC TRỌNG TÂM THPTQG - TRIỆT TIÊU TỪ THỪA):
The uploaded exam is an authentic Vietnamese National High School Graduation Exam (Đề thi Tốt nghiệp THPT Quốc Gia môn Tiếng Anh).
Extract ONLY authentic high-yield, high-distinction vocabulary items (nhóm từ vựng phân hóa điểm 8+ 9+) that high school candidates need for the exam.

STRICT ANTI-REDUNDANCY & BLACKLIST RULES (BỘ QUY TẮC BÀI TRỪ TỪ THỪA):
1. ZERO BASIC/ELEMENTARY WORDS (CẤM TUYỆT ĐỐI TỪ VỰNG CƠ BẢN A1-A2 & LOW B1):
   - DO NOT extract common everyday words that any high school senior already knows, such as: people, person, student, teacher, school, study, learn, book, live, work, job, life, day, year, time, world, country, problem, thing, way, good, bad, new, old, big, small, easy, hard, important, interesting, different, help, need, try, want, look, see, think, know, make, do, have, get, go, come, take, give, tell, say, child, friend, environment, protect, solution, society, develop, provide, produce, community, natural, etc.

2. ZERO EXAM PROMPT META-WORDS (CẤM TỪ CHỈ THỊ / CÂU HỎI ĐỀ THI):
   - DO NOT extract words and phrases that belong to exam instructions or question stems, such as: according to, passage, paragraph, author, mention, refer to, imply, infer, best title, true, not true, false, following, statement, question, option, answer, blank, line, sentence, context, closest in meaning, opposite in meaning.

3. ZERO BARE PREPOSITIONS (CẤM GIỚI TỪ ĐỨNG MỘT MÌNH):
   - DO NOT extract single isolated prepositions ('in', 'on', 'at', 'for', 'with', 'about', 'by', 'of', 'to', 'from').
   - ONLY extract if it is a verified Dependent Preposition structure (e.g. 'capable of', 'immune to', 'associated with') or an authentic Prepositional Phrase (e.g. 'at the expense of', 'in terms of', 'in jeopardy').

4. PRIORITIZE HIGH-DISTINCTION TESTED CATEGORIES:
   - Give highest priority to:
     * Collocations: Natural, idiomatic pairings commonly tested in multiple-choice questions (e.g. 'bear resemblance to', 'take into account', 'pose a threat', 'pay attention to', 'make concessions').
     * Phrasal verbs: Multi-word verbs frequently tested (e.g. 'bring about', 'call off', 'put up with', 'come down with').
     * Idioms: Figurative expressions appearing in conversational or reading questions (e.g. 'a drop in the ocean', 'burn the midnight oil', 'on the fence').
     * Advanced Single words: ONLY academic B2-C1 words that carry significant weight in reading passages (e.g. 'unprecedented', 'deteriorate', 'mitigate', 'reluctant', 'obsolete', 'indispensable').

5. CONCENTRATED QUALITY-OVER-QUANTITY:
   - Extract a compact, high-value set of 15 to 20 top-tier items from the entire exam. Quality and exam distinction value are paramount. DO NOT extract dozens of filler words!
   - For each extracted item:
     * "term": Canonical/dictionary base form of the word or phrase.
     * "type": Classify accurately into one of: 'Single word', 'Phrasal verb', 'Collocation', 'Idiom', 'Preposition'.
     * "ipa": Standard Cambridge/Oxford phonetic transcription.
     * "meaning": Accurate Vietnamese contextual translation.
     * "context": EXACT sentence from the exam with the term in **bold**.
     * "cefrLevel": CEFR difficulty ('B1', 'B2', or 'C1').
     * "examTip": Pedagogical note or exam tip.
     * "isHighlighted": false`;
  }

  const prompt = `Act as the AI English Exam Vocabulary Architect (EVM) specializing in Vietnam's National High School Graduation Exam (Tốt nghiệp THPT môn Tiếng Anh).

${highlightSection}

CATEGORIES CONSTRAINT:
${categoryConstraint}

EXAM TITLE / SOURCE: ${examTitle || 'Đề thi trích dẫn'}

${fileBase64 ? (isStrictHighlight
  ? 'NOTE: Strictly detect ONLY words and phrases highlighted with highlighter pens (bút dạ quang mọi màu sắc). STRICTLY DO NOT extract words that are unhighlighted, or that are circled or underlined with pen/pencil. Zero redundant unhighlighted words.'
  : 'NOTE: The complete authentic exam PDF document is attached as inline document data. Apply the strict anti-redundancy rules to extract only high-yield B2-C1 distinction vocabulary, omitting all common/basic words and exam meta-words.')
  : ''}
${examText ? `EXAM TEXT CONTEXT:\n"""\n${examText.slice(0, 20000)}\n"""` : ''}

REQUIRED JSON OUTPUT FORMAT:
Ensure the response is valid JSON matching this schema:
{
  "summary": "${isStrictHighlight ? 'Tóm tắt sư phạm ngắn gọn bằng tiếng Việt: Nêu rõ tổng số từ/cụm từ bôi bút highlight/dạ quang đã nhận diện thành công (đã loại bỏ 100% từ không bôi highlight, từ khoanh tròn hoặc gạch chân), các cấu trúc phân hóa cao và độ khó tổng thể.' : 'Tóm tắt sư phạm ngắn gọn bằng tiếng Việt: Nêu rõ số lượng từ/cụm từ cốt lõi phân hóa cao B2-C1 đã tinh lọc từ đề thi (đã tự động loại bỏ triệt để từ cơ bản A1-A2, từ chỉ thị câu hỏi và từ thừa), các cấu trúc trọng tâm và độ khó tổng thể.'}",
  "vocabulary": [
    {
      "type": "Collocation",
      "term": "make an effort",
      "ipa": "/meɪk ən ˈefət/",
      "meaning": "nỗ lực, cố gắng",
      "context": "Young graduates must **make an effort** to cultivate skills.",
      "cefrLevel": "B1",
      "examTip": "Bẫy thi THPT: Luôn đi với động từ make (không dùng do an effort).",
      "isHighlighted": ${isStrictHighlight ? 'true' : 'false'}
    }
  ]
}

Respond ONLY with valid JSON. No conversational preamble.`;

  if (onStepProgress) {
    onStepProgress(
      1,
      'running',
      isStrictHighlight
        ? 'Đang quét thị giác nhận diện vệt bút dạ quang & loại bỏ 100% từ thừa...'
        : 'Đang tinh lọc ngữ liệu đề thi, tự động loại bỏ từ cơ bản A1-A2 & meta-words...'
    );
  }

  try {
    const extractionResult = await executeWithFallback(async (model, apiKey) => {
      const rawText = await callGeminiDirect(model, apiKey, prompt, SYSTEM_INSTRUCTION_EVM, fileBase64, fileMimeType);
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

      // Filter out redundant items (blacklist & meta-words)
      let cleaned = formatted.filter((item) => !isRedundantVocabItem(item));

      // If strictHighlightOnly, strictly keep only highlighted items
      if (isStrictHighlight) {
        const onlyHighlighted = cleaned.filter((item) => item.isHighlighted);
        if (onlyHighlighted.length > 0) {
          cleaned = onlyHighlighted;
        }
      }

      if (cleaned.length === 0 && formatted.length > 0) {
        cleaned = formatted;
      }

      return {
        summary: parsed.summary || (isStrictHighlight
          ? 'Đã bóc tách chính xác các từ bôi bút highlight (đã loại bỏ 100% từ thừa).'
          : 'Đã tinh lọc thành công các từ vựng trọng tâm THPTQG (đã loại bỏ từ thừa & từ cơ bản).'),
        vocabulary: cleaned
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
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Sanitize: filter out any corrupt or empty items
    return parsed.filter(
      (h): h is PreviousQuestionHistory =>
        Boolean(h && typeof h.term === 'string' && h.term.trim().length > 0)
    );
  } catch {
    return [];
  }
}

export function saveStoredQuizHistory(history: PreviousQuestionHistory[]): void {
  if (typeof window === 'undefined') return;
  try {
    const valid = history.filter(
      (h) => Boolean(h && typeof h.term === 'string' && h.term.trim().length > 0)
    );
    const trimmed = valid.slice(-60);
    localStorage.setItem(QUIZ_HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('[EVM] Failed to save quiz history:', e);
  }
}

/**
 * Checks whether a candidate sentence matches or closely resembles any sentence in a banned list.
 */
export function isSentenceDuplicate(newSentence: string, bannedList: string[]): boolean {
  if (!newSentence || !bannedList || bannedList.length === 0) return false;
  const cleanNew = newSentence
    .replace(/\*\*/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  if (cleanNew.length < 15) return false;

  const newWords = new Set(cleanNew.split(/\s+/).filter((w) => w.length > 2));
  if (newWords.size === 0) return false;

  for (const banned of bannedList) {
    if (!banned) continue;
    const cleanBanned = banned
      .replace(/\*\*/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    if (cleanBanned.length < 15) continue;

    // Exact match
    if (cleanNew === cleanBanned) return true;

    // High word-level similarity (Jaccard similarity >= 75%)
    const bannedWords = new Set(cleanBanned.split(/\s+/).filter((w) => w.length > 2));
    if (bannedWords.size === 0) continue;

    let commonCount = 0;
    for (const w of newWords) {
      if (bannedWords.has(w)) commonCount++;
    }
    const similarity = commonCount / Math.max(newWords.size, bannedWords.size);
    if (similarity >= 0.75) {
      return true;
    }
  }
  return false;
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
      instruction = 'Complete the sentence by typing the correct form of one of the words provided in the box (change the form if necessary).';
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

  const numQuestions = Math.min(Number(count) || 5, vocabularyList.length || 5);
  const targetTermsList = vocabularyList.slice(0, numQuestions).map((v) => v.term);

  const targetTermsSet = new Set(targetTermsList.map((t) => t.toLowerCase()));
  const otherVocab = vocabularyList.filter((v) => !targetTermsSet.has(v.term.toLowerCase())).slice(0, 4);
  const relevantVocab = [...vocabularyList.slice(0, numQuestions), ...otherVocab];

  // Pure lexical definition only - ZERO passage context sent to AI to prevent copying the original exam sentence!
  const vocabSummary = relevantVocab.map((v) => ({
    term: v.term,
    type: v.type,
    meaning: v.meaning
  }));

  const profileMap = buildTermLexicalProfiles(history);

  // Extract all authentic past question sentences AND all original passage sentences to ban them from repetition!
  const originalPassageSentences = vocabularyList
    .map((v) => v.context?.replace(/\*\*/g, '').trim())
    .filter((c): c is string => Boolean(c && c.length > 5));

  const pastQuestionSentences = history
    .map((h) => h.question?.replace(/\*\*/g, '').trim())
    .filter((q): q is string => Boolean(q && q.length > 5));

  const allBannedSentences = Array.from(new Set([
    ...pastQuestionSentences,
    ...originalPassageSentences
  ])).slice(-15);

  // Generate explicit per-question directives
  const targetDirectives = targetTermsList.map((term, idx) => {
    const termLower = term.trim().toLowerCase();
    const termHistory = history.filter((h) => h.term && h.term.trim().toLowerCase() === termLower);
    const pastQuestions = termHistory.map((h) => h.question?.replace(/\*\*/g, '').trim()).filter(Boolean);

    let directive = `  * Câu ${idx + 1}: BẮT BUỘC kiểm tra từ/cụm từ: "${term}"`;

    if (allowedTypes.length === 1 && allowedTypes[0] === 'Synonyms/Antonyms') {
      const hadSynonym = termHistory.some((h) => h.subtype === 'Synonym');
      const hadAntonym = termHistory.some((h) => h.subtype === 'Antonym');

      if (hadSynonym && !hadAntonym) {
        directive += `\n    -> BẮT BUỘC DẠNG TRÁI NGHĨA (subtype: "Antonym", OPPOSITE in meaning). Lượt trước đã kiểm tra Đồng nghĩa (Closest), lượt này BẮT BUỘC kiểm tra Trái nghĩa (Opposite)!`;
      } else if (hadAntonym && !hadSynonym) {
        directive += `\n    -> BẮT BUỘC DẠNG ĐỒNG NGHĨA (subtype: "Synonym", CLOSEST in meaning). Lượt trước đã kiểm tra Trái nghĩa (Opposite), lượt này BẮT BUỘC kiểm tra Đồng nghĩa (Closest)!`;
      } else {
        directive += `\n    -> Chọn subtype 'Synonym' hoặc 'Antonym' linh hoạt, nhưng BẮT BUỘC dùng ngữ cảnh câu văn mới 100%!`;
      }
    } else if (allowedTypes.includes('Synonyms/Antonyms') && termHistory.length > 0) {
      const lastH = termHistory[termHistory.length - 1];
      if (lastH.type === 'Synonyms/Antonyms') {
        if (lastH.subtype === 'Synonym') {
          directive += `\n    -> BẮT BUỘC ĐẢO CHIỀU: Đổi sang dạng TRÁI NGHĨA (subtype: "Antonym", OPPOSITE in meaning) hoặc chuyển sang dạng Fill-in-the-blank / Sentence Completion!`;
        } else if (lastH.subtype === 'Antonym') {
          directive += `\n    -> BẮT BUỘC ĐẢO CHIỀU: Đổi sang dạng ĐỒNG NGHĨA (subtype: "Synonym", CLOSEST in meaning) hoặc chuyển sang dạng Fill-in-the-blank / Sentence Completion!`;
        }
      }
    }

    if (pastQuestions.length > 0) {
      directive += `\n    -> CẤM LẶP LẠI CÂU VĂN: BẮT BUỘC sáng tạo câu văn mới 100%, tuyệt đối không dùng lại câu cũ: "${pastQuestions[pastQuestions.length - 1]}"`;
    }

    return directive;
  });

  const bannedSection = allBannedSentences.length > 0 ? `
DANH SÁCH CÂU VĂN BỊ CẤM TRÙNG LẶP (BANNED CONTEXT SENTENCES - ZERO REPETITION):
${JSON.stringify(allBannedSentences, null, 2)}

QUY TẮC BẮT BUỘC VỀ NGỮ CẢNH (CRITICAL CONTEXT NOVELTY MANDATE):
- TUYỆT ĐỐI KHÔNG sử dụng lại bất kỳ câu văn, cấu trúc hay tình huống nào trong "DANH SÁCH CÂU VĂN BỊ CẤM TRÙNG LẶP" ở trên!
- Kể cả khi kiểm tra lại cùng một từ vựng, BẮT BUỘC phải sáng tạo CÂU VĂN MỚI 100%, chủ đề mới, ngữ cảnh hoàn toàn mới (công nghệ, trí tuệ nhân tạo, y tế, môi trường, đời sống xã hội, giáo dục, tâm lý học...).
- Tuyệt đối không lặp lại câu văn cũ hoặc chỉ sửa một vài từ vặt!
` : '';

  let historySection = '';
  if (history && history.length > 0) {
    const relevantHistory = history
      .filter((h) => h.term && targetTermsSet.has(h.term.toLowerCase()))
      .slice(-10)
      .map((h, i) => {
        let flipAction = 'Đổi câu văn ngữ cảnh mới';
        if (h.type === 'Synonyms/Antonyms') {
          if (h.subtype === 'Synonym') {
            flipAction = 'ĐÃ KIỂM TRA ĐỒNG NGHĨA (CLOSEST) -> BẮT BUỘC ĐẢO CHIỀU SANG TÌM TỪ TRÁI NGHĨA (OPPOSITE)!';
          } else if (h.subtype === 'Antonym') {
            flipAction = 'ĐÃ KIỂM TRA TRÁI NGHĨA (OPPOSITE) -> BẮT BUỘC ĐẢO CHIỀU SANG TÌM TỪ ĐỒNG NGHĨA (CLOSEST)!';
          }
        } else if (h.type === 'Fill-in-the-blank') {
          flipAction = `Đã kiểm tra điền '${h.testedFocus || h.correctAnswerText || 'từ này'}' -> Lượt này chuyển sang dạng khác`;
        }

        return {
          index: i + 1,
          targetTerm: h.term,
          previousQuestionType: h.type,
          previousSubtype: h.subtype || 'None',
          previousCorrectAnswerWord: h.correctAnswerText || 'N/A',
          mandatoryActionIfReused: flipAction,
          previousQuestion: h.question || ''
        };
      });

    const termProfiles = Array.from(profileMap.values())
      .filter((p) => targetTermsSet.has(p.term.toLowerCase()))
      .map((p) => ({
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
${JSON.stringify(relevantHistory, null, 2)}

NGÂN HÀNG TỪ ĐỒNG NGHĨA / TRÁI NGHĨA ĐÃ XÁC LẬP THEO TỪNG TỪ (ESTABLISHED TERM LEXICAL PROFILES):
${JSON.stringify(termProfiles, null, 2)}

QUY TẮC BẮT BUỘC KHI TẠO ĐỀ MỚI (MANDATORY RULES FOR NEW QUIZ GENERATION):
1. NGUYÊN TẮC KHÉP KÍN & KIỂM TRA ĐÚNG CÁC TỪ ĐÃ ĐỀ XUẤT (CLOSED-LOOP LEXICAL RULE):
   - ĐỐI VỚI CÁC TỪ ĐÃ CÓ TRONG NGÂN HÀNG ĐỀ XUẤT Ở TRÊN (như 'manipulate'):
     * ĐÁP ÁN ĐÚNG CỦA CÂU HỎI TIẾP THEO BẮT BUỘC PHẢI CHỌN TỪ CHÍNH DANH SÁCH ĐÃ ĐỀ XUẤT TRÊN! Tuyệt đối không chọn đáp án ngoài danh sách đề xuất.
     * NẾU RA CÂU HỎI ĐỒNG NGHĨA (CLOSEST):
       -> BẮT BUỘC chọn đáp án đúng từ danh sách các từ đồng nghĩa CHƯA KIỂM TRA ("untestedSynonymsRemaining")!
       -> TUYỆT ĐỐI KHÔNG lặp lại đáp án đã kiểm tra ở lượt trước.
     * NẾU RA CÂU HỎI TRÁI NGHĨA (OPPOSITE - ƯU TIÊN ĐẢO CHIỀU):
       -> BẮT BUỘC chọn đáp án đúng từ danh sách các từ trái nghĩa đã đề xuất ("establishedAntonymsBank" / "untestedAntonymsRemaining").
     * TRONG PHẦN GIẢI THÍCH (EXPLANATION):
       -> Mục "• Các từ đồng nghĩa chuẩn cùng ngữ cảnh:" BẮT BUỘC PHẢI LIỆT KÊ ĐỦ CẢ: từ đáp án câu này, TẤT CẢ các từ đã kiểm tra ở các lượt trước và các từ đã đề xuất! TUYỆT ĐỐI KHÔNG ĐƯỢC BỎ SÓT từ đã kiểm tra!
       -> Mục "• Các từ trái nghĩa chuẩn cùng ngữ cảnh:" BẮT BUỘC giữ nguyên đầy đủ bộ từ trái nghĩa đã đề xuất.

2. QUY TẮC ĐẢO CHIỀU ĐỒNG NGHĨA <-> TRÁI NGHĨA (CRITICAL SYNONYM <-> ANTONYM FLIP RULE):
   - KHI TẠO BỘ ĐỀ MỚI, NẾU CHỌN LẠI CÙNG MỘT TỪ ĐÃ KIỂM TRA Ở LƯỢT TRƯỚC:
     * NẾU CÂU TRƯỚC ĐÃ CHO TÌM TỪ ĐỒNG NGHĨA (CLOSEST / SYNONYM):
       -> Ở LƯỢT NÀY BẮT BUỘC PHẢI CHUYỂN SANG TÌM TỪ TRÁI NGHĨA (OPPOSITE / ANTONYM) CỦA TỪ ĐÓ (với câu ngữ cảnh mới, đáp án đúng là từ trái nghĩa trong ngân hàng đề xuất)!
     * NẾU CÂU TRƯỚC ĐÃ CHO TÌM TỪ TRÁI NGHĨA (OPPOSITE / ANTONYM):
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
DO NOT generate any question type other than "${allowedTypes[0]}"!
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
    specList.push(`- 'Sentence Completion' (Dạng Tự Gõ Hoàn Thành Câu Với Hộp 3 Từ Vựng & Chia Đúng Form Nếu Có):
    * Create an authentic context sentence with a blank ("_______") where the correct word to fill in is ONE of the words in the user's vocabulary list.
    * "wordBoxOptions": An array of EXACTLY 3 words from the user's vocabulary notebook in their base/notebook form (1 target word + 2 other distractor words from the user's vocabulary list).
    * "correctWordAnswer": THE EXACT WORD IN ITS PROPER GRAMMATICAL FORM (inflection) required to complete the blank in the sentence (e.g. past tense 'manipulated' / 'took after', gerund 'manipulating' / 'taking after', plural noun 'fluctuations', or base form if grammatically required). Capitalization does not matter, but grammatical form MUST be accurate!
    * "acceptableAnswers": [array of alternative acceptable strings, e.g. ["manipulated"]].
    * "instruction": "Complete the sentence by typing the correct form of one of the words provided in the box (change the form if necessary)."
    * "options": { "A": word1, "B": word2, "C": word3, "D": "" }
    * "correctAnswer": The letter corresponding to the chosen word from the box ("A", "B", or "C").
    * "explanation": Giải thích nghĩa của từ và nêu rõ lí do ngữ pháp cần chia dạng từ đó trong câu.
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
      targetTerm: "manipulate",
      wordBoxOptions: ["manipulate", "tackle", "fluctuate"],
      correctWordAnswer: "manipulated",
      acceptableAnswers: ["manipulated"],
      testedFocus: "dạng quá khứ 'manipulated'",
      instruction: "Complete the sentence by typing the correct form of one of the words provided in the box (change the form if necessary).",
      question: "The software algorithm secretly _______ user preferences during the recent election campaign.",
      options: {
        A: "manipulate",
        B: "tackle",
        C: "fluctuate",
        D: ""
      },
      correctAnswer: "A",
      explanation: "Từ cần điền là 'manipulate' (thao túng), nhưng theo ngữ cảnh câu diễn ra trong quá khứ ('during the recent election campaign'), học sinh phải chia dạng quá khứ đơn là 'manipulated'."
    });
  }

  const prompt = `Act as the EVM Architect to create high-quality multiple choice exam questions strictly following the format of Vietnam's National High School Graduation Exam (Tốt nghiệp THPT).

USER'S TARGET VOCABULARY LIST (Prioritized order):
${JSON.stringify(vocabSummary, null, 2)}
${bannedSection}
${historySection}
${typeConstraintNotice}
CRITICAL MANDATORY CONSTRAINT - 100% DISTINCT TARGET TERMS & ZERO REPETITION:
- You MUST generate exactly ${numQuestions} questions.
- EACH QUESTION MUST TEST A COMPLETELY DIFFERENT VOCABULARY ITEM ACCORDING TO THESE MANDATORY DIRECTIVES:
${targetDirectives.join('\n')}
- STRICTLY FORBIDDEN: DO NOT repeat or test the same target term more than once in this quiz!
- STRICTLY FORBIDDEN: DO NOT repeat any context sentence from previous rounds or the reading passage! Every single question MUST have a 100% brand-new, authentic context sentence!
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
}
`;

  const formattedQuestions = await executeWithFallback(async (model, apiKey) => {
    const rawText = await callGeminiDirect(
      model,
      apiKey,
      prompt,
      SYSTEM_INSTRUCTION_EVM,
      undefined,
      undefined,
      0.7,
      2048,
      18000
    );
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

      // Robust targetTerm resolution:
      const requestedTerm = (targetTermsList[idx] || '').trim();
      let resolvedTerm = String(
        item.targetTerm ||
        item.term ||
        item.target_term ||
        item.targetWord ||
        item.target_word ||
        item.word ||
        ''
      ).trim();

      if (!resolvedTerm || resolvedTerm.toLowerCase() === 'undefined' || resolvedTerm.toLowerCase() === 'null') {
        const matchedTarget = targetTermsList.find((t) => {
          const tRegex = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
          return tRegex.test(item.question || '') || tRegex.test(item.explanation || '');
        });
        resolvedTerm = matchedTarget || requestedTerm;
      }

      let rawQuestion = String(item.question || '').trim();

      // If type is Fill-in-the-blank or Sentence Completion, ensure question has "_______"
      if (type === 'Fill-in-the-blank' || type === 'Sentence Completion') {
        if (!rawQuestion.includes('_______') && !rawQuestion.includes('______') && !rawQuestion.includes('____')) {
          if (/\*\*[^*]+\*\*/.test(rawQuestion)) {
            rawQuestion = rawQuestion.replace(/\*\*[^*]+\*\*/, '_______');
          } else if (resolvedTerm && rawQuestion.toLowerCase().includes(resolvedTerm.toLowerCase())) {
            const re = new RegExp(resolvedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
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
        if (rawQuestion.includes('_______') && resolvedTerm) {
          rawQuestion = rawQuestion.replace('_______', `**${resolvedTerm}**`);
        } else if (!rawQuestion.includes('**') && resolvedTerm && rawQuestion.toLowerCase().includes(resolvedTerm.toLowerCase())) {
          const re = new RegExp(`\\b${resolvedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
          rawQuestion = rawQuestion.replace(re, `**${resolvedTerm}**`);
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

      const targetKey = resolvedTerm.toLowerCase();
      const profile = profileMap.get(targetKey);

      // Extract target word as it appears directly in the question sentence:
      let targetInSentence = '';
      const boldMatch = question.match(/\*\*([^*]+)\*\*/);
      if (boldMatch && boldMatch[1]) {
        targetInSentence = boldMatch[1].trim();
      } else if (resolvedTerm) {
        const termRegex = new RegExp(`\\b(${resolvedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[a-z]*)\\b`, 'i');
        const termMatch = question.match(termRegex);
        if (termMatch && termMatch[1]) {
          targetInSentence = termMatch[1].trim();
        } else {
          targetInSentence = resolvedTerm;
        }
      }

      let optA = String(item.options?.A || '').trim();
      let optB = String(item.options?.B || '').trim();
      let optC = String(item.options?.C || '').trim();
      let optD = String(item.options?.D || '').trim();

      const oldCorrectWord = String(item.options?.[item.correctAnswer] || '').trim();

      // Harmonize options to match targetInSentence inflection
      if (type === 'Synonyms/Antonyms' && targetInSentence) {
        optA = harmonizeWordForm(optA, targetInSentence, resolvedTerm);
        optB = harmonizeWordForm(optB, targetInSentence, resolvedTerm);
        optC = harmonizeWordForm(optC, targetInSentence, resolvedTerm);
        optD = harmonizeWordForm(optD, targetInSentence, resolvedTerm);
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
      const harmonizedItemSyns = itemSyns.map((s) => harmonizeWordForm(s, targetInSentence, resolvedTerm));
      const harmonizedItemAnts = itemAnts.map((a) => harmonizeWordForm(a, targetInSentence, resolvedTerm));

      // Build unified full synonym & antonym sets
      const unifiedSynonymsSet = new Set<string>();
      const unifiedAntonymsSet = new Set<string>();

      // 1. If we have a profile from history, add all previously known & tested words
      if (profile) {
        profile.allProposedSynonyms.forEach((w) => {
          if (w.trim()) unifiedSynonymsSet.add(harmonizeWordForm(w.trim(), targetInSentence, resolvedTerm));
        });
        profile.testedSynonyms.forEach((w) => {
          if (w.trim()) unifiedSynonymsSet.add(harmonizeWordForm(w.trim(), targetInSentence, resolvedTerm));
        });
        profile.allProposedAntonyms.forEach((w) => {
          if (w.trim()) unifiedAntonymsSet.add(harmonizeWordForm(w.trim(), targetInSentence, resolvedTerm));
        });
        profile.testedAntonyms.forEach((w) => {
          if (w.trim()) unifiedAntonymsSet.add(harmonizeWordForm(w.trim(), targetInSentence, resolvedTerm));
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
        const escapedWord = oldCorrectWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const replaceRegex = new RegExp(`(?<=['"\\s(]|^)${escapedWord}(?=[)'"\\s.,;]|$)`, 'g');
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
      let acceptableAnswers: string[] | undefined = undefined;

      if (type === 'Sentence Completion') {
        const targetTerm = resolvedTerm;
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
        const matchedNotebookTerm = boxWords.find((w) => w.toLowerCase() === targetTerm.toLowerCase()) || targetTerm;
        const rawCorrectWord = String(item.correctWordAnswer || '').trim();
        correctWordAnswer = rawCorrectWord || matchedNotebookTerm;

        const answersList: string[] = [];
        if (Array.isArray(item.acceptableAnswers)) {
          item.acceptableAnswers.forEach((a: any) => {
            const s = String(a).trim();
            if (s && !answersList.includes(s)) answersList.push(s);
          });
        }
        if (correctWordAnswer && !answersList.includes(correctWordAnswer)) {
          answersList.push(correctWordAnswer);
        }
        acceptableAnswers = answersList;

        optA = boxWords[0] || targetTerm;
        optB = boxWords[1] || '';
        optC = boxWords[2] || '';
        optD = '';
      }

      return {
        id: item.id || `q-${Date.now()}-${idx}`,
        type,
        subtype: resolvedSubtype,
        targetTerm: resolvedTerm,
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
        correctWordAnswer,
        acceptableAnswers
      };
    });

    // Code-level strict verification: Check if any question repeats a banned sentence
    for (const q of formatted) {
      if (isSentenceDuplicate(q.question, allBannedSentences)) {
        throw new Error(
          `AI đã tạo lại câu văn bị trùng lặp: "${q.question.slice(0, 50)}...". Kích hoạt cơ chế tự động thử lại với câu văn mới.`
        );
      }
    }

    // Deduplicate questions by targetTerm and sentence to guarantee distinct questions
    const seenTerms = new Set<string>();
    const seenSentences = new Set<string>();
    const deduplicated: QuizQuestion[] = [];
    for (const q of formatted) {
      const tKey = q.targetTerm.trim().toLowerCase();
      const sKey = q.question.trim().toLowerCase();
      if (tKey && seenTerms.has(tKey)) continue;
      if (sKey && seenSentences.has(sKey)) continue;
      if (tKey) seenTerms.add(tKey);
      if (sKey) seenSentences.add(sKey);
      deduplicated.push(q);
    }

    return deduplicated.length > 0 ? deduplicated : formatted;
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

/**
 * Task 4: Dynamic AI Quiz Generation for a specific Grammar Topic
 */
export async function generateGrammarQuizWithFallback(
  topicTitle: string,
  englishTitle: string,
  count: number = 5,
  onModelFallback?: (failedModel: string, nextModel: string, error: string) => void
): Promise<GrammarPracticeQuestion[]> {
  const prompt = `Bạn là chuyên gia ra đề thi THPT Quốc Gia môn Tiếng Anh.
Hãy tạo ${count} câu hỏi trắc nghiệm mới toanh, chuẩn ma trận thi tốt nghiệp THPT cho chuyên đề: "${topicTitle}" (${englishTitle}).

Yêu cầu:
1. Câu hỏi 4 phương án A, B, C, D rõ ràng, bám sát cấu trúc đề thi tốt nghiệp THPT mới.
2. Dấu hiệu nhận biết và ngữ cảnh câu rõ ràng, thực tế.
3. Giải thích ngắn gọn, súc tích chỉ rõ tại sao chọn đáp án đó và dịch nghĩa câu tiếng Việt.
4. Trả về đúng định dạng JSON:
{
  "questions": [
    {
      "id": "ai-q-1",
      "question": "Câu hỏi tiếng Anh...",
      "options": {
        "A": "Đáp án A",
        "B": "Đáp án B",
        "C": "Đáp án C",
        "D": "Đáp án D"
      },
      "correctAnswer": "A",
      "explanation": "Giải thích chi tiết ngắn gọn...",
      "clue": "Dấu hiệu nhận biết...",
      "translation": "Dịch nghĩa tiếng Việt..."
    }
  ]
}`;

  const parsed = await executeWithFallback(async (model, apiKey) => {
    const rawText = await callGeminiDirect(
      model,
      apiKey,
      prompt,
      SYSTEM_INSTRUCTION_EVM,
      undefined,
      undefined,
      0.2,
      2048,
      20000
    );
    const result = extractJsonFromText(rawText);
    const qList = extractQuestionsArray(result);
    if (!Array.isArray(qList) || qList.length === 0) {
      throw new Error(`Model ${model} không trả về danh sách câu hỏi trắc nghiệm hợp lệ.`);
    }

    return qList.map((q: any, idx: number) => ({
      id: `ai-gen-${Date.now()}-${idx + 1}`,
      question: String(q.question || '').trim(),
      options: {
        A: String(q.options?.A || '').trim(),
        B: String(q.options?.B || '').trim(),
        C: String(q.options?.C || '').trim(),
        D: String(q.options?.D || '').trim()
      },
      correctAnswer: (['A', 'B', 'C', 'D'].includes(q.correctAnswer) ? q.correctAnswer : 'A') as 'A' | 'B' | 'C' | 'D',
      explanation: String(q.explanation || '').trim(),
      clue: q.clue ? String(q.clue).trim() : undefined,
      translation: q.translation ? String(q.translation).trim() : undefined
    }));
  }, onModelFallback);

  return parsed;
}
