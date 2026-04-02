/**
 * Central registry for review lessons. To add a topic:
 * 1. Create a data file that exports `items` (and optional `principles`, labels).
 * 2. Add a new entry to LESSON_MODULES below.
 * 3. Add a lesson row in courseStructure.js with the same `moduleId`.
 */
import {
  CONSONANTS,
  PRINCIPLES as L1_PRINCIPLES,
  CONSONANTS_LABEL,
} from './lecture1Consonants'
import { VOWELS, PRACTICE_WORDS, VOWELS_LABEL } from './lecture2Vowels'
import {
  PRINCIPLES as L2_PRINCIPLES,
  DOUBLE_WORDS,
  DOUBLE_LABEL,
} from './lecture3DoubleConsonants'
import {
  COMPOUND_WORDS,
} from './lecture4CompoundVowelsWords'
import {
  PRINCIPLES as L4_PRINCIPLES,
  COMPOUND_VOWELS,
  COMPOUND_LABEL,
} from './lecture4CompoundVowel'
import {
  PRINCIPLES as L5_PRINCIPLES,
  SAMPLE_WORDS,
} from './lecture5'
import {
  KEY_WORDS,
  KEY_WORD_LABEL,
} from './lecture6KeyWord'
import {
  PRINCIPLES as L6_PRINCIPLES,
  HELLO_BYE_WORDS,
  HELLO_BYE_LABEL,
} from './lecture6HelloBye'
import {
  MUST_KNOW_VOCAB,
  MUST_KNOW_VOCAB_LABEL,
} from './lecture7MustKnowVocab'
import {
  PHONE_CALLS,
  PHONE_CALL_LABEL,
} from './lecture7PhoneCalls'

