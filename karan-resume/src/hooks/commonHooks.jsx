import { useState } from 'react';
import { create } from 'zustand';
import { createTheme } from '@mui/material/styles';

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
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

export const useLastClicked = create((set, get) => ({
  lastClicked: 'Home',
  handleClick: (name) => set({ lastClicked: name }),
  getLastClicked: () => get().lastClicked
}));