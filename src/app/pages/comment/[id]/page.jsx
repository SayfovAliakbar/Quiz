'use client'
import {
  useAddCommentMutation,
  useGetOptionsQuery,
} from '@/store/services/userApi'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import userImg from '../../../../shared/Без названия (1).png'
import { useTheme } from '@/components/theme'

const Comment = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetOptionsQuery()
  const [subject, setSubject] = useState(null)
  const [addComment] = useAddCommentMutation()
  const [inpAddComent, setInpAddComent] = useState('')
  const { darkMode } = useTheme()

  useEffect(() => {
    if (data) {
      // достаём все предметы
      const allSubjects = data[0]?.types?.flatMap(t => t.typeQuestion) || []
      const found = allSubjects.find(s => s.id === id)
      setSubject(found || null)
    }
  }, [id, data])

  async function addUserComent() {
    if (!inpAddComent.trim() || !subject) return

    const newComments = [...(subject.comment || []), inpAddComent]

    try {
      await addComment({ id: subject.id, comment: newComments }).unwrap()
      setSubject(prev => ({ ...prev, comment: newComments }))
      setInpAddComent('')
    } catch (err) {
      console.error('Ошибка добавления комментария:', err)
    }
  }

  if (isLoading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-blue-50 via-white to-violet-50'
        }`}
      >
        <p
          className={`text-center ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          } mt-4`}
        >
          Загрузка комментариев...
        </p>
      </div>
    )

  if (isError)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-blue-50 via-white to-violet-50'
        }`}
      >
        <p
          className={`text-center ${
            darkMode ? 'text-red-300' : 'text-red-500'
          } mt-4`}
        >
          Ошибка при загрузке комментариев
        </p>
      </div>
    )

  const formatDate = () => {
    const now = new Date()
    return now.toLocaleString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    })
  }

  return (
    <div
      className={`min-h-screen p-8 relative ${
        darkMode
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-blue-50 via-white to-violet-50'
      }`}
    >
      {!subject?.comment?.length ? (
        <p
          className={`text-center ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          } mt-4`}
        >
          Комментариев пока нет
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {subject.comment.map((com, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-4 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 ${
                darkMode
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <Image
                src={userImg}
                alt="user"
                width={50}
                height={50}
                className={`rounded-full border ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`font-semibold ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    User
                  </span>
                  <span
                    className={darkMode ? 'text-gray-400' : 'text-gray-500'}
                  >
                    · {formatDate()}
                  </span>
                </div>
                <p
                  className={`mt-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {com}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-8 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Написать комментарий..."
          value={inpAddComent}
          onChange={e => setInpAddComent(e.target.value)}
          className={`flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-800'
          }`}
        />
        <button
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          onClick={addUserComent}
          disabled={!inpAddComent.trim()}
        >
          Отправить
        </button>
      </div>
    </div>
  )
}

export default Comment
