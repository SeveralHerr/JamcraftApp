import "@mantine/core/styles.css";
import { AppShell, MantineProvider, Group, Burger, Image } from "@mantine/core";
import "./App.css";
import { Home } from "./components/Home";
import { About } from "./components/About";
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
          header={{ height: 40 }}
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { desktop: true, mobile: !opened },
          }}
          padding="md"
          withBorder={false}
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                h={45}
                aria-label="Toggle navigation"
              ></Burger>
              <Group justify="space-between" style={{ flex: 1 }}>
                <RouterLink to={ROUTES.home} aria-label="Go to homepage">
                  <Image
                    src="/assets/logo_server_icon_small_transparent_no_bkg.png"
                    alt="Jamcraft Logo"
                    h={40}
                    mt={5}
                    w="auto"
                    fit="contain"
                    style={{
                      marginLeft: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  />
                </RouterLink>
                <Group ml="xl" gap={0} visibleFrom="sm">
                  <NavButton to={ROUTES.home}>Home</NavButton>
                  <NavButton to={ROUTES.about}>About</NavButton>
                </Group>
              </Group>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar py="md" px={4}>
            <NavButton to={ROUTES.home} onClose={toggle}>
              Home
            </NavButton>
            <NavButton to={ROUTES.about} onClose={toggle}>
              About
            </NavButton>
          </AppShell.Navbar>

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<Home />} />
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
