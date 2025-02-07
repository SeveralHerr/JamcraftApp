import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

// Import styles for Mantine
import "@mantine/core/styles.css";

import { AppShell, MantineProvider } from "@mantine/core";
import { AppHeader } from "./components/AppHeader";

const root = createRoot(document.getElementById("app")!);

root.render(
  <StrictMode>
    <MantineProvider>
      <AppShell
        header={{ height: 60 }}
      >
        <AppShell.Header>
          <AppHeader />
        </AppShell.Header>
        <AppShell.Main>
          Hello
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  </StrictMode>
);
