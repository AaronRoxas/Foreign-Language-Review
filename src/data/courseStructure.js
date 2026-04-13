import { getLessonItemCount } from './lessonModules'

/**
 * Course outline. Each lesson must set `moduleId` to a key in LESSON_MODULES
 * (see lessonModules.js). Item counts are derived from the module so they stay in sync.
 */
export const GROUPS = [
  {
    id: 'prelim',
    title: 'Prelim',
    description: 'Foundation of the Korean writing system',
    lessons: [
      {
        id: 'lesson-1-consonants',
        moduleId: 'consonants',
        title: 'Lecture 1',
        subtitle: 'Consonants',
        description: '14 consonants and their sounds',
        itemCount: getLessonItemCount('consonants'),
      },
      {
        id: 'lesson-2-vowels',
        moduleId: 'vowels',
        title: 'Lecture 2',
        subtitle: 'Vowels',
        description: '10 main vowels',
        itemCount: getLessonItemCount('vowels'),
      },
      {
        id: 'lesson-2-practice',
        moduleId: 'practice-words',
        title: 'Lecture 2',
        subtitle: 'Practice Words',
        description: 'Practice words with vowels',
        itemCount: getLessonItemCount('practice-words'),
      },
    ],
  },
  {
    id: 'midterm',
    title: 'Midterm',
    description: 'Building sentences and vocabulary',
    lessons: [
      {
        id: 'lesson-3-double-consonants',
        moduleId: 'double-consonants',
        title: 'Lecture 3',
        subtitle: 'Double Consonants',
        description: 'Stronger sound of its original sound',
        itemCount: getLessonItemCount('double-consonants'),
      },
      {
        id: 'lesson-4-compound-vowels',
        moduleId: 'compound-vowels',
        title: 'Lecture 4',
        subtitle: 'Compound Vowels',
        description: 'Compound vowels',
        itemCount: getLessonItemCount('compound-vowels'),
      },
      {
        id: 'lesson-4-compound-vowels-words',
        moduleId: 'compound-vowels-words',
        title: 'Lecture 4.1',
        subtitle: 'Compound Vowels Words',
        description: 'Compound vowels words and example vocabulary',
        itemCount: getLessonItemCount('compound-vowels-words'),
      },
      {
        id: 'lesson-5-sample-words',
        moduleId: 'sample-words',
        title: 'Lecture 5',
        subtitle: 'Sample words',
        description: 'ㅇ = Written under the consonant = makes ng sound',
        itemCount: getLessonItemCount('sample-words'),
      },
      {
        id: 'lesson-6-hello-bye-words',
        moduleId: 'hello-bye-words',
        title: 'Lecture 6',
        subtitle: 'Hellos and Byes',
        description: 'Hellos and Byes in Korean',
        itemCount: getLessonItemCount('hello-bye-words'),
      },
      {
        id: 'lesson-6-key-words',
        moduleId: 'key-words',
        title: 'Lecture 6.1',
        subtitle: 'Key words',
        description: 'Key words to remember',
        itemCount: getLessonItemCount('key-words'),
      },
      {
        id: 'lesson-7-phone-calls',
        moduleId: 'phone-calls',
        title: 'Lecture 7',
        subtitle: 'Phone calls',
        description: 'Phone calls in Korean',
        itemCount: getLessonItemCount('phone-calls'),
      },
      {
        id: 'lesson-7-must-know-vocab',
        moduleId: 'must-know-vocab',
        title: 'Lecture 7.1',
        subtitle: 'Must know vocabulary',
        description: 'Must know vocabulary',
        itemCount: getLessonItemCount('must-know-vocab'),
      },
      {
        id: 'midterm-exam-reviewer',
        moduleId: 'midterm-exam',
        title: 'Exam Reviewer',
        subtitle: 'Midterm',
        description: '55-item reviewer — Consonants, Vowels, Sounds, Definitions, Hellos & Goodbyes',
        itemCount: getLessonItemCount('midterm-exam'),
      },
    ],
    comingSoon: false,
  },
  {
    id: 'final',
    title: 'Finals',
    lessons: [],
    comingSoon: true,
  },
]
