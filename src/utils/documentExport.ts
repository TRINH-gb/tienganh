import { VocabularyItem, QuizQuestion, GrammarPracticeQuestion } from '../types';
import { CleanGrammarTopic } from '../data/grammarHandbookTypes';

/**
 * Utility to export authentic Vietnam National High School Exam (THPT Quốc Gia)
 * worksheets, vocabulary lists, and quiz tests into Word-compatible (.doc) documents
 * and formatted printable layouts according to pedagogical standards.
 */

/**
 * Formats multiple-choice options into an MS Word-compatible table.
 * Uses <table> rather than CSS Grid/Flexbox because desktop Word ignores CSS Grid.
 */
function renderOptionsWordTable(options: { A: string; B: string; C: string; D: string }): string {
  const optA = options.A || '';
  const optB = options.B || '';
  const optC = options.C || '';
  const optD = options.D || '';

  const maxLen = Math.max(optA.length, optB.length, optC.length, optD.length);

  // Short options: 4 columns in 1 row (25% each)
  if (maxLen <= 22) {
    return `
    <table style="width: 100%; border: none; margin-left: 15px; margin-top: 4px; margin-bottom: 8px; border-collapse: collapse;">
      <tr>
        <td style="width: 25%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>A.</b> ${optA}</td>
        <td style="width: 25%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>B.</b> ${optB}</td>
        <td style="width: 25%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>C.</b> ${optC}</td>
        <td style="width: 25%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>D.</b> ${optD}</td>
      </tr>
    </table>`;
  }

  // Medium options: 2 columns in 2 rows (50% each)
  if (maxLen <= 48) {
    return `
    <table style="width: 100%; border: none; margin-left: 15px; margin-top: 4px; margin-bottom: 8px; border-collapse: collapse;">
      <tr>
        <td style="width: 50%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>A.</b> ${optA}</td>
        <td style="width: 50%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>B.</b> ${optB}</td>
      </tr>
      <tr>
        <td style="width: 50%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>C.</b> ${optC}</td>
        <td style="width: 50%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>D.</b> ${optD}</td>
      </tr>
    </table>`;
  }

  // Long options: 1 column in 4 rows (100% each)
  return `
  <table style="width: 100%; border: none; margin-left: 15px; margin-top: 4px; margin-bottom: 8px; border-collapse: collapse;">
    <tr><td style="width: 100%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>A.</b> ${optA}</td></tr>
    <tr><td style="width: 100%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>B.</b> ${optB}</td></tr>
    <tr><td style="width: 100%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>C.</b> ${optC}</td></tr>
    <tr><td style="width: 100%; border: none; padding: 2px 6px; vertical-align: top; font-size: 12pt;"><b>D.</b> ${optD}</td></tr>
  </table>`;
}

/**
 * Standard CSS rules optimized for Microsoft Word layout and printing
 */
