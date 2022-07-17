import { App } from 'app';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Take Container
const container = document.getElementById('root');
// Create Root
const root = createRoot(container as HTMLElement);
// Render React App
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
