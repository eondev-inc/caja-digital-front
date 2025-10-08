import { Navbar, Button } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faHospital, faUserMd, faChartLine, faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
export const HeaderLogin = ({ title }) => {

  return (
    <>
      <Navbar fluid className="fixed inset-x-0 top-0 z-50 border-b-4 border-secondary-500 bg-white shadow-xl">
        <Navbar.Brand href="#" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-blue-600 shadow-sm">
            <FontAwesomeIcon icon={faCashRegister} className="size-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-800">POS Médico</span>
            <span className="hidden text-xs text-gray-600 sm:block">Sistema de Recepción</span>
          </div>
        </Navbar.Brand>
        
        <div className="flex items-center gap-6">
          {/* Status Indicators for POS */}
          <div className="hidden items-center gap-4 text-sm text-gray-600 lg:flex">
            <div className="flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-green-500"></div>
              <span className="font-medium">Sistema Activo</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faHospital} className="size-3 text-green-600" />
              <span className="font-medium">Clínica San Rafael</span>
            </div>
          </div>
          
          {/* Navigation Menu for POS Functions */}
          <Navbar.Collapse className="bg-gray-50/80 rounded-lg border border-gray-200 px-4 py-2 shadow-sm">
            <Navbar.Link 
              href="/dashboard" 
              className="flex items-center gap-2 font-medium text-green-600 hover:text-green-700"
              active
            >
              <FontAwesomeIcon icon={faChartLine} className="size-3" />
              Panel Principal
            </Navbar.Link>
            <Navbar.Link 
              href="/dashboard/open-register" 
              className="flex items-center gap-2 font-medium text-gray-600 hover:text-green-600"
            >
              <FontAwesomeIcon icon={faCashRegister} className="size-3" />
              Abrir Caja
            </Navbar.Link>
            <Navbar.Link 
              href="/dashboard/sales" 
              className="flex items-center gap-2 font-medium text-gray-600 hover:text-green-600"
            >
              <FontAwesomeIcon icon={faFileInvoice} className="size-3" />
              Ventas
            </Navbar.Link>
          </Navbar.Collapse>
          
          {/* Logout Button */}
          <Button
            size="sm"
            color="light"
            className="flex items-center gap-2 border-red-200 bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-300"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = '/login';
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="size-3" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </Navbar>
    </>
  )
}
