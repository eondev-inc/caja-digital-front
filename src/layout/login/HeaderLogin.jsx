import { Navbar, Button } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faHospital, faChartLine, faSignOutAlt, faFileInvoice, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../app/store';
import { useDarkMode } from '../../hooks/useDarkMode';

export const HeaderLogin = () => {
  const navigate = useNavigate();
  const setAccessToken = useStore((s) => s.setAccessToken);
  const setIsAuthenticated = useStore((s) => s.setIsAuthenticated);
  const setUserInfo = useStore((s) => s.setUserInfo);
  const setOpenRegister = useStore((s) => s.setOpenRegister);
  const userInfo = useStore((s) => s.userInfo);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const entityName =
    userInfo?.entity_users?.[0]?.entities?.name ?? "Centro de Salud";

  const handleLogout = () => {
    setAccessToken('');
    setIsAuthenticated(false);
    setUserInfo({});
    setOpenRegister({});
    navigate('/login');
  };

  return (
    <>
      <Navbar fluid className="fixed inset-x-0 top-0 z-50 border-b-4 border-secondary-500 bg-white shadow-xl dark:border-secondary-600 dark:bg-slate-900">
        <Navbar.Brand href="#" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 shadow-sm">
            <FontAwesomeIcon icon={faCashRegister} className="size-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-800 dark:text-white">Caja Digital</span>
            <span className="hidden text-xs text-gray-600 dark:text-gray-400 sm:block">Sistema de Recepción</span>
          </div>
        </Navbar.Brand>

        <div className="flex items-center gap-6">
          {/* Status Indicators for POS */}
          <div className="hidden items-center gap-4 text-sm text-gray-600 dark:text-gray-400 lg:flex">
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-primary-500"></div>
              <span className="font-medium">Sistema Activo</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faHospital} className="size-3 text-primary-600 dark:text-primary-400" />
              <span className="font-medium">{entityName}</span>
            </div>
          </div>

          {/* Navigation Menu for POS Functions */}
          <Navbar.Collapse className="bg-gray-50/80 dark:bg-slate-800/80 rounded-lg border border-gray-200 px-4 py-2 shadow-sm dark:border-slate-700">
            <Navbar.Link
              href="/dashboard"
              className="flex items-center gap-2 font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
              active
            >
              <FontAwesomeIcon icon={faChartLine} className="size-3" />
              Panel Principal
            </Navbar.Link>
            <Navbar.Link
              href="/dashboard/open-register"
              className="flex items-center gap-2 font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <FontAwesomeIcon icon={faCashRegister} className="size-3" />
              Abrir Caja
            </Navbar.Link>
            <Navbar.Link
              href="/dashboard/sales"
              className="flex items-center gap-2 font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <FontAwesomeIcon icon={faFileInvoice} className="size-3" />
              Ventas
            </Navbar.Link>
            <Navbar.Link
              href="/dashboard/reports"
              className="flex items-center gap-2 font-medium text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <FontAwesomeIcon icon={faChartBar} className="size-3" />
              Reportes
            </Navbar.Link>
          </Navbar.Collapse>

          {/* Logout Button */}
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

          <Button
            size="sm"
            color="light"
            aria-label="Cerrar sesión"
            className="dark:bg-red-900/20 flex items-center gap-2 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-300 dark:border-red-800 dark:text-red-400"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="size-4" aria-hidden="true" />
            <span className="ml-2 hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </Navbar>
    </>
  )
}
