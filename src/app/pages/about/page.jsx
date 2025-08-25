"use client"
import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white p-6">
      <h1 className="text-5xl font-bold mb-4">О нашем проекте</h1>
      <p className="text-lg max-w-3xl text-center mb-6">
        Добро пожаловать на нашу образовательную платформу! Здесь вы можете проходить викторины по различным предметам:
        Математика, География, История, Физика, Химия, Биология, Информатика, Английский язык и многое другое. 
        Каждый предмет разделён на три уровня сложности — лёгкий, средний и сложный, чтобы вы могли постепенно повышать свои знания.
      </p>
      <p className="text-lg max-w-3xl text-center mb-6">
        Мы стараемся сделать обучение интересным и интерактивным. Вы можете тестировать свои знания, получать комментарии к вопросам и отслеживать прогресс.
        Наша миссия — помочь каждому ученику легко и с удовольствием изучать новые темы и подготовиться к экзаменам.
      </p>
      <div className="flex space-x-4">
        <Link href={'/'} className="bg-white text-purple-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-100 transition">
          Начать обучение
        </Link>
        <Link href={'/pages/contact'} className="bg-purple-700 hover:bg-purple-800 font-semibold py-2 px-4 rounded shadow transition">
          Связаться с нами
        </Link>
      </div>
    </div>
  )
}

export default About
