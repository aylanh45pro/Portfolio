import React from 'react';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center p-3 bg-black/80 backdrop-blur-sm">
        {/* Boutons de langue */}
        <div className="language-switch rounded-full bg-gray-800/50 p-1">
          <button className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm">FR</button>
          <button className="px-3 py-1 rounded-full text-gray-300 text-sm">EN</button>
        </div>

        {/* Boutons thème */}
        <div className="theme-switch rounded-full bg-gray-800/50 p-1">
          <button className="px-3 py-1 rounded-full bg-blue-400 text-white text-sm flex items-center">
            <span className="mr-1">⚔️</span>Jedi
          </button>
          <button className="px-3 py-1 rounded-full text-red-500 text-sm flex items-center">
            <span className="mr-1">🔮</span>Sith
          </button>
        </div>
      </div>
    </div>
  );
} 