const WORD_DOC_CSS = `
  @page {
    size: A4;
    margin: 2cm 2cm 2cm 2.5cm;
  }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 12.5pt;
    line-height: 1.35;
    color: #111827;
    margin: 0;
    padding: 0;
  }
  .header-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 14px;
    border-bottom: 2px solid #2563eb;
    padding-bottom: 6px;
  }
  .header-table td {
    vertical-align: middle;
    padding: 2px 0;
  }
  .exam-title {
    text-align: center;
    font-size: 15pt;
    font-weight: bold;
    text-transform: uppercase;
    color: #1e3a8a;
    margin: 14px 0 4px 0;
  }
  .exam-sub {
    text-align: center;
    font-style: italic;
    font-size: 11pt;
    color: #4b5563;
    margin-bottom: 16px;
  }
  .student-info {
    border: 1px dashed #64748b;
    background-color: #f8fafc;
    padding: 8px 14px;
    margin-bottom: 20px;
    font-size: 11pt;
  }
  .section-title {
    font-size: 12pt;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #f1f5f9;
    padding: 6px 12px;
    margin: 18px 0 10px 0;
    border-left: 4px solid #1e3a8a;
    color: #0f172a;
  }
  table.vocab-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 22px;
    font-size: 10.5pt;
  }
  table.vocab-table th, table.vocab-table td {
    border: 1px solid #94a3b8;
    padding: 6px 8px;
  }
  table.vocab-table th {
    background-color: #e2e8f0;
    font-weight: bold;
    text-align: center;
    color: #1e293b;
  }
  .question-block {
    margin-bottom: 14px;
    page-break-inside: avoid;
  }
  .question-prompt {
    font-weight: normal;
    margin-bottom: 4px;
    font-size: 12.5pt;
  }
  .answer-key-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
    margin-bottom: 18px;
    text-align: center;
    font-size: 11pt;
  }
  .answer-key-table th, .answer-key-table td {
    border: 1px solid #64748b;
    padding: 6px 4px;
  }
  .answer-key-table th {
    background-color: #e2e8f0;
    font-weight: bold;
  }
  .explanation-box {
    background-color: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 3.5px solid #2563eb;
    padding: 8px 14px;
    margin-top: 6px;
    margin-bottom: 12px;
    margin-left: 10px;
    font-size: 11pt;
    color: #1f2937;
    line-height: 1.4;
  }
  .theory-summary-box {
    background-color: #f0fdf4;
    border: 1px solid #86efac;
    border-left: 4px solid #16a34a;
    padding: 10px 14px;
    margin-bottom: 18px;
    font-size: 11pt;
  }
  .theory-summary-box h4 {
    margin: 0 0 6px 0;
    color: #15803d;
    font-size: 11.5pt;
    text-transform: uppercase;
  }
  .theory-summary-box ul {
    margin: 4px 0 0 18px;
    padding: 0;
  }
  .theory-summary-box li {
    margin-bottom: 3px;
  }
  .footer-note {
    text-align: center;
    font-size: 11pt;
    font-style: italic;
    color: #64748b;
    margin-top: 30px;
    border-top: 1px solid #cbd5e1;
    padding-top: 10px;
  }
  .page-break {
    page-break-before: always;
    mso-break-type: section-break;
  }
`;

/**
 * Generates formatted HTML for Vocabulary & AI Quiz Questions
 */
