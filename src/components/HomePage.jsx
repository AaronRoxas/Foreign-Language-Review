import './HomePage.css'

export default function HomePage({ groups, onGroupClick }) {
  return (
    <div className="home">
      <header className="home-header">
        <div className="home-logo" aria-hidden="true">Foreign Language</div>
        <h1 className="home-title">Korean Review</h1>
        <p className="home-subtitle">Master hangul at your own pace</p>
      </header>

      <div className="home-divider">
        <span>Study Groups</span>
      </div>

      <div className="groups-list">
        {groups.map((group, idx) => (
          <button
            key={group.id}
            className={`group-card ${group.comingSoon ? 'disabled' : ''}`}
            onClick={() => onGroupClick(group.id)}
            disabled={group.comingSoon}
            style={{ animationDelay: `${100 + idx * 80}ms` }}
          >
            {!group.comingSoon && <div className="group-accent" />}
            <div className="group-body">
              <div className="group-top">
                <h2 className="group-name">{group.title}</h2>
                {group.comingSoon ? (
                  <span className="group-badge soon">Coming soon</span>
                ) : (
                  <span className="group-badge ready">
                    {group.lessons.length} {group.lessons.length === 1 ? 'lesson' : 'lessons'}
                  </span>
                )}
              </div>
              <p className="group-desc">{group.description}</p>
            </div>
            {!group.comingSoon && <span className="group-arrow">→</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
