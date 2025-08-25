'use client'

import React, { useState } from 'react'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Спасибо, ${name}! Мы получили ваше сообщение.`)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6">
      <h1 className="text-5xl font-bold mb-6">Свяжитесь с нами</h1>
      <p className="text-lg max-w-2xl text-center mb-8">
        Есть вопросы по платформе или предложения? Заполните форму ниже, и мы свяжемся с вами!
      </p>

      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            placeholder="Ваше сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={5}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded shadow transition"
          >
            Отправить сообщение
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-2">Или свяжитесь с нами напрямую:</p>
          <button
            onClick={() => alert("Телефон: 93-811-90-82")}
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded shadow transition"
          >
            Позвонить
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
