import "@mantine/core/styles.css";
import { AppShell, MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import "./App.css";
import { mantineTheme } from "./theme";
import { SECTIONS, resolveLegacyPath, resolveSectionFromHash } from "./config/sections";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header, MAIN_CONTENT_ID, MOBILE_NAV_ID } from "./components/layout/Header";
import { NavAnchor } from "./components/layout/NavAnchor";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./portfolio/HeroSection";
import { ProjectsSection } from "./portfolio-projects/ProjectsSection";
import { PodcastsSection } from "./podcasts/PodcastsSection";
import { WorkshopsSection } from "./workshops/WorkshopsSection";
import { SpeakingSection } from "./speaking/SpeakingSection";

/**
 * Land on the right section on first load: legacy multi-page URLs
 * (e.g. /projects) redirect to their anchor, and deep links (/#podcasts)
 * scroll to their section once it has rendered.
 */
function useInitialSectionScroll() {
  useEffect(() => {
    const legacyTarget = resolveLegacyPath(window.location.pathname);
    if (legacyTarget) {
      window.history.replaceState(null, "", `/#${legacyTarget}`);
    }
    const target = legacyTarget ?? resolveSectionFromHash(window.location.hash);
    if (!target) return;

    // Section data renders on the first commit and images reserve their space,
    // so one frame later the target's offset is final.
    const frame = requestAnimationFrame(() =>
      document.getElementById(target)?.scrollIntoView({ behavior: "instant" }),
    );
    return () => cancelAnimationFrame(frame);
  }, []);
}

function App() {
  const [navOpened, { toggle, close }] = useDisclosure();
  useInitialSectionScroll();

  return (
    <ErrorBoundary>
      <MantineProvider defaultColorScheme="dark" theme={mantineTheme}>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { desktop: true, mobile: !navOpened },
          }}
          withBorder={false}
        >
          <Header navOpened={navOpened} onToggleNav={toggle} />

          <AppShell.Navbar id={MOBILE_NAV_ID} aria-label="Sections" py="md" px={4}>
            {SECTIONS.map((section) => (
              <NavAnchor
                key={section.id}
                href={`#${section.id}`}
                onClick={close}
              >
                {section.label}
              </NavAnchor>
            ))}
          </AppShell.Navbar>

          <AppShell.Main id={MAIN_CONTENT_ID} tabIndex={-1} style={{ padding: 0, paddingTop: 60, outline: "none" }}>
            <HeroSection />
            <ProjectsSection />
            <PodcastsSection />
            <WorkshopsSection />
            <SpeakingSection />
            <Footer />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </ErrorBoundary>
  );
}

export default App;
