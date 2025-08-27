'use client'
import { useGetOptionsQuery } from '@/store/services/userApi'
import Link from 'next/link'
import { MessageCircle, Moon, Sun } from 'lucide-react'
import React from 'react'
import { useTheme } from '../theme'

const Options = () => {
  let { data, isLoading, isError } = useGetOptionsQuery()
  let { darkMode, toggleTheme } = useTheme()

  if (isLoading) return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-violet-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='w-16 h-16 border-4 border-t-transparent border-blue-500 dark:border-blue-400 rounded-full animate-spin shadow-lg'></div>
      <h2 className='text-gray-800 dark:text-gray-100 mt-6 text-lg font-semibold tracking-wide animate-pulse'>
        Загрузка...
      </h2>
      <p className='text-gray-600 dark:text-gray-400 mt-2 text-sm'>
        ✨ Скоро начнём викторину ✨
      </p>
    </div>
  )

  if (isError) return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <p className='text-center text-red-500 dark:text-red-300 text-lg font-medium'>
        Ошибка при загрузке
      </p>
    </div>
  )

  return (
    <main className={`min-h-screen p-8 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-blue-50 via-white to-violet-50"}`}>

      <h1 className='text-4xl font-bold text-center mb-12 text-blue-700 dark:text-blue-400'>
        Выберите предмет викторины
      </h1>
      
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {data?.map(el => (
          <div 
            key={el.id} 
            className={`shadow-xl hover:shadow-2xl rounded-3xl p-8 text-center transition-all duration-300 hover:scale-[1.02] border border-gray-200  group ${darkMode ? "bg-gray-800 border-gray-600 text-gray-100" : "bg-white border-gray-200 text-gray-800"}`}
          >
            <div className='flex flex-col items-center gap-6'>
              <div className='text-6xl transform group-hover:scale-110 transition-transform duration-300'>
                📚
              </div>
              
              <p className='text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                {el.name}
              </p>
              
              <div className='flex justify-center gap-4 mt-6'>
                <Link 
                  href={`pages/questions/${el.id}`}
                  className='px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1'
                >
                  Начать
                </Link>
                <Link 
                  href={`pages/comment/${el.id}`}
                  className='flex items-center gap-2 px-4 py-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 font-medium rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700'
                >
                  <MessageCircle className='w-5 h-5' />
                  Комментарии
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className='absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl animate-pulse'></div>
      <div className='absolute bottom-20 right-10 w-40 h-40 bg-violet-200 dark:bg-violet-900 rounded-full opacity-20 blur-3xl animate-pulse delay-1000'></div>
    </main>
  )
}

export default Options