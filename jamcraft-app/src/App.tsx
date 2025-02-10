//import '@mantine/core/styles.css';
import "@mantine/core/styles.css";
import {
  AppShell,
  MantineProvider,
  Group,
  Burger,
  Image,
  UnstyledButton,
} from "@mantine/core";
import "./App.css";
import classes from "./App.module.css";
import { Home } from "./components/Home";
import { About } from "./components/About";
import {
  BrowserRouter,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { ROUTES } from "./config/routes";
import { NavButton } from "./components/NavButton";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
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
              ></Burger>
              <Group justify="space-between" style={{ flex: 1 }}>
                <RouterLink to={ROUTES.home}>
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
                  <NavButton to={ROUTES.games}>Games</NavButton>
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
            <NavButton to={ROUTES.games} onClose={toggle}>
              Games
            </NavButton>
          </AppShell.Navbar>

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/games" />
            </Routes>
          </AppShell.Main>

          <AppShell.Footer></AppShell.Footer>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  );
}
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App;
