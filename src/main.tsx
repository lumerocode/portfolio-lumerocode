import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the automatically generated route tree
import { routeTree } from './routeTree.gen'

// Import global styles
import './styles/global.css'

// Create the router instance
const router = createRouter({ routeTree })

// Register the router for maximum type safety and auto-completion
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}