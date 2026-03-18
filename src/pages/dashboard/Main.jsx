import { Breadcrumb, Card } from "flowbite-react";
import { HiHome, HiChevronRight } from "react-icons/hi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faCalculator, faTimes, faChartBar, faFolder } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


const Main = () => {
  const navigateTo = useNavigate()
  const dashboardOptions = [
    {
      title: "Apertura de caja",
      description: "Abre aquí tu caja diariamente para asociar las distintas transacciones de dinero directamente a caja.",
      icon: faFolder,
      link: "/dashboard/open-register"
    },
    {
      title: "Ingreso de comprobante",
      description: "Ingresa aquí los comprobantes de pago de las transacciones realizadas.",
      icon: faFileInvoice,
      link: "/dashboard/sales"
    },
    {
      title: "Cuadratura y cierre de caja",
      description: "Realiza aquí el recuento diario y cierre de tu caja para consolidar las transacciones de dinero de tu centro médico.",
      icon: faCalculator,
      link: "/dashboard/close-register"
    },
    {
      title: "Anulación de movimiento",
      description: "Anula aquí los movimientos que necesites. Podrás revisar las transacciones en el historial.",
      icon: faTimes,
      link: "/dashboard/anullments"
    },
    {
      title: "Reportes",
      description: "Revisa aquí el resumen de transacciones de dinero por financiador e histórico de cortes de caja.",
      icon: faChartBar,
      link: "/dashboard/reports"
    }
  ]

  const goTo = (route) => {
    navigateTo(route)
  }
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <Card className="mx-2 mt-8 border border-gray-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <Breadcrumb>
            <Breadcrumb.Item href="#" icon={HiHome} className="text-primary-600 dark:text-primary-400">Inicio</Breadcrumb.Item>
            <Breadcrumb.Item href="#" className="text-gray-600 dark:text-slate-400">Sistema POS</Breadcrumb.Item>
          </Breadcrumb>
          <div className="mb-6 mt-4">
            <h1 className="mb-2 text-3xl font-bold text-gray-800 dark:text-slate-100">
              Sistema de Caja Registradora
            </h1>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-slate-400">
              Gestiona las finanzas de tu centro médico con todas las herramientas necesarias. 
              <span className="font-semibold text-secondary-700 dark:text-secondary-400">
                {' '}Abre y cierra tu caja registradora, 
                anula transacciones, balancea movimientos, ingresa comprobantes y revisa reportes.
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          { [...dashboardOptions].map((element, index) => (
            <Card 
              key={index}
              className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:bg-gray-50 hover:shadow-lg dark:border-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
              onClick={() => goTo(element.link)}
            >
              <div className="flex items-center gap-6">
                {/* Icono */}
                <FontAwesomeIcon 
                  icon={element.icon} 
                  className="size-10 text-secondary-600 dark:text-secondary-400"
                />
                
                {/* Contenido */}
                <div className="flex-1">
                  <h5 className="mb-1 text-lg font-semibold text-gray-800 dark:text-slate-100">
                    { element.title }
                  </h5>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                    { element.description }
                  </p>
                </div>

                {/* Indicador de acción */}
                <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-slate-600 dark:text-slate-300">
                  <HiChevronRight className="size-5" />
                </div>
              </div>
            </Card>
          )) }
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Main;
