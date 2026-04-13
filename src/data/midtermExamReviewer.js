/**
 * Midterm Exam Reviewer — 55 items
 *
 * P1. Consonants (15 pts)
 * P2. Vowels (15 pts)
 * P3. Sounds of Words · Lectures 1-5 (10 pts)
 * P4. Definitions (10 pts)
 * P5. Hellos and Goodbyes · Lectures 6-7 (5 pts)
 *
 * * Lecture 4 Compound Vowels — Memorize!
 */

// === P1. Consonants (15) — 10 basic + 5 double ===
const P1_ITEMS = [
  { korean: 'ㄱ', sound: 'g', answer: 'g', type: 'sound', section: 'P1', id: 'exam-giyeok' },
  { korean: 'ㄴ', sound: 'n', answer: 'n', type: 'sound', section: 'P1', id: 'exam-nieun' },
  { korean: 'ㄷ', sound: 'd', answer: 'd', type: 'sound', section: 'P1', id: 'exam-digeut' },
  { korean: 'ㄹ', sound: 'l', answer: 'l', type: 'sound', section: 'P1', id: 'exam-rieul' },
  { korean: 'ㅁ', sound: 'm', answer: 'm', type: 'sound', section: 'P1', id: 'exam-mieum' },
  { korean: 'ㅂ', sound: 'b', answer: 'b', type: 'sound', section: 'P1', id: 'exam-bieup' },
  { korean: 'ㅅ', sound: 's', answer: 's', type: 'sound', section: 'P1', id: 'exam-siot' },
  { korean: 'ㅇ', sound: 'no consonant sound', answer: 'no consonant sound', type: 'sound', section: 'P1', id: 'exam-ieung' },
  { korean: 'ㅈ', sound: 'j', answer: 'j', type: 'sound', section: 'P1', id: 'exam-jieut' },
  { korean: 'ㅊ', sound: 'ch', answer: 'ch', type: 'sound', section: 'P1', id: 'exam-chieut' },
  { korean: 'ㄲ', sound: 'gg', answer: 'gg', type: 'sound', section: 'P1', id: 'exam-ssanggiyeok' },
  { korean: 'ㄸ', sound: 'dd', answer: 'dd', type: 'sound', section: 'P1', id: 'exam-ssangdigeut' },
  { korean: 'ㅃ', sound: 'bb', answer: 'bb', type: 'sound', section: 'P1', id: 'exam-ssangbieup' },
  { korean: 'ㅆ', sound: 'ss', answer: 'ss', type: 'sound', section: 'P1', id: 'exam-ssangsiot' },
  { korean: 'ㅉ', sound: 'jj', answer: 'jj', type: 'sound', section: 'P1', id: 'exam-ssangjieut' },
]

// === P2. Vowels (15) — compound-vowel heavy ===
const P2_ITEMS = [
  { korean: 'ㅏ', sound: 'ah', answer: 'ah', type: 'sound', section: 'P2', id: 'exam-a' },
  { korean: 'ㅓ', sound: 'eo', answer: 'eo', type: 'sound', section: 'P2', id: 'exam-eo' },
  { korean: 'ㅗ', sound: 'oh', answer: 'oh', type: 'sound', section: 'P2', id: 'exam-o' },
  { korean: 'ㅣ', sound: 'i', answer: 'i', type: 'sound', section: 'P2', id: 'exam-i' },
  { korean: 'ㅐ', sound: 'ae', answer: 'ae', type: 'sound', section: 'P2', id: 'exam-ae' },
  { korean: 'ㅒ', sound: 'yae', answer: 'yae', type: 'sound', section: 'P2', id: 'exam-yae' },
  { korean: 'ㅔ', sound: 'eh', answer: 'eh', type: 'sound', section: 'P2', id: 'exam-eh' },
  { korean: 'ㅖ', sound: 'yeh', answer: 'yeh', type: 'sound', section: 'P2', id: 'exam-yeh' },
  { korean: 'ㅘ', sound: 'wah', answer: 'wah', type: 'sound', section: 'P2', id: 'exam-wah' },
  { korean: 'ㅙ', sound: 'wae', answer: 'wae', type: 'sound', section: 'P2', id: 'exam-wae-vowel' },
  { korean: 'ㅚ', sound: 'oe', answer: 'oe', type: 'sound', section: 'P2', id: 'exam-oe' },
  { korean: 'ㅝ', sound: 'wo', answer: 'wo', type: 'sound', section: 'P2', id: 'exam-wo' },
  { korean: 'ㅞ', sound: 'weh', answer: 'weh', type: 'sound', section: 'P2', id: 'exam-weh' },
  { korean: 'ㅟ', sound: 'wi', answer: 'wi', type: 'sound', section: 'P2', id: 'exam-wi' },
  { korean: 'ㅢ', sound: 'eui', answer: 'eui', type: 'sound', section: 'P2', id: 'exam-eui' },
]

