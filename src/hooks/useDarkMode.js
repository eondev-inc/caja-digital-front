import { useEffect } from 'react';
import { useStore } from '../app/store';

/**
 * Hook para gestionar el modo oscuro de la aplicación.
 * - Lee la preferencia del sistema (prefers-color-scheme) como valor inicial.
 * - Persiste la elección del usuario en el store de Zustand (sessionStorage).
 * - Aplica/quita la clase `dark` en el elemento <html> para que Tailwind
 *   y Flowbite reaccionen a los tokens del modo oscuro.
 *
 * @returns {{ darkMode: boolean, toggleDarkMode: () => void }}
 */
export const useDarkMode = () => {
  const { darkMode, setDarkMode } = useStore();

  // Inicializar desde preferencia del sistema si el store aún no tiene valor
  useEffect(() => {
    const systemPrefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Solo aplicar preferencia del sistema en la primera carga
    // (si el store ya tiene un valor explícito del usuario, lo respeta)
    const stored = sessionStorage.getItem('allData');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.darkMode === undefined) {
          setDarkMode(systemPrefersDark);
        }
      } catch {
        setDarkMode(systemPrefersDark);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sincronizar la clase `dark` en <html> siempre que darkMode cambie
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return { darkMode, toggleDarkMode };
};
