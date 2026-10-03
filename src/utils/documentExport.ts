import { VocabularyItem, QuizQuestion } from '../types';

/**
 * Utility to export authentic Vietnam National High School Exam (THPT Quốc Gia)
 * worksheets, vocabulary lists, and quiz tests into Word-compatible (.doc) documents
 * and formatted printable layouts according to pedagogical standards.
 */

export function generateExamDocHtml(
  title: string,
  questions: QuizQuestion[],
  vocabularyList: VocabularyItem[]
): string {
  const currentDate = new Date().toLocaleDateString('vi-VN');

  return `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${title}</title>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 13pt;
      line-height: 1.4;
      color: #000000;
      margin: 2cm 2cm;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .header-table td {
      vertical-align: top;
      padding: 0;
    }
    .left-header {
      width: 50%;
      text-align: center;
      font-weight: bold;
    }
    .right-header {
      width: 50%;
      text-align: center;
      font-weight: bold;
    }
    .exam-title {
      text-align: center;
      font-size: 15pt;
      font-weight: bold;
      text-transform: uppercase;
      margin: 15px 0 5px 0;
    }
    .exam-sub {
      text-align: center;
      font-style: italic;
      font-size: 12pt;
      margin-bottom: 20px;
    }
    .student-info {
      border: 1px dashed #666;
      padding: 10px 15px;
      margin-bottom: 25px;
      font-size: 12pt;
    }
    .section-title {
      font-size: 13pt;
      font-weight: bold;
      text-transform: uppercase;
      background-color: #f2f2f2;
      padding: 6px 10px;
      margin: 20px 0 10px 0;
      border-left: 4px solid #000;
    }
    table.vocab-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 25px;
      font-size: 11pt;
    }
    table.vocab-table th, table.vocab-table td {
      border: 1px solid #333;
      padding: 6px 8px;
    }
    table.vocab-table th {
      background-color: #eaeaea;
      font-weight: bold;
      text-align: center;
    }
    .question-block {
      margin-bottom: 16px;
      page-break-inside: avoid;
    }
    .question-prompt {
      font-weight: bold;
      margin-bottom: 6px;
    }
    .options-grid {
      margin-left: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px;
    }
    .option-item {
      margin-bottom: 4px;
    }
    .answer-key-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      text-align: center;
      font-size: 11pt;
    }
    .answer-key-table th, .answer-key-table td {
      border: 1px solid #333;
      padding: 6px 4px;
    }
    .answer-key-table th {
      background-color: #eaeaea;
      font-weight: bold;
    }
    .explanation-box {
      background-color: #fafafa;
      border: 1px solid #ddd;
      padding: 8px 12px;
      margin-top: 5px;
      margin-left: 20px;
      font-size: 11pt;
      color: #333;
    }
    .footer-note {
      text-align: center;
      font-size: 11pt;
      font-style: italic;
      margin-top: 30px;
      border-top: 1px solid #ccc;
      padding-top: 10px;
    }
    @media print {
      body { margin: 1.5cm; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>

  <!-- Top Ministry & School Header -->
  <table class="header-table">
    <tr>
      <td class="left-header">
        SỞ GD&ĐT / TRƯỜNG THPT: .............................<br>
        TỔ BỘ MÔN TIẾNG ANH<br>
        -------------------------
      </td>
      <td class="right-header">
        KỲ THI TỐT NGHIỆP THPT QUỐC GIA<br>
        BÀI THI: NGOẠI NGỮ; MÔN: TIẾNG ANH<br>
        <i>Thời gian làm bài: 50 phút (không kể thời gian phát đề)</i>
      </td>
    </tr>
  </table>

  <div class="exam-title">${title}</div>
  <div class="exam-sub">Hệ thống bóc tách & biên soạn đề thi: AI Exam Vocabulary Architect (EVM) • Ngày: ${currentDate}</div>

  <!-- Student Info Box -->
  <div class="student-info">
    <table style="width: 100%; border: none;">
      <tr>
        <td style="width: 60%;">Họ và tên thí sinh: ............................................................................</td>
        <td style="width: 40%;">Lớp: .............................</td>
      </tr>
      <tr>
        <td>Số báo danh (SBD): ........................................................................</td>
        <td>Phòng thi: .....................</td>
      </tr>
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
        <th style="width: 15%;">Phân loại</th>
        <th style="width: 20%;">Từ / Cụm từ (IPA)</th>
        <th style="width: 25%;">Ý nghĩa tiếng Việt</th>
        <th style="width: 35%;">Ngữ cảnh trong đề & Mẹo thi THPT</th>
      </tr>
    </thead>
    <tbody>
      ${vocabularyList
        .map(
          (v, idx) => `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td style="text-align: center;"><b>${v.type}</b><br><small style="color: #666;">CEFR: ${v.cefrLevel}</small></td>
          <td><b>${v.term}</b><br><span style="font-family: monospace; font-size: 10pt; color: #555;">${v.ipa || ''}</span></td>
          <td>${v.meaning}</td>
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
  <div class="section-title">PHẦN 2: BÀI TẬP TRẮC NGHIỆM THI THPT QUỐC GIA (PRACTICE QUESTIONS)</div>
  <p style="font-style: italic; margin-bottom: 15px; font-size: 11pt;">
    Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the following questions.
  </p>

  <div class="questions-list">
    ${questions
      .map(
        (q, idx) => `
      <div class="question-block">
        ${q.instruction ? `<div style="font-style: italic; color: #1f2937; font-size: 11pt; margin-bottom: 5px;"><i>${q.instruction.replace(/\b(CLOSEST|OPPOSITE)\b/g, '<b style="text-decoration: underline; color: #b91c1c;">$1</b>')}</i></div>` : ''}
        <div class="question-prompt">
          <b>Question ${idx + 1}:</b> ${q.question.replace(/\*\*([^*]+)\*\*/g, '<u><b>$1</b></u>')}
        </div>
        <div class="options-grid">
          <div class="option-item"><b>A.</b> ${q.options.A}</div>
          <div class="option-item"><b>B.</b> ${q.options.B}</div>
          <div class="option-item"><b>C.</b> ${q.options.C}</div>
          <div class="option-item"><b>D.</b> ${q.options.D}</div>
        </div>
      </div>
    `
      )
      .join('')}
  </div>

  <div style="page-break-before: always;"></div>

  <!-- Section 3: Answer Key & Detailed Explanations -->
  <div class="section-title">PHẦN 3: BẢNG ĐÁP ÁN & LỜI GIẢI CHI TIẾT (ANSWER KEY & EXPLANATIONS)</div>
  <table class="answer-key-table">
    <thead>
      <tr>
        ${questions.map((_, idx) => `<th>Câu ${idx + 1}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      <tr>
        ${questions.map((q) => `<td style="font-weight: bold; font-size: 13pt; color: #1e3a8a;">${q.correctAnswer}</td>`).join('')}
      </tr>
      <tr>
        ${questions.map((q) => `<td style="font-size: 10pt; color: #555;">${q.targetTerm}</td>`).join('')}
      </tr>
    </tbody>
  </table>

  <h4 style="margin-top: 25px; margin-bottom: 10px; text-transform: uppercase;">Lời giải chi tiết từng câu:</h4>
  ${questions
    .map(
      (q, idx) => `
    <div style="margin-bottom: 12px; font-size: 11.5pt;">
      <b>Câu ${idx + 1}: Đáp án ${q.correctAnswer}</b> <i>(${q.targetTerm})</i>
      <div class="explanation-box">
        ${q.explanation}
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
    Thí sinh không được sử dụng tài liệu. Cán bộ coi thi không giải thích gì thêm.
  </div>

</body>
</html>
  `.trim();
}

/**
 * Downloads a Word-compatible (.doc) file
 */
export function downloadDocxFile(
  filename: string,
  title: string,
  questions: QuizQuestion[],
  vocabularyList: VocabularyItem[]
): void {
  const htmlContent = generateExamDocHtml(title, questions, vocabularyList);
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
