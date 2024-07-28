'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { Button } from '@/components/ui/button';

export default function ToggleTheme() {
  const [mode, setMode] = useState('light');
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(mode);
  }, [setTheme, mode]);

  const handleTheme = () => {
    if (mode === 'dark') setMode('light');
    if (mode === 'light') setMode('dark');
  };

  return (
    <Button onClick={() => handleTheme()} variant="light" size="icon">
      {mode === 'dark' ? <IoSunny size={24} /> : <IoMoon size={24} />}
    </Button>
  );
}
