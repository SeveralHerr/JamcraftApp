import { useCallback } from 'react';
import { useScrollSpy } from './hooks/useScrollSpy';
import { SiteNav } from './navigation/ui/components/SiteNav';
import { HeroSection } from './hero/ui/components/HeroSection';
import { SpeakingSection } from './speaking/ui/components/SpeakingSection';
import { GamesSection } from './games/ui/components/GamesSection';
import { ContactSection } from './contact/ui/components/ContactSection';
import { Footer } from './components/Footer';
import './App.css';

const SECTION_IDS = ['home', 'speaking', 'games', 'contact'];

export default function App() {
  const activeSection = useScrollSpy(SECTION_IDS);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SiteNav activeSection={activeSection} onNavClick={scrollTo} />
      <main>
        <HeroSection onScrollTo={scrollTo} />
        <SpeakingSection />
        <GamesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
