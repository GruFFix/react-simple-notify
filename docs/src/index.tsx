import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/App.tsx'

import '@/shared/styles/common.css'
import 'normalize.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
