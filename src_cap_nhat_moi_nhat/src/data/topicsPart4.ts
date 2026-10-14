import { CleanGrammarTopic } from './grammarHandbookTypes';

export const TOPICS_PART_4: CleanGrammarTopic[] = [
  // =========================================================================
  // CHUYÊN ĐỀ 19: CÁC THÌ TRONG TIẾNG ANH (ENGLISH VERB TENSES & USAGE)
  // =========================================================================
  {
    id: 'topic-19',
    topicNumber: 19,
    title: 'Chuyên đề 19: Các thì',
    shortTitle: 'Các thì tiếng Anh',
    englishTitle: 'English Verb Tenses & Usage',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.4 - 0.6 điểm (2 - 3 câu trong đề thi THPTQG: Chia thì, Nhận biết mốc thời gian, Tìm lỗi sai) • Cấp độ: Nhận biết, Thông hiểu & Vận dụng',
    concept: 'Bản chất của THÌ (Tenses) là sự biến đổi hình thái của động từ để xác định thời điểm xảy ra hành động (Hiện tại, Quá khứ, Tương lai) và trạng thái hoàn tất hay tiếp diễn của hành động (Đơn, Tiếp diễn, Hoàn thành, Hoàn thành tiếp diễn). Trong đề thi THPTQG, câu hỏi kiểm tra khả năng nhận diện dấu hiệu thời gian, sự phối hợp giữa các mốc sự kiện và phân biệt các thì dễ nhầm lẫn.',
    recognitionSignals: [
      'Hiện tại đơn / Tiếp diễn: always, usually, often, every day, right now, at the moment, currently, at present, Look!, Listen!',
      'Hiện tại hoàn thành: since + mốc, for + khoảng, already, yet, just, so far, up to now, recently, lately, ever, never, This is the first time...',
      'Quá khứ đơn / Tiếp diễn: yesterday, ago, last night/week, in 1995, at 8 PM yesterday, when / while (cắt ngang hoặc song song)',
      'Quá khứ hoàn thành: before / by the time + quá khứ đơn, after + quá khứ hoàn thành, by 2010',
      'Tương lai đơn / Hoàn thành: tomorrow, next week, soon, by tomorrow, by the end of this year, by the time + hiện tại đơn'
    ],
    formulas: [
      'Hiện tại đơn: S + V(s/es) | S + do/does not + V_inf',
      'Hiện tại tiếp diễn: S + am/is/are + V-ing',
      'Hiện tại hoàn thành: S + have/has + PII (V3/-ed)',
      'Hiện tại HTTD: S + have/has been + V-ing',
      'Quá khứ đơn: S + V2/-ed | S + did not + V_inf',
      'Quá khứ tiếp diễn: S + was/were + V-ing',
      'Quá khứ hoàn thành: S + had + PII',
      'Tương lai đơn & Tương lai hoàn thành: S + will + V_inf | S + will have + PII'
    ],
    detailedSections: [
      {
        heading: '1. Nhóm thì Hiện tại (Present Tenses)',
        badge: 'Hiện tại',
        content: 'Bao gồm 4 thì cơ bản diễn tả các trạng thái trong hiện tại:',
        bulletPoints: [
          'Hiện tại đơn (Present Simple - S + V_s/es): Diễn tả thói quen lặp đi lặp lại (She visits her grandparents every weekend), chân lý/sự thật hiển nhiên (Water boils at 100°C), hoặc lịch trình cố định có sẵn (The train leaves at 6 PM tomorrow).',
          'Hiện tại tiếp diễn (Present Continuous - S + am/is/are + V-ing): Diễn tả hành động đang diễn ra ngay tại thời điểm nói (He is studying now) hoặc xu hướng đang dần thay đổi (Prices are increasing rapidly). ⚠️ Lưu ý: Động từ chỉ nhận thức, cảm xúc, sở hữu (know, understand, believe, love, hate, seem, belong) KHÔNG chia tiếp diễn.',
          'Hiện tại hoàn thành (Present Perfect - S + have/has + PII): Diễn tả hành động xảy ra trong quá khứ kéo dài đến hiện tại hoặc kết quả còn lưu lại ở hiện tại. Dấu hiệu vàng: since (mốc), for (khoảng), already, yet, so far, recently. Cấu trúc thi cử: This is the first time + S + have/has + PII.',
          'Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous - S + have/has been + V-ing): Nhấn mạnh tính liên tục và kéo dài của hành động bắt đầu từ quá khứ và vẫn đang tiếp diễn ở hiện tại (It has been raining continuously for 5 hours).'
        ]
      },
      {
        heading: '2. Nhóm thì Quá khứ (Past Tenses)',
        badge: 'Quá khứ',
        content: 'Bao gồm các thì diễn tả hành động đã diễn ra trước thời điểm nói:',
        bulletPoints: [
          'Quá khứ đơn (Past Simple - S + V2/-ed): Hành động đã xảy ra và CHẤM DỨT HOÀN TOÀN trong quá khứ tại một thời điểm xác định (yesterday, last year, in 2020, 3 days ago).',
          'Quá khứ tiếp diễn (Past Continuous - S + was/were + V-ing): Diễn tả hành động ĐANG XẢY RA tại một thời điểm cụ thể trong quá khứ (At 8 PM last night, I was watching TV); hoặc hành động đang xảy ra thì hành động khác cắt ngang (When I was walking home, it started to rain).',
          'Quá khứ hoàn thành (Past Perfect - S + had + PII): Hành động xảy ra và HOÀN TẤT TRƯỚC một hành động khác hoặc trước một mốc thời gian trong quá khứ. Thần chú đề thi: "Xảy ra trước chia HAD + PII, xảy ra sau chia QUÁ KHỨ ĐƠN".',
          'Quá khứ hoàn thành tiếp diễn (Past Perfect Continuous - S + had been + V-ing): Nhấn mạnh tính liên tục của hành động xảy ra trước một hành động khác trong quá khứ.'
        ]
      },
      {
        heading: '3. Nhóm thì Tương lai trọng điểm (Future Tenses)',
        badge: 'Tương lai',
        content: 'Các thì tương lai cốt lõi thường xuyên xuất hiện trong đề thi THPTQG:',
        bulletPoints: [
          'Tương lai đơn (Future Simple - S + will + V): Quyết định tức thì tại thời điểm nói (I will help you with that bag); lời hứa/đe dọa; hoặc dự đoán mang tính chủ quan không có bằng chứng (I think it will rain).',
          'Tương lai gần (Be going to + V): Diễn tả kế hoạch/dự định đã có sẵn từ trước (I am going to visit Paris next month); hoặc dự đoán CÓ BẰNG CHỨNG rõ ràng ở hiện tại (Look at those dark clouds! It is going to rain).',
          'Tương lai tiếp diễn (Future Continuous - S + will be + V-ing): Diễn tả hành động đang diễn ra tại một thời điểm xác định trong tương lai (At 10 AM tomorrow, we will be taking the exam).',
          'Tương lai hoàn thành (Future Perfect - S + will have + PII): Diễn tả hành động sẽ HOÀN TẤT TRƯỚC một mốc thời gian hoặc trước một hành động khác trong tương lai. Dấu hiệu nhận biết đặc trưng: By + mốc tương lai (By next Friday, by 2030) hoặc By the time + S + V(hiện tại đơn).'
        ]
      },
      {
        heading: '4. Cẩm nang Bẫy đề thi THPTQG kinh điển về Thì',
        badge: 'Bẫy thi cử',
        content: 'Các quy tắc bất biến giúp thí sinh tránh mất điểm oan:',
        rules: [
          '⚠️ BẪY 1: CẤM DÙNG "WILL" TRONG MỆNH ĐỀ TRẠNG NGỮ CHỈ THỜI GIAN: Trong mệnh đề bắt đầu bằng when, as soon as, until, before, after, by the time nói về tương lai, TUYỆT ĐỐI KHÔNG dùng will. Bắt buộc chia Hiện tại đơn hoặc Hiện tại hoàn thành! Ví dụ: I will call you when I ARRIVE (không dùng when I will arrive).',
          '⚠️ BẪY 2: CẤU TRÚC VỚI "SINCE": S + have/has + PII + since + S + V(quá khứ đơn) hoặc since + mốc quá khứ. Ví dụ: She has worked here since she GRADUATED in 2021.',
          '⚠️ BẪY 3: PHÂN BIỆT "BY + MỐC THỜI GIAN":\n• By + mốc QUÁ KHỨ (by yesterday, by 2015) -> Chia QUÁ KHỨ HOÀN THÀNH (had + PII).\n• By + mốc TƯƠNG LAI (by tomorrow, by 2030) -> Chia TƯƠNG LAI HOÀN THÀNH (will have + PII).',
          '⚠️ BẪY 4: ĐỘNG TỪ CHỈ TRẠNG THÁI (STATE VERBS): Các động từ know, understand, believe, remember, belong to, contain, taste, smell KHÔNG chia ở dạng tiếp diễn (-ing) khi diễn tả trạng thái nhận thức/sở hữu.'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng đối chiếu 4 cặp thì gây nhầm lẫn nhất trong đề thi THPTQG',
      headers: ['Cặp thì so sánh', 'Khác biệt về bản chất', 'Dấu hiệu nhận biết điển hình', 'Ví dụ minh họa chuẩn đề thi'],
      rows: [
        [
          'Hiện tại hoàn thành vs Quá khứ đơn',
          'HTHT: Hành động quá khứ còn liên quan/kết quả ở hiện tại, không có mốc thời gian kết thúc rõ rệt.\nQKĐ: Hành động đã chấm dứt hoàn toàn trong quá khứ tại thời điểm xác định.',
          'HTHT: since, for, already, yet, so far, recently.\nQKĐ: yesterday, ago, last night, in 2010.',
          'HTHT: She has lived here for 10 years (vẫn đang sống).\nQKĐ: She lived here for 10 years (nay đã chuyển đi).'
        ],
        [
          'Quá khứ hoàn thành vs Quá khứ đơn',
          'QKHT: Xảy ra và hoàn tất TRƯỚC một hành động khác trong quá khứ.\nQKĐ: Xảy ra SAU hành động QKHT, hoặc xảy ra nối tiếp nhau theo trình tự.',
          'QKHT: had + PII (trước by the time, before, after).\nQKĐ: V2/-ed (sau when, by the time).',
          'When we arrived at the cinema, the film HAD ALREADY STARTED (phim chiếu trước rồi chúng tôi mới đến).'
        ],
        [
          'Tương lai hoàn thành vs Tương lai đơn',
          'TLHT: Nhấn mạnh hành động sẽ HOÀN TẤT TRƯỚC mốc tương lai.\nTLĐ: Hành động sẽ xảy ra tại một thời điểm hoặc quyết định bộc phát.',
          'TLHT: By + mốc tương lai, By the time + S + V(HTĐ).\nTLĐ: tomorrow, next week, soon, think/hope.',
          'TLHT: By next month, they WILL HAVE COMPLETED the project.\nTLĐ: They will complete the project next month.'
        ],
        [
          'Will + V vs Be going to + V',
          'Will: Quyết định tức thì lúc nói, dự đoán chủ quan không căn cứ.\nBe going to: Dự định lên kế hoạch trước, dự đoán CÓ BẰNG CHỨNG rõ ràng.',
          'Will: I think, maybe, perhaps, suddenly.\nBe going to: Look at..., evidence, already decided.',
          'Will: The phone is ringing. I will answer it.\nBe going to: Look at those clouds! It is going to rain.'
        ]
      ]
    },
    rules: [
      { label: 'Since vs For', text: 'Since + mốc thời gian (since 2018); For + khoảng thời gian (for 5 years). Vế chính chia Hiện tại hoàn thành.' },
      { label: 'By + Mốc', text: 'By + quá khứ -> Had + PII; By + tương lai -> Will have + PII.' },
      { label: 'Cấm Will sau liên từ', text: 'Mệnh đề thời gian tương lai (when, as soon as, until...) KHÔNG dùng will, chỉ dùng Hiện tại đơn.' },
      { label: 'State Verbs', text: 'Động từ trạng thái (know, love, understand, seem, contain) tuyệt đối không chia tiếp diễn.' }
    ],
    examples: [
      {
        en: 'By the time the keynote speaker arrived at the auditorium, the conference had already commenced.',
        vi: 'Vào thời điểm diễn giả chính đến hội trường, hội nghị đã bắt đầu rồi.',
        note: 'By the time + S + V(quá khứ đơn "arrived") -> Mệnh đề chính chia Quá khứ hoàn thành ("had already commenced") vì sự việc bắt đầu trước khi diễn giả đến.'
      },
      {
        en: 'By the end of this semester, students will have completed all their comprehensive graduation projects.',
        vi: 'Trước khi kết thúc học kỳ này, các sinh viên sẽ hoàn thành tất cả các dự án tốt nghiệp toàn diện của mình.',
        note: 'By + mốc thời gian tương lai ("the end of this semester") -> Bắt buộc dùng Tương lai hoàn thành ("will have completed").'
      },
      {
        en: 'She has been working for this international non-governmental organization since she graduated from university in 2020.',
        vi: 'Cô ấy đã làm việc cho tổ chức phi chính phủ quốc tế này kể từ khi tốt nghiệp đại học vào năm 2020.',
        note: 'Cấu trúc Since kinh điển: Vế chính chia HTHT/HTHTTD ("has been working"), sau Since chia Quá khứ đơn ("graduated").'
      }
    ],
    examTips: [
      '⚠️ Thấy "By the time / By + mốc tương lai" -> 99% chọn Tương lai hoàn thành: WILL HAVE + PII.',
      '⚠️ Thấy "By the time / Before + mốc quá khứ" -> 99% chọn Quá khứ hoàn thành: HAD + PII.',
      '⚠️ Trong 4 phương án, nếu chỗ trống nằm sau "when / as soon as / until" mà câu nói về tương lai -> LOẠI NGAY các phương án có chứa "will" hoặc "would"!'
    ],
    questions: [
      {
        id: 'q19-1',
        question: 'By the time the fire brigade arrived at the industrial zone, the blaze _______ completely.',
        options: { A: 'had extinguished', B: 'had been extinguished', C: 'was extinguished', D: 'would extinguish' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc "By the time + S + V(quá khứ đơn)", mệnh đề chính phải chia thì Quá khứ hoàn thành (had + PII) để chỉ hành động xảy ra trước. Ngọn lửa (the blaze) được dập tắt (bị động) -> chọn "had been extinguished".',
        clue: 'By the time + QKĐ -> QKHT (bị động)',
        translation: 'Vào thời điểm đội cứu hỏa đến khu công nghiệp, ngọn lửa đã được dập tắt hoàn toàn.'
      },
      {
        id: 'q19-2',
        question: 'Dr. Harrison _______ at this research institute since he received his doctorate degree in 2018.',
        options: { A: 'worked', B: 'is working', C: 'has worked', D: 'had worked' },
        correctAnswer: 'C',
        explanation: 'Cấu trúc kinh điển với "since": S + have/has + PII + since + S + V(quá khứ đơn). Sau since là "received" (quá khứ đơn) -> mệnh đề trước chia Hiện tại hoàn thành "has worked".',
        clue: 'S + have/has PII + since + QKĐ',
        translation: 'Tiến sĩ Harrison đã làm việc tại viện nghiên cứu này kể từ khi ông nhận bằng tiến sĩ vào năm 2018.'
      },
      {
        id: 'q19-3',
        question: 'By the end of next month, our technical engineering team _______ the renewable energy facility.',
        options: { A: 'will have completed', B: 'completed', C: 'has completed', D: 'will be completing' },
        correctAnswer: 'A',
        explanation: '"By the end of next month" là mốc thời gian trong tương lai -> Bắt buộc dùng thì Tương lai hoàn thành (will have + PII) để diễn tả hành động sẽ hoàn tất trước mốc đó.',
        clue: 'By + mốc tương lai -> Tương lai hoàn thành (will have PII)',
        translation: 'Trước cuối tháng tới, đội ngũ kỹ thuật của chúng tôi sẽ hoàn thành cơ sở năng lượng tái tạo.'
      },
      {
        id: 'q19-4',
        question: 'We will finalize the official partnership agreement as soon as the executive director _______ from Tokyo.',
        options: { A: 'will return', B: 'returns', C: 'returned', D: 'would return' },
        correctAnswer: 'B',
        explanation: 'Trong mệnh đề trạng ngữ chỉ thời gian với "as soon as", khi mệnh đề chính ở thì tương lai (will finalize), mệnh đề trạng ngữ TUYỆT ĐỐI KHÔNG dùng "will", mà phải dùng thì Hiện tại đơn -> chọn "returns".',
        clue: 'as soon as + S + V(hiện tại đơn) [cấm dùng will]',
        translation: 'Chúng tôi sẽ hoàn tất thỏa thuận hợp tác chính thức ngay khi giám đốc điều hành trở về từ Tokyo.'
      },
      {
        id: 'q19-5',
        question: 'At 8 PM yesterday, while most of his colleagues were relaxing, David _______ the annual financial audit.',
        options: { A: 'reviewed', B: 'was reviewing', C: 'has reviewed', D: 'had reviewed' },
        correctAnswer: 'B',
        explanation: '"At 8 PM yesterday" là mốc thời điểm cụ thể trong quá khứ kết hợp với "while" diễn tả hai hành động diễn ra song song cùng lúc trong quá khứ -> chia Quá khứ tiếp diễn (was reviewing).',
        clue: 'At + giờ quá khứ / while -> Quá khứ tiếp diễn',
        translation: 'Lúc 8 giờ tối hôm qua, trong khi hầu hết các đồng nghiệp đang nghỉ ngơi, David đang kiểm tra lại đợt kiểm toán tài chính hàng năm.'
      }
    ],
    questionPool: [
      {
        id: 'q19-p1',
        question: 'Look at those dark storm clouds gathering on the horizon! It _______ very heavily.',
        options: { A: 'will rain', B: 'is going to rain', C: 'rains', D: 'is raining' },
        correctAnswer: 'B',
        explanation: 'Có dấu hiệu bằng chứng trực quan cụ thể trước mắt ("Look at those dark storm clouds...") -> Dùng thì tương lai gần "is going to rain" để diễn tả dự đoán có căn cứ xác thực.',
        clue: 'Bằng chứng trước mắt -> be going to',
        translation: 'Hãy nhìn những đám mây đen đang kéo đến ở đường chân trời kìa! Trời sắp sửa mưa rất to đấy.'
      },
      {
        id: 'q19-p2',
        question: 'This is the first time that the young violinist _______ in front of such a massive international audience.',
        options: { A: 'performed', B: 'is performing', C: 'has performed', D: 'had performed' },
        correctAnswer: 'C',
        explanation: 'Cấu trúc chuẩn đề thi: "It is / This is the first / second time + S + have/has + PII" -> chọn thì Hiện tại hoàn thành "has performed".',
        clue: 'This is the first time + HTHT',
        translation: 'Đây là lần đầu tiên nghệ sĩ vĩ cầm trẻ biểu diễn trước một lượng khán giả quốc tế đông đảo như vậy.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 20: NGỮ ĐỒNG VỊ (APPOSITIVES & APPOSITIVE PHRASES)
  // =========================================================================
  {
    id: 'topic-20',
    topicNumber: 20,
    title: 'Chuyên đề 20: Ngữ đồng vị',
    shortTitle: 'Ngữ đồng vị',
    englishTitle: 'Appositives & Appositive Phrases',
    difficulty: 'Nâng cao',
    examWeight: 'Chiếm 0.2 - 0.4 điểm (1 - 2 câu trong đề thi THPTQG: Đọc hiểu, Viết lại / Nối câu, Tìm lỗi sai) • Cấp độ: Thông hiểu & Vận dụng',
    concept: 'Ngữ đồng vị (Appositive) là một từ hoặc cụm danh từ (Noun Phrase) được đặt ngay cạnh một danh từ hoặc đại từ khác để giải thích, định danh danh tính, bổ sung thông tin hoặc làm rõ đối tượng đó. Cả hai thành phần cùng chỉ về MỘT thực thể duy nhất. Trong đề thi THPTQG, ngữ đồng vị xuất hiện dày đặc trong bài Đọc hiểu phân tầng câu dài, bài Nối câu kết hợp hai câu đơn thành câu phức học thuật, và bài Nhận diện lỗi sai cấu trúc.',
    recognitionSignals: [
      'Cụm từ nằm giữa HAI DẤU PHẨY ngăn cách ngay sau Chủ ngữ: S, [Cụm danh từ giải thích], V + O.',
      'Cụm từ đứng ở ĐẦU CÂU trước dấu phẩy bổ nghĩa cho chủ ngữ ngay sau: [A/An/The + Noun Phrase], S + V + O.',
      'Cụm từ đứng ở CUỐI CÂU sau dấu phẩy giải thích cho tân ngữ: S + V + O, [a/an/the + Noun Phrase].',
      'Đề bài Nối câu: Hai câu đơn có cùng một chủ ngữ, một câu giới thiệu vai trò/nghề nghiệp/đặc điểm được rút gọn thành một cụm đồng vị ngữ nằm giữa 2 dấu phẩy.'
    ],
    formulas: [
      'Ngữ đồng vị giữa câu: S, (a/an/the) + Noun Phrase, V + O',
      'Ngữ đồng vị đầu câu: (A/An/The) + Noun Phrase, S + V + O',
      'Ngữ đồng vị cuối câu: S + V + O, (a/an/the) + Noun Phrase',
      'Mệnh đề danh từ đồng vị: S + V + the fact / idea / belief / rumor + THAT + S + V'
    ],
    detailedSections: [
      {
        heading: '1. Bản chất & Cấu tạo của Ngữ đồng vị (What is an Appositive?)',
        badge: 'Định nghĩa & Cấu tạo',
        content: 'Ngữ đồng vị là một thành phần danh từ bổ trợ đặt kế tiếp danh từ chính:',
        bulletPoints: [
          'Đồng vị danh từ đơn giản (Noun Appositive): Dùng trực tiếp một danh từ/cụm danh từ để gọi tên hoặc giải thích danh từ đi trước. Ví dụ: My friend, a talented graphic designer, created this logo. ("a talented graphic designer" chính là friend).',
          'Vị trí linh hoạt trong câu: Ngữ đồng vị có thể đứng giữa câu (ngăn cách bởi 2 dấu phẩy), đứng đầu câu (trước dấu phẩy và trước Chủ ngữ chính), hoặc đứng cuối câu (sau dấu phẩy làm rõ cho tân ngữ).',
          'Thành phần không làm thay đổi động từ chính: Dù ngữ đồng vị là số ít hay số nhiều, ĐỘNG TỪ CHÍNH CỦA CÂU VẪN PHẢI CHIA THEO CHỦ NGỮ GỐC, KHÔNG chia theo ngữ đồng vị. Ví dụ: The CEO, along with his advisors, a group of experienced veterans, HAS decided to expand.'
        ]
      },
      {
        heading: '2. Phân biệt: Ngữ đồng vị Không giới hạn vs Giới hạn',
        badge: 'Dấu phẩy trong Ngữ đồng vị',
        content: 'Quy tắc dùng dấu phẩy quyết định ý nghĩa câu:',
        bulletPoints: [
          'Ngữ đồng vị không giới hạn (Non-restrictive - BẮT BUỘC CÓ DẤU PHẨY): Cung cấp thông tin phụ trợ, làm rõ thêm danh xưng/tiểu sử. Nếu bỏ cụm này đi thì người nghe vẫn biết chính xác đối tượng được nhắc đến là ai (thường đứng sau Tên riêng, đại từ, hoặc danh từ đã xác định). Ví dụ: Albert Einstein, a theoretical physicist, developed the theory of relativity.',
          'Ngữ đồng vị giới hạn (Restrictive - TUYỆT ĐỐI KHÔNG CÓ DẤU PHẨY): Cung cấp thông tin thiết yếu để phân biệt đối tượng này với các đối tượng khác trong cùng một nhóm. Bỏ đi câu sẽ bị thiếu nghĩa. Ví dụ: The author J.K. Rowling has written many bestsellers. (Không có dấu phẩy vì "J.K. Rowling" định danh rõ tác giả nào).'
        ]
      },
      {
        heading: '3. Mối liên hệ cốt lõi giữa Ngữ đồng vị và Rút gọn Mệnh đề quan hệ',
        badge: 'Rút gọn to be',
        content: 'Ngữ đồng vị thực chất là hình thái rút gọn tối giản nhất của Mệnh đề quan hệ chứa to be:',
        rules: [
          'Câu gốc có MĐQH: Ha Long Bay, WHICH IS a famous UNESCO natural heritage site, attracts millions of visitors.',
          '-> Lược bỏ đại từ quan hệ "which" và to be "is" -> Ha Long Bay, A FAMOUS UNESCO NATURAL HERITAGE SITE, attracts millions of visitors.',
          '⚠️ BẪY ĐỀ THI THPTQG KINH ĐIỂN - "BẪY HAI ĐỘNG TỪ CHÍNH": Đề bài cho: "Nelson Mandela, _______ a global icon of peace, dedicated his life to equality."\n• Phương án A: is\n• Phương án B: who is\n• Phương án C: was\n• Phương án D: that was\n-> ĐÁP ÁN: Nếu chọn A hoặc C (is / was), câu sẽ bị lỗi "Double Verbs" (thừa động từ chia thì độc lập). Nếu chọn B thì đúng ngữ pháp nhưng nếu đề để chỗ trống trơ trọi chỉ chọn cụm Noun Phrase thì chọn "a global icon"!'
        ]
      },
      {
        heading: '4. Ứng dụng Ngữ đồng vị trong 3 dạng bài thi THPTQG',
        badge: 'Kỹ năng làm bài thi',
        content: 'Ba ứng dụng chiến lược giúp bứt phá điểm số:',
        bulletPoints: [
          'Dạng 1: Nối câu (Sentence Combination): Đề bài cho 2 câu đơn miêu tả cùng một nhân vật: "Alexander Fleming discovered penicillin in 1928. He was a Scottish physician and microbiologist." -> Đáp án chuẩn 10: "Alexander Fleming, a Scottish physician and microbiologist, discovered penicillin in 1928."',
          'Dạng 2: Tìm lỗi sai (Error Identification): Câu đề thi dài ngoằng có chứa cụm nằm giữa 2 dấu phẩy nhưng người ra đề cố tình chèn động từ chia thì nguyên bản: "The Mekong River, is the longest river in Southeast Asia, supports millions of livelihoods." -> LỖI SAI ở "is the longest river" (phải sửa thành "the longest river" hoặc "which is the longest river").',
          'Dạng 3: Bài Đọc hiểu (Reading Comprehension): Khi gặp một thuật ngữ khoa học khó hoặc khái niệm xa lạ, hãy nhìn ngay sau dấu phẩy kế bên nó! Cụm ngữ đồng vị chính là lời giải thích từ vựng mà tác giả cung cấp sẵn cho bạn.'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng đối chiếu Ngữ đồng vị (Appositive) vs MĐQH vs Rút gọn phân từ',
      headers: ['Cấu trúc ngữ pháp', 'Cấu tạo ngữ pháp', 'Dấu hiệu nhận biết', 'Ví dụ minh họa chuẩn đề thi'],
      rows: [
        [
          'Ngữ đồng vị (Appositive Phrase)',
          'Cụm Danh từ (Noun Phrase: a/an/the + Adj + Noun)',
          'Đứng giữa 2 dấu phẩy sau S hoặc đầu câu; KHÔNG CÓ động từ chia thì.',
          'Marie Curie, a pioneering chemist, won two Nobel Prizes.'
        ],
        [
          'Mệnh đề quan hệ đầy đủ (Relative Clause)',
          'Đại từ quan hệ + Mệnh đề hoàn chỉnh (who/which + V / S+V)',
          'Có xuất hiện who, which, whom, whose.',
          'Marie Curie, who was a pioneering chemist, won two Nobel Prizes.'
        ],
        [
          'Rút gọn phân từ (Participial Clause)',
          'Cụm V-ing (chủ động) hoặc V-ed/PII (bị động)',
          'Bắt đầu bằng động từ dạng -ing hoặc -ed, diễn tả hành động.',
          'Winning two Nobel Prizes, Marie Curie inspired generations of scientists.'
        ]
      ]
    },
    rules: [
      { label: 'Không thừa To Be', text: 'Giữa 2 dấu phẩy của ngữ đồng vị TUYỆT ĐỐI KHÔNG chứa động từ to be chia thì (is/was). Chỉ dùng Cụm danh từ trần.' },
      { label: 'Chia động từ theo S gốc', text: 'Động từ chính của câu luôn chia theo Chủ ngữ gốc đứng trước dấu phẩy, KHÔNG phụ thuộc vào danh từ trong ngữ đồng vị.' },
      { label: 'Đầu câu bổ nghĩa cho S', text: 'Ngữ đồng vị đặt ở đầu câu bắt buộc phải bổ nghĩa trực tiếp cho danh từ làm chủ ngữ đứng ngay sau dấu phẩy.' },
      { label: 'Giải mã đọc hiểu', text: 'Gặp từ vựng khó trong bài đọc hiểu, thông tin trong cụm ngữ đồng vị kề sau dấu phẩy chính là định nghĩa của từ.' }
    ],
    examples: [
      {
        en: 'The pangolin, an endangered scaly mammal, has become a focal point of international wildlife conservation efforts.',
        vi: 'Tê tê, một loài động vật có vú có vảy đang có nguy cơ tuyệt chủng, đã trở thành tâm điểm của các nỗ lực bảo tồn động vật hoang dã quốc tế.',
        note: '"an endangered scaly mammal" là cụm ngữ đồng vị giải thích trực tiếp cho danh từ "The pangolin"; không có động to be nào chen vào giữa hai dấu phẩy.'
      },
      {
        en: 'A dedicated environmental activist, Greta Thunberg has inspired millions of young students around the world.',
        vi: 'Là một nhà hoạt động môi trường tận tụy, Greta Thunberg đã truyền cảm hứng cho hàng triệu học sinh trên khắp thế giới.',
        note: 'Ngữ đồng vị đặt ở đầu câu ("A dedicated environmental activist") bổ nghĩa trực tiếp cho chủ ngữ chính "Greta Thunberg" đứng ngay sau dấu phẩy.'
      },
      {
        en: 'They explored the ancient city of Kyoto, the former imperial capital of Japan, with great fascination.',
        vi: 'Họ đã khám phá thành phố cổ Kyoto, cố đô của Nhật Bản, với sự thích thú to lớn.',
        note: '"the former imperial capital of Japan" là cụm ngữ đồng vị đứng sau dấu phẩy ở cuối câu bổ nghĩa cho danh từ Kyoto.'
      }
    ],
    examTips: [
      '⚠️ Bẫy "Thừa động từ" (Double Verbs): S, _______, V + O -> Nếu trong 4 phương án có "is a...", "was a...", hãy gạch bỏ ngay lập tức! Phương án đúng là Cụm danh từ đơn thuần (a/an/the + N) hoặc mệnh đề quan hệ đầy đủ (who is/was).',
      '⚠️ Trong câu hỏi Nối câu: Nếu một câu giới thiệu danh xưng ("John is an architect. He designed this museum."), câu nối học thuật chuẩn THPTQG luôn là: "John, an architect, designed this museum."',
      '⚠️ Ngữ đồng vị là cứu tinh trong bài Đọc hiểu: Đừng hoang mang khi gặp từ chuyên ngành lạ, hãy bình tĩnh đọc cụm nằm giữa 2 dấu phẩy ngay sau từ đó!'
    ],
    questions: [
      {
        id: 'q20-1',
        question: 'Nguyen Du, _______ of Vietnam, composed the timeless epic masterpiece "The Tale of Kieu".',
        options: { A: 'is a celebrated classical poet', B: 'a celebrated classical poet', C: 'was a celebrated classical poet', D: 'who a celebrated classical poet' },
        correctAnswer: 'B',
        explanation: 'Câu đã có động từ chính là "composed". Vị trí giữa hai dấu phẩy là cụm ngữ đồng vị (Appositive) để giải thích cho danh từ riêng "Nguyen Du", do đó chỉ cần một cụm danh từ "a celebrated classical poet". Nếu chọn A hoặc C sẽ gây lỗi thừa động từ chính (double verbs); chọn D sai vì thiếu to be sau who.',
        clue: 'S, + Cụm danh từ (ngữ đồng vị) +, V',
        translation: 'Nguyễn Du, một đại thi hào cổ điển của Việt Nam, đã sáng tác kiệt tác sử thi vượt thời gian "Truyện Kiều".'
      },
      {
        id: 'q20-2',
        question: '_______, the Amazon River basin produces roughly twenty percent of the world\'s fresh water.',
        options: { A: 'Is the largest drainage system on Earth', B: 'The largest drainage system on Earth', C: 'Being that it the largest drainage system', D: 'It is the largest drainage system' },
        correctAnswer: 'B',
        explanation: 'Vị trí đầu câu trước dấu phẩy bổ nghĩa cho chủ ngữ "the Amazon River basin" ngay sau dấu phẩy. Đây là ngữ đồng vị đứng đầu câu -> dùng cụm danh từ "The largest drainage system on Earth". Các phương án A, C, D sai cấu trúc ngữ pháp.',
        clue: 'Cụm danh từ đồng vị đầu câu, S + V',
        translation: 'Là lưu vực thoát nước lớn nhất trên Trái Đất, lưu vực sông Amazon tạo ra khoảng 20% lượng nước ngọt của thế giới.'
      },
      {
        id: 'q20-3',
        question: 'Identify the error: "Mount Everest, is the highest peak in the world, attracts hundreds of adventurous mountaineers every spring."',
        options: { A: 'is the highest peak', B: 'in the world', C: 'attracts hundreds', D: 'mountaineers' },
        correctAnswer: 'A',
        explanation: 'Cụm nằm giữa 2 dấu phẩy đóng vai trò là ngữ đồng vị giải thích cho "Mount Everest", trong khi động từ chính của câu là "attracts". Việc để động từ to be "is" tạo thành lỗi thừa động từ chính. Phải sửa "is the highest peak" thành "the highest peak" (ngữ đồng vị) hoặc "which is the highest peak" (mệnh đề quan hệ).',
        clue: 'Lỗi thừa động từ to be trong ngữ đồng vị',
        translation: 'Xác định lỗi sai: "Đỉnh Everest, là đỉnh núi cao nhất thế giới, thu hút hàng trăm nhà leo núi mạo hiểm mỗi mùa xuân."'
      },
      {
        id: 'q20-4',
        question: 'Combine the two sentences: "Marie Curie discovered radium and polonium. She was the first woman to win a Nobel Prize."',
        options: {
          A: 'Marie Curie, was the first woman to win a Nobel Prize, discovered radium and polonium.',
          B: 'Marie Curie, the first woman to win a Nobel Prize, discovered radium and polonium.',
          C: 'Being the first woman to win a Nobel Prize and Marie Curie discovered radium and polonium.',
          D: 'The first woman to win a Nobel Prize Marie Curie who discovered radium and polonium.'
        },
        correctAnswer: 'B',
        explanation: 'Phương pháp nối câu học thuật chuẩn xác nhất là biến câu giới thiệu danh xưng thành cụm ngữ đồng vị "the first woman to win a Nobel Prize" đặt giữa 2 dấu phẩy ngay sau tên riêng "Marie Curie". Phương án A sai vì thừa "was"; C và D sai ngữ pháp.',
        clue: 'Nối câu bằng cụm ngữ đồng vị (bỏ to be)',
        translation: 'Kết hợp hai câu: "Marie Curie đã phát hiện ra radium và polonium. Bà là người phụ nữ đầu tiên đoạt giải Nobel."'
      },
      {
        id: 'q20-5',
        question: 'Biologists are studying the axolotl, _______ capable of regenerating lost limbs and organs.',
        options: { A: 'is a unique Mexican amphibian', B: 'a unique Mexican amphibian', C: 'that a unique Mexican amphibian', D: 'it is a unique Mexican amphibian' },
        correctAnswer: 'B',
        explanation: 'Vị trí sau dấu phẩy ở cuối câu bổ nghĩa cho danh từ "the axolotl" -> Cần một cụm danh từ đồng vị "a unique Mexican amphibian" (kèm theo tính từ bổ nghĩa "capable of..."). Chọn A hoặc D gây lỗi hai mệnh đề thiếu liên từ; chọn C thiếu động từ.',
        clue: 'Ngữ đồng vị ở cuối câu giải thích cho tân ngữ',
        translation: 'Các nhà sinh học đang nghiên cứu loài kỳ nhông axolotl, một loài lưỡng cư độc đáo của Mexico có khả năng tái tạo các chi và cơ quan bị mất.'
      }
    ],
    questionPool: [
      {
        id: 'q20-p1',
        question: 'Solar power, _______ of clean energy, has experienced exponential growth over the past decade.',
        options: { A: 'a viable and sustainable source', B: 'is a viable and sustainable source', C: 'was a viable and sustainable source', D: 'which a viable and sustainable source' },
        correctAnswer: 'A',
        explanation: 'Câu đã có động từ chính là "has experienced". Vị trí giữa hai dấu phẩy là cụm ngữ đồng vị bổ nghĩa cho chủ ngữ "Solar power", chỉ cần cụm danh từ "a viable and sustainable source".',
        clue: 'S, + Noun Phrase (ngữ đồng vị) +, V',
        translation: 'Năng lượng mặt trời, một nguồn năng lượng sạch khả thi và bền vững, đã có sự tăng trưởng theo cấp số nhân trong thập kỷ qua.'
      },
      {
        id: 'q20-p2',
        question: 'A prominent cultural symbol of Paris, _______ welcomes millions of admiring tourists from across the globe.',
        options: { A: 'the Eiffel Tower is built in 1889', B: 'the Eiffel Tower', C: 'it is the Eiffel Tower which', D: 'building the Eiffel Tower' },
        correctAnswer: 'B',
        explanation: 'Cụm đứng trước dấu phẩy ("A prominent cultural symbol of Paris") là ngữ đồng vị chỉ đối tượng -> Ngay sau dấu phẩy phải là chủ ngữ chính "the Eiffel Tower" đi với động từ "welcomes".',
        clue: 'Ngữ đồng vị đầu câu -> S đứng ngay sau dấu phẩy',
        translation: 'Một biểu tượng văn hóa nổi bật của Paris, tháp Eiffel chào đón hàng triệu du khách ngưỡng mộ từ khắp nơi trên thế giới.'
      }
    ]
  }
];
