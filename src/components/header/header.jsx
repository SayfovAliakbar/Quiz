import React from 'react'
import Link from 'next/link'
import logo from "../../shared/Без названия (2).jpg"
import Image from 'next/image'

const Header = () => {
	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				<Image src={logo} alt='logo' height={30} width={100}/>
				<nav>
					<ul className="flex space-x-8">
						<li>
							<Link
								href="/"
								className="text-gray-800 hover:text-indigo-700 transition font-medium"
							>
								<b>Home</b>
							</Link>
						</li>
						<li>
							<Link
								href="/pages/about"
								className="text-gray-800 hover:text-indigo-700 transition font-medium"
							>
								<b>About</b>
							</Link>
						</li>
						<li>
							<Link
								href="/pages/contact"
								className="text-gray-800 hover:text-indigo-700 transition font-medium"
							>
								<b>Contact</b>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