export function generateExamDocHtml(
  title: string,
  questions: QuizQuestion[],
  vocabularyList: VocabularyItem[],
  userAnswers?: Record<string, string>
): string {
  const currentDate = new Date().toLocaleDateString('vi-VN');

  // Calculate score if answers provided
  let scoreText = '';
  if (userAnswers && Object.keys(userAnswers).length > 0) {
    const totalAnswered = questions.filter((q) => userAnswers[q.id] !== undefined).length;
    const totalCorrect = questions.filter((q) => {
      const ans = userAnswers[q.id];
      if (q.type === 'Sentence Completion') {
        return (
          ans &&
          (ans.trim().toLowerCase() === (q.correctWordAnswer || q.targetTerm || '').trim().toLowerCase())
        );
      }
      return ans === q.correctAnswer;
    }).length;
    scoreText = `Điểm số tự luyện: ${totalCorrect}/${questions.length} câu đúng (${Math.round((totalCorrect / questions.length) * 100)}%)`;
  }

  return `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${title}</title>
  <style>
    ${WORD_DOC_CSS}
  </style>
</head>
<body>

  <!-- Top App & Author Header -->
  <table class="header-table" style="width: 100%; border-collapse: collapse; margin-bottom: 14px; border-bottom: 2px solid #2563eb; padding-bottom: 6px;">
    <tr>
      <td style="width: 58%; vertical-align: middle; text-align: left; padding: 2px 0;">
        <div style="font-size: 13.5pt; font-weight: bold; color: #1e3a8a; text-transform: uppercase;">
          MASTER THPTQG TIẾNG ANH (EVM)
        </div>
        <div style="font-size: 9.5pt; color: #475569; font-style: italic; margin-top: 2px;">
          AI English Exam Vocabulary Architect • Ứng dụng Luyện thi THPT
        </div>
      </td>
      <td style="width: 42%; vertical-align: middle; text-align: right; padding: 2px 0;">
        <div style="font-size: 11pt; font-weight: bold; color: #0f172a;">
          Developed by Ms.Trinh
        </div>
        <div style="font-size: 9.5pt; color: #475569; margin-top: 1px;">
          THPT Võ Thị Sáu Bà Rịa Vũng Tàu
        </div>
        <div style="font-size: 9.5pt; color: #2563eb; font-weight: bold; margin-top: 1px;">
          Hotline / Zalo: 039.772.6024
        </div>
      </td>
    </tr>
  </table>

  <div class="exam-title">${title}</div>
  <div class="exam-sub">Ngày xuất bản: ${currentDate}</div>

  <!-- Student Info Box -->
  <div class="student-info">
    <table style="width: 100%; border: none;">
      <tr>
        <td style="width: 65%; padding: 2px 0;"><b>Họ và tên học sinh:</b> ............................................................................</td>
        <td style="width: 35%; padding: 2px 0;"><b>Lớp:</b> .........................................</td>
      </tr>
      ${scoreText ? `<tr><td colspan="2" style="padding: 3px 0; color: #166534; font-weight: bold;">📊 <b>${scoreText}</b></td></tr>` : ''}
    </table>
  </div>

  ${
    vocabularyList.length > 0
      ? `
  <!-- Section 1: Vocabulary Core Table -->
  <div class="section-title">PHẦN 1: TỔNG HỢP TỪ VỰNG TRỌNG TÂM (CORE VOCABULARY LIST)</div>
  <table class="vocab-table">
    <thead>
      <tr>
        <th style="width: 5%;">STT</th>
        <th style="width: 14%;">Phân loại</th>
        <th style="width: 22%;">Từ / Cụm từ (IPA)</th>
        <th style="width: 24%;">Ý nghĩa tiếng Việt</th>
        <th style="width: 35%;">Ngữ cảnh trong đề & Mẹo thi THPT</th>
      </tr>
    </thead>
    <tbody>
      ${vocabularyList
        .map(
          (v, idx) => `
        <tr>
          <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
          <td style="text-align: center;"><b>${v.type}</b><br><small style="color: #4b5563;">CEFR: ${v.cefrLevel}</small></td>
          <td><b>${v.term}</b><br><span style="font-family: monospace; font-size: 10pt; color: #4b5563;">${v.ipa || ''}</span></td>
          <td><b>${v.meaning}</b></td>
          <td>
            <i>"${v.context ? v.context.replace(/\*\*/g, '') : ''}"</i>
            ${v.examTip ? `<br><small style="color: #b45309;">💡 <b>Mẹo thi:</b> ${v.examTip}</small>` : ''}
            ${v.sourceExam ? `<br><small style="color: #4338ca;">📑 <b>Đề thi:</b> ${v.sourceExam}</small>` : ''}
          </td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>
  `
      : ''
  }

  ${
    questions.length > 0
      ? `
  <!-- Section 2: Multiple Choice Questions -->
  <div class="section-title">PHẦN 2: BÀI TẬP TRẮC NGHIỆM VẬN DỤNG (PRACTICE QUESTIONS)</div>
  <p style="font-style: italic; margin-bottom: 12px; font-size: 11pt; color: #374151;">
    Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the following questions.
  </p>

  <div class="questions-list">
    ${questions
      .map(
        (q, idx) => `
      <div class="question-block">
        ${q.instruction ? `<div style="font-style: italic; color: #1e293b; font-size: 11pt; margin-bottom: 4px;"><i>${q.instruction.replace(/\b(CLOSEST|OPPOSITE)\b/g, '<b style="text-decoration: underline; color: #b91c1c;">$1</b>')}</i></div>` : ''}
        ${q.type === 'Sentence Completion' && q.wordBoxOptions && q.wordBoxOptions.length > 0 ? `
        <div style="border: 1px solid #4f46e5; background-color: #eef2ff; padding: 5px 12px; margin-bottom: 6px; border-radius: 4px; font-size: 11pt;">
          <b>Hộp từ vựng gợi ý (Word Box):</b> [ ${q.wordBoxOptions.join('  |  ')} ]
        </div>
        <div class="question-prompt">
          <b>Question ${idx + 1}:</b> ${q.question.replace(/\*\*([^*]+)\*\*/g, '<u><b>$1</b></u>')}
        </div>
        <div style="margin-left: 20px; margin-top: 6px; font-size: 11pt;">
          <b>Đáp án tự điền (Your answer):</b> __________________________________
        </div>
        ` : `
        <div class="question-prompt">
          <b>Question ${idx + 1}:</b> ${q.question.replace(/\*\*([^*]+)\*\*/g, '<u><b>$1</b></u>')}
        </div>
        ${renderOptionsWordTable(q.options)}
        `}
      </div>
    `
      )
      .join('')}
  </div>

  <div class="page-break"></div>

  <!-- Section 3: Answer Key & Detailed Explanations -->
  <div class="section-title">PHẦN 3: BẢNG ĐÁP ÁN & LỜI GIẢI CHI TIẾT (ANSWER KEY & EXPLANATIONS)</div>
  
  <h4 style="margin: 12px 0 6px 0; text-transform: uppercase; font-size: 11.5pt; color: #1e3a8a;">
    BẢNG MA TRẬN ĐÁP ÁN NHANH (QUICK ANSWER SHEET):
  </h4>
  <table class="answer-key-table">
    <thead>
      <tr>
        ${questions.map((_, idx) => `<th>Câu ${idx + 1}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      <tr>
        ${questions.map((q) => `<td style="font-weight: bold; font-size: ${q.type === 'Sentence Completion' ? '10.5pt' : '13pt'}; color: #1e3a8a;">${q.type === 'Sentence Completion' ? (q.correctWordAnswer || q.targetTerm) : q.correctAnswer}</td>`).join('')}
      </tr>
      <tr>
        ${questions.map((q) => `<td style="font-size: 10pt; color: #475569;">${q.targetTerm}</td>`).join('')}
      </tr>
    </tbody>
  </table>

  <h4 style="margin-top: 20px; margin-bottom: 10px; text-transform: uppercase; font-size: 11.5pt; color: #1e3a8a;">
    LỜI GIẢI CHI TIẾT VÀ BẢN DỊCH TỪNG CÂU:
  </h4>
  ${questions
    .map(
      (q, idx) => `
    <div style="margin-bottom: 14px; font-size: 11.5pt;">
      <b>Câu ${idx + 1}: Đáp án <span style="color: #1e3a8a; font-size: 12pt;">${q.type === 'Sentence Completion' ? `"${q.correctWordAnswer || q.targetTerm}"` : q.correctAnswer}</span></b> <i>(Từ khóa: <b>${q.targetTerm}</b>)</i>
      <div class="explanation-box">
        💡 <b>Phân tích & Giải thích:</b><br/>
        ${q.explanation.replace(/\n/g, '<br/>')}
      </div>
    </div>
  `
    )
    .join('')}
  `
      : ''
  }

  <div class="footer-note">
    --- HẾT ---<br>
    MASTER THPTQG TIẾNG ANH (EVM) • Developed by Ms.Trinh (THPT Võ Thị Sáu Bà Rịa Vũng Tàu - Hotline/Zalo: 039.772.6024)
  </div>

</body>
</html>
  `.trim();
}

/**
 * Generates formatted HTML for Grammar Handbook Practice Questions
 */
export function generateGrammarExamDocHtml(
  topic: CleanGrammarTopic,
  questions: GrammarPracticeQuestion[],
  userAnswers?: Record<string, 'A' | 'B' | 'C' | 'D'>
): string {
  const currentDate = new Date().toLocaleDateString('vi-VN');

  // Calculate score if answers provided
  let scoreSummaryHtml = '';
  if (userAnswers && Object.keys(userAnswers).length > 0) {
    const answeredCount = questions.filter((q) => userAnswers[q.id] !== undefined).length;
    const correctCount = questions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
    const percent = Math.round((correctCount / questions.length) * 100);
    scoreSummaryHtml = `
      <tr>
        <td colspan="2" style="padding: 3px 0; color: #166534; font-weight: bold;">
          📊 <b>Kết quả tự làm bài:</b> Đã hoàn thành ${answeredCount}/${questions.length} câu • Đúng: <b>${correctCount}/${questions.length} câu (${percent}%)</b>
        </td>
      </tr>
    `;
  }

  return `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${topic.title} - Bài tập vận dụng</title>
  <style>
    ${WORD_DOC_CSS}
  </style>
</head>
<body>

  <!-- Top App & Author Header -->
  <table class="header-table" style="width: 100%; border-collapse: collapse; margin-bottom: 14px; border-bottom: 2px solid #2563eb; padding-bottom: 6px;">
    <tr>
      <td style="width: 58%; vertical-align: middle; text-align: left; padding: 2px 0;">
        <div style="font-size: 13.5pt; font-weight: bold; color: #1e3a8a; text-transform: uppercase;">
          MASTER THPTQG TIẾNG ANH (EVM)
        </div>
        <div style="font-size: 9.5pt; color: #475569; font-style: italic; margin-top: 2px;">
          AI English Exam Vocabulary Architect • Ứng dụng Luyện thi THPT
        </div>
      </td>
      <td style="width: 42%; vertical-align: middle; text-align: right; padding: 2px 0;">
        <div style="font-size: 11pt; font-weight: bold; color: #0f172a;">
          Developed by Ms.Trinh
        </div>
        <div style="font-size: 9.5pt; color: #475569; margin-top: 1px;">
          THPT Võ Thị Sáu Bà Rịa Vũng Tàu
        </div>
        <div style="font-size: 9.5pt; color: #2563eb; font-weight: bold; margin-top: 1px;">
          Hotline / Zalo: 039.772.6024
        </div>
      </td>
    </tr>
  </table>

  <div class="exam-title">BÀI TẬP VẬN DỤNG: ${topic.title.toUpperCase()}</div>
  <div class="exam-sub">
    Chuyên đề ${topic.topicNumber}: ${topic.englishTitle} • Mức độ: ${topic.difficulty} • Ngày xuất bản: ${currentDate}
  </div>

  <!-- Student Info Box -->
  <div class="student-info">
    <table style="width: 100%; border: none;">
      <tr>
        <td style="width: 65%; padding: 2px 0;"><b>Họ và tên học sinh:</b> ............................................................................</td>
        <td style="width: 35%; padding: 2px 0;"><b>Lớp:</b> .........................................</td>
      </tr>
      ${scoreSummaryHtml}
    </table>
  </div>

  <!-- Section 1: Core Formula Summary Box -->
  <div class="theory-summary-box">
    <h4>📌 TÓM TẮT CÔNG THỨC VÀNG & QUY TẮC CỐT LÕI (CHUYÊN ĐỀ ${topic.topicNumber})</h4>
    <ul>
      ${topic.formulas.slice(0, 5).map((f) => `<li><b>Công thức:</b> <code>${f}</code></li>`).join('')}
      ${topic.examTips && topic.examTips.length > 0 ? `<li><b>Mẹo bẫy thi:</b> ${topic.examTips[0].replace(/⚠️/g, '<b>[Lưu ý]</b>')}</li>` : ''}
    </ul>
  </div>

  <!-- Section 2: Questions -->
  <div class="section-title">PHẦN 1: BÀI TẬP TRẮC NGHIỆM VẬN DỤNG (${questions.length} CÂU)</div>
  <p style="font-style: italic; margin-bottom: 12px; font-size: 11pt; color: #374151;">
    Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the following questions.
  </p>

  <div class="questions-list">
    ${questions
      .map(
        (q, idx) => `
      <div class="question-block">
        <div class="question-prompt">
          <b>Question ${idx + 1}:</b> ${q.question.replace(/\*\*([^*]+)\*\*/g, '<u><b>$1</b></u>')}
        </div>
        ${renderOptionsWordTable(q.options)}
      </div>
    `
      )
      .join('')}
  </div>

  <div class="page-break"></div>

  <!-- Section 3: Answer Key & Detailed Explanations -->
  <div class="section-title">PHẦN 2: BẢNG ĐÁP ÁN & LỜI GIẢI CHI TIẾT (ANSWER KEY & EXPLANATIONS)</div>
  
  <h4 style="margin: 12px 0 6px 0; text-transform: uppercase; font-size: 11.5pt; color: #1e3a8a;">
    BẢNG MA TRẬN ĐÁP ÁN:
  </h4>
  <table class="answer-key-table">
    <thead>
      <tr>
        ${questions.map((_, idx) => `<th>Câu ${idx + 1}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      <tr>
        ${questions
          .map(
            (q) => `
          <td style="font-weight: bold; font-size: 13pt; color: #1e3a8a;">
            ${q.correctAnswer}
          </td>
        `
          )
          .join('')}
      </tr>
      ${
        userAnswers && Object.keys(userAnswers).length > 0
          ? `
      <tr>
        ${questions
          .map((q) => {
            const userChoice = userAnswers[q.id];
            if (!userChoice) return '<td style="font-size: 9.5pt; color: #94a3b8;">Chưa làm</td>';
            const isRight = userChoice === q.correctAnswer;
            return `<td style="font-size: 10pt; font-weight: bold; color: ${isRight ? '#15803d' : '#dc2626'};">${userChoice} ${isRight ? '✓' : '✗'}</td>`;
          })
          .join('')}
      </tr>
      `
          : ''
      }
    </tbody>
  </table>

  <h4 style="margin-top: 20px; margin-bottom: 10px; text-transform: uppercase; font-size: 11.5pt; color: #1e3a8a;">
    LỜI GIẢI CHI TIẾT VÀ PHÂN TÍCH BẪY ĐỀ THI:
  </h4>
  ${questions
    .map(
      (q, idx) => `
    <div style="margin-bottom: 14px; font-size: 11.5pt;">
      <b>Câu ${idx + 1}: Đáp án <span style="color: #1e3a8a; font-size: 12pt;">${q.correctAnswer}</span></b>
      <div class="explanation-box">
        ${q.clue ? `🎯 <b>Manh mối nhận diện:</b> <span style="color: #4338ca; font-weight: bold;">${q.clue}</span><br/>` : ''}
        💡 <b>Giải thích chi tiết:</b><br/>
        ${q.explanation.replace(/\n/g, '<br/>')}
        ${q.translation ? `<br/><br/>🌐 <b>Dịch nghĩa:</b> <i>"${q.translation}"</i>` : ''}
      </div>
    </div>
  `
    )
    .join('')}

  <div class="footer-note">
    --- HẾT ---<br>
    MASTER THPTQG TIẾNG ANH (EVM) • Developed by Ms.Trinh (THPT Võ Thị Sáu Bà Rịa Vũng Tàu - Hotline/Zalo: 039.772.6024)
  </div>

</body>
</html>
  `.trim();
}

/**
 * Downloads a Word-compatible (.doc) file for Vocabulary & AI Quiz
 */
export function downloadDocxFile(
  filename: string,
  title: string,
  questions: QuizQuestion[],
  vocabularyList: VocabularyItem[],
  userAnswers?: Record<string, string>
): void {
  const htmlContent = generateExamDocHtml(title, questions, vocabularyList, userAnswers);
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/\s+/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a Word-compatible (.doc) file for Grammar Handbook Exercises
 */
export function downloadGrammarDocxFile(
  filename: string,
  topic: CleanGrammarTopic,
  questions: GrammarPracticeQuestion[],
  userAnswers?: Record<string, 'A' | 'B' | 'C' | 'D'>
): void {
  const htmlContent = generateGrammarExamDocHtml(topic, questions, userAnswers);
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename.replace(/\s+/g, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Opens formatted printable view in a new window
 */
export function printExamDocument(
  title: string,
  questions: QuizQuestion[],
  vocabularyList: VocabularyItem[]
): void {
  const htmlContent = generateExamDocHtml(title, questions, vocabularyList);
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Trình duyệt đã chặn cửa sổ in (pop-up). Vui lòng cho phép pop-up để in đề thi.');
    return;
  }

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Wait for rendering then trigger print dialog
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 500);
}
