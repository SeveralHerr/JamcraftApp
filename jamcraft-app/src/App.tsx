import "@mantine/core/styles.css";
import { AppShell, MantineProvider, Group, Burger, Image } from "@mantine/core";
import "./App.css";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { BlogList } from "./blog/BlogList";
import { BlogPost } from "./blog/BlogPost";
import { Testimonials } from "./components/Testimonials";
import { NotFound } from "./components/NotFound";
import {
  BrowserRouter,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { ROUTES } from "./config/routes";
import { NavButton } from "./components/NavButton";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MantineProvider
          defaultColorScheme="dark"
          theme={{
            fontFamily:
              'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            headings: {
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            },
          }}
        >
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { desktop: true, mobile: !opened },
          }}
          padding="md"
          withBorder={false}
        >
          <AppShell.Header
            style={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(8, 27, 41, 0.8)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <Group h="100%" px="lg">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                h={45}
                aria-label="Toggle navigation"
                className="focus-ring"
              />
              <Group justify="space-between" style={{ flex: 1 }}>
                <RouterLink
                  to={ROUTES.home}
                  aria-label="Go to homepage"
                  className="focus-ring"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Image
                    src="/assets/logo_server_icon_small_transparent_no_bkg.png"
                    alt="Jamcraft Logo"
                    h={48}
                    w="auto"
                    fit="contain"
                  />
                </RouterLink>
                <Group ml="xl" gap={0} visibleFrom="sm">
                  <NavButton to={ROUTES.home}>Home</NavButton>
                  <NavButton to={ROUTES.projects}>Projects</NavButton>
                  <NavButton to={ROUTES.blog}>Blog</NavButton>
                  <NavButton to={ROUTES.testimonials}>Testimonials</NavButton>
                  <NavButton to={ROUTES.about}>About</NavButton>
                </Group>
              </Group>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar py="md" px={4}>
            <NavButton to={ROUTES.home} onClose={toggle}>
              Home
            </NavButton>
            <NavButton to={ROUTES.projects} onClose={toggle}>
              Projects
            </NavButton>
            <NavButton to={ROUTES.blog} onClose={toggle}>
              Blog
            </NavButton>
            <NavButton to={ROUTES.testimonials} onClose={toggle}>
              Testimonials
            </NavButton>
            <NavButton to={ROUTES.about} onClose={toggle}>
              About
            </NavButton>
          </AppShell.Navbar>

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
        </MantineProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
