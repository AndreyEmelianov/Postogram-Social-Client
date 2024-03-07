import React from "react"
import { Provider } from "react-redux"
import { createRoot } from "react-dom/client"
import { NextUIProvider } from "@nextui-org/react"
import { createBrowserRouter } from "react-router-dom"

import App from "./App"
import { store } from "./app/store"

import "./index.css"

const container = document.getElementById("root")
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <h1>auth</h1>,
  },
  {
    path: "/",
    element: <h1>home</h1>,
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
