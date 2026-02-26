import { Navbar, Button } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faHospital, faChartLine, faSignOutAlt, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../app/store';

export const HeaderLogin = () => {
  const navigate = useNavigate();
  const setAccessToken = useStore((s) => s.setAccessToken);
  const setIsAuthenticated = useStore((s) => s.setIsAuthenticated);
  const setUserInfo = useStore((s) => s.setUserInfo);
  const setOpenRegister = useStore((s) => s.setOpenRegister);
  const userInfo = useStore((s) => s.userInfo);

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
          </Navbar.Collapse>
          
          {/* Logout Button */}
          <Button
            size="sm"
            color="light"
            aria-label="Cerrar sesión"
            className="dark:bg-red-900/20 flex items-center gap-2 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-300 dark:border-red-800 dark:text-red-400"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="size-3" aria-hidden="true" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </Navbar>
    </>
  )
}
