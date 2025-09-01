'use client'
import { useGetOptionsQuery } from '@/store/services/userApi'
import Link from 'next/link'
import { MessageCircle, Star } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import { useTheme } from '../theme'

const Options = () => {
	let { data, isLoading } = useGetOptionsQuery()
	let { darkMode } = useTheme()
	const [likedSubjects, setLikedSubjects] = useState([])
	const cardsRef = useRef([])

	useEffect(() => {
		const saved = JSON.parse(localStorage.getItem('likedSubject')) || []
		setLikedSubjects(saved)
	}, [])

	useEffect(() => {
		localStorage.setItem('likedSubject', JSON.stringify(likedSubjects))
	}, [likedSubjects])

	function addToLikedSubjects(el) {
		if (!likedSubjects.find(item => item.id === el.id)) {
			setLikedSubjects([...likedSubjects, el])
		}
	}

	useEffect(() => {
		if (data && data.length > 0) {
			const timer = setTimeout(() => {
				cardsRef.current.forEach((card, index) => {
					if (card) {
						card.style.opacity = '1'
						card.style.transform = 'translateY(0) scale(1)'
						card.style.transition = `all 0.8s ease-out ${index * 0.2}s`
					}
				})
			}, 100)

			return () => clearTimeout(timer)
		}
	}, [data])

	if (isLoading)
		return (
			<div className='fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-violet-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
				<div className='w-16 h-16 border-4 border-t-transparent border-blue-500 dark:border-blue-400 rounded-full animate-spin shadow-lg'></div>
				<h2 className='text-gray-800 dark:text-gray-100 mt-6 text-lg font-semibold tracking-wide animate-pulse'>
					Загрузка...
				</h2>
				<p className='text-gray-600 dark:text-gray-400 mt-2 text-sm'>
					✨ Скоро начнём викторину ✨
				</p>
			</div>
		)

	return (
		<main
			className={`min-h-screen p-8 relative ${
				darkMode
					? 'bg-gray-900 text-gray-100'
					: 'bg-gradient-to-br from-blue-50 via-white to-violet-50'
			}`}
		>
			<h1 className='text-4xl font-bold text-center mb-12 text-blue-700 dark:text-blue-400'>
				Выберите предмет викторины
			</h1>

			<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
				{data?.map((el, idx) => (
					<div
						key={el.id}
						ref={el => (cardsRef.current[idx] = el)}
						style={{ opacity: 0, transform: 'translateY(50px) scale(0.95)' }}
						className={`shadow-xl hover:shadow-2xl rounded-3xl p-8 text-center transition-all duration-300 hover:scale-[1.02] border group ${
							darkMode
								? 'bg-gray-800 border-gray-600 text-gray-100'
								: 'bg-white border-gray-200 text-gray-800'
						}`}
					>
						<Star
							className={`cursor-pointer transition-colors ${
								likedSubjects.find(item => item.id === el.id)
									? 'text-yellow-400'
									: 'hover:text-yellow-400'
							}`}
							onClick={() => addToLikedSubjects(el)}
						/>

						<div className='flex flex-col items-center gap-6'>
							<div className='text-6xl transform group-hover:scale-110 transition-transform duration-300'>
								📚
							</div>

							<p className='text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
								{el.name}
							</p>

							<div className='flex justify-center gap-4 mt-6'>
								<Link
									href={`pages/questions/${el.id}`}
									className='px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1'
								>
									Начать
								</Link>
								<Link
									href={`pages/comment/${el.id}`}
									className='flex items-center gap-2 px-4 py-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 font-medium rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700'
								>
									<MessageCircle className='w-5 h-5' />
									Комментарии
								</Link>
							</div>
						</div>
					</div>
				))}
			</section>
		</main>
	)
}

export default Options
