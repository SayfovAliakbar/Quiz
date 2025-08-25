'use client'
import { useGetOptionsQuery } from '@/store/services/userApi'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const Info = () => {
  const { id } = useParams()
  const { data: subjects, isLoading, isError } = useGetOptionsQuery()
  const [selected, setSelected] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [subject, setSubject] = useState(null)

  useEffect(() => {
    if (subjects) {
      const found = subjects.find((s) => s.id === id)
      setSubject(found)
    }
  }, [id, subjects])

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>Ошибка при загрузке</p>
  if (!subject) return <p>Предмет не найден</p>

  const handleSelect = (qId, option) => {
    setSelected((prev) => ({ ...prev, [qId]: option }))
  }

  const checkResult = () => setShowResult(true)

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">{subject.name}</h1>

      <div className="w-full max-w-2xl space-y-6">
        {subject.questions.map((q, idx) => (
          <div key={q.id} className="bg-white p-4 rounded-xl shadow-md">
            <p className="font-semibold mb-3">
              {idx + 1}. {q.question}
            </p>
            <div className="flex flex-col gap-2">
              {q.option.map((opt) => {
                const isSelected = selected[q.id] === opt
                const isCorrect = showResult && q.answer === opt
                const isWrong = showResult && isSelected && q.answer !== opt

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(q.id, opt)}
                    className={`
                      text-left px-4 py-2 rounded-lg border
                      ${isSelected ? 'border-indigo-600 bg-indigo-100' : 'border-gray-300'}
                      ${isCorrect ? 'bg-green-200 border-green-600' : ''}
                      ${isWrong ? 'bg-red-200 border-red-600' : ''}
                      transition
                    `}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {!showResult ? (
          <button
            onClick={checkResult}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Проверить результат
          </button>
        ) : (
          <p className="mt-4 text-xl font-bold">
            Вы правильно ответили{' '}
            {subject.questions.filter((q) => selected[q.id] === q.answer).length} из{' '}
            {subject.questions.length}
          </p>
        )}
      </div>
    </main>
  )
}

export default Info
