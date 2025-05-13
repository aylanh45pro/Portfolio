import React from 'react';
import Navigation from './Navigation';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-yellow-400 flex flex-col">
      <Header />
      
      <main className="flex-1 main-content pt-24 px-2 sm:px-4 safe-area-inset">
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