'use client'
import React from 'react'
import Link from 'next/link'
import logo from '../../shared/quizLogo.jpg'
import Image from 'next/image'
import { useTheme } from '../theme'
import { Moon, Sun, Home, User, Mail, Heart } from 'lucide-react'

const Header = () => {
	let { darkMode, toggleTheme } = useTheme()

	return (
		<header
			className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
				darkMode
					? 'bg-gray-900/80 border-b border-gray-700'
					: 'bg-white/80 border-b border-gray-200 shadow-sm'
			}`}
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3'>
				<div className='flex items-center justify-between'>
					<Link href='/' className='flex items-center space-x-2 group'>
						<Image
							src={logo}
							alt='logo'
							height={40}
							width={120}
							className='transition-transform duration-300 group-hover:scale-105 rounded-[15px]'
						/>
					</Link>

					<nav className='hidden md:flex items-center space-x-6'>
						<Link
							href='/'
							className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
								darkMode
									? 'text-gray-300 hover:text-white hover:bg-gray-800'
									: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
							}`}
						>
							<Home className='w-4 h-4' />
							<span>Home</span>
						</Link>

						<Link
							href='/pages/about'
							className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
								darkMode
									? 'text-gray-300 hover:text-white hover:bg-gray-800'
									: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
							}`}
						>
							<User className='w-4 h-4' />
							<span>About</span>
						</Link>

						<Link
							href='/pages/contact'
							className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
								darkMode
									? 'text-gray-300 hover:text-white hover:bg-gray-800'
									: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
							}`}
						>
							<Mail className='w-4 h-4' />
							<span>Contact</span>
						</Link>

						<Link
              href={'/pages/like'}
							className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
								darkMode
									? 'text-gray-300 hover:text-white hover:bg-gray-800'
									: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
							}`}
						>
							<Heart />
              <span>Избранные</span>
						</Link>

						<button
							onClick={toggleTheme}
							className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
								darkMode
									? 'bg-gray-800 text-amber-400 hover:bg-gray-700'
									: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
							}`}
							aria-label={
								darkMode
									? 'Переключить на светлую тему'
									: 'Переключить на тёмную тему'
							}
						>
							{darkMode ? (
								<Sun className='w-5 h-5' />
							) : (
								<Moon className='w-5 h-5' />
							)}
						</button>
					</nav>

					<div className='flex md:hidden items-center space-x-4'>
						<button
							onClick={toggleTheme}
							className={`p-2 rounded-lg transition-all duration-300 ${
								darkMode
									? 'bg-gray-800 text-amber-400'
									: 'bg-indigo-100 text-indigo-600'
							}`}
						>
							{darkMode ? (
								<Sun className='w-5 h-5' />
							) : (
								<Moon className='w-5 h-5' />
							)}
						</button>

						<button
							className={`p-2 rounded-lg ${
								darkMode
									? 'bg-gray-800 text-gray-300'
									: 'bg-gray-100 text-gray-700'
							}`}
						>
							<svg
								className='w-5 h-5'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
