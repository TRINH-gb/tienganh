import { CleanGrammarTopic } from './grammarHandbookTypes';

export const TOPICS_PART_2: CleanGrammarTopic[] = [
  // =========================================================================
  // CHUYÊN ĐỀ 7: CỤM ĐỘNG TỪ (PHRASAL VERBS)
  // =========================================================================
  {
    id: 'topic-7',
    topicNumber: 7,
    title: 'Chuyên đề 7: Cụm động từ',
    shortTitle: 'Cụm động từ',
    englishTitle: 'Phrasal Verbs',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 - 0.4 điểm (1 - 2 câu trong đề thi THPTQG) • Cấp độ: Thông hiểu & Vận dụng',
    concept: 'Cụm động từ là sự kết hợp giữa một Động từ (Verb) và một hoặc hai Tiểu từ (Giới từ / Trạng từ) để tạo thành một ngữ nghĩa hoàn toàn mới, thường mang nghĩa bóng khác xa với động từ gốc.',
    recognitionSignals: [
      'Bốn phương án đều có chung một động từ nhưng khác tiểu từ (turn on / turn off / turn down / turn up) HOẶC chung tiểu từ nhưng khác động từ (call off / put off / set off / take off).',
      'Đề bài yêu cầu chọn cụm từ thích hợp dựa theo ngữ cảnh tân ngữ đi sau (meeting -> call off; volume/offer -> turn down; cigarettes/smoking -> give up).'
    ],
    formulas: [
      'Cấu trúc 2 từ: Verb + Particle (turn down, give up, break out, find out)',
      'Cấu trúc 3 từ: Verb + Particle + Preposition + Object (look up to, run out of, catch up with, put up with)',
      'Phrasal verb có thể tách rời: Verb + Object + Particle (turn the lights off / turn off the lights)',
      'Phrasal verb KHÔNG THỂ tách rời khi tân ngữ là đại từ: Turn IT off (ĐÚNG) - KHÔNG ĐƯỢC NÓI: Turn off it (SAI)!'
    ],
    detailedSections: [
      {
        heading: '1. Nhóm Cụm động từ xuất hiện nhiều nhất trong Đề thi THPTQG',
        badge: 'Cụm từ Tần suất cao',
        content: 'Đây là các cụm động từ "bất hủ" xuất hiện liên tục trong đề thi chính thức và đề tham khảo:',
        bulletPoints: [
          'give up: từ bỏ một thói quen hoặc mục tiêu (= quit / abandon).',
          'turn down: (1) từ chối lời mời/đơn xin việc (= reject); (2) vặn nhỏ âm lượng/nhiệt độ.',
          'turn up: (1) xuất hiện, đến nơi (= arrive); (2) vặn to âm lượng.',
          'call off: hủy bỏ một sự kiện đã lên lịch (= cancel). Phân biệt với "put off" (chỉ hoãn lại, dời sang ngày khác = postpone/delay).',
          'run out of: hết sạch, cạn kiệt (run out of money/petrol/time = exhaust the supply).',
          'carry out: tiến hành, thực hiện (nghiên cứu, khảo sát, kế hoạch = conduct / execute).',
          'bring about: gây ra, đem lại sự thay đổi (= cause / result in).',
          'look up to: tôn trọng, ngưỡng mộ ai (= admire / respect). Trái nghĩa: look down on (coi thường).',
          'make up: (1) bịa đặt câu chuyện; (2) trang điểm; (3) chiếm tỷ lệ phần trăm (make up 40% of...); (4) làm hòa sau cãi vã.',
          'come across: tình cờ gặp người nào hoặc tìm thấy vật gì (= run into / bump into / encounter by chance).'
        ]
      },
      {
        heading: '2. Nhóm Cụm động từ 3 từ quan trọng (Three-word Phrasal Verbs)',
        badge: 'Cụm 3 từ',
        content: 'Những cụm gồm Động từ + 2 giới từ theo sau bắt buộc phải có Tân ngữ:',
        bulletPoints: [
          'put up with: chịu đựng một tình huống khó chịu hoặc người phiền phức (= tolerate / endure).',
          'catch up with: bắt kịp, đuổi kịp (tiến độ học tập, công việc = reach the same level).',
          'keep up with: theo kịp, duy trì cùng tốc độ với sự thay đổi của thời đại/công nghệ.',
          'get on/along with: có mối quan hệ hòa thuận tốt đẹp với ai (= have a good relationship).',
          'cut down on: cắt giảm lượng tiêu thụ (cut down on sugar/expenses = reduce the amount).'
        ]
      }
    ],
    rules: [
      { label: 'Từ chối vs Hủy bỏ', text: 'turn down (từ chối lời mời/xin việc); call off (hủy sự kiện); put off (hoãn lại).' },
      { label: 'Thực hiện vs Đem lại', text: 'carry out (tiến hành nghiên cứu/khảo sát); bring about (gây ra sự thay đổi).' },
      { label: 'Chịu đựng & Bắt kịp', text: 'put up with (chịu đựng = tolerate); catch up with (bắt kịp trình độ).' }
    ],
    examples: [
      {
        en: 'The university decided to call off the graduation party due to the approaching storm.',
        vi: 'Trường đại học đã quyết định hủy bỏ bữa tiệc tốt nghiệp do cơn bão đang tiến đến gần.',
        note: 'call off = cancel (hủy bỏ hoàn toàn sự kiện party).'
      },
      {
        en: 'Scientists are currently carrying out groundbreaking research on gene therapy.',
        vi: 'Các nhà khoa học hiện đang tiến hành nghiên cứu đột phá về liệu pháp gen.',
        note: 'carry out research = conduct research (tiến hành nghiên cứu).'
      }
    ],
    examTips: [
      '⚠️ Phân biệt "call off" (hủy hẳn không tổ chức nữa) vs "put off" (hoãn lại để tổ chức vào thời điểm sau).',
      '⚠️ Khi tân ngữ là một đại từ nhân xưng (it, him, her, them), BẮT BUỘC phải đặt ở giữa: pick IT up, turn IT down. Tuyệt đối không chọn "pick up it" hay "turn down it"!'
    ],
    questions: [
      {
        id: 'q7-1',
        question: 'Because of torrential downpours, the organizers were forced to _______ the football match.',
        options: { A: 'call off', B: 'put on', C: 'turn up', D: 'give in' },
        correctAnswer: 'A',
        explanation: '"call off" có nghĩa là hủy bỏ (cancel) một sự kiện do thời tiết xấu -> chọn A.',
        clue: 'torrential downpours -> cancel the match -> call off',
        translation: 'Vì mưa như trút nước, ban tổ chức buộc phải hủy bỏ trận đấu bóng đá.'
      },
      {
        id: 'q7-2',
        question: 'He had to _______ the lucrative job offer because he was unwilling to relocate abroad.',
        options: { A: 'take off', B: 'turn down', C: 'look after', D: 'make up' },
        correctAnswer: 'B',
        explanation: '"turn down" có nghĩa là từ chối (reject) lời mời làm việc -> chọn B.',
        clue: 'reject the job offer -> turn down',
        translation: 'Anh ấy đã phải từ chối lời đề nghị công việc béo bở vì anh ấy không sẵn lòng chuyển ra nước ngoài sinh sống.'
      },
      {
        id: 'q7-3',
        question: 'The research team is planning to _______ a comprehensive survey on consumer habits next month.',
        options: { A: 'carry out', B: 'bring up', C: 'hold on', D: 'break into' },
        correctAnswer: 'A',
        explanation: 'Cụm từ "carry out a survey / an experiment" có nghĩa là tiến hành, thực hiện một cuộc khảo sát -> chọn A.',
        clue: 'carry out a survey (tiến hành khảo sát)',
        translation: 'Nhóm nghiên cứu đang lên kế hoạch tiến hành một cuộc khảo sát toàn diện về thói quen của người tiêu dùng vào tháng tới.'
      },
      {
        id: 'q7-4',
        question: 'I can no longer _______ his rude and arrogant behavior in our study group.',
        options: { A: 'keep up with', B: 'put up with', C: 'run out of', D: 'cut down on' },
        correctAnswer: 'B',
        explanation: '"put up with" có nghĩa là chịu đựng (tolerate) một hành vi khiếm nhã -> chọn B.',
        clue: 'chịu đựng hành vi thô lỗ -> put up with',
        translation: 'Tôi không thể chịu đựng thêm hành vi thô lỗ và kiêu ngạo của anh ta trong nhóm học tập của chúng tôi nữa.'
      },
      {
        id: 'q7-5',
        question: 'While cleaning the old attic, my mother accidentally _______ her childhood photograph album.',
        options: { A: 'came across', B: 'looked into', C: 'took after', D: 'went over' },
        correctAnswer: 'A',
        explanation: '"come across" có nghĩa là tình cờ bắt gặp/tìm thấy một đồ vật cũ -> chọn A.',
        clue: 'tình cờ tìm thấy -> came across',
        translation: 'Trong lúc dọn dẹp căn gác mái cũ, mẹ tôi tình cờ tìm thấy cuốn album ảnh thời thơ ấu của mình.'
      }
    ],
    questionPool: [
      {
        id: 'q7-p1',
        question: 'The car suddenly _______ on the remote highway, leaving us stranded in the dark.',
        options: { A: 'broke down', B: 'turned down', C: 'called off', D: 'put off' },
        correctAnswer: 'A',
        explanation: '"break down" có nghĩa là hỏng hóc (đối với xe cộ, máy móc) -> chọn A.',
        clue: 'xe bị hỏng -> broke down',
        translation: 'Chiếc xe bất ngờ bị hỏng trên đường cao tốc hẻo lánh, khiến chúng tôi bị mắc kẹt trong bóng tối.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 8: SỰ PHỐI THÌ & HÒA HỢP THÌ (TENSE HARMONY & S-V AGREEMENT)
  // =========================================================================
  {
    id: 'topic-8',
    topicNumber: 8,
    title: 'Chuyên đề 8: Hòa hợp thì',
    shortTitle: 'Sự phối thì & S-V',
    englishTitle: 'Tense Harmony & Subject-Verb Agreement',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.4 điểm (2 câu trong đề thi THPTQG: 1 câu phối thì + 1 câu hòa hợp S-V) • Cấp độ: Thông hiểu',
    concept: 'Quy tắc phối hợp giữa các thì trong câu phức có mệnh đề trạng ngữ chỉ thời gian (when, while, after, before, as soon as, until) và các quy tắc hòa hợp giữa Chủ ngữ và Động từ vị ngữ.',
    recognitionSignals: [
      'Câu có hai mệnh đề nối với nhau bằng các liên từ chỉ thời gian: when, while, after, before, by the time, as soon as, until, since.',
      'Chủ ngữ phức hợp chứa các liên từ nối: with, along with, as well as, either... or, neither... nor, not only... but also.',
      'Chủ ngữ bắt đầu bằng cụm: The number of vs A number of, hoặc chủ ngữ là danh từ chỉ tiền bạc, khoảng cách, thời gian.'
    ],
    formulas: [
      'Phối thì Quá khứ: When + S + V(quá khứ đơn), S + was/were + V-ing (cắt ngang khi đang xảy ra)',
      'Phối thì Quá khứ hoàn thành: S + had + PII + before / by the time + S + V(quá khứ đơn)',
      'Phối thì Tương lai: S + will + V + when / as soon as / until + S + V(hiện tại đơn / HTHT)',
      'Hòa hợp S1 with/as well as + S2: Động từ chia theo S1',
      'Hòa hợp either S1 or S2 / neither S1 nor S2: Động từ chia theo S2 (gần nhất)',
      'The number of + N(pl) -> Động từ số ÍT | A number of + N(pl) -> Động từ số NHIỀU'
    ],
    detailedSections: [
      {
        heading: '1. Trục thời gian Phối thì Quá khứ (Past Sequence of Tenses)',
        badge: 'Phối thì Quá khứ',
        content: 'Mô hình diễn tả các hành động trong quá khứ:',
        rules: [
          'Hành động đang xảy ra thì hành động khác xen vào: When + S + V(quá khứ đơn), S + was/were + V-ing. (Ví dụ: When I arrived, they were having dinner).',
          'Hai hành động song song cùng diễn ra trong quá khứ: While + S + was/were + V-ing, S + was/were + V-ing. (Ví dụ: While my father was reading books, my mother was cooking).',
          'Hành động xảy ra trước một hành động khác trong quá khứ: After + S + had + PII, S + V(quá khứ đơn).',
          'Trước một mốc thời gian quá khứ: By the time / Before + S + V(quá khứ đơn), S + had + PII.'
        ]
      },
      {
        heading: '2. Quy tắc Vàng: Phối thì Tương lai với Mệnh đề Thời gian',
        badge: 'Cấm Will ở MĐ phụ',
        content: 'Đây là câu hỏi xuất hiện 100% trong tất cả các đề thi THPT Quốc Gia từ năm 2020 đến nay:',
        formula: 'S + will + V-bare + liên từ thời gian (when / as soon as / until / by the time) + S + V(HIỆN TẠI ĐƠN)',
        rules: [
          'Ví dụ: We will start the meeting as soon as our director arrives. (arrives chia hiện tại đơn).',
          '⚠️ NGUYÊN TẮC CẤM KỴ TUYỆT ĐỐI: Tuyệt đối KHÔNG BAO GIỜ dùng "will" hoặc "would" trong mệnh đề trạng ngữ chỉ thời gian bắt đầu bằng when, as soon as, until, before, after! Đề thi luôn cho đáp án "will arrive" để gài bẫy.'
        ]
      },
      {
        heading: '3. Sự hòa hợp Chủ ngữ và Động từ (Subject - Verb Agreement)',
        badge: 'Hòa hợp S-V',
        content: 'Các quy tắc xác định động từ chia số ít hay số nhiều:',
        rules: [
          'S1 with / along with / together with / as well as / accompanied by + S2 -> Động từ chia theo CHỦ NGỮ S1 (Ví dụ: The teacher along with her students WAS present).',
          'Either S1 or S2 / Neither S1 nor S2 / Not only S1 but also S2 -> Động từ chia theo CHỦ NGỮ GẦN NÓ NHẤT (S2). (Ví dụ: Neither John nor his parents WERE at home).',
          'The number of + Danh từ số nhiều -> Động từ chia SỐ ÍT (chỉ một con số cụ thể). (Ví dụ: The number of students IS increasing).',
          'A number of + Danh từ số nhiều -> Động từ chia SỐ NHIỀU (nghĩa là "nhiều"). (Ví dụ: A number of students ARE waiting outside).',
          'Danh từ chỉ khoảng cách, thời gian, số tiền, trọng lượng -> Động từ chia SỐ ÍT. (Ví dụ: Ten kilometers IS a long walk; 50 dollars IS too much).'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng phân biệt: The number of vs A number of',
      headers: ['Cấu trúc', 'Ý nghĩa', 'Động từ theo sau', 'Ví dụ chuẩn đề thi'],
      rows: [
        ['The number of + N(pl)', 'Số lượng của... (chỉ một con số cụ thể)', 'Động từ chia SỐ ÍT (is, has, was, V-s/es)', 'The number of participants HAS reached 500.'],
        ['A number of + N(pl)', 'Nhiều, một số (tương đương với Many)', 'Động từ chia SỐ NHIỀU (are, have, were, V-bare)', 'A number of issues HAVE been solved.']
      ]
    },
    rules: [
      { label: 'When/While', text: 'When + QK đơn, was/were + V-ing (cắt ngang); While + was/were V-ing (song song).' },
      { label: 'After/Before', text: 'After + had PII, QK đơn; By the time + QK đơn, had PII.' },
      { label: 'Tương lai + Thời gian', text: 'S + will + V + as soon as/when + S + V(hiện tại đơn). CẤM DÙNG WILL trong mệnh đề thời gian!' },
      { label: 'The number vs A number', text: 'The number of + N(pl) + V(số ít); A number of + N(pl) + V(số nhiều).' }
    ],
    examples: [
      {
        en: 'By the time the rescue team arrived at the site, the fire had already been extinguished.',
        vi: 'Vào thời điểm đội cứu hộ đến hiện trường, ngọn lửa đã được dập tắt từ trước đó rồi.',
        note: 'By the time + QK đơn (arrived), vế chính dùng QK hoàn thành (had been extinguished).'
      },
      {
        en: 'The manager, along with several senior executives, is attending the annual summit.',
        vi: 'Vị giám đốc, cùng với vài chuyên viên cấp cao, đang tham dự hội nghị thượng đỉnh thường niên.',
        note: 'Động từ chia theo chủ ngữ đầu tiên "The manager" (số ít -> is attending).'
      }
    ],
    examTips: [
      '⚠️ Thấy vế chính có "will + V" -> vế chứa liên từ thời gian (when, as soon as, until) 100% chọn Hiện tại đơn (hoặc Hiện tại hoàn thành). Loại ngay các đáp án có "will" hoặc "quá khứ"!',
      '⚠️ Thấy "The number of" -> chia số ít; Thấy "A number of" -> chia số nhiều.'
    ],
    questions: [
      {
        id: 'q8-1',
        question: 'When the teacher entered the computer lab, all the students _______ their assignments.',
        options: { A: 'typed', B: 'were typing', C: 'have typed', D: 'are typing' },
        correctAnswer: 'B',
        explanation: 'Hành động các học sinh đang gõ bài (quá khứ tiếp diễn) thì hành động giáo viên bước vào xen ngang (quá khứ đơn: entered) -> chọn B.',
        clue: 'When + S + V(quá khứ đơn), S + was/were V-ing',
        translation: 'Khi giáo viên bước vào phòng máy tính, tất cả các học sinh đang gõ bài tập của mình.'
      },
      {
        id: 'q8-2',
        question: 'We will send you the confirmation email as soon as we _______ your formal application.',
        options: { A: 'receive', B: 'will receive', C: 'received', D: 'had received' },
        correctAnswer: 'A',
        explanation: 'Quy tắc phối thì tương lai: Vế chính "will send", vế trạng ngữ thời gian sau "as soon as" bắt buộc chia ở THÌ HIỆN TẠI ĐƠN (receive). Tuyệt đối không dùng "will receive".',
        clue: 'as soon as + S + V(hiện tại đơn)',
        translation: 'Chúng tôi sẽ gửi email xác nhận cho bạn ngay khi chúng tôi nhận được đơn xin chính thức của bạn.'
      },
      {
        id: 'q8-3',
        question: 'The professor, together with his dedicated assistants, _______ a breakthrough discovery.',
        options: { A: 'have made', B: 'has made', C: 'are making', D: 'were making' },
        correctAnswer: 'B',
        explanation: 'Chủ ngữ có cụm "together with his dedicated assistants" thì động từ phải hòa hợp theo chủ ngữ thứ nhất "The professor" (danh từ số ít) -> chọn "has made".',
        clue: 'S1 + together with + S2 -> chia theo S1',
        translation: 'Vị giáo sư, cùng với những trợ lý tận tụy của mình, đã tạo ra một phát hiện mang tính đột phá.'
      },
      {
        id: 'q8-4',
        question: 'By the time she graduated from medical school, she _______ at the clinic for three years.',
        options: { A: 'worked', B: 'had worked', C: 'has worked', D: 'works' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc "By the time + S + V(quá khứ đơn: graduated), S + had + PII" -> chọn "had worked".',
        clue: 'By the time + QK đơn, S + had PII',
        translation: 'Tính đến thời điểm tốt nghiệp trường y, cô ấy đã làm việc tại phòng khám được ba năm.'
      },
      {
        id: 'q8-5',
        question: 'The number of endangered wildlife species in this national park _______ steadily over the last decade.',
        options: { A: 'has decreased', B: 'have decreased', C: 'are decreasing', D: 'were decreasing' },
        correctAnswer: 'A',
        explanation: '"The number of + N(số nhiều)" đóng vai trò là chủ ngữ số ít -> động từ chia số ít "has decreased".',
        clue: 'The number of + N(pl) -> Động từ số ít',
        translation: 'Số lượng các loài động vật hoang dã có nguy cơ tuyệt chủng trong vườn quốc gia này đã giảm đều đặn trong thập kỷ qua.'
      }
    ],
    questionPool: [
      {
        id: 'q8-p1',
        question: 'Neither the manager nor his employees _______ aware of the sudden schedule change.',
        options: { A: 'was', B: 'were', C: 'is', D: 'has been' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc "Neither S1 nor S2" động từ hòa hợp theo S2 "his employees" (danh từ số nhiều trong quá khứ) -> chọn "were".',
        clue: 'Neither S1 nor S2 -> chia theo S2',
        translation: 'Cả người quản lý lẫn các nhân viên của anh ta đều không biết về sự thay đổi lịch trình đột ngột.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 9: CÂU BỊ ĐỘNG (PASSIVE VOICE)
  // =========================================================================
  {
    id: 'topic-9',
    topicNumber: 9,
    title: 'Chuyên đề 9: Câu bị động',
    shortTitle: 'Câu bị động',
    englishTitle: 'Passive Voice',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 - 0.4 điểm (1 - 2 câu trong đề thi THPTQG) • Cấp độ: Nhận biết & Vận dụng',
    concept: 'Câu bị động được dùng khi muốn nhấn mạnh vào đối tượng chịu tác động của hành động thay vì người thực hiện hành động. Trọng tâm đề thi bao gồm bị động các thì cơ bản, bị động với động từ khuyết thiếu, bị động kép (tường thuật khách quan) và thể nhờ bảo.',
    recognitionSignals: [
      'Chủ ngữ của câu là một danh từ chỉ VẬT (con người không thể tự hành động mà bị tác động).',
      'Sau chỗ trống có giới từ "by + tác nhân" (by the committee, by local volunteers).',
      'Động từ là ngoại động từ nhưng phía sau chỗ trống KHÔNG CÓ TÂN NGỮ đi kèm (dấu hiệu 90% là bị động).'
    ],
    formulas: [
      'Công thức chung: S + BE + V3/ed (+ by O)',
      'Hiện tại tiếp diễn: S + am/is/are + BEING + V3/ed | QK tiếp diễn: was/were + BEING + V3/ed',
      'Hiện tại hoàn thành: S + have/has + BEEN + V3/ed | QK hoàn thành: had + BEEN + V3/ed',
      'Modal verbs: S + can / must / should / will + BE + V3/ed',
      'Bị động kép: It is said that S2 + V2  <--->  S2 + is/are said to V (cùng thì) / to have PII (trước thì)',
      'Thể nhờ bảo: Have/Get sth DONE (by sb)'
    ],
    detailedSections: [
      {
        heading: '1. Bảng chuyển đổi các thì sang Bị động',
        badge: 'Các thì cơ bản',
        content: 'Nguyên tắc: Thì nào có "be" ở thì đó + V3/ed:',
        bulletPoints: [
          'Hiện tại đơn: am/is/are + V3/ed',
          'Quá khứ đơn: was/were + V3/ed',
          'Hiện tại tiếp diễn: am/is/are + being + V3/ed',
          'Quá khứ tiếp diễn: was/were + being + V3/ed',
          'Hiện tại hoàn thành: have/has + been + V3/ed',
          'Quá khứ hoàn thành: had + been + V3/ed',
          'Tương lai đơn: will be + V3/ed',
          'Động từ khuyết thiếu: modal (must, can, should...) + be + V3/ed'
        ]
      },
      {
        heading: '2. Bị động kép với Động từ tường thuật (Impersonal Passive) - DẠNG 9+',
        badge: 'Bị động kép 9+',
        content: 'Chủ động: People say / believe / think / report / assume that S2 + V2.',
        bulletPoints: [
          'Cách 1 (Dùng chủ ngữ giả It): It is said / believed / reported that S2 + V2.',
          'Cách 2 (Đưa S2 lên làm chủ ngữ mới): S2 + is/are said / believed + TO-VERB:',
          '-> TH1: Dùng "TO + V-bare" nếu V2 CÙNG THÌ hoặc ở tương lai so với V1. (Ví dụ: People say he is rich -> He is said TO BE rich).',
          '-> TH2: Dùng "TO HAVE + PII" nếu V2 XẢY RA TRƯỚC so với V1. (Ví dụ: People say he stole the money -> He is said TO HAVE STOLEN the money).'
        ]
      },
      {
        heading: '3. Thể nhờ bảo bị động (Causative Passive)',
        badge: 'Nhờ bảo',
        content: 'Nhờ ai làm việc gì -> Thuê/nhờ đồ vật được làm:',
        rules: [
          'HAVE: S + have + someone + V-bare + sth  ->  S + HAVE + SOMETHING + V3/ed (by someone).',
          'GET: S + get + someone + TO-V + sth  ->  S + GET + SOMETHING + V3/ed (by someone).',
          'Ví dụ: I had the plumber fix the pipe -> I had the pipe FIXED by the plumber.'
        ]
      }
    ],
    rules: [
      { label: 'Quy tắc be + PII', text: 'Luôn phải có động từ to be chia theo thì + quá khứ phân từ PII.' },
      { label: 'Bị động kép', text: 'S2 + is/are said + to V (cùng thì) HOẶC to have PII (xảy ra trước).' },
      { label: 'Causative', text: 'Have/Get something DONE (by somebody).' }
    ],
    examples: [
      {
        en: 'The historic bridge was severely damaged by the catastrophic flood last week.',
        vi: 'Cây cầu lịch sử đã bị hư hỏng nghiêm trọng bởi trận lũ lụt thảm khốc tuần trước.',
        note: 'Bị động quá khứ đơn: was severely damaged by + O.'
      },
      {
        en: 'The famous scientist is believed to have invented this breakthrough vaccine.',
        vi: 'Nhà khoa học nổi tiếng được tin là đã phát minh ra loại vắc-xin đột phá này.',
        note: 'Bị động kép diễn tả việc phát minh đã xảy ra trước thời điểm hiện tại: to have invented.'
      }
    ],
    examTips: [
      '⚠️ Mẹo nhận biết nhanh câu bị động: Nhìn chủ ngữ nếu là đồ vật/sự việc trừu tượng (bridge, report, law, email) mà động từ mang nghĩa tác động -> 99% chọn đáp án có dạng "BE + PII".',
      '⚠️ Tuyệt đối chú ý dạng "to have PII" trong bị động kép khi có từ chỉ thời gian quá khứ (yesterday, in 1990, last year).'
    ],
    questions: [
      {
        id: 'q9-1',
        question: 'All the conference rooms _______ thoroughly before the international delegates arrive.',
        options: { A: 'will clean', B: 'will be cleaned', C: 'are cleaning', D: 'cleaned' },
        correctAnswer: 'B',
        explanation: 'Chủ ngữ "All the conference rooms" (phòng hội nghị) là vật, phải chịu tác động "được dọn dẹp" -> dạng bị động tương lai "will be cleaned".',
        clue: 'phòng hội nghị được dọn dẹp -> will be cleaned',
        translation: 'Tất cả các phòng hội nghị sẽ được dọn dẹp kỹ lưỡng trước khi các đại biểu quốc tế đến.'
      },
      {
        id: 'q9-2',
        question: 'The young suspect was seen _______ the building immediately after the explosion occurred.',
        options: { A: 'leave', B: 'leaving', C: 'left', D: 'to be left' },
        correctAnswer: 'B',
        explanation: 'Bị động của động từ tri giác chỉ hành động đang diễn ra tại thời điểm đó: be seen + V-ing -> chọn "leaving".',
        clue: 'be seen + V-ing',
        translation: 'Nghi phạm trẻ tuổi được nhìn thấy đang rời khỏi tòa nhà ngay sau khi vụ nổ xảy ra.'
      },
      {
        id: 'q9-3',
        question: 'He is reported _______ from the company after being accused of embezzlement last month.',
        options: { A: 'to resign', B: 'to have resigned', C: 'resigning', D: 'resigned' },
        correctAnswer: 'B',
        explanation: 'Hành động từ chức đã xảy ra trong quá khứ ("last month"), trước thời điểm báo cáo ở hiện tại ("is reported") -> dùng "to have resigned".',
        clue: 'is reported + to have PII (xảy ra trước)',
        translation: 'Anh ta được đưa tin là đã từ chức khỏi công ty sau khi bị cáo buộc tham ô vào tháng trước.'
      },
      {
        id: 'q9-4',
        question: 'My mother is going to have her roof _______ before the upcoming rainy season starts.',
        options: { A: 'repair', B: 'repairing', C: 'repaired', D: 'to repair' },
        correctAnswer: 'C',
        explanation: 'Cấu trúc nhờ bảo: "have + something + PII" (have her roof repaired: cho mái nhà được sửa chữa) -> chọn "repaired".',
        clue: 'have + sth + PII',
        translation: 'Mẹ tôi dự định sẽ cho sửa lại mái nhà trước khi mùa mưa sắp tới bắt đầu.'
      },
      {
        id: 'q9-5',
        question: 'Strict safety procedures must _______ by all factory workers without exception.',
        options: { A: 'follow', B: 'be followed', C: 'have followed', D: 'following' },
        correctAnswer: 'B',
        explanation: 'Bị động sau động từ khuyết thiếu: "must + be + PII" (must be followed: phải được tuân thủ) -> chọn B.',
        clue: 'must + be + PII',
        translation: 'Các quy trình an toàn nghiêm ngặt phải được tuân thủ bởi tất cả công nhân nhà máy mà không có ngoại lệ.'
      }
    ],
    questionPool: [
      {
        id: 'q9-p1',
        question: 'The project _______ by the time the financial inspectors arrived last Monday.',
        options: { A: 'had been completed', B: 'has been completed', C: 'was completed', D: 'completed' },
        correctAnswer: 'A',
        explanation: 'By the time + QK đơn (arrived) -> mệnh đề trước chia Quá khứ hoàn thành bị động "had been completed".',
        clue: 'By the time + QK đơn -> had been PII',
        translation: 'Dự án đã được hoàn thành trước thời điểm các thanh tra tài chính đến vào thứ Hai tuần trước.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 10: CÂU ĐIỀU KIỆN VÀ CÂU ƯỚC (CONDITIONALS & WISHES)
  // =========================================================================
  {
    id: 'topic-10',
    topicNumber: 10,
    title: 'Chuyên đề 10: Câu điều kiện',
    shortTitle: 'Điều kiện & Ước',
    englishTitle: 'Conditionals & Wishes',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.4 điểm (2 câu trong đề thi THPTQG: 1 câu chia động từ + 1 câu viết lại câu tương đương) • Cấp độ: Thông hiểu & Vận dụng',
    concept: 'Câu điều kiện diễn tả một giả thiết và kết quả tương ứng. Trọng tâm đề thi bao gồm 3 loại cơ bản (Loại 1, 2, 3), Điều kiện hỗn hợp (Mixed Conditionals), Đảo ngữ câu điều kiện và Câu ước (Wish/If only).',
    recognitionSignals: [
      'Câu bắt đầu bằng IF, UNLESS (= If not), PROVIDED THAT, AS LONG AS, IN CASE.',
      'Câu bắt đầu bằng BUT FOR / WITHOUT + Noun/V-ing.',
      'Đảo ngữ không có IF: câu bắt đầu bằng SHOULD, WERE hoặc HAD đứng đầu câu.',
      'Câu chứa động từ WISH hoặc IF ONLY.'
    ],
    formulas: [
      'Loại 1 (Có thật tương lai): If + S + V(hiện tại đơn), S + will / can + V-bare',
      'Loại 2 (Trái hiện tại): If + S + V-ed / were, S + would / could + V-bare',
      'Loại 3 (Trái quá khứ): If + S + had + PII, S + would / could + have + PII',
      'Hỗn hợp 3-2: If + S + had + PII, S + would + V-bare (now / today / at present)',
      'Đảo ngữ Loại 1: Should + S + V, S + will + V | Loại 2: Were + S + to V, S + would + V | Loại 3: Had + S + PII, S + would have PII',
      'Unless = If ... not | But for / Without + N = If it weren\'t for / If it hadn\'t been for'
    ],
    detailedSections: [
      {
        heading: '1. Ba loại Câu điều kiện cơ bản',
        badge: 'Loại 1, 2, 3',
        content: 'Bản chất theo trục thời gian:',
        bulletPoints: [
          'Loại 1 (Có thể xảy ra ở hiện tại hoặc tương lai): If + S + V(hiện tại đơn), S + will + V-bare. (Ví dụ: If it rains, we will stay at home).',
          'Loại 2 (Giả định trái ngược với thực tế ở HIỆN TẠI): If + S + V2/ed (to be luôn dùng WERE cho mọi ngôi), S + would/could + V-bare. (Ví dụ: If I were you, I would accept the scholarship).',
          'Loại 3 (Giả định trái ngược với thực tế trong QUÁ KHỨ): If + S + had + PII, S + would/could + have + PII. (Ví dụ: If I had studied harder, I would have passed the exam).'
        ]
      },
      {
        heading: '2. Câu điều kiện Hỗn hợp (Mixed Conditionals) - ĐIỂM 9+',
        badge: 'Hỗn hợp 3 - 2',
        content: 'Giả định một hành động trái ngược trong QUÁ KHỨ nhưng kết quả lại ảnh hưởng đến HIỆN TẠI:',
        formula: 'If + S + had + PII, S + would / could + V-bare (NOW / TODAY / AT PRESENT)',
        rules: [
          'Dấu hiệu nhận biết: Vế IF có mốc thời gian quá khứ (yesterday, last night, then), còn VẾ CHÍNH có từ chỉ hiện tại (now, today, at present).',
          'Ví dụ: If you had listened to my advice yesterday, you wouldn\'t be in such a mess now. (Hôm qua nghe lời thì bây giờ đâu có rắc rối).'
        ]
      },
      {
        heading: '3. Đảo ngữ Câu điều kiện (Inversion in Conditionals)',
        badge: 'Đảo ngữ ĐK',
        content: 'Bỏ IF và đảo trợ động từ lên đầu câu:',
        bulletPoints: [
          'Đảo ngữ Loại 1: Should + S + V-bare, S + will + V-bare. (Should you require further assistance, please contact me).',
          'Đảo ngữ Loại 2: Were + S + to-V (hoặc Were + S + Adj/Noun), S + would + V-bare. (Were I rich, I would travel around the world / Were they to arrive early, we would welcome them).',
          'Đảo ngữ Loại 3: Had + S + PII, S + would have + PII. (Had the ambulance arrived sooner, his life might have been saved).'
        ]
      },
      {
        heading: '4. Câu ước (Wish / If only)',
        badge: 'Wish',
        content: 'Quy tắc lùi thì khi dùng câu ước:',
        rules: [
          'Ước ở Tương lai: S + wish + S + WOULD / COULD + V-bare.',
          'Ước ở Hiện tại (trái thực tế hiện tại): S + wish + S + V-ed / were.',
          'Ước ở Quá khứ (tiếc nuối chuyện quá khứ): S + wish + S + HAD + PII.'
        ]
      }
    ],
    rules: [
      { label: 'Loại 1, 2, 3', text: 'Loại 1: V(hiện tại) - will V; Loại 2: V-ed/were - would V; Loại 3: had PII - would have PII.' },
      { label: 'Đảo ngữ', text: 'Should + S + V (Loại 1); Were + S + to V (Loại 2); Had + S + PII (Loại 3).' },
      { label: 'Hỗn hợp 3-2', text: 'If had PII, would + V-bare (now).' }
    ],
    examples: [
      {
        en: 'If she had checked the train timetable carefully, she would not have missed her interview.',
        vi: 'Nếu cô ấy kiểm tra lịch tàu cẩn thận thì cô ấy đã không bị lỡ buổi phỏng vấn.',
        note: 'Câu điều kiện loại 3 diễn tả giả định trái ngược với sự thật trong quá khứ.'
      },
      {
        en: 'Had the government acted more decisively, the pandemic would have been controlled much faster.',
        vi: 'Giá như chính phủ hành động quyết liệt hơn thì đại dịch đã được kiểm soát nhanh hơn nhiều.',
        note: 'Đảo ngữ câu điều kiện loại 3: Had + S + PII thay cho If the government had acted.'
      }
    ],
    examTips: [
      '⚠️ Mẹo làm bài câu viết lại tương đương: Nếu câu gốc dùng thì Quá khứ đơn (thực tế quá khứ) -> viết lại bằng Câu điều kiện Loại 3. Nếu câu gốc dùng Hiện tại đơn -> viết lại bằng Câu điều kiện Loại 2.',
      '⚠️ Cụm "But for / Without + Noun": Nếu vế chính là "would have PII" -> câu gốc là "If it hadn\'t been for + N".'
    ],
    questions: [
      {
        id: 'q10-1',
        question: 'If the weather _______ fine tomorrow, we will organize an outdoor picnic in the botanic gardens.',
        options: { A: 'is', B: 'will be', C: 'were', D: 'had been' },
        correctAnswer: 'A',
        explanation: 'Câu điều kiện loại 1 (vế chính "will organize"), mệnh đề IF chia ở thì hiện tại đơn -> chọn "is".',
        clue: 'If + S + V(hiện tại đơn), S + will V',
        translation: 'Nếu ngày mai thời tiết đẹp, chúng tôi sẽ tổ chức một buổi dã ngoại ngoài trời trong vườn bách thảo.'
      },
      {
        id: 'q10-2',
        question: 'If I _______ enough money right now, I would buy that state-of-the-art electric vehicle.',
        options: { A: 'have', B: 'had', C: 'had had', D: 'will have' },
        correctAnswer: 'B',
        explanation: 'Ngữ cảnh giả định trái ngược hiện tại ("right now", vế chính "would buy") -> điều kiện loại 2, chia quá khứ đơn "had".',
        clue: 'điều kiện loại 2 (right now) -> had',
        translation: 'Nếu lúc này tôi có đủ tiền, tôi sẽ mua chiếc xe điện tối tân đó.'
      },
      {
        id: 'q10-3',
        question: '_______ you require any further documentation, please do not hesitate to contact our customer care.',
        options: { A: 'Were', B: 'Should', C: 'Had', D: 'Unless' },
        correctAnswer: 'B',
        explanation: 'Đảo ngữ câu điều kiện loại 1: "Should + S + V-bare" thay cho "If you require..." -> chọn "Should".',
        clue: 'Should + S + V-bare (đảo ngữ loại 1)',
        translation: 'Nếu quý khách cần thêm bất kỳ tài liệu nào, xin vui lòng đừng ngần ngại liên hệ bộ phận chăm sóc khách hàng của chúng tôi.'
      },
      {
        id: 'q10-4',
        question: 'If he had followed the doctor\'s strict dietary advice last year, he _______ so many health problems now.',
        options: { A: 'wouldn\'t have had', B: 'wouldn\'t have', C: 'won\'t have', D: 'didn\'t have' },
        correctAnswer: 'B',
        explanation: 'Câu điều kiện hỗn hợp 3 - 2: Vế IF xảy ra trong quá khứ ("last year": had followed), vế chính chịu hậu quả ở hiện tại ("now") -> dùng "wouldn\'t have".',
        clue: 'Hỗn hợp 3-2 (now) -> would + V-bare',
        translation: 'Nếu năm ngoái anh ấy tuân theo lời khuyên ăn kiêng nghiêm ngặt của bác sĩ, thì bây giờ anh ấy đã không gặp nhiều vấn đề sức khỏe như vậy.'
      },
      {
        id: 'q10-5',
        question: 'Without his generous financial support, we _______ able to establish the charity school.',
        options: { A: 'wouldn\'t be', B: 'wouldn\'t have been', C: 'won\'t be', D: 'weren\'t' },
        correctAnswer: 'B',
        explanation: 'Without his support = If he hadn\'t supported us (trong quá khứ) -> vế chính dùng "wouldn\'t have been" (loại 3).',
        clue: 'Without + N (quá khứ) -> would have been',
        translation: 'Nếu không có sự hỗ trợ tài chính hào phóng của ông ấy, chúng tôi đã không thể thành lập được ngôi trường từ thiện đó.'
      }
    ],
    questionPool: [
      {
        id: 'q10-p1',
        question: '_______ the firefighters arrived a few minutes later, the entire wooden house would have burned down.',
        options: { A: 'Had', B: 'Were', C: 'Should', D: 'Unless' },
        correctAnswer: 'A',
        explanation: 'Đảo ngữ câu điều kiện loại 3: "Had + S + PII" (Had the firefighters arrived...) -> chọn "Had".',
        clue: 'Had + S + PII (đảo ngữ loại 3)',
        translation: 'Giá như những người lính cứu hỏa đến muộn vài phút, thì toàn bộ ngôi nhà gỗ đã bị thiêu rụi hoàn toàn.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 11: ĐỘNG TỪ KHIẾM KHUYẾT (MODAL VERBS & MODALS IN THE PAST)
  // =========================================================================
  {
    id: 'topic-11',
    topicNumber: 11,
    title: 'Chuyên đề 11: khiếm khuyết',
    shortTitle: 'Động từ khuyết thiếu',
    englishTitle: 'Modal Verbs & Modals in the Past',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 điểm (1 câu cố định trong phần viết lại câu tìm câu đồng nghĩa) • Cấp độ: Thông hiểu & Vận dụng',
    concept: 'Hệ thống các động từ khuyết thiếu (Must, Can, May, Might, Should, Needn\'t) và đặc biệt là ĐỘNG TỪ KHUYẾT THIẾU HOÀN THÀNH Ở QUÁ KHỨ (Modals + Have + PII) để diễn tả suy đoán, trách móc hoặc điều hối tiếc.',
    recognitionSignals: [
      'Câu hỏi tìm câu đồng nghĩa (Closest in meaning) có chứa: It is necessary / It is mandatory / You are not allowed to / It was wrong of you to...',
      'Bốn phương án chứa dạng: must have PII / should have PII / couldn\'t have PII / needn\'t have PII.',
      'Ngữ cảnh có bằng chứng rõ ràng trong quá khứ để suy đoán logic.'
    ],
    formulas: [
      'Must have + PII: Chắc hẳn là đã (suy đoán chắc chắn 99% trong quá khứ có bằng chứng)',
      'Can\'t / Couldn\'t have + PII: Chắc chắn là đã không thể xảy ra (phủ định chắc chắn 99%)',
      'Should have + PII: Lẽ ra nên làm (nhưng thực tế đã KHÔNG làm - trách móc / nuối tiếc)',
      'Needn\'t have + PII: Lẽ ra không cần làm (nhưng thực tế đã LỠ LÀM rồi - làm thừa)',
      'May / Might have + PII: Có lẽ là đã (suy đoán không chắc chắn khoảng 50%)'
    ],
    detailedSections: [
      {
        heading: '1. Modal Verbs cơ bản & Các cụm tương đương',
        badge: 'Cơ bản',
        content: 'Bảng đối chiếu khi làm bài viết lại câu:',
        rules: [
          'MUST = It is mandatory / compulsory / required to V (Bắt buộc phải làm).',
          'MUSTN\'T = You are not allowed to V / It is forbidden to V (Cấm tuyệt đối không được làm).',
          'NEEDN\'T / DON\'T HAVE TO = It is not necessary to V (Không cần thiết phải làm).',
          'SHOULD / OUGHT TO = It is advisable to V / You had better V (Nên làm gì).'
        ]
      },
      {
        heading: '2. BẢNG VÀNG: Modals in the Past (DẠNG TRỌNG TÂM ĐỀ THI)',
        badge: 'Quá khứ 9+',
        content: 'Đây là dạng xuất hiện 100% trong phần viết lại câu tìm câu đồng nghĩa:',
        bulletPoints: [
          'MUST HAVE + PII: "Chắc hẳn là đã..." -> Dùng khi suy đoán một việc chắc chắn đã xảy ra trong quá khứ dựa vào dấu hiệu thực tế. (Ví dụ: The ground is wet. It MUST HAVE RAINED last night).',
          'CAN\'T / COULDN\'T HAVE + PII: "Chắc chắn là đã không..." -> Suy đoán chắc chắn một việc không thể xảy ra trong quá khứ. (Ví dụ: He was with me in Hanoi all day, so he COULDN\'T HAVE COMMITTED the crime in HCM City).',
          'SHOULD HAVE + PII: "Lẽ ra nên làm..." -> Diễn tả một việc đáng lẽ phải làm trong quá khứ nhưng thực tế đã KHÔNG làm. (Ví dụ: You SHOULD HAVE TOLD me the truth = It was wrong of you not to tell me).',
          'NEEDN\'T HAVE + PII: "Lẽ ra không cần làm..." -> Diễn tả một việc trên thực tế đã làm rồi, nhưng việc đó hoàn toàn không cần thiết (làm thừa). (Ví dụ: You NEEDN\'T HAVE BROUGHT an umbrella because it didn\'t rain).',
          'MIGHT / MAY HAVE + PII: "Có lẽ là đã..." -> Suy đoán khả năng một việc có thể đã xảy ra nhưng không chắc chắn.'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng phân biệt: Should have PII vs Needn\'t have PII',
      headers: ['Cấu trúc', 'Bản chất thực tế', 'Sắc thái', 'Ví dụ'],
      rows: [
        ['Should have + PII', 'Thực tế ĐÃ KHÔNG LÀM', 'Trách móc, tiếc nuối', 'You should have locked the door. (Thực tế là bạn đã quên không khóa)'],
        ['Needn\'t have + PII', 'Thực tế ĐÃ LÀM RỒI', 'Làm việc không cần thiết (thừa)', 'You needn\'t have bought more bread. (Thực tế là bạn đã mua nhưng ở nhà vẫn còn)']
      ]
    },
    rules: [
      { label: 'Must have PII', text: 'Chắc hẳn đã (suy đoán chắc chắn 99% trong quá khứ).' },
      { label: 'Can\'t have PII', text: 'Chắc chắn đã không thể xảy ra (phủ định chắc chắn 99%).' },
      { label: 'Should have PII', text: 'Lẽ ra nên làm (nhưng thực tế đã không làm).' },
      { label: 'Needn\'t have PII', text: 'Lẽ ra không cần làm (nhưng đã lỡ làm thừa).' }
    ],
    examples: [
      {
        en: 'The street lights are still on; someone must have forgotten to switch them off.',
        vi: 'Đèn đường vẫn đang sáng; chắc hẳn ai đó đã quên tắt chúng rồi.',
        note: 'Must have forgotten: suy đoán chắc chắn có căn cứ thực tế (đèn vẫn đang sáng).'
      },
      {
        en: 'You should have submitted your scholarship application before the deadline yesterday.',
        vi: 'Lẽ ra bạn nên nộp đơn xin học bổng trước hạn chót ngày hôm qua.',
        note: 'Should have submitted: trách móc vì thực tế hôm qua đã không nộp.'
      }
    ],
    examTips: [
      '⚠️ Thấy đề bài: "It is not permitted / forbidden to..." -> Chọn ngay đáp án có "MUSTN\'T".',
      '⚠️ Thấy đề bài: "It was a mistake for sb not to do sth" -> Chọn ngay "SHOULD HAVE + PII".'
    ],
    questions: [
      {
        id: 'q11-1',
        question: 'Her lights are on and her car is in the driveway. She _______ at home right now.',
        options: { A: 'must be', B: 'can be', C: 'should be', D: 'need be' },
        correctAnswer: 'A',
        explanation: 'Suy đoán chắc chắn ở hiện tại dựa vào bằng chứng rõ ràng ("lights are on, car is in the driveway") -> dùng "must be".',
        clue: 'bằng chứng hiện tại -> must be',
        translation: 'Đèn nhà cô ấy đang bật và xe của cô ấy đang ở lối vào. Chắc hẳn cô ấy đang ở nhà lúc này.'
      },
      {
        id: 'q11-2',
        question: 'Jack walked into the room completely soaked. It _______ heavily outside.',
        options: { A: 'must have rained', B: 'should have rained', C: 'can have rained', D: 'need have rained' },
        correctAnswer: 'A',
        explanation: 'Căn cứ thực tế trong quá khứ: Jack bước vào phòng người ướt sũng -> suy đoán chắc chắn trong quá khứ dùng "must have rained" (chắc hẳn trời đã mưa to).',
        clue: 'người ướt sũng -> must have rained',
        translation: 'Jack bước vào phòng người ướt sũng. Chắc hẳn bên ngoài trời đã mưa rất to.'
      },
      {
        id: 'q11-3',
        question: 'It was wrong of you to shout at your younger sister like that. You _______ more patient.',
        options: { A: 'must have been', B: 'should have been', C: 'needn\'t have been', D: 'might have been' },
        correctAnswer: 'B',
        explanation: '"It was wrong of you..." chỉ sự trách móc: Lẽ ra bạn nên kiên nhẫn hơn (nhưng thực tế đã không kiên nhẫn) -> dùng "should have been".',
        clue: 'trách móc quá khứ -> should have been',
        translation: 'Bạn quát mắng em gái như vậy là sai rồi. Lẽ ra bạn nên kiên nhẫn hơn.'
      },
      {
        id: 'q11-4',
        question: 'You _______ all those heavy winter coats. The weather forecast says it will be warm all week.',
        options: { A: 'needn\'t have packed', B: 'mustn\'t have packed', C: 'shouldn\'t pack', D: 'can\'t pack' },
        correctAnswer: 'A',
        explanation: 'Thực tế người nghe đã lỡ xếp áo khoác ấm vào vali rồi, nhưng việc đó là thừa/không cần thiết -> dùng "needn\'t have packed".',
        clue: 'làm thừa trong quá khứ -> needn\'t have packed',
        translation: 'Lẽ ra bạn không cần phải gói tất cả những chiếc áo khoác mùa đông dày đó. Dự báo thời tiết nói rằng cả tuần sẽ ấm áp.'
      },
      {
        id: 'q11-5',
        question: 'Wearing safety helmets is strictly compulsory for all motorcyclists in this country.',
        options: {
          A: 'Motorcyclists must wear safety helmets in this country.',
          B: 'Motorcyclists should wear safety helmets in this country.',
          C: 'Motorcyclists needn\'t wear safety helmets in this country.',
          D: 'Motorcyclists can wear safety helmets in this country.'
        },
        correctAnswer: 'A',
        explanation: '"strictly compulsory" (bắt buộc nghiêm ngặt) tương đương với động từ khuyết thiếu "must" -> chọn A.',
        clue: 'compulsory = must',
        translation: 'Đội mũ bảo hiểm là bắt buộc nghiêm ngặt đối với tất cả người đi xe máy ở đất nước này.'
      }
    ],
    questionPool: [
      {
        id: 'q11-p1',
        question: 'He _______ the precious diamond ring because he was in another city with his family that night.',
        options: { A: 'couldn\'t have stolen', B: 'mustn\'t have stolen', C: 'shouldn\'t have stolen', D: 'needn\'t have stolen' },
        correctAnswer: 'A',
        explanation: 'Có bằng chứng ngoại phạm chắc chắn trong quá khứ -> suy đoán phủ định 100%: "couldn\'t have stolen" (chắc chắn đã không thể lấy trộm).',
        clue: 'bằng chứng ngoại phạm -> couldn\'t have stolen',
        translation: 'Anh ta chắc chắn đã không thể lấy trộm chiếc nhẫn kim cương quý giá vì đêm đó anh ta đang ở một thành phố khác cùng gia đình.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 12: LIÊN TỪ VÀ MỆNH ĐỀ TRẠNG NGỮ (CONJUNCTIONS & ADVERBIAL CLAUSES)
  // =========================================================================
  {
    id: 'topic-12',
    topicNumber: 12,
    title: 'Chuyên đề 12: liên từ và mệnh đề trạng ngữ',
    shortTitle: 'Liên từ & MĐ trạng ngữ',
    englishTitle: 'Conjunctions & Adverbial Clauses',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 - 0.4 điểm (1 - 2 câu trong đề thi THPTQG) • Cấp độ: Thông hiểu & Vận dụng',
    concept: 'Bản chất cốt lõi của dạng bài này trong đề thi là PHÂN BIỆT GIỮA LIÊN TỪ (đi với một mệnh đề có S + V) VÀ GIỚI TỪ (đi với Cụm danh từ hoặc V-ing), kết hợp với mối quan hệ ngữ nghĩa (nguyên nhân, nhượng bộ, mục đích, thời gian).',
    recognitionSignals: [
      'Bốn phương án gồm các cặp từ: Because vs Because of; Although vs Despite / In spite of; So that vs In order to.',
      'Phía sau chỗ trống là một MỆNH ĐỀ (có đủ Chủ ngữ S và Động từ chia thì V) HOẶC chỉ là một CỤM DANH TỪ (Noun Phrase) / V-ing.'
    ],
    formulas: [
      'Chỉ nguyên nhân: BECAUSE / SINCE / AS + S + V  <--->  BECAUSE OF / DUE TO / OWING TO + Noun / V-ing',
      'Chỉ nhượng bộ: ALTHOUGH / EVEN THOUGH / THOUGH + S + V  <--->  DESPITE / IN SPITE OF + Noun / V-ing',
      'Chỉ mục đích: SO THAT / IN ORDER THAT + S + can/could + V  <--->  IN ORDER TO / SO AS TO / TO + V-bare',
      'Dạng nhượng bộ nâng cao (Đảo tính từ): ADJ / ADV + AS / THOUGH + S + V, S + V'
    ],
    detailedSections: [
      {
        heading: '1. Nhóm chỉ Nguyên nhân - Kết quả (Bởi vì)',
        badge: 'Nguyên nhân',
        content: 'Biểu thị lý do dẫn đến hành động:',
        bulletPoints: [
          'Đi với MỆNH ĐỀ (S + V): Because, Since, As, Now that. (Ví dụ: Because the weather was terrible, we cancelled the trip).',
          'Đi với CỤM DANH TỪ / V-ING: Because of, Due to, Owing to, On account of, As a result of. (Ví dụ: Because of the terrible weather, we cancelled the trip).'
        ]
      },
      {
        heading: '2. Nhóm chỉ Nhượng bộ - Tương phản (Mặc dù)',
        badge: 'Nhượng bộ',
        content: 'Biểu thị hai vế trái ngược nhau về mặt ý nghĩa:',
        bulletPoints: [
          'Đi với MỆNH ĐỀ (S + V): Although, Even though, Though. (Ví dụ: Although he studied diligently, he didn\'t pass the test).',
          'Đi với CỤM DANH TỪ / V-ING: Despite, In spite of. (Ví dụ: In spite of his diligent studying, he didn\'t pass the test).',
          'Cấu trúc "Despite the fact that + S + V": Khi thêm cụm "the fact that", Despite có thể đi với một mệnh đề hoàn chỉnh.',
          '⚠️ CẤU TRÚC ĐẢO TÍNH TỪ NHƯỢNG BỘ 9+: Adj / Adv + as / though + S + V, S + V. (Ví dụ: Rich as he is, he is not happy = Although he is rich...).'
        ]
      },
      {
        heading: '3. Nhóm chỉ Mục đích (Để mà)',
        badge: 'Mục đích',
        content: 'Biểu thị mục đích hướng tới của hành động:',
        rules: [
          'Đi với MỆNH ĐỀ: So that / In order that + S + can / could / will / would + V-bare. (He studied hard so that he could enter university).',
          'Đi với ĐỘNG TỪ NGUYÊN MẪU: In order to / So as to / To + V-bare. (Phủ định: In order NOT to / So as NOT to + V-bare).'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng đối chiếu Vàng: Liên từ (S + V) vs Giới từ (Noun/V-ing)',
      headers: ['Ý nghĩa', 'Đi với Mệnh đề (S + V)', 'Đi với Cụm từ (Noun / V-ing)'],
      rows: [
        ['Bởi vì (Nguyên nhân)', 'Because, Since, As', 'Because of, Due to, Owing to'],
        ['Mặc dù (Nhượng bộ)', 'Although, Even though, Though', 'Despite, In spite of'],
        ['Để mà (Mục đích)', 'So that, In order that (+ S + can/will V)', 'In order to, So as to, To (+ V-bare)']
      ]
    },
    rules: [
      { label: 'Nguyên nhân', text: 'Because + S + V; Because of + N/V-ing.' },
      { label: 'Nhượng bộ', text: 'Although + S + V; Despite/In spite of + N/V-ing.' },
      { label: 'Mục đích', text: 'So that + S + can/could V; In order to + V-bare.' },
      { label: 'Đảo Adj nhượng bộ', text: 'Adj + as/though + S + V (Rich as he is...).' }
    ],
    examples: [
      {
        en: 'Despite having little prior experience, she managed to lead the project successfully.',
        vi: 'Mặc dù có ít kinh nghiệm trước đó, cô ấy vẫn xoay xở lãnh đạo dự án thành công.',
        note: 'Despite + V-ing (having little prior experience).'
      },
      {
        en: 'Difficult as the physics examination was, Minh scored a perfect ten.',
        vi: 'Dù cho bài thi vật lý rất khó, Minh vẫn đạt điểm mười tuyệt đối.',
        note: 'Đảo tính từ nhượng bộ: Difficult (Adj) + as + the examination was.'
      }
    ],
    examTips: [
      '⚠️ Mẹo 5 giây chọn đáp án: Nhìn ngay sau chỗ trống, nếu có ĐỘNG TỪ CHIA THÌ (is, was, has, V-ed) -> loại ngay Because of / Despite / In spite of, chỉ chọn Because hoặc Although!',
      '⚠️ Tuyệt đối không có "Despite OF" (chỉ có In spite of hoặc Despite đứng một mình).'
    ],
    questions: [
      {
        id: 'q12-1',
        question: '_______ the economic recession was severe, the technology startup continued to expand rapidly.',
        options: { A: 'Because', B: 'Although', C: 'Despite', D: 'Because of' },
        correctAnswer: 'B',
        explanation: 'Sau chỗ trống là một mệnh đề hoàn chỉnh "the economic recession was severe" (S + was + Adj) và có ý nghĩa tương phản -> chọn liên từ "Although".',
        clue: 'mệnh đề tương phản -> Although',
        translation: 'Mặc dù cuộc suy thoái kinh tế diễn ra nghiêm trọng, công ty khởi nghiệp công nghệ vẫn tiếp tục mở rộng nhanh chóng.'
      },
      {
        id: 'q12-2',
        question: 'Many domestic flights had to be canceled _______ the dense fog covering the runway.',
        options: { A: 'because', B: 'because of', C: 'although', D: 'in spite of' },
        correctAnswer: 'B',
        explanation: 'Sau chỗ trống là một Cụm danh từ "the dense fog covering the runway" và mang nghĩa nguyên nhân -> dùng "because of".',
        clue: 'cụm danh từ chỉ nguyên nhân -> because of',
        translation: 'Nhiều chuyến bay nội địa đã phải bị hủy vì sương mù dày đặc bao phủ đường băng.'
      },
      {
        id: 'q12-3',
        question: 'She woke up early this morning _______ be late for her university graduation ceremony.',
        options: { A: 'in order not to', B: 'so that', C: 'in order that', D: 'not to in order' },
        correctAnswer: 'A',
        explanation: 'Chỉ mục đích phủ định đi với động từ nguyên mẫu V-bare "be": "in order not to + V-bare" (để không bị muộn) -> chọn A.',
        clue: 'in order not to + V-bare',
        translation: 'Sáng nay cô ấy thức dậy sớm để không bị muộn lễ tốt nghiệp đại học của mình.'
      },
      {
        id: 'q12-4',
        question: '_______ tired she felt after the long journey, she still attended the charity dinner.',
        options: { A: 'Although', B: 'However', C: 'Much as', D: 'No matter how' },
        correctAnswer: 'D',
        explanation: 'Cấu trúc nhượng bộ: "No matter how + Adj + S + V" (No matter how tired she felt = Dù cô ấy có cảm thấy mệt mỏi đến đâu) -> chọn D.',
        clue: 'No matter how + Adj + S + V',
        translation: 'Dù cảm thấy mệt mỏi đến đâu sau chuyến đi dài, cô ấy vẫn tham dự bữa tối từ thiện.'
      },
      {
        id: 'q12-5',
        question: 'He wore a thick woolen coat _______ he wouldn\'t catch a cold in the freezing wind.',
        options: { A: 'so that', B: 'in order to', C: 'because of', D: 'despite' },
        correctAnswer: 'A',
        explanation: 'Sau chỗ trống là một mệnh đề chỉ mục đích có modal verb "he wouldn\'t catch a cold" -> dùng "so that".',
        clue: 'so that + S + wouldn\'t V',
        translation: 'Anh ấy đã mặc một chiếc áo khoác len dày để không bị cảm lạnh trong làn gió buốt giá.'
      }
    ],
    questionPool: [
      {
        id: 'q12-p1',
        question: '_______ the unexpected heavy rain, all the outdoor activities were postponed.',
        options: { A: 'Due to', B: 'Because', C: 'Even though', D: 'Despite' },
        correctAnswer: 'A',
        explanation: 'Sau chỗ trống là cụm danh từ "the unexpected heavy rain" chỉ nguyên nhân dẫn đến việc hoãn hoạt động -> chọn "Due to".',
        clue: 'Due to + Cụm danh từ nguyên nhân',
        translation: 'Do cơn mưa lớn bất ngờ, tất cả các hoạt động ngoài trời đã bị hoãn lại.'
      }
    ]
  }
];
