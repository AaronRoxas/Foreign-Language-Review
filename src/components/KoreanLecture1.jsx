import { useState, useMemo } from 'react';
import { CONSONANTS, PRINCIPLES, LECTURE_TITLE, CONSONANTS_LABEL } from '../data/lecture1Consonants';
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
  const [showPrinciples, setShowPrinciples] = useState(true);

  const shuffledConsonants = useMemo(() => shuffle(CONSONANTS), []);
  const shuffledSounds = useMemo(() => shuffle(CONSONANTS.map((c) => c.sound)), []);

  const currentCard = shuffledConsonants[flashcardIndex];
  const totalCards = CONSONANTS.length;

  const quizConsonant = shuffledConsonants[quizIndex];
  const quizOptions = useMemo(() => {
    if (!quizConsonant) return [];
    const wrong = CONSONANTS.filter((c) => c.sound !== quizConsonant.sound)
      .map((c) => c.sound)
      .filter((s, i, a) => a.indexOf(s) === i);
    const options = shuffle([quizConsonant.sound, ...shuffle(wrong).slice(0, 3)]);
    return shuffle(options);
  }, [quizIndex, quizConsonant]);

  const handleNextFlashcard = () => {
    setFlipped(false);
    setFlashcardIndex((i) => (i + 1) % totalCards);
  };

  const handlePrevFlashcard = () => {
    setFlipped(false);
    setFlashcardIndex((i) => (i - 1 + totalCards) % totalCards);
  };

  const handleMatchingSelect = (korean, sound) => {
    if (korean && !selectedKorean) {
      setSelectedKorean(korean);
      return;
    }
    if (sound !== undefined && selectedKorean) {
      setSelectedSound(sound);
      const correctSound = CONSONANTS.find((c) => c.korean === selectedKorean)?.sound;
      if (correctSound === sound) {
        setMatchedPairs((p) => [...p, selectedKorean]);
      }
      setSelectedKorean(null);
      setSelectedSound(null);
    }
  };

  const handleQuizSubmit = () => {
    if (quizAnswered) return;
    setQuizAnswered(true);
    if (quizChoice === quizConsonant?.sound) setQuizScore((s) => s + 1);
  };

  const handleNextQuiz = () => {
    setQuizChoice(null);
    setQuizAnswered(false);
    setQuizIndex((i) => (i + 1) % totalCards);
  };

  const resetMatching = () => {
    setMatchedPairs([]);
    setSelectedKorean(null);
    setSelectedSound(null);
  };

  const matchingComplete = matchedPairs.length === CONSONANTS.length;

  return (
    <div className="korean-lecture1">
      <header className="lecture-header">
        <h1 className="lecture-title">{LECTURE_TITLE}</h1>
        <p className="lecture-subtitle">{CONSONANTS_LABEL}</p>
        {showPrinciples && (
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
        {!showPrinciples && (
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
            onClick={() => setMode(key)}
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
                  <span className="flashcard-hint">Tap to reveal sound</span>
                </div>
                <div className="flashcard-back">
                  <span className="flashcard-sound">{currentCard?.sound}</span>
                  {currentCard?.special && (
                    <span className="flashcard-special">(initial position: placeholder for vowel)</span>
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
              Click a consonant, then click its sound to make a pair.
            </p>
            {matchingComplete ? (
              <div className="matching-complete">
                <p>You matched all 14 consonants!</p>
                <button type="button" onClick={resetMatching}>
                  Play again
                </button>
              </div>
            ) : (
              <>
                <div className="matching-row">
                  <div className="matching-column">
                    <h3>Consonant</h3>
                    {CONSONANTS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className={`matching-item korean ${
                          selectedKorean === c.korean ? 'selected' : ''
                        } ${matchedPairs.includes(c.korean) ? 'matched' : ''}`}
                        onClick={() => !matchedPairs.includes(c.korean) && handleMatchingSelect(c.korean)}
                        disabled={matchedPairs.includes(c.korean)}
                      >
                        {c.korean}
                      </button>
                    ))}
                  </div>
                  <div className="matching-column">
                    <h3>Sound</h3>
                    {shuffledSounds.map((s, i) => (
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
                  Matched: {matchedPairs.length} / {CONSONANTS.length}
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
            <p className="quiz-score">
              Score: {quizScore} (after this card)
            </p>
            <div className="quiz-card">
              <p className="quiz-prompt">What sound does this consonant make?</p>
              <p className="quiz-korean">{quizConsonant?.korean}</p>
              <div className="quiz-options">
                {quizOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`quiz-option ${
                      quizAnswered
                        ? opt === quizConsonant?.sound
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
          </div>
        )}
      </main>
    </div>
  );
}
