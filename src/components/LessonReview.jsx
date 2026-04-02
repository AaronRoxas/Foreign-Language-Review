import { useState, useMemo } from 'react'
import { CONSONANTS, PRINCIPLES, CONSONANTS_LABEL } from '../data/lecture1Consonants'
import { VOWELS, PRACTICE_WORDS, VOWELS_LABEL } from '../data/lecture2Vowels'
import './LessonReview.css'

const MODES = { flashcards: 'Flashcards', matching: 'Matching', quiz: 'Quiz' }

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function LessonReview({ lesson, groupTitle, onBack }) {
  const { lessonKey } = lesson
  const isLesson1 = lessonKey === 1
  const isPracticeWords = lessonKey === 3

  const sourceData = isLesson1 ? CONSONANTS : isPracticeWords ? PRACTICE_WORDS : VOWELS
  const answerField = isPracticeWords ? 'english' : 'sound'
  const subtitle = isLesson1
    ? CONSONANTS_LABEL
    : isPracticeWords
      ? 'Practice words with vowels'
      : VOWELS_LABEL

  const [mode, setMode] = useState('flashcards')
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [showPrinciples, setShowPrinciples] = useState(true)

  const [matchedPairs, setMatchedPairs] = useState([])
  const [matchedAnswers, setMatchedAnswers] = useState([])
  const [selectedKorean, setSelectedKorean] = useState(null)

  const [quizIndex, setQuizIndex] = useState(0)
  const [quizChoice, setQuizChoice] = useState(null)
  const [quizScore, setQuizScore] = useState(0)
  const [quizAnswered, setQuizAnswered] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  const shuffledItems = useMemo(() => shuffle(sourceData), [sourceData])
  const shuffledAnswers = useMemo(
    () => shuffle(sourceData.map(item => item[answerField])),
    [sourceData, answerField],
  )

  const totalCards = sourceData.length
  const currentCard = shuffledItems[flashcardIndex]

  const handlePrev = () => {
    setFlipped(false)
    setFlashcardIndex(i => (i - 1 + totalCards) % totalCards)
  }
  const handleNext = () => {
    setFlipped(false)
    setFlashcardIndex(i => (i + 1) % totalCards)
  }

  const handleKoreanSelect = (korean) => {
    if (matchedPairs.includes(korean)) return
    setSelectedKorean(selectedKorean === korean ? null : korean)
  }

  const handleAnswerSelect = (answer) => {
    if (!selectedKorean || matchedAnswers.includes(answer)) return
    const correct = sourceData.find(item => item.korean === selectedKorean)?.[answerField]
    if (correct === answer) {
      setMatchedPairs(p => [...p, selectedKorean])
      setMatchedAnswers(a => [...a, answer])
    }
    setSelectedKorean(null)
  }

  const matchingComplete = matchedPairs.length === totalCards

  const resetMatching = () => {
    setMatchedPairs([])
    setMatchedAnswers([])
    setSelectedKorean(null)
  }

  const quizItem = shuffledItems[quizIndex]
  const quizCorrectAnswer = quizItem?.[answerField]
  const quizOptions = useMemo(() => {
    if (!quizItem) return []
    const wrong = sourceData
      .filter(item => item[answerField] !== quizItem[answerField])
      .map(item => item[answerField])
      .filter((s, i, a) => a.indexOf(s) === i)
    return shuffle([quizItem[answerField], ...shuffle(wrong).slice(0, 3)])
  }, [quizIndex, quizItem, sourceData, answerField])

  const handleQuizCheck = () => {
    if (quizAnswered) return
    setQuizAnswered(true)
    if (quizChoice === quizCorrectAnswer) setQuizScore(s => s + 1)
  }

  const handleQuizNext = () => {
    setQuizChoice(null)
    setQuizAnswered(false)
    if (quizIndex + 1 >= totalCards) {
      setQuizComplete(true)
    } else {
      setQuizIndex(i => i + 1)
    }
  }

  const resetQuiz = () => {
    setQuizIndex(0)
    setQuizChoice(null)
    setQuizScore(0)
    setQuizAnswered(false)
    setQuizComplete(false)
  }

  return (
    <div className="review">
      <nav className="breadcrumb">
        <button className="breadcrumb-back" onClick={onBack} type="button">
          ← {groupTitle}
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">
          {lesson.title}: {lesson.subtitle}
        </span>
      </nav>

      <header className="review-header">
        <h1 className="review-title">
          {lesson.title}: {lesson.subtitle}
        </h1>
        <p className="review-subtitle">{subtitle}</p>
        {isLesson1 && showPrinciples && (
          <div className="principles-box">
            <button
              className="principles-close"
              onClick={() => setShowPrinciples(false)}
              type="button"
              aria-label="Hide principles"
            >
              ×
            </button>
            {PRINCIPLES.map((p, i) => (
              <p key={i} className="principle-item">
                • {p}
              </p>
            ))}
          </div>
        )}
        {isLesson1 && !showPrinciples && (
          <button
            className="principles-show"
            onClick={() => setShowPrinciples(true)}
            type="button"
          >
            Show key principles
          </button>
        )}
      </header>

      <nav className="mode-tabs">
        {Object.entries(MODES).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`mode-tab ${mode === key ? 'active' : ''}`}
            onClick={() => {
              setMode(key)
              if (key === 'quiz') resetQuiz()
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="review-content">
        {mode === 'flashcards' && (
          <div className="flashcards">
            <div
              className={`flashcard ${flipped ? 'flipped' : ''}`}
              onClick={() => setFlipped(f => !f)}
              onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}
              role="button"
              tabIndex={0}
            >
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  <span className="fc-korean">{currentCard?.korean}</span>
                  <span className="fc-hint">
                    {isPracticeWords
                      ? 'Tap to reveal meaning'
                      : 'Tap to reveal sound'}
                  </span>
                </div>
                <div className="flashcard-back">
                  {isPracticeWords ? (
                    <>
                      <span className="fc-answer">{currentCard?.sound}</span>
                      <span className="fc-english">{currentCard?.english}</span>
                    </>
                  ) : (
                    <>
                      <span className="fc-answer">{currentCard?.sound}</span>
                      {currentCard?.special && (
                        <span className="fc-note">
                          Initial position: placeholder for vowel
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="fc-nav">
              <button type="button" className="fc-nav-btn" onClick={handlePrev}>
                ← Prev
              </button>
              <span className="fc-counter">
                {flashcardIndex + 1} / {totalCards}
              </span>
              <button type="button" className="fc-nav-btn" onClick={handleNext}>
                Next →
              </button>
            </div>
          </div>
        )}

        {mode === 'matching' && (
          <div className="matching">
            {matchingComplete ? (
              <div className="matching-done">
                <p className="matching-done-text">
                  All {totalCards}{' '}
                  {isLesson1
                    ? 'consonants'
                    : isPracticeWords
                      ? 'words'
                      : 'vowels'}{' '}
                  matched!
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={resetMatching}
                >
                  Play again
                </button>
              </div>
            ) : (
              <>
                <p className="matching-hint">
                  {isLesson1
                    ? 'Match each consonant to its sound.'
                    : isPracticeWords
                      ? 'Match each word to its English meaning.'
                      : 'Match each vowel to its sound.'}
                </p>
                <div className="matching-grid">
                  <div className="matching-col">
                    <div className="matching-col-label">
                      {isLesson1
                        ? 'Consonant'
                        : isPracticeWords
                          ? 'Korean'
                          : 'Vowel'}
                    </div>
                    {sourceData.map(item => (
                      <button
                        key={item.id}
                        type="button"
                        className={`match-item korean ${selectedKorean === item.korean ? 'selected' : ''} ${matchedPairs.includes(item.korean) ? 'matched' : ''}`}
                        onClick={() => handleKoreanSelect(item.korean)}
                        disabled={matchedPairs.includes(item.korean)}
                      >
                        {item.korean}
                      </button>
                    ))}
                  </div>
                  <div className="matching-col">
                    <div className="matching-col-label">
                      {isPracticeWords ? 'English' : 'Sound'}
                    </div>
                    {shuffledAnswers.map((answer, i) => (
                      <button
                        key={`${answer}-${i}`}
                        type="button"
                        className={`match-item answer ${matchedAnswers.includes(answer) ? 'matched' : ''}`}
                        onClick={() => handleAnswerSelect(answer)}
                        disabled={matchedAnswers.includes(answer)}
                      >
                        {answer}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="matching-footer">
                  <span className="matching-progress">
                    {matchedPairs.length} / {totalCards} matched
                  </span>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={resetMatching}
                  >
                    Reset
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {mode === 'quiz' && (
          <div className="quiz">
            {quizComplete ? (
              <div className="quiz-done">
                <div className="quiz-done-score">
                  {quizScore} / {totalCards}
                </div>
                <p className="quiz-done-pct">
                  {((quizScore / totalCards) * 100).toFixed(0)}% correct
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={resetQuiz}
                >
                  Try again
                </button>
              </div>
            ) : (
              <>
                <div className="quiz-progress">
                  Question {quizIndex + 1} of {totalCards}
                </div>
                <div className="quiz-card">
                  <p className="quiz-prompt">
                    {isLesson1
                      ? 'What sound does this consonant make?'
                      : isPracticeWords
                        ? 'What does this word mean?'
                        : 'What sound does this vowel make?'}
                  </p>
                  <p className="quiz-character">{quizItem?.korean}</p>
                  <div className="quiz-options">
                    {quizOptions.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        className={`quiz-opt ${
                          quizAnswered
                            ? opt === quizCorrectAnswer
                              ? 'correct'
                              : quizChoice === opt
                                ? 'wrong'
                                : ''
                            : quizChoice === opt
                              ? 'selected'
                              : ''
                        }`}
                        onClick={() => !quizAnswered && setQuizChoice(opt)}
                        disabled={quizAnswered}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {!quizAnswered ? (
                    <button
                      type="button"
                      className="btn-accent full-width"
                      onClick={handleQuizCheck}
                      disabled={quizChoice === null}
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-success full-width"
                      onClick={handleQuizNext}
                    >
                      {quizIndex + 1 >= totalCards ? 'See Results' : 'Next →'}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