// === P3. Sounds of Words — Lectures 1-5 (10) ===
const P3_ITEMS = [
  { korean: '아기', sound: 'ah gi', english: 'baby', answer: 'ah gi', type: 'sound', section: 'P3', id: 'exam-agi' },
  { korean: '하마', sound: 'hah mah', english: 'hippo', answer: 'hah mah', type: 'sound', section: 'P3', id: 'exam-hama' },
  { korean: '끄다', sound: 'ggeu dah', english: 'turn off', answer: 'ggeu dah', type: 'sound', section: 'P3', id: 'exam-kkuda' },
  { korean: '빠르다', sound: 'bbah leu dah', english: 'fast', answer: 'bbah leu dah', type: 'sound', section: 'P3', id: 'exam-bbaruda' },
  { korean: '개', sound: 'gae', english: 'dog', answer: 'gae', type: 'sound', section: 'P3', id: 'exam-gae' },
  { korean: '과자', sound: 'gwah jah', english: 'chips', answer: 'gwah jah', type: 'sound', section: 'P3', id: 'exam-gwajah' },
  { korean: '뭐', sound: 'mwoh', english: 'what', answer: 'mwoh', type: 'sound', section: 'P3', id: 'exam-mwoh' },
  { korean: '고양이', sound: 'goh yang i', english: 'cat', answer: 'goh yang i', type: 'sound', section: 'P3', id: 'exam-goyangi' },
  { korean: '공부', sound: 'gong booh', english: 'study', answer: 'gong booh', type: 'sound', section: 'P3', id: 'exam-gongbu' },
  { korean: '가방', sound: 'gah bang', english: 'bag', answer: 'gah bang', type: 'sound', section: 'P3', id: 'exam-gabang' },
]

// === P4. Definitions (10) ===
const P4_ITEMS = [
  { korean: '거미', sound: 'guh mi', english: 'spider', answer: 'spider', type: 'vocabulary', section: 'P4', id: 'exam-geomi' },
  { korean: '고추', sound: 'goh choo', english: 'chili', answer: 'chili', type: 'vocabulary', section: 'P4', id: 'exam-gochu' },
  { korean: '김치', sound: 'gim chi', english: 'kimchi', answer: 'kimchi', type: 'vocabulary', section: 'P4', id: 'exam-kimchi' },
  { korean: '떨다', sound: 'ddeol dah', english: 'shiver', answer: 'shiver', type: 'vocabulary', section: 'P4', id: 'exam-tteolda' },
  { korean: '쓸다', sound: 'sseul dah', english: 'sweep', answer: 'sweep', type: 'vocabulary', section: 'P4', id: 'exam-sseulda' },
  { korean: '짜다', sound: 'jjah dah', english: 'salty', answer: 'salty', type: 'vocabulary', section: 'P4', id: 'exam-jjada' },
  { korean: '게', sound: 'geh', english: 'crab', answer: 'crab', type: 'vocabulary', section: 'P4', id: 'exam-geh' },
  { korean: '왜', sound: 'wae', english: 'why', answer: 'why', type: 'vocabulary', section: 'P4', id: 'exam-wae' },
  { korean: '괴물', sound: 'goe moohl', english: 'monster', answer: 'monster', type: 'vocabulary', section: 'P4', id: 'exam-goemul' },
  { korean: '종이', sound: 'jong i', english: 'paper', answer: 'paper', type: 'vocabulary', section: 'P4', id: 'exam-jongi' },
]

// === P5. Hellos and Goodbyes — Lectures 6-7 (5) ===
const P5_ITEMS = [
  { korean: '안녕하세요', sound: 'ahn yeong ha seh yoh', english: 'Hello, how are you?', answer: 'Hello, how are you?', type: 'vocabulary', section: 'P5', id: 'exam-annyeong' },
  { korean: '안녕히 계세요', sound: 'ahn yeong hi gyeh seh yoh', english: 'Finely stay', answer: 'Finely stay', type: 'vocabulary', section: 'P5', id: 'exam-gyeseyoh' },
  { korean: '안녕히 가세요', sound: 'ahn yeong hi gah seh yoh', english: 'Finely go', answer: 'Finely go', type: 'vocabulary', section: 'P5', id: 'exam-gaseyoh' },
  { korean: '여보세요?', sound: 'yeo boh seh yoh?', english: 'Hello on phone call', answer: 'Hello on phone call', type: 'vocabulary', section: 'P5', id: 'exam-yeoboseyoh' },
  { korean: '나중에 다시 전화 할게요.', sound: 'nah-jong-eh dah-si jeon-hwah hahl-geh-yoh', english: 'I will call you back later.', answer: 'I will call you back later.', type: 'vocabulary', section: 'P5', id: 'exam-callback' },
]

export const EXAM_ITEMS = [
  ...P1_ITEMS,
  ...P2_ITEMS,
  ...P3_ITEMS,
  ...P4_ITEMS,
  ...P5_ITEMS,
]

export const EXAM_PRINCIPLES = [
  'Midterm Exam — 55 items total',
  'P1. Consonants — 15 pts',
  'P2. Vowels — 15 pts  (* Lecture 4 Compound Vowels: Memorize!)',
  'P3. Sounds of Words (Lecture 1‑5) — 10 pts',
  'P4. Definitions — 10 pts',
  'P5. Lecture 6‑7 Hellos & Goodbyes — 5 pts',
]

export const SECTION_LABELS = {
  P1: 'P1. Consonants',
  P2: 'P2. Vowels',
  P3: 'P3. Sounds of Words',
  P4: 'P4. Definitions',
  P5: 'P5. Hellos & Goodbyes',
}

export const SECTION_QUIZ_PROMPTS = {
  P1: 'What sound does this consonant make?',
  P2: 'What sound does this vowel make?',
  P3: 'How do you read this word?',
  P4: 'What does this word mean?',
  P5: 'What does this mean?',
}
