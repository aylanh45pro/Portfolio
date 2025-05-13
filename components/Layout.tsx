import React from 'react';
import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-yellow-400 flex flex-col">
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-yellow-400/20 p-2 sm:p-4 z-40">
        <Navigation />
      </header>
      
      <main className="flex-1 main-content pt-16 sm:pt-20 px-2 sm:px-4 safe-area-inset">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="p-3 text-center text-yellow-400/60 text-xs sm:text-sm safe-area-inset-bottom">
        <p>Que la Force soit avec vous</p>
      </footer>
    </div>
  );
} 