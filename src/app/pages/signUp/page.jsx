'use client'
import { useTheme } from '@/components/theme'
import {
  useAddUserInfoMutation,
  useGetUserInfoQuery,
} from '@/store/services/userApi'
import Link from 'next/link'
import React, { useState } from 'react'

const SignUp = () => {
  let { data: userInfo } = useGetUserInfoQuery()

  const { darkMode } = useTheme()
  let [addUserInfo] = useAddUserInfoMutation()
  let [name, setName] = useState('')
  let [password, setPassword] = useState('')
  let [repeatePassword, setRepeatePassword] = useState('')

  async function handleSignUp() {
    let role = 'bot'
    if (password === repeatePassword && password === '1451') {
      role = 'admin'
    }

    let updatedUser = {
      id: String(Date.now()),
      userName: name,
      password,
      repeatePassword,
      status: role,
    }
    localStorage.setItem("user", JSON.stringify(updatedUser))

    if (password === repeatePassword && name !== "") {
      await addUserInfo(updatedUser)
    } else {
      alert('Произошла ошибка. Проверьте свои данные')
    }
  }

  return (
    <div className={`flex justify-center items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Sign Up
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
            }`}
          />
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
            }`}
          />
          <input
            type="password"
            placeholder="Repeat password"
            required
            value={repeatePassword}
            onChange={e => setRepeatePassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
            }`}
          />

          <Link href={'/pages/logIn'}>log in</Link>

          <button
            onClick={handleSignUp}
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
