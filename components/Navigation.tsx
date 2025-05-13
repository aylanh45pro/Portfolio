import { useState } from 'react';
import Link from 'next/link';
import React from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50">
      {/* Bouton hamburger stylisé Star Wars */}
      <button 
        className="md:hidden p-3 bg-yellow-400 rounded-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className={`space-y-2 transform transition-all ${isMenuOpen ? 'rotate-45' : ''}`}>
          <span className="block w-8 h-0.5 bg-black"></span>
          <span className={`block w-8 h-0.5 bg-black ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className="block w-8 h-0.5 bg-black"></span>
        </div>
      </button>

      {/* Menu mobile avec animation Star Wars */}
      <div 
        className={`
          md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm
          transform transition-transform duration-300
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-yellow-400">
          <Link 
            href="/" 
            className="text-2xl font-bold hover:text-yellow-300 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            ACCUEIL
          </Link>
          <Link 
            href="/projects" 
            className="text-2xl font-bold hover:text-yellow-300 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            PROJETS
          </Link>
          <Link 
            href="/about" 
            className="text-2xl font-bold hover:text-yellow-300 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            À PROPOS
          </Link>
          <Link 
            href="/contact" 
            className="text-2xl font-bold hover:text-yellow-300 transition-colors"
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