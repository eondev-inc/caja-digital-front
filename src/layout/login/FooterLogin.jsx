import { Footer } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital, faPhone, faMapMarkerAlt, faClock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

export const FooterLogin = () => {

  return (
    <Footer className="border-t-4 border-green-500 bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-4 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            {/* Información de la Clínica */}
            <div>
              <Footer.Title title="Clínica San Rafael" className="mb-3 text-white" />
              <Footer.LinkGroup col className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="size-3 text-green-400" />
                  <span>Av. Salud 123, Centro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faPhone} className="size-3 text-green-400" />
                  <span>+56 2 1234 5678</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faClock} className="size-3 text-green-400" />
                  <span>Lun-Vie: 8:00-18:00</span>
                </div>
              </Footer.LinkGroup>
            </div>

            {/* Sistema POS */}
            <div>
              <Footer.Title title="Sistema POS" className="mb-3 text-white" />
              <Footer.LinkGroup col className="space-y-2 text-gray-300">
                <Footer.Link href="#" className="text-sm text-gray-300 hover:text-green-400">
                  Manual de Usuario
                </Footer.Link>
                <Footer.Link href="#" className="text-sm text-gray-300 hover:text-green-400">
                  Soporte Técnico
                </Footer.Link>
                <Footer.Link href="#" className="text-sm text-gray-300 hover:text-green-400">
                  Configuración
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            {/* Seguridad */}
            <div>
              <Footer.Title title="Seguridad" className="mb-3 text-white" />
              <Footer.LinkGroup col className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2 text-sm">
                  <FontAwesomeIcon icon={faShieldAlt} className="size-3 text-green-400" />
                  <span>Datos Protegidos</span>
                </div>
                <Footer.Link href="#" className="text-sm text-gray-300 hover:text-green-400">
                  Políticas de Privacidad
                </Footer.Link>
                <Footer.Link href="#" className="text-sm text-gray-300 hover:text-green-400">
                  Términos de Uso
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        
        {/* Copyright Bar */}
        <Footer.Divider className="border-gray-600" />
        <div className="w-full py-4 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright 
            href="#" 
            by="Sistema POS Médico" 
            year={new Date().getFullYear()}
            className="text-gray-400"
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FontAwesomeIcon icon={faHospital} className="size-4 text-green-500" />
              <span>Versión 2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );

}