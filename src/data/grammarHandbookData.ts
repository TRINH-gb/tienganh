import { GrammarTopic } from '../types';

export const GRAMMAR_TOPICS_DATA: GrammarTopic[] = [
  // ==========================================
  // CHUYÊN ĐỀ 1: TỪ LOẠI
  // ==========================================
  {
    id: 'topic-1',
    topicNumber: 1,
    title: 'Chuyên đề 1: Từ loại',
    shortTitle: 'Từ loại',
    englishTitle: 'Parts of Speech (Word Formation)',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trọng tâm',
    summary: 'Nhận diện và xác định vị trí, chức năng ngữ pháp của Danh từ, Động từ, Tính từ và Trạng từ trong câu thi THPTQG.',
    keyPoints: [
      'Vị trí của Danh từ (làm chủ ngữ, sau mạo từ, tính từ sở hữu, giới từ)',
      'Vị trí của Tính từ (trước danh từ, sau động từ to be và linking verbs: feel, seem, become...)',
      'Vị trí của Trạng từ (bổ nghĩa cho động từ, tính từ, trạng từ khác hoặc cả câu)',
      'Quy tắc trật tự tính từ trước danh từ: OSASCOMP'
    ],
    theorySections: [
      {
        title: '1. Vị trí và chức năng của các từ loại cốt lõi',
        subtitle: 'Bảng nhận diện vị trí trong câu',
        formula: [
          'Danh từ (Noun): S + V | V + O | Prep + N | Article / Possessive + (Adj) + N',
          'Tính từ (Adj): Be / Linking Verb + Adj | Adj + N | Make / Find + O + Adj',
          'Trạng từ (Adv): S + Adv + V | V + O + Adv | Adv, S + V | Be + Adv + Adj'
        ],
        rules: [
          {
            label: 'Danh từ (N)',
            text: 'Đứng đầu câu làm Chủ ngữ (S); sau động từ làm Tân ngữ (O); đứng sau các từ hạn định (a, an, the, this, that, my, your...) hoặc sau giới từ (in, on, at, about...).'
          },
          {
            label: 'Tính từ (Adj)',
            text: 'Đứng trước Danh từ để bổ nghĩa (an interesting book); đứng sau To be và các Động từ nối - Linking Verbs (look, seem, appear, smell, taste, sound, feel, become, get).'
          },
          {
            label: 'Trạng từ (Adv)',
            text: 'Bổ nghĩa cho động từ thường (run quickly), bổ nghĩa cho tính từ (extremely beautiful), bổ nghĩa cho trạng từ khác (very well), hoặc đứng đầu câu có dấu phẩy bổ nghĩa cho toàn câu (Fortunately, he passed).'
          }
        ],
        examples: [
          {
            en: 'The government needs to invest more in environmental protection.',
            vi: 'Chính phủ cần đầu tư nhiều hơn vào việc bảo vệ môi trường.',
            highlight: 'environmental protection',
            note: 'Adj (environmental) đứng trước Noun (protection).'
          },
          {
            en: 'She speaks English fluently because she practices every single day.',
            vi: 'Cô ấy nói tiếng Anh một cách lưu loát vì cô ấy luyện tập mỗi ngày.',
            highlight: 'speaks English fluently',
            note: 'Trạng từ fluently đứng sau tân ngữ để bổ nghĩa cho động từ speaks.'
          },
          {
            en: 'The newly developed technology proved extremely effective in reducing emissions.',
            vi: 'Công nghệ mới phát triển đã chứng minh cực kỳ hiệu quả trong việc cắt giảm khí thải.',
            highlight: 'extremely effective',
            note: 'Trạng từ extremely bổ nghĩa cho tính từ effective đứng sau động từ linking proved.'
          }
        ],
        examTips: [
          'Tránh bẫy tính từ đuôi -ly: Một số từ có đuôi -ly là TÍNH TỪ chứ không phải trạng từ: friendly, lovely, lively, silly, cowardly, costly, brotherly...',
          'Phân biệt V-ing và V-ed khi làm tính từ: Tính từ V-ing diễn tả BẢN CHẤT, tính chất của người/vật (an exciting match); Tính từ V-ed diễn tả CẢM XÚC, cảm giác của con người (I felt excited).'
        ]
      },
      {
        title: '2. Trật tự tính từ trước danh từ (OSASCOMP)',
        subtitle: 'Công thức ghi nhớ nhanh trật tự nhiều tính từ bổ nghĩa cho một danh từ',
        formula: [
          'O - S - A - S - C - O - M - P + Noun',
          'Opinion (Ý kiến) -> Size (Kích cỡ) -> Age (Tuổi thọ) -> Shape (Hình dáng) -> Color (Màu sắc) -> Origin (Nguồn gốc) -> Material (Chất liệu) -> Purpose (Mục đích) + Danh từ'
        ],
        rules: [
          { label: 'Opinion', text: 'beautiful, nice, lovely, expensive, delicious, wonderful' },
          { label: 'Size', text: 'big, small, tall, short, huge, tiny' },
          { label: 'Age', text: 'old, young, new, ancient, modern' },
          { label: 'Shape', text: 'round, square, triangular, oval, flat' },
          { label: 'Color', text: 'red, blue, black, yellow, white' },
          { label: 'Origin', text: 'Vietnamese, Japanese, American, French' },
          { label: 'Material', text: 'wooden, silk, leather, plastic, golden' },
          { label: 'Purpose', text: 'sleeping (bag), running (shoes), cooking (oil)' }
        ],
        examples: [
          {
            en: 'She bought a lovely small Japanese wooden table yesterday.',
            vi: 'Hôm qua cô ấy đã mua một chiếc bàn gỗ nhỏ kiểu Nhật rất đáng yêu.',
            highlight: 'lovely small Japanese wooden',
            note: 'lovely (Opinion) -> small (Size) -> Japanese (Origin) -> wooden (Material).'
          }
        ],
        examTips: [
          'Mẹo nhớ thần chú: Ông Sáu Ăn Súp Cua Ông Mập Phì (O - S - A - S - C - O - M - P).'
        ]
      }
    ],
    questions: [
      {
        id: 'q1-1',
        question: 'Carbon dioxide, a dangerous air _______, continues to increase at an alarming rate in urban areas.',
        options: {
          A: 'pollute',
          B: 'polluted',
          C: 'pollutant',
          D: 'pollution'
        },
        correctAnswer: 'C',
        explanation: 'Trước chỗ trống có mạo từ "a" và cụm tính từ "dangerous air", sau đó có dấu phẩy ngăn cách ngữ đồng vị. Cần một danh từ đếm được số ít chỉ chất/tác nhân gây ô nhiễm -> chọn "pollutant" (chất gây ô nhiễm). "Pollution" là danh từ không đếm được nên không dùng với "a".',
        clue: 'a dangerous air + N (đếm được số ít)',
        translation: 'Khí cacbonic, một chất gây ô nhiễm không khí nguy hiểm, tiếp tục gia tăng với tốc độ đáng báo động tại các khu đô thị.'
      },
      {
        id: 'q1-2',
        question: 'The committee members were deeply impressed by how _______ the student answered all the difficult questions.',
        options: {
          A: 'confidence',
          B: 'confident',
          C: 'confidently',
          D: 'confidential'
        },
        correctAnswer: 'C',
        explanation: 'Trong cấu trúc cảm thán / gián tiếp "how + adv + S + V", chỗ trống bổ nghĩa cho động từ "answered" (trả lời một cách tự tin) -> dùng trạng từ "confidently".',
        clue: 'Bổ nghĩa cho động từ thường "answered"',
        translation: 'Các thành viên hội đồng đã vô cùng ấn tượng trước sự trả lời câu hỏi khó một cách tự tin của bạn học sinh.'
      },
      {
        id: 'q1-3',
        question: 'My mother gave me a _______ purse for my eighteenth birthday.',
        options: {
          A: 'black beautiful Italian',
          B: 'beautiful black Italian',
          C: 'Italian beautiful black',
          D: 'black Italian beautiful'
        },
        correctAnswer: 'B',
        explanation: 'Áp dụng quy tắc OSASCOMP: beautiful (Opinion - Ý kiến) -> black (Color - Màu sắc) -> Italian (Origin - Nguồn gốc) + purse (Noun). Đáp án chính xác là B.',
        clue: 'OSASCOMP: Opinion -> Color -> Origin',
        translation: 'Mẹ tôi đã tặng tôi một chiếc ví da xinh đẹp màu đen của Ý nhân dịp sinh nhật lần thứ 18.'
      },
      {
        id: 'q1-4',
        question: 'The newly launched eco-friendly vehicle proved to be highly _______ for daily city commuting.',
        options: {
          A: 'economic',
          B: 'economical',
          C: 'economy',
          D: 'economize'
        },
        correctAnswer: 'B',
        explanation: 'Sau "proved to be" và trạng từ "highly", cần một tính từ mang nghĩa "tiết kiệm (chi phí, nhiên liệu)" -> "economical". Phân biệt: "economic" thuộc về nền kinh tế, "economical" là tiết kiệm.',
        clue: 'to be + highly + Adj (tiết kiệm)',
        translation: 'Chiếc xe thân thiện với môi trường mới ra mắt đã chứng minh rất tiết kiệm cho việc đi lại hàng ngày trong thành phố.'
      },
      {
        id: 'q1-5',
        question: 'Local authorities have taken decisive measures to enhance the _______ of the regional transport system.',
        options: {
          A: 'efficient',
          B: 'efficiently',
          C: 'efficiency',
          D: 'efficacious'
        },
        correctAnswer: 'C',
        explanation: 'Sau mạo từ "the" và trước giới từ "of", vị trí này bắt buộc phải là một Danh từ (the + N + of) -> chọn danh từ "efficiency" (hiệu quả, hiệu suất).',
        clue: 'the + Noun + of...',
        translation: 'Chính quyền địa phương đã thực hiện các biện pháp quyết liệt nhằm nâng cao hiệu quả của hệ thống giao thông khu vực.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 2: MẠO TỪ VÀ HẠN ĐỊNH
  // ==========================================
  {
    id: 'topic-2',
    topicNumber: 2,
    title: 'Chuyên đề 2: Mạo từ và hạn định',
    shortTitle: 'Mạo từ và hạn định',
    englishTitle: 'Articles & Determiners',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trọng tâm',
    summary: 'Quy tắc sử dụng A, An, The, mạo từ rỗng (Ø) và các từ hạn định cốt lõi (Another, Other, Others, The other, Each, Every...).',
    keyPoints: [
      'Phân biệt A / An theo phiên âm nguyên âm đầu tiên (an hour, a university)',
      'Quy tắc dùng The: vật duy nhất, nhạc cụ, đại dương, so sánh nhất, đối tượng đã xác định',
      'Không dùng mạo từ (Ø): danh từ số nhiều/không đếm được chung chung, môn thể thao, bữa ăn',
      'Hệ từ hạn định: Other + N(pl) vs Others (đại từ) vs Another + N(sg)'
    ],
    theorySections: [
      {
        title: '1. Quy tắc cốt lõi về Mạo từ (A, An, The, Ø)',
        subtitle: 'Cách dùng theo ma trận đề thi',
        formula: [
          'A / An + Danh từ đếm được số ít (nhắc đến lần đầu, chưa xác định)',
          'The + Danh từ (đã xác định, người nghe và nói đều biết rõ)',
          'Ø (Zero article) + N số nhiều / N không đếm được nói chung | môn thể thao | bữa ăn'
        ],
        rules: [
          {
            label: 'A vs AN',
            text: 'Dùng AN trước các từ bắt đầu bằng NGUYÊN ÂM PHÁT ÂM (/e/, /æ/, /aɪ/, /ɒ/, /ʌ/, /ə/...). Ví dụ: an umbrella, an hour (/aʊə/), an honest man, an MP3 player. Dùng A trước phụ âm phát âm: a European country (/jʊərəˈpiːən/), a university (/juːnɪˈvɜːsəti/), a one-day trip (/wʌn/).'
          },
          {
            label: 'Dùng THE',
            text: 'Vật duy nhất (the sun, the earth, the internet); trước so sánh nhất (the best, the most); trước số thứ tự (the first, the second); trước tên nhạc cụ sau play (play the guitar, play the piano); tên đại dương, sông ngòi, dãy núi (the Pacific, the Nile, the Alps); tên quốc gia có liên bang/quần đảo (the USA, the UK, the Philippines).'
          },
          {
            label: 'Mạo từ rỗng (Ø)',
            text: 'Không dùng mạo từ trước: danh từ số nhiều mang nghĩa chung (Dogs are loyal animals); môn thể thao (play football, play tennis); bữa ăn (have breakfast/lunch/dinner); phương tiện đi lại sau "by" (by bus, by car, by plane).'
          }
        ],
        examples: [
          {
            en: 'Neil Armstrong was the first man to set foot on the Moon.',
            vi: 'Neil Armstrong là người đầu tiên đặt chân lên Mặt Trăng.',
            highlight: 'the first man, the Moon',
            note: 'The đứng trước số thứ tự (first) và vật thể duy nhất trong vũ trụ (Moon).'
          },
          {
            en: 'She plans to study at a university in Europe next year.',
            vi: 'Cô ấy dự định học tại một trường đại học ở châu Âu vào năm tới.',
            highlight: 'a university',
            note: 'University phát âm bắt đầu bằng phụ âm bán nguyên âm /j/ nên dùng A, không dùng An.'
          }
        ],
        examTips: [
          'Bẫy Go to school/hospital/bed: Khi đến vì đúng mục đích (đi học, chữa bệnh, đi ngủ) -> KHÔNG DÙNG THE (He goes to school every day). Khi đến chỉ để thăm/mục đích khác -> CÓ THE (His mother went to the school to meet his teacher).'
        ]
      },
      {
        title: '2. Các từ hạn định quan trọng (Another, Other, Others, The other)',
        subtitle: 'Bảng phân biệt chính xác 100%',
        formula: [
          'Another + N số ít (một cái/người khác bất kỳ)',
          'Other + N số nhiều / N không đếm được (những cái/người khác)',
          'Others = Other + N số nhiều (đại từ, đứng độc lập, không có N theo sau)',
          'The other + N số ít (cái còn lại trong 2 cái) | The other + N số nhiều (những cái còn lại trong nhóm)'
        ],
        examples: [
          {
            en: 'Some students prefer studying online, while others enjoy traditional classes.',
            vi: 'Một số học sinh thích học trực tuyến, trong khi những bạn khác thích lớp học truyền thống.',
            highlight: 'others',
            note: 'Others đóng vai trò đại từ thay thế cho other students.'
          }
        ],
        examTips: [
          'Cẩn thận: sau "Others" và "The others" KHÔNG BAO GIỜ có danh từ đi kèm vì bản thân chúng đã là đại từ mang số nhiều!'
        ]
      }
    ],
    questions: [
      {
        id: 'q2-1',
        question: 'Gary Hall Jr. was born in Ohio, and he was _______ excellent swimmer from an early age.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'Ø'
        },
        correctAnswer: 'B',
        explanation: 'Từ "excellent" bắt đầu bằng nguyên âm phát âm /ˈeksələnt/, swimmer là danh từ đếm được số ít lần đầu được nhắc tới mang nghĩa "một vận động viên bơi lội xuất sắc" -> chọn "an".',
        clue: 'excellent swimmer (bắt đầu bằng âm /e/)',
        translation: 'Gary Hall Jr. sinh ra ở Ohio và anh ấy là một vận động viên bơi lội xuất sắc từ khi còn nhỏ.'
      },
      {
        id: 'q2-2',
        question: 'They spent their whole weekend playing _______ tennis at the municipal sports complex.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'Ø'
        },
        correctAnswer: 'D',
        explanation: 'Trước tên các môn thể thao (play tennis, play soccer, play badminton) KHÔNG dùng mạo từ (Zero article Ø).',
        clue: 'play + tên môn thể thao -> không dùng mạo từ',
        translation: 'Họ đã dành cả ngày cuối tuần để chơi quần vợt tại khu phức hợp thể thao của thành phố.'
      },
      {
        id: 'q2-3',
        question: 'Would you like _______ cup of hot tea before we leave for the airport?',
        options: {
          A: 'other',
          B: 'another',
          C: 'others',
          D: 'the others'
        },
        correctAnswer: 'B',
        explanation: '"Cup" là danh từ đếm được số ít. Dùng "another + N(số ít)" với nghĩa "thêm một cái/tách khác". Các phương án other, others không phù hợp.',
        clue: 'cup (danh từ đếm được số ít) -> another',
        translation: 'Bạn có muốn dùng thêm một tách trà nóng nữa trước khi chúng ta ra sân bay không?'
      },
      {
        id: 'q2-4',
        question: 'Mount Everest in _______ Himalayas is the highest mountain peak in the world.',
        options: {
          A: 'a',
          B: 'an',
          C: 'the',
          D: 'Ø'
        },
        correctAnswer: 'C',
        explanation: 'Trước tên các dãy núi số nhiều (the Himalayas, the Alps, the Andes) bắt buộc phải dùng mạo từ "the". (Lưu ý: đỉnh núi đơn lẻ như Mount Everest thì lại không dùng the).',
        clue: 'Tên dãy núi số nhiều -> the',
        translation: 'Đỉnh Everest thuộc dãy Himalaya là đỉnh núi cao nhất trên thế giới.'
      },
      {
        id: 'q2-5',
        question: 'I have two brothers: one is an engineer and _______ is a high school teacher.',
        options: {
          A: 'other',
          B: 'another',
          C: 'the other',
          D: 'the others'
        },
        correctAnswer: 'C',
        explanation: 'Cấu trúc xác định một trong hai đối tượng: "one... the other..." (một người là... người còn lại là...). Do chỉ có tổng cộng 2 người anh em nên người còn lại là đối tượng xác định duy nhất -> chọn "the other".',
        clue: 'one... the other... (trong số 2 người/vật)',
        translation: 'Tôi có hai người anh: một người là kỹ sư và người còn lại là giáo viên trung học phổ thông.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 3: LƯỢNG TỪ
  // ==========================================
  {
    id: 'topic-3',
    topicNumber: 3,
    title: 'Chuyên đề 3: Lượng từ',
    shortTitle: 'Lượng từ',
    englishTitle: 'Quantifiers',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trung bình',
    summary: 'Cách dùng và phân biệt các cặp lượng từ hay gặp: Many/Much, Few/A few, Little/A little, Some/Any, Most/Most of...',
    keyPoints: [
      'Few / A few đi với danh từ đếm được số nhiều; Little / A little đi với danh từ không đếm được',
      'Có "a" mang nghĩa khẳng định (đủ dùng), không có "a" mang nghĩa phủ định (hầu như không có)',
      'Phân biệt: Most + N vs Most of + the/possessive + N vs Almost (trạng từ)',
      'Every / Each đi với danh từ số ít và động từ số ít'
    ],
    theorySections: [
      {
        title: '1. Cặp lượng từ trọng tâm: Few/A few & Little/A little',
        subtitle: 'Công thức ghi nhớ phân biệt đếm được và không đếm được',
        formula: [
          'Few + N(đếm được số nhiều) = rất ít, hầu như không có (nghĩa tiêu cực)',
          'A few + N(đếm được số nhiều) = một vài, đủ để làm gì (nghĩa tích cực)',
          'Little + N(không đếm được) = rất ít, hầu như không còn (nghĩa tiêu cực)',
          'A little + N(không đếm được) = một chút, đủ dùng (nghĩa tích cực)'
        ],
        rules: [
          {
            label: 'Danh từ đếm được',
            text: 'Dùng few / a few với bạn bè (friends), sách (books), câu hỏi (questions), ngày (days)...'
          },
          {
            label: 'Danh từ không đếm được',
            text: 'Dùng little / a little với tiền (money), thời gian (time), nước (water), thông tin (information)...'
          }
        ],
        examples: [
          {
            en: 'Although he is new here, he has a few good friends to help him.',
            vi: 'Dù anh ấy mới đến đây, anh ấy có một vài người bạn tốt để giúp đỡ.',
            highlight: 'a few good friends',
            note: 'Friends là N số nhiều đếm được, có a few thể hiện nghĩa tích cực (vẫn có bạn giúp).'
          },
          {
            en: 'Hurry up! We have very little time left before the train leaves.',
            vi: 'Nhanh lên! Chúng ta còn rất ít thời gian trước khi tàu rời bến.',
            highlight: 'very little time',
            note: 'Time là N không đếm được, little mang nghĩa hầu như không còn thời gian.'
          }
        ],
        examTips: [
          'Bẫy đề thi: "only a few / only a little" (chỉ một chút/ít) mang sắc thái giới hạn, luôn đi cùng mạo từ "a"!'
        ]
      },
      {
        title: '2. Nhóm lượng từ: Most, Most of, Almost & None',
        subtitle: 'Công thức chuẩn xác',
        formula: [
          'Most + N: hầu hết (Most students like music)',
          'Most of + the / tính từ sở hữu / đại từ tân ngữ (Most of the students)',
          'Almost + all / every: trạng từ gần như (Almost all students passed)',
          'None of + the / đại từ (Không ai/cái nào trong số...)'
        ],
        examples: [
          {
            en: 'Most of the participants expressed great satisfaction with the workshop.',
            vi: 'Hầu hết những người tham gia đều bày tỏ sự hài lòng lớn đối với buổi hội thảo.',
            highlight: 'Most of the participants',
            note: 'Có "the" nên bắt buộc dùng "Most of", không dùng "Most the".'
          }
        ],
        examTips: [
          'Không bao giờ viết "Almost students" -> SAI hoàn toàn! Phải là "Most students" hoặc "Almost all students".'
        ]
      }
    ],
    questions: [
      {
        id: 'q3-1',
        question: 'We need to go grocery shopping immediately; there is _______ milk left in the fridge.',
        options: {
          A: 'a few',
          B: 'few',
          C: 'a little',
          D: 'little'
        },
        correctAnswer: 'D',
        explanation: 'Milk là danh từ không đếm được -> loại few và a few. Câu nói "cần đi mua ngay lập tức" chứng tỏ sữa gần như đã cạn sạch (sắc thái tiêu cực) -> chọn "little".',
        clue: 'milk (không đếm được) + nghĩa tiêu cực (cần đi mua gấp)',
        translation: 'Chúng ta cần đi siêu thị ngay lập tức; trong tủ lạnh hầu như chẳng còn giọt sữa nào.'
      },
      {
        id: 'q3-2',
        question: '_______ people showed up at the exhibition because it was raining cats and dogs.',
        options: {
          A: 'Few',
          B: 'A few',
          C: 'Little',
          D: 'A little'
        },
        correctAnswer: 'A',
        explanation: 'People là danh từ đếm được số nhiều -> loại little, a little. Do trời mưa rất to (raining cats and dogs) nên rất ít người đến xem (sắc thái phủ định/tiêu cực) -> chọn "Few".',
        clue: 'people (đếm được số nhiều) + trời mưa to nên ít người đến',
        translation: 'Rất ít người đến xem triển lãm vì trời mưa tầm tã.'
      },
      {
        id: 'q3-3',
        question: '_______ of the computers in the laboratory were infected with a dangerous virus.',
        options: {
          A: 'Most',
          B: 'Most of',
          C: 'Almost',
          D: 'Mostly'
        },
        correctAnswer: 'B',
        explanation: 'Trước cụm "the computers" có mạo từ xác định "the" -> bắt buộc phải dùng "Most of". Công thức: Most of + the + N.',
        clue: 'the computers -> Most of the...',
        translation: 'Hầu hết các máy tính trong phòng thí nghiệm đã bị nhiễm một loại vi-rút nguy hiểm.'
      },
      {
        id: 'q3-4',
        question: 'The flight was delayed, but fortunately _______ passengers complained about the inconvenience.',
        options: {
          A: 'little',
          B: 'few',
          C: 'a few',
          D: 'a little'
        },
        correctAnswer: 'B',
        explanation: 'Passengers là danh từ đếm được số nhiều. Từ "fortunately" (thật may mắn) cho thấy hầu như không có ai phàn nàn -> dùng "few" mang nghĩa phủ định tích cực cho tình huống.',
        clue: 'fortunately + passengers -> few (hầu như không ai)',
        translation: 'Chuyến bay bị hoãn, nhưng thật may mắn là hầu như chẳng có hành khách nào phàn nàn về sự bất tiện này.'
      },
      {
        id: 'q3-5',
        question: 'Don\'t worry too much. You still have _______ time left to double-check your answers.',
        options: {
          A: 'a few',
          B: 'few',
          C: 'a little',
          D: 'little'
        },
        correctAnswer: 'C',
        explanation: '"Time" (thời gian) là danh từ không đếm được. Câu "Don\'t worry too much" (Đừng lo quá) mang sắc thái an ủi tích cực (vẫn còn một chút thời gian) -> chọn "a little".',
        clue: 'time (không đếm được) + Don\'t worry (nghĩa tích cực: còn chút thời gian)',
        translation: 'Đừng quá lo lắng. Bạn vẫn còn một chút thời gian để kiểm tra lại câu trả lời của mình.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 4: V-ING & V-TO
  // ==========================================
  {
    id: 'topic-4',
    topicNumber: 4,
    title: 'Chuyên đề 4: V-ing Vto',
    shortTitle: 'V-ing Vto',
    englishTitle: 'Gerunds & Infinitives',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trọng tâm',
    summary: 'Danh động từ (Gerund V-ing) và Động từ nguyên mẫu (To-V / Bare-V), các động từ biến đổi ngữ nghĩa kinh điển.',
    keyPoints: [
      'Động từ theo sau bởi To-V: decide, plan, manage, afford, hope, tend, refuse...',
      'Động từ theo sau bởi V-ing: avoid, enjoy, consider, suggest, admit, deny, postpone...',
      'Nhóm động từ 2 nghĩa: remember, forget, regret, stop, try, mean',
      'Cấu trúc bị động đặc biệt với Need: S_vật + need V-ing (= need to be V3)'
    ],
    theorySections: [
      {
        title: '1. Phân loại động từ đi kèm To-V và V-ing',
        subtitle: 'Bảng động từ cốt lõi trong đề thi THPT Quốc Gia',
        formula: [
          'V + To-Infinitive: decide, plan, agree, refuse, hope, promise, afford, pretend, tend, fail + to V',
          'V + Gerund (V-ing): avoid, enjoy, mind, consider, postpone, admit, deny, practice, suggest + V-ing',
          'V + Object + To-V: tell, ask, advise, encourage, warn, allow, permit + O + to V'
        ],
        rules: [
          {
            label: 'Động từ chỉ To-V',
            text: 'Thường mang tính chất hướng tới tương lai, dự định hoặc ý chí (decide to do, hope to meet, refuse to accept).'
          },
          {
            label: 'Động từ chỉ V-ing',
            text: 'Thường mang tính chất trải nghiệm, hành động đang diễn ra hoặc thái độ với sự việc (enjoy playing, avoid making mistakes).'
          }
        ],
        examples: [
          {
            en: 'She decided to apply for the prestigious scholarship abroad.',
            vi: 'Cô ấy quyết định nộp đơn xin học bổng danh giá ở nước ngoài.',
            highlight: 'decided to apply',
            note: 'Decide + to V.'
          },
          {
            en: 'Drivers should avoid using mobile phones while driving.',
            vi: 'Các tài xế nên tránh sử dụng điện thoại di động khi đang lái xe.',
            highlight: 'avoid using',
            note: 'Avoid + V-ing.'
          }
        ],
        examTips: [
          'Cụm từ chứa "to" nhưng theo sau là V-ing: look forward to + V-ing (mong chờ), be/get used to + V-ing (quen với), object to + V-ing (phản đối), with a view to + V-ing (với mục đích).'
        ]
      },
      {
        title: '2. Các động từ thay đổi nghĩa hoàn toàn theo dạng To-V / V-ing',
        subtitle: 'Bí kíp phân biệt không bao giờ sai',
        rules: [
          {
            label: 'Remember / Forget / Regret',
            text: '+ To-V: Nhớ/quên/tiếc PHẢI LÀM việc gì (chưa làm, bổn phận tương lai). + V-ing: Nhớ/quên/tiếc ĐÃ LÀM việc gì (hành động đã xảy ra trong quá khứ).'
          },
          {
            label: 'Stop',
            text: '+ To-V: Dừng việc đang làm ĐỂ LÀM việc khác. + V-ing: Dừng hẳn, từ bỏ hành động đang làm.'
          },
          {
            label: 'Try',
            text: '+ To-V: Cố gắng, nỗ lực hết sức. + V-ing: Thử làm nghiệm xem kết quả ra sao.'
          },
          {
            label: 'Need',
            text: 'S_người + need to V (cần làm gì). S_vật + need V-ing = need to be V3 (cần được làm gì - mang nghĩa bị động).'
          }
        ],
        examples: [
          {
            en: 'I clearly remember locking the front door before leaving.',
            vi: 'Tôi nhớ rất rõ là mình đã khóa cửa chính trước khi rời đi.',
            highlight: 'remember locking',
            note: 'Hành động khóa cửa đã xảy ra trong quá khứ -> V-ing.'
          },
          {
            en: 'Remember to lock the front door before you leave for school.',
            vi: 'Hãy nhớ khóa cửa chính trước khi bạn đi học nhé.',
            highlight: 'Remember to lock',
            note: 'Nhắc nhở làm một việc trong tương lai -> To-V.'
          }
        ],
        examTips: [
          'Khi thấy chủ ngữ là VẬT đi với NEED (e.g. My car needs...), hãy tìm ngay đáp án V-ing hoặc to be V3!'
        ]
      }
    ],
    questions: [
      {
        id: 'q4-1',
        question: 'He promised _______ her with her assignment as soon as he finished his work.',
        options: {
          A: 'help',
          B: 'helping',
          C: 'to help',
          D: 'helped'
        },
        correctAnswer: 'C',
        explanation: 'Cấu trúc cố định: "promise + to-V" (hứa làm điều gì) -> chọn "to help".',
        clue: 'promise + to-V',
        translation: 'Anh ấy đã hứa sẽ giúp cô ấy làm bài tập ngay khi anh ấy hoàn thành công việc của mình.'
      },
      {
        id: 'q4-2',
        question: 'I still regret _______ that job offer in Da Nang last summer; it was a golden opportunity.',
        options: {
          A: 'turn down',
          B: 'turning down',
          C: 'to turn down',
          D: 'turned down'
        },
        correctAnswer: 'B',
        explanation: 'Hành động từ chối lời mời làm việc (last summer) đã xảy ra trong quá khứ. Cấu trúc: "regret + V-ing" = hối tiếc vì ĐÃ làm gì trong quá khứ. ("Regret + to-V" = lấy làm tiếc khi PHẢI thông báo điều gì).',
        clue: 'last summer (quá khứ) -> regret + V-ing',
        translation: 'Tôi vẫn hối tiếc vì đã từ chối lời mời làm việc ở Đà Nẵng vào mùa hè năm ngoái; đó là một cơ hội vàng.'
      },
      {
        id: 'q4-3',
        question: 'After walking for three hours under the hot sun, the tourists stopped _______ a cold drink.',
        options: {
          A: 'having',
          B: 'to have',
          C: 'have',
          D: 'had'
        },
        correctAnswer: 'B',
        explanation: 'Các du khách dừng bước đi lại ĐỂ uống nước giải khát (mục đích hành động) -> dùng "stop + to-V". Nếu dùng "stop having" thì có nghĩa là bỏ hẳn việc uống nước, không hợp ngữ cảnh.',
        clue: 'dừng lại ĐỂ làm gì -> stop + to V',
        translation: 'Sau khi đi bộ suốt 3 tiếng dưới trời nắng gắt, các du khách đã dừng lại để uống nước lạnh.'
      },
      {
        id: 'q4-4',
        question: 'These old windows are leaking air and urgently need _______.',
        options: {
          A: 'replacing',
          B: 'to replace',
          C: 'replace',
          D: 'replaced'
        },
        correctAnswer: 'A',
        explanation: 'Chủ ngữ "These old windows" là danh từ chỉ VẬT (những chiếc cửa sổ cũ). Cấu trúc bị động với need: "S_vật + need + V-ing" (= need to be replaced) -> chọn "replacing".',
        clue: 'S_vật + need + V-ing',
        translation: 'Những chiếc cửa sổ cũ này đang bị lọt gió và rất cần được thay thế khẩn cấp.'
      },
      {
        id: 'q4-5',
        question: 'All team members are looking forward to _______ the international science contest.',
        options: {
          A: 'join',
          B: 'joining',
          C: 'joined',
          D: 'be joined'
        },
        correctAnswer: 'B',
        explanation: 'Cấu trúc quen thuộc: "look forward to + V-ing" (mong đợi, trông ngóng việc gì). Chú ý "to" ở đây là giới từ, không phải động từ nguyên mẫu.',
        clue: 'look forward to + V-ing',
        translation: 'Tất cả các thành viên trong đội đều đang rất mong chờ được tham gia cuộc thi khoa học quốc tế.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 5: SO SÁNH
  // ==========================================
  {
    id: 'topic-5',
    topicNumber: 5,
    title: 'Chuyên đề 5: So sánh',
    shortTitle: 'So sánh',
    englishTitle: 'Comparisons',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trọng tâm',
    summary: 'So sánh hơn, so sánh nhất, so sánh bằng, so sánh bội số và đặc biệt là So sánh kép (The more... the more...).',
    keyPoints: [
      'So sánh bằng: as + adj/adv + as',
      'So sánh hơn: adj/adv-er than vs more + adj/adv than',
      'So sánh nhất: the + adj/adv-est vs the most + adj/adv',
      'So sánh kép (Đồng tiến): The + comparative..., the + comparative...'
    ],
    theorySections: [
      {
        title: '1. Tổng quan các dạng so sánh cơ bản',
        subtitle: 'Công thức tính từ ngắn và tính từ dài',
        formula: [
          'So sánh bằng: S + V + as + Adj/Adv + as + O',
          'So sánh hơn: S + V + Short-adj/adv-er + than + O | S + V + more + Long-adj/adv + than + O',
          'So sánh nhất: S + V + the + Short-adj/adv-est | S + V + the most + Long-adj/adv'
        ],
        rules: [
          {
            label: 'Tính từ ngắn vs Dài',
            text: 'Tính từ ngắn có 1 âm tiết (tall, fast). Tính từ dài có 2 âm tiết trở lên (beautiful, intelligent). Ngoại lệ: Tính từ 2 âm tiết kết thúc bằng -y, -le, -ow, -er (happy -> happier, simple -> simpler, narrow -> narrower) được chia như tính từ ngắn.'
          },
          {
            label: 'Từ nhấn mạnh so sánh hơn',
            text: 'Dùng much, far, a lot, significantly, slightly đứng trước tính từ so sánh hơn để nhấn mạnh mức độ (much taller, far more expensive).'
          }
        ],
        examples: [
          {
            en: 'Life in big cities is far more stressful than that in rural areas.',
            vi: 'Cuộc sống ở các thành phố lớn căng thẳng hơn nhiều so với cuộc sống ở vùng nông thôn.',
            highlight: 'far more stressful than',
            note: 'Dùng "far" để nhấn mạnh mức độ so sánh hơn của tính từ dài stressful.'
          }
        ],
        examTips: [
          'Tránh bẫy gấp đôi so sánh: KHÔNG viết "more better", "more faster" -> SAI. Chỉ viết "better", "faster".'
        ]
      },
      {
        title: '2. So sánh kép (Double Comparative - Càng... thì càng...)',
        subtitle: 'Dạng bài xuất hiện liên tục trong đề thi THPTQG chính thức',
        formula: [
          'The + Comparative (adj/adv) + S1 + V1, the + Comparative (adj/adv) + S2 + V2',
          'The more + S + V, the more + S + V',
          'The + short-er + S + V, the more + long-adj + S + V'
        ],
        rules: [
          {
            label: 'Quy tắc 2 vế song hành',
            text: 'Cả hai mệnh đề ĐỀU PHẢI CÓ mạo từ THE đứng đầu và theo sau là dạng so sánh hơn.'
          }
        ],
        examples: [
          {
            en: 'The more you practice speaking English, the more confident you will become.',
            vi: 'Bạn càng luyện nói tiếng Anh nhiều, bạn sẽ càng trở nên tự tin hơn.',
            highlight: 'The more..., the more confident...',
            note: 'Cấu trúc so sánh kép chuẩn 2 vế: The more... the more confident.'
          },
          {
            en: 'The hotter the weather gets, the more uncomfortable people feel.',
            vi: 'Thời tiết càng trở nên nóng bức, mọi người càng cảm thấy khó chịu.',
            highlight: 'The hotter..., the more uncomfortable...',
            note: 'Vế 1 là tính từ ngắn (hotter), vế 2 là tính từ dài (more uncomfortable).'
          }
        ],
        examTips: [
          'Mẹo nhìn nhanh câu hỏi trắc nghiệm so sánh kép: Tìm vế có "The + [so sánh hơn]". Vế còn lại chắc chắn cũng phải bắt đầu bằng "The + [so sánh hơn]"!'
        ]
      }
    ],
    questions: [
      {
        id: 'q5-1',
        question: 'The more carefully you prepare for the interview, _______ you are to succeed.',
        options: {
          A: 'the more likely',
          B: 'the most likely',
          C: 'more likely',
          D: 'as likely'
        },
        correctAnswer: 'A',
        explanation: 'Cấu trúc so sánh kép "The + so sánh hơn..., the + so sánh hơn...". Vế trước có "The more carefully", vế sau bắt buộc phải có mạo từ "the" và dạng so sánh hơn "more likely" -> chọn "the more likely".',
        clue: 'The more carefully... -> the more likely...',
        translation: 'Bạn càng chuẩn bị cẩn thận cho buổi phỏng vấn, bạn càng có nhiều khả năng thành công.'
      },
      {
        id: 'q5-2',
        question: 'This electric SUV is _______ than the petrol model we tested last month.',
        options: {
          A: 'much economical',
          B: 'more economically',
          C: 'far more economical',
          D: 'the most economical'
        },
        correctAnswer: 'C',
        explanation: 'Sau động từ to be "is" cần một tính từ, phía sau có "than" nên dùng so sánh hơn của tính từ dài (more economical than). Để nhấn mạnh mức độ chênh lệch, thêm từ "far" phía trước -> "far more economical".',
        clue: 'is + far more economical than',
        translation: 'Chiếc xe SUV điện này tiết kiệm hơn nhiều so với mẫu xe chạy xăng mà chúng tôi đã lái thử tháng trước.'
      },
      {
        id: 'q5-3',
        question: 'The higher the altitude is, _______ oxygen there is in the air.',
        options: {
          A: 'the fewer',
          B: 'the less',
          C: 'the least',
          D: 'the little'
        },
        correctAnswer: 'B',
        explanation: 'Cấu trúc so sánh kép. "Oxygen" là danh từ không đếm được, so sánh hơn của little với danh từ không đếm được là "less". Cả vế cần dạng: "the + less + N" -> chọn "the less".',
        clue: 'The higher... the less + N(không đếm được)',
        translation: 'Độ cao càng lớn thì càng có ít oxy trong không khí.'
      },
      {
        id: 'q5-4',
        question: 'Of the three candidates applying for the managerial post, Mr. David is _______.',
        options: {
          A: 'the most qualified',
          B: 'more qualified',
          C: 'the more qualified',
          D: 'qualified'
        },
        correctAnswer: 'A',
        explanation: 'So sánh trong nhóm có từ 3 đối tượng trở lên ("Of the three candidates") -> bắt buộc dùng SO SÁNH NHẤT: "the most qualified". (Chỉ dùng so sánh hơn khi nhóm có đúng 2 đối tượng: Of the two...).',
        clue: 'Of the three... -> so sánh nhất',
        translation: 'Trong số ba ứng viên nộp đơn cho vị trí quản lý, ông David là người có đủ năng lực nhất.'
      },
      {
        id: 'q5-5',
        question: 'Online shopping is getting _______ convenient thanks to modern delivery services.',
        options: {
          A: 'more and more',
          B: 'the most',
          C: 'as much',
          D: 'so much'
        },
        correctAnswer: 'A',
        explanation: 'Cấu trúc so sánh càng ngày càng (lũy tiến): "more and more + Long Adj" (ngày càng thuận tiện) hoặc "Short Adj-er and Short Adj-er". -> chọn "more and more".',
        clue: 'is getting more and more + Adj',
        translation: 'Mua sắm trực tuyến đang ngày càng trở nên thuận tiện hơn nhờ các dịch vụ giao hàng hiện đại.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 6: GIỚI TỪ
  // ==========================================
  {
    id: 'topic-6',
    topicNumber: 6,
    title: 'Chuyên đề 6: Giới từ',
    shortTitle: 'Giới từ',
    englishTitle: 'Prepositions',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trung bình',
    summary: 'Giới từ chỉ thời gian (In/On/At), nơi chốn, giới từ đi kèm tính từ, động từ và các cụm giới từ cố định trong đề thi.',
    keyPoints: [
      'Quy tắc hình tam giác In - On - At (Thời gian & Không gian)',
      'Giới từ đi với Tính từ: interested in, good at, proud of, famous for, keen on...',
      'Giới từ đi với Động từ: depend on, succeed in, apologize to sb for sth, prevent from...',
      'Cụm giới từ cố định: in advance, at risk, under pressure, by chance...'
    ],
    theorySections: [
      {
        title: '1. Giới từ chỉ Thời gian & Nơi chốn (In - On - At)',
        subtitle: 'Tam giác giới từ từ khái quát đến cụ thể',
        formula: [
          'IN: Khoảng thời gian lớn (năm, mùa, tháng, thế kỷ, buổi trong ngày) | Không gian rộng (quốc gia, thành phố)',
          'ON: Khoảng thời gian cụ thể (ngày, thứ, ngày lễ có từ "day") | Bề mặt (on the table, on the wall)',
          'AT: Thời điểm chính xác (giờ, at midnight, at noon) | Địa điểm cụ thể (at school, at the airport)'
        ],
        rules: [
          { label: 'Ví dụ với IN', text: 'in 2026, in summer, in October, in the morning, in Vietnam, in Hanoi' },
          { label: 'Ví dụ với ON', text: 'on Monday, on October 10th, on Christmas Day, on the street, on the floor' },
          { label: 'Ví dụ với AT', text: 'at 7:30 AM, at noon, at night, at Christmas (kỳ nghỉ), at home, at the bus stop' }
        ],
        examples: [
          {
            en: 'The national graduation examination will take place in June.',
            vi: 'Kỳ thi tốt nghiệp quốc gia sẽ diễn ra vào tháng Sáu.',
            highlight: 'in June',
            note: 'Dùng IN trước tháng.'
          },
          {
            en: 'We usually gather with our family on New Year\'s Eve.',
            vi: 'Chúng tôi thường quây quần cùng gia đình vào Đêm giao thừa.',
            highlight: 'on New Year\'s Eve',
            note: 'Dùng ON trước ngày cụ thể / đêm lễ có từ Eve/Day.'
          }
        ],
        examTips: [
          'Phân biệt: "at Christmas" (trong dịp lễ Giáng sinh nói chung) nhưng "on Christmas Day" (đúng vào ngày 25/12).'
        ]
      },
      {
        title: '2. Các cụm Tính từ + Giới từ và Cụm cố định thi THPTQG',
        subtitle: 'Bảng học thuộc trọng tâm',
        rules: [
          { label: 'Đi với OF', text: 'proud of (tự hào), fond of (thích), afraid of (sợ), aware of (nhận thức), capable of (có khả năng)' },
          { label: 'Đi với AT', text: 'good at (giỏi), bad at (dở), surprised at (ngạc nhiên), brilliant at' },
          { label: 'Đi với FOR', text: 'famous for (nổi tiếng), responsible for (chịu trách nhiệm), grateful for (biết ơn)' },
          { label: 'Đi với IN', text: 'interested in (quan tâm), rich in (giàu về), succeed in (thành công trong)' },
          { label: 'Đi với TO', text: 'similar to (tương tự), accustomed to (quen với), dedicated to (cống hiến)' }
        ],
        examples: [
          {
            en: 'Deforestation puts thousands of rare wildlife species at risk of extinction.',
            vi: 'Nạn phá rừng đẩy hàng ngàn loài động vật hoang dã quý hiếm vào nguy cơ tuyệt chủng.',
            highlight: 'at risk of extinction',
            note: 'Cụm cố định: at risk of (có nguy cơ).'
          }
        ],
        examTips: [
          'Cụm cố định hay ra: under pressure (chịu áp lực), in advance (trước), out of order (hỏng hóc), by accident / by chance (tình cờ), on purpose (cố ý).'
        ]
      }
    ],
    questions: [
      {
        id: 'q6-1',
        question: 'Many endangered animals are currently _______ risk of becoming extinct due to habitat destruction.',
        options: {
          A: 'in',
          B: 'at',
          C: 'on',
          D: 'under'
        },
        correctAnswer: 'B',
        explanation: 'Cụm cố định mang nghĩa "có nguy cơ, gặp hiểm họa" là "at risk of" (hoặc "in danger of") -> chọn giới từ "at".',
        clue: 'at risk of = in danger of',
        translation: 'Nhiều loài động vật nguy cấp hiện đang có nguy cơ bị tuyệt chủng do môi trường sống bị tàn phá.'
      },
      {
        id: 'q6-2',
        question: 'She is extremely good _______ solving complex mathematical problems under time pressure.',
        options: {
          A: 'at',
          B: 'in',
          C: 'with',
          D: 'for'
        },
        correctAnswer: 'A',
        explanation: 'Cấu trúc quen thuộc: "to be good at sth/doing sth" (giỏi về lĩnh vực gì) -> chọn "at".',
        clue: 'good at + V-ing',
        translation: 'Cô ấy cực kỳ giỏi giải các bài toán phức tạp dưới áp lực thời gian.'
      },
      {
        id: 'q6-3',
        question: 'All airline passengers are kindly requested to book their tickets well _______ advance.',
        options: {
          A: 'by',
          B: 'in',
          C: 'on',
          D: 'for'
        },
        correctAnswer: 'B',
        explanation: 'Cụm cố định "in advance" mang nghĩa "trước, từ trước" (well in advance = từ rất sớm trước đó) -> chọn "in".',
        clue: 'in advance (đặt trước)',
        translation: 'Tất cả các hành khách đi máy bay được yêu cầu đặt vé từ trước thật sớm.'
      },
      {
        id: 'q6-4',
        question: 'Parents should never hold young graduates solely responsible _______ making their own career choices.',
        options: {
          A: 'with',
          B: 'for',
          C: 'to',
          D: 'of'
        },
        correctAnswer: 'B',
        explanation: 'Cấu trúc: "responsible for sth" (chịu trách nhiệm về điều gì) -> chọn "for".',
        clue: 'responsible for',
        translation: 'Cha mẹ không bao giờ nên buộc những người trẻ mới tốt nghiệp phải tự chịu trách nhiệm hoàn toàn cho các lựa chọn nghề nghiệp của họ.'
      },
      {
        id: 'q6-5',
        question: 'The symposium on green energy is scheduled to open _______ Monday morning next week.',
        options: {
          A: 'in',
          B: 'at',
          C: 'on',
          D: 'by'
        },
        correctAnswer: 'C',
        explanation: 'Khi có thứ trong tuần đi kèm buổi cụ thể (Monday morning), quy tắc luôn ưu tiên THỨ -> dùng giới từ "on" (on Monday morning).',
        clue: 'Thứ + buổi (Monday morning) -> dùng ON',
        translation: 'Hội nghị chuyên đề về năng lượng xanh dự kiến sẽ khai mạc vào sáng thứ Hai tuần tới.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 7: CỤM ĐỘNG TỪ (PHRASAL VERBS)
  // ==========================================
  {
    id: 'topic-7',
    topicNumber: 7,
    title: 'Chuyên đề 7: Cụm động từ (Phrasal Verbs)',
    shortTitle: 'Phrasal Verbs',
    englishTitle: 'Phrasal Verbs',
    badge: 'Trọng tâm 100%',
    difficulty: 'Nâng cao',
    summary: 'Tổng hợp các cụm động từ thông dụng nhất trong ma trận câu hỏi đề thi tốt nghiệp THPT, mẹo suy đoán nghĩa theo tiểu từ.',
    keyPoints: [
      'Cụm động từ với TURN: turn down (từ chối/vặn nhỏ), turn up (xuất hiện), turn on/off',
      'Cụm động từ với LOOK: look after (chăm sóc), look up (tra cứu), look forward to, look down on',
      'Cụm động từ với GIVE, TAKE, BRING: give up, take off, bring about, take care of',
      'Cụm động từ 3 từ: put up with (chịu đựng), keep up with, cut down on, run out of'
    ],
    theorySections: [
      {
        title: '1. Các cụm động từ "tủ" hay ra thi nhiều nhất',
        subtitle: 'Bảng tra cứu nghĩa chính xác trong ngữ cảnh thi',
        rules: [
          { label: 'Nhóm TURN', text: 'turn down (từ chối lời mời/hồ sơ; vặn nhỏ âm lượng), turn up (xuất hiện, đến = arrive), turn off / turn on (tắt/bật), turn into (biến thành).' },
          { label: 'Nhóm LOOK', text: 'look after (chăm sóc = take care of), look for (tìm kiếm), look up (tra từ điển/thông tin), look up to (tôn trọng, ngưỡng mộ), look down on (khinh thường).' },
          { label: 'Nhóm TAKE', text: 'take off (máy bay cất cánh; cởi đồ; thành công nhanh chóng), take care of (chăm sóc), take after (giống ai đó về ngoại hình/tính cách = resemble), take over (tiếp quản công việc).' },
          { label: 'Nhóm GIVE & PUT', text: 'give up (từ bỏ), give off (tỏa ra mùi/nhiệt), put off (trì hoãn = delay/postpone), put on (mặc đồ, tăng cân), put out (dập tắt lửa).' }
        ],
        examples: [
          {
            en: 'She had to turn down the lucrative job offer because it required relocating overseas.',
            vi: 'Cô ấy đành phải từ chối lời mời làm việc béo bở vì nó đòi hỏi phải chuyển nơi ở ra nước ngoài.',
            highlight: 'turn down',
            note: 'Turn down = reject (từ chối).'
          },
          {
            en: 'The flight couldn\'t take off on time due to heavy dense fog.',
            vi: 'Chuyến bay không thể cất cánh đúng giờ vì sương mù dày đặc.',
            highlight: 'take off',
            note: 'Take off = máy bay cất cánh rời mặt đất.'
          }
        ],
        examTips: [
          'Quy tắc tân ngữ đại từ: Với các cụm động từ tách rời được, nếu tân ngữ là ĐẠI TỪ (it, them, him, her), bắt buộc phải đặt ở GIỮA động từ và tiểu từ: Turn IT off (ĐÚNG), Turn off it (SAI).'
        ]
      },
      {
        title: '2. Các cụm động từ 3 từ (Verb + Particle + Preposition)',
        subtitle: 'Dạng câu hỏi phân hóa điểm 8+ trong đề thi',
        rules: [
          { label: 'put up with', text: 'chịu đựng ai/điều gì tồi tệ (= tolerate)' },
          { label: 'catch up with / keep up with', text: 'bắt kịp, theo kịp tiến độ (= match the pace of)' },
          { label: 'run out of', text: 'hết, cạn kiệt nguồn tài nguyên/tiền/thời gian (= use up)' },
          { label: 'cut down on', text: 'cắt giảm số lượng tiêu thụ (= reduce)' },
          { label: 'come down with', text: 'bị mắc bệnh nhẹ (cảm cúm, sốt...)' },
          { label: 'make up for', text: 'bù đắp cho (= compensate for)' }
        ],
        examples: [
          {
            en: 'I really can\'t put up with his constant complaining anymore.',
            vi: 'Tôi thực sự không thể chịu đựng thêm những lời phàn nàn liên tục của anh ta nữa.',
            highlight: 'put up with',
            note: 'Put up with = tolerate (chịu đựng).'
          }
        ],
        examTips: [
          'Khi gặp câu trắc nghiệm phrasal verbs, hãy luôn dịch trọn vẹn ngữ cảnh của câu thay vì chỉ dịch nghĩa đen của động từ gốc!'
        ]
      }
    ],
    questions: [
      {
        id: 'q7-1',
        question: 'Because of the sudden torrential rain, the school sports day was _______ until next Friday.',
        options: {
          A: 'put off',
          B: 'put out',
          C: 'taken off',
          D: 'called for'
        },
        correctAnswer: 'A',
        explanation: 'Do trời mưa to nên ngày hội thể thao bị "hoãn lại" cho tới thứ Sáu tuần sau. "Put off" = delay/postpone (hoãn lại). "Put out" = dập tắt lửa. "Take off" = cất cánh.',
        clue: 'until next Friday -> hoãn lại (put off)',
        translation: 'Do cơn mưa như trút nước bất ngờ, ngày hội thể thao của trường đã bị hoãn lại cho đến thứ Sáu tuần sau.'
      },
      {
        id: 'q7-2',
        question: 'Linda takes _______ her grandmother; both of them have green eyes and a warm smile.',
        options: {
          A: 'after',
          B: 'over',
          C: 'up',
          D: 'in'
        },
        correctAnswer: 'A',
        explanation: 'Ngữ cảnh nói Linda và bà đều có mắt màu xanh và nụ cười ấm áp (giống nhau về ngoại hình). Cụm "take after sb" = resemble (giống ai đó) -> chọn "after".',
        clue: 'both of them have green eyes -> giống nhau (take after)',
        translation: 'Linda rất giống bà của mình; cả hai đều có đôi mắt màu xanh lá cây và nụ cười ấm áp.'
      },
      {
        id: 'q7-3',
        question: 'We unexpectedly ran _______ petrol in the middle of the highway at midnight.',
        options: {
          A: 'away from',
          B: 'out of',
          C: 'down with',
          D: 'up to'
        },
        correctAnswer: 'B',
        explanation: 'Cụm "run out of sth" mang nghĩa "hết, cạn kiệt cái gì" (ran out of petrol = hết xăng giữa đường cao tốc) -> chọn "out of".',
        clue: 'petrol in the middle of highway -> hết xăng (run out of)',
        translation: 'Chúng tôi bất ngờ bị hết xăng ngay giữa đường cao tốc lúc nửa đêm.'
      },
      {
        id: 'q7-4',
        question: 'He promised to attend the meeting at 9:00 AM, but he didn\'t _______ until almost noon.',
        options: {
          A: 'turn down',
          B: 'turn up',
          C: 'turn off',
          D: 'turn out'
        },
        correctAnswer: 'B',
        explanation: '"Turn up" = arrive / appear (xuất hiện, đến nơi). Câu mang nghĩa: Hứa đến lúc 9 giờ nhưng mãi gần trưa mới xuất hiện.',
        clue: 'didn\'t arrive -> didn\'t turn up',
        translation: 'Anh ấy đã hứa sẽ tham dự cuộc họp lúc 9:00 sáng, nhưng đến gần trưa mới xuất hiện.'
      },
      {
        id: 'q7-5',
        question: 'To stay healthy and lower your cholesterol level, you ought to cut _______ fatty foods.',
        options: {
          A: 'down on',
          B: 'up with',
          C: 'out of',
          D: 'off from'
        },
        correctAnswer: 'A',
        explanation: 'Cụm "cut down on sth" mang nghĩa "cắt giảm tiêu thụ cái gì" (cut down on fatty foods = cắt giảm đồ ăn nhiều chất béo) -> chọn "down on".',
        clue: 'cắt giảm lượng thức ăn -> cut down on',
        translation: 'Để giữ gìn sức khỏe và giảm lượng cholesterol, bạn nên cắt giảm các loại thực phẩm nhiều dầu mỡ.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 8: HÒA HỢP THÌ
  // ==========================================
  {
    id: 'topic-8',
    topicNumber: 8,
    title: 'Chuyên đề 8: Hòa hợp thì',
    shortTitle: 'Hòa hợp thì',
    englishTitle: 'Sequence of Tenses & Agreement',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trọng tâm',
    summary: 'Sự phối hợp giữa các thì trong câu phức chỉ thời gian (When, While, Since, By the time, As soon as) và sự hòa hợp giữa Chủ ngữ - Động từ.',
    keyPoints: [
      'Mệnh đề thời gian ở tương lai: S + will + V + As soon as / When / Until + S + V(hiện tại đơn / hiện tại hoàn thành)',
      'Hành động xen vào trong quá khứ: When + S + V(past simple), S + was/were + V-ing',
      'Trước - Sau trong quá khứ: By the time / Before + S + V(past simple), S + had + V3',
      'Hòa hợp Chủ ngữ - Động từ: The number of vs A number of, either... or, as well as'
    ],
    theorySections: [
      {
        title: '1. Phối hợp thì trong mệnh đề trạng ngữ chỉ thời gian',
        subtitle: 'Quy tắc vàng 100% ra thi trong câu hỏi ngữ pháp trắc nghiệm',
        formula: [
          'Tương lai: S + will + V(bare) + when / as soon as / until / by the time + S + V(s/es / have V3)',
          'Quá khứ xen vào: S + was/were + V-ing + WHEN + S + V(quá khứ đơn)',
          'Quá khứ hoàn thành: BY THE TIME / BEFORE + S + V(quá khứ đơn), S + had + V3/ed',
          'Hiện tại hoàn thành: S + have/has + V3/ed + SINCE + S + V(quá khứ đơn)'
        ],
        rules: [
          {
            label: 'QUY TẮC CẤM',
            text: 'KHÔNG BAO GIỜ dùng thì tương lai (will/shall) trong mệnh đề trạng ngữ chỉ thời gian bắt đầu bằng When, While, As soon as, Until, Before, After, By the time. Mệnh đề này phải chia ở HIỆN TẠI ĐƠN hoặc HIỆN TẠI HOÀN THÀNH.'
          }
        ],
        examples: [
          {
            en: 'We will notify you immediately as soon as we receive your application form.',
            vi: 'Chúng tôi sẽ thông báo cho bạn ngay lập tức khi chúng tôi nhận được đơn đăng ký của bạn.',
            highlight: 'will notify ... as soon as we receive',
            note: 'Mệnh đề chính dùng tương lai đơn (will notify), mệnh đề thời gian dùng hiện tại đơn (receive).'
          },
          {
            en: 'By the time the firefighters arrived at the scene, the fire had already been extinguished.',
            vi: 'Vào thời điểm lực lượng cứu hỏa đến hiện trường, đám cháy đã được dập tắt rồi.',
            highlight: 'arrived ... had already been extinguished',
            note: 'By the time + quá khứ đơn, mệnh đề chính chia quá khứ hoàn thành.'
          }
        ],
        examTips: [
          'Mẹo giải câu hòa hợp thì tương lai: Nhìn vế có "will V", vế có liên từ thời gian (as soon as/when...) LUÔN CHỌN ĐỘNG TỪ Ở HIỆN TẠI ĐƠN!'
        ]
      },
      {
        title: '2. Sự hòa hợp giữa Chủ ngữ và Động từ (S-V Agreement)',
        subtitle: 'Các trường hợp đặc biệt hay bị lừa',
        rules: [
          { label: 'Either... or / Neither... nor / Not only... but also', text: 'Động từ chia theo CHỦ NGỮ THỨ 2 (đứng gần động từ nhất).' },
          { label: 'Together with / As well as / Along with', text: 'Động từ chia theo CHỦ NGỮ THỨ 1 (đứng trước cụm từ).' },
          { label: 'The number of vs A number of', text: 'The number of + N(số nhiều) + Động từ SỐ ÍT (chỉ một con số). A number of + N(số nhiều) + Động từ SỐ NHIỀU (mang nghĩa nhiều người/vật).' },
          { label: 'Đại từ bất định (Everyone, Someone, Each, Every)', text: 'Luôn đi với Động từ SỐ ÍT.' }
        ],
        examples: [
          {
            en: 'The number of endangered species has increased significantly over the last decade.',
            vi: 'Số lượng các loài có nguy cơ tuyệt chủng đã tăng lên đáng kể trong thập kỷ qua.',
            highlight: 'The number of ... has increased',
            note: 'The number of luôn đi với động từ số ít (has, không dùng have).'
          }
        ],
        examTips: [
          'Cẩn thận các danh từ có tận cùng là "s" nhưng mang nghĩa số ít: môn học (Physics, Mathematics), bệnh tật (Measles, Diabetes), tin tức (News) -> Động từ chia SỐ ÍT!'
        ]
      }
    ],
    questions: [
      {
        id: 'q8-1',
        question: 'I will send you the detailed project report as soon as I _______ it.',
        options: {
          A: 'will finish',
          B: 'finish',
          C: 'finished',
          D: 'had finished'
        },
        correctAnswer: 'B',
        explanation: 'Quy tắc hòa hợp thì giữa mệnh đề chính và mệnh đề chỉ thời gian: "S + will + V + as soon as + S + V(hiện tại đơn)". Không dùng "will" trong mệnh đề trạng ngữ thời gian -> chọn "finish".',
        clue: 'will send ... as soon as + V(hiện tại đơn)',
        translation: 'Tôi sẽ gửi cho bạn bản báo cáo dự án chi tiết ngay khi tôi hoàn thành nó.'
      },
      {
        id: 'q8-2',
        question: 'By the time the rescue team reached the remote village, the flood water _______.',
        options: {
          A: 'receded',
          B: 'has receded',
          C: 'had receded',
          D: 'was receding'
        },
        correctAnswer: 'C',
        explanation: 'Cấu trúc hòa hợp thì với By the time trong quá khứ: "By the time + S + V(quá khứ đơn), S + had + V3/ed" (Hành động nước rút xảy ra và hoàn tất trước khi đội cứu hộ đến) -> chọn "had receded".',
        clue: 'By the time + V(quá khứ đơn) -> had + V3',
        translation: 'Vào thời điểm đội cứu hộ tiếp cận được ngôi làng hẻo lánh, nước lũ đã rút rồi.'
      },
      {
        id: 'q8-3',
        question: 'While the teacher _______ the lesson, the fire alarm suddenly went off.',
        options: {
          A: 'explained',
          B: 'was explaining',
          C: 'has explained',
          D: 'is explaining'
        },
        correctAnswer: 'B',
        explanation: 'Hành động đang diễn ra trong quá khứ (giáo viên đang giảng bài - thì quá khứ tiếp diễn) thì có một hành động ngắn khác bất ngờ xen vào (chuông báo cháy reo - quá khứ đơn went off) -> chọn "was explaining".',
        clue: 'While + quá khứ tiếp diễn, quá khứ đơn (went off)',
        translation: 'Trong khi cô giáo đang giảng bài thì chuông báo cháy bất ngờ reo lên.'
      },
      {
        id: 'q8-4',
        question: 'Neither the manager nor his assistants _______ present at yesterday\'s emergency meeting.',
        options: {
          A: 'was',
          B: 'were',
          C: 'is',
          D: 'are'
        },
        correctAnswer: 'B',
        explanation: 'Cấu trúc "Neither S1 nor S2 + V": Động từ hòa hợp theo S2. S2 là "his assistants" (số nhiều) và sự việc xảy ra trong quá khứ ("yesterday") -> chọn to be "were".',
        clue: 'Neither S1 nor S2 -> chia theo S2 (assistants) + yesterday',
        translation: 'Cả người quản lý lẫn các trợ lý của ông ấy đều không có mặt tại cuộc họp khẩn cấp ngày hôm qua.'
      },
      {
        id: 'q8-5',
        question: 'The head teacher, along with several experienced instructors, _______ attending the education conference in Da Nang.',
        options: {
          A: 'is',
          B: 'are',
          C: 'were',
          D: 'have been'
        },
        correctAnswer: 'A',
        explanation: 'Khi chủ ngữ nối bằng cụm "along with / as well as / together with", động từ hòa hợp theo CHỦ NGỮ THỨ NHẤT. Chủ ngữ thứ nhất là "The head teacher" (số ít) -> chọn "is".',
        clue: 'S1, along with S2 -> chia theo S1 (The head teacher)',
        translation: 'Thầy hiệu trưởng cùng với vài giảng viên giàu kinh nghiệm đang tham dự hội nghị giáo dục tại Đà Nẵng.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 9: CÂU BỊ ĐỘNG
  // ==========================================
  {
    id: 'topic-9',
    topicNumber: 9,
    title: 'Chuyên đề 9: Bị động',
    shortTitle: 'Bị động',
    englishTitle: 'Passive Voice',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trọng tâm',
    summary: 'Câu bị động của các thì cơ bản, bị động với động từ khiếm khuyết và các dạng bị động đặc biệt (truyền khiến, ý kiến quan điểm, bị động kép).',
    keyPoints: [
      'Cấu trúc tổng quát: S + be + V3/ed + (by O)',
      'Bị động truyền khiến: Have sb do sth -> Have sth done / Get sb to do sth -> Get sth done',
      'Bị động với động từ quan điểm (say, believe, think, report): It is said that... / S2 is said to V / to have V3',
      'Bị động với Make, See, Hear: S + be made / seen + to V'
    ],
    theorySections: [
      {
        title: '1. Bị động cơ bản và Bị động với Động từ khiếm khuyết',
        subtitle: 'Quy tắc chuyển đổi thì cốt lõi',
        formula: [
          'Hiện tại đơn: S + am/is/are + V3/ed',
          'Hiện tại tiếp diễn: S + am/is/are + being + V3/ed',
          'Hiện tại hoàn thành: S + have/has + been + V3/ed',
          'Quá khứ đơn: S + was/were + V3/ed',
          'Động từ khiếm khuyết: S + Modal (can/will/must/should) + BE + V3/ed'
        ],
        rules: [
          {
            label: 'Xác định bị động',
            text: 'Khi chủ ngữ là ĐỐI TƯỢNG BỊ TÁC ĐỘNG bởi hành động (thường là sự vật, sự việc hoặc người nhận tác động), ta phải chia ở thể bị động.'
          }
        ],
        examples: [
          {
            en: 'The historical monument was severely damaged by the storm last week.',
            vi: 'Đài tưởng niệm lịch sử đã bị hư hại nặng nề do cơn bão tuần trước.',
            highlight: 'was severely damaged',
            note: 'Đài tưởng niệm bị tác động -> chia bị động quá khứ đơn.'
          },
          {
            en: 'These urgent files must be submitted before Friday afternoon.',
            vi: 'Những tập hồ sơ khẩn cấp này phải được nộp trước chiều thứ Sáu.',
            highlight: 'must be submitted',
            note: 'Modal verb + be + V3.'
          }
        ],
        examTips: [
          'Các nội động từ KHÔNG BAO GIỜ chia bị động: happen, occur, appear, disappear, die, arrive, remain, belong to.'
        ]
      },
      {
        title: '2. Các cấu trúc Bị động đặc biệt hay gặp nhất trong đề thi',
        subtitle: 'Bị động truyền khiến và Bị động động từ chỉ quan điểm',
        formula: [
          'Bị động truyền khiến: S + have + O(vật) + V3/ed | S + get + O(vật) + V3/ed',
          'Động từ quan điểm (cùng thì): S2 + is/are/was/were + said/believed/thought + TO V',
          'Động từ quan điểm (lệch thì / quá khứ trước): S2 + is/are + said + TO HAVE + V3/ed'
        ],
        rules: [
          {
            label: 'Cùng thì vs Lệch thì',
            text: 'Nếu mệnh đề sau xảy ra cùng thì với mệnh đề trước: dùng "to V". Nếu mệnh đề sau xảy ra TRƯỚC mệnh đề trước (ví dụ People SAY that he STOLE the money): dùng "to have V3" (He is said to have stolen the money).'
          }
        ],
        examples: [
          {
            en: 'I had my air conditioner serviced by an engineer yesterday.',
            vi: 'Hôm qua tôi đã thuê kỹ sư bảo dưỡng máy điều hòa của mình.',
            highlight: 'had my air conditioner serviced',
            note: 'Have + sth + V3/ed (nhờ ai làm việc gì cho mình).'
          },
          {
            en: 'The ancient pyramid is believed to have been built over four thousand years ago.',
            vi: 'Kim tự tháp cổ được cho là đã được xây dựng cách đây hơn bốn nghìn năm.',
            highlight: 'is believed to have been built',
            note: 'Hiện tại người ta tin (is believed), nhưng việc xây dựng diễn ra 4000 năm trước -> to have been built.'
          }
        ],
        examTips: [
          'Bị động của Make: "They made him apologize" -> "He was made TO apologize". Khi chuyển sang bị động, Make bắt buộc phải có TO V!'
        ]
      }
    ],
    questions: [
      {
        id: 'q9-1',
        question: 'The new environmental regulations _______ by the parliament at the end of last month.',
        options: {
          A: 'approved',
          B: 'were approved',
          C: 'have approved',
          D: 'were approving'
        },
        correctAnswer: 'B',
        explanation: 'Chủ ngữ "The new environmental regulations" (các quy định môi trường mới) là đối tượng bị tác động (được quốc hội thông qua). Mốc thời gian "at the end of last month" là quá khứ đơn -> chia bị động quá khứ đơn: "were approved".',
        clue: 'regulations (vật bị thông qua) + last month -> were approved',
        translation: 'Các quy định môi trường mới đã được quốc hội thông qua vào cuối tháng trước.'
      },
      {
        id: 'q9-2',
        question: 'The suspected thief is believed _______ the country using a forged passport yesterday.',
        options: {
          A: 'to flee',
          B: 'to have fled',
          C: 'having fled',
          D: 'fled'
        },
        correctAnswer: 'B',
        explanation: 'Cấu trúc bị động với động từ quan điểm: Hiện tại người ta tin ("is believed"), nhưng hành động bỏ trốn đã xảy ra trong quá khứ ("yesterday"). Hành động xảy ra trước mệnh đề chính -> dùng "to have + V3" (to have fled).',
        clue: 'is believed (hiện tại) + yesterday (quá khứ) -> to have V3',
        translation: 'Tên trộm bị tình nghi được cho là đã trốn khỏi đất nước bằng cách sử dụng hộ chiếu giả vào ngày hôm qua.'
      },
      {
        id: 'q9-3',
        question: 'My sister didn\'t have time to fix her laptop, so she had it _______ at a nearby repair shop.',
        options: {
          A: 'repair',
          B: 'repairing',
          C: 'repaired',
          D: 'to repair'
        },
        correctAnswer: 'C',
        explanation: 'Cấu trúc bị động truyền khiến: "have + sth + V3/ed" (thuê/nhờ đồ vật được sửa chữa) -> chọn "repaired".',
        clue: 'had it (laptop) + V3/ed',
        translation: 'Chị tôi không có thời gian sửa máy tính xách tay nên chị ấy đã mang nó đi sửa ở một cửa hàng gần nhà.'
      },
      {
        id: 'q9-4',
        question: 'During the harsh training course, the recruits were made _______ ten miles every single morning.',
        options: {
          A: 'run',
          B: 'to run',
          C: 'running',
          D: 'ran'
        },
        correctAnswer: 'B',
        explanation: 'Cấu trúc chủ động: "make sb do sth". Khi chuyển sang bị động: "be made TO DO sth" (bị bắt buộc phải làm gì) -> chọn "to run".',
        clue: 'be made + to V',
        translation: 'Trong suốt khóa huấn luyện khắc nghiệt, các tân binh bị bắt phải chạy mười dặm vào mỗi buổi sáng.'
      },
      {
        id: 'q9-5',
        question: 'A modern medical center is currently _______ in our neighborhood to serve local residents.',
        options: {
          A: 'building',
          B: 'been built',
          C: 'being built',
          D: 'built'
        },
        correctAnswer: 'C',
        explanation: 'Chủ ngữ là "A modern medical center" (trung tâm y tế hiện đại), có từ nhận biết "currently" (hiện tại). Cấu trúc bị động hiện tại tiếp diễn: "is + currently + being + V3/ed" -> chọn "being built".',
        clue: 'is currently + being + V3',
        translation: 'Một trung tâm y tế hiện đại hiện đang được xây dựng trong khu phố của chúng tôi để phục vụ người dân địa phương.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 10: ĐIỀU KIỆN
  // ==========================================
  {
    id: 'topic-10',
    topicNumber: 10,
    title: 'Chuyên đề 10: Điều kiện',
    shortTitle: 'Điều kiện',
    englishTitle: 'Conditionals & Wish',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trọng tâm',
    summary: 'Câu điều kiện loại 0, 1, 2, 3, điều kiện hỗn hợp, đảo ngữ câu điều kiện và các cấu trúc tương đương (Unless, But for, Provided that).',
    keyPoints: [
      'Loại 1: If + S + V(s/es), S + will + V (có thể xảy ra ở hiện tại/tương lai)',
      'Loại 2: If + S + V2/were, S + would + V (trái với hiện tại)',
      'Loại 3: If + S + had V3, S + would have V3 (trái với quá khứ)',
      'Đảo ngữ điều kiện: Should (loại 1), Were (loại 2), Had (loại 3)'
    ],
    theorySections: [
      {
        title: '1. Ba loại câu điều kiện cơ bản & Điều kiện hỗn hợp',
        subtitle: 'Bảng công thức đối chiếu',
        formula: [
          'Loại 1: If + S + V(hiện tại đơn), S + will / can / may + V(bare)',
          'Loại 2: If + S + V2/ed (to be dùng WERE cho mọi ngôi), S + would / could + V(bare)',
          'Loại 3: If + S + had + V3/ed, S + would / could + have + V3/ed',
          'Hỗn hợp (3-2): If + S + had + V3/ed, S + would + V(bare) NOW'
        ],
        rules: [
          {
            label: 'Điều kiện loại 2',
            text: 'Diễn tả giả định trái ngược với thực tế ở hiện tại. To be luôn dùng "WERE" cho tất cả các ngôi trong ngữ pháp chuẩn (If I were you...).'
          },
          {
            label: 'Điều kiện loại 3',
            text: 'Diễn tả giả định trái ngược với sự thật đã xảy ra trong quá khứ.'
          },
          {
            label: 'Điều kiện hỗn hợp 3-2',
            text: 'Giả định điều kiện trong quá khứ dẫn đến kết quả còn ảnh hưởng ở HIỆN TẠI (thường có từ nhận định "now", "today" ở vế chính).'
          }
        ],
        examples: [
          {
            en: 'If I were you, I would consult a professional career advisor before deciding.',
            vi: 'Nếu tôi là bạn, tôi sẽ tham khảo ý kiến của chuyên gia tư vấn hướng nghiệp trước khi quyết định.',
            highlight: 'If I were you, I would consult',
            note: 'Điều kiện loại 2 giả định trái hiện tại, to be dùng were.'
          },
          {
            en: 'If she had listened to my advice yesterday, she wouldn\'t be in such trouble now.',
            vi: 'Nếu hôm qua cô ấy nghe lời khuyên của tôi thì bây giờ cô ấy đã không gặp rắc rối thế này.',
            highlight: 'had listened ... wouldn\'t be ... now',
            note: 'Điều kiện hỗn hợp: vế If ở quá khứ (loại 3), vế chính ở hiện tại (loại 2 có "now").'
          }
        ],
        examTips: [
          'Unless = If... not: "Unless you work hard" = "If you don\'t work hard". Không dùng dạng phủ định sau Unless (Unless you don\'t work -> SAI).'
        ]
      },
      {
        title: '2. Đảo ngữ câu điều kiện & Cấu trúc tương đương',
        subtitle: 'Dạng phân hóa điểm 9+ thi THPTQG',
        formula: [
          'Đảo loại 1: SHOULD + S + V(bare), S + will + V',
          'Đảo loại 2: WERE + S + to-V (hoặc WERE + S + Adj/Noun), S + would + V',
          'Đảo loại 3: HAD + S + V3/ed, S + would have + V3/ed',
          'But for / Without + Noun/V-ing: Nếu không vì / Không có... (= If it weren\'t for / If it hadn\'t been for)'
        ],
        examples: [
          {
            en: 'Had I known about the cancellation earlier, I wouldn\'t have driven all the way there.',
            vi: 'Nếu tôi biết về việc hủy bỏ sớm hơn, tôi đã không lái xe suốt một quãng đường dài đến đó.',
            highlight: 'Had I known',
            note: 'Đảo ngữ điều kiện loại 3: Had + S + V3.'
          },
          {
            en: 'Were he to accept our proposal, the project would start immediately.',
            vi: 'Nếu anh ấy chấp nhận đề xuất của chúng tôi, dự án sẽ được khởi động ngay lập tức.',
            highlight: 'Were he to accept',
            note: 'Đảo ngữ điều kiện loại 2: Were + S + to V.'
          }
        ],
        examTips: [
          'Gặp câu bắt đầu bằng "Had + S + V3/ed" hoặc "Were + S...", hãy nhận ra ngay đây là ĐẢO NGỮ CÂU ĐIỀU KIỆN, không cần có từ "If"!'
        ]
      }
    ],
    questions: [
      {
        id: 'q10-1',
        question: 'If the weather _______ favorable tomorrow, we will organize an outdoor picnic for the class.',
        options: {
          A: 'is',
          B: 'was',
          C: 'were',
          D: 'will be'
        },
        correctAnswer: 'A',
        explanation: 'Vế chính dùng "will organize" (tương lai đơn), diễn tả sự việc có thể xảy ra ngày mai -> Câu điều kiện loại 1. Mệnh đề If chia ở hiện tại đơn: "is". Tuyệt đối không dùng "will be" trong mệnh đề If.',
        clue: 'will organize (vế chính) -> điều kiện loại 1 -> hiện tại đơn',
        translation: 'Nếu ngày mai thời tiết thuận lợi, chúng tôi sẽ tổ chức một buổi dã ngoại ngoài trời cho cả lớp.'
      },
      {
        id: 'q10-2',
        question: 'If I had possessed enough financial resources back then, I _______ my own business.',
        options: {
          A: 'will start',
          B: 'would start',
          C: 'would have started',
          D: 'had started'
        },
        correctAnswer: 'C',
        explanation: 'Mệnh đề If chia ở quá khứ hoàn thành "had possessed" kết hợp với mốc thời gian "back then" (hồi đó/quá khứ) -> Câu điều kiện loại 3. Mệnh đề chính bắt buộc có dạng "would have + V3" -> chọn "would have started".',
        clue: 'had possessed (quá khứ hoàn thành) -> would have V3',
        translation: 'Nếu hồi đó tôi có đủ nguồn lực tài chính, tôi đã khởi nghiệp kinh doanh của riêng mình rồi.'
      },
      {
        id: 'q10-3',
        question: '_______ you encounter any unexpected difficulties, please do not hesitate to contact our technical support.',
        options: {
          A: 'Were',
          B: 'Should',
          C: 'Had',
          D: 'Unless'
        },
        correctAnswer: 'B',
        explanation: 'Đảo ngữ câu điều kiện loại 1: "Should + S + V(bare), S + will/can + V hoặc câu mệnh lệnh". Động từ "encounter" ở dạng nguyên mẫu -> chọn "Should".',
        clue: 'Should + S + V(bare) (đảo ngữ loại 1)',
        translation: 'Nếu bạn gặp phải bất kỳ khó khăn bất ngờ nào, xin đừng ngần ngại liên hệ với bộ phận hỗ trợ kỹ thuật của chúng tôi.'
      },
      {
        id: 'q10-4',
        question: '_______ the prompt intervention of the doctors, the patient would not have survived the surgery.',
        options: {
          A: 'Unless',
          B: 'Provided that',
          C: 'But for',
          D: 'In case'
        },
        correctAnswer: 'C',
        explanation: 'Phía sau là cụm danh từ "the prompt intervention..." và vế sau có "would not have survived" (loại 3). Cấu trúc: "But for + N = If it hadn\'t been for + N" (Nếu không nhờ có...) -> chọn "But for". Unless phải đi với mệnh đề S + V.',
        clue: 'But for + Cụm danh từ, S + would (have) V',
        translation: 'Nếu không nhờ sự can thiệp kịp thời của các bác sĩ, bệnh nhân đã không thể qua khỏi ca phẫu thuật.'
      },
      {
        id: 'q10-5',
        question: 'If he _______ his flight yesterday, he would be attending the symposium with us right now.',
        options: {
          A: 'didn\'t miss',
          B: 'hadn\'t missed',
          C: 'doesn\'t miss',
          D: 'hasn\'t missed'
        },
        correctAnswer: 'B',
        explanation: 'Hành động lỡ chuyến bay xảy ra ở quá khứ ("yesterday"), nhưng kết quả tham dự hội nghị là ở hiện tại ("right now"). Đây là câu điều kiện HỖN HỢP (loại 3 - 2). Mệnh đề If giả định trái quá khứ -> chia quá khứ hoàn thành "hadn\'t missed".',
        clue: 'yesterday (loại 3) kết hợp right now (loại 2) -> If + had V3',
        translation: 'Nếu hôm qua anh ấy không bị lỡ chuyến bay thì ngay lúc này anh ấy đã đang cùng tham dự hội nghị chuyên đề với chúng ta rồi.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 11: KHIẾM KHUYẾT (MODAL VERBS)
  // ==========================================
  {
    id: 'topic-11',
    topicNumber: 11,
    title: 'Chuyên đề 11: Khiếm khuyết',
    shortTitle: 'Khiếm khuyết',
    englishTitle: 'Modal Verbs & Modal Perfect',
    badge: 'Trọng tâm 100%',
    difficulty: 'Nâng cao',
    summary: 'Động từ khuyết thiếu cơ bản (Must, Have to, Should, Can, May) và đặc biệt là Khuyết thiếu hoàn thành (Modal + have + V3) để suy đoán quá khứ.',
    keyPoints: [
      'Phân biệt Mustn\'t (cấm đoán) vs Don\'t have to / Needn\'t (không bắt buộc)',
      'Must have + V3: chắc hẳn đã (suy đoán chắc chắn trong quá khứ có bằng chứng)',
      'Can\'t have + V3: chắc chắn không thể đã xảy ra',
      'Should have + V3: lẽ ra nên làm (nhưng thực tế đã không làm)'
    ],
    theorySections: [
      {
        title: '1. Khuyết thiếu cơ bản: Bắt buộc, Khuyên nhủ & Cấm đoán',
        subtitle: 'Phân biệt sắc thái ngữ nghĩa',
        formula: [
          'Bắt buộc: MUST (tự bản thân thấy cần) | HAVE TO (luật lệ, nội quy khách quan)',
          'Cấm đoán: MUSTN\'T + V (tuyệt đối không được phép làm)',
          'Không cần thiết: DON\'T HAVE TO / NEEDN\'T + V (không bắt buộc, thích thì làm)',
          'Khuyên bảo: SHOULD / OUGHT TO / HAD BETTER + V (nên làm gì)'
        ],
        examples: [
          {
            en: 'You mustn\'t use your phone during the official examination.',
            vi: 'Bạn tuyệt đối không được sử dụng điện thoại trong giờ thi chính thức.',
            highlight: 'mustn\'t use',
            note: 'Mustn\'t = mang tính cấm đoán tuyệt đối theo quy chế thi.'
          },
          {
            en: 'Tomorrow is Sunday, so we don\'t have to get up early.',
            vi: 'Mai là Chủ nhật nên chúng tôi không cần phải dậy sớm.',
            highlight: 'don\'t have to get up',
            note: 'Không có tính bắt buộc, tùy ý lựa chọn.'
          }
        ],
        examTips: [
          'Bẫy hay gặp: Đề bài cho "It is against the rules to..." (Trái quy định) -> Viết lại câu dùng MUSTN\'T. Đề cho "It is not necessary to..." (Không cần thiết) -> Viết lại câu dùng NEEDN\'T / DON\'T HAVE TO.'
        ]
      },
      {
        title: '2. Động từ khuyết thiếu hoàn thành (Modal + Have + V3)',
        subtitle: 'Chủ điểm kiểm tra suy luận quá khứ luôn có mặt trong đề thi',
        formula: [
          'MUST HAVE + V3: Chắc hẳn là đã (suy đoán gần như 100% dựa trên căn cứ rõ ràng)',
          'CAN\'T / COULDN\'T HAVE + V3: Chắc chắn là đã KHÔNG THỂ (phủ định suy đoán có bằng chứng)',
          'SHOULD HAVE + V3: Lẽ ra nên làm trong quá khứ (nhưng thực tế đã không làm -> tiếc nuối)',
          'SHOULDN\'T HAVE + V3: Lẽ ra không nên làm (nhưng thực tế đã lỡ làm rồi -> ân hận)',
          'NEEDN\'T HAVE + V3: Lẽ ra không cần làm (nhưng đã làm vô ích tốn công)'
        ],
        examples: [
          {
            en: 'The ground is soaking wet; it must have rained heavily last night.',
            vi: 'Mặt đất ướt sũng; đêm qua chắc hẳn trời đã mưa rất to.',
            highlight: 'must have rained',
            note: 'Bằng chứng mặt đất ướt sũng -> suy đoán chắc chắn ở quá khứ dùng Must have V3.'
          },
          {
            en: 'You should have reviewed your notes before taking the entrance test.',
            vi: 'Lẽ ra bạn nên ôn lại các ghi chú trước khi làm bài thi đầu vào (thực tế bạn đã không ôn).',
            highlight: 'should have reviewed',
            note: 'Diễn tả sự tiếc nuối / trách móc việc không làm trong quá khứ.'
          }
        ],
        examTips: [
          'Không bao giờ dùng "Mustn\'t have V3" để suy đoán phủ định! Để suy đoán "chắc chắn đã không làm", BẮT BUỘC dùng CAN\'T HAVE V3 hoặc COULDN\'T HAVE V3!'
        ]
      }
    ],
    questions: [
      {
        id: 'q11-1',
        question: 'Jack was absent from school today. He _______ ill because he didn\'t answer any calls.',
        options: {
          A: 'must be',
          B: 'must have been',
          C: 'can be',
          D: 'should have been'
        },
        correctAnswer: 'B',
        explanation: 'Sự việc xảy ra trong quá khứ ("was absent", "didn\'t answer"). Người nói suy đoán có cơ sở chắc chắn về một sự việc đã diễn ra trong quá khứ -> dùng "must have + V3" (must have been).',
        clue: 'was absent + didn\'t answer (quá khứ) -> must have V3',
        translation: 'Hôm nay Jack đã vắng học. Chắc hẳn cậu ấy đã bị ốm vì cậu ấy không nghe bất kỳ cuộc gọi nào.'
      },
      {
        id: 'q11-2',
        question: 'Tom _______ that expensive vase because he was standing on the other side of the room.',
        options: {
          A: 'must have broken',
          B: 'shouldn\'t have broken',
          C: 'can\'t have broken',
          D: 'needn\'t have broken'
        },
        correctAnswer: 'C',
        explanation: 'Có căn cứ rõ ràng: Tom đang đứng ở phía bên kia của căn phòng, do đó anh ta "chắc chắn không thể nào đã làm vỡ" chiếc bình đắt tiền đó -> dùng "can\'t have + V3".',
        clue: 'standing on other side -> can\'t have broken (chắc chắn không thể)',
        translation: 'Tom chắc chắn không thể nào đã làm vỡ chiếc bình hoa đắt tiền đó vì cậu ấy đứng ở tít phía bên kia phòng.'
      },
      {
        id: 'q11-3',
        question: 'You _______ the essay; the teacher had already cancelled the assignment yesterday.',
        options: {
          A: 'mustn\'t write',
          B: 'needn\'t have written',
          C: 'couldn\'t write',
          D: 'might not write'
        },
        correctAnswer: 'B',
        explanation: 'Hành động viết bài đã được thực hiện xong, nhưng thực ra là việc không cần thiết vì giáo viên đã hủy bài tập từ hôm qua -> dùng "needn\'t have + V3" (lẽ ra đã không cần làm).',
        clue: 'đã làm một việc không cần thiết -> needn\'t have V3',
        translation: 'Lẽ ra bạn không cần phải viết bài luận đó; giáo viên đã hủy bài tập đó từ hôm qua rồi.'
      },
      {
        id: 'q11-4',
        question: 'According to library regulations, visitors _______ talk loudly or consume food inside the reading hall.',
        options: {
          A: 'don\'t have to',
          B: 'mustn\'t',
          C: 'needn\'t',
          D: 'won\'t'
        },
        correctAnswer: 'B',
        explanation: 'Căn cứ vào nội quy thư viện ("library regulations"), việc nói to hoặc ăn uống là hành vi "bị cấm đoán" -> dùng "mustn\'t".',
        clue: 'regulations (nội quy) -> mang tính cấm đoán (mustn\'t)',
        translation: 'Theo nội quy thư viện, bạn đọc tuyệt đối không được nói chuyện lớn tiếng hoặc ăn uống bên trong phòng đọc.'
      },
      {
        id: 'q11-5',
        question: 'I feel terribly exhausted today. I _______ up so late watching that football match last night.',
        options: {
          A: 'shouldn\'t have stayed',
          B: 'mustn\'t stay',
          C: 'can\'t have stayed',
          D: 'needn\'t stay'
        },
        correctAnswer: 'A',
        explanation: 'Người nói cảm thấy mệt mỏi và hối hận vì đêm qua ("last night") đã thức quá khuya xem bóng đá. Diễn tả sự hối hận về một việc lẽ ra không nên làm trong quá khứ -> dùng "shouldn\'t have + V3".',
        clue: 'last night + hối hận vì đã làm -> shouldn\'t have V3',
        translation: 'Hôm nay tôi thấy kiệt sức vô cùng. Lẽ ra tối qua tôi không nên thức khuya như thế để xem trận bóng đá đó.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 12: LIÊN TỪ VÀ MỆNH ĐỀ TRẠNG NGỮ
  // ==========================================
  {
    id: 'topic-12',
    topicNumber: 12,
    title: 'Chuyên đề 12: Liên từ và mệnh đề trạng ngữ',
    shortTitle: 'Liên từ & MĐ trạng ngữ',
    englishTitle: 'Conjunctions & Adverbial Clauses',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trọng tâm',
    summary: 'Mệnh đề chỉ sự nhượng bộ (Although vs Despite), nguyên nhân (Because vs Because of), mục đích (So that vs In order to), và kết quả (So... that).',
    keyPoints: [
      'Although / Even though + S + V = Despite / In spite of + N / V-ing',
      'Because / Since / As + S + V = Because of / Due to / Owing to + N / V-ing',
      'So that / In order that + S + modal + V = In order to / So as to + V',
      'So + Adj/Adv + that vs Such + (a/an) + Adj + N + that'
    ],
    theorySections: [
      {
        title: '1. Nhượng bộ & Nguyên nhân: Mệnh đề (Clause) vs Cụm từ (Phrase)',
        subtitle: 'Bí kíp chuyển đổi tương đương không bao giờ sai',
        formula: [
          'Nhượng bộ: Although / Even though / Though + S + V = Despite / In spite of + Noun phrase / V-ing',
          'Nguyên nhân: Because / Since / As + S + V = Because of / Due to / Owing to + Noun phrase / V-ing'
        ],
        rules: [
          {
            label: 'Cách nhận diện',
            text: 'Nhìn phía sau chỗ trống: Nếu có Chủ ngữ và Động từ chia thì (S + V) -> chọn Although / Because. Nếu chỉ là Cụm danh từ hoặc Danh động từ (Noun / V-ing) mà không có động từ chính -> chọn Despite / In spite of / Because of.'
          }
        ],
        examples: [
          {
            en: 'Although the traffic was terribly congested, we arrived at the concert on time.',
            vi: 'Mặc dù giao thông tắc nghẽn khủng khiếp, chúng tôi vẫn đến buổi hòa nhạc đúng giờ.',
            highlight: 'Although the traffic was...',
            note: 'Sau Although có S (the traffic) + V (was).'
          },
          {
            en: 'Despite the heavy rain, the football match went ahead as scheduled.',
            vi: 'Bất chấp trời mưa nặng hạt, trận bóng đá vẫn diễn ra theo kế hoạch.',
            highlight: 'Despite the heavy rain',
            note: 'Sau Despite chỉ là cụm danh từ (the heavy rain).'
          }
        ],
        examTips: [
          'Cẩn thận cụm "Despite the fact that + S + V": Khi có "the fact that", phía sau lại là một MỆNH ĐỀ đầy đủ S + V!'
        ]
      },
      {
        title: '2. Mệnh đề chỉ Kết quả: So... that & Such... that',
        subtitle: 'Quá... đến nỗi mà...',
        formula: [
          'SO: S + V + SO + Adj / Adv + THAT + S + V',
          'SUCH: S + V + SUCH + (a/an) + Adj + Noun + THAT + S + V',
          'Đảo ngữ với So/Such: So + Adj + be + S + that... | Such + be + N + that...'
        ],
        examples: [
          {
            en: 'The lecture was so captivating that nobody noticed the time passing.',
            vi: 'Bài giảng cuốn hút đến nỗi mà không ai nhận ra thời gian đang trôi qua.',
            highlight: 'so captivating that',
            note: 'So + Tính từ (captivating) + that.'
          },
          {
            en: 'It was such a complicated question that only two students could answer it.',
            vi: 'Đó là một câu hỏi phức tạp đến nỗi chỉ có hai học sinh trả lời được.',
            highlight: 'such a complicated question that',
            note: 'Such + a + Adj (complicated) + N (question) + that.'
          }
        ],
        examTips: [
          'Tránh nhầm: Nếu danh từ là số nhiều hoặc không đếm được, sau SUCH sẽ KHÔNG có mạo từ a/an (such delicious food that...).'
        ]
      }
    ],
    questions: [
      {
        id: 'q12-1',
        question: '_______ his severe visual impairment, he graduated from university with top honors.',
        options: {
          A: 'Although',
          B: 'Despite',
          C: 'Because',
          D: 'Because of'
        },
        correctAnswer: 'B',
        explanation: 'Phía sau chỗ trống là cụm danh từ "his severe visual impairment" (sự suy giảm thị lực nghiêm trọng của anh ấy) chứ không phải mệnh đề S + V. Ngữ cảnh mang nghĩa nhượng bộ tương phản (bị suy giảm thị lực nhưng vẫn tốt nghiệp thủ khoa) -> chọn "Despite".',
        clue: 'Cụm danh từ + ý nhượng bộ -> Despite',
        translation: 'Bất chấp sự suy giảm thị lực nghiêm trọng của mình, anh ấy đã tốt nghiệp đại học với thành tích thủ khoa.'
      },
      {
        id: 'q12-2',
        question: 'The flight to London had to be diverted _______ the adverse weather conditions over the airport.',
        options: {
          A: 'because',
          B: 'because of',
          C: 'although',
          D: 'in spite of'
        },
        correctAnswer: 'B',
        explanation: 'Ngữ cảnh nói về nguyên nhân chuyến bay phải đổi hướng do thời tiết bất lợi. Phía sau là cụm danh từ "the adverse weather conditions..." -> dùng "because of".',
        clue: 'Cụm danh từ + nguyên nhân -> because of',
        translation: 'Chuyến bay đến London đã phải chuyển hướng vì điều kiện thời tiết bất lợi phía trên sân bay.'
      },
      {
        id: 'q12-3',
        question: 'The seminar was _______ boring that many attendees fell asleep halfway through.',
        options: {
          A: 'so',
          B: 'such',
          C: 'too',
          D: 'very'
        },
        correctAnswer: 'A',
        explanation: 'Cấu trúc "so + Adj + that + S + V" (quá... đến nỗi mà). "Boring" là tính từ đứng độc lập trước "that" -> chọn "so". Nếu có danh từ đi kèm (such a boring seminar that...) thì mới dùng such.',
        clue: 'so + Adj (boring) + that',
        translation: 'Buổi hội thảo tẻ nhạt đến nỗi nhiều người tham dự đã ngủ gật ngay giữa chừng.'
      },
      {
        id: 'q12-4',
        question: 'She turned off her phone notifications _______ she could concentrate completely on her revision.',
        options: {
          A: 'in order to',
          B: 'so that',
          C: 'because of',
          D: 'as a result'
        },
        correctAnswer: 'B',
        explanation: 'Phía sau là một mệnh đề chỉ mục đích có modal verb: "she could concentrate...". Cấu trúc: "so that + S + can/could + V" (để mà) -> chọn "so that". "In order to" phải đi trực tiếp với động từ nguyên mẫu (in order to concentrate).',
        clue: 'mệnh đề chỉ mục đích (S + could + V) -> so that',
        translation: 'Cô ấy tắt thông báo điện thoại để cô ấy có thể tập trung hoàn toàn vào việc ôn tập.'
      },
      {
        id: 'q12-5',
        question: '_______ she had practiced her presentation repeatedly, she still felt nervous on stage.',
        options: {
          A: 'Even though',
          B: 'In spite of',
          C: 'Because',
          D: 'Since'
        },
        correctAnswer: 'A',
        explanation: 'Phía sau là mệnh đề đầy đủ: S (she) + V (had practiced). Ngữ cảnh mang nghĩa nhượng bộ (dù đã luyện tập nhiều lần nhưng vẫn hồi hộp) -> chọn "Even though".',
        clue: 'Mệnh đề S + V + nghĩa nhượng bộ -> Even though',
        translation: 'Mặc dù cô ấy đã luyện tập bài thuyết trình của mình nhiều lần, cô ấy vẫn cảm thấy hồi hộp khi bước lên sân khấu.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 13: TRẠNG TỪ LIÊN KẾT
  // ==========================================
  {
    id: 'topic-13',
    topicNumber: 13,
    title: 'Chuyên đề 13: Trạng từ liên kết',
    shortTitle: 'Trạng từ liên kết',
    englishTitle: 'Conjunctive Adverbs (Linking Adverbs)',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trung bình',
    summary: 'Cách dùng các trạng từ nối câu: However, Therefore, Moreover, Furthermore, Otherwise, Consequently và quy tắc dấu câu.',
    keyPoints: [
      'Quy tắc dấu câu: S1 + V1. However, S2 + V2 hoặc S1 + V1; however, S2 + V2',
      'Nhóm tương phản: However, Nevertheless, Nonetheless, On the other hand',
      'Nhóm nguyên nhân - hệ quả: Therefore, Consequently, As a result, Thus',
      'Nhóm bổ sung thông tin: Furthermore, Moreover, In addition, Besides'
    ],
    theorySections: [
      {
        title: '1. Phân nhóm Trạng từ liên kết theo chức năng',
        subtitle: 'Bảng từ vựng liên kết thi tốt nghiệp THPT',
        rules: [
          {
            label: 'Tương phản / Nhượng bộ',
            text: 'However (tuy nhiên), Nevertheless / Nonetheless (dẫu vậy, tuy thế), On the contrary (ngược lại), In contrast / By contrast (trái lại).'
          },
          {
            label: 'Kết quả / Hệ quả',
            text: 'Therefore (vì vậy), Consequently (hậu quả là, kết quả là), As a result (kết quả là), Thus / Hence (do đó).'
          },
          {
            label: 'Bổ sung thông tin',
            text: 'Furthermore / Moreover (hơn nữa, vả lại), In addition / Additionally (thêm vào đó), Besides (bên cạnh đó).'
          },
          {
            label: 'Điều kiện / Thay thế',
            text: 'Otherwise (nếu không thì), Alternatively (hoặc là, như một giải pháp thay thế), Instead (thay vào đó).'
          }
        ],
        examples: [
          {
            en: 'The company faced severe financial losses. However, it refused to lay off any workers.',
            vi: 'Công ty phải đối mặt với những tổn thất tài chính nghiêm trọng. Tuy nhiên, họ từ chối sa thải bất kỳ công nhân nào.',
            highlight: '. However,',
            note: 'However đứng sau dấu chấm và có dấu phẩy đi kèm thể hiện sự tương phản.'
          },
          {
            en: 'You must submit the application before 5 PM; otherwise, it will not be processed.',
            vi: 'Bạn phải nộp đơn trước 5 giờ chiều; nếu không thì nó sẽ không được xử lý.',
            highlight: '; otherwise,',
            note: 'Otherwise thể hiện hệ quả xấu nếu điều kiện không được thỏa mãn.'
          }
        ],
        examTips: [
          'Phân biệt với liên từ phụ thuộc: "Although" đi liền với mệnh đề và KHÔNG có dấu phẩy ngay sau nó (Although it rained, we went out). Còn "However" thường đứng độc lập kèm dấu phẩy (It rained. However, we went out).'
        ]
      }
    ],
    questions: [
      {
        id: 'q13-1',
        question: 'Solar energy is completely renewable and eco-friendly. _______, the initial installation cost remains relatively high.',
        options: {
          A: 'However',
          B: 'Therefore',
          C: 'Furthermore',
          D: 'Consequently'
        },
        correctAnswer: 'A',
        explanation: 'Câu trước nêu ưu điểm (năng lượng tái tạo thân thiện), câu sau nêu nhược điểm (chi phí lắp đặt ban đầu cao). Mối quan hệ tương phản giữa 2 câu độc lập có dấu chấm và dấu phẩy -> chọn "However" (tuy nhiên).',
        clue: 'Ý trước khen, ý sau chê -> tương phản (However)',
        translation: 'Năng lượng mặt trời hoàn toàn có thể tái tạo và thân thiện với môi trường. Tuy nhiên, chi phí lắp đặt ban đầu vẫn còn tương đối cao.'
      },
      {
        id: 'q13-2',
        question: 'The factory failed to comply with environmental regulations. _______, it was heavily fined by the authorities.',
        options: {
          A: 'Nevertheless',
          B: 'Consequently',
          C: 'Moreover',
          D: 'Otherwise'
        },
        correctAnswer: 'B',
        explanation: 'Câu trước nêu nguyên nhân (nhà máy không tuân thủ quy định môi trường), câu sau nêu kết quả (bị chính quyền phạt nặng). Mối quan hệ nhân quả -> chọn "Consequently" (kết quả là / do đó).',
        clue: 'vi phạm quy định -> bị phạt (quan hệ hệ quả -> Consequently)',
        translation: 'Nhà máy đã không tuân thủ các quy định về môi trường. Do đó, nó đã bị các cơ quan chức năng phạt nặng.'
      },
      {
        id: 'q13-3',
        question: 'Regular physical exercise strengthens cardiovascular health. _______, it significantly improves mental well-being.',
        options: {
          A: 'In addition',
          B: 'Otherwise',
          C: 'However',
          D: 'Instead'
        },
        correctAnswer: 'A',
        explanation: 'Câu trước nêu lợi ích thể chất, câu sau bổ sung thêm một lợi ích tinh thần khác của việc tập thể dục. Mối quan hệ bổ sung thông tin tích cực -> chọn "In addition" (thêm vào đó).',
        clue: 'Bổ sung thêm lợi ích thứ hai -> In addition',
        translation: 'Tập thể dục thường xuyên giúp tăng cường sức khỏe tim mạch. Thêm vào đó, nó cải thiện đáng kể sức khỏe tinh thần.'
      },
      {
        id: 'q13-4',
        question: 'You must save your changes frequently; _______, you might lose all your unsaved work in case of a sudden power outage.',
        options: {
          A: 'furthermore',
          B: 'otherwise',
          C: 'therefore',
          D: 'nevertheless'
        },
        correctAnswer: 'B',
        explanation: 'Cấu trúc khuyên làm gì; "otherwise" (nếu không thì) sẽ xảy ra hậu quả xấu. "Save your changes... otherwise, you might lose..." -> chọn "otherwise".',
        clue: 'phải làm gì; nếu không thì (otherwise)...',
        translation: 'Bạn phải thường xuyên lưu lại các thay đổi của mình; nếu không thì bạn có thể mất toàn bộ bài làm chưa lưu phòng khi mất điện đột ngột.'
      },
      {
        id: 'q13-5',
        question: 'The new smartphone has an impressive battery life and a stunning camera. _______, its pricing is exceptionally competitive.',
        options: {
          A: 'Moreover',
          B: 'However',
          C: 'Consequently',
          D: 'Otherwise'
        },
        correctAnswer: 'A',
        explanation: 'Câu trước đã khen pin trâu, camera đẹp; câu sau tiếp tục khen thêm điểm cộng về giá bán cạnh tranh. Quan hệ bổ sung thêm điểm mạnh -> chọn "Moreover" (hơn nữa / vả lại).',
        clue: 'Bổ sung thêm ưu điểm -> Moreover',
        translation: 'Chiếc điện thoại thông minh mới có thời lượng pin ấn tượng và camera tuyệt đẹp. Hơn nữa, mức giá của nó cũng đặc biệt cạnh tranh.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 14: MỆNH ĐỀ QUAN HỆ (MĐQH)
  // ==========================================
  {
    id: 'topic-14',
    topicNumber: 14,
    title: 'Chuyên đề 14: MĐQH',
    shortTitle: 'MĐQH',
    englishTitle: 'Relative Clauses',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trọng tâm',
    summary: 'Đại từ quan hệ (Who, Whom, Which, That, Whose), trạng từ quan hệ (Where, When, Why), mệnh đề xác định và không xác định.',
    keyPoints: [
      'Who (người làm S/O), Whom (người làm O), Which (vật làm S/O), Whose (+ Noun chỉ sở hữu)',
      'That: dùng thay cho Who, Whom, Which trong MĐ xác định; cấm dùng sau dấu phẩy và giới từ',
      'Sau giới từ chỉ được dùng WHOM (người) hoặc WHICH (vật)',
      'Mệnh đề không xác định (có dấu phẩy): bổ nghĩa cho danh từ riêng hoặc danh từ đã xác định'
    ],
    theorySections: [
      {
        title: '1. Hệ thống Đại từ & Trạng từ quan hệ',
        subtitle: 'Bảng đối chiếu chức năng ngữ pháp',
        rules: [
          { label: 'WHO', text: 'Thay thế cho danh từ chỉ NGƯỜI làm Chủ ngữ (Who + V) hoặc Tân ngữ (Who + S + V).' },
          { label: 'WHOM', text: 'Thay thế cho danh từ chỉ NGƯỜI làm Tân ngữ (Whom + S + V). Bắt buộc dùng Whom khi đứng ngay sau GIỚI TỪ (to whom, with whom).' },
          { label: 'WHICH', text: 'Thay thế cho danh từ chỉ VẬT làm Chủ ngữ hoặc Tân ngữ. Đứng sau dấu phẩy để thay thế cho TOÀN BỘ Ý CỦA CÂU ĐỨNG TRƯỚC.' },
          { label: 'WHOSE', text: 'Chỉ sở hữu cho người hoặc vật. Cấu trúc: N(chủ sở hữu) + WHOSE + N(vật sở hữu) + V.' },
          { label: 'THAT', text: 'Thay cho người và vật trong mệnh đề quan hệ xác định. Bắt buộc dùng sau tiền từ hỗn hợp (cả người lẫn vật), so sánh nhất, the only, the first, all, nothing...' },
          { label: 'WHERE / WHEN / WHY', text: 'Where = in/at which (nơi chốn); When = on/in which (thời gian); Why = for which (lí do).' }
        ],
        examples: [
          {
            en: 'The scientist whose breakthrough research won the Nobel Prize is giving a speech today.',
            vi: 'Nhà khoa học có nghiên cứu mang tính đột phá đoạt giải Nobel đang có bài phát biểu hôm nay.',
            highlight: 'whose breakthrough research',
            note: 'Whose đứng giữa danh từ chỉ người (scientist) và danh từ sở hữu (research).'
          },
          {
            en: 'He failed his driving test three times, which disappointed his parents deeply.',
            vi: 'Anh ấy trượt bài thi lái xe ba lần, điều này làm cha mẹ anh vô cùng thất vọng.',
            highlight: ', which disappointed',
            note: 'Which đứng sau dấu phẩy thay thế cho cả việc trượt thi 3 lần.'
          }
        ],
        examTips: [
          '2 ĐIỀU CẤM KỴ KHI DÙNG "THAT":\n1. KHÔNG dùng "that" trong mệnh đề có dấu phẩy (mệnh đề không xác định).\n2. KHÔNG dùng "that" ngay sau giới từ (in that, with that -> SAI trong MĐQH).'
        ]
      }
    ],
    questions: [
      {
        id: 'q14-1',
        question: 'The professor _______ lecture on climate change attracted hundreds of students is an expert from Oxford.',
        options: {
          A: 'who',
          B: 'whose',
          C: 'whom',
          D: 'which'
        },
        correctAnswer: 'B',
        explanation: 'Phía trước là danh từ chỉ người "The professor", phía sau là danh từ "lecture" (bài giảng của vị giáo sư). Mối quan hệ sở hữu: "professor\'s lecture" -> dùng đại từ sở hữu "whose".',
        clue: 'professor + whose + lecture',
        translation: 'Vị giáo sư có bài giảng về biến đổi khí hậu thu hút hàng trăm sinh viên là một chuyên gia đến từ Oxford.'
      },
      {
        id: 'q14-2',
        question: 'The scholarship committee selected five exceptional students, all of _______ had demonstrated outstanding leadership skills.',
        options: {
          A: 'who',
          B: 'whom',
          C: 'which',
          D: 'that'
        },
        correctAnswer: 'B',
        explanation: 'Sau giới từ "of" thay thế cho danh từ chỉ người ("five exceptional students") bắt buộc phải dùng "whom" (all of whom). Không được dùng who hoặc that sau giới từ.',
        clue: 'all of + whom (chỉ người sau giới từ)',
        translation: 'Hội đồng học bổng đã chọn ra năm học sinh xuất sắc, tất cả họ đều đã thể hiện kỹ năng lãnh đạo nổi bật.'
      },
      {
        id: 'q14-3',
        question: 'She passed all four entry exams with flying colors, _______ made her family exceedingly proud.',
        options: {
          A: 'that',
          B: 'who',
          C: 'which',
          D: 'what'
        },
        correctAnswer: 'C',
        explanation: 'Đại từ quan hệ đứng sau dấu phẩy để thay thế cho TOÀN BỘ SỰ VIỆC ở mệnh đề phía trước (việc cô ấy đỗ cả 4 bài thi điểm cao) -> bắt buộc dùng "which". Không dùng "that" sau dấu phẩy.',
        clue: ', which + V (thay thế cho cả mệnh đề)',
        translation: 'Cô ấy đã vượt qua cả bốn bài thi đầu vào với kết quả xuất sắc, điều này làm gia đình cô vô cùng tự hào.'
      },
      {
        id: 'q14-4',
        question: 'Neil Armstrong was the first astronaut _______ set foot on the surface of the Moon.',
        options: {
          A: 'that',
          B: 'which',
          C: 'whose',
          D: 'whom'
        },
        correctAnswer: 'A',
        explanation: 'Sau các từ chỉ số thứ tự như "the first", "the second", "the only", "so sánh nhất", đại từ quan hệ ưu tiên sử dụng là "that" (hoặc rút gọn thành to V). Ở đây có động từ "set" nên chọn "that".',
        clue: 'the first astronaut + that',
        translation: 'Neil Armstrong là phi hành gia đầu tiên đặt chân lên bề mặt Mặt Trăng.'
      },
      {
        id: 'q14-5',
        question: 'The historic town _______ we spent our summer vacation two years ago has changed dramatically.',
        options: {
          A: 'which',
          B: 'where',
          C: 'what',
          D: 'when'
        },
        correctAnswer: 'B',
        explanation: 'Tiền từ là địa điểm "The historic town", mệnh đề sau có cấu trúc "we spent our summer vacation [in the town]". Cần trạng từ quan hệ chỉ nơi chốn (= in which) -> chọn "where".',
        clue: 'town + where + S + V (trạng từ quan hệ nơi chốn)',
        translation: 'Thị trấn lịch sử nơi chúng tôi đã trải qua kỳ nghỉ hè hai năm trước đã thay đổi một cách đáng kinh ngạc.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 15: RÚT GỌN MĐQH
  // ==========================================
  {
    id: 'topic-15',
    topicNumber: 15,
    title: 'Chuyên đề 15: Rút gọn MĐQH',
    shortTitle: 'Rút gọn MĐQH',
    englishTitle: 'Reduced Relative Clauses',
    badge: 'Trọng tâm 100%',
    difficulty: 'Trọng tâm',
    summary: 'Bí kíp rút gọn mệnh đề quan hệ bằng Hiện tại phân từ (V-ing), Quá khứ phân từ (V3/ed), Động từ nguyên mẫu (To-V) và Cụm danh từ.',
    keyPoints: [
      'Rút gọn bằng V-ing khi mệnh đề mang nghĩa CHỦ ĐỘNG',
      'Rút gọn bằng V3/ed khi mệnh đề mang nghĩa BỊ ĐỘNG',
      'Rút gọn bằng To-V khi danh từ có: the first, the second, the only, the last, so sánh nhất',
      'Mẹo phân biệt câu đã có động từ chính để không chọn nhầm thì thông thường'
    ],
    theorySections: [
      {
        title: '1. Ba phương pháp rút gọn mệnh đề quan hệ chủ chốt',
        subtitle: 'Công thức giải nhanh trong vòng 10 giây',
        formula: [
          'Chủ động: N + who/which + V -> N + V-ING (The boy sitting next to me...)',
          'Bị động: N + which/who + be + V3/ed -> N + V3/ED (The bridge built in 2020...)',
          'Sau the first/last/only/so sánh nhất: N + TO-V / TO BE V3 (The first person to arrive...)'
        ],
        rules: [
          {
            label: '1. V-ing (Hiện tại phân từ)',
            text: 'Áp dụng khi đại từ quan hệ làm chủ ngữ và động từ ở thể CHỦ ĐỘNG. Ví dụ: The students WHO ATTEND this course -> The students ATTENDING this course.'
          },
          {
            label: '2. V3/ed (Quá khứ phân từ)',
            text: 'Áp dụng khi đại từ quan hệ làm chủ ngữ và động từ ở thể BỊ ĐỘNG. Bỏ đại từ quan hệ và to be, giữ lại V3/ed. Ví dụ: The books WHICH WERE WRITTEN by Hemingway -> The books WRITTEN by Hemingway.'
          },
          {
            label: '3. To-Infinitive (To V)',
            text: 'Bắt buộc áp dụng khi danh từ đứng trước có các từ hạn định đặc biệt: the first, the second, the next, the last, the only, hoặc tính từ so sánh nhất. Nếu bị động dùng "to be V3".'
          }
        ],
        examples: [
          {
            en: 'The application forms submitted after the deadline will be automatically rejected.',
            vi: 'Những lá đơn đăng ký được nộp sau thời hạn sẽ tự động bị từ chối.',
            highlight: 'forms submitted',
            note: 'Rút gọn bị động: forms which were submitted -> forms submitted.'
          },
          {
            en: 'Yuri Gagarin became the first human to travel into outer space.',
            vi: 'Yuri Gagarin trở thành người đầu tiên du hành vào không gian vũ trụ.',
            highlight: 'the first human to travel',
            note: 'Có "the first human" nên rút gọn bằng "to travel".'
          }
        ],
        examTips: [
          'BẪY KINH ĐIỂN THI THPTQG: "The car _______ on the street belongs to Mr. Smith. (park)"\nRất nhiều học sinh chọn "parked" hoặc "is parked". Nhìn kỹ: Câu ĐÃ CÓ ĐỘNG TỪ CHÍNH "belongs to", do đó vị trí trống chỉ là MỆNH ĐỀ RÚT GỌN -> Chiếc xe BỊ ĐỖ nên chọn "parked", KHÔNG được chọn "is parked" vì câu sẽ bị thừa 2 động từ chính!'
        ]
      }
    ],
    questions: [
      {
        id: 'q15-1',
        question: 'The research papers _______ by the international committee will be published in a medical journal next month.',
        options: {
          A: 'evaluating',
          B: 'evaluated',
          C: 'were evaluated',
          D: 'are evaluating'
        },
        correctAnswer: 'B',
        explanation: 'Câu đã có động từ chính của vị ngữ là "will be published". Chỗ trống thuộc mệnh đề quan hệ rút gọn bổ nghĩa cho "The research papers". Các bài báo "được đánh giá" bởi hội đồng (bị động) -> rút gọn bằng V3/ed "evaluated". Loại C vì nếu chọn "were evaluated" câu sẽ có 2 động từ chính.',
        clue: 'papers (vật) + by committee (bị động) -> V3/ed (evaluated)',
        translation: 'Các bài nghiên cứu được đánh giá bởi hội đồng quốc tế sẽ được xuất bản trên tạp chí y khoa vào tháng tới.'
      },
      {
        id: 'q15-2',
        question: 'Any student _______ part in the volunteer campaign will receive a certificate of merit.',
        options: {
          A: 'taking',
          B: 'taken',
          C: 'took',
          D: 'is taking'
        },
        correctAnswer: 'A',
        explanation: 'Câu đã có động từ chính "will receive". Học sinh chủ động "tham gia" (take part in) chiến dịch tình nguyện -> rút gọn mệnh đề quan hệ chủ động bằng V-ing "taking" (= who takes part in).',
        clue: 'student chủ động tham gia -> V-ing (taking)',
        translation: 'Bất kỳ học sinh nào tham gia vào chiến dịch tình nguyện đều sẽ nhận được giấy khen.'
      },
      {
        id: 'q15-3',
        question: 'Dr. Katherine was the only specialist _______ the complex surgical operation successfully.',
        options: {
          A: 'performing',
          B: 'performed',
          C: 'to perform',
          D: 'perform'
        },
        correctAnswer: 'C',
        explanation: 'Trước danh từ có cụm từ hạn định "the only specialist" (chuyên gia duy nhất). Quy tắc: sau the first/the last/the only..., mệnh đề quan hệ được rút gọn bằng "To-V" -> chọn "to perform".',
        clue: 'the only specialist -> to V (to perform)',
        translation: 'Bác sĩ Katherine là chuyên gia duy nhất thực hiện thành công ca phẫu thuật phức tạp đó.'
      },
      {
        id: 'q15-4',
        question: 'The historic bridge _______ by French engineers over a century ago has recently undergone restoration.',
        options: {
          A: 'was constructing',
          B: 'constructed',
          C: 'which constructed',
          D: 'constructing'
        },
        correctAnswer: 'B',
        explanation: 'Động từ chính của câu là "has recently undergone". Cây cầu "được xây dựng" bởi các kỹ sư Pháp (bị động) -> rút gọn mệnh đề quan hệ thành V3/ed "constructed" (= which was constructed).',
        clue: 'bridge + by French engineers -> bị động V3/ed',
        translation: 'Cây cầu lịch sử được xây dựng bởi các kỹ sư người Pháp hơn một thế kỷ trước gần đây đã được trùng tu.'
      },
      {
        id: 'q15-5',
        question: 'Passengers _______ on flight VN240 are kindly invited to proceed immediately to Gate 12.',
        options: {
          A: 'traveled',
          B: 'traveling',
          C: 'were traveling',
          D: 'are traveled'
        },
        correctAnswer: 'B',
        explanation: 'Hành khách chủ động đi trên chuyến bay ("traveling on flight VN240" = who are traveling). Câu đã có động từ chính là "are invited" -> rút gọn chủ động bằng V-ing "traveling".',
        clue: 'passengers chủ động đi -> V-ing (traveling)',
        translation: 'Các hành khách đi trên chuyến bay VN240 xin vui lòng di chuyển ngay đến Cổng số 12.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 16: MỆNH ĐỀ CÙNG CHỦ NGỮ
  // ==========================================
  {
    id: 'topic-16',
    topicNumber: 16,
    title: 'Chuyên đề 16: MĐ cùng chủ ngữ',
    shortTitle: 'MĐ cùng chủ ngữ',
    englishTitle: 'Participle Clauses (Same Subject)',
    badge: 'Trọng tâm 100%',
    difficulty: 'Nâng cao',
    summary: 'Rút gọn 2 mệnh đề có cùng chủ ngữ bằng Phân từ hiện tại (V-ing), Phân từ hoàn thành (Having + V3) và Phân từ quá khứ (V3/ed).',
    keyPoints: [
      'Điều kiện tiên quyết: Hai mệnh đề BẮT BUỘC phải có CÙNG CHỦ NGỮ',
      'Chủ động đồng thời / nối tiếp: V-ing, S + V',
      'Chủ động xảy ra trước: Having + V3/ed, S + V',
      'Bị động: V3/ed (hoặc Having been + V3/ed), S + V'
    ],
    theorySections: [
      {
        title: '1. Bản chất và Công thức Rút gọn cùng chủ ngữ',
        subtitle: 'Dạng bài câu hỏi đầu câu bằng dấu phẩy _______, S + V',
        formula: [
          'Chủ động cùng thời: V-ING, S + V (Seeing the danger, he shouted.)',
          'Chủ động hoàn thành trước: HAVING + V3/ED, S + V (Having finished the exam, she relaxed.)',
          'Bị động thông thường: V3/ED (hoặc Being V3), S + V (Shocked by the news, she cried.)',
          'Bị động hoàn thành trước: HAVING BEEN + V3/ED, S + V (Having been told the truth, he left.)'
        ],
        rules: [
          {
            label: 'Bí quyết giải nhanh',
            text: '1. Nhìn ngay CHỦ NGỮ S đứng ngay sau dấu phẩy.\n2. Tự đặt câu hỏi: Chủ ngữ S này TỰ THỰC HIỆN hành động hay BỊ TÁC ĐỘNG bởi hành động?\n- Nếu S TỰ LÀM: Chọn V-ing hoặc Having + V3.\n- Nếu S BỊ LÀM: Chọn V3/ed hoặc Having been + V3.'
          }
        ],
        examples: [
          {
            en: 'Having completed all her assignments, Mai turned off her computer and went to sleep.',
            vi: 'Sau khi đã hoàn thành xong mọi bài tập, Mai tắt máy tính và đi ngủ.',
            highlight: 'Having completed all her assignments',
            note: 'Hành động làm xong bài tập diễn ra và hoàn tất trước hành động đi ngủ -> Having + V3.'
          },
          {
            en: 'Warned about the impending tropical storm, the coastal villagers evacuated immediately.',
            vi: 'Được cảnh báo về cơn bão nhiệt đới sắp tới, dân làng ven biển đã sơ tán ngay lập tức.',
            highlight: 'Warned about',
            note: 'Dân làng được cảnh báo (bị động) -> rút gọn bằng V3/ed "Warned".'
          }
        ],
        examTips: [
          'Phân biệt V-ing và Having + V3: Đề thi THPTQG thường ưu tiên "Having + V3" khi muốn nhấn mạnh một hành động đã hoàn tất trọn vẹn trước một hành động khác trong quá khứ!'
        ]
      }
    ],
    questions: [
      {
        id: 'q16-1',
        question: '_______ all the necessary data, the team began writing the final project report.',
        options: {
          A: 'Having collected',
          B: 'Collected',
          C: 'To collect',
          D: 'Have collected'
        },
        correctAnswer: 'A',
        explanation: 'Nhìn chủ ngữ sau dấu phẩy: "the team" (đội nhóm). Đội nhóm chủ động thu thập dữ liệu và hành động thu thập này đã hoàn thành xong trước khi bắt đầu viết báo cáo -> rút gọn chủ động bằng phân từ hoàn thành "Having collected".',
        clue: 'the team chủ động làm xong trước -> Having + V3',
        translation: 'Sau khi đã thu thập toàn bộ dữ liệu cần thiết, cả nhóm bắt đầu viết bản báo cáo dự án cuối kỳ.'
      },
      {
        id: 'q16-2',
        question: '_______ by the sudden loud noise outside, the baby woke up and cried bitterly.',
        options: {
          A: 'Frightening',
          B: 'Frightened',
          C: 'Having frightened',
          D: 'To frighten'
        },
        correctAnswer: 'B',
        explanation: 'Nhìn chủ ngữ sau dấu phẩy: "the baby" (đứa bé). Đứa bé bị làm cho hoảng sợ bởi tiếng ồn lớn (bị động) -> rút gọn bằng quá khứ phân từ V3/ed "Frightened".',
        clue: 'the baby bị hoảng sợ bởi tiếng ồn -> V3/ed (Frightened)',
        translation: 'Bị hoảng sợ bởi tiếng ồn lớn bất ngờ bên ngoài, đứa bé thức giấc và khóc nức nở.'
      },
      {
        id: 'q16-3',
        question: '_______ from high-quality stainless steel, this surgical instrument will never rust.',
        options: {
          A: 'Manufacturing',
          B: 'Manufactured',
          C: 'Having manufactured',
          D: 'Manufacture'
        },
        correctAnswer: 'B',
        explanation: 'Chủ ngữ sau dấu phẩy là "this surgical instrument" (dụng cụ phẫu thuật này). Dụng cụ được sản xuất từ thép không gỉ (bị động) -> rút gọn bằng V3/ed "Manufactured".',
        clue: 'instrument (dụng cụ) được sản xuất -> V3/ed',
        translation: 'Được sản xuất từ thép không gỉ chất lượng cao, dụng cụ phẫu thuật này sẽ không bao giờ bị gỉ sét.'
      },
      {
        id: 'q16-4',
        question: '_______ the door quietly, the detective slipped into the dimly lit room.',
        options: {
          A: 'Opened',
          B: 'Opening',
          C: 'Having been opened',
          D: 'Being opened'
        },
        correctAnswer: 'B',
        explanation: 'Thám tử ("the detective") chủ động mở cửa rồi lẻn vào phòng (hai hành động nối tiếp nhau tức thì) -> rút gọn chủ động bằng V-ing "Opening".',
        clue: 'thám tử chủ động mở cửa -> V-ing (Opening)',
        translation: 'Mở cửa một cách nhẹ nhàng, viên thám tử lẻn vào căn phòng lờ mờ ánh sáng.'
      },
      {
        id: 'q16-5',
        question: '_______ several times about the severe consequences of speeding, he still drove recklessly.',
        options: {
          A: 'Having warned',
          B: 'Warning',
          C: 'Having been warned',
          D: 'Warned not'
        },
        correctAnswer: 'C',
        explanation: 'Chủ ngữ là "he". Anh ta được/bị cảnh báo nhiều lần (bị động) và việc cảnh báo này đã diễn ra trước hành động lái xe ẩu -> rút gọn bị động hoàn thành: "Having been warned".',
        clue: 'anh ta được cảnh báo trước đó (bị động) -> Having been warned',
        translation: 'Sau khi đã được cảnh báo nhiều lần về những hậu quả nghiêm trọng của việc chạy quá tốc độ, anh ta vẫn lái xe một cách liều lĩnh.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 17: CÂU CHẺ (CLEFT SENTENCES)
  // ==========================================
  {
    id: 'topic-17',
    topicNumber: 17,
    title: 'Chuyên đề 17: Câu chẻ',
    shortTitle: 'Câu chẻ',
    englishTitle: 'Cleft Sentences (It is / was... that)',
    badge: 'Mới thêm',
    difficulty: 'Trung bình',
    summary: 'Cấu trúc câu chẻ nhấn mạnh Chủ ngữ, Tân ngữ, Trạng ngữ bằng mô hình "It is/was + thành phần nhấn mạnh + THAT/WHO".',
    keyPoints: [
      'Công thức tổng quát: It + is/was + [Thành phần nhấn mạnh] + THAT / WHO + ...',
      'Nhấn mạnh Chủ ngữ người: It is/was + S(người) + who/that + V',
      'Nhấn mạnh Chủ ngữ vật: It is/was + S(vật) + that + V',
      'Nhấn mạnh Trạng ngữ: It is/was + Trạng từ/cụm trạng ngữ + THAT (Bắt buộc dùng THAT, không dùng when/where)'
    ],
    theorySections: [
      {
        title: '1. Khái niệm và Công thức chung của Câu chẻ',
        subtitle: 'Chia tách câu nhằm dồn sự chú ý vào một trọng tâm duy nhất',
        formula: [
          'Cấu trúc chung: It + is/was + [Thành phần nhấn mạnh] + THAT / WHO + ...',
          'Thì hiện tại / tương lai -> Dùng "IT IS"',
          'Thì quá khứ -> Dùng "IT WAS"'
        ],
        rules: [
          {
            label: '1. Nhấn mạnh Chủ ngữ (Subject)',
            text: 'Chỉ người: It is/was + S(người) + WHO / THAT + V + O. Chỉ vật: It is/was + S(vật) + THAT + V + O.'
          },
          {
            label: '2. Nhấn mạnh Tân ngữ (Object)',
            text: 'Chỉ người: It is/was + O(người) + WHOM / THAT + S + V. Chỉ vật: It is/was + O(vật) + THAT + S + V.'
          },
          {
            label: '3. Nhấn mạnh Trạng ngữ (Adverbial)',
            text: 'It is/was + [Trạng ngữ thời gian / nơi chốn / cách thức / nguyên nhân] + THAT + S + V.'
          }
        ],
        examples: [
          {
            en: 'Today, it is the city of New Orleans that holds one of the most famous Mardi Gras festivals.',
            vi: 'Ngày nay, chính thành phố New Orleans là nơi tổ chức một trong những lễ hội Mardi Gras nổi tiếng nhất.',
            highlight: 'it is the city of New Orleans that',
            note: 'Nhấn mạnh chủ ngữ vật/địa danh: It is + Noun + that.'
          },
          {
            en: 'It was in Paris that they first met each other fifteen years ago.',
            vi: 'Chính tại Paris là nơi họ đã lần đầu tiên gặp nhau mười lăm năm trước.',
            highlight: 'It was in Paris that',
            note: 'Nhấn mạnh trạng ngữ nơi chốn: It was + in Paris + THAT (không dùng where).'
          },
          {
            en: 'It was my high school English teacher who inspired me to become an educator.',
            vi: 'Chính cô giáo dạy tiếng Anh cấp ba là người đã truyền cảm hứng cho tôi trở thành một nhà giáo.',
            highlight: 'It was my teacher who inspired',
            note: 'Nhấn mạnh chủ ngữ chỉ người: It was + S(người) + who/that.'
          }
        ],
        examTips: [
          'BẪY THI CỰC KỲ NGUY HIỂM: Khi nhấn mạnh trạng ngữ nơi chốn (e.g. It was at this university...) hoặc thời gian (It was in 1995...), học sinh rất dễ bị lừa chọn "where" hoặc "when".\nQUY TẮC CHUẨN: Trong câu chẻ, BẮT BUỘC DÙNG "THAT", KHÔNG dùng where/when!'
        ]
      },
      {
        title: '2. Câu chẻ dạng Bị động (Passive Cleft Sentence)',
        subtitle: 'Dạng bài nâng cao viết lại câu',
        formula: [
          'It + is/was + Tân ngữ được nhấn mạnh + THAT + be + V3/ed + by S'
        ],
        examples: [
          {
            en: 'It was this beautiful oil painting that was created by the young local artist.',
            vi: 'Chính bức tranh sơn dầu tuyệt đẹp này là tác phẩm đã được tạo nên bởi người nghệ sĩ trẻ địa phương.',
            highlight: 'that was created by',
            note: 'Câu chẻ thể bị động: It was + O + that + was created by S.'
          }
        ],
        examTips: [
          'Để kiểm tra một câu có phải là câu chẻ hay không: Hãy bỏ cụm "It is/was" và "that" đi. Nếu các từ còn lại ghép lại thành một câu hoàn chỉnh có nghĩa đúng ngữ pháp -> Đó chính là câu chẻ!'
        ]
      }
    ],
    questions: [
      {
        id: 'q17-1',
        question: 'It was on his wedding anniversary _______ he presented his wife with a diamond necklace.',
        options: {
          A: 'which',
          B: 'when',
          C: 'that',
          D: 'where'
        },
        correctAnswer: 'C',
        explanation: 'Đây là câu chẻ nhấn mạnh trạng ngữ chỉ thời gian "on his wedding anniversary". Cấu trúc chuẩn của câu chẻ nhấn mạnh trạng từ: "It was + Trạng ngữ + THAT + S + V". Tuyệt đối không dùng "when" -> chọn "that".',
        clue: 'It was + trạng ngữ thời gian + THAT (bẫy chọn when)',
        translation: 'Chính vào ngày kỷ niệm ngày cưới là lúc anh ấy đã tặng vợ mình một chiếc vòng cổ kim cương.'
      },
      {
        id: 'q17-2',
        question: 'It is hard work and dedication _______ pave the ultimate path to genuine success in life.',
        options: {
          A: 'who',
          B: 'that',
          C: 'whom',
          D: 'what'
        },
        correctAnswer: 'B',
        explanation: 'Câu chẻ nhấn mạnh chủ ngữ chỉ sự vật/khái niệm "hard work and dedication" (sự chăm chỉ và cống hiến). Công thức: "It is + S(vật) + THAT + V" -> chọn "that".',
        clue: 'It is + S(vật) + that + V',
        translation: 'Chính sự chăm chỉ và cống hiến là điều mở đường dẫn lối tới thành công thực sự trong cuộc sống.'
      },
      {
        id: 'q17-3',
        question: 'It _______ in 1945 that the United Nations was officially established to maintain international peace.',
        options: {
          A: 'is',
          B: 'was',
          C: 'has been',
          D: 'had been'
        },
        correctAnswer: 'B',
        explanation: 'Sự kiện Liên Hợp Quốc thành lập diễn ra vào năm 1945 (quá khứ). Câu chẻ ở quá khứ bắt buộc dùng to be ở quá khứ: "It was + in 1945 + that..." -> chọn "was".',
        clue: 'in 1945 (quá khứ) -> It was',
        translation: 'Chính vào năm 1945 là thời điểm Liên Hợp Quốc được chính thức thành lập nhằm duy trì hòa bình quốc tế.'
      },
      {
        id: 'q17-4',
        question: 'It was my younger brother _______ broke your favorite antique vase yesterday afternoon.',
        options: {
          A: 'who',
          B: 'whom',
          C: 'which',
          D: 'whose'
        },
        correctAnswer: 'A',
        explanation: 'Câu chẻ nhấn mạnh chủ ngữ chỉ người ("my younger brother"). Theo sau là động từ "broke" (cần chủ ngữ làm hành động) -> dùng "who" (hoặc "that").',
        clue: 'It was + Người (chủ ngữ) + WHO + V',
        translation: 'Chính em trai tôi là người đã làm vỡ chiếc bình cổ yêu thích của bạn vào chiều hôm qua.'
      },
      {
        id: 'q17-5',
        question: 'It was at the central library _______ they discovered the rare historical manuscript.',
        options: {
          A: 'where',
          B: 'which',
          C: 'that',
          D: 'in which'
        },
        correctAnswer: 'C',
        explanation: 'Câu chẻ nhấn mạnh trạng ngữ chỉ nơi chốn "at the central library". Công thức bắt buộc: "It was + [Trạng ngữ nơi chốn] + THAT + S + V". Bẫy thường gặp là chọn "where" -> đáp án đúng phải là "that".',
        clue: 'It was + trạng ngữ nơi chốn + THAT',
        translation: 'Chính tại thư viện trung tâm là nơi họ đã phát hiện ra bản thảo lịch sử quý hiếm.'
      }
    ]
  },

  // ==========================================
  // CHUYÊN ĐỀ 18: ĐẢO NGỮ (INVERSION)
  // ==========================================
  {
    id: 'topic-18',
    topicNumber: 18,
    title: 'Chuyên đề 18: Đảo ngữ',
    shortTitle: 'Đảo ngữ',
    englishTitle: 'Inversion',
    badge: 'Mới thêm',
    difficulty: 'Nâng cao',
    summary: 'Đảo trợ động từ lên trước chủ ngữ: Phó từ phủ định (Never, Rarely), No sooner... than, Not only... but also, Only when/after, So/Such... that.',
    keyPoints: [
      'Công thức chung: Cụm từ đảo ngữ + Trợ động từ (Aux/Be) + S + V',
      'No sooner + had + S + V3 + THAN + S + V2 = Hardly + had + S + V3 + WHEN + S + V2',
      'Not until + time / S + V, Trợ động từ + S + V (đảo ở mệnh đề chính)',
      'Only when / Only after + S + V, Trợ động từ + S + V'
    ],
    theorySections: [
      {
        title: '1. Khái niệm và các dạng Đảo ngữ kinh điển trong đề thi',
        subtitle: 'Bảng công thức 8 dạng đảo ngữ chuẩn ma trận tốt nghiệp',
        formula: [
          '1. Phó từ phủ định: Never / Rarely / Seldom / Little / Hardly + Aux + S + V',
          '2. Vừa mới... thì: No sooner + had + S + V3 + THAN + S + V2',
          '3. Vừa mới... thì: Hardly / Scarcely + had + S + V3 + WHEN + S + V2',
          '4. Không những... mà còn: Not only + Aux + S + V, but S + also + V',
          '5. Chỉ khi: Only when / Only after / Only if + S + V, Aux + S + V (đảo vế sau)',
          '6. Mãi cho đến khi: Not until + time / S + V, Aux + S + V (đảo vế sau)',
          '7. Quá đến nỗi mà: So + Adj + be + S + that... | So + Adv + Aux + S + V + that...',
          '8. Tuyệt đối không: Under no circumstances / On no account + Aux + S + V'
        ],
        rules: [
          {
            label: 'Cặp liên từ cố định',
            text: 'Nhớ nằm lòng cặp đi liền: NO SOONER luôn đi với THAN. HARDLY / SCARCELY / BARELY luôn đi với WHEN.'
          },
          {
            label: 'Vị trí đảo với ONLY và NOT UNTIL',
            text: 'Khi đứng đầu câu với mệnh đề (Only when S + V, Not until S + V), MỆNH ĐỀ ĐẦU TIÊN GIỮ NGUYÊN, chỉ thực hiện đảo ngữ ở MỆNH ĐỀ CHÍNH PHÍA SAU DẤU PHẨY.'
          }
        ],
        examples: [
          {
            en: 'Rarely have I witnessed such remarkable courage and determination in a student.',
            vi: 'Hiếm khi tôi chứng kiến lòng dũng cảm và sự quyết tâm phi thường như vậy ở một học sinh.',
            highlight: 'Rarely have I witnessed',
            note: 'Rarely + have (trợ động từ) + I (chủ ngữ) + witnessed (V3).'
          },
          {
            en: 'No sooner had they stepped out of the hall than the heavy downpour began.',
            vi: 'Họ vừa mới bước ra khỏi hội trường thì cơn mưa rào nặng hạt bắt đầu đổ xuống.',
            highlight: 'No sooner had they stepped ... than',
            note: 'No sooner had S V3 than S V2.'
          },
          {
            en: 'Not until the teacher explained the formula twice did the students understand it.',
            vi: 'Mãi cho đến khi thầy giáo giải thích công thức hai lần thì học sinh mới hiểu được nó.',
            highlight: 'Not until ... did the students understand',
            note: 'Đảo ngữ ở vế chính phía sau dấu phẩy: did + the students + understand.'
          }
        ],
        examTips: [
          'Thần chú làm bài trắc nghiệm đảo ngữ: Nhìn thấy từ phủ định/hạn chế ở đầu câu (Never, Seldom, Hardly, No sooner, Only when...), hãy tìm ngay phương án có TRỢ ĐỘNG TỪ (did, had, does, do, can, will, be) ĐỨNG TRƯỚC CHỦ NGỮ!'
        ]
      }
    ],
    questions: [
      {
        id: 'q18-1',
        question: 'No sooner _______ home from work than the telephone began to ring insistently.',
        options: {
          A: 'he arrived',
          B: 'had he arrived',
          C: 'did he arrive',
          D: 'he had arrived'
        },
        correctAnswer: 'B',
        explanation: 'Cấu trúc đảo ngữ cố định: "No sooner + had + S + V3/ed + THAN + S + V2/ed" (Vừa mới... thì đã...). Đảo trợ động từ had lên trước chủ ngữ he -> chọn "had he arrived".',
        clue: 'No sooner + had + S + V3 ... than',
        translation: 'Anh ấy vừa mới về đến nhà sau giờ làm việc thì chiếc điện thoại bắt đầu đổ chuông dồn dập.'
      },
      {
        id: 'q18-2',
        question: 'Hardly had the famous singer appeared on stage _______ the enthusiastic crowd erupted in cheers.',
        options: {
          A: 'than',
          B: 'when',
          C: 'then',
          D: 'after'
        },
        correctAnswer: 'B',
        explanation: 'Cặp liên từ đi với Hardly/Scarcely là WHEN: "Hardly had + S + V3 + WHEN + S + V2" (Vừa mới... thì...). Bẫy hay gặp là nhầm sang "than" của No sooner -> chọn "when".',
        clue: 'Hardly had... WHEN',
        translation: 'Ca sĩ nổi tiếng vừa mới xuất hiện trên sân khấu thì đám đông nhiệt tình đã vỡ òa trong tiếng reo hò.'
      },
      {
        id: 'q18-3',
        question: 'Only after all the passengers had fastened their seatbelts _______ the aircraft cleared for takeoff.',
        options: {
          A: 'was',
          B: 'did',
          C: 'had',
          D: 'is'
        },
        correctAnswer: 'A',
        explanation: 'Cấu trúc đảo ngữ với "Only after + S + had V3, [Trợ động từ/Be] + S + V3". Phía sau là cụm bị động "the aircraft cleared for takeoff" (máy bay được phép cất cánh) trong quá khứ -> đảo to be "was" lên trước chủ ngữ the aircraft.',
        clue: 'Only after... was the aircraft cleared',
        translation: 'Chỉ sau khi tất cả hành khách đã thắt dây an toàn thì chiếc máy bay mới được phép cất cánh.'
      },
      {
        id: 'q18-4',
        question: 'Seldom _______ such an impressive and emotionally moving theatrical performance.',
        options: {
          A: 'I have seen',
          B: 'have I seen',
          C: 'did I saw',
          D: 'I saw'
        },
        correctAnswer: 'B',
        explanation: 'Phó từ bán phủ định "Seldom" (hiếm khi) đứng đầu câu đòi hỏi đảo ngữ: "Seldom + have/has + S + V3/ed" -> chọn "have I seen". Phương án C sai vì dùng "did I saw" (sau did phải là V nguyên mẫu).',
        clue: 'Seldom + have + S + V3 (đảo ngữ)',
        translation: 'Hiếm khi tôi được xem một buổi biểu diễn sân khấu ấn tượng và xúc động đến như vậy.'
      },
      {
        id: 'q18-5',
        question: 'Not only _______ fluent in three foreign languages, but she is also an accomplished pianist.',
        options: {
          A: 'she is',
          B: 'is she',
          C: 'does she',
          D: 'she does'
        },
        correctAnswer: 'B',
        explanation: 'Cấu trúc đảo ngữ với "Not only": "Not only + to be/Aux + S + Adj..., but S + also + V". "Fluent" là tính từ nên đi với to be "is" đảo lên trước chủ ngữ "she" -> chọn "is she".',
        clue: 'Not only + is + she + Adj (fluent)',
        translation: 'Cô ấy không những thông thạo ba thứ tiếng nước ngoài mà còn là một nghệ sĩ dương cầm tài ba.'
      }
    ]
  }
];
