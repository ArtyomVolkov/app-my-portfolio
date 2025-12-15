import React from 'react';

import { createRoot } from 'react-dom/client';

import App from '@components/app';

navigator.serviceWorker?.register('/service-worker.js');
navigator.serviceWorker?.ready.then(() => {
  console.log('Service Worker is ready!');
});

createRoot(document.getElementById('my-portfolio-app')).render(<App />);
