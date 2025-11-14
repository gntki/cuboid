import { create } from 'zustand'

type Page = 'start' | 'game' | 'end'

interface Store {
  page: Page
  setPage: (page: Page) => void

  isGameStart: boolean
  setGameStart: (v: boolean) => void
}

export const useAppStore = create<Store>((set) => ({
  page: 'start',
  setPage: (page: Page) => set({ page }),

  isGameStart: false,
  setGameStart: (isGameStart: boolean) => set({ isGameStart }),
}))
