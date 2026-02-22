import { useState, useMemo, useEffect } from 'react';
import { CONSONANTS, PRINCIPLES, LECTURE_TITLE as LECTURE1_TITLE, CONSONANTS_LABEL } from '../data/lecture1Consonants';
import { VOWELS, PRACTICE_WORDS, LECTURE_TITLE as LECTURE2_TITLE, VOWELS_LABEL } from '../data/lecture2Vowels';
import './KoreanLecture1.css';

const MODES = { flashcards: 'Flashcards', matching: 'Matching', quiz: 'Quiz' };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function KoreanLecture1() {
  const [lesson, setLesson] = useState(1);
  const [mode, setMode] = useState('flashcards');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedKorean, setSelectedKorean] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showPrinciples, setShowPrinciples] = useState(true);

  // Lesson 1 data
  const shuffledConsonants = useMemo(() => shuffle(CONSONANTS), []);
  const shuffledSounds = useMemo(() => shuffle(CONSONANTS.map((c) => c.sound)), []);

  // Lesson 2 data
  const shuffledVowels = useMemo(() => shuffle(VOWELS), []);
  const shuffledVowelSounds = useMemo(() => shuffle(VOWELS.map((v) => v.sound)), []);
  const shuffledPracticeWords = useMemo(() => shuffle(PRACTICE_WORDS), []);
  const shuffledPracticeWordEnglish = useMemo(() => shuffle(PRACTICE_WORDS.map((w) => w.english)), []);

  // Reset states when lesson changes
  useEffect(() => {
    setFlashcardIndex(0);
    setFlipped(false);
    setMatchedPairs([]);
    setSelectedKorean(null);
    setSelectedSound(null);
    setQuizIndex(0);
    setQuizChoice(null);
    setQuizScore(0);
    setQuizAnswered(false);
    setQuizComplete(false);
  }, [lesson]);

  // Current lesson data (1=consonants, 2=vowels, 3=practice words)
  const isLesson1 = lesson === 1;
  const isPracticeWordsLesson = lesson === 3;
  const currentItems = isLesson1 ? shuffledConsonants : isPracticeWordsLesson ? shuffledPracticeWords : shuffledVowels;
  const currentCard = currentItems[flashcardIndex];
  const totalCards = isLesson1 ? CONSONANTS.length : isPracticeWordsLesson ? PRACTICE_WORDS.length : VOWELS.length;

  // Quiz data
  const quizItem = isLesson1
    ? shuffledConsonants[quizIndex]
    : isPracticeWordsLesson
      ? shuffledPracticeWords[quizIndex]
      : shuffledVowels[quizIndex];
  const quizTotal = isLesson1
    ? CONSONANTS.length
    : isPracticeWordsLesson
      ? PRACTICE_WORDS.length
      : VOWELS.length;
  const quizCorrectAnswer = isPracticeWordsLesson ? quizItem?.english : quizItem?.sound;
  const quizOptions = useMemo(() => {
    if (!quizItem) return [];
    if (isLesson1) {
      const wrong = CONSONANTS.filter((c) => c.sound !== quizItem.sound)
        .map((c) => c.sound)
        .filter((s, i, a) => a.indexOf(s) === i);
      const options = shuffle([quizItem.sound, ...shuffle(wrong).slice(0, 3)]);
      return shuffle(options);
    } else if (isPracticeWordsLesson) {
      const wrong = PRACTICE_WORDS.filter((w) => w.english !== quizItem.english)
        .map((w) => w.english)
        .filter((s, i, a) => a.indexOf(s) === i);
      const options = shuffle([quizItem.english, ...shuffle(wrong).slice(0, 3)]);
      return shuffle(options);
    } else {
      const wrong = VOWELS.filter((v) => v.sound !== quizItem.sound)
        .map((v) => v.sound)
        .filter((s, i, a) => a.indexOf(s) === i);
      const options = shuffle([quizItem.sound, ...shuffle(wrong).slice(0, 3)]);
      return shuffle(options);
    }
  }, [quizIndex, quizItem, isLesson1, isPracticeWordsLesson]);

  const handleNextFlashcard = () => {
    setFlipped(false);
    setFlashcardIndex((i) => (i + 1) % totalCards);
  };

  const handlePrevFlashcard = () => {
    setFlipped(false);
    setFlashcardIndex((i) => (i - 1 + totalCards) % totalCards);
  };

  const handleMatchingSelect = (korean, soundOrEnglish) => {
    if (korean && !selectedKorean) {
      setSelectedKorean(korean);
      return;
    }
    if (soundOrEnglish !== undefined && selectedKorean) {
      setSelectedSound(soundOrEnglish);
      let correctMatch;
      if (isLesson1) {
        correctMatch = CONSONANTS.find((c) => c.korean === selectedKorean)?.sound;
      } else if (isPracticeWordsLesson) {
        correctMatch = PRACTICE_WORDS.find((w) => w.korean === selectedKorean)?.english;
      } else {
        correctMatch = VOWELS.find((v) => v.korean === selectedKorean)?.sound;
      }
      if (correctMatch === soundOrEnglish) {
        setMatchedPairs((p) => [...p, selectedKorean]);
      }
      setSelectedKorean(null);
      setSelectedSound(null);
    }
  };

  const handleQuizSubmit = () => {
    if (quizAnswered) return;
    setQuizAnswered(true);
    if (quizChoice === quizCorrectAnswer) setQuizScore((s) => s + 1);
  };

  const handleNextQuiz = () => {
    setQuizChoice(null);
    setQuizAnswered(false);
    setQuizIndex((i) => {
      const nextIndex = i + 1;
      if (nextIndex >= quizTotal) {
        setQuizComplete(true);
        return i; // stay on the last question; UI will switch to completion view
      }
      return nextIndex;
    });
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizChoice(null);
    setQuizScore(0);
    setQuizAnswered(false);
    setQuizComplete(false);
  };

  const resetMatching = () => {
    setMatchedPairs([]);
    setSelectedKorean(null);
    setSelectedSound(null);
  };

  const matchingTotal = isLesson1 ? CONSONANTS.length : isPracticeWordsLesson ? PRACTICE_WORDS.length : VOWELS.length;
  const matchingComplete = matchedPairs.length === matchingTotal;

  // Matching items for current lesson
  const matchingItems = isLesson1 ? CONSONANTS : isPracticeWordsLesson ? PRACTICE_WORDS : VOWELS;
  const matchingSounds = isLesson1 ? shuffledSounds : isPracticeWordsLesson ? shuffledPracticeWordEnglish : shuffledVowelSounds;

  return (
    <div className="korean-lecture1">
      <div className="lesson-selector">
        <button
          type="button"
          className={`lesson-tab ${lesson === 1 ? 'active' : ''}`}
          onClick={() => setLesson(1)}
        >
          Lesson 1
        </button>
        <button
          type="button"
          className={`lesson-tab ${lesson === 2 ? 'active' : ''}`}
          onClick={() => setLesson(2)}
        >
          Lesson 2
        </button>
        <button
          type="button"
          className={`lesson-tab ${lesson === 3 ? 'active' : ''}`}
          onClick={() => setLesson(3)}
        >
          Lesson 2 (Practice Words)
        </button>
      </div>
      <header className="lecture-header">
        <h1 className="lecture-title">
          {isLesson1 ? LECTURE1_TITLE : isPracticeWordsLesson ? 'Lesson 2 (Practice Words)' : LECTURE2_TITLE}
        </h1>
        <p className="lecture-subtitle">
          {isLesson1 ? CONSONANTS_LABEL : isPracticeWordsLesson ? 'Practice words with vowels' : VOWELS_LABEL}
        </p>
        {isLesson1 && showPrinciples && (
          <div className="principles">
            <button
              type="button"
              className="principles-toggle"
              onClick={() => setShowPrinciples(false)}
              aria-label="Hide principles"
            >
              ✕
            </button>
            {PRINCIPLES.map((p, i) => (
              <p key={i} className="principle">
                * {p}
              </p>
            ))}
          </div>
        )}
        {isLesson1 && !showPrinciples && (
          <button type="button" className="show-principles" onClick={() => setShowPrinciples(true)}>
            Show principles
          </button>
        )}
      </header>

      <nav className="mode-tabs">
        {Object.entries(MODES).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`tab ${mode === key ? 'active' : ''}`}
            onClick={() => {
              setMode(key);
              if (key === 'quiz') {
                resetQuiz();
              }
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="game-area">
        {mode === 'flashcards' && (
          <div className="flashcards">
            <div
              className={`flashcard ${flipped ? 'flipped' : ''}`}
              onClick={() => setFlipped((f) => !f)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
            >
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  <span className="flashcard-korean">{currentCard?.korean}</span>
                  <span className="flashcard-hint">
                    {isPracticeWordsLesson ? 'Tap to reveal meaning' : 'Tap to reveal sound'}
                  </span>
                </div>
                <div className="flashcard-back">
                  {isPracticeWordsLesson ? (
                    <>
                      <span className="flashcard-sound">{currentCard?.sound}</span>
                      <span className="flashcard-english">{currentCard?.english}</span>
                    </>
                  ) : (
                    <>
                      <span className="flashcard-sound">{currentCard?.sound}</span>
                      {currentCard?.special && (
                        <span className="flashcard-special">(initial position: placeholder for vowel)</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flashcard-nav">
              <button type="button" onClick={handlePrevFlashcard}>
                ← Prev
              </button>
              <span className="flashcard-counter">
                {flashcardIndex + 1} / {totalCards}
              </span>
              <button type="button" onClick={handleNextFlashcard}>
                Next →
              </button>
            </div>
          </div>
        )}

        {mode === 'matching' && (
          <div className="matching-game">
            <p className="matching-instruction">
              {isLesson1
                ? 'Click a consonant, then click its sound to make a pair.'
                : isPracticeWordsLesson
                  ? 'Click a word, then click its English meaning to make a pair.'
                  : 'Click a vowel, then click its sound to make a pair.'}
            </p>
            {matchingComplete ? (
              <div className="matching-complete">
                <p>You matched all {matchingTotal} {isLesson1 ? 'consonants' : isPracticeWordsLesson ? 'words' : 'items'}!</p>
                <button type="button" onClick={resetMatching}>
                  Play again
                </button>
              </div>
            ) : (
              <>
                <div className="matching-row">
                  <div className="matching-column">
                    <h3>{isLesson1 ? 'Consonant' : isPracticeWordsLesson ? 'Korean' : 'Vowel'}</h3>
                    {matchingItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`matching-item korean ${
                          selectedKorean === item.korean ? 'selected' : ''
                        } ${matchedPairs.includes(item.korean) ? 'matched' : ''}`}
                        onClick={() => !matchedPairs.includes(item.korean) && handleMatchingSelect(item.korean)}
                        disabled={matchedPairs.includes(item.korean)}
                      >
                        {item.korean}
                      </button>
                    ))}
                  </div>
                  <div className="matching-column">
                    <h3>{isPracticeWordsLesson ? 'English' : 'Sound'}</h3>
                    {matchingSounds.map((s, i) => (
                      <button
                        key={`${s}-${i}`}
                        type="button"
                        className={`matching-item sound ${
                          selectedSound === s ? 'selected' : ''
                        }`}
                        onClick={() => handleMatchingSelect(null, s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="matching-progress">
                  Matched: {matchedPairs.length} / {matchingTotal}
                </p>
                <button type="button" className="reset-matching" onClick={resetMatching}>
                  Reset
                </button>
              </>
            )}
          </div>
        )}

        {mode === 'quiz' && (
          <div className="quiz-game">
            {quizComplete ? (
              <div className="quiz-complete">
                <p className="quiz-complete-title">Quiz complete!</p>
                <p className="quiz-complete-score">
                  You scored {quizScore} out of {quizTotal}. ({((quizScore / quizTotal) * 100).toFixed(1)}%)
                </p>
                <button type="button" className="quiz-restart" onClick={resetQuiz}>
                  Take quiz again
                </button>
              </div>
            ) : (
              <>
                <p className="quiz-score">
                  Score: {quizScore} / {quizTotal}
                </p>
                <div className="quiz-card">
                  <p className="quiz-prompt">
                    {isLesson1
                      ? 'What sound does this consonant make?'
                      : isPracticeWordsLesson
                        ? 'What does this word mean?'
                        : 'What sound does this vowel make?'}
                  </p>
                  <p className="quiz-korean">{quizItem?.korean}</p>
                  <div className="quiz-options">
                    {quizOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`quiz-option ${
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
                      className="quiz-submit"
                      onClick={handleQuizSubmit}
                      disabled={quizChoice === null}
                    >
                      Check
                    </button>
                  ) : (
                    <button type="button" className="quiz-next" onClick={handleNextQuiz}>
                      Next →
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
