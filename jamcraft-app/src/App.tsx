import "@mantine/core/styles.css";
import { AppShell, MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import "./App.css";
import { mantineTheme } from "./theme";
import { SECTIONS, resolveLegacyPath } from "./config/sections";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/layout/Header";
import { NavAnchor } from "./components/layout/NavAnchor";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./portfolio/HeroSection";
import { ProjectsSection } from "./portfolio-projects/ProjectsSection";
import { PodcastsSection } from "./podcasts/PodcastsSection";

/** Redirect legacy multi-page URLs (e.g. /projects) to their section anchors. */
function useLegacyPathRedirect() {
  useEffect(() => {
    const target = resolveLegacyPath(window.location.pathname);
    if (target) {
      window.history.replaceState(null, "", `/#${target}`);
      document.getElementById(target)?.scrollIntoView();
    }
  }, []);
}

function App() {
  const [navOpened, { toggle, close }] = useDisclosure();
  useLegacyPathRedirect();

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

          <AppShell.Navbar py="md" px={4}>
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

          <AppShell.Main style={{ padding: 0, paddingTop: 60 }}>
            <HeroSection />
            <ProjectsSection />
            <PodcastsSection />
            <Footer />
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </ErrorBoundary>
  );
}

export default App;
