// lib/stores/useAppStore.ts
import { create } from 'zustand'

interface Event {
  id: string
  date: string // ISO string: '2025-11-30'
  title: string
}

interface AppState {
  // Data selecionada no calendário
  selectedDate: Date

  // Nome do usuário
  userName: string

  // Controle de modais/overlays
  isSearchOpen: boolean
  isProfileOpen: boolean

  // Eventos
  events: Event[]

  // Actions
  setSelectedDate: (date: Date) => void
  setUserName: (name: string) => void
  toggleSearch: () => void
  toggleProfile: () => void
  closeAllModals: () => void

  // CRUD de eventos
  addEvent: (date: string, title: string) => void
  updateEvent: (id: string, title: string) => void
  deleteEvent: (id: string) => void
  hydrateEvents: () => void // carregar do localStorage no client

  // Helper functions
  getFormattedDate: () => string
  isToday: (date: Date) => boolean
}

export const useAppStore = create<AppState>((set, get) => ({
  // Estado inicial
  selectedDate: new Date(),
  userName: 'Kel',
  isSearchOpen: false,
  isProfileOpen: false,
  events: [], // Inicial vazio, vai hidratar no client

  // Setters
  setSelectedDate: (date) => set({ selectedDate: date }),
  setUserName: (name) => set({ userName: name }),

  // Toggle modais
  toggleSearch: () =>
    set((state) => ({
      isSearchOpen: !state.isSearchOpen,
      isProfileOpen: false
    })),

  toggleProfile: () =>
    set((state) => ({
      isProfileOpen: !state.isProfileOpen,
      isSearchOpen: false
    })),

  closeAllModals: () => set({ isSearchOpen: false, isProfileOpen: false }),

  // CRUD de eventos
  addEvent: (date, title) => {
    const newEvent = { id: crypto.randomUUID(), date, title }
    const updatedEvents = [...get().events, newEvent]
    if (typeof window !== 'undefined') {
      localStorage.setItem('events', JSON.stringify(updatedEvents))
    }
    set({ events: updatedEvents })
  },

  updateEvent: (id, title) => {
    const updatedEvents = get().events.map((e) =>
      e.id === id ? { ...e, title } : e
    )
    if (typeof window !== 'undefined') {
      localStorage.setItem('events', JSON.stringify(updatedEvents))
    }
    set({ events: updatedEvents })
  },

  deleteEvent: (id) => {
    const updatedEvents = get().events.filter((e) => e.id !== id)
    if (typeof window !== 'undefined') {
      localStorage.setItem('events', JSON.stringify(updatedEvents))
    }
    set({ events: updatedEvents })
  },

  // Hidratar do localStorage no client
  hydrateEvents: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('events')
      if (saved) set({ events: JSON.parse(saved) })
    }
  },

  // Helpers
  getFormattedDate: () => {
    const date = get().selectedDate
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },

  isToday: (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }
}))
