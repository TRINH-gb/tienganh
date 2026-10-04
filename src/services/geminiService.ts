import { VocabularyItem, VocabCategory, QuizQuestion, WordDeepDive, CefrLevel } from '../types';

export const API_KEY_STORAGE_KEY = 'evm_gemini_api_key';
export const MODEL_STORAGE_KEY = 'evm_gemini_model';

export const SUPPORTED_MODELS = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    tag: 'Mặc định (Khuyên dùng)',
    description: 'Thế hệ mới nhất từ Google, phản hồi siêu nhanh, tối ưu ngữ liệu đề thi THPT.',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    tag: 'Ổn định',
    description: 'Mô hình tốc độ cao, xử lý văn bản và đề thi mượt mà.',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    tag: 'Dự phòng',
    description: 'Hạn ngạch ổn định cao, tương thích toàn diện.',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
  }
];

export const DEFAULT_MODEL_ID = 'gemini-3.8-flash';

export const FALLBACK_CHAIN = [
  'gemini-3.8-flash',
  'gemini-2.5-flash',
  'gemini-1.5-flash'
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
  // Auto-migrate away from deprecated models
  if (saved === 'gemini-2.5-flash' || saved === 'gemini-3-flash-preview' || saved === 'gemini-3-pro-preview') {
    localStorage.setItem(MODEL_STORAGE_KEY, DEFAULT_MODEL_ID);
    return DEFAULT_MODEL_ID;
  }
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

3. Tone: Professional, academic, supportive, bilingual English-Vietnamese.

4. Academic Exam Vocabulary Proposal Standards:
   - All synonym and antonym suggestions must be authentic, highly accurate to the specific sentence context, and strictly conform to CEFR B1-C1 standards for Vietnam's National High School Graduation Exam (THPT Quốc Gia).
   - Closed-Loop Lexical Bank: Once a contextual synonym/antonym family is established for a word, questions testing that word in new quiz rounds must select answers from this verified family.`;

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
          !id.includes('imagen')
      );

      // Sort: flash models first, then pro, then others
      return valid.sort((a, b) => {
        const aFlash = a.includes('flash') ? 0 : 1;
        const bFlash = b.includes('flash') ? 0 : 1;
        if (aFlash !== bFlash) return aFlash - bFlash;
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

  // Prioritize preferredModel if valid in liveModels or if liveModels is empty
  if (preferredModel && (!liveModels.length || liveModels.includes(preferredModel))) {
    modelsToTry.push(preferredModel);
  }

  // Add all live models that support generateContent
  for (const lm of liveModels) {
    if (!modelsToTry.includes(lm)) {
      modelsToTry.push(lm);
    }
  }

  // Fallback to static list if live models query returned empty
  for (const m of FALLBACK_CHAIN) {
    const clean = cleanModelId(m);
    if (!modelsToTry.includes(clean)) {
      modelsToTry.push(clean);
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
    const rawText = await executeWithFallback(async (model, apiKey) => {
      return await callGeminiDirect(model, apiKey, prompt, SYSTEM_INSTRUCTION_EVM, pdfBase64);
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
      addedAt: new Date().toISOString(),
      isHighlighted: Boolean(item.isHighlighted)
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
      instruction = 'Mark the letter A, B, C, or D on your answer sheet to indicate the option that best completes each of the following questions.';
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
    specList.push(`- 'Sentence Completion':
    * Test grammatical usage, dependent preposition, or collocation in a complete sentence with a blank ("_______").
    * Instruction MUST be: "Mark the letter A, B, C, or D on your answer sheet to indicate the option that best completes each of the following questions."
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
      targetTerm: "sophisticated",
      testedFocus: "sophisticated (Từ đồng nghĩa - Closest)",
      instruction: "Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) CLOSEST in meaning to the underlined word in the following question.",
      question: "Modern self-driving vehicles utilize **sophisticated** radar sensors to detect nearby obstacles.",
      options: {
        A: "advanced",
        B: "rudimentary",
        C: "simple",
        D: "clumsy"
      },
      correctAnswer: "A",
      suggestedSynonyms: ["advanced", "complex", "intricate", "state-of-the-art"],
      suggestedAntonyms: ["primitive", "rudimentary", "simple", "basic"],
      explanation: "Từ 'sophisticated' (tinh vi, tiên tiến) đồng nghĩa với 'advanced'.\n• Các từ đồng nghĩa chuẩn cùng ngữ cảnh: advanced, complex, intricate, state-of-the-art\n• Các từ trái nghĩa chuẩn cùng ngữ cảnh: primitive, rudimentary, simple, basic"
    });
  }
  if (allowedTypes.includes('Sentence Completion') && exampleQuestions.length < 2) {
    exampleQuestions.push({
      id: "q_sc",
      type: "Sentence Completion",
      subtype: "None",
      targetTerm: "take after",
      testedFocus: "tiểu từ 'after' trong 'take after'",
      instruction: "Mark the letter A, B, C, or D on your answer sheet to indicate the option that best completes each of the following questions.",
      question: "In terms of temperament, the young boy seems to take _______ his grandfather.",
      options: {
        A: "after",
        B: "up",
        C: "down",
        D: "over"
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

Return valid JSON in this exact structure:
{
  "questions": ${JSON.stringify(exampleQuestions, null, 2)}
}`;

  const rawText = await executeWithFallback(async (model, apiKey) => {
    return await callGeminiDirect(model, apiKey, prompt);
  }, onModelFallback);

  const parsed = extractJsonFromText(rawText);
  if (!parsed.questions || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('Dữ liệu câu hỏi trắc nghiệm không hợp lệ.');
  }

  const formatted: QuizQuestion[] = parsed.questions.map((item: any, idx: number) => {
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

    // Extract suggested words from JSON fields or explanation text
    const extractedFromExp = extractSuggestedWords(item.explanation || '');
    const itemSyns: string[] = Array.isArray(item.suggestedSynonyms) && item.suggestedSynonyms.length > 0
      ? item.suggestedSynonyms.map((s: any) => String(s).trim())
      : extractedFromExp.synonyms;
    const itemAnts: string[] = Array.isArray(item.suggestedAntonyms) && item.suggestedAntonyms.length > 0
      ? item.suggestedAntonyms.map((a: any) => String(a).trim())
      : extractedFromExp.antonyms;

    const correctWord = String(item.options?.[item.correctAnswer] || '').trim();

    // Build unified full synonym & antonym sets
    const unifiedSynonymsSet = new Set<string>();
    const unifiedAntonymsSet = new Set<string>();

    // 1. If we have a profile from history, add all previously known & tested words
    if (profile) {
      profile.allProposedSynonyms.forEach((w) => { if (w.trim()) unifiedSynonymsSet.add(w.trim()); });
      profile.testedSynonyms.forEach((w) => { if (w.trim()) unifiedSynonymsSet.add(w.trim()); });
      profile.allProposedAntonyms.forEach((w) => { if (w.trim()) unifiedAntonymsSet.add(w.trim()); });
      profile.testedAntonyms.forEach((w) => { if (w.trim()) unifiedAntonymsSet.add(w.trim()); });
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
    itemSyns.forEach((w) => { if (w && w.trim()) unifiedSynonymsSet.add(w.trim()); });
    itemAnts.forEach((w) => { if (w && w.trim()) unifiedAntonymsSet.add(w.trim()); });

    const finalSynonyms = Array.from(unifiedSynonymsSet).filter(Boolean);
    const finalAntonyms = Array.from(unifiedAntonymsSet).filter(Boolean);

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

    return {
      id: item.id || `q-${Date.now()}-${idx}`,
      type,
      subtype: resolvedSubtype,
      targetTerm: String(item.targetTerm || '').trim(),
      instruction,
      question,
      testedFocus: sanitizedFocus,
      options: {
        A: String(item.options?.A || ''),
        B: String(item.options?.B || ''),
        C: String(item.options?.C || ''),
        D: String(item.options?.D || '')
      },
      correctAnswer: (['A', 'B', 'C', 'D'].includes(item.correctAnswer)
        ? item.correctAnswer
        : 'A') as 'A' | 'B' | 'C' | 'D',
      explanation: sanitizedExplanation,
      suggestedSynonyms: finalSynonyms,
      suggestedAntonyms: finalAntonyms
    };
  });

  return formatted;
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
