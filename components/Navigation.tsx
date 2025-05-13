import { useState } from 'react';
import Link from 'next/link';
import React from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50">
      {/* Bouton hamburger plus compact */}
      <button 
        className="md:hidden p-2 bg-yellow-400 rounded-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className={`space-y-1.5 transform transition-all ${isMenuOpen ? 'rotate-45' : ''}`}>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className={`block w-6 h-0.5 bg-black ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </div>
      </button>

      {/* Menu mobile optimisé */}
      <div 
        className={`
          md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm
          transform transition-transform duration-300 safe-area-inset-bottom
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 py-safe">
          <Link 
            href="/" 
            className="mobile-menu-link text-xl font-bold hover:text-yellow-300 transition-colors px-4 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            ACCUEIL
          </Link>
          <Link 
            href="/projects" 
            className="mobile-menu-link text-xl font-bold hover:text-yellow-300 transition-colors px-4 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            PROJETS
          </Link>
          <Link 
            href="/about" 
            className="mobile-menu-link text-xl font-bold hover:text-yellow-300 transition-colors px-4 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            À PROPOS
          </Link>
          <Link 
            href="/contact" 
            className="mobile-menu-link text-xl font-bold hover:text-yellow-300 transition-colors px-4 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT
          </Link>
        </div>
      </div>

      {/* Menu desktop */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-white hover:text-gray-300">Accueil</Link>
        <Link href="/projects" className="text-white hover:text-gray-300">Projets</Link>
        <Link href="/about" className="text-white hover:text-gray-300">À propos</Link>
        <Link href="/contact" className="text-white hover:text-gray-300">Contact</Link>
      </div>
    </nav>
  );
} 