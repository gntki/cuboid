import { create } from 'zustand'

type Page = 'start' | 'end'

interface Store {
  page: Page
  setStage: (page: Page) => void
}

export const useAppStore = create<Store>((set) => ({
  page: 'end',
  setStage: (page: Page) => set({ page }),
}))
