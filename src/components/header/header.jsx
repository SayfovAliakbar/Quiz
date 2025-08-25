import Link from 'next/link'
import React from 'react'

const Header = () => {
	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-gray-900">
					Quiz
				</h1>
				<nav>
					<ul className="flex space-x-8">
						<li>
							<Link
								href="/"
								className="text-gray-700 hover:text-yellow-600 transition font-medium"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/about"
								className="text-gray-700 hover:text-yellow-600 transition font-medium"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/contact"
								className="text-gray-700 hover:text-yellow-600 transition font-medium"
							>
								Contact
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
