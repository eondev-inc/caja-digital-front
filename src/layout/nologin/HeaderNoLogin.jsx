import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

// eslint-disable-next-line react/prop-types
export const HeaderNoLogin = ({ title }) => { 
  const appliedTitle = title || "Caja Registradora Digital";
  const { scrollToSection } = useSmoothScroll();

  return (
    <Navbar 
      fluid 
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-sm sm:px-6"
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
          <span className="text-xl font-bold text-secondary-800">
            {appliedTitle}
          </span>
          <span className="hidden text-xs text-secondary-500 sm:block">
            Centros de Salud
          </span>
        </div>
      </Navbar.Brand>

      {/* Mobile Menu Toggle and Auth Buttons */}
      <div className="flex items-center gap-3 md:order-2">
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
          className="font-medium text-secondary-700 hover:text-primary-600"
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
          className="cursor-pointer font-medium text-secondary-700 hover:text-primary-600"
        >
          Características
        </Navbar.Link>
        <Navbar.Link 
          href="#pricing"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('pricing');
          }}
          className="cursor-pointer font-medium text-secondary-700 hover:text-primary-600"
        >
          Precios
        </Navbar.Link>
        <Navbar.Link 
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('contact');
          }}
          className="cursor-pointer font-medium text-secondary-700 hover:text-primary-600"
        >
          Contacto
        </Navbar.Link>
        
        {/* Mobile-only login link - register is already in header */}
        <div className="mt-6 border-t border-gray-200 pt-4 sm:hidden">
          <Navbar.Link 
            as={Link} 
            to="/login"
            className="block w-full py-2 text-center font-medium text-secondary-700 hover:text-primary-600"
          >
            ¿Ya tienes cuenta? Iniciar Sesión
          </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};