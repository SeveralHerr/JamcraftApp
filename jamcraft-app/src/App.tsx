//import '@mantine/core/styles.css';

import { AppShell, MantineProvider } from '@mantine/core';
import './App.css'
import { AppHeader } from './components/AppHeader';
import { Home } from './components/Home';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/core/styles.css';

function App() {
  return (
    <BrowserRouter>
      <MantineProvider 
        defaultColorScheme='dark'
        theme={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          headings: {
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }
        }}
      >
        <AppShell
          header={{ height: 60 }}
          withBorder={false}
          padding="sm"
          styles={{
            root: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

              justifyContent: 'center',
            },
            main: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
             
              justifyContent: 'center',
            },
            header: {
              display: 'flex',
              justifyContent: 'center',
    
              alignItems: 'center',
            }
          }}
        >
          <AppShell.Header>
            <AppHeader />
          </AppShell.Header>
          <AppShell.Main>
            <Home/>
          </AppShell.Main>
          <AppShell.Footer>
          </AppShell.Footer>
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

export default App
