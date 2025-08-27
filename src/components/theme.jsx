'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={darkMode ? 'dark' : 'light'}>{children}</div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
