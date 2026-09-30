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

      const valid = candidates.filter((id) => !id.includes('deprecated'));

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
