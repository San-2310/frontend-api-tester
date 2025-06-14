"use client"

import { useState } from "react"
import { AuthProvider } from "./context/AuthContext"
import { AppStateProvider } from "./context/AppStateContext"
import { ThemeProvider } from "./context/ThemeContext"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MainTool from "./pages/MainTool"
import ViewLogs from "./pages/ViewLogs"
import Settings from "./pages/Settings"
import "./assets/styles/glassmorphic.css"

function App() {
  const [currentPage, setCurrentPage] = useState("home")

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={setCurrentPage} />
      case "login":
        return <Login onNavigate={setCurrentPage} />
      case "signup":
        return <Signup onNavigate={setCurrentPage} />
      case "tool":
        return <MainTool onNavigate={setCurrentPage} />
      case "logs":
        return <ViewLogs onNavigate={setCurrentPage} />
      case "settings":
        return <Settings onNavigate={setCurrentPage} />
      default:
        return <Home onNavigate={setCurrentPage} />
    }
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppStateProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {renderPage()}
          </div>
        </AppStateProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
