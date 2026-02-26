import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { useDarkMode } from "../../hooks/useDarkMode";

// eslint-disable-next-line react/prop-types
export const HeaderNoLogin = ({ title }) => { 
  const appliedTitle = title || "Caja Digital";
  const { scrollToSection } = useSmoothScroll();
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Navbar 
      fluid 
      className="dark:bg-slate-900/95 sticky top-0 z-50 border-b border-gray-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-sm dark:border-slate-700 sm:px-6"
    >
      {/* Brand Section */}
      <Navbar.Brand as={Link} to="/" className="flex items-center space-x-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary-500">
          <svg 
            className="size-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-secondary-800 dark:text-white">
            {appliedTitle}
          </span>
          <span className="hidden text-xs text-secondary-500 dark:text-slate-400 sm:block">
            Centros de Salud
          </span>
        </div>
      </Navbar.Brand>

      {/* Mobile Menu Toggle and Auth Buttons */}
      <div className="flex items-center gap-3 md:order-2">
        {/* Dark Mode Toggle */}
        <button
          type="button"
          aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
          onClick={toggleDarkMode}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-slate-600"
        >
          {darkMode ? (
            <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>

        {/* Auth Buttons - Desktop */}
        <div className="hidden items-center space-x-2 sm:flex">
          <Button 
            as={Link} 
            to="/login"
            color="gray"
            size="sm"
          >
            Iniciar Sesión
          </Button>
          <Button 
            as={Link} 
            to="/register"
            color="blue"
            size="sm"
          >
            Registrarse
          </Button>
        </div>
        
        {/* Auth Button - Mobile (only register) */}
        <div className="sm:hidden">
          <Button 
            as={Link} 
            to="/register"
            color="blue"
            size="sm"
            className="px-3 py-1.5 text-sm"
          >
            Registrarse
          </Button>
        </div>
        
        {/* Mobile Menu Toggle */}
        <Navbar.Toggle className="ml-2" />
      </div>

      {/* Navigation Links */}
      <Navbar.Collapse>
        <Navbar.Link 
          as={Link} 
          to="/" 
          className="font-medium text-secondary-700 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"
          active
        >
          Inicio
        </Navbar.Link>
        <Navbar.Link 
          href="#features"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('features');
          }}
          className="cursor-pointer font-medium text-secondary-700 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"
        >
          Características
        </Navbar.Link>
        <Navbar.Link 
          href="#pricing"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('pricing');
          }}
          className="cursor-pointer font-medium text-secondary-700 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"
        >
          Precios
        </Navbar.Link>
        <Navbar.Link 
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }}
          className="cursor-pointer font-medium text-secondary-700 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"
        >
          Contacto
        </Navbar.Link>
        
        {/* Mobile-only login link - register is already in header */}
        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-slate-700 sm:hidden">
          <Navbar.Link 
            as={Link} 
            to="/login"
            className="block w-full py-2 text-center font-medium text-secondary-700 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"
          >
            ¿Ya tienes cuenta? Iniciar Sesión
          </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};