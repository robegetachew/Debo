import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Hero from './components/Hero';
import SaveTheDate from './components/SaveTheDate';
import StoryCountdown from './components/StoryCountdown';
import Gallery from './components/Gallery';
import Program from './components/Program';
import VenueDetails from './components/VenueDetails';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import ScrollEffects from './components/ScrollEffects';
import LanguageSwitcher from './components/LanguageSwitcher';
import ExplorePage from './components/ExplorePage';
import Admin from './pages/Admin';
import './styles/globals.css';

const Invitation = () => (
  <>
    <ScrollEffects />
    <LanguageSwitcher />
    <ScrollReveal><Hero /></ScrollReveal>
    <ScrollReveal><SaveTheDate /></ScrollReveal>
    <ScrollReveal><StoryCountdown /></ScrollReveal>
    <ScrollReveal><Program /></ScrollReveal>
    <ScrollReveal><VenueDetails /></ScrollReveal>
    <ScrollReveal><Gallery /></ScrollReveal>
    <ScrollReveal><RSVP /></ScrollReveal>
    <ScrollReveal amount={0.2}><Footer /></ScrollReveal>
  </>
);

function App() {
  const [showExplore, setShowExplore] = useState(true)

  const handleExplore = () => {
    setShowExplore(false)
  }

  return (
    <Router>
      {showExplore && <ExplorePage onExplore={handleExplore} />}
      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
