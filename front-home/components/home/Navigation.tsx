'use client'

import { useState } from 'react'

export function Navigation() {
  const [activePage, setActivePage] = useState('home')

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {/* Ícone Home */}
        <button 
          className={`flex flex-col items-center p-2 cursor-pointer relative ${
            activePage === 'home' ? 'text-green-600' : 'text-gray-600'
          }`}
          onClick={() => setActivePage('home')}
        >
          <div className={`p-2 rounded-full transition-all ${
            activePage === 'home' 
              ? 'bg-green-100' 
              : 'hover:bg-green-50'
          }`}>
            <img 
              src="/icons/home.png" 
              alt="Home" 
              className="w-6 h-6 filter brightness-0"
            />
          </div>
          <span className="text-xs font-medium mt-1">Home</span>
        </button>

        {/* Ícone Livros */}
        <button 
          className={`flex flex-col items-center p-2 cursor-pointer relative ${
            activePage === 'livros' ? 'text-green-600' : 'text-gray-600'
          }`}
          onClick={() => setActivePage('livros')}
        >
          <div className={`p-2 rounded-full transition-all ${
            activePage === 'livros' 
              ? 'bg-green-100' 
              : 'hover:bg-green-50'
          }`}>
            <img 
              src="/icons/throphy.png" 
              alt="Ranking" 
              className="w-6 h-6 filter brightness-0"
            />
          </div>
          <span className="text-xs font-medium mt-1">Ranking</span>
        </button>

 
        <button 
          className={`flex flex-col items-center p-2 cursor-pointer relative ${
            activePage === 'amigos' ? 'text-green-600' : 'text-gray-600'
          }`}
          onClick={() => setActivePage('amigos')}
        >
          <div className={`p-2 rounded-full transition-all ${
            activePage === 'amigos' 
              ? 'bg-green-100' 
              : 'hover:bg-green-50'
          }`}>
            <img 
              src="/icons/books.png" 
              alt="Sua Estante" 
              className="w-6 h-6 filter brightness-0"
            />
          </div>
          <span className="text-xs font-medium mt-1">Sua Estante</span>
        </button>

        {/* Ícone Perfil */}
        <button 
          className={`flex flex-col items-center p-2 cursor-pointer relative ${
            activePage === 'perfil' ? 'text-green-600' : 'text-gray-600'
          }`}
          onClick={() => setActivePage('perfil')}
        >
          <div className={`p-2 rounded-full transition-all ${
            activePage === 'perfil' 
              ? 'bg-green-100' 
              : 'hover:bg-green-50'
          }`}>
            <img 
              src="/icons/person.png" 
              alt="Perfil" 
              className="w-6 h-6 filter brightness-0"
            />
          </div>
          <span className="text-xs font-medium mt-1">Perfil</span>
        </button>
      </div>
    </nav>
  )
}