import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';


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
      ...(themeMode === 'light' ? { primary: deepPurple } : {}),
    },
  });

  return { theme, toggleTheme };
};