'use client'

export function Header() {
  return (
    <header className="w-full flex justify-between items-center py-4">
      {/* Saudação */}
      <h1 className="text-2xl font-bold text-gray-900 cursor-default">Olá, Kel!</h1>
      
      {/* Ícones à direita */}
      <div className="flex gap-4">
        {/* Ícone de busca */}
        <button className="p-2 rounded-full  bg-green-800 hover:bg-green-400 transition-colors cursor-pointer">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </button>
        
        {/* Ícone de perfil */}
        <button className="p-2 rounded-full bg-green-800 hover:bg-green-400 transition-colors cursor-pointer">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
      </div>
    </header>
  );
}