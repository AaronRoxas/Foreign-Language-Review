/**
 * @typedef {Object} ReviewItem
 * @property {string} korean
 * @property {string} sound
 * @property {string} id
 * @property {string} [english]
 * @property {string} [pos]
 * @property {boolean} [special]
 */

/**
 * @typedef {Object} LessonModule
 * @property {ReviewItem[]} items
 * @property {string} subtitle
 * @property {string[] | null} [principles]
 * @property {string} [notesShowLabel]
 * @property {'sound' | 'english'} answerField
 * @property {'sound' | 'vocabulary'} flashcardBack
 * @property {boolean} [showConsonantSpecialNote]
 * @property {boolean} [showPosOnVocabularyBack]
 * @property {string} flashcardFrontHint
 * @property {{ hint: string, leftLabel: string, rightLabel: string, doneNoun: string }} matching
 * @property {{ prompt: string }} quiz
 */

export {}