/** @type {Record<string, import('./lessonTypes').LessonModule>} */
export const LESSON_MODULES = {
  consonants: {
    items: CONSONANTS,
    subtitle: CONSONANTS_LABEL,
    principles: L1_PRINCIPLES,
    notesShowLabel: 'Show key principles',
    answerField: 'sound',
    flashcardBack: 'sound',
    showConsonantSpecialNote: true,
    flashcardFrontHint: 'Tap to reveal sound',
    matching: {
      hint: 'Match each consonant to its sound.',
      leftLabel: 'Consonant',
      rightLabel: 'Sound',
      doneNoun: 'consonants',
    },
    quiz: { prompt: 'What sound does this consonant make?' },
  },

  vowels: {
    items: VOWELS,
    subtitle: VOWELS_LABEL,
    principles: null,
    answerField: 'sound',
    flashcardBack: 'sound',
    flashcardFrontHint: 'Tap to reveal sound',
    matching: {
      hint: 'Match each vowel to its sound.',
      leftLabel: 'Vowel',
      rightLabel: 'Sound',
      doneNoun: 'vowels',
    },
    quiz: { prompt: 'What sound does this vowel make?' },
  },

  'practice-words': {
    items: PRACTICE_WORDS,
    subtitle: 'Practice words with vowels',
    principles: null,
    answerField: 'english',
    flashcardBack: 'vocabulary',
    flashcardFrontHint: 'Tap to reveal meaning',
    matching: {
      hint: 'Match each word to its English meaning.',
      leftLabel: 'Korean',
      rightLabel: 'English',
      doneNoun: 'words',
    },
    quiz: { prompt: 'What does this word mean?' },
  },

  'double-consonants': {
    items: DOUBLE_WORDS,
    subtitle: DOUBLE_LABEL,
    principles: L2_PRINCIPLES,
    notesShowLabel: 'Show double consonant notes',
    answerField: 'english',
    flashcardBack: 'vocabulary',
    showPosOnVocabularyBack: true,
    flashcardFrontHint: 'Tap to reveal meaning',
    matching: {
      hint: 'Match each word to its English meaning.',
      leftLabel: 'Korean',
      rightLabel: 'English',
      doneNoun: 'words',
    },
    quiz: { prompt: 'What does this word mean?' },
  },

  'compound-vowels': {
    items: COMPOUND_VOWELS,
    subtitle: COMPOUND_LABEL,
    principles: L4_PRINCIPLES,
    notesShowLabel: 'Show compound vowel notes',
    answerField: 'sound',
    flashcardBack: 'sound',
    flashcardFrontHint: 'Tap to reveal sound',
    matching: {
      hint: 'Match each vowel to its sound.',
      leftLabel: 'Vowel',
      rightLabel: 'Sound',
      doneNoun: 'vowels',
    },
    quiz: { prompt: 'What sound does this vowel make?' },
  },

  'compound-vowels-words': {
    items: COMPOUND_WORDS,
    subtitle: COMPOUND_LABEL,
    principles: L4_PRINCIPLES,
    notesShowLabel: 'Show compound vowel notes',
    answerField: 'english',
    flashcardBack: 'vocabulary',
    flashcardFrontHint: 'Tap to reveal meaning',
    matching: {
      hint: 'Match each word to its English meaning.',
      leftLabel: 'Korean',
      rightLabel: 'English',
      doneNoun: 'words',
    },
    quiz: { prompt: 'What does this word mean?' },
  },
  'sample-words': {
    items: SAMPLE_WORDS,
    principles: L5_PRINCIPLES,
    notesShowLabel: 'Show sample word notes',
    answerField: 'english',
    flashcardBack: 'vocabulary',
    flashcardFrontHint: 'Tap to reveal meaning',
    matching: {
      hint: 'Match each word to its English meaning.',
      leftLabel: 'Korean',
      rightLabel: 'English',
      doneNoun: 'words',
    },
    quiz: { prompt: 'What does this word mean?' },
  },
  'key-words': {
    items: KEY_WORDS,
    subtitle: KEY_WORD_LABEL,
    principles: L6_PRINCIPLES,
    notesShowLabel: 'Show key word notes',
    answerField: 'english',
    flashcardBack: 'vocabulary',
    flashcardFrontHint: 'Tap to reveal meaning',
    matching: {
      hint: 'Match each word to its English meaning.',
      leftLabel: 'Korean',
      rightLabel: 'English',
      doneNoun: 'words',
    },
    quiz: { prompt: 'What does this word mean?' },
  },
  'hello-bye-words': {
    items: HELLO_BYE_WORDS,
    subtitle: HELLO_BYE_LABEL,
    principles: L6_PRINCIPLES,
    notesShowLabel: 'Show hello bye word notes',
    answerField: 'english',
    flashcardBack: 'vocabulary',
    flashcardFrontHint: 'Tap to reveal meaning',
    matching: {
      hint: 'Match each word to its English meaning.',
      leftLabel: 'Korean',
      rightLabel: 'English',
      doneNoun: 'words',
    },
    quiz: { prompt: 'What does this word mean?' },
  },
  'must-know-vocab': {
    items: MUST_KNOW_VOCAB,
    subtitle: MUST_KNOW_VOCAB_LABEL,

    notesShowLabel: 'Show must know vocab notes',
    answerField: 'english',
    flashcardBack: 'vocabulary',
    flashcardFrontHint: 'Tap to reveal meaning',
    matching: {
      hint: 'Match each word to its English meaning.',
      leftLabel: 'Korean',
      rightLabel: 'English',
      doneNoun: 'words',
    },
    quiz: { prompt: 'What does this word mean?' },
  },
  'phone-calls': {
    items: PHONE_CALLS,
    subtitle: PHONE_CALL_LABEL,
    notesShowLabel: 'Show phone call notes',
    answerField: 'english',
    flashcardBack: 'vocabulary',
    flashcardFrontHint: 'Tap to reveal meaning',
    matching: {
      hint: 'Match each word to its English meaning.',
      leftLabel: 'Korean',
      rightLabel: 'English',
      doneNoun: 'words',
    },
    quiz: { prompt: 'What does this sentence mean?' },
  },

}

/**
 * @param {string} moduleId
 * @returns {LessonModule}
 */
export function getLessonModule(moduleId) {
  const mod = LESSON_MODULES[moduleId]
  if (!mod) {
    throw new Error(
      `Unknown lesson module "${moduleId}". Add it in src/data/lessonModules.js`,
    )
  }
  return mod
}

/**
 * @param {string} moduleId
 */
export function getLessonItemCount(moduleId) {
  return getLessonModule(moduleId).items.length
}
