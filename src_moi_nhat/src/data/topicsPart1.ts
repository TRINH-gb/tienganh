import { CleanGrammarTopic } from './grammarHandbookTypes';

export const TOPICS_PART_1: CleanGrammarTopic[] = [
  // =========================================================================
  // CHUYÊN ĐỀ 1: TỪ LOẠI (PARTS OF SPEECH & WORD FORMATION)
  // =========================================================================
  {
    id: 'topic-1',
    topicNumber: 1,
    title: 'Chuyên đề 1: Từ loại',
    shortTitle: 'Từ loại',
    englishTitle: 'Parts of Speech & Word Formation',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 - 0.4 điểm (1 - 2 câu trong đề thi THPTQG) • Cấp độ: Nhận biết & Thông hiểu',
    concept: 'Dạng bài kiểm tra khả năng nhận diện chức năng ngữ pháp và vị trí đứng của Danh từ (N), Động từ (V), Tính từ (Adj), Trạng từ (Adv) trong câu dựa vào các thành phần đứng liền trước và liền sau chỗ trống.',
    recognitionSignals: [
      'Bốn phương án A, B, C, D có CÙNG GỐC TỪ nhưng khác nhau về đuôi từ loại (hậu tố). Ví dụ: pollute / pollution / pollutant / polluted.',
      'Trước chỗ trống xuất hiện Mạo từ (a/an/the), Giới từ (in, on, at...), Tính từ sở hữu (my, your...), hoặc Động từ to be / Động từ tri giác.',
      'Sau chỗ trống là một Danh từ, Động từ thường hoặc chỗ trống nằm ở cuối câu/đầu câu trước dấu phẩy.'
    ],
    formulas: [
      'Cụm Danh từ hoàn chỉnh: (a/an/the / my / this) + (Trạng từ) + Tính từ + DANH TỪ',
      'Vị trí Tính từ: S + be / Linking Verb (look, seem, sound, feel, become) + TÍNH TỪ',
      'Cấu trúc bổ ngữ tính từ: S + make / find / keep / consider + Tân ngữ (O) + TÍNH TỪ',
      'Vị trí Trạng từ: S + TRẠNG TỪ + V_thường | S + V + O + TRẠNG TỪ | TRẠNG TỪ, S + V',
      'Trật tự tính từ đứng trước danh từ: Op - S - A - S - C - O - M - P + Noun'
    ],
    detailedSections: [
      {
        heading: '1. Vị trí & Dấu hiệu nhận biết Danh từ (Noun)',
        badge: 'Danh từ (N)',
        content: 'Danh từ đóng vai trò làm Chủ ngữ (đầu câu trước V), Tân ngữ (sau Ngoại động từ hoặc sau Giới từ).',
        formula: 'S (Danh từ) + V | V + O (Danh từ) | Preposition + Danh từ | Article / Possessive + (Adj) + Danh từ',
        rules: [
          'Sau mạo từ (a, an, the), từ chỉ định (this, that, these, those), lượng từ (many, much, several, some...).',
          'Sau tính từ sở hữu (my, his, her, their, our, its, John\'s).',
          'Đứng sau tính từ để tạo thành cụm danh từ: Adj + Noun (ví dụ: environmental protection).',
          'Hậu tố chỉ NGƯỜI hay gặp: -er (teacher, worker), -or (actor, doctor), -ist (scientist, tourist), -ant (assistant, pollutant), -ee (employee, interviewee).',
          'Hậu tố chỉ KHÁI NIỆM/VẬT hay gặp: -tion/-sion (pollution, decision), -ment (development), -ity (activity, ability), -ance/-ence (importance, difference), -ness (kindness, happiness), -ship (friendship), -ism (criticism).'
        ]
      },
      {
        heading: '2. Vị trí & Dấu hiệu nhận biết Tính từ (Adjective)',
        badge: 'Tính từ (Adj)',
        content: 'Tính từ dùng để miêu tả đặc tính, tính chất, trạng thái của danh từ hoặc đại từ.',
        formula: 'Adj + Noun | S + be / Linking Verb + Adj | S + make/find/keep + O + Adj',
        rules: [
          'Đứng trước danh từ bổ nghĩa cho danh từ đó (an attractive job, serious damage).',
          'Đứng sau động từ to be và các Động từ nối (Linking Verbs) chỉ tri giác: look, feel, taste, smell, sound, seem, appear, become, get, stay, remain (She looks tired; The food tastes delicious).',
          'Đứng sau đại từ bất định: something, anything, someone, nothing + Adj (something important).',
          'Hậu tố tính từ thông dụng: -ful (helpful, careful), -less (careless, helpless), -ive (creative, active), -ous (dangerous, famous), -able/-ible (suitable, visible), -al (cultural, traditional), -ic/-ical (economic, historic), -ent/-ant (confident, pleasant).'
        ]
      },
      {
        heading: '3. Quy tắc thần chú Trật tự Tính từ (OpSACOMP)',
        badge: 'Trật tự tính từ',
        content: 'Khi có từ 2 tính từ trở lên cùng đứng trước bổ nghĩa cho một danh từ, bắt buộc phải sắp xếp theo thứ tự chuẩn quốc tế.',
        formula: 'Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose + Noun',
        bulletPoints: [
          'Opinion (Ý kiến, quan điểm chủ quan): lovely, beautiful, nice, terrible, wonderful, charming',
          'Size (Kích cỡ, độ lớn): big, small, huge, tiny, long, short, tall',
          'Age (Độ tuổi, mới cũ): old, young, new, ancient, modern',
          'Shape (Hình dáng): round, square, oval, rectangular, triangle',
          'Color (Màu sắc): black, white, red, blue, green, yellow',
          'Origin (Xuất xứ, nguồn gốc): Vietnamese, Japanese, British, American',
          'Material (Chất liệu cấu thành): wooden, leather, plastic, silk, cotton, steel',
          'Purpose (Mục đích sử dụng - thường tận cùng đuôi -ing): sleeping (bag), running (shoes), dining (table)'
        ]
      },
      {
        heading: '4. Vị trí & Dấu hiệu nhận biết Trạng từ (Adverb)',
        badge: 'Trạng từ (Adv)',
        content: 'Trạng từ bổ nghĩa cho Động từ thường, Tính từ, một Trạng từ khác hoặc toàn bộ mệnh đề.',
        formula: 'Adv, S + V | S + Adv + V | S + V + O + Adv | be + Adv + Adj | be / have + Adv + PII',
        rules: [
          'Bổ nghĩa cho động từ thường: She speaks English fluently. (TUYỆT ĐỐI KHÔNG chen trạng từ vào giữa Động từ và Tân ngữ: Speaks fluently English là SAI!).',
          'Bổ nghĩa cho tính từ: It is extremely important. (be + Adv + Adj).',
          'Đứng đầu câu trước dấu phẩy: Fortunately, we arrived on time.',
          'Đứng giữa trợ động từ và động từ chính: The project has successfully been completed.',
          'Công thức tạo trạng từ thông dụng: Tính từ + -ly = Trạng từ (quick -> quickly, careful -> carefully).'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng đối chiếu các cặp từ loại dễ gây nhầm lẫn nhất trong đề thi',
      headers: ['Cặp từ vựng', 'Loại từ & Ý nghĩa', 'Ví dụ chuẩn đề thi'],
      rows: [
        ['economic vs economical', 'economic (Adj): thuộc về kinh tế\neconomical (Adj): tiết kiệm, chi tiêu hợp lý', 'economic growth (tăng trưởng kinh tế)\nan economical hybrid car (xe hơi tiết kiệm nhiên liệu)'],
        ['sensible vs sensitive', 'sensible (Adj): khôn ngoan, hợp lý, biết điều\nsensitive (Adj): nhạy cảm, dễ xúc động', 'a sensible decision (quyết định khôn ngoan)\nsensitive skin / issue (làn da nhạy cảm / vấn đề nhạy cảm)'],
        ['historic vs historical', 'historic (Adj): có ý nghĩa lịch sử trọng đại\nhistorical (Adj): thuộc về lịch sử, quá khứ', 'a historic victory (chiến thắng lịch sử trọng đại)\nhistorical documents (tài liệu lịch sử)'],
        ['respectful vs respectable vs respective', 'respectful (Adj): biết tôn trọng, lễ phép\nrespectable (Adj): đáng kính, đàng hoàng\nrespective (Adj): tương ứng của từng người', 'be respectful to elders (lễ phép với người lớn)\na respectable family (gia đình gia giáo, đàng hoàng)\nreturn to their respective rooms (về phòng tương ứng của mỗi người)']
      ]
    },
    rules: [
      { label: 'Hậu tố Danh từ', text: '-tion, -ment, -ity, -ance, -ence, -ness, -er, -or, -ist, -ant, -ee.' },
      { label: 'Hậu tố Tính từ', text: '-ful, -less, -ive, -ous, -al, -able, -ible, -ic, -ent.' },
      { label: 'Hậu tố Trạng từ', text: 'Adj + -ly = Adv (quick -> quickly, slow -> slowly).' },
      { label: 'Động từ nối (Linking Verbs)', text: 'look, seem, appear, sound, feel, taste, become, get, stay, remain đi với TÍNH TỪ.' }
    ],
    examples: [
      {
        en: 'The local community organized a campaign for environmental protection.',
        vi: 'Cộng đồng địa phương đã tổ chức một chiến dịch để bảo vệ môi trường.',
        note: 'environmental (Tính từ) đứng trước danh từ protection để bổ nghĩa tạo thành cụm danh từ.'
      },
      {
        en: 'My grandmother gave me a lovely antique French silver necklace.',
        vi: 'Bà tôi đã tặng tôi một chiếc vòng cổ bằng bạc kiểu Pháp cổ rất xinh xắn.',
        note: 'OSASCOMP: lovely (Opinion) -> antique (Age) -> French (Origin) -> silver (Material) + necklace.'
      },
      {
        en: 'She answered the interviewer\'s complex questions exceptionally well.',
        vi: 'Cô ấy đã trả lời các câu hỏi phức tạp của người phỏng vấn một cách đặc biệt xuất sắc.',
        note: 'exceptionally (Adv) bổ nghĩa cho trạng từ well, và well bổ nghĩa cho động từ answered.'
      }
    ],
    examTips: [
      '⚠️ Bẫy tính từ đuôi -LY: Rất nhiều học sinh cứ thấy đuôi -ly là chọn Trạng từ. Chú ý các từ sau là TÍNH TỪ: friendly, lovely, lively, silly, ugly, lonely, cowardly, costly, deadly! Muốn dùng trạng từ phải dùng: in a friendly way/manner.',
      '⚠️ Bẫy Tính từ đuôi -ING vs -ED: Đuôi -ing chỉ BẢN CHẤT, tính chất của sự vật/hiện tượng (an exciting football match); Đuôi -ed chỉ CẢM XÚC, tâm trạng con người bị tác động (I feel excited).',
      '⚠️ Bẫy mạo từ + danh từ chỉ người hay chỉ vật: Để ý sau "a/an" nếu là người thì chọn đuôi -ist/-er/-ant (applicant, pollutant), nếu là sự việc trừu tượng thì chọn -tion/-ment.'
    ],
    questions: [
      {
        id: 'q1-1',
        question: 'Carbon dioxide, a dangerous air _______, continues to increase at an alarming rate.',
        options: { A: 'pollute', B: 'polluted', C: 'pollutant', D: 'pollution' },
        correctAnswer: 'C',
        explanation: 'Trước chỗ trống có mạo từ "a" và tính từ "dangerous air", cần một danh từ đếm được số ít chỉ chất gây ô nhiễm -> chọn "pollutant". "Pollution" là danh từ không đếm được nên không đi với "a".',
        clue: 'a dangerous air + N(số ít)',
        translation: 'Khí cacbonic, một chất gây ô nhiễm không khí nguy hiểm, tiếp tục gia tăng với tốc độ đáng báo động.'
      },
      {
        id: 'q1-2',
        question: 'The student answered all the difficult questions _______ during the interview.',
        options: { A: 'confidence', B: 'confident', C: 'confidently', D: 'confidential' },
        correctAnswer: 'C',
        explanation: 'Bổ nghĩa cho động từ thường "answered" (trả lời) cần một trạng từ -> chọn "confidently" (một cách tự tin).',
        clue: 'V + O + Adv',
        translation: 'Người học sinh đã trả lời tất cả các câu hỏi khó một cách tự tin trong buổi phỏng vấn.'
      },
      {
        id: 'q1-3',
        question: 'My mother gave me a _______ handbag on my graduation day.',
        options: { A: 'black nice leather', B: 'nice black leather', C: 'leather nice black', D: 'black leather nice' },
        correctAnswer: 'B',
        explanation: 'Áp dụng quy tắc OSASCOMP: nice (Opinion) -> black (Color) -> leather (Material) + handbag.',
        clue: 'OSASCOMP: Opinion -> Color -> Material',
        translation: 'Mẹ tôi đã tặng tôi một chiếc túi xách da màu đen rất đẹp vào ngày tốt nghiệp.'
      },
      {
        id: 'q1-4',
        question: 'This hybrid vehicle proved to be highly _______ for daily city commuting.',
        options: { A: 'economic', B: 'economical', C: 'economy', D: 'economize' },
        correctAnswer: 'B',
        explanation: 'Sau "proved to be" và trạng từ "highly", cần tính từ mang nghĩa "tiết kiệm chi phí" -> chọn "economical". Phân biệt: "economic" thuộc về kinh tế, "economical" là tiết kiệm.',
        clue: 'to be + highly + Adj (tiết kiệm)',
        translation: 'Chiếc xe lai này đã chứng minh rất tiết kiệm cho việc đi lại hàng ngày trong thành phố.'
      },
      {
        id: 'q1-5',
        question: 'Local authorities are taking decisive steps to improve the _______ of public transit.',
        options: { A: 'efficient', B: 'efficiently', C: 'efficiency', D: 'efficacious' },
        correctAnswer: 'C',
        explanation: 'Sau "the" và trước "of" bắt buộc phải là một Danh từ (the + N + of) -> chọn "efficiency" (hiệu quả).',
        clue: 'the + Noun + of',
        translation: 'Chính quyền địa phương đang thực hiện các bước quyết liệt nhằm nâng cao hiệu quả của giao thông công cộng.'
      }
    ],
    questionPool: [
      {
        id: 'q1-p1',
        question: 'Young volunteers have made a remarkable _______ to improving community life.',
        options: { A: 'contribute', B: 'contribution', C: 'contributed', D: 'contributive' },
        correctAnswer: 'B',
        explanation: 'Sau tính từ "remarkable" cần một danh từ -> chọn "contribution" (sự đóng góp). Cụm từ: make a contribution to.',
        clue: 'a remarkable + Noun',
        translation: 'Các tình nguyện viên trẻ đã có đóng góp đáng kể vào việc cải thiện đời sống cộng đồng.'
      },
      {
        id: 'q1-p2',
        question: 'Although the challenge was daunting, she remained _______ and focused on her goal.',
        options: { A: 'optimist', B: 'optimism', C: 'optimistic', D: 'optimistically' },
        correctAnswer: 'C',
        explanation: 'Sau động từ nối "remained" (vẫn giữ trạng thái) cần một Tính từ -> chọn "optimistic" (lạc quan).',
        clue: 'remained + Adj',
        translation: 'Mặc dù thử thách rất đáng sợ, cô ấy vẫn giữ tinh thần lạc quan và tập trung vào mục tiêu của mình.'
      },
      {
        id: 'q1-p3',
        question: 'He bought a _______ car after saving money for five years.',
        options: { A: 'modern red Japanese', B: 'red modern Japanese', C: 'Japanese modern red', D: 'modern Japanese red' },
        correctAnswer: 'A',
        explanation: 'OSASCOMP: modern (Age) -> red (Color) -> Japanese (Origin) + car.',
        clue: 'OSASCOMP: Age -> Color -> Origin',
        translation: 'Anh ấy đã mua một chiếc xe ô tô hiện đại màu đỏ của Nhật Bản sau khi tiết kiệm tiền suốt năm năm.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 2: MẠO TỪ VÀ HẠN ĐỊNH TỪ (ARTICLES & DETERMINERS)
  // =========================================================================
  {
    id: 'topic-2',
    topicNumber: 2,
    title: 'Chuyên đề 2: Mạo từ và hạn định',
    shortTitle: 'Mạo từ & Hạn định',
    englishTitle: 'Articles & Determiners',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 điểm (1 câu cố định trong đề thi THPTQG) • Cấp độ: Nhận biết & Thông hiểu',
    concept: 'Quy tắc phân loại và sử dụng Mạo từ bất định (A, An), Mạo từ xác định (The), Mạo từ rỗng (Zero Article - Ø) và các từ hạn định chỉ sự phân biệt (Other, Others, Another, The other, The others).',
    recognitionSignals: [
      'Bốn phương án trả lời là các mạo từ: A, AN, THE hoặc ký hiệu Ø / No article.',
      'Bốn phương án là bộ từ phân biệt: another / other / others / the other / the others.',
      'Chỗ trống đứng ngay trước danh từ đếm được số ít/số nhiều hoặc danh từ riêng chỉ địa danh, nhạc cụ, môn thể thao, phương tiện.'
    ],
    formulas: [
      'A + Danh từ đếm được số ít bắt đầu bằng một PHỤ ÂM (dựa vào PHÁT ÂM)',
      'AN + Danh từ đếm được số ít bắt đầu bằng một NGUYÊN ÂM (/u, e, o, a, i/ theo PHÁT ÂM)',
      'THE + Danh từ xác định | vật duy nhất | so sánh nhất / số thứ tự | nhạc cụ | the + họ(pl)',
      'Ø (Zero article) + N số nhiều/không đếm được chung chung | môn thể thao | bữa ăn | by + xe',
      'Another + N(số ít) | Other + N(số nhiều/không đếm được) | Others = Other + N(pl) (làm đại từ)'
    ],
    detailedSections: [
      {
        heading: '1. Quy tắc sử dụng Mạo từ bất định: A / AN',
        badge: 'A / AN',
        content: 'Dùng trước danh từ đếm được số ít khi đối tượng chưa được xác định hoặc được nhắc đến lần đầu tiên, hoặc dùng khi giới thiệu nghề nghiệp.',
        rules: [
          'Dùng A khi từ đi liền sau bắt đầu bằng một PHỤ ÂM: a book, a cat, a doctor.',
          'Dùng AN khi từ đi liền sau bắt đầu bằng một NGUYÊN ÂM (u, e, o, a, i theo phiên âm quốc tế IPA): an apple, an engineer, an orange, an umbrella.',
          '⚠️ BẪY PHÁT ÂM NGUYÊN ÂM / PHỤ ÂM (Cực kỳ hay ra trong đề thi):',
          '-> Âm "h" câm: Bắt đầu bằng chữ h nhưng h không phát âm, tính là nguyên âm -> dùng AN: an hour (/aʊə/), an honest person (/ˈɒnɪst/), an heir (/eə/), an honor (/ˈɒnə/).',
          '-> Chữ "u" và "e" phát âm là phụ âm bán nguyên âm /juː/ -> dùng A: a university (/ˌjuːnɪˈvɜːsəti/), a uniform, a European (/ˌjʊərəˈpiːən/), a unique style.',
          '-> Chữ "o" phát âm là /wʌn/ -> dùng A: a one-way street, a one-legged man.',
          '-> Tên viết tắt có chữ cái đầu phát âm nguyên âm: an MP3 player (chữ M phát âm là /em/), an SOS, an FBI agent.'
        ]
      },
      {
        heading: '2. Các trường hợp bắt buộc sử dụng THE',
        badge: 'THE',
        content: 'Dùng THE trước danh từ đã xác định (người nghe và người nói đều biết rõ đối tượng đang nói đến).',
        rules: [
          'Đối tượng là duy nhất trong vũ trụ: the Sun, the Moon, the Earth, the sky, the internet, the world.',
          'Trước cấp so sánh nhất và số thứ tự: the tallest building, the most beautiful, the first, the second, the only.',
          'Trước tên nhạc cụ sau động từ "play": play the guitar, play the piano, play the violin (nhưng môn thể thao thì KHÔNG dùng the: play football).',
          'The + Tính từ để chỉ một tập thể/tầng lớp người trong xã hội: the rich (người giàu), the poor (người nghèo), the elderly, the disabled (Động từ chia số nhiều!).',
          'The + Tên họ ở dạng số nhiều để chỉ cả gia đình: the Smiths (gia đình ông Smith).',
          'Trước tên các đại dương, biển, sông, sa mạc, dãy núi số nhiều, quần đảo: the Pacific Ocean, the Nile River, the Sahara, the Alps, the Philippines.',
          'Trước tên quốc gia có chứa các từ "States, Kingdom, Republic" hoặc tận cùng là "-s": the United States (the US), the United Kingdom (the UK), the Netherlands.'
        ]
      },
      {
        heading: '3. Các trường hợp KHÔNG dùng Mạo từ (Zero Article - Ø)',
        badge: 'Zero Article (Ø)',
        content: 'Tuyệt đối không dùng mạo từ trong các trường hợp mang tính chất khái quát hoặc quy ước.',
        rules: [
          'Danh từ số nhiều hoặc danh từ không đếm được mang nghĩa chung chung: Books are our friends; Water boils at 100°C.',
          'Trước tên hầu hết các quốc gia, châu lục, thành phố, ngọn núi đơn lẻ: Vietnam, France, Asia, Tokyo, Mount Everest.',
          'Trước tên các bữa ăn hàng ngày: have breakfast, have lunch, have dinner (trừ khi có tính từ đứng trước: have a delicious dinner).',
          'Trước tên môn thể thao, trò chơi, ngôn ngữ: play soccer, play badminton, speak English, learn French (nhưng: the English language).',
          'Trước phương tiện đi lại đứng sau giới từ "by": by bus, by car, by train, by plane.'
        ]
      },
      {
        heading: '4. Bộ từ hạn định phân biệt: Another, Other, Others, The other, The others',
        badge: 'Bộ từ Hạn định',
        content: 'Đây là dạng bài phân hóa cực kỳ quen thuộc trong bài đọc điền từ (Cloze Test) của đề thi THPTQG.',
        rules: [
          'Another + Danh từ đếm được số ít: Một cái khác / một người khác (không xác định trong nhiều cái). Ví dụ: I need another cup of coffee.',
          'Other + Danh từ số nhiều / Danh từ không đếm được: Những cái khác / người khác. Ví dụ: Other students prefer studying at home.',
          'Others = Other + Danh từ số nhiều: Đóng vai trò làm ĐẠI TỪ đứng độc lập, phía sau TUYỆT ĐỐI KHÔNG CÓ danh từ nào! Ví dụ: Some people like city life; others prefer the countryside.',
          'The other + Danh từ số ít / số nhiều: Cái còn lại / những cái còn lại trong một nhóm đã xác định số lượng cụ thể. (Ví dụ: I have two pens. One is black, the other is blue).',
          'The others: Đóng vai trò làm đại từ thay cho những người/những cái còn lại trong một nhóm xác định.'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng phân biệt: Go to school / hospital / church / prison CÓ THE vs KHÔNG CÓ THE',
      headers: ['Trường hợp', 'Công thức', 'Ý nghĩa bản chất', 'Ví dụ minh họa'],
      rows: [
        ['Đến đúng mục đích chính', 'go to school / hospital / prison / church (KHÔNG CÓ THE)', 'Đến với mục đích học tập, chữa bệnh, thi hành án tù, đi lễ', 'He is ill, so he has to go to hospital. (Anh ấy bị ốm nên phải đi viện chữa bệnh)'],
        ['Đến vì mục đích khác', 'go to THE school / THE hospital / THE prison (BẮT BUỘC CÓ THE)', 'Đến để thăm viếng, giao đồ, đón người, làm việc vãng lai', 'She went to the hospital to visit her sick friend. (Cô ấy đến bệnh viện để thăm bạn)']
      ]
    },
    rules: [
      { label: 'A vs AN', text: 'Dựa vào phát âm: a university, a European; an hour, an honest man, an MP3 player.' },
      { label: 'Dùng THE', text: 'Vật duy nhất (the Sun), so sánh nhất, nhạc cụ (play the guitar), đại dương/dãy núi số nhiều (the Alps), the US.' },
      { label: 'Không dùng THE (Ø)', text: 'Chung chung, bữa ăn (breakfast), môn thể thao (play football), phương tiện (by car).' },
      { label: 'Another / Other / Others', text: 'Another + N(sg); Other + N(pl); Others (đại từ, không đi với N sau nó).' }
    ],
    examples: [
      {
        en: 'Neil Armstrong was the first man to walk on the Moon.',
        vi: 'Neil Armstrong là người đầu tiên đặt chân lên Mặt Trăng.',
        note: 'Dùng "the" trước số thứ tự "first" và trước thiên thể duy nhất trong vũ trụ "Moon".'
      },
      {
        en: 'Some students enjoy working in teams, while others prefer working independently.',
        vi: 'Một số học sinh thích làm việc theo nhóm, trong khi những bạn khác lại thích làm việc độc lập.',
        note: 'Dùng "others" làm đại từ đứng độc lập (thay cho other students), phía sau không có danh từ.'
      },
      {
        en: 'She goes to work by bus every morning, but yesterday she took a taxi.',
        vi: 'Cô ấy đi làm bằng xe buýt mỗi sáng, nhưng hôm qua cô ấy đã đi taxi.',
        note: 'Sau "by" chỉ phương tiện đi lại chung chung không dùng mạo từ (by bus).'
      }
    ],
    examTips: [
      '⚠️ Bẫy A/AN với từ bắt đầu bằng chữ U và E: Đề thi THPTQG rất thích cho từ "university", "European", "uniform", "unique". Nhớ rằng tất cả các từ này phiên âm là /juː/ (phụ âm) nên bắt buộc dùng A, không được dùng AN!',
      '⚠️ Bẫy Others vs Other: Nếu sau chỗ trống CÓ danh từ số nhiều -> chọn OTHER. Nếu sau chỗ trống KHÔNG CÓ danh từ -> chọn OTHERS.',
      '⚠️ Bẫy nhạc cụ vs thể thao: "play the piano" (có The vì là nhạc cụ), nhưng "play football" (môn thể thao thì không có The).'
    ],
    questions: [
      {
        id: 'q2-1',
        question: 'Gary Hall was born in Ohio, and he was _______ excellent swimmer from a young age.',
        options: { A: 'a', B: 'an', C: 'the', D: 'Ø' },
        correctAnswer: 'B',
        explanation: 'Từ "excellent" bắt đầu bằng nguyên âm phát âm /ˈeksələnt/, swimmer là danh từ đếm được số ít nhắc tới lần đầu -> dùng "an".',
        clue: 'excellent swimmer (âm /e/) -> an',
        translation: 'Gary Hall sinh ra ở Ohio và anh ấy là một vận động viên bơi lội xuất sắc từ khi còn nhỏ.'
      },
      {
        id: 'q2-2',
        question: 'They spent the whole weekend playing _______ tennis at the sports club.',
        options: { A: 'a', B: 'an', C: 'the', D: 'Ø' },
        correctAnswer: 'D',
        explanation: 'Trước tên môn thể thao (play tennis, play soccer) KHÔNG dùng mạo từ (Zero article Ø).',
        clue: 'play + tên môn thể thao -> Ø',
        translation: 'Họ đã dành cả ngày cuối tuần để chơi quần vợt tại câu lạc bộ thể thao.'
      },
      {
        id: 'q2-3',
        question: 'She wants to study computer science at _______ university in the United Kingdom.',
        options: { A: 'a', B: 'an', C: 'the', D: 'Ø' },
        correctAnswer: 'A',
        explanation: 'Từ "university" bắt đầu bằng chữ "u" nhưng phát âm là phụ âm /ˌjuːnɪˈvɜːsəti/ -> bắt buộc dùng "a".',
        clue: 'university phiên âm /juː/ -> a',
        translation: 'Cô ấy muốn học khoa học máy tính tại một trường đại học ở Vương quốc Anh.'
      },
      {
        id: 'q2-4',
        question: 'Some volunteers helped clean up the beach, while _______ planted trees in the park.',
        options: { A: 'other', B: 'others', C: 'another', D: 'the other' },
        correctAnswer: 'B',
        explanation: 'Sau chỗ trống không có danh từ, cần một đại từ số nhiều thay thế cho "other volunteers" -> chọn "others".',
        clue: 'Đại từ đứng độc lập không có N phía sau -> others',
        translation: 'Một số tình nguyện viên đã giúp dọn dẹp bãi biển, trong khi những người khác thì trồng cây trong công viên.'
      },
      {
        id: 'q2-5',
        question: 'My father had to stay in _______ hospital for two weeks to recover from his heart surgery.',
        options: { A: 'a', B: 'an', C: 'the', D: 'Ø' },
        correctAnswer: 'D',
        explanation: 'Ở lại bệnh viện với mục đích chính là điều trị bệnh (stay in hospital) -> KHÔNG dùng mạo từ.',
        clue: 'nhập viện chữa bệnh -> in hospital (Ø)',
        translation: 'Bố tôi phải nằm viện hai tuần để hồi phục sau ca phẫu thuật tim.'
      }
    ],
    questionPool: [
      {
        id: 'q2-p1',
        question: 'Mount Everest is _______ highest mountain peak above sea level in the world.',
        options: { A: 'a', B: 'an', C: 'the', D: 'Ø' },
        correctAnswer: 'C',
        explanation: 'Trước cấp so sánh nhất "highest mountain peak" bắt buộc dùng mạo từ "the".',
        clue: 'the + so sánh nhất',
        translation: 'Đỉnh Everest là đỉnh núi cao nhất trên mực nước biển trên thế giới.'
      },
      {
        id: 'q2-p2',
        question: 'I have two brothers; one is an architect and _______ is an environmental engineer.',
        options: { A: 'another', B: 'other', C: 'the other', D: 'others' },
        correctAnswer: 'C',
        explanation: 'Khi có 2 người/vật xác định: One... the other (Một người là... người còn lại là...).',
        clue: 'One... the other (trong 2 người)',
        translation: 'Tôi có hai anh em trai; một người là kiến trúc sư và người còn lại là kỹ sư môi trường.'
      },
      {
        id: 'q2-p3',
        question: 'It took the rescue team more than _______ hour to reach the isolated mountainous village.',
        options: { A: 'a', B: 'an', C: 'the', D: 'Ø' },
        correctAnswer: 'B',
        explanation: 'Từ "hour" có âm h câm (/aʊə/), bắt đầu bằng nguyên âm -> chọn "an hour".',
        clue: 'hour (âm h câm) -> an',
        translation: 'Đội cứu hộ mất hơn một giờ đồng hồ mới đến được ngôi làng miền núi hẻo lánh.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 3: LƯỢNG TỪ (QUANTIFIERS)
  // =========================================================================
  {
    id: 'topic-3',
    topicNumber: 3,
    title: 'Chuyên đề 3: Lượng từ',
    shortTitle: 'Lượng từ',
    englishTitle: 'Quantifiers',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 điểm (1 câu trong bài đọc điền từ hoặc hoàn thành câu) • Cấp độ: Thông hiểu',
    concept: 'Lượng từ là những từ/cụm từ chỉ số lượng đứng trước danh từ. Đề thi THPTQG tập trung kiểm tra khả năng phân biệt danh từ đếm được và không đếm được, và sắc thái biểu cảm tích cực vs tiêu cực.',
    recognitionSignals: [
      'Bốn phương án gồm các cặp lượng từ: many / much, few / a few, little / a little, some / any.',
      'Bộ tứ: most / most of / almost / mostly.',
      'Từ phân phối: each / every / either / neither / none of.'
    ],
    formulas: [
      'Đi với N đếm được số nhiều: many, several, a few, few, both, numerous, a number of',
      'Đi với N không đếm được: much, a little, little, a great deal of, an amount of',
      'Đi với CẢ HAI loại N: some, any, a lot of, lots of, plenty of, all, most, no',
      'Quy tắc vàng: "A few / A little" = có một ít (tích cực); "Few / Little" = hầu như không có (tiêu cực)',
      'Most + N | Most of the/possessive + N | Almost all + N | Mostly (Adv = mainly)'
    ],
    detailedSections: [
      {
        heading: '1. Phân loại Lượng từ theo loại Danh từ',
        badge: 'Phân loại Noun',
        content: 'Bước đầu tiên khi làm câu hỏi lượng từ là xác định danh từ theo sau đếm được hay không đếm được.',
        rules: [
          'Chỉ đi với Danh từ đếm được số nhiều: many, a few, few, several, both, various, numerous, a large number of.',
          'Chỉ đi với Danh từ không đếm được: much, a little, little, a great deal of, a large amount of.',
          'Đi được với cả 2 loại: some, any, a lot of, lots of, plenty of, all, most, half of, no.',
          '⚠️ Danh từ không đếm được thường gặp trong đề: advice (lời khuyên), information (thông tin), news (tin tức), luggage/baggage (hành lý), furniture (đồ đạc), knowledge (kiến thức), equipment (thiết bị), traffic (giao thông).'
        ]
      },
      {
        heading: '2. Phân biệt FEW / A FEW và LITTLE / A LITTLE (Bảng sắc thái)',
        badge: 'Sắc thái nghĩa',
        content: 'Có mạo từ "a" mang nghĩa khẳng định/tích cực (đủ dùng); Không có "a" mang nghĩa phủ định/tiêu cực (thiếu thốn, hầu như không có).',
        bulletPoints: [
          'Few + N(số nhiều): Rất ít, hầu như không có ai/cái gì (mang nghĩa tiêu cực). Ví dụ: He has few friends, so he feels lonely.',
          'A few + N(số nhiều): Một vài, một ít (đủ dùng, mang nghĩa tích cực). Ví dụ: I have a few friends in Hanoi who can help me.',
          'Little + N(không đếm được): Rất ít, gần như không có (tiêu cực). Ví dụ: Hurry up! We have little time left.',
          'A little + N(không đếm được): Có một chút (đủ dùng, tích cực). Ví dụ: Don\'t worry, I have a little money to buy bread.'
        ]
      },
      {
        heading: '3. Bộ tứ kinh điển: Most, Most of, Almost, Mostly',
        badge: 'Bẫy đề thi',
        content: 'Bộ 4 từ này xuất hiện liên tục trong bài đọc điền từ (Cloze Test).',
        bulletPoints: [
          'Most + Danh từ số nhiều / N không đếm được: Hầu hết (mang tính chung chung). Ví dụ: Most students study hard.',
          'Most of + THE / Tính từ sở hữu + Danh từ: Hầu hết trong một nhóm cụ thể. Ví dụ: Most of my students / Most of the books on the shelf.',
          'Almost (Trạng từ = nearly): Gần như. Luôn đi với all, every, no, số từ. Ví dụ: Almost all students; It took almost two hours.',
          'Mostly (Trạng từ = mainly, generally): Chủ yếu là. Ví dụ: The students in this class are mostly from rural areas.'
        ]
      },
      {
        heading: '4. Phân phối từ: Each, Every, Either, Neither, None',
        badge: 'Đại từ phân phối',
        content: 'Quy tắc chia động từ và đối tượng áp dụng:',
        rules: [
          'Each + Danh từ số ít + Động từ số ít: Từng người/từng cá thể riêng rẽ (áp dụng từ 2 đối tượng trở lên).',
          'Every + Danh từ số ít + Động từ số ít: Mọi người/mọi vật (xét theo tổng thể, từ 3 đối tượng trở lên).',
          'Either + Danh từ số ít + Động từ số ít: Một trong hai người/vật.',
          'Neither + Danh từ số ít + Động từ số ít: Cả hai người/vật đều không.',
          'None of + N(số nhiều/không đếm được): Không ai/không cái nào trong số từ 3 đối tượng trở lên.'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng tóm tắt Lượng từ Few vs Little',
      headers: ['Lượng từ', 'Loại Danh từ', 'Sắc thái nghĩa', 'Ví dụ'],
      rows: [
        ['Few', 'Đếm được số nhiều', 'Gần như không có (tiêu cực)', 'He has few opportunities to travel.'],
        ['A few', 'Đếm được số nhiều', 'Có một vài, đủ dùng (tích cực)', 'A few students passed the difficult test.'],
        ['Little', 'Không đếm được', 'Gần như không có (tiêu cực)', 'There is little hope of finding survivors.'],
        ['A little', 'Không đếm được', 'Có một chút, đủ dùng (tích cực)', 'She has a little free time this afternoon.']
      ]
    },
    rules: [
      { label: 'Many vs Much', text: 'Many + N đếm được số nhiều; Much + N không đếm được.' },
      { label: 'Few vs Little', text: 'Few (đếm được, rất ít); Little (không đếm được, rất ít).' },
      { label: 'Most vs Most of', text: 'Most + N; Most of the/possessive + N; Almost all + N.' },
      { label: 'Each vs Every', text: 'Each/Every + N số ít + V số ít.' }
    ],
    examples: [
      {
        en: 'Although the weather was harsh, a few brave climbers managed to reach the summit.',
        vi: 'Mặc dù thời tiết rất khắc nghiệt, một vài nhà leo núi dũng cảm vẫn lên được đỉnh.',
        note: 'Dùng "a few" vì climbers là danh từ đếm được số nhiều và mang sắc thái tích cực (đã thành công).'
      },
      {
        en: 'Most of the information presented in the report was thoroughly verified.',
        vi: 'Hầu hết các thông tin được trình bày trong báo cáo đều đã được xác minh kỹ lưỡng.',
        note: 'Dùng "Most of the" vì information là danh từ không đếm được và có mạo từ xác định "the".'
      }
    ],
    examTips: [
      '⚠️ Tuyệt đối không chọn: "Almost students" -> SAI! Phải là "Almost ALL students" hoặc "MOST students".',
      '⚠️ Sau "Most of" BẮT BUỘC phải có "the", "this/that/these/those" hoặc tính từ sở hữu (my, his, their...). Không bao giờ có cấu trúc "Most of students".'
    ],
    questions: [
      {
        id: 'q3-1',
        question: 'Because he was shy and introverted, he had _______ friends during his high school years.',
        options: { A: 'few', B: 'a few', C: 'little', D: 'a little' },
        correctAnswer: 'A',
        explanation: 'Friends là danh từ đếm được số nhiều. Ngữ cảnh "nhút nhát, hướng nội" mang sắc thái tiêu cực (hầu như không có bạn bè) -> chọn "few".',
        clue: 'shy and introverted -> sắc thái tiêu cực (few)',
        translation: 'Vì nhút nhát và hướng nội, anh ấy hầu như không có bạn bè trong suốt những năm cấp ba.'
      },
      {
        id: 'q3-2',
        question: 'We still have _______ time left before the train departs, so we can grab a coffee.',
        options: { A: 'few', B: 'a few', C: 'little', D: 'a little' },
        correctAnswer: 'D',
        explanation: 'Time (thời gian) là danh từ không đếm được. Ngữ cảnh "có thể đi uống cà phê" mang nghĩa tích cực (còn một chút thời gian) -> chọn "a little".',
        clue: 'time (không đếm được) + tích cực -> a little',
        translation: 'Chúng ta vẫn còn một chút thời gian trước khi tàu khởi hành, vì vậy chúng ta có thể uống một cốc cà phê.'
      },
      {
        id: 'q3-3',
        question: '_______ the students in this international school can speak at least two languages fluently.',
        options: { A: 'Almost', B: 'Most of', C: 'Most', D: 'Mostly' },
        correctAnswer: 'B',
        explanation: 'Trước cụm "the students" (có mạo từ the) bắt buộc phải dùng "Most of".',
        clue: 'Most of + the + N',
        translation: 'Hầu hết học sinh ở trường quốc tế này đều có thể nói lưu loát ít nhất hai ngôn ngữ.'
      },
      {
        id: 'q3-4',
        question: 'Could you give me _______ advice on how to prepare for the university entrance exam?',
        options: { A: 'an', B: 'some', C: 'many', D: 'a few' },
        correctAnswer: 'B',
        explanation: 'Advice là danh từ không đếm được -> không đi với "an", "many", "a few". Chọn "some" trong câu đề nghị lịch sự.',
        clue: 'advice (danh từ không đếm được) -> some',
        translation: 'Bạn có thể cho tôi một vài lời khuyên về cách chuẩn bị cho kỳ thi tuyển sinh đại học không?'
      },
      {
        id: 'q3-5',
        question: 'The committee members discussed the matter for hours, but _______ of them agreed with the proposal.',
        options: { A: 'neither', B: 'none', C: 'no', D: 'either' },
        correctAnswer: 'B',
        explanation: 'Committee members (nhiều thành viên > 2 người) và có giới từ "of" -> dùng "none of" (không ai trong số họ). "Neither" chỉ dùng cho 2 người.',
        clue: 'none of + N(số nhiều từ 3 trở lên)',
        translation: 'Các thành viên ủy ban đã thảo luận vấn đề trong nhiều giờ, nhưng không ai trong số họ đồng ý với đề xuất này.'
      }
    ],
    questionPool: [
      {
        id: 'q3-p1',
        question: 'There is _______ milk left in the fridge, so please buy some on your way home.',
        options: { A: 'a little', B: 'little', C: 'few', D: 'a few' },
        correctAnswer: 'B',
        explanation: 'Milk là danh từ không đếm được. Ngữ cảnh "hãy mua thêm trên đường về" chứng tỏ trong tủ gần như đã hết sữa (tiêu cực) -> chọn "little".',
        clue: 'cần mua thêm -> gần hết sữa -> little',
        translation: 'Trong tủ lạnh gần như không còn sữa, vì vậy hãy mua một ít trên đường về nhà nhé.'
      },
      {
        id: 'q3-p2',
        question: '_______ all the tickets for the final match had been sold out within thirty minutes.',
        options: { A: 'Most', B: 'Almost', C: 'Mostly', D: 'Much' },
        correctAnswer: 'B',
        explanation: 'Đứng trước "all the tickets" bổ nghĩa cho all chỉ có trạng từ "Almost" (Almost all = gần như tất cả).',
        clue: 'Almost all + N',
        translation: 'Gần như tất cả vé cho trận chung kết đã được bán hết chỉ trong vòng ba mươi phút.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 4: DANH ĐỘNG TỪ VÀ ĐỘNG TỪ NGUYÊN MẪU (GERUND & INFINITIVE)
  // =========================================================================
  {
    id: 'topic-4',
    topicNumber: 4,
    title: 'Chuyên đề 4: V-ing V-to',
    shortTitle: 'V-ing & To-V',
    englishTitle: 'Gerunds & Infinitives',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 - 0.4 điểm (1 - 2 câu trong đề thi THPTQG) • Cấp độ: Nhận biết & Vận dụng',
    concept: 'Quy tắc chọn Danh động từ (V-ing) hay Động từ nguyên mẫu có to (To-V) sau các động từ, tính từ và cụm thành ngữ cố định; đặc biệt là nhóm động từ thay đổi nghĩa tùy thuộc theo sau là V-ing hay To-V.',
    recognitionSignals: [
      'Sau một động từ chính trong câu, chỗ trống yêu cầu chọn dạng thức của động từ thứ hai (V-ing, To-V, V-bare, having V3).',
      'Sau giới từ (in, on, at, about, with, without, of, for...) luôn luôn là V-ing.',
      'Xuất hiện các động từ thay đổi nghĩa kinh điển: remember, forget, regret, stop, try, mean, need.'
    ],
    formulas: [
      'S + Verb + V-ING (admit, avoid, consider, deny, enjoy, postpone, suggest...)',
      'S + Verb + TO-V (agree, decide, hope, manage, promise, refuse, tend...)',
      'S + Verb + Tân ngữ (O) + TO-V (advise, allow, encourage, invite, remind, tell...)',
      'Giới từ + V-ING: Preposition (in/on/at/by/with...) + V-ing',
      'Đổi nghĩa: Remember/Forget/Regret + To-V (chưa làm/tương lai) vs V-ing (đã làm trong quá khứ)'
    ],
    detailedSections: [
      {
        heading: '1. Nhóm động từ luôn theo sau bởi V-ing (Gerund)',
        badge: 'Verb + V-ing',
        content: 'Những động từ diễn tả hành động đang tiếp diễn, đã xảy ra, hoặc thái độ trì hoãn, tránh né.',
        bulletPoints: [
          'Thừa nhận / Phủ nhận: admit (thừa nhận), deny (phủ nhận).',
          'Tránh né / Trì hoãn: avoid (tránh), delay (trì hoãn), postpone (hoãn lại), quit (từ bỏ), risk (liều lĩnh).',
          'Tận hưởng / Cân nhắc: enjoy (thích), consider (cân nhắc), fancy, practice (luyện tập), suggest (gợi ý), imagine (tưởng tượng), appreciate (đánh giá cao).',
          'Cụm từ cố định bất hủ đi với V-ing trong đề thi:',
          '-> can\'t help / can\'t stand / can\'t bear + V-ing (không thể nhịn được / không thể chịu nổi)',
          '-> It\'s no use / It\'s no good + V-ing (vô ích khi làm gì)',
          '-> be/get used to + V-ing (quen với việc làm gì)',
          '-> look forward to + V-ing (trông đợi điều gì)',
          '-> spend time/money (on) + V-ing (dành thời gian/tiền bạc làm gì)',
          '-> have difficulty / trouble (in) + V-ing (gặp khó khăn khi làm gì)'
        ]
      },
      {
        heading: '2. Nhóm động từ luôn theo sau bởi To-V (Infinitive)',
        badge: 'Verb + To-V',
        content: 'Những động từ thể hiện ý định, mong muốn, quyết định hoặc mục tiêu trong tương lai.',
        bulletPoints: [
          'Ý định / Kế hoạch: decide (quyết định), intend (dự định), plan (lên kế hoạch), arrange (sắp xếp).',
          'Mong muốn / Kỳ vọng: hope (hy vọng), expect (kỳ vọng), want, wish, promise (hứa), offer (đề nghị).',
          'Thuyết phục / Nỗ lực: agree (đồng ý), refuse (từ chối), manage (xoay xở được), fail (thất bại), attempt (nỗ lực), afford (đủ khả năng chi trả), tend (có xu hướng).'
        ]
      },
      {
        heading: '3. Cấu trúc S + V + O + To-V và Quy tắc Lược bỏ Tân ngữ',
        badge: 'V + O + To-V',
        content: 'Nhiều động từ khi có tân ngữ thì đi với To-V, nhưng khi KHÔNG CÓ tân ngữ thì lại đi với V-ing.',
        formula: 'advise / allow / permit / recommend + O + TO-V  <--->  advise / allow / permit / recommend + V-ING (khi không có O)',
        rules: [
          'Ví dụ có O: The teacher allows US TO USE calculators in the exam.',
          'Ví dụ không có O: The teacher does not allow USING calculators in the exam.',
          'Các động từ khác luôn đi với O + To-V: encourage sb to V, force sb to V, invite sb to V, remind sb to V, warn sb (not) to V.'
        ]
      },
      {
        heading: '4. BẢNG VÀNG: Các động từ đổi nghĩa khi đi với V-ing vs To-V',
        badge: 'Đổi nghĩa 9+',
        content: 'Đây là dạng câu hỏi bẫy phân hóa điểm số cao trong đề thi THPTQG.',
        rules: [
          'REMEMBER: Remember + To-V (Nhớ phải làm gì trong tương lai) <---> Remember + V-ing (Nhớ là đã làm gì trong quá khứ).',
          'FORGET: Forget + To-V (Quên phải làm gì) <---> Forget + V-ing (Quên mất là đã từng làm gì).',
          'REGRET: Regret + To-V (Lấy làm tiếc phải thông báo điều gì) <---> Regret + V-ing (Hối hận vì đã làm gì trong quá khứ).',
          'STOP: Stop + To-V (Dừng lại để làm một việc khác) <---> Stop + V-ing (Dừng hẳn một thói quen/hành động đang làm).',
          'TRY: Try + To-V (Cố gắng hết sức để làm gì) <---> Try + V-ing (Thử làm một cách xem có hiệu quả không).',
          'NEED: S(người) + need + To-V (Chủ động: ai cần làm gì) <---> S(vật) + need + V-ing / to be PII (Bị động: cái gì cần được sửa/bảo trì).'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng đối chiếu Động từ thay đổi nghĩa V-ing vs To-V',
      headers: ['Động từ', 'Cấu trúc với TO-V', 'Cấu trúc với V-ING'],
      rows: [
        ['Stop', 'Stop to V: Dừng lại để làm việc khác\n(He stopped to drink some water)', 'Stop V-ing: Dừng hẳn hành động đang làm\n(He stopped smoking two years ago)'],
        ['Remember', 'Remember to V: Nhớ phải làm gì\n(Remember to turn off the lights)', 'Remember V-ing: Nhớ đã làm gì trong quá khứ\n(I remember meeting her in Paris)'],
        ['Try', 'Try to V: Cố gắng, nỗ lực làm gì\n(She tried to pass the entrance exam)', 'Try V-ing: Thử nghiệm một phương pháp mới\n(Try drinking warm milk to sleep better)'],
        ['Need', 'S(người) need to V: Chủ động cần làm\n(I need to wash the dirty car)', 'S(vật) need V-ing (= to be PII): Bị động\n(The car needs washing / to be washed)']
      ]
    },
    rules: [
      { label: 'Verb + V-ing', text: 'admit, avoid, consider, deny, enjoy, postpone, practice, suggest, can\'t help, look forward to.' },
      { label: 'Verb + To-V', text: 'agree, decide, hope, manage, refuse, promise, plan, afford, attempt, tend.' },
      { label: 'Có O vs Không O', text: 'allow/advise + O + to V; nhưng allow/advise + V-ing (khi không có O).' },
      { label: 'Đổi nghĩa', text: 'Remember/Forget/Regret/Stop/Try/Need thay đổi hoàn toàn ngữ nghĩa theo sau.' }
    ],
    examples: [
      {
        en: 'Please remember to lock the front door before going to bed.',
        vi: 'Hãy nhớ khóa cửa trước trước khi đi ngủ nhé.',
        note: 'Remember + To-V: Nhớ phải làm một nhiệm vụ trong tương lai.'
      },
      {
        en: 'I clearly remember locking the door, but when I came home, it was open.',
        vi: 'Tôi nhớ rất rõ là mình đã khóa cửa rồi, nhưng khi về nhà thì cửa lại mở.',
        note: 'Remember + V-ing: Nhớ một hành động đã diễn ra trong quá khứ.'
      },
      {
        en: 'The ceiling in the old living room urgently needs repairing.',
        vi: 'Trần nhà trong phòng khách cũ đang rất cần được sửa chữa gấp.',
        note: 'Need + V-ing mang nghĩa bị động (= needs to be repaired) vì chủ ngữ là vật (the ceiling).'
      }
    ],
    examTips: [
      '⚠️ Bẫy "look forward to + V-ing": Từ "to" ở đây là GIỚI TỪ, không phải to-infinitive! Vì vậy bắt buộc dùng V-ing (look forward to hearing from you, KHÔNG PHẢI hear).',
      '⚠️ Cụm "be used to + V-ing" (quen với việc gì) khác hoàn toàn với "used to + V-bare" (đã từng làm gì trong quá khứ nay không làm nữa).'
    ],
    questions: [
      {
        id: 'q4-1',
        question: 'The government decided _______ stricter regulations to curb industrial carbon emissions.',
        options: { A: 'enact', B: 'to enact', C: 'enacting', D: 'enacted' },
        correctAnswer: 'B',
        explanation: 'Động từ "decide" luôn đi với "to-infinitive" (decide to do sth: quyết định làm gì) -> chọn "to enact".',
        clue: 'decide + To-V',
        translation: 'Chính phủ đã quyết định ban hành các quy định nghiêm ngặt hơn nhằm hạn chế lượng khí thải carbon công nghiệp.'
      },
      {
        id: 'q4-2',
        question: 'He admitted _______ sensitive company data to an unauthorized third party.',
        options: { A: 'leak', B: 'to leak', C: 'leaking', D: 'leaked' },
        correctAnswer: 'C',
        explanation: 'Động từ "admit" luôn theo sau bởi Danh động từ V-ing (admit doing sth: thừa nhận đã làm gì) -> chọn "leaking".',
        clue: 'admit + V-ing',
        translation: 'Anh ta đã thừa nhận việc làm rò rỉ dữ liệu nhạy cảm của công ty cho một bên thứ ba trái phép.'
      },
      {
        id: 'q4-3',
        question: 'The school library does not allow _______ loud conversations or eating inside.',
        options: { A: 'have', B: 'to have', C: 'having', D: 'had' },
        correctAnswer: 'C',
        explanation: 'Động từ "allow" khi KHÔNG CÓ tân ngữ chỉ người đi sau thì bắt buộc đi với V-ing (allow + V-ing) -> chọn "having".',
        clue: 'allow + V-ing (không có O)',
        translation: 'Thư viện nhà trường không cho phép trò chuyện ồn ào hoặc ăn uống bên trong.'
      },
      {
        id: 'q4-4',
        question: 'I will never forget _______ the breathtaking sunrise on the peak of Mount Fansipan.',
        options: { A: 'watch', B: 'watching', C: 'to watch', D: 'watched' },
        correctAnswer: 'B',
        explanation: 'Hành động ngắm bình minh đã diễn ra trong quá khứ; "forget + V-ing" nghĩa là quên một kỷ niệm đã xảy ra -> chọn "watching".',
        clue: 'forget + V-ing (kỷ niệm quá khứ)',
        translation: 'Tôi sẽ không bao giờ quên được khoảnh khắc ngắm nhìn bình minh tuyệt đẹp trên đỉnh Fansipan.'
      },
      {
        id: 'q4-5',
        question: 'These old historical documents need _______ with special chemical preservatives.',
        options: { A: 'treat', B: 'treating', C: 'to treat', D: 'treated' },
        correctAnswer: 'B',
        explanation: 'Chủ ngữ "These old historical documents" là danh từ chỉ vật; "need + V-ing" mang nghĩa bị động (= need to be treated) -> chọn "treating".',
        clue: 'S(vật) + need + V-ing (bị động)',
        translation: 'Những tài liệu lịch sử cũ này cần được xử lý bằng các hóa chất bảo quản đặc biệt.'
      }
    ],
    questionPool: [
      {
        id: 'q4-p1',
        question: 'We are really looking forward to _______ from your scholarship committee soon.',
        options: { A: 'hear', B: 'hearing', C: 'to hear', D: 'heard' },
        correctAnswer: 'B',
        explanation: 'Cụm từ "look forward to" có "to" là giới từ, bắt buộc đi với V-ing -> chọn "hearing".',
        clue: 'look forward to + V-ing',
        translation: 'Chúng tôi rất mong sớm nhận được tin từ hội đồng học bổng của bạn.'
      },
      {
        id: 'q4-p2',
        question: 'After driving continuously for four hours, the driver stopped _______ a quick lunch.',
        options: { A: 'have', B: 'having', C: 'to have', D: 'had' },
        correctAnswer: 'C',
        explanation: 'Người tài xế dừng xe lại ĐỂ ăn trưa (mục đích hành động mới) -> dùng "stop to have".',
        clue: 'stop + To-V (dừng lại để làm việc khác)',
        translation: 'Sau khi lái xe liên tục suốt bốn tiếng, người tài xế dừng lại để ăn bữa trưa nhanh.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 5: CẤP SO SÁNH (COMPARISONS)
  // =========================================================================
  {
    id: 'topic-5',
    topicNumber: 5,
    title: 'Chuyên đề 5: So sánh',
    shortTitle: 'Cấp so sánh',
    englishTitle: 'Comparisons',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 điểm (1 câu chắc chắn trong đề thi THPTQG) • Cấp độ: Nhận biết & Thông hiểu',
    concept: 'Hệ thống các cấu trúc so sánh bằng, so sánh hơn, so sánh nhất, so sánh bội số và đặc biệt là CẤU TRÚC SO SÁNH KÉP (Càng... càng...) - dạng câu hỏi Bộ GD&ĐT rất ưa thích.',
    recognitionSignals: [
      'Xuất hiện từ "than" -> chắc chắn là So sánh hơn.',
      'Xuất hiện "as... as" hoặc "the same as" -> So sánh bằng.',
      'Có mạo từ "the" trước chỗ trống và phạm vi so sánh trong một tập thể (in/of) -> So sánh nhất.',
      'Hai vế câu bắt đầu bằng "The + comparative..., the + comparative..." -> Cấu trúc So sánh kép.'
    ],
    formulas: [
      'So sánh bằng: S1 + V + as + Adj/Adv + as + S2  |  not as / not so + Adj/Adv + as',
      'So sánh hơn: S1 + V + Adj/Adv-er + THAN + S2  |  MORE + Adj/Adv + THAN + S2',
      'So sánh nhất: S + V + THE + Adj/Adv-est (+ N)  |  THE MOST + Adj/Adv (+ N)',
      'SO SÁNH KÉP: The + comparative + S1 + V1, the + comparative + S2 + V2',
      'So sánh bội số: S + V + multiple (twice / three times) + AS + much/many + AS + N'
    ],
    detailedSections: [
      {
        heading: '1. Phân biệt Tính từ / Trạng từ Ngắn và Dài',
        badge: 'Ngắn vs Dài',
        content: 'Quy tắc xác định dạng ngắn hay dài để áp dụng thêm đuôi -er/-est hay dùng more/the most.',
        rules: [
          'Tính từ/Trạng từ ngắn: Có 1 âm tiết (tall, short, fast, big).',
          'Tính từ 2 âm tiết nhưng tận cùng bằng: -y, -le, -ow, -er, -et vẫn được xem là tính từ ngắn -> thêm -er/-est: happy -> happier -> happiest; simple -> simpler; narrow -> narrower; clever -> cleverer; quiet -> quieter.',
          'Tính từ/Trạng từ dài: Có từ 2 âm tiết trở lên (expensive, intelligent, carefully, beautiful).'
        ]
      },
      {
        heading: '2. Cấu trúc So sánh kép (Double Comparative) - TRỌNG TÂM ĐỀ THI',
        badge: 'Dạng ra thi 100%',
        content: 'Có 2 dạng so sánh kép, trong đó dạng 2 vế xuất hiện liên tục trong đề thi THPTQG:',
        formula: 'The + comparative + S1 + V1, the + comparative + S2 + V2 (Càng... thì càng...)',
        rules: [
          'Dạng 1 (Càng ngày càng trong 1 mệnh đề): Ngắn: adj-er and adj-er (hotter and hotter); Dài: more and more + adj (more and more expensive).',
          'Dạng 2 (Càng... thì càng...):',
          '-> Ngắn: The higher you climb, the colder it gets.',
          '-> Dài: The more carefully you drive, the safer you will be.',
          '-> Kết hợp Danh từ: The more books you read, the more knowledge you acquire.',
          '⚠️ BẪY ĐỀ THI: Đáp án sai thường thiếu chữ "the" ở một vế, hoặc dùng so sánh nhất ("the most"), hoặc đảo trật tự từ S - V.'
        ]
      },
      {
        heading: '3. Từ nhấn mạnh trong So sánh hơn và So sánh nhất',
        badge: 'Từ bổ trợ nhấn mạnh',
        content: 'Để tăng mức độ khác biệt trong câu so sánh:',
        rules: [
          'Nhấn mạnh so sánh hơn: dùng MUCH, FAR, A LOT, EVEN, A LITTLE, SLIGHTLY đứng trước so sánh hơn (Ví dụ: It is MUCH more expensive than that one; Today is FAR colder than yesterday).',
          'Nhấn mạnh so sánh nhất: dùng BY FAR, EASILY (Ví dụ: She is BY FAR the best student in our class).'
        ]
      },
      {
        heading: '4. Bảng tính từ / trạng từ so sánh Bất quy tắc',
        badge: 'Bất quy tắc',
        content: 'Những từ không thêm -er/-est mà biến đổi hoàn toàn hình thức:',
        rules: [
          'good / well -> better -> the best',
          'bad / badly -> worse -> the worst',
          'many / much -> more -> the most',
          'little -> less -> the least',
          'far -> farther (chỉ khoảng cách địa lý cụ thể) / further (khoảng cách & mức độ sâu xa hơn) -> farthest / furthest',
          'old -> older / elder (chỉ thứ bậc anh chị em trong gia đình: elder brother) -> oldest / eldest'
        ]
      }
    ],
    comparisonTable: {
      title: 'Bảng tổng hợp 3 cấp so sánh cốt lõi',
      headers: ['Cấp so sánh', 'Tính từ / Trạng từ Ngắn', 'Tính từ / Trạng từ Dài', 'Từ dấu hiệu'],
      rows: [
        ['So sánh bằng', 'as + short adj + as', 'as + long adj + as', 'as... as, the same as'],
        ['So sánh hơn', 'short adj-er + THAN', 'MORE + long adj + THAN', 'than, much, far'],
        ['So sánh nhất', 'THE + short adj-est', 'THE MOST + long adj', 'the, in the world, of all'],
        ['So sánh kép', 'The + short-er + S + V', 'The MORE + long adj + S + V', 'The..., the...']
      ]
    },
    rules: [
      { label: 'So sánh hơn', text: 'Ngắn thêm -er than; Dài dùng more + adj than. Nhấn mạnh dùng much/far.' },
      { label: 'So sánh nhất', text: 'The + short-est / the most + long adj.' },
      { label: 'So sánh kép', text: 'The + comparative + S1 + V1, the + comparative + S2 + V2 (Càng... càng...).' },
      { label: 'Bất quy tắc', text: 'good -> better; bad -> worse; far -> farther/further; little -> less.' }
    ],
    examples: [
      {
        en: 'The more renewable energy we generate, the less dependent we become on fossil fuels.',
        vi: 'Chúng ta càng tạo ra nhiều năng lượng tái tạo thì chúng ta càng ít bị phụ thuộc vào nhiên liệu hóa thạch.',
        note: 'Cấu trúc so sánh kép: The more + N... the less + Adj...'
      },
      {
        en: 'Electric cars are becoming much more affordable for ordinary middle-class families.',
        vi: 'Xe điện đang trở nên hợp túi tiền hơn rất nhiều đối với các gia đình trung lưu bình thường.',
        note: 'Dùng "much" đứng trước so sánh hơn "more affordable" để nhấn mạnh mức độ.'
      }
    ],
    examTips: [
      '⚠️ Mẹo làm nhanh câu So sánh kép: Nhìn thấy đầu câu có "The + so sánh hơn..." thì vế thứ 2 BẮT BUỘC phải bắt đầu bằng "The + so sánh hơn...". Loại ngay các đáp án không có chữ "The" hoặc dùng "The most".',
      '⚠️ Bẫy So sánh bội số: S + V + twice / three times + AS much/many + AS... Tuyệt đối KHÔNG ĐƯỢC dùng "twice more than"!'
    ],
    questions: [
      {
        id: 'q5-1',
        question: 'The harder the team practiced for the tournament, _______ they performed on match day.',
        options: { A: 'better', B: 'the best', C: 'the better', D: 'more better' },
        correctAnswer: 'C',
        explanation: 'Cấu trúc so sánh kép "The + comparative..., the + comparative...". Vế trước là "The harder", vế sau bắt buộc là "the better" (so sánh hơn của good/well).',
        clue: 'The harder..., the better...',
        translation: 'Đội bóng càng tập luyện chăm chỉ cho giải đấu thì họ thi đấu càng tốt hơn vào ngày diễn ra trận đấu.'
      },
      {
        id: 'q5-2',
        question: 'Living in a metropolitan city is _______ more stressful than residing in a quiet countryside.',
        options: { A: 'very', B: 'far', C: 'so', D: 'too' },
        correctAnswer: 'B',
        explanation: 'Đứng trước cấp so sánh hơn "more stressful" để nhấn mạnh mức độ ta dùng "far" hoặc "much". Các từ "very, so, too" không đi với so sánh hơn.',
        clue: 'far / much + so sánh hơn',
        translation: 'Sống ở một thành phố đô thị lớn thì căng thẳng hơn nhiều so với việc cư trú ở một vùng quê yên tĩnh.'
      },
      {
        id: 'q5-3',
        question: 'This modern laptop model is twice as expensive _______ the one I purchased two years ago.',
        options: { A: 'than', B: 'as', C: 'to', D: 'like' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc so sánh bội số: twice + as + adj + as -> chọn "as".',
        clue: 'twice as + adj + as',
        translation: 'Mẫu máy tính xách tay hiện đại này đắt gấp đôi chiếc tôi đã mua cách đây hai năm.'
      },
      {
        id: 'q5-4',
        question: 'Among all the candidates interviewed today, Sophia was by far _______ qualified for the managerial position.',
        options: { A: 'more', B: 'most', C: 'the most', D: 'much more' },
        correctAnswer: 'C',
        explanation: 'Sau cụm nhấn mạnh "by far" và trong phạm vi "Among all the candidates" bắt buộc là cấp so sánh nhất -> chọn "the most".',
        clue: 'by far + the most (so sánh nhất)',
        translation: 'Trong số tất cả các ứng viên được phỏng vấn hôm nay, Sophia vượt trội là người đủ năng lực nhất cho vị trí quản lý.'
      },
      {
        id: 'q5-5',
        question: 'The cost of living in urban areas is becoming _______ due to inflation.',
        options: { A: 'high and high', B: 'higher and higher', C: 'more and more high', D: 'highest and highest' },
        correctAnswer: 'B',
        explanation: 'So sánh kép lũy tiến đối với tính từ ngắn "high": short adj-er and short adj-er -> chọn "higher and higher" (ngày càng cao hơn).',
        clue: 'higher and higher (ngày càng cao)',
        translation: 'Chi phí sinh hoạt ở các khu vực đô thị đang ngày càng cao hơn do lạm phát.'
      }
    ],
    questionPool: [
      {
        id: 'q5-p1',
        question: 'The more clearly the teacher explained the complex theory, _______ the students understood it.',
        options: { A: 'the easier', B: 'more easily', C: 'the more easily', D: 'easier' },
        correctAnswer: 'C',
        explanation: 'Vế trước "The more clearly", vế sau bổ nghĩa cho động từ "understood" cần trạng từ so sánh hơn "the more easily".',
        clue: 'The + so sánh hơn trạng từ',
        translation: 'Giáo viên giải thích lý thuyết phức tạp càng rõ ràng thì học sinh càng hiểu nó dễ dàng hơn.'
      }
    ]
  },

  // =========================================================================
  // CHUYÊN ĐỀ 6: GIỚI TỪ (PREPOSITIONS)
  // =========================================================================
  {
    id: 'topic-6',
    topicNumber: 6,
    title: 'Chuyên đề 6: Giới từ',
    shortTitle: 'Giới từ',
    englishTitle: 'Prepositions',
    difficulty: 'Trọng tâm',
    examWeight: 'Chiếm 0.2 - 0.4 điểm (1 - 2 câu trong đề thi THPTQG) • Cấp độ: Nhận biết & Ghi nhớ',
    concept: 'Giới từ chỉ thời gian (In, On, At), giới từ chỉ nơi chốn, và đặc biệt là hệ thống GIỚI TỪ ĐI KÈM TÍNH TỪ / ĐỘNG TỪ CỐ ĐỊNH - dạng kiến thức đòi hỏi học sinh phải nắm chắc các cụm từ chuẩn.',
    recognitionSignals: [
      'Chỗ trống đứng ngay sau một Tính từ (good, interested, keen, responsible, proud...).',
      'Chỗ trống đứng ngay sau một Động từ (rely, depend, apologize, suffer, insist...).',
      'Chỗ trống đứng trước mốc thời gian, ngày tháng năm, hoặc vị trí không gian.'
    ],
    formulas: [
      'Thời gian: AT (giờ, thời điểm chính xác) | ON (ngày, thứ) | IN (tháng, năm, mùa, thế kỷ)',
      'Nơi chốn: AT (địa chỉ cụ thể, địa điểm) | ON (bề mặt, đường phố) | IN (không gian kín, thành phố/quốc gia)',
      'Adj + Preposition: fond of, proud of, keen on, good at, capable of, responsible for',
      'Verb + Preposition: depend on, succeed in, apologize for, prevent from, contribute to'
    ],
    detailedSections: [
      {
        heading: '1. Tam giác Giới từ Thời gian: AT - ON - IN',
        badge: 'Thời gian',
        content: 'Quy tắc từ cụ thể hẹp nhất đến rộng lớn nhất:',
        bulletPoints: [
          'AT (Thời điểm chính xác nhất): giờ giấc (at 7:30 am), thời điểm trong ngày (at noon, at midnight, at dawn), dịp lễ tết kéo dài (at Christmas, at Easter), cụm cố định (at night, at the weekend, at present, at the moment).',
          'ON (Ngày & Thứ): các thứ trong tuần (on Monday, on Friday), ngày tháng cụ thể (on October 5th, on 1st May), ngày lễ cụ thể (on Christmas Day, on New Year\'s Eve), buổi của một ngày cụ thể (on Sunday morning).',
          'IN (Khoảng thời gian rộng hơn): tháng (in July), năm (in 2026), mùa (in summer), thế kỷ (in the 21st century), các buổi trong ngày (in the morning, in the afternoon), khoảng thời gian trong tương lai (in 10 minutes = trong 10 phút nữa).'
        ]
      },
      {
        heading: '2. Tam giác Giới từ Nơi chốn: AT - ON - IN',
        badge: 'Nơi chốn',
        content: 'Quy tắc định vị không gian:',
        bulletPoints: [
          'AT (Địa điểm cụ thể, số nhà): at 120 Tran Phu Street, at home, at school, at work, at the station, at the airport.',
          'ON (Bề mặt phẳng, tên đường, tầng lầu): on the table, on the wall, on Le Loi Street, on the 3rd floor, on the internet; phương tiện công cộng lớn: on the bus, on the train, on the plane.',
          'IN (Không gian kín có giới hạn, thành phố, quốc gia): in the room, in the box, in Hanoi, in Vietnam; phương tiện xe nhỏ kín: in a car, in a taxi.'
        ]
      },
      {
        heading: '3. Bảng Vàng Cụm Tính từ đi kèm Giới từ bất hủ trong đề thi',
        badge: 'Adj + Prep',
        content: 'Những cụm từ Bộ GD&ĐT thường xuyên đưa vào đề thi THPTQG:',
        bulletPoints: [
          'Đi với OF: fond of (thích), proud of (tự hào), ashamed of (xấu hổ), aware of (nhận thức), capable of (có khả năng), full of (đầy), independent of (độc lập).',
          'Đi với ON: keen on (say mê), dependent on (phụ thuộc), based on (dựa trên), focused on (tập trung).',
          'Đi với IN: interested in (thích thú), involved in (tham gia vào), successful in (thành công trong), rich in (giàu về).',
          'Đi với AT: good at (giỏi về), bad at (dốt về), brilliant at, surprised at (ngạc nhiên), shocked at.',
          'Đi với FOR: famous for (nổi tiếng vì), responsible for (chịu trách nhiệm về), suitable for (phù hợp), late for, apologize for.',
          'Đi với FROM: different from (khác biệt với), absent from (vắng mặt), safe from (an toàn khỏi), protect from.',
          'Đi với TO: similar to (tương tự), married to (kết hôn với), addicted to (nghiện), dedicated to (cống hiến cho).'
        ]
      }
    ],
    rules: [
      { label: 'Thời gian', text: 'At (giờ/thời điểm); On (ngày/thứ); In (tháng/năm/mùa/thế kỷ).' },
      { label: 'Nơi chốn', text: 'At (số nhà/địa điểm); On (bề mặt/tên đường); In (không gian kín/thành phố/quốc gia).' },
      { label: 'Tính từ + Prep', text: 'fond/proud of; keen/dependent on; interested/rich in; good/bad at; famous/responsible for.' }
    ],
    examples: [
      {
        en: 'The local community is highly capable of managing renewable energy resources.',
        vi: 'Cộng đồng địa phương có năng lực cao trong việc quản lý các nguồn năng lượng tái tạo.',
        note: 'Cụm tính từ cố định: capable of + V-ing/Noun (có năng lực làm gì).'
      },
      {
        en: 'The decisive international conference will take place on Friday morning, in July.',
        vi: 'Hội nghị quốc tế mang tính quyết định sẽ diễn ra vào sáng thứ Sáu, trong tháng Bảy.',
        note: 'Dùng "on" trước buổi của một ngày cụ thể (on Friday morning) và "in" trước tháng (in July).'
      }
    ],
    examTips: [
      '⚠️ Cực kỳ chú ý: "married TO sb" (kết hôn với ai), KHÔNG ĐƯỢC dùng "married with"!',
      '⚠️ "good AT English" (giỏi môn gì), nhưng "good FOR health" (tốt cho sức khỏe).',
      '⚠️ "independent OF" (độc lập, không lệ thuộc), nhưng "depend ON" (phụ thuộc vào).'
    ],
    questions: [
      {
        id: 'q6-1',
        question: 'The young scientist is capable _______ conducting complex experiments independently.',
        options: { A: 'in', B: 'at', C: 'of', D: 'with' },
        correctAnswer: 'C',
        explanation: 'Cấu trúc cố định: "capable of + V-ing/N" (có năng lực, khả năng làm gì) -> chọn "of".',
        clue: 'capable of',
        translation: 'Nhà khoa học trẻ có năng lực tiến hành các thí nghiệm phức tạp một cách độc lập.'
      },
      {
        id: 'q6-2',
        question: 'She is extremely keen _______ learning foreign languages and studying international cultures.',
        options: { A: 'on', B: 'in', C: 'at', D: 'about' },
        correctAnswer: 'A',
        explanation: 'Cấu trúc cố định: "keen on + V-ing/N" (say mê, yêu thích việc gì) -> chọn "on".',
        clue: 'keen on',
        translation: 'Cô ấy cực kỳ say mê học ngoại ngữ và tìm hiểu các nền văn hóa quốc tế.'
      },
      {
        id: 'q6-3',
        question: 'The important bilateral agreement was officially signed _______ the morning of May 15th.',
        options: { A: 'at', B: 'in', C: 'on', D: 'by' },
        correctAnswer: 'C',
        explanation: 'Trước buổi của một ngày cụ thể có ngày tháng (the morning of May 15th) bắt buộc dùng giới từ "on".',
        clue: 'on the morning of + ngày cụ thể',
        translation: 'Hiệp định song phương quan trọng đã chính thức được ký kết vào sáng ngày 15 tháng 5.'
      },
      {
        id: 'q6-4',
        question: 'Who will be responsible _______ organizing the graduation ceremony this year?',
        options: { A: 'with', B: 'to', C: 'for', D: 'about' },
        correctAnswer: 'C',
        explanation: 'Cấu trúc: "responsible for + V-ing/N" (chịu trách nhiệm về việc gì) -> chọn "for".',
        clue: 'responsible for',
        translation: 'Ai sẽ chịu trách nhiệm tổ chức lễ tốt nghiệp năm nay?'
      },
      {
        id: 'q6-5',
        question: 'Regular aerobic exercise is considered exceptionally good _______ cardiovascular health.',
        options: { A: 'at', B: 'for', C: 'in', D: 'with' },
        correctAnswer: 'B',
        explanation: 'Tốt cho sức khỏe (mang lại lợi ích cho ai/cái gì) dùng "good for". ("good at" là giỏi về một kỹ năng/môn học).',
        clue: 'good for health (tốt cho sức khỏe)',
        translation: 'Tập thể dục nhịp điệu đều đặn được xem là đặc biệt tốt cho sức khỏe tim mạch.'
      }
    ],
    questionPool: [
      {
        id: 'q6-p1',
        question: 'Mai has been fascinated by astronomy ever since she was a student _______ university.',
        options: { A: 'at', B: 'on', C: 'in', D: 'to' },
        correctAnswer: 'A',
        explanation: 'Cụm từ cố định: "at university" (học tại trường đại học) -> chọn "at".',
        clue: 'at university',
        translation: 'Mai đã bị thiên văn học cuốn hút kể từ khi cô còn là sinh viên ở trường đại học.'
      }
    ]
  }
];
