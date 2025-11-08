'use client'

import { useRef } from 'react'

export function Progresso() {
  const books = [
    { title: 'Extraordinário', progress: 82 },
    { title: 'O Corriço', progress: 45 },
    { title: 'Capitães de Areia', progress: 30 }
  ]

  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    const startX = e.pageX
    const scrollLeft = container.scrollLeft

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.pageX
      const walk = (x - startX) * 1 // velocidade do scroll
      container.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'default'
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = 'grabbing'
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-black">Continue lendo</h2>
      
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 cursor-pointer active:cursor-pointer select-none"
        style={{ userSelect: 'none' }}
      >
        {books.map((book, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-4 shadow-sm min-w-48 flex-shrink-0"
          >
            <h3 className="font-medium text-gray-900 mb-2 text-base">
              {book.title}
            </h3>
            
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-gray-900">
                {book.progress}%
              </span>
              
              <div className="w-16 bg-gray-200 rounded-full h-1 mb-1">
                <div 
                  className="bg-green-600 h-1 rounded-full" 
                  style={{ width: `${book.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}