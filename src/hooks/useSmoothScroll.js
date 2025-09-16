import { useCallback } from 'react';

/**
 * Hook personalizado para manejar scroll suave a secciones
 * @returns {Function} scrollToSection - Función para hacer scroll a una sección específica
 */
export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Altura del header sticky
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return { scrollToSection };
};