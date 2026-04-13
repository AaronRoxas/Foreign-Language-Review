import { useState, useMemo, useRef, useCallback } from 'react'
import { getLessonModule } from '../data/lessonModules'
import './LessonReview.css'

const MODES = { flashcards: 'Flashcards', matching: 'Matching', quiz: 'Quiz' }
const SWIPE_THRESHOLD = 80

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function LessonReview({
  lesson, groupTitle, onBack,
  lessons = [], lessonIndex = -1, onPrevLesson, onNextLesson,
}) {
  const touchRef = useRef(null)

  const handleTouchStart = useCallback((e) => {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY }
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (!touchRef.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchRef.current.x
    const dy = t.clientY - touchRef.current.y
    touchRef.current = null
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0 && onNextLesson) onNextLesson()
      else if (dx > 0 && onPrevLesson) onPrevLesson()
    }
  }, [onPrevLesson, onNextLesson])
  const moduleId = lesson.moduleId
  const mod = getLessonModule(moduleId)
  const {
    items: sourceData,
    subtitle,
    principles,
    notesShowLabel = 'Show key principles',
    answerField,
    flashcardBack,
    showConsonantSpecialNote,
    showPosOnVocabularyBack,
    flashcardFrontHint,
    matching: matchUi,
    quiz: quizUi,
  } = mod

  const sectionLabels = mod.sectionLabels
  const disableMatching = mod.disableMatching

  const showPrinciplesBlock = Boolean(principles?.length)

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

  const shuffledItems = useMemo(
    () => shuffle([...getLessonModule(moduleId).items]),
    [moduleId],
  )
  const shuffledAnswers = useMemo(() => {
    const { items, answerField: af } = getLessonModule(moduleId)
    return shuffle(items.map(item => item[af]))
  }, [moduleId])

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
    const { items, answerField: af } = getLessonModule(moduleId)
    const correct = quizItem[af]

    const confusables = (quizItem.confusables || []).filter(c => c !== correct)
    const picked = shuffle(confusables).slice(0, 3)

    if (picked.length < 3) {
      const sameSection = quizItem.section
        ? items.filter(item => item.section === quizItem.section)
        : items
      const pool = sameSection.length >= 4 ? sameSection : items
      const fallback = pool
        .filter(item => item[af] !== correct)
        .map(item => item[af])
        .filter((s, i, a) => a.indexOf(s) === i)
        .filter(s => !picked.includes(s))
      picked.push(...shuffle(fallback).slice(0, 3 - picked.length))
    }

    return shuffle([correct, ...picked])
  }, [moduleId, quizItem])

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

  const getIsVocabCard = (card) => {
    if (card?.type === 'vocabulary') return true
    if (card?.type === 'sound') return false
    return flashcardBack === 'vocabulary'
  }

  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null

  return (
    <div
      className="review"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
        {showPrinciplesBlock && showPrinciples && (
          <div className="principles-box">
            <button
              className="principles-close"
              onClick={() => setShowPrinciples(false)}
              type="button"
              aria-label="Hide notes"
            >
              ×
            </button>
            {principles.map((p, i) => (
              <p key={i} className="principle-item">
                • {p}
              </p>
            ))}
          </div>
        )}
        {showPrinciplesBlock && !showPrinciples && (
          <button
            className="principles-show"
            onClick={() => setShowPrinciples(true)}
            type="button"
          >
            {notesShowLabel}
          </button>
        )}
      </header>

      <nav className="mode-tabs">
        {Object.entries(MODES)
          .filter(([key]) => !(key === 'matching' && disableMatching))
          .map(([key, label]) => (
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
              aria-label={flipped ? 'Show front' : 'Show answer'}
            >
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  <div className="fc-front-accent" aria-hidden />
                  <div className="fc-face-content fc-face-content--front">
                    {sectionLabels && currentCard?.section && (
                      <span className="fc-section-tag">
                        {sectionLabels[currentCard.section]}
                      </span>
                    )}
                    <p className="fc-korean">{currentCard?.korean}</p>
                    <div className="fc-hint-row">
                      <span className="fc-flip-glyph" aria-hidden>
                        ↻
                      </span>
                      <span className="fc-hint">{flashcardFrontHint}</span>
                    </div>
                  </div>
                </div>
                <div className="flashcard-back">
                  <div className="fc-face-content fc-face-content--back">
                    {getIsVocabCard(currentCard) ? (
                      <>
                        <p className="fc-label-back">Reading</p>
                        <p className="fc-answer">{currentCard?.sound}</p>
                        <div className="fc-back-divider" role="presentation" />
                        <p className="fc-label-back fc-label-back--secondary">
                          Meaning
                        </p>
                        <p className="fc-english">
                          {showPosOnVocabularyBack && currentCard?.pos && (
                            <span className="fc-pos">{currentCard.pos} · </span>
                          )}
                          {currentCard?.english}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="fc-label-back">Sound</p>
                        <p className="fc-answer fc-answer--solo">{currentCard?.sound}</p>
                        {showConsonantSpecialNote && currentCard?.special && (
                          <p className="fc-note">
                            Initial position: placeholder for vowel
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="fc-nav">
              <button
                type="button"
                className="fc-nav-btn"
                onClick={e => {
                  e.stopPropagation()
                  handlePrev()
                }}
              >
                ← Prev
              </button>
              <span className="fc-counter">
                <span className="fc-counter-current">{flashcardIndex + 1}</span>
                <span className="fc-counter-sep">/</span>
                <span className="fc-counter-total">{totalCards}</span>
              </span>
              <button
                type="button"
                className="fc-nav-btn"
                onClick={e => {
                  e.stopPropagation()
                  handleNext()
                }}
              >
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
                  All {totalCards} {matchUi.doneNoun} matched!
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
                <p className="matching-hint">{matchUi.hint}</p>
                <div className="matching-grid">
                  <div className="matching-col">
                    <div className="matching-col-label">{matchUi.leftLabel}</div>
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
                    <div className="matching-col-label">{matchUi.rightLabel}</div>
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
                  {sectionLabels && quizItem?.section && (
                    <span className="quiz-section-tag">
                      {sectionLabels[quizItem.section]}
                    </span>
                  )}
                  <p className="quiz-prompt">
                    {quizUi.sectionPrompts?.[quizItem?.section] || quizUi.prompt}
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

      {(prevLesson || nextLesson) && (
        <nav className={`lesson-nav ${prevLesson && nextLesson ? '' : 'lesson-nav--single'}`}>
          {prevLesson && (
            <button
              type="button"
              className="lesson-nav-btn lesson-nav-prev"
              onClick={onPrevLesson}
            >
              <span className="lesson-nav-icon">←</span>
              <span className="lesson-nav-label">
                <span className="lesson-nav-dir">Previous lesson</span>
                <span className="lesson-nav-name">{prevLesson.title}: {prevLesson.subtitle}</span>
              </span>
            </button>
          )}
          {nextLesson && (
            <button
              type="button"
              className="lesson-nav-btn lesson-nav-next"
              onClick={onNextLesson}
            >
              <span className="lesson-nav-label">
                <span className="lesson-nav-dir">Next lesson</span>
                <span className="lesson-nav-name">{nextLesson.title}: {nextLesson.subtitle}</span>
              </span>
              <span className="lesson-nav-icon">→</span>
            </button>
          )}
        </nav>
      )}
    </div>
  )
}
