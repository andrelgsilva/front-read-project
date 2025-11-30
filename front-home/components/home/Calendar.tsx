'use client'

import { useState, useRef } from 'react'
import { useAppStore } from '@/lib/stores/useAppStore'

export function Calendar() {
  const { events, addEvent, updateEvent, deleteEvent, isToday } = useAppStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState<string | null>(null)
  const [currentEvent, setCurrentEvent] = useState<{ id: string; title: string } | null>(null)
  const [eventTitle, setEventTitle] = useState('')

  const today = new Date()

  const generateCalendarDays = () => {
    const days = []
    for (let i = -3; i < 11; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push({
        day: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
        date: date.getDate().toString(),
        fullDate: date
      })
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  const handleOpenModal = (date: string, event?: { id: string; title: string }) => {
    setCurrentDate(date)
    if (event) {
      setCurrentEvent(event)
      setEventTitle(event.title)
    } else {
      setCurrentEvent(null)
      setEventTitle('')
    }
    setModalOpen(true)
  }

  const handleSaveEvent = () => {
    if (!currentDate || !eventTitle) return
    if (currentEvent) {
      updateEvent(currentEvent.id, eventTitle)
    } else {
      addEvent(currentDate, eventTitle)
    }
    setModalOpen(false)
  }

  // Drag to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    const startX = e.pageX
    const scrollLeft = container.scrollLeft

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.pageX
      const walk = (x - startX) * 1
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
    <div className="w-full mb-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black">Calendário</h2>

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 cursor-pointer select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4"
      >
        {calendarDays.map((item, index) => {
          const dayISO = item.fullDate.toISOString().split('T')[0]
          const todayDay = isToday(item.fullDate)
          const dayEvents = events.filter(e => e.date === dayISO)

          return (
            <div
              key={index}
              onClick={() => handleOpenModal(dayISO)}
              className={`flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border-2 p-2 sm:p-3 min-w-12 sm:min-w-16 flex-shrink-0 transition-all
                ${
                  todayDay
                    ? 'bg-green-800 text-white border-green-800'
                    : 'bg-white text-gray-900 border-green-800'
                }
                hover:bg-green-200 hover:border-green-400 cursor-pointer
              `}
            >
              <span className={`text-xs sm:text-sm font-medium ${todayDay ? 'text-white' : 'text-gray-600'}`}>
                {item.day}
              </span>
              <span className={`text-base sm:text-lg font-bold mt-0.5 sm:mt-1 ${todayDay ? 'text-white' : 'text-gray-900'}`}>
                {item.date}
              </span>

              {dayEvents.map(ev => (
                <div key={ev.id} className="mt-1 bg-green-200 text-green-800 px-1 rounded flex items-center gap-1 w-full justify-center">
                  {ev.title}
                  <button
                    onClick={(e) => {
                      e.stopPropagation() // evita abrir modal novamente
                      handleOpenModal(dayISO, ev)
                    }}
                    className="text-blue-600 text-xs cursor-pointer"
                  >
                    ✎
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteEvent(ev.id)
                    }}
                    className="text-red-600 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 
                        animate-in fade-in duration-200">
          <div className="bg-white rounded-xl p-6 w-80 flex flex-col gap-4 
                          animate-in slide-in-from-bottom-4 duration-300">
            <h3 className="font-semibold text-lg text-black select-none">
              {currentEvent ? 'Editar Evento' : 'Adicionar Evento'}
            </h3>
            
            <input
              type="text"
              className="border-2 border-gray-300 p-3 rounded-lg w-full
                        text-gray-900 font-medium
                        transition-all duration-300 ease-in-out
                        focus:border-green-600 focus:ring-2 focus:ring-green-200 focus:outline-none
                        hover:border-gray-400
                        placeholder:text-gray-400
                        placeholder:text-gray-400 placeholder:font-normal"
              value={eventTitle}
              onChange={e => setEventTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSaveEvent()
                }
                if (e.key === 'Escape') {
                  setModalOpen(false)
                }
              }}
              placeholder="Título do evento"
              autoFocus
            />
            
            <div className="flex justify-end gap-2 mt-2">
              <button 
                onClick={() => setModalOpen(false)} 
                className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium
                          transition-all duration-200 ease-in-out
                          hover:bg-gray-100 hover:border-gray-400
                          active:scale-95 active:bg-gray-200 cursor-pointer"
              >
                Cancelar
              </button>
              
              <button 
                onClick={handleSaveEvent} 
                className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium
                          transition-all duration-200 ease-in-out
                          hover:bg-green-700 hover:shadow-lg hover:shadow-green-200
                          active:scale-95 active:bg-green-800 cursor-pointer"
              >
                {currentEvent ? 'Salvar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
