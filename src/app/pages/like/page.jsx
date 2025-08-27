'use client'
import { useTheme } from '@/components/theme'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Like = () => {
  let likedSubject = JSON.parse(localStorage.getItem('likedSubject')) || []
  let { darkMode } = useTheme()

  return (
    <main
      className={`min-h-screen p-8 ${
        darkMode
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-blue-50 via-white to-violet-50'
      }`}
    >
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-700 dark:text-blue-400">
        Избранные предметы
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {likedSubject.length > 0 ? (
          likedSubject.map(el => (
            <div
              key={el.id}
              className={`shadow-xl hover:shadow-2xl rounded-3xl p-8 text-center transition-all duration-300 hover:scale-[1.02] border border-gray-200 group ${
                darkMode
                  ? 'bg-gray-800 border-gray-600 text-gray-100'
                  : 'bg-white border-gray-200 text-gray-800'
              }`}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                  📚
                </div>

                <p className="text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {el.name}
                </p>

                <div className="flex justify-center gap-4 mt-6">
                  <Link
                    href={`/pages/questions/${el.id}`}
                    className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Начать
                  </Link>
                  <Link
                    href={`/pages/comment/${el.id}`}
                    className="flex items-center gap-2 px-4 py-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 font-medium rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Комментарии
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
            Нет избранных предметов ⭐
          </p>
        )}
      </section>
    </main>
  )
}

export default Like
