import { GrammarPracticeQuestion } from '../types';

export interface CleanGrammarTopic {
  id: string;
  topicNumber: number;
  title: string;
  shortTitle: string;
  englishTitle: string;
  difficulty: 'Trọng tâm' | 'Nâng cao';
  concept: string; // Bản chất & dấu hiệu nhận biết (2-3 câu súc tích nhất)
  formulas: string[]; // Bảng công thức vàng đóng khung
  rules: { label: string; text: string }[]; // Quy tắc trọng tâm
  examples: { en: string; vi: string; note?: string }[]; // Ví dụ song ngữ
  examTips: string[]; // Mẹo tránh bẫy thi THPTQG
  questions: GrammarPracticeQuestion[]; // Bộ câu hỏi mặc định
  questionPool: GrammarPracticeQuestion[]; // Ngân hàng câu hỏi bổ sung để đổi bộ đề mới
}

export const CLEAN_GRAMMAR_TOPICS: CleanGrammarTopic[] = [
  // ==========================================
  // 1. TỪ LOẠI
  // ==========================================
  {
    id: 'topic-1',
    topicNumber: 1,
    title: 'Chuyên đề 1: Từ loại',
    shortTitle: 'Từ loại',
    englishTitle: 'Parts of Speech & Word Formation',
    difficulty: 'Trọng tâm',
    concept: 'Nhận biết vị trí và chức năng của Danh từ (Noun), Động từ (Verb), Tính từ (Adj) và Trạng từ (Adv) trong câu dựa vào các từ đứng liền trước và liền sau.',
    formulas: [
      'Danh từ (N): S + V | V + O | Prep + N | Article (a/an/the) / Possessive + (Adj) + N',
      'Tính từ (Adj): Be / Linking Verb + Adj | Adj + N | Make / Find + O + Adj',
      'Trạng từ (Adv): S + Adv + V | V + O + Adv | Adv, S + V | Be + Adv + Adj',
      'Trật tự tính từ: OSASCOMP + N (Opinion - Size - Age - Shape - Color - Origin - Material - Purpose)'
    ],
    rules: [
      { label: 'Hậu tố Danh từ', text: '-tion (pollution), -ment (development), -ity (activity), -ance/-ence (importance), -ness (kindness), -er/-or (teacher, actor).' },
      { label: 'Hậu tố Tính từ', text: '-ful (helpful), -less (careless), -ive (attractive), -ous (dangerous), -al (environmental), -able/-ible (suitable).' },
      { label: 'Hậu tố Trạng từ', text: 'Tính từ + -ly = Trạng từ (fluent -> fluently, quick -> quickly).' },
      { label: 'Động từ nối (Linking Verbs)', text: 'Các động từ chỉ tri giác/trạng thái luôn đi với TÍNH TỪ: look, seem, appear, taste, smell, sound, feel, become, get.' }
    ],
    examples: [
      { en: 'The government needs to invest in environmental protection.', vi: 'Chính phủ cần đầu tư vào việc bảo vệ môi trường.', note: 'environmental (Adj) đứng trước protection (Noun).' },
      { en: 'She speaks English fluently because she practices daily.', vi: 'Cô ấy nói tiếng Anh lưu loát vì cô ấy luyện tập hàng ngày.', note: 'fluently (Adv) bổ nghĩa cho động từ speaks.' },
      { en: 'She bought a lovely small Japanese wooden table.', vi: 'Cô ấy mua một chiếc bàn gỗ nhỏ kiểu Nhật xinh xắn.', note: 'OSASCOMP: lovely (O) -> small (S) -> Japanese (O) -> wooden (M).' }
    ],
    examTips: [
      'Bẫy tính từ đuôi -ly: Các từ như friendly, lovely, lively, silly, costly, cowardly là TÍNH TỪ, không phải trạng từ!',
      'Bẫy Adj-ing vs Adj-ed: Tính từ đuôi -ing chỉ BẢN CHẤT, tính chất sự vật (an exciting game); Tính từ đuôi -ed chỉ CẢM XÚC con người (I feel excited).'
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

  // ==========================================
  // 2. MẠO TỪ VÀ HẠN ĐỊNH
  // ==========================================
  {
    id: 'topic-2',
    topicNumber: 2,
    title: 'Chuyên đề 2: Mạo từ và hạn định',
    shortTitle: 'Mạo từ & Hạn định',
    englishTitle: 'Articles & Determiners',
    difficulty: 'Trọng tâm',
    concept: 'Quy tắc dùng A, An (chưa xác định), The (đã xác định/duy nhất), Ø (mạo từ rỗng) và các từ hạn định Another, Other, Others, The other.',
    formulas: [
      'A / An + Danh từ đếm được số ít (A + phụ âm phát âm /juː/, /w/; AN + nguyên âm phát âm /e/, /æ/, /aʊə/)',
      'The + Danh từ (vật duy nhất, so sánh nhất, nhạc cụ, đại dương/dãy núi số nhiều, quốc gia có Kingdom/States/S)',
      'Ø (Zero article) + N số nhiều / N không đếm được nói chung | môn thể thao | bữa ăn | phương tiện sau "by"',
      'Another + N(sg) | Other + N(pl) | Others (đại từ) | The other (cái/người còn lại)'
    ],
    rules: [
      { label: 'Quy tắc A vs AN theo phát âm', text: 'an hour (/aʊə/), an honest man, an MP3 player; nhưng a university (/juː/), a European (/jʊə/), a one-way street (/wʌn/).' },
      { label: 'Dùng THE', text: 'the Sun, the Moon, the internet, the first, the best, play the guitar, the Pacific, the USA.' },
      { label: 'Không dùng mạo từ (Ø)', text: 'play football, have breakfast, by bus, go to school (đúng mục đích đi học).' }
    ],
    examples: [
      { en: 'Neil Armstrong was the first man to land on the Moon.', vi: 'Neil Armstrong là người đầu tiên đặt chân lên Mặt Trăng.', note: 'The dùng trước số thứ tự (first) và vật duy nhất (Moon).' },
      { en: 'Some people prefer tea, while others enjoy coffee.', vi: 'Một số người thích trà, trong khi những người khác thích cà phê.', note: 'Others là đại từ đứng độc lập thay thế cho other people.' }
    ],
    examTips: [
      'Bẫy Go to school / hospital / bed: Đi đúng mục đích (đi học, chữa bệnh, đi ngủ) -> KHÔNG CÓ THE. Đến để thăm hoặc mục đích khác -> CÓ THE.',
      'Sau Others và The others KHÔNG BAO GIỜ có danh từ vì bản thân chúng đã là đại từ!'
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
        question: 'Would you like _______ cup of tea before we start the discussion?',
        options: { A: 'other', B: 'another', C: 'others', D: 'the others' },
        correctAnswer: 'B',
        explanation: 'Cup là danh từ đếm được số ít. Dùng "another + N(số ít)" với nghĩa "thêm một tách khác" -> chọn "another".',
        clue: 'cup (N số ít) -> another',
        translation: 'Bạn có muốn dùng thêm một tách trà nữa trước khi chúng ta bắt đầu thảo luận không?'
      },
      {
        id: 'q2-4',
        question: 'Mount Everest in _______ Himalayas is the highest mountain peak in the world.',
        options: { A: 'a', B: 'an', C: 'the', D: 'Ø' },
        correctAnswer: 'C',
        explanation: 'Trước tên dãy núi số nhiều (the Himalayas, the Alps) bắt buộc dùng mạo từ "the".',
        clue: 'dãy núi số nhiều -> the',
        translation: 'Đỉnh Everest thuộc dãy Himalaya là đỉnh núi cao nhất trên thế giới.'
      },
      {
        id: 'q2-5',
        question: 'I have two brothers: one is an engineer and _______ is a high school teacher.',
        options: { A: 'other', B: 'another', C: 'the other', D: 'the others' },
        correctAnswer: 'C',
        explanation: 'Cấu trúc đối chiếu trong số 2 người: "one... the other..." (một người là... người còn lại là...) -> chọn "the other".',
        clue: 'one... the other (trong 2 người/vật)',
        translation: 'Tôi có hai anh trai: một người là kỹ sư và người còn lại là giáo viên trung học.'
      }
    ],
    questionPool: [
      {
        id: 'q2-p1',
        question: 'She is learning to play _______ piano at the municipal conservatory.',
        options: { A: 'a', B: 'an', C: 'the', D: 'Ø' },
        correctAnswer: 'C',
        explanation: 'Trước tên nhạc cụ sau động từ play (play the piano, play the guitar) bắt buộc dùng "the".',
        clue: 'play the + nhạc cụ',
        translation: 'Cô ấy đang học chơi đàn dương cầm tại nhạc viện thành phố.'
      },
      {
        id: 'q2-p2',
        question: 'Students usually travel to campus _______ bicycle to reduce carbon emissions.',
        options: { A: 'by', B: 'on the', C: 'in', D: 'by a' },
        correctAnswer: 'A',
        explanation: 'Cụm từ chỉ phương tiện: "by + phương tiện" không có mạo từ (by bicycle, by bus, by car).',
        clue: 'by + phương tiện (không mạo từ)',
        translation: 'Sinh viên thường đến trường bằng xe đạp để giảm lượng khí thải carbon.'
      }
    ]
  },

  // ==========================================
  // 3. LƯỢNG TỪ
  // ==========================================
  {
    id: 'topic-3',
    topicNumber: 3,
    title: 'Chuyên đề 3: Lượng từ',
    shortTitle: 'Lượng từ',
    englishTitle: 'Quantifiers',
    difficulty: 'Trọng tâm',
    concept: 'Phân biệt lượng từ đi với danh từ đếm được (Few/A few, Many) và không đếm được (Little/A little, Much), các từ chỉ số lượng đặc biệt (Most, Almost, None).',
    formulas: [
      'Few + N(đếm được số nhiều): rất ít, hầu như không có (tiêu cực)',
      'A few + N(đếm được số nhiều): một vài, đủ dùng (tích cực)',
      'Little + N(không đếm được): rất ít, gần như cạn kiệt (tiêu cực)',
      'A little + N(không đếm được): một chút, đủ dùng (tích cực)',
      'Most + N = hầu hết | Most of + the/tính từ sở hữu + N | Almost (trạng từ: almost all)'
    ],
    rules: [
      { label: 'Quy tắc "có A là còn đủ"', text: 'A few / A little mang nghĩa tích cực (còn một ít để dùng). Few / Little mang nghĩa tiêu cực (hầu như không có gì).' },
      { label: 'Some vs Any', text: 'Some dùng trong câu khẳng định và lời mời/đề nghị lịch sự (Would you like some tea?). Any dùng trong câu phủ định, nghi vấn và khẳng định với nghĩa "bất kỳ".' }
    ],
    examples: [
      { en: 'We have very little time left, so please hurry up.', vi: 'Chúng ta còn rất ít thời gian, nên xin hãy nhanh lên.', note: 'time không đếm được, little = hầu như không còn thời gian.' },
      { en: 'Most of the participants agreed with the proposal.', vi: 'Hầu hết những người tham gia đều đồng ý với đề xuất.', note: 'Có "the" nên bắt buộc dùng Most of.' }
    ],
    examTips: [
      'Bẫy Almost students -> SAI! Phải dùng "Most students" hoặc "Almost all students".',
      'Sau "Each" và "Every", danh từ và động từ LUÔN Ở SỐ ÍT (Each student has a book).'
    ],
    questions: [
      {
        id: 'q3-1',
        question: 'We need to go grocery shopping immediately; there is _______ milk left in the fridge.',
        options: { A: 'a few', B: 'few', C: 'a little', D: 'little' },
        correctAnswer: 'D',
        explanation: 'Milk là danh từ không đếm được. Câu "cần đi siêu thị ngay" thể hiện sữa gần như đã hết sạch (tiêu cực) -> chọn "little".',
        clue: 'milk (không đếm được) + nghĩa tiêu cực -> little',
        translation: 'Chúng ta cần đi siêu thị ngay; trong tủ lạnh hầu như chẳng còn giọt sữa nào.'
      },
      {
        id: 'q3-2',
        question: '_______ people attended the open-air concert because of the heavy thunderstorm.',
        options: { A: 'Few', B: 'A few', C: 'Little', D: 'A little' },
        correctAnswer: 'A',
        explanation: 'People là danh từ đếm được số nhiều. Do bão to nên rất ít người đến xem (tiêu cực) -> chọn "Few".',
        clue: 'people (đếm được) + bão to -> Few',
        translation: 'Rất ít người tham dự buổi hòa nhạc ngoài trời vì cơn giông bão lớn.'
      },
      {
        id: 'q3-3',
        question: '_______ of the computers in the IT laboratory were damaged during the power surge.',
        options: { A: 'Most', B: 'Most of', C: 'Almost', D: 'Mostly' },
        correctAnswer: 'B',
        explanation: 'Phía sau có mạo từ xác định "the computers" -> bắt buộc dùng "Most of" (Most of + the + N).',
        clue: 'the computers -> Most of',
        translation: 'Hầu hết các máy tính trong phòng thực hành tin học đã bị hỏng do xung điện.'
      },
      {
        id: 'q3-4',
        question: 'Don\'t worry too much. You still have _______ time left to review your answers.',
        options: { A: 'a few', B: 'few', C: 'a little', D: 'little' },
        correctAnswer: 'C',
        explanation: 'Time là danh từ không đếm được. "Don\'t worry" mang nghĩa an ủi (vẫn còn một chút thời gian, tích cực) -> chọn "a little".',
        clue: 'time (không đếm được) + Don\'t worry -> a little',
        translation: 'Đừng lo lắng quá. Bạn vẫn còn một chút thời gian để kiểm tra lại câu trả lời.'
      },
      {
        id: 'q3-5',
        question: 'Unfortunately, _______ of the applicants met all the strict requirements for the post.',
        options: { A: 'none', B: 'no', C: 'neither', D: 'every' },
        correctAnswer: 'A',
        explanation: 'Cấu trúc "none of + the + N" (không ai trong số...). "No" không đi trực tiếp với "of".',
        clue: 'none of the applicants',
        translation: 'Thật không may, không ai trong số các ứng viên đáp ứng được mọi yêu cầu khắt khe cho vị trí này.'
      }
    ],
    questionPool: [
      {
        id: 'q3-p1',
        question: 'Can you lend me _______ dollars so I can buy this dictionary?',
        options: { A: 'a few', B: 'few', C: 'a little', D: 'little' },
        correctAnswer: 'A',
        explanation: 'Dollars là danh từ đếm được số nhiều. Cần mượn vài đô la (nghĩa tích cực, đủ để mua) -> dùng "a few".',
        clue: 'dollars (đếm được số nhiều) -> a few',
        translation: 'Bạn có thể cho tôi mượn vài đô la để tôi mua cuốn từ điển này được không?'
      }
    ]
  },

  // ==========================================
  // 4. V-ING & V TO
  // ==========================================
  {
    id: 'topic-4',
    topicNumber: 4,
    title: 'Chuyên đề 4: V-ing Vto',
    shortTitle: 'V-ing Vto',
    englishTitle: 'Gerunds & Infinitives',
    difficulty: 'Trọng tâm',
    concept: 'Phân loại động từ đi với To-V (kế hoạch, tương lai), V-ing (trải nghiệm, thái độ) và các động từ thay đổi nghĩa hoàn toàn (remember, forget, stop, try, regret).',
    formulas: [
      'V + To-V: decide, plan, hope, agree, refuse, promise, afford, tend, manage + to V',
      'V + V-ing: avoid, enjoy, mind, consider, postpone, admit, deny, practice, suggest + V-ing',
      'Remember / Forget / Regret + to V (việc chưa làm, bổn phận) vs + V-ing (việc đã xảy ra trong quá khứ)',
      'Stop + to V (dừng để làm việc khác) vs Stop + V-ing (dừng hẳn, từ bỏ việc đang làm)',
      'Need: S_người + need to V vs S_vật + need V-ing (= need to be V3)'
    ],
    rules: [
      { label: 'Look forward to, Used to', text: 'Cụm chứa "to" nhưng theo sau là V-ing: look forward to + V-ing (mong đợi), be/get used to + V-ing (quen với), with a view to + V-ing.' },
      { label: 'Động từ giác quan & Make / Let', text: 'Make / Let + O + V(bare); See / Hear / Watch + O + V(bare) (chứng kiến toàn bộ) hoặc + V-ing (chứng kiến một phần hành động đang diễn ra).' }
    ],
    examples: [
      { en: 'I clearly remember locking the door before leaving.', vi: 'Tôi nhớ rõ là mình đã khóa cửa trước khi rời đi.', note: 'Đã khóa cửa trong quá khứ -> V-ing.' },
      { en: 'Remember to lock the door before you go out.', vi: 'Hãy nhớ khóa cửa trước khi bạn ra ngoài nhé.', note: 'Nhắc nhở làm việc trong tương lai -> To-V.' },
      { en: 'These old windows urgently need replacing.', vi: 'Những chiếc cửa sổ cũ này rất cần được thay thế.', note: 'Chủ ngữ là vật (windows) + need V-ing (bị động).' }
    ],
    examTips: [
      'Khi thấy chủ ngữ là VẬT đi với NEED (e.g. The car needs...), hãy tìm ngay đáp án V-ing hoặc to be V3!'
    ],
    questions: [
      {
        id: 'q4-1',
        question: 'He promised _______ her with the homework as soon as he returned home.',
        options: { A: 'help', B: 'helping', C: 'to help', D: 'helped' },
        correctAnswer: 'C',
        explanation: 'Cấu trúc cố định: promise + to V (hứa làm điều gì) -> chọn "to help".',
        clue: 'promise + to V',
        translation: 'Anh ấy đã hứa sẽ giúp cô ấy làm bài tập về nhà ngay khi anh ấy về đến nhà.'
      },
      {
        id: 'q4-2',
        question: 'I still regret _______ that scholarship opportunity in Melbourne last summer.',
        options: { A: 'turn down', B: 'turning down', C: 'to turn down', D: 'turned down' },
        correctAnswer: 'B',
        explanation: 'Hành động từ chối đã diễn ra trong quá khứ (last summer). Cấu trúc "regret + V-ing" = hối hận vì ĐÃ làm gì trong quá khứ -> chọn "turning down".',
        clue: 'last summer + hối hận vì đã làm -> regret + V-ing',
        translation: 'Tôi vẫn hối tiếc vì đã từ chối cơ hội học bổng ở Melbourne vào mùa hè năm ngoái.'
      },
      {
        id: 'q4-3',
        question: 'After walking for two hours in the heat, the hikers stopped _______ some water.',
        options: { A: 'drinking', B: 'to drink', C: 'drink', D: 'drank' },
        correctAnswer: 'B',
        explanation: 'Người đi bộ dừng việc đi lại ĐỂ uống nước (mục đích hành động) -> "stop + to V".',
        clue: 'dừng lại ĐỂ làm việc khác -> stop + to V',
        translation: 'Sau khi đi bộ hai tiếng trong thời tiết nóng bức, những người leo núi đã dừng lại để uống nước.'
      },
      {
        id: 'q4-4',
        question: 'This printer is constantly jamming and urgently needs _______.',
        options: { A: 'repairing', B: 'to repair', C: 'repair', D: 'repaired' },
        correctAnswer: 'A',
        explanation: 'Chủ ngữ là vật "This printer". Cấu trúc bị động với need: "S_vật + need + V-ing" (= need to be repaired) -> chọn "repairing".',
        clue: 'S_vật (printer) + need + V-ing',
        translation: 'Chiếc máy in này liên tục bị kẹt giấy và rất cần được sửa chữa khẩn cấp.'
      },
      {
        id: 'q4-5',
        question: 'We are all looking forward to _______ the graduation ceremony next week.',
        options: { A: 'attend', B: 'attending', C: 'attended', D: 'to attend' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc quen thuộc: "look forward to + V-ing" (mong chờ điều gì). "To" là giới từ.',
        clue: 'look forward to + V-ing',
        translation: 'Tất cả chúng tôi đều đang rất mong chờ được tham dự buổi lễ tốt nghiệp vào tuần tới.'
      }
    ],
    questionPool: [
      {
        id: 'q4-p1',
        question: 'The suspect finally admitted _______ the confidential documents from the office.',
        options: { A: 'steal', B: 'stealing', C: 'to steal', D: 'stolen' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc: "admit + V-ing" (thừa nhận đã làm gì) -> chọn "stealing".',
        clue: 'admit + V-ing',
        translation: 'Nghi phạm cuối cùng đã thừa nhận việc lấy trộm các tài liệu mật từ văn phòng.'
      }
    ]
  },

  // ==========================================
  // 5. CÂU SO SÁNH
  // ==========================================
  {
    id: 'topic-5',
    topicNumber: 5,
    title: 'Chuyên đề 5: So sánh',
    shortTitle: 'So sánh',
    englishTitle: 'Comparisons',
    difficulty: 'Trọng tâm',
    concept: 'So sánh hơn, so sánh nhất, so sánh bằng, và đặc biệt là dạng kinh điển thi THPTQG: So sánh kép (The more... the more...).',
    formulas: [
      'So sánh bằng: as + Adj/Adv + as',
      'So sánh hơn: Short-adj/adv-er than | More + Long-adj/adv than (nhấn mạnh: much / far more)',
      'So sánh nhất: the + Short-adj/adv-est | the most + Long-adj/adv',
      'So sánh kép: The + comparative..., the + comparative... (Càng... thì càng...)'
    ],
    rules: [
      { label: 'Quy tắc 2 vế so sánh kép', text: 'Cả hai mệnh đề ĐỀU BẮT BUỘC có mạo từ THE và theo sau là dạng SO SÁNH HƠN: The + comparative + S1 + V1, the + comparative + S2 + V2.' },
      { label: 'Bất quy tắc', text: 'good/well -> better -> best; bad/badly -> worse -> worst; far -> farther/further -> furthest; little -> less -> least.' }
    ],
    examples: [
      { en: 'The more you practice, the more confident you will become.', vi: 'Bạn càng luyện tập nhiều, bạn sẽ càng trở nên tự tin hơn.', note: 'The more... the more confident.' },
      { en: 'This electric car is far more economical than my old petrol one.', vi: 'Chiếc xe điện này tiết kiệm hơn nhiều so với chiếc xe chạy xăng cũ của tôi.', note: 'Dùng far để nhấn mạnh mức độ so sánh hơn.' }
    ],
    examTips: [
      'Thần chú so sánh kép: Thấy một vế có "The + [so sánh hơn]" -> Vế còn lại BẮT BUỘC cũng phải là "The + [so sánh hơn]"!'
    ],
    questions: [
      {
        id: 'q5-1',
        question: 'The more carefully you prepare for the exam, _______ results you will achieve.',
        options: { A: 'the better', B: 'the best', C: 'better', D: 'as good' },
        correctAnswer: 'A',
        explanation: 'Cấu trúc so sánh kép: "The + so sánh hơn..., the + so sánh hơn...". Vế sau cần "The + better" -> chọn "the better".',
        clue: 'The more carefully... -> the better',
        translation: 'Bạn càng chuẩn bị kỹ càng cho kỳ thi, bạn sẽ càng đạt được kết quả tốt hơn.'
      },
      {
        id: 'q5-2',
        question: 'Life in urban areas is _______ than that in the countryside.',
        options: { A: 'much fast', B: 'far faster', C: 'more fast', D: 'the fastest' },
        correctAnswer: 'B',
        explanation: 'Fast là tính từ ngắn -> so sánh hơn là faster. Để nhấn mạnh dùng "far faster than" -> chọn B.',
        clue: 'far + Short-er + than',
        translation: 'Cuộc sống ở thành thị hối hả hơn nhiều so với ở nông thôn.'
      },
      {
        id: 'q5-3',
        question: 'The higher the mountain is, _______ oxygen there is in the air.',
        options: { A: 'the fewer', B: 'the less', C: 'the least', D: 'the little' },
        correctAnswer: 'B',
        explanation: 'So sánh kép. Oxygen là danh từ không đếm được, so sánh hơn của little là "less" -> "the less".',
        clue: 'The higher... the less + N(không đếm được)',
        translation: 'Núi càng cao thì càng có ít oxy trong không khí.'
      },
      {
        id: 'q5-4',
        question: 'Of the three candidates applying for the job, Lan is _______.',
        options: { A: 'the most qualified', B: 'more qualified', C: 'the more qualified', D: 'qualified' },
        correctAnswer: 'A',
        explanation: 'So sánh trong nhóm có từ 3 đối tượng trở lên ("Of the three candidates") -> bắt buộc dùng So sánh nhất: "the most qualified".',
        clue: 'Of the three... -> so sánh nhất',
        translation: 'Trong số ba ứng viên nộp đơn xin việc, Lan là người có trình độ chuyên môn cao nhất.'
      },
      {
        id: 'q5-5',
        question: 'Online education is becoming _______ popular among high school students.',
        options: { A: 'more and more', B: 'the most', C: 'as much', D: 'so much' },
        correctAnswer: 'A',
        explanation: 'Cấu trúc so sánh ngày càng (lũy tiến): "more and more + Long Adj" (ngày càng phổ biến) -> chọn "more and more".',
        clue: 'is becoming more and more + Adj',
        translation: 'Giáo dục trực tuyến đang ngày càng trở nên phổ biến trong giới học sinh trung học.'
      }
    ],
    questionPool: [
      {
        id: 'q5-p1',
        question: 'The harder she works, _______ successful she becomes.',
        options: { A: 'the more', B: 'more', C: 'the most', D: 'as much' },
        correctAnswer: 'A',
        explanation: 'So sánh kép: The harder..., the more successful... -> chọn "the more".',
        clue: 'The harder... the more + Adj',
        translation: 'Cô ấy càng làm việc chăm chỉ, cô ấy càng trở nên thành công.'
      }
    ]
  },

  // ==========================================
  // 6. GIỚI TỪ
  // ==========================================
  {
    id: 'topic-6',
    topicNumber: 6,
    title: 'Chuyên đề 6: Giới từ',
    shortTitle: 'Giới từ',
    englishTitle: 'Prepositions',
    difficulty: 'Trọng tâm',
    concept: 'Tam giác In - On - At (thời gian, nơi chốn), các cụm tính từ/động từ đi kèm giới từ cố định trong đề thi.',
    formulas: [
      'IN: Năm, mùa, tháng, thế kỷ, buổi trong ngày | Quốc gia, thành phố, không gian khép kín',
      'ON: Ngày, thứ, ngày lễ có từ "Day" | Trên bề mặt',
      'AT: Giờ chính xác, mốc thời gian cụ thể (at noon, at night) | Địa điểm cụ thể (at school, at the airport)',
      'Cụm cố định: good at, proud of, interested in, responsible for, at risk, under pressure, in advance'
    ],
    rules: [
      { label: 'Tính từ + Giới từ', text: 'good at (giỏi), fond of (thích), aware of (nhận thức), famous for (nổi tiếng), interested in (thích).' },
      { label: 'Động từ + Giới từ', text: 'depend on (phụ thuộc), apologize to sb for sth (xin lỗi ai vì việc gì), succeed in (thành công).' }
    ],
    examples: [
      { en: 'The exam will take place in June.', vi: 'Kỳ thi sẽ diễn ra vào tháng Sáu.', note: 'In + tháng.' },
      { en: 'Deforestation puts thousands of rare species at risk of extinction.', vi: 'Nạn phá rừng đẩy hàng ngàn loài vào nguy cơ tuyệt chủng.', note: 'Cụm cố định: at risk of.' }
    ],
    examTips: [
      'Phân biệt: "at Christmas" (dịp Giáng sinh nói chung), nhưng "on Christmas Day" (ngày Giáng sinh 25/12 có từ Day thì dùng ON).'
    ],
    questions: [
      {
        id: 'q6-1',
        question: 'Many rare wildlife species are currently _______ risk of extinction due to habitat loss.',
        options: { A: 'in', B: 'at', C: 'on', D: 'under' },
        correctAnswer: 'B',
        explanation: 'Cụm cố định mang nghĩa "có nguy cơ" là "at risk of" (hoặc "in danger of") -> chọn "at".',
        clue: 'at risk of = có nguy cơ',
        translation: 'Nhiều loài động vật hoang dã quý hiếm hiện đang có nguy cơ tuyệt chủng do mất môi trường sống.'
      },
      {
        id: 'q6-2',
        question: 'She is exceptionally good _______ solving difficult mathematical equations.',
        options: { A: 'at', B: 'in', C: 'with', D: 'for' },
        correctAnswer: 'A',
        explanation: 'Cấu trúc quen thuộc: "to be good at sth/doing sth" (giỏi về cái gì) -> chọn "at".',
        clue: 'good at',
        translation: 'Cô ấy đặc biệt giỏi giải các phương trình toán học khó.'
      },
      {
        id: 'q6-3',
        question: 'All candidates are advised to register for the entrance test well _______ advance.',
        options: { A: 'by', B: 'in', C: 'on', D: 'for' },
        correctAnswer: 'B',
        explanation: 'Cụm cố định "in advance" = trước từ trước (well in advance = từ rất sớm) -> chọn "in".',
        clue: 'in advance (từ trước)',
        translation: 'Tất cả các thí sinh được khuyên nên đăng ký bài thi đầu vào từ trước thật sớm.'
      },
      {
        id: 'q6-4',
        question: 'Parents should encourage teenagers to be responsible _______ their own actions.',
        options: { A: 'with', B: 'for', C: 'to', D: 'of' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc: "responsible for sth" (chịu trách nhiệm về điều gì) -> chọn "for".',
        clue: 'responsible for',
        translation: 'Cha mẹ nên khuyến khích các bạn thanh thiếu niên có trách nhiệm với hành động của chính mình.'
      },
      {
        id: 'q6-5',
        question: 'The final presentation is scheduled to take place _______ Monday morning next week.',
        options: { A: 'in', B: 'at', C: 'on', D: 'by' },
        correctAnswer: 'C',
        explanation: 'Khi có thứ trong tuần đi cùng buổi (Monday morning), quy tắc luôn ưu tiên THỨ -> dùng giới từ "on".',
        clue: 'Thứ + buổi (Monday morning) -> on',
        translation: 'Bài thuyết trình cuối khóa dự kiến diễn ra vào sáng thứ Hai tuần tới.'
      }
    ],
    questionPool: [
      {
        id: 'q6-p1',
        question: 'The young surgeon worked tirelessly _______ enormous pressure during the emergency operation.',
        options: { A: 'under', B: 'in', C: 'at', D: 'with' },
        correctAnswer: 'A',
        explanation: 'Cụm cố định: "under pressure" (chịu áp lực) -> chọn "under".',
        clue: 'under pressure',
        translation: 'Vị bác sĩ phẫu thuật trẻ đã làm việc không mệt mỏi dưới áp lực khổng lồ trong ca mổ cấp cứu.'
      }
    ]
  },

  // ==========================================
  // 7. CỤM ĐỘNG TỪ (PHRASAL VERBS)
  // ==========================================
  {
    id: 'topic-7',
    topicNumber: 7,
    title: 'Chuyên đề 7: Phrasal verbs',
    shortTitle: 'Phrasal Verbs',
    englishTitle: 'Phrasal Verbs',
    difficulty: 'Nâng cao',
    concept: 'Các cụm động từ "tủ" thi THPTQG với TURN, LOOK, TAKE, GIVE, PUT và nhóm cụm động từ 3 từ thông dụng.',
    formulas: [
      'TURN: turn down (từ chối/vặn nhỏ) | turn up (xuất hiện) | turn off / turn on (tắt/bật)',
      'LOOK: look after (chăm sóc) | look for (tìm) | look up (tra cứu) | look down on (khinh thường)',
      'TAKE: take off (cất cánh/cởi ra) | take after (giống ai) | take care of (chăm sóc)',
      'PUT / GIVE: put off (trì hoãn) | put out (dập tắt lửa) | give up (từ bỏ) | give in (nhượng bộ)',
      '3 TỪ: put up with (chịu đựng) | cut down on (cắt giảm) | run out of (hết) | catch up with (bắt kịp)'
    ],
    rules: [
      { label: 'Quy tắc đại từ tân ngữ', text: 'Nếu tân ngữ là đại từ (it, them, him, her), bắt buộc đặt ở GIỮA: Turn IT off (đúng), Turn off it (sai).' },
      { label: 'Tra nghĩa theo ngữ cảnh', text: 'Luôn dịch trọn vẹn ngữ cảnh cả câu thay vì dịch nghĩa đen của từng từ riêng lẻ.' }
    ],
    examples: [
      { en: 'She turned down the job offer because the salary was too low.', vi: 'Cô ấy đã từ chối lời mời làm việc vì lương quá thấp.', note: 'Turn down = reject (từ chối).' },
      { en: 'I really cannot put up with his bad temper anymore.', vi: 'Tôi thực sự không thể chịu đựng thêm tính khí xấu của anh ta nữa.', note: 'Put up with = tolerate (chịu đựng).' }
    ],
    examTips: [
      'Phân biệt: Put off = hoãn lại (delay). Put out = dập tắt lửa (extinguish). Đừng bao giờ nhầm lẫn hai từ này!'
    ],
    questions: [
      {
        id: 'q7-1',
        question: 'Due to bad weather conditions, the outdoor concert was _______ until next Sunday.',
        options: { A: 'put off', B: 'put out', C: 'taken off', D: 'called for' },
        correctAnswer: 'A',
        explanation: 'Do thời tiết xấu nên buổi hòa nhạc bị "hoãn lại" cho tới Chủ nhật tới. "Put off" = delay/postpone (hoãn lại) -> chọn A.',
        clue: 'until next Sunday -> hoãn lại (put off)',
        translation: 'Do điều kiện thời tiết xấu, buổi hòa nhạc ngoài trời đã bị hoãn lại cho đến Chủ nhật tuần sau.'
      },
      {
        id: 'q7-2',
        question: 'Mai takes _______ her mother; both of them have expressive brown eyes.',
        options: { A: 'after', B: 'over', C: 'up', D: 'in' },
        correctAnswer: 'A',
        explanation: 'Ngữ cảnh nói Mai và mẹ đều có đôi mắt nâu giàu cảm xúc (giống nhau). Cụm "take after sb" = giống ai đó về ngoại hình/tính cách -> chọn "after".',
        clue: 'both have brown eyes -> giống nhau (take after)',
        translation: 'Mai rất giống mẹ; cả hai người đều có đôi mắt nâu giàu cảm xúc.'
      },
      {
        id: 'q7-3',
        question: 'We unexpectedly ran _______ fuel in the middle of the highway.',
        options: { A: 'away from', B: 'out of', C: 'down with', D: 'up to' },
        correctAnswer: 'B',
        explanation: 'Cụm "run out of sth" mang nghĩa "hết, cạn kiệt cái gì" (ran out of fuel = hết nhiên liệu) -> chọn "out of".',
        clue: 'fuel -> hết xăng (run out of)',
        translation: 'Chúng tôi bất ngờ bị hết nhiên liệu ngay giữa đường cao tốc.'
      },
      {
        id: 'q7-4',
        question: 'He promised to arrive at 8:00 AM, but he didn\'t _______ until almost 10:00.',
        options: { A: 'turn down', B: 'turn up', B: 'turn up', C: 'turn off', D: 'turn out' },
        correctAnswer: 'B',
        explanation: '"Turn up" = arrive / appear (xuất hiện, đến nơi). Hứa đến lúc 8 giờ nhưng mãi gần 10 giờ mới xuất hiện -> chọn "turn up".',
        clue: 'didn\'t arrive -> didn\'t turn up',
        translation: 'Anh ấy hứa sẽ đến lúc 8:00 sáng, nhưng đến gần 10:00 mới xuất hiện.'
      },
      {
        id: 'q7-5',
        question: 'To improve your cardiovascular health, you should cut _______ sugary drinks.',
        options: { A: 'down on', B: 'up with', C: 'out of', D: 'off from' },
        correctAnswer: 'A',
        explanation: 'Cụm "cut down on sth" mang nghĩa "cắt giảm tiêu thụ cái gì" (cut down on sugary drinks = cắt giảm đồ uống có đường) -> chọn "down on".',
        clue: 'cắt giảm -> cut down on',
        translation: 'Để cải thiện sức khỏe tim mạch, bạn nên cắt giảm đồ uống có đường.'
      }
    ],
    questionPool: [
      {
        id: 'q7-p1',
        question: 'The firefighters worked tirelessly to put _______ the blaze in the forest.',
        options: { A: 'out', B: 'off', C: 'up', D: 'down' },
        correctAnswer: 'A',
        explanation: '"Put out the blaze/fire" = dập tắt đám cháy -> chọn "out".',
        clue: 'put out = dập tắt lửa',
        translation: 'Các nhân viên cứu hỏa đã làm việc không mệt mỏi để dập tắt đám cháy trong rừng.'
      }
    ]
  },

  // ==========================================
  // 8. HÒA HỢP THÌ
  // ==========================================
  {
    id: 'topic-8',
    topicNumber: 8,
    title: 'Chuyên đề 8: Hòa hợp thì',
    shortTitle: 'Hòa hợp thì',
    englishTitle: 'Sequence of Tenses & Agreement',
    difficulty: 'Trọng tâm',
    concept: 'Sự phối hợp thì trong mệnh đề thời gian (As soon as, When, By the time) và sự hòa hợp giữa Chủ ngữ - Động từ.',
    formulas: [
      'Tương lai: S + will + V + As soon as / When / Until + S + V(hiện tại đơn / hiện tại hoàn thành)',
      'Quá khứ xen vào: S + was/were + V-ing + WHEN + S + V(quá khứ đơn)',
      'Trước - Sau quá khứ: By the time / Before + S + V(quá khứ đơn), S + had + V3',
      'Hiện tại hoàn thành: S + have/has + V3 + SINCE + S + V(quá khứ đơn)',
      'Neither S1 nor S2 -> chia theo S2 | S1 as well as S2 -> chia theo S1 | The number of + N(pl) + V(số ít)'
    ],
    rules: [
      { label: 'QUY TẮC CẤM', text: 'KHÔNG BAO GIỜ dùng "will" trong mệnh đề thời gian bắt đầu bằng When, As soon as, Until, Before, After. Mệnh đề này LUÔN chia ở Hiện tại đơn.' }
    ],
    examples: [
      { en: 'I will call you as soon as I arrive at the hotel.', vi: 'Tôi sẽ gọi cho bạn ngay khi tôi đến khách sạn.', note: 'Mệnh đề chính dùng will, mệnh đề thời gian dùng hiện tại đơn (arrive).' },
      { en: 'By the time the police arrived, the burglar had escaped.', vi: 'Vào thời điểm cảnh sát đến, tên trộm đã tẩu thoát rồi.', note: 'By the time + quá khứ đơn, vế chính dùng had + V3.' }
    ],
    examTips: [
      'Thần chú mệnh đề thời gian ở tương lai: Thấy "will + V" ở mệnh đề chính -> Chỗ trống sau When/As soon as LUÔN CHỌN ĐỘNG TỪ Ở HIỆN TẠI ĐƠN!'
    ],
    questions: [
      {
        id: 'q8-1',
        question: 'I will send you the confirmation email as soon as I _______ the reservation.',
        options: { A: 'will complete', B: 'complete', C: 'completed', D: 'had completed' },
        correctAnswer: 'B',
        explanation: 'Quy tắc hòa hợp thì: S + will + V + as soon as + S + V(hiện tại đơn). Tuyệt đối không dùng "will" sau as soon as -> chọn "complete".',
        clue: 'will send... as soon as + V(hiện tại đơn)',
        translation: 'Tôi sẽ gửi cho bạn email xác nhận ngay khi tôi hoàn tất việc đặt chỗ.'
      },
      {
        id: 'q8-2',
        question: 'By the time the rescue team reached the area, the flood water _______.',
        options: { A: 'receded', B: 'has receded', C: 'had receded', D: 'was receding' },
        correctAnswer: 'C',
        explanation: 'By the time + S + V(quá khứ đơn), S + had + V3 (hành động nước rút xảy ra trước khi đội cứu hộ đến) -> chọn "had receded".',
        clue: 'By the time + V(quá khứ đơn) -> had + V3',
        translation: 'Vào thời điểm đội cứu hộ tiếp cận được khu vực, nước lũ đã rút rồi.'
      },
      {
        id: 'q8-3',
        question: 'While the teacher _______ the lesson, the school alarm suddenly rang.',
        options: { A: 'explained', B: 'was explaining', C: 'has explained', D: 'explains' },
        correctAnswer: 'B',
        explanation: 'Hành động đang diễn ra trong quá khứ (giáo viên đang giảng bài - quá khứ tiếp diễn) thì có hành động ngắn khác xen vào (chuông reo - quá khứ đơn rang) -> chọn "was explaining".',
        clue: 'While + quá khứ tiếp diễn, quá khứ đơn',
        translation: 'Trong khi cô giáo đang giảng bài thì chuông trường bất ngờ reo lên.'
      },
      {
        id: 'q8-4',
        question: 'Neither the manager nor his employees _______ aware of the sudden policy change yesterday.',
        options: { A: 'was', B: 'were', C: 'is', D: 'are' },
        correctAnswer: 'B',
        explanation: 'Neither S1 nor S2: động từ hòa hợp theo S2 ("his employees" - số nhiều) và có "yesterday" (quá khứ) -> chọn "were".',
        clue: 'Neither S1 nor S2 -> chia theo S2 (employees) + yesterday',
        translation: 'Cả người quản lý lẫn các nhân viên của ông đều không biết về sự thay đổi chính sách đột ngột ngày hôm qua.'
      },
      {
        id: 'q8-5',
        question: 'The principal, along with several experienced teachers, _______ attending the education summit.',
        options: { A: 'is', B: 'are', C: 'were', D: 'have been' },
        correctAnswer: 'A',
        explanation: 'S1, along with S2: động từ hòa hợp theo CHỦ NGỮ THỨ NHẤT ("The principal" - số ít) -> chọn "is".',
        clue: 'S1, along with S2 -> chia theo S1 (The principal)',
        translation: 'Thầy hiệu trưởng cùng với vài giáo viên giàu kinh nghiệm đang tham dự hội nghị thượng đỉnh giáo dục.'
      }
    ],
    questionPool: [
      {
        id: 'q8-p1',
        question: 'He has lived in this coastal town since he _______ university in 2018.',
        options: { A: 'graduates', B: 'graduated', C: 'has graduated', D: 'had graduated' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc: S + have/has + V3 + SINCE + S + V(quá khứ đơn) -> chọn "graduated".',
        clue: 'since + V(quá khứ đơn)',
        translation: 'Anh ấy đã sống ở thị trấn ven biển này kể từ khi anh tốt nghiệp đại học năm 2018.'
      }
    ]
  },

  // ==========================================
  // 9. CÂU BỊ ĐỘNG
  // ==========================================
  {
    id: 'topic-9',
    topicNumber: 9,
    title: 'Chuyên đề 9: Bị động',
    shortTitle: 'Bị động',
    englishTitle: 'Passive Voice',
    difficulty: 'Trọng tâm',
    concept: 'Câu bị động cơ bản (S + be + V3), bị động động từ khiếm khuyết (Modal + be + V3), bị động truyền khiến (have/get sth done) và bị động động từ chỉ quan điểm.',
    formulas: [
      'Công thức tổng quát: S + BE + V3/ed + (by O)',
      'Tiếp diễn: S + be + BEING + V3/ed | Hoàn thành: S + have/has/had + BEEN + V3/ed',
      'Khiếm khuyết: Modal + BE + V3/ed',
      'Truyền khiến: S + have / get + O(vật) + V3/ed (nhờ ai làm việc gì)',
      'Động từ quan điểm: S2 + is/are/was + said/believed + TO V (cùng thì) / TO HAVE V3 (trước thì)'
    ],
    rules: [
      { label: 'Bị động của Make', text: 'Chủ động: make sb do sth -> Bị động: be made TO DO sth (bắt buộc thêm TO).' },
      { label: 'Nội động từ', text: 'Các từ như happen, occur, appear, disappear, die KHÔNG BAO GIỜ chia bị động.' }
    ],
    examples: [
      { en: 'The ancient temple was severely damaged by the typhoon.', vi: 'Ngôi đền cổ đã bị hư hại nặng nề do cơn bão.', note: 'Bị động quá khứ đơn: was damaged.' },
      { en: 'He had his motorcycle repaired yesterday.', vi: 'Hôm qua anh ấy đã đem xe máy đi sửa.', note: 'Have + sth + V3/ed (nhờ sửa).' }
    ],
    examTips: [
      'Gặp câu bị động quan điểm: Nếu việc xảy ra ở quá khứ mà vế trước ở hiện tại (is said), luôn chọn "to have + V3"!'
    ],
    questions: [
      {
        id: 'q9-1',
        question: 'The new school regulations _______ by the administration at the end of last month.',
        options: { A: 'approved', B: 'were approved', C: 'have approved', D: 'are approved' },
        correctAnswer: 'B',
        explanation: 'Quy định được thông qua (bị động) và mốc thời gian "last month" (quá khứ đơn) -> chọn "were approved".',
        clue: 'regulations (vật) + last month -> were approved',
        translation: 'Các nội quy mới của trường đã được ban giám hiệu thông qua vào cuối tháng trước.'
      },
      {
        id: 'q9-2',
        question: 'The suspect is believed _______ the country using a forged passport yesterday.',
        options: { A: 'to flee', B: 'to have fled', C: 'having fled', D: 'fled' },
        correctAnswer: 'B',
        explanation: 'Hiện tại người ta tin ("is believed"), nhưng việc bỏ trốn xảy ra hôm qua ("yesterday"). Lệch thì -> dùng "to have + V3" (to have fled).',
        clue: 'is believed + yesterday -> to have V3',
        translation: 'Nghi phạm được cho là đã trốn khỏi đất nước bằng hộ chiếu giả ngày hôm qua.'
      },
      {
        id: 'q9-3',
        question: 'Lan didn\'t have time to wash her coat, so she had it _______ at the dry cleaner\'s.',
        options: { A: 'clean', B: 'cleaning', C: 'cleaned', D: 'to clean' },
        correctAnswer: 'C',
        explanation: 'Cấu trúc bị động truyền khiến: have + sth + V3/ed (đem áo đi giặt) -> chọn "cleaned".',
        clue: 'had it (coat) + V3/ed',
        translation: 'Lan không có thời gian giặt áo khoác nên cô ấy đã đem nó đi giặt khô.'
      },
      {
        id: 'q9-4',
        question: 'During military training, all recruits were made _______ five miles every morning.',
        options: { A: 'run', B: 'to run', C: 'running', D: 'ran' },
        correctAnswer: 'B',
        explanation: 'Bị động của make: "be made + TO V" (bị bắt buộc làm gì) -> chọn "to run".',
        clue: 'be made + to V',
        translation: 'Trong đợt huấn luyện quân sự, tất cả các tân binh đều bị bắt phải chạy năm dặm mỗi sáng.'
      },
      {
        id: 'q9-5',
        question: 'A modern library is currently _______ on our campus to serve thousands of students.',
        options: { A: 'building', B: 'been built', C: 'being built', D: 'built' },
        correctAnswer: 'C',
        explanation: 'Chủ ngữ là "A modern library" (thư viện hiện đại) và có từ "currently" (hiện tại). Bị động hiện tại tiếp diễn: is currently + being + V3 -> chọn "being built".',
        clue: 'is currently + being + V3',
        translation: 'Một thư viện hiện đại hiện đang được xây dựng trong khuôn viên trường chúng tôi để phục vụ hàng ngàn sinh viên.'
      }
    ],
    questionPool: [
      {
        id: 'q9-p1',
        question: 'All safety guidelines must _______ strictly by everyone entering the lab.',
        options: { A: 'follow', B: 'be followed', C: 'followed', D: 'have followed' },
        correctAnswer: 'B',
        explanation: 'Modal verb bị động: must + BE + V3/ed -> chọn "be followed".',
        clue: 'must + be + V3',
        translation: 'Tất cả các hướng dẫn an toàn phải được tuân thủ nghiêm ngặt bởi mọi người khi vào phòng thí nghiệm.'
      }
    ]
  },

  // ==========================================
  // 10. CÂU ĐIỀU KIỆN
  // ==========================================
  {
    id: 'topic-10',
    topicNumber: 10,
    title: 'Chuyên đề 10: Điều kiện',
    shortTitle: 'Điều kiện',
    englishTitle: 'Conditionals & Wish',
    difficulty: 'Trọng tâm',
    concept: 'Ba loại câu điều kiện cơ bản (Loại 1, 2, 3), điều kiện hỗn hợp, đảo ngữ câu điều kiện và cấu trúc tương đương (Unless, But for, Provided that).',
    formulas: [
      'Loại 1: If + S + V(s/es), S + will / can + V (có thể xảy ra ở hiện tại/tương lai)',
      'Loại 2: If + S + V2/were, S + would / could + V (trái với hiện tại)',
      'Loại 3: If + S + had + V3, S + would / could + have + V3 (trái với quá khứ)',
      'Đảo ngữ: Should + S + V (Loại 1) | Were + S + to V / Were + S + ... (Loại 2) | Had + S + V3 (Loại 3)',
      'But for / Without + N, S + would (have) V (Nếu không nhờ có...)'
    ],
    rules: [
      { label: 'To be ở Loại 2', text: 'To be luôn dùng WERE cho mọi ngôi trong ngữ pháp chuẩn (If I were you, If he were here).' },
      { label: 'Unless = If... not', text: 'Không dùng thể phủ định sau Unless (Unless you study hard = If you don\'t study hard).' }
    ],
    examples: [
      { en: 'If I were you, I would take that great opportunity.', vi: 'Nếu tôi là bạn, tôi sẽ nắm lấy cơ hội tuyệt vời đó.', note: 'Loại 2 trái hiện tại: If I were you, I would take.' },
      { en: 'Had I known about the schedule change, I wouldn\'t have arrived so early.', vi: 'Nếu tôi biết về việc đổi lịch, tôi đã không đến sớm thế.', note: 'Đảo ngữ loại 3: Had + S + V3.' }
    ],
    examTips: [
      'Thần chú đảo ngữ điều kiện: Thấy đầu câu có Should, Were, hoặc Had đứng trước chủ ngữ -> ĐÓ CHÍNH LÀ ĐẢO NGỮ CÂU ĐIỀU KIỆN!'
    ],
    questions: [
      {
        id: 'q10-1',
        question: 'If the weather _______ fine tomorrow, we will go hiking in the national park.',
        options: { A: 'is', B: 'was', C: 'were', D: 'will be' },
        correctAnswer: 'A',
        explanation: 'Vế chính dùng "will go" (tương lai đơn) -> Điều kiện loại 1. Mệnh đề If chia hiện tại đơn: "is". Không dùng "will be" sau If.',
        clue: 'will go -> điều kiện loại 1 -> is',
        translation: 'Nếu ngày mai thời tiết đẹp, chúng tôi sẽ đi leo núi ở vườn quốc gia.'
      },
      {
        id: 'q10-2',
        question: 'If she had followed the doctor\'s advice, she _______ so ill last week.',
        options: { A: 'wouldn\'t be', B: 'won\'t be', C: 'wouldn\'t have been', D: 'hadn\'t been' },
        correctAnswer: 'C',
        explanation: 'Mệnh đề If chia quá khứ hoàn thành "had followed", có mốc thời gian "last week" -> Điều kiện loại 3. Vế chính: "wouldn\'t have been".',
        clue: 'had followed + last week -> would have V3',
        translation: 'Nếu cô ấy nghe theo lời khuyên của bác sĩ thì tuần trước cô ấy đã không bị ốm nặng như vậy.'
      },
      {
        id: 'q10-3',
        question: '_______ you require any further assistance, please feel free to ask our staff.',
        options: { A: 'Were', B: 'Should', C: 'Had', D: 'Unless' },
        correctAnswer: 'B',
        explanation: 'Đảo ngữ câu điều kiện loại 1: "Should + S + V(bare), câu mệnh lệnh". Động từ "require" ở dạng nguyên mẫu -> chọn "Should".',
        clue: 'Should + S + V(bare)',
        translation: 'Nếu bạn cần thêm bất kỳ sự trợ giúp nào, xin vui lòng hỏi nhân viên của chúng tôi.'
      },
      {
        id: 'q10-4',
        question: '_______ your timely encouragement, I could never have completed the marathon.',
        options: { A: 'Unless', B: 'Provided that', C: 'But for', D: 'In case' },
        correctAnswer: 'C',
        explanation: 'Phía sau là cụm danh từ "your timely encouragement" và vế sau có "could have completed" (loại 3). Cấu trúc "But for + N" (Nếu không nhờ có...) -> chọn "But for".',
        clue: 'But for + Cụm danh từ',
        translation: 'Nếu không nhờ có sự động viên kịp thời của bạn, tôi không bao giờ có thể hoàn thành cuộc thi chạy marathon.'
      },
      {
        id: 'q10-5',
        question: 'If he had booked tickets earlier, he _______ on the flight right now.',
        options: { A: 'would be', B: 'would have been', C: 'is', D: 'will be' },
        correctAnswer: 'A',
        explanation: 'Điều kiện hỗn hợp (3 - 2): Vế If ở quá khứ (had booked), nhưng vế chính có "right now" (hiện tại) -> dùng "would be".',
        clue: 'had booked (quá khứ) + right now (hiện tại) -> would V',
        translation: 'Nếu anh ấy đặt vé sớm hơn thì ngay lúc này anh ấy đã đang ở trên chuyến bay rồi.'
      }
    ],
    questionPool: [
      {
        id: 'q10-p1',
        question: 'Had they known about the traffic jam, they _______ a different route.',
        options: { A: 'would take', B: 'would have taken', C: 'will take', D: 'took' },
        correctAnswer: 'B',
        explanation: 'Đảo ngữ điều kiện loại 3: "Had + S + V3, S + would have + V3" -> chọn "would have taken".',
        clue: 'Had they known -> would have taken',
        translation: 'Nếu họ biết về vụ tắc đường, họ đã đi một con đường khác rồi.'
      }
    ]
  },

  // ==========================================
  // 11. ĐỘNG TỪ KHIẾM KHUYẾT
  // ==========================================
  {
    id: 'topic-11',
    topicNumber: 11,
    title: 'Chuyên đề 11: Khiếm khuyết',
    shortTitle: 'Khiếm khuyết',
    englishTitle: 'Modal Verbs & Modal Perfect',
    difficulty: 'Nâng cao',
    concept: 'Phân biệt Must (bắt buộc), Mustn\'t (cấm đoán), Don\'t have to / Needn\'t (không bắt buộc) và Khuyết thiếu hoàn thành (Modal + have + V3) để suy đoán quá khứ.',
    formulas: [
      'MUST: Bắt buộc | MUSTN\'T: Cấm đoán tuyệt đối | DON\'T HAVE TO / NEEDN\'T: Không cần thiết',
      'MUST HAVE + V3: Chắc hẳn là đã (suy đoán chắc chắn trong quá khứ có bằng chứng)',
      'CAN\'T / COULDN\'T HAVE + V3: Chắc chắn là đã KHÔNG THỂ (phủ định suy đoán có căn cứ)',
      'SHOULD HAVE + V3: Lẽ ra nên làm (nhưng thực tế đã không làm -> tiếc nuối)',
      'NEEDN\'T HAVE + V3: Lẽ ra không cần làm (nhưng đã làm mất công)'
    ],
    rules: [
      { label: 'Quy tắc cấm', text: 'KHÔNG BAO GIỜ dùng "Mustn\'t have V3" để suy đoán phủ định! Để suy đoán "chắc chắn đã không", BẮT BUỘC dùng Can\'t have V3 hoặc Couldn\'t have V3.' }
    ],
    examples: [
      { en: 'The ground is wet; it must have rained heavily last night.', vi: 'Mặt đất ướt sũng; đêm qua chắc hẳn trời đã mưa to.', note: 'Bằng chứng đất ướt -> must have rained.' },
      { en: 'You shouldn\'t have stayed up so late watching TV.', vi: 'Lẽ ra bạn không nên thức khuya như thế xem TV.', note: 'Trách móc việc đã làm trong quá khứ -> shouldn\'t have stayed.' }
    ],
    examTips: [
      'Đề bài cho "It is forbidden / against the rules to..." -> Viết lại dùng MUSTN\'T. Đề cho "It is not necessary to..." -> Viết lại dùng NEEDN\'T.'
    ],
    questions: [
      {
        id: 'q11-1',
        question: 'Jack was absent from class today. He _______ ill because he didn\'t reply to any messages.',
        options: { A: 'must be', B: 'must have been', C: 'can be', D: 'should have been' },
        correctAnswer: 'B',
        explanation: 'Sự việc xảy ra trong quá khứ ("was absent", "didn\'t reply"). Suy đoán có căn cứ về việc đã diễn ra trong quá khứ -> dùng "must have + V3" (must have been).',
        clue: 'was absent + didn\'t reply (quá khứ) -> must have V3',
        translation: 'Hôm nay Jack vắng mặt. Chắc hẳn cậu ấy đã bị ốm vì cậu ấy không trả lời tin nhắn nào.'
      },
      {
        id: 'q11-2',
        question: 'Tom _______ the antique vase because he was standing in the garden at that moment.',
        options: { A: 'must have broken', B: 'can\'t have broken', C: 'shouldn\'t have broken', D: 'needn\'t have broken' },
        correctAnswer: 'B',
        explanation: 'Có căn cứ rõ ràng: Tom đang đứng ngoài vườn lúc đó, nên anh ta "chắc chắn không thể đã làm vỡ" chiếc bình -> dùng "can\'t have + V3".',
        clue: 'standing in the garden -> can\'t have broken',
        translation: 'Tom chắc chắn không thể đã làm vỡ chiếc bình cổ vì lúc đó cậu ấy đang đứng ngoài vườn.'
      },
      {
        id: 'q11-3',
        question: 'You _______ the essay; the teacher had already cancelled the assignment yesterday.',
        options: { A: 'mustn\'t write', B: 'needn\'t have written', C: 'couldn\'t write', D: 'might not write' },
        correctAnswer: 'B',
        explanation: 'Bài tập đã được viết xong nhưng thực ra không cần thiết vì giáo viên đã hủy từ hôm qua -> dùng "needn\'t have + V3" (lẽ ra không cần làm).',
        clue: 'lẽ ra không cần làm (đã lỡ làm) -> needn\'t have V3',
        translation: 'Lẽ ra bạn không cần phải viết bài luận đó; giáo viên đã hủy bài tập đó từ hôm qua rồi.'
      },
      {
        id: 'q11-4',
        question: 'According to museum policy, visitors _______ touch any of the fragile exhibits.',
        options: { A: 'don\'t have to', B: 'mustn\'t', C: 'needn\'t', D: 'won\'t' },
        correctAnswer: 'B',
        explanation: 'Quy định bảo tàng mang tính cấm đoán tuyệt đối -> dùng "mustn\'t".',
        clue: 'museum policy (nội quy cấm) -> mustn\'t',
        translation: 'Theo quy định của bảo tàng, khách tham quan tuyệt đối không được chạm vào bất kỳ hiện vật dễ vỡ nào.'
      },
      {
        id: 'q11-5',
        question: 'I feel exhausted today. I _______ up so late playing video games last night.',
        options: { A: 'shouldn\'t have stayed', B: 'mustn\'t stay', C: 'can\'t have stayed', D: 'needn\'t stay' },
        correctAnswer: 'A',
        explanation: 'Hối tiếc vì đêm qua ("last night") đã thức quá khuya. Diễn tả sự tiếc nuối việc lẽ ra không nên làm trong quá khứ -> dùng "shouldn\'t have + V3".',
        clue: 'last night + hối hận -> shouldn\'t have V3',
        translation: 'Hôm nay tôi thấy kiệt sức. Lẽ ra tối qua tôi không nên thức khuya như thế để chơi điện tử.'
      }
    ],
    questionPool: [
      {
        id: 'q11-p1',
        question: 'She got a perfect score on the entrance exam; she _______ very hard for months.',
        options: { A: 'must have studied', B: 'should have studied', C: 'can\'t have studied', D: 'needn\'t have studied' },
        correctAnswer: 'A',
        explanation: 'Điểm tuyệt đối là bằng chứng rõ ràng -> suy đoán chắc chắn ở quá khứ: "must have studied" (chắc hẳn đã học rất chăm).',
        clue: 'perfect score -> must have V3',
        translation: 'Cô ấy đạt điểm tuyệt đối trong kỳ thi đầu vào; chắc hẳn cô ấy đã học tập rất chăm chỉ trong nhiều tháng.'
      }
    ]
  },

  // ==========================================
  // 12. LIÊN TỪ VÀ MỆNH ĐỀ TRẠNG NGỮ
  // ==========================================
  {
    id: 'topic-12',
    topicNumber: 12,
    title: 'Chuyên đề 12: Liên từ và mệnh đề trạng ngữ',
    shortTitle: 'Liên từ & MĐ trạng ngữ',
    englishTitle: 'Conjunctions & Adverbial Clauses',
    difficulty: 'Trọng tâm',
    concept: 'Phân biệt Mệnh đề (Clause S + V) với Cụm từ (Phrase N / V-ing): Nhượng bộ (Although vs Despite), Nguyên nhân (Because vs Because of), Mục đích (So that vs In order to), và Kết quả (So... that).',
    formulas: [
      'Nhượng bộ: Although / Even though / Though + S + V = Despite / In spite of + Noun / V-ing',
      'Nguyên nhân: Because / Since / As + S + V = Because of / Due to / Owing to + Noun / V-ing',
      'Mục đích: So that / In order that + S + can/could + V = In order to / So as to + V',
      'Kết quả: So + Adj/Adv + that + S + V = Such + (a/an) + Adj + N + that + S + V'
    ],
    rules: [
      { label: 'Nhận diện Clause vs Phrase', text: 'Nhìn sau chỗ trống: Có Chủ ngữ + Động từ chia thì (S + V) -> chọn Although / Because. Chỉ có Cụm danh từ / V-ing không có động từ chính -> chọn Despite / Because of.' }
    ],
    examples: [
      { en: 'Although it rained heavily, we enjoyed the soccer match.', vi: 'Mặc dù trời mưa to, chúng tôi vẫn rất thích trận bóng.', note: 'Sau Although là mệnh đề S + V (it rained).' },
      { en: 'Despite the heavy rain, the soccer match went ahead.', vi: 'Bất chấp trời mưa to, trận bóng vẫn diễn ra.', note: 'Sau Despite chỉ là cụm danh từ (the heavy rain).' }
    ],
    examTips: [
      'Lưu ý "Despite the fact that + S + V": Khi có thêm cụm "the fact that", phía sau lại là một MỆNH ĐỀ đầy đủ!'
    ],
    questions: [
      {
        id: 'q12-1',
        question: '_______ his severe visual impairment, he graduated from university with top honors.',
        options: { A: 'Although', B: 'Despite', C: 'Because', D: 'Because of' },
        correctAnswer: 'B',
        explanation: 'Phía sau là cụm danh từ "his severe visual impairment". Ngữ cảnh tương phản nhượng bộ -> chọn "Despite".',
        clue: 'Cụm danh từ + ý nhượng bộ -> Despite',
        translation: 'Bất chấp sự suy giảm thị lực nghiêm trọng, anh ấy đã tốt nghiệp đại học với thành tích thủ khoa.'
      },
      {
        id: 'q12-2',
        question: 'The flight to Tokyo was cancelled _______ the dense fog over the runway.',
        options: { A: 'because', B: 'because of', C: 'although', D: 'in spite of' },
        correctAnswer: 'B',
        explanation: 'Phía sau là cụm danh từ "the dense fog...". Ngữ cảnh chỉ nguyên nhân chuyến bay bị hủy -> chọn "because of".',
        clue: 'Cụm danh từ + nguyên nhân -> because of',
        translation: 'Chuyến bay đến Tokyo đã bị hủy vì sương mù dày đặc trên đường băng.'
      },
      {
        id: 'q12-3',
        question: 'The lecture was _______ engaging that all students listened attentively.',
        options: { A: 'so', B: 'such', C: 'too', D: 'very' },
        correctAnswer: 'A',
        explanation: 'Cấu trúc "so + Adj + that + S + V". "Engaging" là tính từ đứng độc lập trước "that" -> chọn "so".',
        clue: 'so + Adj (engaging) + that',
        translation: 'Bài giảng hấp dẫn đến nỗi tất cả sinh viên đều chăm chú lắng nghe.'
      },
      {
        id: 'q12-4',
        question: 'She put her phone on silent _______ she could concentrate fully on her revision.',
        options: { A: 'in order to', B: 'so that', C: 'because of', D: 'as a result' },
        correctAnswer: 'B',
        explanation: 'Phía sau là mệnh đề chỉ mục đích có modal verb "she could concentrate..." -> chọn "so that". (In order to phải đi trực tiếp với to V).',
        clue: 'mệnh đề mục đích (S + could + V) -> so that',
        translation: 'Cô ấy để điện thoại ở chế độ im lặng để cô ấy có thể tập trung hoàn toàn vào việc ôn tập.'
      },
      {
        id: 'q12-5',
        question: '_______ she had practiced her speech many times, she still felt nervous on stage.',
        options: { A: 'Even though', B: 'In spite of', C: 'Because', D: 'Since' },
        correctAnswer: 'A',
        explanation: 'Phía sau là mệnh đề đầy đủ: S (she) + V (had practiced). Ngữ cảnh nhượng bộ (dù luyện nhiều nhưng vẫn run) -> chọn "Even though".',
        clue: 'Mệnh đề S + V + nhượng bộ -> Even though',
        translation: 'Mặc dù cô ấy đã luyện bài phát biểu nhiều lần, cô ấy vẫn thấy run khi lên sân khấu.'
      }
    ],
    questionPool: [
      {
        id: 'q12-p1',
        question: 'It was _______ cold weather that we decided to stay indoors all weekend.',
        options: { A: 'such', B: 'so', C: 'too', D: 'very' },
        correctAnswer: 'A',
        explanation: 'Weather là danh từ không đếm được. Cấu trúc "such + Adj + N(không đếm được) + that" -> chọn "such".',
        clue: 'such + cold weather + that',
        translation: 'Thời tiết lạnh đến nỗi chúng tôi quyết định ở trong nhà suốt cả cuối tuần.'
      }
    ]
  },

  // ==========================================
  // 13. TRẠNG TỪ LIÊN KẾT
  // ==========================================
  {
    id: 'topic-13',
    topicNumber: 13,
    title: 'Chuyên đề 13: Trạng từ liên kết',
    shortTitle: 'Trạng từ liên kết',
    englishTitle: 'Conjunctive Adverbs',
    difficulty: 'Trọng tâm',
    concept: 'Trạng từ nối hai câu độc lập, đứng sau dấu chấm hoặc chấm phẩy và có dấu phẩy đi kèm (. However, / ; therefore,). Phân biệt theo các nhóm ý nghĩa.',
    formulas: [
      'Tương phản: However (tuy nhiên), Nevertheless / Nonetheless (dẫu vậy), In contrast (trái lại)',
      'Hệ quả: Therefore (vì vậy), Consequently / As a result (kết quả là), Thus (do đó)',
      'Bổ sung: Furthermore / Moreover (hơn nữa), In addition (thêm vào đó), Besides (bên cạnh đó)',
      'Điều kiện: Otherwise (nếu không thì)'
    ],
    rules: [
      { label: 'Quy tắc dấu câu', text: 'Sentence 1. However, Sentence 2. HOẶC Sentence 1; however, Sentence 2. Luôn có dấu phẩy sau trạng từ liên kết.' }
    ],
    examples: [
      { en: 'The project was difficult. However, they finished it on time.', vi: 'Dự án rất khó. Tuy nhiên, họ đã hoàn thành nó đúng hạn.', note: '. However,' },
      { en: 'You must submit the form today; otherwise, your application will be rejected.', vi: 'Bạn phải nộp đơn hôm nay; nếu không thì đơn sẽ bị từ chối.', note: '; otherwise,' }
    ],
    examTips: [
      'Phân biệt với liên từ phụ thuộc: "Although" đi liền với mệnh đề và KHÔNG có dấu phẩy ngay sau nó. "However" thường đứng độc lập kèm dấu phẩy.'
    ],
    questions: [
      {
        id: 'q13-1',
        question: 'Solar energy is renewable and green. _______, the initial installation cost remains high.',
        options: { A: 'However', B: 'Therefore', C: 'Furthermore', D: 'Consequently' },
        correctAnswer: 'A',
        explanation: 'Câu trước nêu ưu điểm (năng lượng tái tạo xanh), câu sau nêu nhược điểm (chi phí lắp đặt cao). Quan hệ tương phản giữa 2 câu -> chọn "However".',
        clue: 'Ưu điểm đối lập Nhược điểm -> However',
        translation: 'Năng lượng mặt trời có thể tái tạo và thân thiện với môi trường. Tuy nhiên, chi phí lắp đặt ban đầu vẫn còn cao.'
      },
      {
        id: 'q13-2',
        question: 'The factory violated safety regulations. _______, it was heavily fined by the authorities.',
        options: { A: 'Nevertheless', B: 'Consequently', C: 'Moreover', D: 'Otherwise' },
        correctAnswer: 'B',
        explanation: 'Câu trước nêu nguyên nhân vi phạm, câu sau nêu kết quả bị phạt. Quan hệ nhân quả -> chọn "Consequently" (kết quả là / do đó).',
        clue: 'vi phạm -> bị phạt (hệ quả -> Consequently)',
        translation: 'Nhà máy đã vi phạm các quy định an toàn. Do đó, nó đã bị chính quyền phạt nặng.'
      },
      {
        id: 'q13-3',
        question: 'Exercise strengthens the heart. _______, it improves sleep quality and reduces stress.',
        options: { A: 'In addition', B: 'Otherwise', C: 'However', D: 'Instead' },
        correctAnswer: 'A',
        explanation: 'Bổ sung thêm lợi ích thứ hai của việc tập thể dục -> chọn "In addition" (thêm vào đó).',
        clue: 'bổ sung thêm lợi ích -> In addition',
        translation: 'Tập thể dục giúp tim khỏe mạnh. Thêm vào đó, nó cải thiện chất lượng giấc ngủ và giảm căng thẳng.'
      },
      {
        id: 'q13-4',
        question: 'You must save your work frequently; _______, you might lose valuable data.',
        options: { A: 'furthermore', B: 'otherwise', C: 'therefore', D: 'nevertheless' },
        correctAnswer: 'B',
        explanation: 'Khuyên làm việc gì, "nếu không thì" sẽ gặp hậu quả xấu -> chọn "otherwise".',
        clue: 'nếu không thì -> otherwise',
        translation: 'Bạn phải thường xuyên lưu bài làm; nếu không thì bạn có thể bị mất dữ liệu quý giá.'
      },
      {
        id: 'q13-5',
        question: 'The phone features a stunning display and long battery life. _______, its camera is superb.',
        options: { A: 'Moreover', B: 'However', C: 'Consequently', D: 'Otherwise' },
        correctAnswer: 'A',
        explanation: 'Bổ sung thêm điểm cộng của chiếc điện thoại -> chọn "Moreover" (hơn nữa).',
        clue: 'bổ sung thêm điểm mạnh -> Moreover',
        translation: 'Chiếc điện thoại có màn hình tuyệt đẹp và pin bền. Hơn nữa, máy ảnh của nó cũng rất xuất sắc.'
      }
    ],
    questionPool: [
      {
        id: 'q13-p1',
        question: 'He worked hard for months. _______, he passed the bar examination with distinction.',
        options: { A: 'As a result', B: 'However', C: 'Otherwise', D: 'Nevertheless' },
        correctAnswer: 'A',
        explanation: 'Học chăm chỉ dẫn đến kết quả thi đỗ -> chọn "As a result" (kết quả là).',
        clue: 'nguyên nhân -> kết quả (As a result)',
        translation: 'Anh ấy đã làm việc chăm chỉ suốt nhiều tháng. Kết quả là, anh ấy đã vượt qua kỳ thi luật sư với thành tích xuất sắc.'
      }
    ]
  },

  // ==========================================
  // 14. MỆNH ĐỀ QUAN HỆ (MĐQH)
  // ==========================================
  {
    id: 'topic-14',
    topicNumber: 14,
    title: 'Chuyên đề 14: MĐQH',
    shortTitle: 'MĐQH',
    englishTitle: 'Relative Clauses',
    difficulty: 'Trọng tâm',
    concept: 'Đại từ quan hệ (Who, Whom, Which, That, Whose), trạng từ quan hệ (Where, When, Why), phân biệt MĐ quan hệ xác định và không xác định (có dấu phẩy).',
    formulas: [
      'WHO: thay cho người làm S/O | WHOM: thay cho người làm O (sau giới từ: with whom)',
      'WHICH: thay cho vật làm S/O | thay cho cả mệnh đề đứng trước (sau dấu phẩy: , which)',
      'WHOSE + N: chỉ quan hệ sở hữu cho người hoặc vật',
      'THAT: thay cho Who, Whom, Which trong MĐ xác định (CẤM dùng sau dấu phẩy và giới từ)',
      'WHERE = in/at which | WHEN = on/in which | WHY = for which'
    ],
    rules: [
      { label: 'Sau giới từ', text: 'Chỉ được dùng WHOM (người) hoặc WHICH (vật). Tuyệt đối KHÔNG dùng That hoặc Who sau giới từ.' },
      { label: 'MĐ không xác định (có dấu phẩy)', text: 'Đứng sau danh từ riêng hoặc danh từ đã xác định (this, that, my...). KHÔNG dùng That, KHÔNG lược bỏ đại từ quan hệ.' }
    ],
    examples: [
      { en: 'The scientist whose breakthrough won the Nobel Prize gave a speech.', vi: 'Nhà khoa học có công trình đột phá đoạt giải Nobel đã phát biểu.', note: 'scientist + whose + breakthrough (sở hữu).' },
      { en: 'He failed the exam, which surprised everyone.', vi: 'Cậu ấy thi trượt, điều này làm mọi người bất ngờ.', note: ', which thay cho cả vế thi trượt phía trước.' }
    ],
    examTips: [
      '2 ĐIỀU CẤM KỴ CỦA "THAT": Không dùng sau dấu phẩy và không dùng sau giới từ!'
    ],
    questions: [
      {
        id: 'q14-1',
        question: 'The professor _______ lecture on astronomy attracted hundreds of students is from Harvard.',
        options: { A: 'who', B: 'whose', C: 'whom', D: 'which' },
        correctAnswer: 'B',
        explanation: 'Giữa danh từ chỉ người "The professor" và danh từ "lecture" có quan hệ sở hữu (bài giảng của vị giáo sư) -> chọn "whose".',
        clue: 'professor + whose + lecture',
        translation: 'Vị giáo sư có bài giảng về thiên văn học thu hút hàng trăm sinh viên đến từ Đại học Harvard.'
      },
      {
        id: 'q14-2',
        question: 'The committee awarded scholarships to five students, all of _______ had outstanding records.',
        options: { A: 'who', B: 'whom', C: 'which', D: 'that' },
        correctAnswer: 'B',
        explanation: 'Sau giới từ "of" thay thế cho danh từ chỉ người ("five students") bắt buộc dùng "whom" (all of whom) -> chọn B.',
        clue: 'all of + whom',
        translation: 'Ủy ban đã trao học bổng cho năm sinh viên, tất cả họ đều có bảng thành tích xuất sắc.'
      },
      {
        id: 'q14-3',
        question: 'She passed all her final exams with flying colors, _______ delighted her parents.',
        options: { A: 'that', B: 'who', C: 'which', D: 'what' },
        correctAnswer: 'C',
        explanation: 'Đại từ quan hệ đứng sau dấu phẩy thay thế cho TOÀN BỘ Ý Ở MỆNH ĐỀ TRƯỚC -> bắt buộc dùng "which".',
        clue: ', which + V (thay cho cả mệnh đề)',
        translation: 'Cô ấy đã đỗ tất cả các bài thi cuối kỳ với điểm số xuất sắc, điều này làm cha mẹ cô rất vui mừng.'
      },
      {
        id: 'q14-4',
        question: 'Neil Armstrong was the first person _______ walked on the Moon.',
        options: { A: 'that', B: 'which', C: 'whose', D: 'whom' },
        correctAnswer: 'A',
        explanation: 'Sau số thứ tự "the first person", đại từ quan hệ ưu tiên sử dụng là "that" -> chọn "that".',
        clue: 'the first person + that',
        translation: 'Neil Armstrong là người đầu tiên đi lại trên Mặt Trăng.'
      },
      {
        id: 'q14-5',
        question: 'The old town _______ we spent our summer vacation has changed significantly.',
        options: { A: 'which', B: 'where', C: 'what', D: 'when' },
        correctAnswer: 'B',
        explanation: 'Tiền từ là địa điểm "The old town", mệnh đề sau là "we spent our vacation [in the town]". Cần trạng từ quan hệ chỉ nơi chốn (= in which) -> chọn "where".',
        clue: 'town + where + S + V',
        translation: 'Thị trấn cổ nơi chúng tôi từng trải qua kỳ nghỉ hè đã thay đổi đáng kể.'
      }
    ],
    questionPool: [
      {
        id: 'q14-p1',
        question: 'The hotel in _______ we stayed during our trip to Da Nang was exceptionally comfortable.',
        options: { A: 'which', B: 'that', C: 'where', D: 'what' },
        correctAnswer: 'A',
        explanation: 'Sau giới từ "in" thay thế cho danh từ chỉ vật (hotel) bắt buộc dùng "which" (in which = where) -> chọn "which".',
        clue: 'in + which (sau giới từ)',
        translation: 'Khách sạn nơi chúng tôi ở trong chuyến đi Đà Nẵng đặc biệt tiện nghi.'
      }
    ]
  },

  // ==========================================
  // 15. RÚT GỌN MỆNH ĐỀ QUAN HỆ
  // ==========================================
  {
    id: 'topic-15',
    topicNumber: 15,
    title: 'Chuyên đề 15: Rút gọn MĐQH',
    shortTitle: 'Rút gọn MĐQH',
    englishTitle: 'Reduced Relative Clauses',
    difficulty: 'Trọng tâm',
    concept: 'Rút gọn mệnh đề quan hệ khi câu đã có vị ngữ chính: Chủ động dùng V-ing, Bị động dùng V3/ed, sau the first/last/only dùng To-V.',
    formulas: [
      'Chủ động: N + who/which + V -> N + V-ING (The boy who stands there -> The boy standing there)',
      'Bị động: N + which/who + be + V3/ed -> N + V3/ED (The bridge which was built -> The bridge built)',
      'Sau the first/last/only/so sánh nhất: N + TO-V (chủ động) / TO BE V3 (bị động)'
    ],
    rules: [
      { label: 'Quy tắc một động từ chính', text: 'Nếu câu đã có động từ chia thì chính thức (is, was, has built, belongs to), vị trí còn lại chỉ có thể là mệnh đề quan hệ rút gọn (V-ing hoặc V3/ed).' }
    ],
    examples: [
      { en: 'The books written by Nguyen Nhat Anh are loved by teenagers.', vi: 'Những cuốn sách được viết bởi Nguyễn Nhật Ánh được giới trẻ yêu thích.', note: 'Sách được viết (bị động) -> written.' },
      { en: 'Yuri Gagarin was the first person to fly into space.', vi: 'Yuri Gagarin là người đầu tiên bay vào không gian.', note: 'The first person -> to fly.' }
    ],
    examTips: [
      'BẪY THỪA ĐỘNG TỪ CHÍNH: "The car _______ on the street belongs to my uncle."\nĐộng từ chính là "belongs to". Xe bị đỗ -> Chọn "parked". TUYỆT ĐỐI KHÔNG chọn "is parked" vì câu sẽ bị thừa 2 động từ chính!'
    ],
    questions: [
      {
        id: 'q15-1',
        question: 'The essays _______ by students yesterday will be graded by the head teacher.',
        options: { A: 'submitting', B: 'submitted', C: 'were submitted', D: 'are submitting' },
        correctAnswer: 'B',
        explanation: 'Câu đã có động từ chính "will be graded". Bài luận "được nộp" bởi học sinh (bị động) -> rút gọn bằng V3/ed "submitted". Loại C vì nếu chọn "were submitted" câu sẽ thừa động từ chính.',
        clue: 'essays (vật) + by students (bị động) -> V3/ed',
        translation: 'Các bài luận được nộp bởi học sinh hôm qua sẽ được chấm bởi thầy tổ trưởng.'
      },
      {
        id: 'q15-2',
        question: 'Any teenager _______ in voluntary social work will develop important soft skills.',
        options: { A: 'participating', B: 'participated', C: 'participate', D: 'is participating' },
        correctAnswer: 'A',
        explanation: 'Câu đã có động từ chính "will develop". Thanh thiếu niên chủ động tham gia công tác xã hội -> rút gọn chủ động bằng V-ing "participating".',
        clue: 'teenager chủ động tham gia -> V-ing',
        translation: 'Bất kỳ bạn trẻ nào tham gia công tác xã hội tình nguyện đều sẽ phát triển các kỹ năng mềm quan trọng.'
      },
      {
        id: 'q15-3',
        question: 'Dr. Katherine was the only specialist _______ the delicate surgery successfully.',
        options: { A: 'performing', B: 'performed', C: 'to perform', D: 'perform' },
        correctAnswer: 'C',
        explanation: 'Trước danh từ có từ hạn định "the only specialist". Sau the first/last/only, mệnh đề quan hệ được rút gọn bằng To-V -> chọn "to perform".',
        clue: 'the only specialist -> to V',
        translation: 'Bác sĩ Katherine là chuyên gia duy nhất thực hiện thành công ca phẫu thuật tinh vi đó.'
      },
      {
        id: 'q15-4',
        question: 'The suspension bridge _______ over a century ago has recently been restored.',
        options: { A: 'was constructed', B: 'constructed', C: 'constructing', D: 'which constructed' },
        correctAnswer: 'B',
        explanation: 'Động từ chính là "has recently been restored". Cây cầu "được xây dựng" (bị động) -> rút gọn bằng V3/ed "constructed".',
        clue: 'bridge được xây dựng -> V3/ed',
        translation: 'Cây cầu treo được xây dựng hơn một thế kỷ trước gần đây đã được trùng tu.'
      },
      {
        id: 'q15-5',
        question: 'Passengers _______ on flight VN320 should proceed immediately to Gate 5.',
        options: { A: 'boarded', B: 'boarding', C: 'were boarding', D: 'are boarded' },
        correctAnswer: 'B',
        explanation: 'Hành khách chủ động lên máy bay ("boarding"). Động từ chính là "should proceed" -> rút gọn chủ động bằng V-ing "boarding".',
        clue: 'passengers chủ động lên máy bay -> V-ing',
        translation: 'Hành khách lên chuyến bay VN320 xin vui lòng di chuyển ngay đến Cổng số 5.'
      }
    ],
    questionPool: [
      {
        id: 'q15-p1',
        question: 'The ancient pottery items _______ in the cave belong to the Bronze Age.',
        options: { A: 'discovered', B: 'discovering', C: 'were discovered', D: 'which discovered' },
        correctAnswer: 'A',
        explanation: 'Đồ gốm được phát hiện (bị động). Câu đã có động từ chính "belong to" -> rút gọn bằng V3/ed "discovered".',
        clue: 'items được phát hiện -> V3/ed',
        translation: 'Các đồ gốm cổ được phát hiện trong hang động thuộc về thời kỳ Đồ đồng.'
      }
    ]
  },

  // ==========================================
  // 16. MỆNH ĐỀ CÙNG CHỦ NGỮ
  // ==========================================
  {
    id: 'topic-16',
    topicNumber: 16,
    title: 'Chuyên đề 16: MĐ cùng chủ ngữ',
    shortTitle: 'MĐ cùng chủ ngữ',
    englishTitle: 'Participle Clauses (Same Subject)',
    difficulty: 'Nâng cao',
    concept: 'Rút gọn 2 mệnh đề có cùng chủ ngữ đứng ở đầu câu có dấu phẩy: _______, S + V. Nhìn chủ ngữ S sau dấu phẩy để quyết định chủ động hay bị động.',
    formulas: [
      'Chủ động nối tiếp / cùng thời: V-ING, S + V (Seeing the danger, he called police.)',
      'Chủ động hoàn thành trước: HAVING + V3/ED, S + V (Having finished the test, she rested.)',
      'Bị động thông thường: V3/ED, S + V (Shocked by the news, she cried.)',
      'Bị động hoàn thành trước: HAVING BEEN + V3/ED, S + V (Having been warned, they evacuated.)'
    ],
    rules: [
      { label: 'Bí quyết 5 giây', text: 'Nhìn ngay CHỦ NGỮ S sau dấu phẩy: Nếu S TỰ LÀM hành động -> chọn V-ing / Having + V3. Nếu S BỊ TÁC ĐỘNG -> chọn V3/ed / Having been + V3.' }
    ],
    examples: [
      { en: 'Having finished all homework, Nam went to bed.', vi: 'Sau khi làm xong bài tập, Nam đi ngủ.', note: 'Nam tự làm xong bài tập trước khi ngủ -> Having finished.' },
      { en: 'Warned about the storm, the fishermen stayed ashore.', vi: 'Được cảnh báo về cơn bão, các ngư dân đã ở lại bờ.', note: 'Ngư dân được cảnh báo (bị động) -> Warned.' }
    ],
    examTips: [
      'Khi nhấn mạnh hành động ĐÃ HOÀN TẤT XONG TRƯỚC một hành động khác trong quá khứ, đề thi THPTQG luôn ưu tiên "Having + V3"!'
    ],
    questions: [
      {
        id: 'q16-1',
        question: '_______ all the necessary data, the team began writing their final report.',
        options: { A: 'Having collected', B: 'Collected', C: 'To collect', D: 'Have collected' },
        correctAnswer: 'A',
        explanation: 'Chủ ngữ sau dấu phẩy là "the team". Đội nhóm chủ động thu thập dữ liệu và hành động này đã hoàn tất xong trước khi bắt đầu viết báo cáo -> rút gọn chủ động bằng "Having collected".',
        clue: 'the team chủ động làm xong trước -> Having + V3',
        translation: 'Sau khi đã thu thập toàn bộ dữ liệu cần thiết, cả nhóm bắt đầu viết bản báo cáo cuối cùng.'
      },
      {
        id: 'q16-2',
        question: '_______ by the sudden loud thunder, the small child began crying.',
        options: { A: 'Frightening', B: 'Frightened', C: 'Having frightened', D: 'To frighten' },
        correctAnswer: 'B',
        explanation: 'Chủ ngữ là "the small child" (đứa trẻ). Đứa trẻ bị làm cho hoảng sợ bởi tiếng sấm (bị động) -> rút gọn bằng V3/ed "Frightened".',
        clue: 'đứa trẻ bị hoảng sợ -> V3/ed',
        translation: 'Bị hoảng sợ bởi tiếng sấm lớn bất ngờ, đứa trẻ bắt đầu khóc.'
      },
      {
        id: 'q16-3',
        question: '_______ from premium stainless steel, this kitchen knife will never rust.',
        options: { A: 'Manufacturing', B: 'Manufactured', C: 'Having manufactured', D: 'Manufacture' },
        correctAnswer: 'B',
        explanation: 'Chủ ngữ sau dấu phẩy là "this kitchen knife" (con dao này). Con dao được chế tạo từ thép không gỉ (bị động) -> chọn V3/ed "Manufactured".',
        clue: 'knife (dao) được chế tạo -> V3/ed',
        translation: 'Được chế tạo từ thép không gỉ cao cấp, con dao làm bếp này sẽ không bao giờ bị gỉ.'
      },
      {
        id: 'q16-4',
        question: '_______ the front door quietly, the detective slipped inside the house.',
        options: { A: 'Opened', B: 'Opening', C: 'Having been opened', D: 'Being opened' },
        correctAnswer: 'B',
        explanation: 'Viên thám tử chủ động mở cửa rồi lẻn vào (hành động nối tiếp tức thì) -> rút gọn chủ động bằng V-ing "Opening".',
        clue: 'thám tử chủ động mở cửa -> V-ing',
        translation: 'Khẽ mở cửa trước, viên thám tử lẻn vào bên trong ngôi nhà.'
      },
      {
        id: 'q16-5',
        question: '_______ several times about speeding, he still drove recklessly.',
        options: { A: 'Having warned', B: 'Warning', C: 'Having been warned', D: 'Warned not' },
        correctAnswer: 'C',
        explanation: 'Chủ ngữ là "he". Anh ta được/bị cảnh báo nhiều lần (bị động) trước khi lái xe ẩu -> rút gọn bị động hoàn thành: "Having been warned".',
        clue: 'anh ta được cảnh báo trước đó (bị động) -> Having been warned',
        translation: 'Sau khi đã được cảnh báo nhiều lần về việc chạy quá tốc độ, anh ta vẫn lái xe một cách liều lĩnh.'
      }
    ],
    questionPool: [
      {
        id: 'q16-p1',
        question: '_______ from university, she immediately applied for a management trainee position.',
        options: { A: 'Graduating', B: 'Graduated', C: 'Having graduated', D: 'To graduate' },
        correctAnswer: 'C',
        explanation: 'Tốt nghiệp xong xuôi trước khi nộp đơn xin việc -> rút gọn chủ động hoàn thành bằng "Having graduated".',
        clue: 'tốt nghiệp xong trước khi nộp đơn -> Having + V3',
        translation: 'Sau khi đã tốt nghiệp đại học, cô ấy nộp đơn ngay cho vị trí thực tập sinh quản lý.'
      }
    ]
  },

  // ==========================================
  // 17. CÂU CHẺ (CLEFT SENTENCES)
  // ==========================================
  {
    id: 'topic-17',
    topicNumber: 17,
    title: 'Chuyên đề 17: Câu chẻ',
    shortTitle: 'Câu chẻ',
    englishTitle: 'Cleft Sentences (It is / was... that)',
    difficulty: 'Trọng tâm',
    concept: 'Dùng "It is/was + [Thành phần nhấn mạnh] + THAT / WHO" để dồn toàn bộ sự chú ý vào Chủ ngữ, Tân ngữ hoặc Trạng ngữ.',
    formulas: [
      'Công thức chung: It + is/was + [Thành phần nhấn mạnh] + THAT / WHO + ...',
      'Hiện tại / tương lai dùng "IT IS" | Quá khứ dùng "IT WAS"',
      'Nhấn mạnh Chủ ngữ người: It is/was + S(người) + WHO / THAT + V',
      'Nhấn mạnh Chủ ngữ vật: It is/was + S(vật) + THAT + V',
      'Nhấn mạnh Trạng ngữ: It is/was + Trạng từ/cụm trạng ngữ + THAT (BẮT BUỘC dùng THAT, KHÔNG dùng where/when)'
    ],
    rules: [
      { label: 'Bí quyết kiểm tra câu chẻ', text: 'Bỏ cụm "It is/was" và "that" đi. Nếu các từ còn lại ghép thành một câu hoàn chỉnh có nghĩa đúng ngữ pháp -> Đó chính xác là câu chẻ!' }
    ],
    examples: [
      { en: 'It was in Hanoi that they first met fifteen years ago.', vi: 'Chính tại Hà Nội là nơi họ đã lần đầu gặp nhau 15 năm trước.', note: 'Nhấn mạnh nơi chốn: It was + in Hanoi + THAT (không dùng where).' },
      { en: 'It was my teacher who inspired me to study linguistics.', vi: 'Chính cô giáo tôi là người đã truyền cảm hứng cho tôi học ngôn ngữ học.', note: 'Nhấn mạnh người: It was + my teacher + who/that.' }
    ],
    examTips: [
      'BẪY THI KINH ĐIỂN: Nhấn mạnh trạng ngữ nơi chốn (It was at school...) hoặc thời gian (It was in 2020...), học sinh rất hay bị lừa chọn "where" hoặc "when". QUY TẮC: BẮT BUỘC DÙNG "THAT"!'
    ],
    questions: [
      {
        id: 'q17-1',
        question: 'It was on his wedding anniversary _______ he presented his wife with a diamond ring.',
        options: { A: 'which', B: 'when', C: 'that', D: 'where' },
        correctAnswer: 'C',
        explanation: 'Câu chẻ nhấn mạnh trạng ngữ thời gian "on his wedding anniversary". Cấu trúc chuẩn: "It was + Trạng ngữ + THAT + S + V". Tuyệt đối không dùng "when" -> chọn "that".',
        clue: 'It was + trạng ngữ thời gian + THAT',
        translation: 'Chính vào ngày kỷ niệm ngày cưới là lúc anh ấy đã tặng vợ một chiếc nhẫn kim cương.'
      },
      {
        id: 'q17-2',
        question: 'It is continuous dedication and perseverance _______ lead to true success in life.',
        options: { A: 'who', B: 'that', C: 'whom', D: 'what' },
        correctAnswer: 'B',
        explanation: 'Câu chẻ nhấn mạnh chủ ngữ chỉ sự vật/khái niệm ("dedication and perseverance"). Cấu trúc: "It is + S(vật) + THAT + V" -> chọn "that".',
        clue: 'It is + S(vật) + that',
        translation: 'Chính sự cống hiến và kiên trì không ngừng là điều dẫn lối tới thành công đích thực trong cuộc sống.'
      },
      {
        id: 'q17-3',
        question: 'It _______ in 1945 that the United Nations was officially established.',
        options: { A: 'is', B: 'was', C: 'has been', D: 'had been' },
        correctAnswer: 'B',
        explanation: 'Sự kiện thành lập Liên Hợp Quốc diễn ra năm 1945 (quá khứ). Câu chẻ ở quá khứ bắt buộc dùng: "It was + in 1945 + that..." -> chọn "was".',
        clue: 'in 1945 (quá khứ) -> It was',
        translation: 'Chính vào năm 1945 là thời điểm Liên Hợp Quốc được chính thức thành lập.'
      },
      {
        id: 'q17-4',
        question: 'It was my younger brother _______ broke your antique vase yesterday.',
        options: { A: 'who', B: 'whom', C: 'which', D: 'whose' },
        correctAnswer: 'A',
        explanation: 'Câu chẻ nhấn mạnh chủ ngữ chỉ người ("my younger brother"). Theo sau là động từ "broke" (cần chủ ngữ) -> chọn "who" (hoặc that).',
        clue: 'It was + Người (chủ ngữ) + WHO + V',
        translation: 'Chính em trai tôi là người đã làm vỡ chiếc bình cổ của bạn hôm qua.'
      },
      {
        id: 'q17-5',
        question: 'It was at the municipal library _______ they discovered the historical manuscript.',
        options: { A: 'where', B: 'which', C: 'that', D: 'in which' },
        correctAnswer: 'C',
        explanation: 'Câu chẻ nhấn mạnh trạng ngữ nơi chốn "at the municipal library". Công thức bắt buộc: "It was + [Trạng ngữ nơi chốn] + THAT + S + V". Bẫy thường gặp là chọn "where" -> đáp án đúng phải là "that".',
        clue: 'It was + trạng ngữ nơi chốn + THAT',
        translation: 'Chính tại thư viện thành phố là nơi họ đã phát hiện ra bản thảo lịch sử.'
      }
    ],
    questionPool: [
      {
        id: 'q17-p1',
        question: 'It was thanks to her scholarship _______ she was able to study in Cambridge.',
        options: { A: 'that', B: 'which', C: 'what', D: 'how' },
        correctAnswer: 'A',
        explanation: 'Câu chẻ nhấn mạnh cụm từ: It was thanks to... that S + V -> chọn "that".',
        clue: 'It was... THAT',
        translation: 'Chính nhờ có học bổng mà cô ấy mới có thể đi học tại Cambridge.'
      }
    ]
  },

  // ==========================================
  // 18. ĐẢO NGỮ (INVERSION)
  // ==========================================
  {
    id: 'topic-18',
    topicNumber: 18,
    title: 'Chuyên đề 18: Đảo ngữ',
    shortTitle: 'Đảo ngữ',
    englishTitle: 'Inversion',
    difficulty: 'Nâng cao',
    concept: 'Đảo trợ động từ (Aux / Be) lên trước chủ ngữ nhằm nhấn mạnh khi các từ mang nghĩa phủ định hoặc giới hạn đứng đầu câu.',
    formulas: [
      'Công thức chung: Cụm từ đảo ngữ + Trợ động từ (do/did/have/had/be/modal) + S + V',
      'Phó từ phủ định: Never / Rarely / Seldom / Little / Hardly + Aux + S + V',
      'No sooner + had + S + V3 + THAN + S + V2 (Vừa mới... thì đã...)',
      'Hardly / Scarcely + had + S + V3 + WHEN + S + V2 (Vừa mới... thì đã...)',
      'Not until + time / S + V, Aux + S + V (Đảo ở mệnh đề chính sau dấu phẩy)',
      'Only when / Only after + S + V, Aux + S + V (Đảo ở mệnh đề chính sau dấu phẩy)'
    ],
    rules: [
      { label: 'Cặp liên từ bất di bất dịch', text: 'NO SOONER luôn đi với THAN. HARDLY / SCARCELY luôn đi với WHEN.' },
      { label: 'Vị trí đảo với ONLY và NOT UNTIL', text: 'Khi đứng đầu câu kéo theo một mệnh đề, MỆNH ĐỀ ĐẦU GIỮ NGUYÊN, chỉ đảo ngữ ở MỆNH ĐỀ CHÍNH phía sau dấu phẩy.' }
    ],
    examples: [
      { en: 'Rarely have I seen such an exceptional performance.', vi: 'Hiếm khi tôi thấy một màn trình diễn xuất sắc như vậy.', note: 'Rarely + have (trợ động từ) + I (chủ ngữ) + seen (V3).' },
      { en: 'No sooner had we arrived than the storm began.', vi: 'Chúng tôi vừa mới đến nơi thì cơn bão bắt đầu.', note: 'No sooner had S V3 than S V2.' },
      { en: 'Not until the bell rang did the students pack their bags.', vi: 'Mãi cho đến khi chuông reo thì học sinh mới thu dọn cặp sách.', note: 'Đảo ở vế chính: did the students pack.' }
    ],
    examTips: [
      'Thần chú trắc nghiệm đảo ngữ: Thấy từ phủ định/hạn chế ở đầu câu (Never, Seldom, No sooner, Hardly, Only...), tìm ngay đáp án có TRỢ ĐỘNG TỪ ĐỨNG TRƯỚC CHỦ NGỮ!'
    ],
    questions: [
      {
        id: 'q18-1',
        question: 'No sooner _______ home than the phone began to ring loudly.',
        options: { A: 'he arrived', B: 'had he arrived', C: 'did he arrive', D: 'he had arrived' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc đảo ngữ: "No sooner + had + S + V3/ed + THAN + S + V2/ed". Đảo had lên trước he -> chọn "had he arrived".',
        clue: 'No sooner + had + S + V3... than',
        translation: 'Anh ấy vừa mới về đến nhà thì điện thoại bắt đầu đổ chuông ầm ĩ.'
      },
      {
        id: 'q18-2',
        question: 'Hardly had the singer appeared on stage _______ the crowd erupted in cheers.',
        options: { A: 'than', B: 'when', C: 'then', D: 'after' },
        correctAnswer: 'B',
        explanation: 'Cặp liên từ đi với Hardly là WHEN: "Hardly had + S + V3 + WHEN + S + V2" -> chọn "when". (Than đi với No sooner).',
        clue: 'Hardly had... WHEN',
        translation: 'Ca sĩ vừa mới xuất hiện trên sân khấu thì đám đông đã vỡ òa reo hò.'
      },
      {
        id: 'q18-3',
        question: 'Only after all the passengers had boarded _______ the aircraft take off.',
        options: { A: 'was', B: 'did', C: 'had', D: 'is' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc "Only after + S + had V3, Aux + S + V(bare)". Động từ "take off" là động từ thường nguyên mẫu trong quá khứ -> mượn trợ động từ "did" -> chọn "did".',
        clue: 'Only after... did the aircraft take off',
        translation: 'Chỉ sau khi tất cả hành khách đã lên máy bay thì chiếc máy bay mới cất cánh.'
      },
      {
        id: 'q18-4',
        question: 'Seldom _______ such an inspiring speech in my entire life.',
        options: { A: 'I have heard', B: 'have I heard', C: 'did I heard', D: 'I heard' },
        correctAnswer: 'B',
        explanation: 'Phó từ bán phủ định "Seldom" đứng đầu câu -> đảo ngữ: "Seldom + have/has + S + V3" -> chọn "have I heard".',
        clue: 'Seldom + have + S + V3',
        translation: 'Hiếm khi tôi được nghe một bài phát biểu truyền cảm hứng đến vậy trong suốt cuộc đời mình.'
      },
      {
        id: 'q18-5',
        question: 'Not only _______ a brilliant scientist, but she is also a talented author.',
        options: { A: 'she is', B: 'is she', C: 'does she', D: 'she does' },
        correctAnswer: 'B',
        explanation: 'Cấu trúc đảo ngữ: "Not only + be + S + N/Adj..., but S + also + V". Đảo to be "is" lên trước chủ ngữ "she" -> chọn "is she".',
        clue: 'Not only + is + she',
        translation: 'Cô ấy không những là một nhà khoa học lỗi lạc mà cô ấy còn là một tác giả tài năng.'
      }
    ],
    questionPool: [
      {
        id: 'q18-p1',
        question: 'Not until I reached home _______ that I had left my wallet at the office.',
        options: { A: 'did I realize', B: 'I realized', C: 'had I realized', D: 'I did realize' },
        correctAnswer: 'A',
        explanation: 'Not until + S + V, did + S + V(bare) (đảo ngữ ở mệnh đề chính) -> chọn "did I realize".',
        clue: 'Not until... did I realize',
        translation: 'Mãi cho đến khi về đến nhà tôi mới nhận ra rằng mình đã để quên ví ở văn phòng.'
      }
    ]
  }
];
