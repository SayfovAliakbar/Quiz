"use client"
import React from "react"
import { useTheme } from '../theme'
import { Heart, Mail, Github, Home, User, Instagram } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const { darkMode } = useTheme()

  return (
    <footer className={`border-t py-8 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-gray-300 border-gray-700' 
        : 'bg-white text-gray-600 border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className={`text-2xl font-bold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Quiz Time
            </div>
            <p className={`max-w-md text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Создано с любовью для обучения и развития
            </p>
          </div>

          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link
                  href="/"
                  className={`flex items-center gap-2 transition-colors hover:scale-105 ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/about"
                  className={`flex items-center gap-2 transition-colors hover:scale-105 ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/contact"
                  className={`flex items-center gap-2 transition-colors hover:scale-105 ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex gap-4">
            <Link
              href="https://github.com/SayfovAliakbar"
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'
              }`}
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.instagram.com/frontdev2009/"
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'
              }`}
              aria-label="Twitter"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href="https://t.me/Vjxing"
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'
              }`}
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className={`text-center border-t pt-6 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span>© {new Date().getFullYear()} Quiz Time</span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center gap-1">
              Сделано с <Heart className="w-4 h-4 fill-red-500 text-red-500" /> 
            </span>
          </div>
          <p className={`text-xs mt-2 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Все права защищены
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer