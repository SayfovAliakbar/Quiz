'use client'
import { useTheme } from '@/components/theme'
import { useGetUserInfoQuery } from '@/store/services/userApi'
import React, { useState } from 'react'

const LogIn = () => {
	let {darkMode} = useTheme()
	let { data: userInfo } = useGetUserInfoQuery()
	console.log(userInfo)
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
			className={`flex items-center justify-center min-h-screen ${
				darkMode ? 'bg-gray-900' : 'bg-gray-100'
			}`}
		>
			<div
				className={`w-full max-w-sm p-6 rounded-2xl shadow-lg ${
					darkMode ? 'bg-gray-800' : 'bg-white'
				}`}
			>
				<h2
					className={`text-2xl font-semibold text-center mb-6 ${
						darkMode ? 'text-white' : 'text-gray-800'
					}`}
				>
					Вход в аккаунт
				</h2>

				<input
					type='text'
					value={logName}
					onChange={e => setLogName(e.target.value)}
					placeholder='Имя пользователя'
					className={`w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:ring-2 ${
						darkMode
							? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
							: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
					}`}
				/>

				<input
					type='password'
					value={logPassword}
					onChange={e => setLogPassword(e.target.value)}
					placeholder='Пароль'
					className={`w-full px-4 py-2 mb-6 rounded-lg border focus:outline-none focus:ring-2 ${
						darkMode
							? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
							: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
					}`}
				/>

				<button
					onClick={logIn}
					className='w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300'
				>
					Войти
				</button>
			</div>
		</div>
	)
}

export default LogIn
