"use client"

import { createContext, StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Add Tailwind CSS CDN
const tailwindCDN = document.createElement("script")
tailwindCDN.src = "https://cdn.tailwindcss.com"
document.head.appendChild(tailwindCDN)

// Add Recharts CDN
const rechartsCDN = document.createElement("script")
rechartsCDN.src = "https://unpkg.com/recharts/umd/Recharts.min.js"
document.head.appendChild(rechartsCDN)

// Add custom Tailwind config
const tailwindConfig = document.createElement("script")
tailwindConfig.textContent = `
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#082f49',
          },
          secondary: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
            950: '#042f2e',
          },
          accent: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
            950: '#022c22',
          },
          chart: {
            1: 'var(--chart-1, #f97316)',
            2: 'var(--chart-2, #14b8a6)',
            3: 'var(--chart-3, #8b5cf6)',
            4: 'var(--chart-4, #f43f5e)',
            5: 'var(--chart-5, #eab308)',
          }
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        boxShadow: {
          card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  }
`
document.head.appendChild(tailwindConfig)

// Add Inter font
const fontLink = document.createElement("link")
fontLink.rel = "stylesheet"
fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
document.head.appendChild(fontLink)

// Add CSS variables for chart colors
const chartStyles = document.createElement("style")
chartStyles.textContent = `
  :root {
    --chart-1: 12, 76%, 61%;
    --chart-2: 173, 58%, 39%;
    --chart-3: 197, 37%, 24%;
    --chart-4: 43, 74%, 66%;
    --chart-5: 27, 87%, 67%;
  }
`
document.head.appendChild(chartStyles)

export const Context = createContext({ isAuthenticated: true })

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(false)
  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <App />
      <ToastContainer position="top-center" autoClose={3000} />
    </Context.Provider>
  )
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)