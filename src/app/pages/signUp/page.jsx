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
		localStorage.setItem('user', JSON.stringify(updatedUser))

		if (password === repeatePassword && name !== '') {
			await addUserInfo(updatedUser)
		} else {
			alert('Произошла ошибка. Проверьте свои данные')
		}
	}

	return (
		<div
			className={`flex justify-center items-center min-h-screen px-4 ${
				darkMode ? 'bg-gray-900' : 'bg-gray-100'
			}`}
		>
			<div
				className={`w-full max-w-md p-10 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 ${
					darkMode ? 'bg-gray-800 shadow-gray-700' : 'bg-white shadow-gray-300'
				}`}
			>
				<h2
					className={`text-3xl font-extrabold mb-8 text-center ${
						darkMode ? 'text-white' : 'text-gray-800'
					}`}
				>
					Sign Up
				</h2>

				<div className='flex flex-col gap-5'>
					<input
						type='text'
						placeholder='Enter your name'
						required
						value={name}
						onChange={e => setName(e.target.value)}
						className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300 ${
							darkMode
								? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400'
								: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
						}`}
					/>
					<input
						type='password'
						placeholder='Enter password'
						required
						value={password}
						onChange={e => setPassword(e.target.value)}
						className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300 ${
							darkMode
								? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400'
								: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
						}`}
					/>
					<input
						type='password'
						placeholder='Repeat password'
						required
						value={repeatePassword}
						onChange={e => setRepeatePassword(e.target.value)}
						className={`w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-colors duration-300 ${
							darkMode
								? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400'
								: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
						}`}
					/>

					<Link
						href={'/pages/logIn'}
						className={`text-sm font-medium text-center hover:underline ${
							darkMode ? 'text-blue-400' : 'text-blue-600'
						}`}
					>
						Already have an account? Log in
					</Link>

					<button
						onClick={handleSignUp}
						className='w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all duration-300 transform hover:-translate-y-1'
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	)
}

export default SignUp
