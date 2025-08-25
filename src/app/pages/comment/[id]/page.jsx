'use client'
import {
	useAddCommentMutation,
	useGetOptionsQuery,
} from '@/store/services/userApi'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import userImg from '../../../../shared/Без названия (1).png'

const Comment = () => {
	const { id } = useParams()
	const { data: subjects, isLoading, isError } = useGetOptionsQuery()
	const [subject, setSubject] = useState(null)
	const [addComment] = useAddCommentMutation()
	let [inpAddComent, setInpAddComent] = useState('')

	async function addUserComent() {
		const newComments = [...(subject.comment || []), inpAddComent]

		await addComment({ id: subject.id, coment: newComments })

		setSubject(prev => ({ ...prev, comment: newComments })) 
		setInpAddComent('')
	}

	useEffect(() => {
		if (subjects) {
			const found = subjects.find(s => s.id === id)
			setSubject(found)
		}
	}, [id, subjects])

	if (isLoading)
		return (
			<p className='text-center text-gray-500 mt-4'>Загрузка комментариев...</p>
		)
	if (isError)
		return (
			<p className='text-center text-red-500 mt-4'>
				Ошибка при загрузке комментариев
			</p>
		)
	if (!subject?.comment?.length)
		return (
			<p className='text-center text-gray-500 mt-4'>Комментариев пока нет</p>
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
		<div className='space-y-6'>
			{subject.comment.map((com, idx) => (
				<div
					key={idx}
					className='flex items-start gap-4 bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200'
				>
					<Image
						src={userImg}
						alt='user'
						width={50}
						height={50}
						className='rounded-full border border-gray-200 dark:border-gray-700'
					/>
					<div className='flex-1'>
						<div className='flex items-center gap-2 text-sm text-gray-500'>
							<span className='font-semibold text-gray-800'>User</span>
							<span>· {formatDate()}</span>
						</div>
						<p className='text-gray-700 mt-1'>{com}</p>
					</div>
				</div>
			))}

			<div className='flex gap-2 mt-4'>
				<input
					type='text'
					placeholder='Написать комментарий...'
					value={inpAddComent}
					onChange={e => setInpAddComent(e.target.value)}
					className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
				/>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'
					onClick={addUserComent}
				>
					Отправить
				</button>
			</div>
		</div>
	)
}

export default Comment
