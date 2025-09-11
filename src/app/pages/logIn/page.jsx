'use client'
import { useTheme } from '@/components/theme'
import { useGetUserInfoQuery } from '@/store/services/userApi'
import React, { useState } from 'react'

const LogIn = () => {
	let { darkMode } = useTheme()
	let { data: userInfo } = useGetUserInfoQuery()
	let [logName, setLogName] = useState('')
	let [logPassword, setLogPassword] = useState('')

	function logIn() {
		const user = userInfo.find(
			el => logName === el.userName && logPassword === el.password
		)

		if (user) {
			const logInUser = {
				id: user.id,
				userName: user.userName,
				password: user.password,
			}
			localStorage.setItem('user', JSON.stringify(logInUser))
			alert('Всё OK')
		} else {
			alert('Такой аккаунт не обнаружен')
		}
	}

	return (
		<div
			className={`flex items-center justify-center min-h-screen px-4 ${
				darkMode ? 'bg-gray-900' : 'bg-gray-100'
			}`}
		>
			<div
				className={`w-full max-w-sm p-8 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 ${
					darkMode ? 'bg-gray-800 shadow-gray-700' : 'bg-white shadow-gray-300'
				}`}
			>
				<h2
					className={`text-3xl font-extrabold text-center mb-8 ${
						darkMode ? 'text-white' : 'text-gray-800'
					}`}
				>
					Вход в аккаунт
				</h2>

				<div className='flex flex-col gap-5'>
					<input
						type='text'
						value={logName}
						onChange={e => setLogName(e.target.value)}
						placeholder='Имя пользователя'
						className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300 placeholder-gray-400 ${
							darkMode
								? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-400'
								: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
						}`}
					/>

					<input
						type='password'
						value={logPassword}
						onChange={e => setLogPassword(e.target.value)}
						placeholder='Пароль'
						className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300 placeholder-gray-400 ${
							darkMode
								? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-400'
								: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'
						}`}
					/>

					<button
						onClick={logIn}
						className='w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all duration-300 transform hover:-translate-y-1'
					>
						Войти
					</button>

					<p
						className={`text-sm text-center ${
							darkMode ? 'text-gray-300' : 'text-gray-600'
						}`}
					>
						Нет аккаунта?{' '}
						<a
							href='/pages/signUp'
							className={`font-medium hover:underline ${
								darkMode ? 'text-blue-400' : 'text-blue-600'
							}`}
						>
							Зарегистрироваться
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default LogIn
