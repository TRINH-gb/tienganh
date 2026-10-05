import { CleanGrammarTopic } from './grammarHandbookTypes';

export const TOPICS_PART_3: CleanGrammarTopic[] = [
  // =========================================================================
  // CHUYÊN ĐỀ 13: TRẠNG TỪ LIÊN KẾT (CONJUNCTIVE ADVERBS / LINKING ADVERBS)
  // =========================================================================
  {
    id: 'topic-13',
    topicNumber: 13,
    title: 'Chuyên đề 13: Trạng từ liên kết',
    shortTitle: 'Trạng từ liên kết',
    englishTitle: 'Conjunctive Adverbs & Discourse Markers',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 - 0.4 điểm (Thường xuyên xuất hiện trong bài đọc điền từ Cloze Test & Đọc hiểu) • Cấp độ: Thông hiểu',
    concept: 'Trạng từ liên kết (từ nối đoạn văn) dùng để kết nối logic giữa hai câu độc lập hoặc hai ý trong một diễn ngôn. Bản chất đề thi là kiểm tra mối quan hệ ý nghĩa (tương phản, kết quả, bổ sung, ví dụ) và VỊ TRÍ DẤU CÂU ĐẶC TRƯNG.',
    recognitionSignals: [
      'Chỗ trống đứng sau DẤU CHẤM PHẨY và trước DẤU PHẨY: ; _______,',
      'Chỗ trống đứng ở ĐẦU CÂU MỚI ngay sau dấu chấm và trước dấu phẩy: . _______,',
      'Bốn phương án gồm: However, Therefore, Furthermore, In addition, In contrast, For instance.'
    ],
    formulas: [
      'Công thức dấu câu 1: Mệnh đề 1; HOWEVER / THEREFORE / MOREOVER, Mệnh đề 2.',
      'Công thức dấu câu 2: Mệnh đề 1. HOWEVER / THEREFORE / MOREOVER, Mệnh đề 2.',
      'Công thức chèn giữa: S, HOWEVER / THEREFORE, + V + O.',
      'BẪY DẤU CÂU: However KHÔNG BAO GIỜ nối 2 mệnh đề chỉ có 1 dấu phẩy đơn (S1 + V1, however S2 + V2 là SAI!).'
    ],
    detailedSections: [
      {
        heading: '1. Phân loại Trạng từ liên kết theo Chức năng Ngữ nghĩa',
        badge: 'Phân loại nghĩa',
        content: 'Bốn nhóm trạng từ liên kết chính trong đề thi THPTQG:',
        bulletPoints: [
          'Nhóm 1 - Tương phản / Đối lập (Tuy nhiên, thế nhưng): However, Nevertheless, Nonetheless, On the contrary, In contrast, On the other hand.',
          'Nhóm 2 - Kết quả / Hệ quả (Do đó, vì vậy): Therefore, Consequently, As a result, Thus, Hence.',
          'Nhóm 3 - Bổ sung / Thêm ý (Hơn nữa, ngoài ra): Furthermore, Moreover, In addition, Additionally, Besides, What is more.',
          'Nhóm 4 - Minh họa / Nhấn mạnh (Ví dụ, thực tế là): For example, For instance, In fact, Indeed, That is (to say).'
        ]
      },
      {
        heading: '2. BẪY KINH ĐIỂN ĐỀ THI: Phân biệt However vs Although',
        badge: 'Bẫy dấu câu 9+',
        content: 'Rất nhiều học sinh mất điểm oan vì không phân biệt được bản chất cú pháp giữa hai từ này:',
        rules: [
          'ALTHOUGH là Liên từ phụ thuộc: Dùng để nối 2 mệnh đề phụ và chính TRONG CÙNG MỘT CÂU, chỉ cần 1 dấu phẩy ở giữa: Although S1 + V1, S2 + V2. (Tuyệt đối KHÔNG có dấu phẩy ngay sau Although!).',
          'HOWEVER là Trạng từ liên kết: Đứng độc lập giữa hai câu riêng biệt, BẮT BUỘC có dấu phẩy ngay sau nó: S1 + V1. However, S2 + V2. HOẶC S1 + V1; however, S2 + V2.'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng phân biệt: Although vs However',
      headers: ['Tiêu chí', 'Although (Liên từ phụ thuộc)', 'However (Trạng từ liên kết)'],
      rows: [
        ['Cấu trúc dấu câu', 'Although + S + V, S + V. (Không có phẩy sau Although)', 'S + V. However, S + V. (Bắt buộc có phẩy sau However)'],
        ['Số câu nối', 'Nối 2 mệnh đề trong CÙNG 1 CÂU', 'Nối 2 CÂU HOÀN CHỈNH độc lập về ngữ pháp'],
        ['Ví dụ sai', 'Although, it rained, we went out. (SAI DẤU PHẨY)', 'It rained, however we went out. (SAI DẤU CHẤM/PHẨY)']
      ]
    },
    rules: [
      { label: 'Tương phản', text: 'However, Nevertheless (Tuy nhiên); In contrast (Ngược lại).' },
      { label: 'Kết quả', text: 'Therefore, Consequently, As a result (Do đó, vì vậy).' },
      { label: 'Bổ sung', text: 'Moreover, Furthermore, In addition (Hơn nữa, ngoài ra).' },
      { label: 'Quy tắc dấu câu', text: '; However,  HOẶC  . However, (bắt buộc có dấu phẩy liền sau).' }
    ],
    examples: [
      {
        en: 'The initial investment was substantial; however, the long-term profits justified the expense.',
        vi: 'Khoản đầu tư ban đầu rất lớn; tuy nhiên, lợi nhuận dài hạn đã chứng minh tính hợp lý của chi phí đó.',
        note: 'Dấu chấm phẩy trước và dấu phẩy sau however: ; however, ...'
      },
      {
        en: 'Renewable energy protects the environment. Moreover, it creates millions of green jobs worldwide.',
        vi: 'Năng lượng tái tạo bảo vệ môi trường. Hơn nữa, nó tạo ra hàng triệu việc làm xanh trên toàn thế giới.',
        note: 'Moreover đứng đầu câu mới sau dấu chấm để bổ sung thêm một luận điểm tích cực.'
      }
    ],
    examTips: [
      '⚠️ Mẹo quan sát dấu câu: Nếu thấy chỗ trống có dạng "; _______," hoặc ". _______," -> 100% chọn Trạng từ liên kết (However / Therefore / Moreover), loại ngay Although / Because / Since!',
      '⚠️ Đọc kỹ câu trước: Nếu câu trước và câu sau cùng chiều nghĩa (tốt - tốt / xấu - xấu) -> chọn Moreover/Furthermore/Therefore. Nếu ngược chiều (tốt - xấu) -> chọn However/Nevertheless.'
    ],
    questions: [
      {
        id: 'q13-1',
        question: 'Solar power is becoming increasingly affordable. _______, it produces zero greenhouse emissions.',
        options: { A: 'However', B: 'Furthermore', C: 'Therefore', D: 'Although' },
        correctAnswer: 'B',
        explanation: 'Cả hai câu đều nêu ưu điểm của năng lượng mặt trời (giá rẻ hơn & không phát thải khí nhà kính). Đây là mối quan hệ bổ sung thêm ý -> chọn "Furthermore" (hơn nữa).',
        clue: 'bổ sung ý cùng chiều -> Furthermore',
        translation: 'Năng lượng mặt trời đang ngày càng trở nên hợp túi tiền. Hơn nữa, nó hoàn toàn không tạo ra khí thải nhà kính.'
      },
      {
        id: 'q13-2',
        question: 'The experimental medication showed great promise; _______, further clinical trials are necessary.',
        options: { A: 'however', B: 'moreover', C: 'because', D: 'despite' },
        correctAnswer: 'A',
        explanation: 'Vế trước khen ngợi thuốc đầy triển vọng, vế sau nói vẫn cần thử nghiệm thêm (mối quan hệ tương phản đối lập). Vị trí đứng sau dấu chấm phẩy và trước dấu phẩy -> chọn "however".',
        clue: '; however, (tương phản)',
        translation: 'Loại thuốc thử nghiệm cho thấy triển vọng rất lớn; tuy nhiên, các thử nghiệm lâm sàng sâu hơn vẫn là điều cần thiết.'
      },
      {
        id: 'q13-3',
        question: 'The company failed to innovate in time. _______, it lost its leading market position.',
        options: { A: 'In contrast', B: 'Consequently', C: 'Nevertheless', D: 'Besides' },
        correctAnswer: 'B',
        explanation: 'Việc mất vị thế dẫn đầu thị trường là kết quả tất yếu của việc không kịp đổi mới sáng tạo -> chọn "Consequently" (Hệ quả là / Do đó).',
        clue: 'chỉ kết quả hệ quả -> Consequently',
        translation: 'Công ty đã thất bại trong việc đổi mới kịp thời. Hệ quả là, nó đã đánh mất vị trí dẫn đầu thị trường.'
      },
      {
        id: 'q13-4',
        question: 'He was thoroughly qualified for the position. _______, another applicant was selected.',
        options: { A: 'Nevertheless', B: 'Therefore', C: 'Additionally', D: 'Because' },
        correctAnswer: 'A',
        explanation: 'Đủ năng lực nhưng người khác lại được chọn (quan hệ tương phản nhượng bộ) -> dùng "Nevertheless" (dẫu vậy / tuy nhiên).',
        clue: 'tương phản nhượng bộ -> Nevertheless',
        translation: 'Anh ấy hoàn toàn đủ năng lực cho vị trí đó. Dẫu vậy, một ứng viên khác đã được lựa chọn.'
      },
      {
        id: 'q13-5',
        question: 'Regular physical activity strengthens the heart and lungs; _______, it helps alleviate anxiety.',
        options: { A: 'in addition', B: 'on the other hand', C: 'as a result', D: 'otherwise' },
        correctAnswer: 'A',
        explanation: 'Bổ sung thêm lợi ích của hoạt động thể chất (tốt cho tim phổi VÀ giúp giảm bớt lo âu) -> chọn "in addition" (ngoài ra / thêm vào đó).',
        clue: 'bổ sung thêm lợi ích -> in addition',
        translation: 'Hoạt động thể chất thường xuyên giúp tăng cường tim và phổi; thêm vào đó, nó còn giúp giảm bớt sự lo âu.'
      }
    ],
    questionPool: [
      {
        id: 'q13-p1',
        question: 'The team worked tirelessly through the night; _______, they completed the project on schedule.',
        options: { A: 'as a result', B: 'however', C: 'in contrast', D: 'otherwise' },
        correctAnswer: 'A',
        explanation: 'Làm việc không mệt mỏi dẫn đến kết quả hoàn thành đúng hạn -> chọn "as a result" (kết quả là).',
        clue: 'chỉ kết quả -> as a result',
        translation: 'Cả nhóm đã làm việc không biết mệt mỏi suốt đêm; kết quả là, họ đã hoàn thành dự án đúng tiến độ.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 14: MỆNH ĐỀ QUAN HỆ (RELATIVE CLAUSES)
  // =========================================================================
  {
    id: 'topic-14',
    topicNumber: 14,
    title: 'Chuyên đề 14: MĐQH',
    shortTitle: 'Mệnh đề quan hệ',
    englishTitle: 'Relative Clauses',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 - 0.4 điểm (1 - 2 câu trong đề thi THPTQG) • Cấp độ: Nhận biết & Thông hiểu',
    concept: 'Mệnh đề quan hệ dùng để bổ nghĩa cho danh từ đứng trước nó. Đề thi kiểm tra việc lựa chọn Đại từ quan hệ (Who, Whom, Which, Whose, That) hoặc Trạng từ quan hệ (Where, When, Why), và đặc biệt là quy tắc MỆNH ĐỀ CÓ DẤU PHẨY (Không xác định).',
    recognitionSignals: [
      'Chỗ trống đứng ngay sau một danh từ chỉ người, vật, địa điểm, thời gian hoặc lý do.',
      'Câu có hai mệnh đề, mệnh đề sau làm rõ nghĩa cho danh từ của mệnh đề trước.',
      'Có dấu phẩy đứng trước chỗ trống: ..., _______ + V / S + V.'
    ],
    formulas: [
      'WHO + V / S + V (thay cho danh từ chỉ NGƯỜI làm S hoặc O)',
      'WHOM + S + V (thay cho danh từ chỉ NGƯỜI làm O - theo sau BẮT BUỘC là S + V)',
      'WHICH + V / S + V (thay cho danh từ chỉ VẬT làm S hoặc O)',
      'WHOSE + NOUN (thay cho sở hữu cách: whose car, whose father)',
      'WHERE = in / at which | WHEN = on / in / at which | WHY = for which',
      'THAT: Thay cho who, whom, which trong MĐ xác định (KHÔNG CÓ DẤU PHẨY)'
    ],
    detailedSections: [
      {
        heading: '1. Hệ thống Đại từ & Trạng từ quan hệ chuẩn',
        badge: 'Đại từ & Trạng từ',
        content: 'Chức năng của từng từ:',
        bulletPoints: [
          'WHO: Thay cho danh từ chỉ NGƯỜI. Có thể làm Chủ ngữ (Who + V) hoặc Tân ngữ (Who + S + V). (The boy who won the race).',
          'WHOM: Thay cho danh từ chỉ NGƯỜI làm TÂN NGỮ. Phía sau Whom BẮT BUỘC phải là một Mệnh đề có Chủ ngữ (Whom + S + V). (The doctor whom I met yesterday).',
          'WHICH: Thay cho danh từ chỉ VẬT. Có thể làm Chủ ngữ hoặc Tân ngữ. (The laptop which is on the desk).',
          'WHOSE: Chỉ SỞ HỮU. Luôn luôn đứng trước một Danh từ không có mạo từ (Whose + Noun). (The woman whose daughter won the prize).',
          'THAT: Dùng thay cho Who, Whom, Which trong Mệnh đề quan hệ xác định.',
          'WHERE: Thay cho nơi chốn (= in/at/on which). Phía sau luôn là S + V. (The city where I was born).',
          'WHEN: Thay cho thời gian (= in/on/at which). (The day when we met).',
          'WHY: Thay cho lý do, đứng sau "the reason" (= for which).'
        ]
      },
      {
        heading: '2. Phân biệt Mệnh đề Quan hệ Xác định vs Không xác định',
        badge: 'Quy tắc Dấu phẩy',
        content: 'Mệnh đề không xác định là mệnh đề đứng sau Tên riêng (Nam, London), Tính từ sở hữu (my mother), Từ chỉ định (this book) và ĐƯỢC NGĂN CÁCH BỞI DẤU PHẨY.',
        rules: [
          '⚠️ 2 ĐIỀU CẤM KỴ TUYỆT ĐỐI TRONG MỆNH ĐỀ CÓ DẤU PHẨY:',
          '-> 1. CẤM DÙNG "THAT" sau dấu phẩy! Thấy có dấu phẩy trước chỗ trống -> LOẠI NGAY ĐÁP ÁN THAT!',
          '-> 2. CẤM LƯỢC BỎ đại từ quan hệ trong mệnh đề có dấu phẩy!'
        ]
      },
      {
        heading: '3. Giới từ trong Mệnh đề Quan hệ (Preposition + Relative Pronoun)',
        badge: 'Giới từ + MĐQH',
        content: 'Khi đảo giới từ lên trước đại từ quan hệ:',
        rules: [
          'Giới từ CHỈ ĐƯỢC PHÉP đứng trước 2 đại từ: WHOM (chỉ người) và WHICH (chỉ vật).',
          'Ví dụ: The man TO WHOM I spoke (ĐÚNG) | The house IN WHICH I live (ĐÚNG).',
          '⚠️ TUYỆT ĐỐI CẤM: Không bao giờ có "to who" hoặc "in that"!'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng đối chiếu Mệnh đề quan hệ Xác định vs Không xác định',
      headers: ['Đặc điểm', 'Mệnh đề xác định (Defining)', 'Mệnh đề không xác định (Non-defining)'],
      rows: [
        ['Dấu phẩy', 'KHÔNG CÓ dấu phẩy', 'BẮT BUỘC CÓ dấu phẩy ngăn cách'],
        ['Dùng THAT', 'ĐƯỢC PHÉP dùng That thay Who/Which', 'TUYỆT ĐỐI CẤM DÙNG THAT'],
        ['Lược bỏ đại từ', 'Được lược bỏ khi làm Tân ngữ (O)', 'KHÔNG ĐƯỢC lược bỏ đại từ quan hệ'],
        ['Ví dụ', 'The book (that) I read was interesting.', 'Ha Noi, which is the capital, is beautiful.']
      ]
    },
    rules: [
      { label: 'Who vs Whom', text: 'Who + V/S+V; Whom + S+V (bắt buộc làm tân ngữ).' },
      { label: 'Whose', text: 'Whose + Noun (chỉ sở hữu: whose car, whose father).' },
      { label: 'Cấm THAT', text: 'CẤM dùng That sau dấu phẩy và sau giới từ (in that, to that là SAI).' },
      { label: 'Giới từ đứng trước', text: 'Chỉ đi với To whom / In which. Tuyệt đối không dùng to who.' }
    ],
    examples: [
      {
        en: 'The scientist whose breakthrough discovery cured millions was awarded the Nobel Prize.',
        vi: 'Nhà khoa học có phát minh đột phá chữa khỏi bệnh cho hàng triệu người đã được trao giải Nobel.',
        note: 'whose breakthrough discovery: whose thay thế cho tính từ sở hữu đứng trước danh từ.'
      },
      {
        en: 'Hanoi, which has a history of over a thousand years, attracts millions of tourists annually.',
        vi: 'Hà Nội, nơi có lịch sử hơn một nghìn năm, thu hút hàng triệu du khách mỗi năm.',
        note: 'Hanoi là tên riêng nên dùng mệnh đề không xác định có dấu phẩy; cấm dùng That, bắt buộc dùng which.'
      }
    ],
    examTips: [
      '⚠️ Thấy phía trước chỗ trống có DẤU PHẨY (,) hoặc GIỚI TỪ (in, on, with, to...) -> Loại ngay lập tức đáp án "THAT"!',
      '⚠️ Thấy sau chỗ trống là một Danh từ trơ trọi (không có a/an/the/my) -> 90% chọn WHOSE (whose mother, whose house).'
    ],
    questions: [
      {
        id: 'q14-1',
        question: 'The young architect _______ designed this eco-friendly skyscraper received an international award.',
        options: { A: 'who', B: 'whom', C: 'which', D: 'whose' },
        correctAnswer: 'A',
        explanation: 'Trước chỗ trống là danh từ chỉ người "The young architect", sau chỗ trống là động từ "designed" (cần chủ ngữ chỉ người) -> chọn "who".',
        clue: 'N(người) + who + V',
        translation: 'Kiến trúc sư trẻ tuổi người mà đã thiết kế tòa nhà chọc trời thân thiện với môi trường này đã nhận được giải thưởng quốc tế.'
      },
      {
        id: 'q14-2',
        question: 'Ha Long Bay, _______ is recognized as a UNESCO World Heritage Site, attracts tourists worldwide.',
        options: { A: 'that', B: 'which', C: 'where', D: 'what' },
        correctAnswer: 'B',
        explanation: '"Ha Long Bay" là danh từ riêng, có dấu phẩy (mệnh đề không xác định) và đóng vai trò làm chủ ngữ trước động từ "is recognized" -> dùng "which". Cấm dùng "that" sau dấu phẩy.',
        clue: 'danh từ riêng có dấu phẩy -> which',
        translation: 'Vịnh Hạ Long, nơi được công nhận là Di sản Thế giới của UNESCO, thu hút du khách trên toàn thế giới.'
      },
      {
        id: 'q14-3',
        question: 'The student _______ essay won the national literature competition was awarded a full scholarship.',
        options: { A: 'who', B: 'whom', C: 'whose', D: 'which' },
        correctAnswer: 'C',
        explanation: 'Sau chỗ trống là danh từ "essay" (bài luận của học sinh đó), thể hiện mối quan hệ sở hữu -> dùng "whose".',
        clue: 'N(người) + whose + Noun',
        translation: 'Học sinh có bài luận đoạt giải cuộc thi văn học toàn quốc đã được trao học bổng toàn phần.'
      },
      {
        id: 'q14-4',
        question: 'The prestigious international conference _______ she attended last week was immensely fruitful.',
        options: { A: 'who', B: 'whom', C: 'which', D: 'where' },
        correctAnswer: 'C',
        explanation: '"The prestigious international conference" là danh từ chỉ sự vật/sự kiện, làm tân ngữ cho động từ "attended" (attend which) -> dùng đại từ "which".',
        clue: 'conference (vật làm tân ngữ) -> which',
        translation: 'Hội nghị quốc tế uy tín mà cô ấy tham dự tuần trước đã mang lại nhiều kết quả to lớn.'
      },
      {
        id: 'q14-5',
        question: 'The senior professor to _______ I delivered the research findings gave insightful feedback.',
        options: { A: 'who', B: 'whom', C: 'that', D: 'which' },
        correctAnswer: 'B',
        explanation: 'Đứng sau giới từ "to" chỉ người bắt buộc phải dùng đại từ "whom" (to whom). Tuyệt đối không dùng "to who" hay "to that".',
        clue: 'giới từ + whom (chỉ người)',
        translation: 'Vị giáo sư cao cấp mà tôi đã gửi kết quả nghiên cứu đã đưa ra những phản hồi sâu sắc.'
      }
    ],
    questionPool: [
      {
        id: 'q14-p1',
        question: 'This is the tranquil seaside town _______ my grandparents spent their retirement years.',
        options: { A: 'which', B: 'where', C: 'that', D: 'whom' },
        correctAnswer: 'B',
        explanation: '"seaside town" là nơi chốn và vế sau có đủ S + V + O ("my grandparents spent their retirement years in this town") -> dùng trạng từ quan hệ "where".',
        clue: 'nơi chốn + where + S + V',
        translation: 'Đây là thị trấn ven biển thanh bình nơi ông bà tôi đã trải qua những năm tháng nghỉ hưu.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 15: RÚT GỌN MỆNH ĐỀ QUAN HỆ (REDUCED RELATIVE CLAUSES)
  // =========================================================================
  {
    id: 'topic-15',
    topicNumber: 15,
    title: 'Chuyên đề 15: Rút gọn MĐQH',
    shortTitle: 'Rút gọn MĐQH',
    englishTitle: 'Reduced Relative Clauses',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 điểm (1 câu cực kỳ phổ biến trong đề thi THPTQG) • Cấp độ: Thông hiểu & Vận dụng',
    concept: 'Khi muốn làm câu văn ngắn gọn hơn, ta có thể lược bỏ Đại từ quan hệ và Trợ động từ để rút gọn mệnh đề về 3 dạng chính: V-ing (chủ động), V3/ed (bị động), hoặc To-V (sau the first, the last, the only, so sánh nhất).',
    recognitionSignals: [
      'Câu ĐÃ CÓ ĐỘNG TỪ CHÍNH chia thì ở vị ngữ (is, was, has been, invited, approved...).',
      'Chỗ trống đứng ngay sau một danh từ, bốn phương án là các dạng thức của động từ: V-ing, V3/ed, To-V, being V3.',
      'Trước danh từ có các từ thứ tự: the first, the second, the last, the only hoặc cấp so sánh nhất.'
    ],
    formulas: [
      '1. Rút gọn CHỦ ĐỘNG: Lược bỏ Đại từ + be -> chuyển V về V-ING',
      '2. Rút gọn BỊ ĐỘNG: Lược bỏ Đại từ + be -> giữ lại V3/ed (Quá khứ phân từ)',
      '3. Rút gọn TO-V: Dùng TO + V-bare khi danh từ có "the first, the last, the only, the next, the best"',
      'Dạng bị động của To-V: TO BE + V3/ed (the only document to be preserved)'
    ],
    detailedSections: [
      {
        heading: '1. Rút gọn Chủ động: Dùng V-ING (Present Participle)',
        badge: 'Chủ động -> V-ing',
        content: 'Áp dụng khi động từ trong mệnh đề quan hệ ở thể chủ động:',
        rules: [
          'Quy tắc: Bỏ đại từ quan hệ (who/which/that), bỏ trợ động từ (nếu có), chuyển động từ chính về dạng V-ing.',
          'Ví dụ gốc: The passengers WHO ARE WAITING at gate 4 should board now.',
          '-> Rút gọn: The passengers WAITING at gate 4 should board now.',
          'Ví dụ gốc: Do you know the woman WHO LIVES next door?',
          '-> Rút gọn: Do you know the woman LIVING next door?'
        ]
      },
      {
        heading: '2. Rút gọn Bị động: Dùng V3/ed (Past Participle)',
        badge: 'Bị động -> V3/ed',
        content: 'Áp dụng khi động từ trong mệnh đề quan hệ ở thể bị động (be + V3/ed):',
        rules: [
          'Quy tắc: Bỏ đại từ quan hệ và bỏ động từ to be, chỉ giữ lại V3/ed.',
          'Ví dụ gốc: The valuable artifacts WHICH WERE DISCOVERED yesterday are in the museum.',
          '-> Rút gọn: The valuable artifacts DISCOVERED yesterday are in the museum.',
          'Ví dụ gốc: The proposals THAT WERE SUBMITTED by the students were approved.',
          '-> Rút gọn: The proposals SUBMITTED by the students were approved.'
        ]
      },
      {
        heading: '3. Rút gọn bằng TO-V (Infinitive)',
        badge: 'To-V (Số thứ tự/So sánh nhất)',
        content: 'BẮT BUỘC dùng To-V khi danh từ đứng trước được bổ nghĩa bởi:',
        rules: [
          'Từ bổ nghĩa: THE FIRST, THE SECOND, THE LAST, THE ONLY, THE NEXT hoặc tính từ ở cấp SO SÁNH NHẤT.',
          'Ví dụ chủ động: Yuri Gagarin was the first human WHO FLEW into space -> Yuri Gagarin was the first human TO FLY into space.',
          'Ví dụ bị động (dùng TO BE + V3/ed): He was the only person WHO WAS RESCUED from the fire -> He was the only person TO BE RESCUED from the fire.'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng tổng hợp 3 cách rút gọn Mệnh đề quan hệ',
      headers: ['Dạng rút gọn', 'Điều kiện áp dụng', 'Dạng thức rút gọn', 'Ví dụ'],
      rows: [
        ['Chủ động', 'Động từ ở thể chủ động', 'V-ING', 'The man standing there is my teacher.'],
        ['Bị động', 'Động từ ở thể bị động', 'V3 / V-ed', 'The book written by Nam is famous.'],
        ['Số thứ tự / So sánh nhất', 'Có the first, only, last, best...', 'TO-V (bị động: to be PII)', 'She was the first to arrive.']
      ]
    },
    rules: [
      { label: 'Chủ động', text: 'Bỏ who/which + be -> đưa động từ về V-ing.' },
      { label: 'Bị động', text: 'Bỏ who/which + be -> giữ lại V3/ed.' },
      { label: 'To-V', text: 'Sau the first, the only, the last, the best -> dùng To-V.' }
    ],
    examples: [
      {
        en: 'The solar panels installed on the roof generate enough electricity for the whole house.',
        vi: 'Các tấm pin mặt trời được lắp đặt trên mái nhà tạo ra đủ điện cho cả ngôi nhà.',
        note: 'installed on the roof là rút gọn bị động của which were installed on the roof.'
      },
      {
        en: 'Dr. Johnson was the first physician to successfully perform this delicate operation.',
        vi: 'Bác sĩ Johnson là vị thầy thuốc đầu tiên thực hiện thành công ca phẫu thuật tinh vi này.',
        note: 'Dùng to perform vì danh từ có "the first physician".'
      }
    ],
    examTips: [
      '⚠️ Tuyệt đối không chọn động từ chia thì (như "was installed" hay "has installed") khi trong câu ĐÃ CÓ động từ chính (generate). Mỗi câu đơn chỉ có 1 động từ chính chia thì duy nhất!',
      '⚠️ Thấy "the first / the only / the last" -> 100% chọn TO-V (hoặc to be V3 nếu bị động).'
    ],
    questions: [
      {
        id: 'q15-1',
        question: 'The antique vases _______ during the archaeological excavation will be displayed in the museum.',
        options: { A: 'discover', B: 'discovering', C: 'discovered', D: 'were discovered' },
        correctAnswer: 'C',
        explanation: 'Câu đã có động từ chính của vị ngữ là "will be displayed". Chỗ trống là rút gọn mệnh đề quan hệ thể bị động (which were discovered) -> dùng quá khứ phân từ "discovered".',
        clue: 'rút gọn bị động -> V3/ed',
        translation: 'Những chiếc bình cổ được phát hiện trong cuộc khai quật khảo cổ sẽ được trưng bày tại bảo tàng.'
      },
      {
        id: 'q15-2',
        question: 'Passengers _______ on flight VN214 to London should proceed to gate number 5 immediately.',
        options: { A: 'travel', B: 'traveling', C: 'traveled', D: 'are traveling' },
        correctAnswer: 'B',
        explanation: 'Hành khách chủ động đi trên chuyến bay (who are traveling) -> rút gọn chủ động dùng hiện tại phân từ V-ing "traveling".',
        clue: 'rút gọn chủ động -> V-ing',
        translation: 'Các hành khách đi trên chuyến bay VN214 tới London nên di chuyển tới cửa số 5 ngay lập tức.'
      },
      {
        id: 'q15-3',
        question: 'Neil Armstrong became the first human _______ on the surface of the Moon in 1969.',
        options: { A: 'walking', B: 'to walk', C: 'walked', D: 'walk' },
        correctAnswer: 'B',
        explanation: 'Đứng sau "the first human" (có từ số thứ tự the first) bắt buộc rút gọn bằng To-V -> chọn "to walk".',
        clue: 'the first + To-V',
        translation: 'Neil Armstrong đã trở thành con người đầu tiên đặt chân lên bề mặt Mặt Trăng vào năm 1969.'
      },
      {
        id: 'q15-4',
        question: 'The detailed instructions _______ by the professor must be followed strictly.',
        options: { A: 'providing', B: 'provided', C: 'were provided', D: 'provide' },
        correctAnswer: 'B',
        explanation: 'Hướng dẫn được cung cấp bởi giáo sư (which were provided) -> rút gọn bị động dùng V3/ed "provided".',
        clue: 'rút gọn bị động -> V3/ed',
        translation: 'Những hướng dẫn chi tiết do vị giáo sư cung cấp phải được tuân thủ nghiêm ngặt.'
      },
      {
        id: 'q15-5',
        question: 'She was the only student _______ a full score in the national mathematics olympiad.',
        options: { A: 'achieving', B: 'to achieve', C: 'achieved', D: 'achieve' },
        correctAnswer: 'B',
        explanation: 'Sau "the only student" (có the only) bắt buộc dùng To-V -> chọn "to achieve".',
        clue: 'the only + To-V',
        translation: 'Cô ấy là học sinh duy nhất đạt điểm tuyệt đối trong kỳ thi olympic toán học toàn quốc.'
      }
    ],
    questionPool: [
      {
        id: 'q15-p1',
        question: 'Any students _______ to register for the summer course must submit their forms by Friday.',
        options: { A: 'wishing', B: 'wished', C: 'wish', D: 'are wishing' },
        correctAnswer: 'A',
        explanation: 'Học sinh chủ động mong muốn đăng ký (who wish) -> rút gọn chủ động thành V-ing "wishing".',
        clue: 'rút gọn chủ động -> wishing',
        translation: 'Bất kỳ học sinh nào mong muốn đăng ký khóa học hè đều phải nộp đơn trước thứ Sáu.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 16: MỆNH ĐỀ CÙNG CHỦ NGỮ & RÚT GỌN MỆNH ĐỀ (PARTICIPIAL CLAUSES)
  // =========================================================================
  {
    id: 'topic-16',
    topicNumber: 16,
    title: 'Chuyên đề 16: MĐ cùng chủ ngữ',
    shortTitle: 'Mệnh đề cùng chủ ngữ',
    englishTitle: 'Participial Clauses & Same-Subject Reduction',
    difficulty: 'Nâng cao',
    examWeight: 'Chiếm 0.2 điểm (Câu hỏi phân hóa 7.5+ đến 9+ trong đề thi THPTQG) • Cấp độ: Vận dụng',
    concept: 'Khi hai mệnh đề trong câu CÓ CÙNG MỘT CHỦ NGỮ, ta có thể rút gọn mệnh đề phụ (mệnh đề trạng ngữ chỉ thời gian hoặc nguyên nhân) thành cụm phân từ V-ing, Having PII, PII hoặc Having been PII để câu văn cô đọng và trang trọng.',
    recognitionSignals: [
      'Chỗ trống đứng ở ĐẦU CÂU và ngăn cách với vế chính bởi DẤU PHẨY: _______, S + V + O.',
      'Bốn phương án là: V-ing, Having + PII, PII (V-ed), Having been + PII.',
      'Chủ ngữ sau dấu phẩy (S) chính là đối tượng thực hiện hoặc chịu tác động của hành động ở chỗ trống đầu câu.'
    ],
    formulas: [
      '1. Chủ động (đồng thời / nối tiếp ngay): V-ING, S + V',
      '2. Chủ động (hoàn thành XẢY RA TRƯỚC): HAVING + PII, S + V',
      '3. Bị động (thông thường): PII (V3/ed) / BEING + PII, S + V',
      '4. Bị động (hoàn tất XẢY RA TRƯỚC): HAVING BEEN + PII, S + V',
      'Điều kiện tiên quyết: Hai mệnh đề BẮT BUỘC PHẢI CÙNG CHỦ NGỮ S!'
    ],
    detailedSections: [
      {
        heading: '1. Rút gọn Chủ động: V-ING vs HAVING + PII',
        badge: 'Chủ động',
        content: 'Quy tắc phân biệt mốc thời gian giữa hai hành động chủ động:',
        bulletPoints: [
          'V-ING, S + V: Dùng khi hai hành động diễn ra ĐỒNG THỜI hoặc NỐI TIẾP NHAU NGAY LẬP TỨC. (Ví dụ: Hearing the loud thunder, the child started to cry = When the child heard...).',
          'HAVING + PII, S + V: Dùng khi hành động ở vế rút gọn ĐÃ HOÀN TẤT XONG TRƯỚC rồi hành động ở vế chính mới xảy ra (nhấn mạnh tính hoàn thành trước). (Ví dụ: Having finished all his homework, Nam went out with friends = After Nam had finished...).'
        ]
      },
      {
        heading: '2. Rút gọn Bị động: PII vs HAVING BEEN + PII',
        badge: 'Bị động',
        content: 'Quy tắc khi chủ ngữ chịu sự tác động:',
        bulletPoints: [
          'PII (V3/ed), S + V: Diễn tả trạng thái bị động nói chung. (Ví dụ: Built in the 19th century, the castle attracts thousands of visitors = Because the castle was built...).',
          'HAVING BEEN + PII, S + V: Nhấn mạnh hành động bị động đã hoàn tất xong trong quá khứ trước một hành động khác. (Ví dụ: Having been warned about the incoming storm, the villagers stayed indoors = Because the villagers had been warned...).'
        ]
      },
      {
        heading: '3. Cạm bẫy Sai chủ ngữ treo (Dangling Participle)',
        badge: 'Bẫy chủ ngữ treo',
        content: 'Chủ ngữ sau dấu phẩy (S) PHẢI LÀ đối tượng thực hiện hành động ở vế rút gọn:',
        rules: [
          'CÂU SAI: Walking down the street, the trees looked beautiful. (Cái cây không thể tự đi bộ trên phố được!).',
          'CÂU ĐÚNG: Walking down the street, I admired the beautiful trees. (Chủ ngữ "I" mới là người đi bộ).'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng ma trận 4 dạng rút gọn Mệnh đề cùng chủ ngữ',
      headers: ['Thể / Tính chất thời gian', 'Xảy ra đồng thời / kế tiếp', 'Nhấn mạnh XẢY RA TRƯỚC'],
      rows: [
        ['Thể Chủ động', 'V-ING (Seeing the police, he ran)', 'HAVING + PII (Having passed the exam, she rejoiced)'],
        ['Thể Bị động', 'PII (V-ed) (Shocked by the news, she wept)', 'HAVING BEEN + PII (Having been told, he prepared)']
      ]
    },
    rules: [
      { label: 'Chủ động đồng thời', text: 'V-ing, S + V (Hearing the news, she smiled).' },
      { label: 'Chủ động xảy ra trước', text: 'Having + PII, S + V (Having finished the test, he left).' },
      { label: 'Bị động', text: 'PII / Having been PII, S + V (Warned about the danger, they stopped).' }
    ],
    examples: [
      {
        en: 'Having submitted the graduation thesis on time, Linh felt an immense sense of relief.',
        vi: 'Sau khi đã nộp khóa luận tốt nghiệp đúng hạn, Linh cảm thấy nhẹ nhõm vô cùng.',
        note: 'Dùng Having submitted vì hành động nộp khóa luận đã hoàn thành trước cảm xúc nhẹ nhõm.'
      },
      {
        en: 'Severely damaged by the hurricane, the historic lighthouse had to be closed for renovation.',
        vi: 'Bị hư hại nghiêm trọng bởi cơn bão, ngọn hải đăng lịch sử đã phải đóng cửa để trùng tu.',
        note: 'Dùng quá khứ phân từ Severely damaged vì ngọn hải đăng là vật chịu tác động bị động.'
      }
    ],
    examTips: [
      '⚠️ Mẹo giải nhanh: Nhìn ngay chủ ngữ sau dấu phẩy! Nếu chủ ngữ là người thực hiện hành động -> chọn Having PII (hoặc V-ing). Nếu chủ ngữ là vật bị tác động (the bridge, the report, the house) -> 100% chọn PII (V-ed) hoặc Having been PII!',
      '⚠️ Đề thi rất chuộng đáp án "Having + PII" trong các câu hỏi phân hóa 8+.'
    ],
    questions: [
      {
        id: 'q16-1',
        question: '_______ all the necessary data from the lab, the scientist began drafting the research paper.',
        options: { A: 'Having collected', B: 'Collected', C: 'Being collected', D: 'To collect' },
        correctAnswer: 'A',
        explanation: 'Nhà khoa học (the scientist) chủ động thu thập dữ liệu xong trước rồi mới bắt đầu viết bài báo (hành động xảy ra và hoàn tất trước) -> dùng phân từ hoàn thành "Having collected".',
        clue: 'chủ động xảy ra trước -> Having + PII',
        translation: 'Sau khi đã thu thập tất cả dữ liệu cần thiết từ phòng thí nghiệm, nhà khoa học bắt đầu soạn thảo bài báo nghiên cứu.'
      },
      {
        id: 'q16-2',
        question: '_______ by the sudden earthquake, the residents rushed out into the open streets.',
        options: { A: 'Terrifying', B: 'Terrified', C: 'Having terrified', D: 'To terrify' },
        correctAnswer: 'B',
        explanation: 'Người dân bị làm cho hoảng sợ bởi trận động đất (bị động: Because they were terrified) -> rút gọn bị động dùng quá khứ phân từ "Terrified".',
        clue: 'rút gọn bị động -> Terrified (PII)',
        translation: 'Bị hoảng sợ bởi trận động đất bất ngờ, người dân vội vã lao ra đường lớn thông thoáng.'
      },
      {
        id: 'q16-3',
        question: '_______ about the severe blizzard in advance, the climbers postponed their summit attempt.',
        options: { A: 'Warned', B: 'Warning', C: 'To warn', D: 'Having warned' },
        correctAnswer: 'A',
        explanation: 'Các nhà leo núi được cảnh báo trước về bão tuyết (thể bị động: Being warned / Warned) -> chọn "Warned".',
        clue: 'bị động -> Warned',
        translation: 'Được cảnh báo trước về trận bão tuyết dữ dội, các nhà leo núi đã hoãn chuyến chinh phục đỉnh núi.'
      },
      {
        id: 'q16-4',
        question: '_______ down the street, I suddenly bumped into an old high school classmate.',
        options: { A: 'Walked', B: 'Walking', C: 'Having been walked', D: 'To walk' },
        correctAnswer: 'B',
        explanation: 'Hành động đang đi dạo trên phố thì tình cờ gặp bạn (chủ động đồng thời) -> dùng hiện tại phân từ "Walking".',
        clue: 'chủ động đồng thời -> Walking (V-ing)',
        translation: 'Khi đang đi bộ dọc con phố, tôi bỗng nhiên tình cờ gặp lại một người bạn học cũ thời cấp ba.'
      },
      {
        id: 'q16-5',
        question: '_______ for more than ten hours without a break, the software developer felt exhausted.',
        options: { A: 'Having worked', B: 'Worked', C: 'Being worked', D: 'To work' },
        correctAnswer: 'A',
        explanation: 'Hành động làm việc hơn mười tiếng đã hoàn thành trước, dẫn đến việc kiệt sức -> dùng "Having worked".',
        clue: 'hoàn thành trước -> Having worked',
        translation: 'Sau khi đã làm việc liên tục hơn mười tiếng không nghỉ, lập trình viên phần mềm cảm thấy kiệt sức.'
      }
    ],
    questionPool: [
      {
        id: 'q16-p1',
        question: '_______ from space, our Earth appears as a fragile, glowing blue marble.',
        options: { A: 'Viewing', B: 'Viewed', C: 'Having viewed', D: 'To view' },
        correctAnswer: 'B',
        explanation: 'Trái Đất được nhìn từ không gian (thể bị động: When it is viewed from space) -> rút gọn bị động thành "Viewed".',
        clue: 'Trái đất được nhìn -> Viewed (PII)',
        translation: 'Khi được nhìn từ không gian, Trái Đất của chúng ta hiện ra như một viên bi xanh phát sáng mong manh.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 17: CÂU CHẺ (CLEFT SENTENCES - NHẤN MẠNH)
  // =========================================================================
  {
    id: 'topic-17',
    topicNumber: 17,
    title: 'Chuyên đề 17: Câu chẻ',
    shortTitle: 'Câu chẻ (Cleft Sentences)',
    englishTitle: 'Cleft Sentences (Emphasis with It is / It was)',
    difficulty: 'Nâng cao',
    examWeight: 'Chiếm 0.2 điểm (Câu hỏi viết lại câu hoặc trắc nghiệm ngữ pháp) • Cấp độ: Thông hiểu & Vận dụng',
    concept: 'Câu chẻ là cấu trúc tách một câu đơn thành hai mệnh đề với công thức "It is / It was... that" nhằm mục đích dồn toàn bộ sự chú ý của người nghe/người đọc vào một thành phần cụ thể (Chủ ngữ, Tân ngữ hoặc Trạng ngữ).',
    recognitionSignals: [
      'Câu bắt đầu bằng IT IS hoặc IT WAS, theo sau là một thành phần được nhấn mạnh và từ THAT (hoặc WHO).',
      'Đề bài viết lại câu nhấn mạnh một từ/cụm từ gạch chân.',
      'Cấu trúc nhấn mạnh với NOT UNTIL: It was not until... that...'
    ],
    formulas: [
      'Hiện tại: IT IS + [Thành phần nhấn mạnh] + THAT / WHO + S + V',
      'Quá khứ: IT WAS + [Thành phần nhấn mạnh] + THAT / WHO + S + V',
      'Nhấn mạnh Chủ ngữ (S): It is/was + S(người) + WHO / THAT + V  |  It is/was + S(vật) + THAT + V',
      'Nhấn mạnh Tân ngữ (O): It is/was + O + THAT / WHOM + S + V',
      'Nhấn mạnh Trạng ngữ (Adv): It is/was + [Cụm trạng ngữ thời gian / nơi chốn] + THAT + S + V',
      'Cấu trúc nhấn mạnh Not until: IT WAS NOT UNTIL + [Mốc TG / S+V] + THAT + S + V(quá khứ đơn)'
    ],
    detailedSections: [
      {
        heading: '1. Ba dạng Câu chẻ cơ bản',
        badge: 'Nhấn mạnh S, O, Adv',
        content: 'Cách biến đổi câu gốc thành câu chẻ:',
        bulletPoints: [
          'Nhấn mạnh Chủ ngữ (Subject Focus): Câu gốc: David broke the window yesterday -> Câu chẻ: It was David WHO/THAT broke the window yesterday. (Chính David là người đã làm vỡ cửa sổ).',
          'Nhấn mạnh Tân ngữ (Object Focus): Câu gốc: My father bought this car last month -> Câu chẻ: It was THIS CAR that my father bought last month. (Chính chiếc xe này là thứ mà bố tôi đã mua).',
          'Nhấn mạnh Trạng ngữ (Adverbial Focus): Câu gốc: We met each other in Paris in 2020 -> Câu chẻ: It was IN PARIS that we met each other in 2020. (Chính tại Paris là nơi chúng tôi đã gặp nhau).'
        ]
      },
      {
        heading: '2. NGUYÊN TẮC VÀNG VỀ TỪ "THAT" TRONG CÂU CHẺ TRẠNG NGỮ',
        badge: 'Quy tắc bắt buộc',
        content: 'Rất nhiều học sinh nhầm câu chẻ với Mệnh đề quan hệ:',
        rules: [
          'Khi nhấn mạnh Trạng từ chỉ nơi chốn hoặc thời gian, BẮT BUỘC DÙNG "THAT", KHÔNG ĐƯỢC DÙNG "WHERE" HAY "WHEN"!',
          'Ví dụ ĐÚNG: It was in this village THAT I grew up.',
          'Ví dụ SAI: It was in this village WHERE I grew up. (SAI HOÀN TOÀN TRONG CÂU CHẺ!).'
        ]
      },
      {
        heading: '3. Cấu trúc Cực Trọng tâm: "IT WAS NOT UNTIL... THAT..."',
        badge: 'Not until 9+',
        content: 'Diễn tả: "Mãi cho đến khi... thì mới..." (cực kỳ hay xuất hiện trong bài thi tốt nghiệp):',
        formula: 'IT WAS NOT UNTIL + [Mốc thời gian / Mệnh đề quá khứ] + THAT + S + V(quá khứ đơn)',
        rules: [
          'Ví dụ: He didn\'t realize his mistake until he failed the exam.',
          '-> Viết lại bằng câu chẻ: It was not until he failed the exam THAT he realized his mistake.',
          '-> Viết lại bằng đảo ngữ: Not until he failed the exam DID HE REALIZE his mistake.'
        ]
      }
    ],
    rules: [
      { label: 'Công thức chung', text: 'It is/was + [thành phần nhấn mạnh] + THAT + S + V.' },
      { label: 'Trạng từ nơi chốn/thời gian', text: 'Bắt buộc dùng THAT, tuyệt đối không dùng where/when.' },
      { label: 'Not until', text: 'It was not until... that + S + V(quá khứ đơn).' }
    ],
    examples: [
      {
        en: 'It was my high school English teacher who inspired me to pursue this career.',
        vi: 'Chính cô giáo dạy tiếng Anh cấp ba là người đã truyền cảm hứng cho tôi theo đuổi sự nghiệp này.',
        note: 'Câu chẻ nhấn mạnh chủ ngữ chỉ người (my high school English teacher).'
      },
      {
        en: 'It was not until midnight that the rescue team successfully reached the trapped miners.',
        vi: 'Mãi đến tận nửa đêm thì đội cứu hộ mới tiếp cận thành công những người thợ mỏ bị mắc kẹt.',
        note: 'Cấu trúc It was not until midnight that + S + V.'
      }
    ],
    examTips: [
      '⚠️ Thấy câu bắt đầu bằng "It is/was..." mà phía sau có chỗ trống -> 95% chọn "THAT" (hoặc "who" nếu nhấn mạnh chủ ngữ người). Tuyệt đối không chọn "where", "when", "which"!',
      '⚠️ Cặp viết lại câu: "It was not until... that..." tương đương với "Not until... did + S + V".'
    ],
    questions: [
      {
        id: 'q17-1',
        question: 'It was in this tranquil rural village _______ the famous poet composed his masterpiece.',
        options: { A: 'where', B: 'that', C: 'which', D: 'when' },
        correctAnswer: 'B',
        explanation: 'Đây là câu chẻ nhấn mạnh trạng ngữ chỉ nơi chốn "in this tranquil rural village". Trong câu chẻ, liên từ bắt buộc là "that", tuyệt đối không dùng "where" -> chọn B.',
        clue: 'Câu chẻ nhấn mạnh trạng ngữ -> that',
        translation: 'Chính tại ngôi làng nông thôn thanh bình này là nơi mà nhà thơ nổi tiếng đã sáng tác nên kiệt tác của mình.'
      },
      {
        id: 'q17-2',
        question: 'It was my elder sister _______ taught me how to play the piano when I was seven.',
        options: { A: 'whom', B: 'which', C: 'who', D: 'whose' },
        correctAnswer: 'C',
        explanation: 'Câu chẻ nhấn mạnh chủ ngữ chỉ người "my elder sister" đứng trước động từ "taught" -> chọn "who" (hoặc that).',
        clue: 'It was + S(người) + who + V',
        translation: 'Chính chị gái tôi là người đã dạy tôi cách chơi đàn piano khi tôi mới bảy tuổi.'
      },
      {
        id: 'q17-3',
        question: 'It was not until yesterday morning _______ he officially received the acceptance letter.',
        options: { A: 'when', B: 'that', C: 'which', D: 'then' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc câu chẻ "It was not until... that + S + V" -> bắt buộc chọn "that".',
        clue: 'It was not until... that...',
        translation: 'Mãi cho đến sáng ngày hôm qua thì anh ấy mới chính thức nhận được thư báo trúng tuyển.'
      },
      {
        id: 'q17-4',
        question: 'It was the exquisite diamond necklace _______ the thief targeted during the museum heist.',
        options: { A: 'that', B: 'who', C: 'whom', D: 'whose' },
        correctAnswer: 'A',
        explanation: 'Câu chẻ nhấn mạnh tân ngữ chỉ vật "the exquisite diamond necklace" -> dùng "that".',
        clue: 'It was + O(vật) + that',
        translation: 'Chính chiếc vòng cổ kim cương tinh xảo là mục tiêu mà tên trộm nhắm tới trong vụ đột nhập bảo tàng.'
      },
      {
        id: 'q17-5',
        question: 'John didn\'t realize the true significance of family until he lived abroad alone.',
        options: {
          A: 'It was not until John lived abroad alone that he realized the true significance of family.',
          B: 'It was not until John realized the true significance of family that he lived abroad alone.',
          C: 'Not until did John live abroad alone that he realized the true significance of family.',
          D: 'It was John who realized the true significance of family when living abroad alone.'
        },
        correctAnswer: 'A',
        explanation: 'Viết lại câu phủ định với until: "It was not until + S + V(quá khứ) + that + S + V(quá khứ đơn)" -> đáp án A chính xác tuyệt đối.',
        clue: 'It was not until... that...',
        translation: 'Mãi cho đến khi John sống một mình ở nước ngoài thì anh ấy mới nhận ra ý nghĩa thực sự của gia đình.'
      }
    ],
    questionPool: [
      {
        id: 'q17-p1',
        question: 'It was precisely at 8:00 AM _______ the historic rocket launch successfully took place.',
        options: { A: 'that', B: 'when', C: 'which', D: 'where' },
        correctAnswer: 'A',
        explanation: 'Câu chẻ nhấn mạnh trạng ngữ thời gian: It was at 8:00 AM THAT... -> chọn "that".',
        clue: 'It was + thời gian + that',
        translation: 'Chính vào đúng 8 giờ sáng là thời điểm vụ phóng tên lửa lịch sử đã diễn ra thành công.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 18: ĐẢO NGỮ (INVERSION)
  // =========================================================================
  {
    id: 'topic-18',
    topicNumber: 18,
    title: 'Chuyên đề 18: Đảo ngữ',
    shortTitle: 'Đảo ngữ (Inversion)',
    englishTitle: 'Inversion of Subject and Verb',
    difficulty: 'Nâng cao',
    examWeight: 'Chiếm 0.2 điểm (Câu hỏi phân hóa 8.5+ đến 10 điểm trong đề thi THPTQG) • Cấp độ: Vận dụng cao',
    concept: 'Đảo ngữ là hiện tượng đưa Trợ động từ (Auxiliary Verb: do/does/did, have/has/had, will, can...) hoặc Động từ to be lên TRƯỚC Chủ ngữ nhằm nhấn mạnh mức độ đặc biệt hoặc tính chất phủ định tuyệt đối của hành động.',
    recognitionSignals: [
      'Đầu câu xuất hiện các trạng từ mang nghĩa phủ định / bán phủ định: Never, Rarely, Seldom, Little, Hardly, Scarcely.',
      'Đầu câu bắt đầu bằng: No sooner... than, Hardly... when.',
      'Đầu câu bắt đầu bằng từ ONLY: Only when, Only after, Only by, Only if.',
      'Đầu câu có cụm phủ định giới từ: Under no circumstances, On no account, At no time, In no way.',
      'Cấu trúc So / Such đứng đầu câu: So + Adj... that / Such + be + S... that.'
    ],
    formulas: [
      'Công thức chung: TỪ NHẤN MẠNH / PHỦ ĐỊNH + TRỢ ĐỘNG TỪ + CHỦ NGỮ + ĐỘNG TỪ CHÍNH',
      'Phủ định đứng đầu: Never / Seldom / Rarely / Little + Aux + S + V',
      'Vừa mới... thì...: HARDLY / SCARCELY + HAD + S + PII + WHEN + S + V-ed',
      'Vừa mới... thì...: NO SOONER + HAD + S + PII + THAN + S + V-ed',
      'Only: Only when / Only after / Only if + S + V, AUX + S + V (Đảo ở vế chính)',
      'Không những... mà còn: NOT ONLY + Aux + S + V, BUT ALSO S + V',
      'Cho đến khi: NOT UNTIL + time / S + V, AUX + S + V',
      'So / Such: SO + Adj + BE + S + THAT...  |  SUCH + BE + S + THAT...',
      'Giới từ phủ định: Under no circumstances / On no account + AUX + S + V'
    ],
    detailedSections: [
      {
        heading: '1. Đảo ngữ "Vừa mới... thì..." (Hardly... when / No sooner... than) - CỰC KỲ HAY RA',
        badge: 'Hardly vs No sooner',
        content: 'Hai cấu trúc song sinh diễn tả hai hành động kế tiếp nhau ngay lập tức trong quá khứ:',
        bulletPoints: [
          'HARDLY / SCARCELY + had + S + V3/ed + WHEN + S + V(quá khứ đơn).',
          'NO SOONER + had + S + V3/ed + THAN + S + V(quá khứ đơn).',
          '⚠️ BẪY ĐỀ THI KINH ĐIỂN: Đề thi rất hay tráo đổi cặp từ: dùng "Hardly... than" (SAI) hoặc "No sooner... when" (SAI)! Phải nhớ chuẩn: HARDLY đi với WHEN, NO SOONER đi với THAN!'
        ]
      },
      {
        heading: '2. Đảo ngữ với "ONLY" (Quy tắc đảo ở Mệnh đề chính)',
        badge: 'Only đảo vế chính',
        content: 'Khi Only đi với một mệnh đề thời gian/điều kiện thì ĐẢO NGỮ Ở MỆNH ĐỀ CHÍNH:',
        bulletPoints: [
          'Only when + S1 + V1, TRỢ ĐỘNG TỪ + S2 + V2. (Ví dụ: Only when you finish your homework CAN YOU GO out).',
          'Only after + S1 + V1, TRỢ ĐỘNG TỪ + S2 + V2.',
          'Only by + V-ing, TRỢ ĐỘNG TỪ + S + V. (Ví dụ: Only by studying hard CAN YOU PASS the exam).',
          'Only then / Only later + TRỢ ĐỘNG TỪ + S + V.'
        ]
      },
      {
        heading: '3. Đảo ngữ với SO và SUCH (Quá... đến nỗi mà...)',
        badge: 'So / Such',
        content: 'Nhấn mạnh tính chất của sự việc:',
        rules: [
          'SO + Tính từ + Động từ to be + S + that + Clause: So difficult was the exam that nobody could pass it.',
          'SO + Trạng từ + Trợ động từ + S + V + that + Clause: So fast did he run that nobody could catch him.',
          'SUCH + be + Danh từ + that + Clause: Such was the strength of the storm that trees were uprooted.'
        ]
      },
      {
        heading: '4. Đảo ngữ với Cụm Giới từ Phủ định Tuyệt đối',
        badge: 'Phủ định tuyệt đối',
        content: 'Mang nghĩa "Dù trong bất kỳ hoàn cảnh nào cũng không được...":',
        bulletPoints: [
          'Under no circumstances + Aux + S + V (Dù trong bất kỳ hoàn cảnh nào cũng không)',
          'On no account / On no condition + Aux + S + V (Tuyệt đối không bao giờ)',
          'At no time + Aux + S + V (Chưa bao giờ)',
          'In no way + Aux + S + V (Không đời nào)'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng đối chiếu cặp đảo ngữ: Hardly... when vs No sooner... than',
      headers: ['Cặp từ', 'Từ liên kết đi kèm', 'Thì của vế 1 (đảo ngữ)', 'Thì của vế 2'],
      rows: [
        ['Hardly / Scarcely', 'WHEN', 'Quá khứ hoàn thành (had + S + PII)', 'Quá khứ đơn (S + V-ed)'],
        ['No sooner', 'THAN', 'Quá khứ hoàn thành (had + S + PII)', 'Quá khứ đơn (S + V-ed)']
      ]
    },
    rules: [
      { label: 'Hardly... when', text: 'Hardly had + S + PII + when + S + V-ed.' },
      { label: 'No sooner... than', text: 'No sooner had + S + PII + than + S + V-ed.' },
      { label: 'Only', text: 'Only when/after/if + clause, Aux + S + V (đảo vế chính).' },
      { label: 'Under no circumstances', text: 'Under no circumstances + Aux + S + V (tuyệt đối không).' }
    ],
    examples: [
      {
        en: 'Hardly had we stepped into the house when the violent thunderstorm erupted.',
        vi: 'Chúng tôi vừa mới bước chân vào nhà thì cơn giông bão dữ dội bùng phát.',
        note: 'Đảo ngữ: Hardly had we stepped... when...'
      },
      {
        en: 'Under no circumstances should confidential passwords be shared with anyone.',
        vi: 'Dù trong bất kỳ hoàn cảnh nào mật khẩu bảo mật cũng không được chia sẻ với bất kỳ ai.',
        note: 'Đảo ngữ phủ định: Under no circumstances should + S + be PII.'
      }
    ],
    examTips: [
      '⚠️ Thần chú nhớ chuẩn: "HARDLY ĐI VỚI WHEN, NO SOONER ĐI VỚI THAN". Đề thi rất hay lừa chữ than/when này!',
      '⚠️ Khi thấy câu bắt đầu bằng "Only when / Only after / Only if" -> vế liền sau giữ nguyên, VẾ SAU DẤU PHẨY MỚI LÀ VẾ ĐẢO NGỮ (Trợ động từ + S + V).'
    ],
    questions: [
      {
        id: 'q18-1',
        question: 'Hardly _______ the airport when his flight took off into the stormy sky.',
        options: { A: 'he had reached', B: 'had he reached', C: 'did he reach', D: 'he reached' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc đảo ngữ: "Hardly + had + S + PII + when..." -> chọn "had he reached".',
        clue: 'Hardly had + S + PII + when',
        translation: 'Anh ấy vừa mới đến sân bay thì chuyến bay của anh ấy đã cất cánh vào bầu trời bão tố.'
      },
      {
        id: 'q18-2',
        question: 'No sooner had the keynote speaker finished his lecture _______ the audience burst into thunderous applause.',
        options: { A: 'when', B: 'than', C: 'that', D: 'then' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc đảo ngữ "No sooner had + S + PII" bắt buộc đi với từ liên kết "than" -> chọn B.',
        clue: 'No sooner had... than...',
        translation: 'Diễn giả chính vừa mới dứt lời bài thuyết trình thì khán giả đã vỗ tay vang dội như sấm.'
      },
      {
        id: 'q18-3',
        question: 'Only after completing all prerequisite university courses _______ eligible to take the graduation exam.',
        options: { A: 'are students', B: 'students are', C: 'do students', D: 'students have been' },
        correctAnswer: 'A',
        explanation: 'Sau "Only after + V-ing", mệnh đề chính bắt buộc phải đảo trợ động từ to be lên trước chủ ngữ: "are students" -> chọn A.',
        clue: 'Only after + V-ing, Aux + S + Adj',
        translation: 'Chỉ sau khi hoàn thành tất cả các khóa học đại học tiên quyết thì sinh viên mới đủ điều kiện tham dự kỳ thi tốt nghiệp.'
      },
      {
        id: 'q18-4',
        question: 'Under no circumstances _______ personal banking credentials to unverified callers.',
        options: { A: 'you should disclose', B: 'should you disclose', C: 'you disclose', D: 'did you disclose' },
        correctAnswer: 'B',
        explanation: 'Đảo ngữ với cụm giới từ phủ định tuyệt đối "Under no circumstances + modal verb + S + V" -> chọn "should you disclose".',
        clue: 'Under no circumstances + should you disclose',
        translation: 'Dù trong bất kỳ hoàn cảnh nào bạn cũng không được tiết lộ thông tin ngân hàng cá nhân cho người gọi chưa được xác minh.'
      },
      {
        id: 'q18-5',
        question: 'So complex _______ that even senior engineers took weeks to resolve it.',
        options: { A: 'was the software error', B: 'the software error was', C: 'did the software error', D: 'the software error did' },
        correctAnswer: 'A',
        explanation: 'Đảo ngữ với "So + Adj + be + S + that..." -> "So complex was the software error that..." -> chọn A.',
        clue: 'So + Adj + be + S + that',
        translation: 'Lỗi phần mềm phức tạp đến nỗi ngay cả các kỹ sư cấp cao cũng phải mất nhiều tuần mới giải quyết được.'
      }
    ],
    questionPool: [
      {
        id: 'q18-p1',
        question: 'Seldom _______ such an exhilarating performance on Broadway in recent years.',
        options: { A: 'have I seen', B: 'I have seen', C: 'did I saw', D: 'I saw' },
        correctAnswer: 'A',
        explanation: 'Đảo ngữ với trạng từ bán phủ định "Seldom + have/has + S + PII" -> chọn "have I seen".',
        clue: 'Seldom have I seen (đảo ngữ)',
        translation: 'Hiếm khi tôi được xem một màn trình diễn phấn khích đến vậy trên sân khấu Broadway trong những năm gần đây.'
      }
    ]
  }
];
