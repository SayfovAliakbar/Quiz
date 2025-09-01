'use client'
import { useGetOptionsQuery } from '@/store/services/userApi'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTheme } from '@/components/theme'

const Info = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetOptionsQuery()
  const [selected, setSelected] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [subject, setSubject] = useState(null)
  const [activeLevel, setActiveLevel] = useState('levelOne')
  const { darkMode } = useTheme()

  useEffect(() => {
    if (data) {
      // ищем предмет внутри typeQuestion
      const allSubjects = data[0]?.types?.flatMap(t => t.typeQuestion) || []
      const found = allSubjects.find(s => s.id === id)
      setSubject(found || null)
    }
  }, [id, data])

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
          Загрузка...
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
          Ошибка при загрузке
        </p>
      </div>
    )

  if (!subject)
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
          Предмет не найден
        </p>
      </div>
    )

  const levels = subject.levels?.[0] || {}

  const handleSelect = (level, qId, option) => {
    setSelected(prev => ({ ...prev, [`${level}-${qId}`]: option }))
  }

  const checkResult = () => setShowResult(true)

  const getCurrentLevelQuestions = () => levels[activeLevel] || []

  return (
    <main
      className={`min-h-screen p-6 relative ${
        darkMode
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-blue-50 via-white to-violet-50'
      }`}
    >
      <h1
        className={`text-4xl font-bold text-center mb-6 ${
          darkMode ? 'text-blue-400' : 'text-blue-700'
        }`}
      >
        {subject.name}
      </h1>

      {/* переключатель уровней */}
      <div className="flex gap-4 mb-6 justify-center">
        {['levelOne', 'levelTwo', 'levelThree'].map(level => (
          <button
            key={level}
            onClick={() => {
              setActiveLevel(level)
              setShowResult(false)
              setSelected({})
            }}
            className={`px-4 py-2 rounded-lg ${
              activeLevel === level
                ? 'bg-indigo-600 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {level === 'levelOne' && 'Уровень 1'}
            {level === 'levelTwo' && 'Уровень 2'}
            {level === 'levelThree' && 'Уровень 3'}
          </button>
        ))}
      </div>

      {/* вопросы */}
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {getCurrentLevelQuestions().map((q, idx) => {
          const uniqueId = `${activeLevel}-${q.id}`
          const chosen = selected[uniqueId]
          const isCorrect = showResult && chosen === q.answer
          const isWrong = showResult && chosen && chosen !== q.answer

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl shadow-md border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <p
                className={`font-semibold mb-3 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                {idx + 1}. {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.option.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(activeLevel, q.id, opt)}
                    disabled={showResult}
                    className={`
                      text-left px-4 py-2 rounded-lg border transition
                      ${
                        chosen === opt
                          ? darkMode
                            ? 'border-indigo-500 bg-indigo-900 text-white'
                            : 'border-indigo-600 bg-indigo-100 text-indigo-800'
                          : darkMode
                          ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-100'
                      }
                      ${
                        isCorrect && q.answer === opt
                          ? darkMode
                            ? 'bg-green-900 border-green-500 text-white'
                            : 'bg-green-100 border-green-600 text-green-800'
                          : ''
                      }
                      ${
                        isWrong && chosen === opt
                          ? darkMode
                            ? 'bg-red-900 border-red-500 text-white'
                            : 'bg-red-100 border-red-600 text-red-800'
                          : ''
                      }
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )
        })}

        {!showResult ? (
          <button
            onClick={checkResult}
            className="mt-6 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
          >
            Проверить результат
          </button>
        ) : (
          <p
            className={`mt-6 text-xl font-bold text-center ${
              darkMode ? 'text-blue-400' : 'text-blue-700'
            }`}
          >
            Вы правильно ответили на{' '}
            {
              getCurrentLevelQuestions().filter(
                q => selected[`${activeLevel}-${q.id}`] === q.answer
              ).length
            }{' '}
            из {getCurrentLevelQuestions().length}
          </p>
        )}
      </div>

      {/* декоративные круги */}
      <div
        className={`absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 blur-3xl animate-pulse ${
          darkMode ? 'bg-blue-900' : 'bg-blue-200'
        }`}
      />
      <div
        className={`absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-20 blur-3xl animate-pulse delay-1000 ${
          darkMode ? 'bg-violet-900' : 'bg-violet-200'
        }`}
      />
    </main>
  )
}

export default Info
