import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import BackgroundMusic from './components/BackgroundMusic';
import Admin from './pages/Admin';
import './styles/globals.css';

const Invitation = () => (
  <>
    <BackgroundMusic />
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
