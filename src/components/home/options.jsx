'use client'
import { useGetOptionsQuery } from '@/store/services/userApi'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react' // новая иконка 💬
import React from 'react'

const Options = () => {
  let { data, isLoading, isError } = useGetOptionsQuery()

  if (isLoading)
    return (
      <div className='fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-white to-purple-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900'>
        <div className='w-16 h-16 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin shadow-lg'></div>

        <h2 className='text-zinc-900 dark:text-white mt-6 text-lg font-semibold tracking-wide animate-pulse'>
          Загрузка...
        </h2>

        <p className='text-zinc-600 dark:text-zinc-400 mt-2 text-sm'>
          ✨ Скоро начнём викторину ✨
        </p>
      </div>
    )

  if (isError)
    return <p className='text-center text-red-500 mt-10'>Ошибка при загрузке</p>

  return (
    <main className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8'>
      <h1 className='text-3xl font-extrabold text-center mb-10 text-indigo-700 drop-shadow-sm'>
        Выберите предмет викторины
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {data?.map(el => (
          <section
            key={el.id}
            className='bg-white shadow-lg hover:shadow-2xl rounded-2xl p-6 text-center transition-all hover:scale-[1.03] border border-gray-100'
          >
            <div className='flex flex-col items-center gap-4'>
              <span className='text-5xl'>📘</span>
              <p className='text-xl font-semibold text-gray-800'>{el.name}</p>

              <div className='flex justify-center gap-4 mt-4'>
                <Link
                  href={`pages/questions/${el.id}`}
                  className='px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium shadow-md'
                >
                  Начать
                </Link>

                <Link
                  href={`pages/comment/${el.id}`}
                  className='flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition font-medium'
                >
                  <MessageCircle className='w-5 h-5' />
                  Комментарии
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

export default Options
