import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      initializeTheme: () => {
        if (typeof window !== 'undefined') {
          const savedTheme = localStorage.getItem('theme-storage');
          const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const initialTheme = savedTheme ? JSON.parse(savedTheme).state.theme : systemDark ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', initialTheme === 'dark');
          set({ theme: initialTheme });
        }
      },
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        return { theme: newTheme };
      }),
    }),
    {
      name: 'theme-storage',
    }
  )
);