'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-accent">
            Luxe Fashion
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-accent transition-colors"
            >
              Products
            </Link>
            <Link 
              href="/collections" 
              className="text-gray-700 hover:text-accent transition-colors"
            >
              Collections
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-6 h-6 space-y-1"
            aria-label="Toggle menu"
          >
            <span 
              className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span 
              className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span 
              className={`block w-full h-0.5 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-2">
            <Link 
              href="/" 
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors"
            >
              Products
            </Link>
            <Link 
              href="/collections" 
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors"
            >
              Collections
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}