import './GroupPage.css'

export default function GroupPage({ group, onLessonClick, onBack }) {
  return (
    <div className="group-page">
      <nav className="breadcrumb">
        <button className="breadcrumb-back" onClick={onBack} type="button">
          ← Home
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{group.title}</span>
      </nav>

      <header className="group-header">
        <h1 className="group-page-title">{group.title}</h1>
        <p className="group-page-desc">{group.description}</p>
      </header>

      <div className="lessons-list">
        {group.lessons.map((lesson, idx) => (
          <button
            key={lesson.id}
            className="lesson-card"
            onClick={() => onLessonClick(lesson)}
            type="button"
            style={{ animationDelay: `${idx * 70}ms` }}
          >
            <div className="lesson-index">{idx + 1}</div>
            <div className="lesson-info">
              <h3 className="lesson-name">
                {lesson.title}<span className="lesson-sep">:</span> {lesson.subtitle}
              </h3>
              <p className="lesson-desc">{lesson.description}</p>
            </div>
            <div className="lesson-meta">
              <span className="lesson-count">{lesson.itemCount} items</span>
              <span className="lesson-arrow">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
