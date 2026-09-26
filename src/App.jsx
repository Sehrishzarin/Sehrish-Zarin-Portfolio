import React from 'react'
import CustomCursor from './components/CustomCursor/CustomCursor'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import WorkSection from './components/Work/WorkSection'
import ExperienceSection from './components/Experience/ExperienceSection'
import Capabilities from './components/Capabilities/Capabilities'
import Contact from './components/Contact/Contact'

function App() {
  return (
    <main className="portfolio-app">
      <CustomCursor />
      <Hero />
      <About />
      <WorkSection />
      <ExperienceSection />
      <Capabilities />
      <Contact />
    </main>
  )
}

export default App
