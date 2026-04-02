import { useState } from 'react'
import HomePage from './components/HomePage'
import GroupPage from './components/GroupPage'
import LessonReview from './components/LessonReview'
import { GROUPS } from './data/courseStructure'
import './App.css'

function App() {
  const [view, setView] = useState('home')
  const [activeGroup, setActiveGroup] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [leaving, setLeaving] = useState(false)

  const navigate = (newView, group = null, lesson = null) => {
    setLeaving(true)
    setTimeout(() => {
      setView(newView)
      setActiveGroup(group)
      setActiveLesson(lesson)
      setLeaving(false)
      window.scrollTo({ top: 0 })
    }, 180)
  }

  const openGroup = (groupId) => {
    const group = GROUPS.find(g => g.id === groupId)
    if (group && !group.comingSoon) navigate('group', group)
  }

  const openLesson = (lesson) => navigate('lesson', activeGroup, lesson)
  const goHome = () => navigate('home')
  const goToGroup = () => navigate('group', activeGroup)

  return (
    <div className="app">
      <div className={`app-view ${leaving ? 'leaving' : ''}`}>
        {view === 'home' && (
          <HomePage groups={GROUPS} onGroupClick={openGroup} />
        )}
        {view === 'group' && activeGroup && (
          <GroupPage
            group={activeGroup}
            onLessonClick={openLesson}
            onBack={goHome}
          />
        )}
        {view === 'lesson' && activeLesson && (
          <LessonReview
            lesson={activeLesson}
            groupTitle={activeGroup?.title}
            onBack={goToGroup}
          />
        )}
      </div>
    </div>
  )
}

export default App
