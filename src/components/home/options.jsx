'use client'
import { useGetOptionsQuery, useGetUserInfoQuery } from '@/store/services/userApi'
import Link from 'next/link'
import { MessageCircle, Star, BookOpen, ChevronRight, Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../theme'

const Options = () => {
  const { data, isLoading } = useGetOptionsQuery()
  const { darkMode } = useTheme()

  const [likedSubjects, setLikedSubjects] = useState([])
  let { data: userInfo } = useGetUserInfoQuery()
  let userInLocal = localStorage.getItem("user")

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('likedSubject')) || []
    setLikedSubjects(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('likedSubject', JSON.stringify(likedSubjects))
  }, [likedSubjects])

  function toggleLiked(q) {
    if (likedSubjects.find(item => item.id === q.id)) {
      setLikedSubjects(likedSubjects.filter(item => item.id !== q.id))
    } else {
      setLikedSubjects([...likedSubjects, q])
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-400 mb-4"></div>
        <p className="text-lg font-medium text-slate-700 dark:text-slate-300">Загрузка материалов...</p>
      </div>
    )
  }

  return (
    <main className={`min-h-screen p-4 md:p-8 relative transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Доступные предметы</h1>
      </div>

      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data?.[0]?.types?.map(type => (
          <div
            key={type.typeId}
            className={`rounded-xl p-6 transition-all duration-300 group ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200 shadow-sm'}`}
          >
            <div className="flex items-center mb-6">
              <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                <BookOpen size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
              </div>
              <h2 className="text-xl font-semibold">
                {type.typeName}
              </h2>
            </div>

            <div className="space-y-4">
              {type.typeQuestion.map(q => {
                const isLiked = likedSubjects.find(item => item.id === q.id);
                return (
                  <div
                    key={q.id}
                    className={`rounded-lg p-5 transition-all duration-300 ${darkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-50 hover:bg-slate-100'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-md mr-3 ${darkMode ? 'bg-slate-600' : 'bg-white shadow-xs'}`}>
                          <BookOpen size={16} className={darkMode ? 'text-slate-300' : 'text-slate-600'} />
                        </div>
                        <p className="font-medium text-lg">{q.name}</p>
                      </div>
                      
                      <button 
                        onClick={() => userInLocal ? toggleLiked(q) : alert("Ты не зарегистрирован")}
                        className={`p-1.5 rounded-full transition-colors ${isLiked 
                          ? 'bg-amber-100 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400' 
                          : 'bg-slate-100 text-slate-400 hover:text-amber-500 dark:bg-slate-600 dark:text-slate-400 dark:hover:text-amber-400'}`}
                        aria-label={isLiked ? "Удалить из избранного" : "Добавить в избранное"}
                      >
                        <Star size={18} fill={isLiked ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <Link
                        href={`/pages/comment/${q.id}`}
                        className="flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                      >
                        <MessageCircle size={16} className="mr-1.5" />
                        Комментарии
                      </Link>
                      
                      <Link
                        href={`/pages/questions/${q.id}`}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-300 font-medium text-sm"
                      >
                        Начать
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default Options