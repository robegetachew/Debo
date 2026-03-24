import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import SaveTheDate from './components/SaveTheDate';
import StoryCountdown from './components/StoryCountdown';
import VenueDetails from './components/VenueDetails';
import Program from './components/Program';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import Decoration from './components/Decoration';
import ScrollReveal from './components/ScrollReveal';
import Admin from './pages/Admin';
import './styles/globals.css';

const Invitation = () => (
  <>
    <Decoration />
    <ScrollReveal><Hero /></ScrollReveal>
    <ScrollReveal><SaveTheDate /></ScrollReveal>
    <ScrollReveal><StoryCountdown targetDate="2026-05-03T00:00:00" /></ScrollReveal>
    <ScrollReveal><VenueDetails /></ScrollReveal>
    <ScrollReveal><Program /></ScrollReveal>
    <ScrollReveal><RSVP /></ScrollReveal>
    <Footer />
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
