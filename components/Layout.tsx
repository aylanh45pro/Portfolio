import React from 'react';
import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-yellow-400">
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-yellow-400/20 p-4 z-40">
        <Navigation />
      </header>
      
      <main className="main-content pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="mt-auto p-4 text-center text-yellow-400/60 text-sm">
        <p>Que la Force soit avec vous</p>
      </footer>
    </div>
  );
} 