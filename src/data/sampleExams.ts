import { SampleExam } from '../types';

export const SAMPLE_EXAMS: SampleExam[] = [
  {
    id: 'thpt-2024-chinhthuc',
    title: 'Đề thi Chính thức Tốt nghiệp THPT 2024 (Mã đề 401)',
    source: 'Bộ Giáo dục và Đào tạo',
    year: '2024',
    tag: 'Chính thức',
    description: 'Trích đoạn bài đọc hiểu về chuyển đổi số, trí tuệ nhân tạo và các câu hỏi phân loại ngữ vựng then chốt.',
    content: `Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the questions.

The rapid rise of artificial intelligence has sparked intense debate among economists and educators alike. While optimists argue that technological breakthroughs will bring about unprecedented economic growth, critics warn that many traditional professions might be phased out. To remain competitive in the evolving job market, young graduates must make an effort to cultivate both technical skills and emotional intelligence.

In many corporate sectors, employees are now expected to fulfill high performance requirements while adapting to autonomous systems. Those who are capable of thinking out of the box and demonstrating resilience under pressure tend to gain valuable experience more quickly. Recent studies also reveal that organizations that place emphasis on lifelong learning generally outperform their competitors. 

Furthermore, governments must not turn a blind eye to the potential digital divide between urban and rural regions. Investing in educational infrastructure is essential to ensure that no student is deprived of modern learning opportunities. Young learners should be encouraged to take advantage of open educational resources rather than being solely dependent on traditional textbooks. Only by keeping pace with global innovations can developing nations thrive in the knowledge-based economy.`,
    initialVocab: [
      {
        type: 'Phrasal verb',
        term: 'bring about',
        ipa: '/brɪŋ əˈbaʊt/',
        meaning: 'gây ra, mang lại, dẫn đến (kết quả/thay đổi)',
        context: 'While optimists argue that technological breakthroughs will **bring about** unprecedented economic growth, critics warn that many traditional professions might be phased out.',
        cefrLevel: 'B2',
        examTip: 'Đồng nghĩa: cause, lead to, result in. Thường gặp trong dạng bài tìm từ đồng nghĩa (Closest in meaning).'
      },
      {
        type: 'Collocation',
        term: 'make an effort',
        ipa: '/meɪk ən ˈefət/',
        meaning: 'nỗ lực, cố gắng',
        context: 'Young graduates must **make an effort** to cultivate both technical skills and emotional intelligence.',
        cefrLevel: 'B1',
        examTip: 'Bẫy đề thi: Luôn dùng động từ MAKE (không dùng do an effort). Đi kèm: make an effort to V.'
      },
      {
        type: 'Collocation',
        term: 'fulfill a requirement',
        ipa: '/fʊlˈfɪl ə rɪˈkwaɪəmənt/',
        meaning: 'đáp ứng/thỏa mãn một yêu cầu',
        context: 'Employees are now expected to **fulfill high performance requirements** while adapting to autonomous systems.',
        cefrLevel: 'B2',
        examTip: 'Thường đi với: meet/fulfill/satisfy a requirement/criterion/demand.'
      },
      {
        type: 'Idiom',
        term: 'think out of the box',
        ipa: '/θɪŋk aʊt əv ðə bɒks/',
        meaning: 'suy nghĩ đột phá, sáng tạo, không theo lối mòn',
        context: 'Those who are capable of **thinking out of the box** and demonstrating resilience under pressure tend to gain valuable experience.',
        cefrLevel: 'C1',
        examTip: 'Thành ngữ kinh điển trong đề thi THPT, đồng nghĩa với "think creatively/innovatively".'
      },
      {
        type: 'Collocation',
        term: 'gain experience',
        ipa: '/ɡeɪn ɪkˈspɪəriəns/',
        meaning: 'tích lũy/thu nhận kinh nghiệm',
        context: 'Employees tend to **gain valuable experience** more quickly in fast-paced environments.',
        cefrLevel: 'B1',
        examTip: 'Đi với GAIN: gain experience / knowledge / reputation / weight / speed. Bẫy: không dùng earn experience.'
      },
      {
        type: 'Idiom',
        term: 'turn a blind eye to',
        ipa: '/tɜːn ə blaɪnd aɪ tuː/',
        meaning: 'nhắm mắt làm ngơ, giả vờ không thấy',
        context: 'Governments must not **turn a blind eye to** the potential digital divide between urban and rural regions.',
        cefrLevel: 'C1',
        examTip: 'Rất hay xuất hiện trong bài tìm từ trái nghĩa (Opposite): trái nghĩa với "pay attention to" hoặc "take notice of".'
      },
      {
        type: 'Preposition',
        term: 'deprived of',
        ipa: '/dɪˈpraɪvd əv/',
        meaning: 'bị tước đoạt, thiếu thốn cái gì',
        context: 'Investing in educational infrastructure is essential to ensure that no student is **deprived of** modern learning opportunities.',
        cefrLevel: 'B2',
        examTip: 'Cấu trúc: deprive somebody of something (bị động: be deprived of). Đi với giới từ OF.'
      },
      {
        type: 'Collocation',
        term: 'take advantage of',
        ipa: '/teɪk ədˈvɑːntɪdʒ əv/',
        meaning: 'tận dụng, lợi dụng',
        context: 'Young learners should be encouraged to **take advantage of** open educational resources.',
        cefrLevel: 'B1',
        examTip: 'Đồng nghĩa: make use of, capitalize on. Trái nghĩa: miss out on.'
      },
      {
        type: 'Preposition',
        term: 'dependent on',
        ipa: '/dɪˈpendənt ɒn/',
        meaning: 'phụ thuộc vào',
        context: 'Rather than being solely **dependent on** traditional textbooks.',
        cefrLevel: 'B1',
        examTip: 'Phân biệt: dependent ON nhưng independent OF (độc lập với).'
      },
      {
        type: 'Phrasal verb',
        term: 'keep pace with',
        ipa: '/kiːp peɪs wɪð/',
        meaning: 'bắt kịp, theo kịp tiến độ',
        context: 'Only by **keeping pace with** global innovations can developing nations thrive in the knowledge-based economy.',
        cefrLevel: 'B2',
        examTip: 'Đồng nghĩa: keep up with, catch up with. Thường đi trong câu đảo ngữ Only by V-ing + trợ động từ.'
      }
    ]
  },
  {
    id: 'thpt-2025-minhhoa',
    title: 'Đề Tham Khảo Bộ GD&ĐT 2025 (Chương trình GDPT mới)',
    source: 'Bộ Giáo dục & Đào tạo',
    year: '2025',
    tag: 'Đề mới',
    description: 'Chuyên đề Kinh tế tuần hoàn, bảo vệ môi trường biển và tính bền vững sinh thái với từ vựng chuẩn B2-C1.',
    content: `Plastic pollution has emerged as one of the most pressing environmental hazards confronting the planet. Countless marine species are on the verge of extinction due to the indiscriminate dumping of synthetic waste into water bodies. Although global environmental treaties have been put into practice, many manufacturing enterprises continue to cut corners to minimize overhead costs.

Environmental scientists emphasize that adopting sustainable lifestyle habits is no longer a matter of personal choice, but a matter of urgency. Consumers are urged to phase out single-use plastics and hold multinational corporations accountable for their carbon footprints. To achieve zero emissions, governments must pave the way for green energy transitions while providing substantial subsidies for eco-friendly innovations.

Furthermore, we must come to terms with the reality that climate change poses a grave threat to agricultural yields. Unless farmers take preemptive measures to cope with erratic weather patterns, food security in vulnerable territories will deteriorate significantly.`,
    initialVocab: [
      {
        type: 'Idiom',
        term: 'on the verge of',
        ipa: '/ɒn ðə vɜːdʒ əv/',
        meaning: 'bên bờ vực, sắp sửa (gặp nguy cơ)',
        context: 'Countless marine species are **on the verge of** extinction due to the indiscriminate dumping of synthetic waste.',
        cefrLevel: 'B2',
        examTip: 'Đồng nghĩa: on the brink of, on the point of. Rất hay gặp trong chủ đề Endangered Species.'
      },
      {
        type: 'Idiom',
        term: 'cut corners',
        ipa: '/kʌt ˈkɔːnəz/',
        meaning: 'đi tắt đón đầu theo cách gian dối, cắt giảm bớt công đoạn để tiết kiệm tiền/thời gian',
        context: 'Many manufacturing enterprises continue to **cut corners** to minimize overhead costs.',
        cefrLevel: 'C1',
        examTip: 'Câu hỏi phân loại điểm 9-10. Trái nghĩa: do something thoroughly / strictly follow rules.'
      },
      {
        type: 'Phrasal verb',
        term: 'put into practice',
        ipa: '/pʊt ˈɪntuː ˈpræktɪs/',
        meaning: 'đưa vào thực tiễn, thực hiện',
        context: 'Although global environmental treaties have been **put into practice**, many enterprises still hesitate.',
        cefrLevel: 'B2',
        examTip: 'Cấu trúc tương đương: implement, carry out, execute.'
      },
      {
        type: 'Collocation',
        term: 'pave the way for',
        ipa: '/peɪv ðə weɪ fɔː/',
        meaning: 'mở đường cho, tạo điều kiện thuận lợi cho',
        context: 'Governments must **pave the way for** green energy transitions while providing substantial subsidies.',
        cefrLevel: 'B2',
        examTip: 'Cụm Collocation điểm 9: pave the way for = prepare for, facilitate the development of.'
      },
      {
        type: 'Idiom',
        term: 'come to terms with',
        ipa: '/kʌm tuː tɜːmz wɪð/',
        meaning: 'chấp nhận một sự thật/thực tế cay đắng khó tránh khỏi',
        context: 'We must **come to terms with** the reality that climate change poses a grave threat to agricultural yields.',
        cefrLevel: 'C1',
        examTip: 'Thành ngữ B2-C1 xuất hiện nhiều trong bài đọc điền từ hoặc tìm từ đồng nghĩa (accept a harsh truth).'
      },
      {
        type: 'Single word',
        term: 'indiscriminate',
        ipa: '/ˌɪndɪˈskrɪmɪnət/',
        meaning: 'bừa bãi, không phân biệt, vô tội vạ',
        context: 'Extinction due to the **indiscriminate** dumping of synthetic waste into water bodies.',
        cefrLevel: 'C1',
        examTip: 'Từ vựng C1 đọc hiểu. Trái nghĩa: selective, deliberate.'
      },
      {
        type: 'Phrasal verb',
        term: 'phase out',
        ipa: '/feɪz aʊt/',
        meaning: 'dần dần loại bỏ, ngừng sử dụng từng bước',
        context: 'Consumers are urged to **phase out** single-use plastics.',
        cefrLevel: 'B2',
        examTip: 'Đồng nghĩa: gradually eliminate / discontinue. Trái nghĩa: phase in (đưa vào áp dụng dần).'
      },
      {
        type: 'Preposition',
        term: 'accountable for',
        ipa: '/əˈkaʊntəbl fɔː/',
        meaning: 'chịu trách nhiệm về điều gì',
        context: 'Hold multinational corporations **accountable for** their carbon footprints.',
        cefrLevel: 'B2',
        examTip: 'Cấu trúc: hold somebody accountable for something = responsible for.'
      }
    ]
  },
  {
    id: 'chuyende-collocations-9plus',
    title: 'Chuyên đề 9+: Bộ Cụm Từ Vựng & Thành Ngữ Phân Loại Cao',
    source: 'Tổng hợp Đề Chuyên & Đề Quốc Gia',
    year: '2024-2025',
    tag: 'Chuyên đề 9+',
    description: 'Tuyển tập các câu trắc nghiệm từ vựng chứa bẫy Collocation, Idiom và Preposition thường khiến học sinh mất điểm.',
    content: `Mark the letter A, B, C, or D to indicate the correct answer to each of the following questions:

Question 1: After conducting a comprehensive market analysis, the board finally reached a consensus on the marketing campaign.
Question 2: She decided to burn the midnight oil for two weeks straight in order to prepare for the university entrance examination.
Question 3: His extensive knowledge of historical events is totally out of proportion to his young age.
Question 4: Despite facing fierce opposition from senior directors, she stuck to her guns and successfully launched the product.
Question 5: Doctors always insist that regular physical exercise plays a pivotal role in preventing cardiovascular diseases.
Question 6: Many struggling families find it extremely difficult to make ends meet during periods of steep inflation.
Question 7: The minister was accused of taking bribes at the expense of public welfare.
Question 8: He was completely at a loss when asked to explain the sudden deficit in the annual financial ledger.`,
    initialVocab: [
      {
        type: 'Collocation',
        term: 'reach a consensus',
        ipa: '/riːtʃ ə kənˈsensəs/',
        meaning: 'đạt được sự đồng thuận, nhất trí',
        context: 'The board finally **reached a consensus** on the marketing campaign.',
        cefrLevel: 'C1',
        examTip: 'Đi với CONSENSUS là động từ REACH hoặc COME TO. Bẫy đề: không dùng get hoặc find.'
      },
      {
        type: 'Idiom',
        term: 'burn the midnight oil',
        ipa: '/bɜːn ðə ˈmɪdnaɪt ɔɪl/',
        meaning: 'thức khuya học bài/làm việc chăm chỉ',
        context: 'She decided to **burn the midnight oil** for two weeks straight in order to prepare for the exam.',
        cefrLevel: 'B2',
        examTip: 'Thành ngữ cực kỳ phổ biến trong đề thi học sinh, đồng nghĩa với "study or work late into the night".'
      },
      {
        type: 'Idiom',
        term: 'stick to one\'s guns',
        ipa: '/stɪk tuː wʌnz ɡʌnz/',
        meaning: 'giữ vững lập trường, kiên định với ý kiến của mình dù bị phản đối',
        context: 'Despite facing fierce opposition, she **stuck to her guns** and successfully launched the product.',
        cefrLevel: 'C1',
        examTip: 'Câu phân loại điểm 9-10. Trái nghĩa: change one\'s mind / compromise.'
      },
      {
        type: 'Collocation',
        term: 'play a pivotal role in',
        ipa: '/pleɪ ə ˈpɪvətl rəʊl ɪn/',
        meaning: 'đóng vai trò nòng cốt, then chốt trong việc gì',
        context: 'Regular physical exercise **plays a pivotal role in** preventing cardiovascular diseases.',
        cefrLevel: 'B2',
        examTip: 'Đồng nghĩa: play an essential / key / crucial role in. Đi với giới từ IN.'
      },
      {
        type: 'Idiom',
        term: 'make ends meet',
        ipa: '/meɪk endz miːt/',
        meaning: 'kiếm đủ tiền để trang trải cuộc sống',
        context: 'Many struggling families find it extremely difficult to **make ends meet** during periods of inflation.',
        cefrLevel: 'B2',
        examTip: 'Thành ngữ kinh điển đề THPT. Đồng nghĩa: earn just enough money to live on.'
      },
      {
        type: 'Preposition',
        term: 'at the expense of',
        ipa: '/æt ði ɪkˈspens əv/',
        meaning: 'phải trả giá bằng, làm tổn hại đến',
        context: 'The minister was accused of taking bribes **at the expense of** public welfare.',
        cefrLevel: 'C1',
        examTip: 'Cấu trúc giới từ điểm 9: at the expense / cost / sacrifice of something.'
      },
      {
        type: 'Idiom',
        term: 'at a loss',
        ipa: '/æt ə lɒs/',
        meaning: 'bối rối, lúng túng không biết phải làm/nói gì',
        context: 'He was completely **at a loss** when asked to explain the sudden deficit.',
        cefrLevel: 'B2',
        examTip: 'Đồng nghĩa: puzzled, bewildered, not knowing what to say or do.'
      }
    ]
  }
];
