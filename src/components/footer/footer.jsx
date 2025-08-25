import React from "react"

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Копирайт */}
        <div className="text-lg font-semibold mb-4 md:mb-0 text-gray-800">
          © {new Date().getFullYear()} MyWebsite
        </div>

        {/* Навигация */}
        <nav aria-label="Footer Navigation">
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-yellow-500 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-yellow-500 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-yellow-500 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
