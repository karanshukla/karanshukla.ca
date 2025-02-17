import { useState } from 'react';
import { create } from 'zustand';
import { createTheme, Theme } from '@mui/material/styles';

export const useTheme = (): { theme: Theme; toggleTheme: () => void } => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  );

  const toggleTheme = (): void => {
    const newThemeMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newThemeMode);
    localStorage.setItem('theme', newThemeMode);
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === 'dark' ? '#0A192F' : '#4B92E5',
      },
      info: {
        main: '#FFFFFF',
      },
      background: {
        default: themeMode === 'dark' ? '#0A192F' : '#F8FAFC',
        paper: themeMode === 'dark' ? '#112240' : '#FFFFFF',
      },
    },
  });

  return { theme, toggleTheme };
};

interface LastClickedStore {
  lastClicked: string;
  handleClick: (name: string) => void;
  getLastClicked: () => string;
}

export const useLastClicked = create<LastClickedStore>((set, get) => ({
  lastClicked: 'Home',
  handleClick: (name: string) => set({ lastClicked: name }),
  getLastClicked: () => get().lastClicked
}));