import { Button, Card } from "flowbite-react";
import cajaImg from '/img/cash-register.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faShieldHeart, 
  faStethoscope, 
  faCheck,
  faHospital,
  faPlay
} from '@fortawesome/free-solid-svg-icons';

export const Home = () => {
  return (
    <main 
      className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800"
      role="main"
      aria-labelledby="main-heading"
    >
      <div className="container mx-auto px-4 py-12">
        <Card className="dark:bg-gray-900/90 mx-auto max-w-6xl overflow-hidden border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
          <header 
            className="grid gap-8 p-8 lg:grid-cols-2 lg:items-center lg:gap-12"
            role="banner"
            aria-labelledby="main-heading"
          >
            <div className="order-2 flex justify-center lg:order-1">
              <div className="relative">
                <img
                  src={cajaImg}
                  alt="Sistema de caja para centros médicos y hospitales"
                  className="size-64 rounded-2xl border border-gray-200 object-cover shadow-2xl transition-transform hover:scale-105 dark:border-gray-700 sm:size-80"
                  loading="lazy"
                  width="320"
                  height="320"
                />
                <div className="from-primary-500/20 to-secondary-500/20 absolute -inset-2 rounded-2xl"></div>
              </div>
            </div>
            <div className="order-1 space-y-6 text-center lg:order-2 lg:text-left">
              <div className="space-y-4">
                <h1 
                  id="main-heading"
                  className="text-4xl font-bold tracking-tight text-primary-600 dark:text-primary-400 sm:text-5xl lg:text-6xl"
                  role="heading" 
                  aria-level="1"
                >
                  <span className="sr-only">Solución integral de caja registradora digital especializada para</span>
                  Solución de Caja
                  <span className="block text-secondary-600 dark:text-secondary-400">para Centros de Salud</span>
                </h1>
                <p 
                  className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 lg:mx-0"
                  aria-describedby="main-heading"
                >
                  Optimiza la gestión financiera de tu centro médico con nuestra plataforma especializada. 
                  Control de <span className="font-semibold text-primary-600 dark:text-primary-400">pagos de pacientes</span>, 
                  <span className="font-semibold text-secondary-600 dark:text-secondary-400"> facturación médica</span> 
                  y reportes especializados para el sector salud.
                </p>
              </div>
              <nav className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start" aria-label="Acciones principales">
                <Button 
                  color="blue" 
                  size="xl" 
                  className="shadow-lg transition-all hover:shadow-xl focus:ring-4 focus:ring-primary-300"
                  aria-label="Implementar solución de caja en mi centro médico"
                  role="button"
                  tabIndex={0}
                >
                  <FontAwesomeIcon icon={faHospital} className="mr-2" aria-hidden="true" />
                  Implementar en mi centro
                </Button>
                <Button 
                  color="light" 
                  size="xl" 
                  className="shadow-lg transition-all hover:shadow-xl focus:ring-4 focus:ring-secondary-300"
                  aria-label="Ver demostración interactiva para centros médicos"
                  role="button"
                  tabIndex={0}
                >
                  <FontAwesomeIcon icon={faPlay} className="mr-2" aria-hidden="true" />
                  Demo médico
                </Button>
              </nav>
            </div>
          </header>
          <section 
            className="bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 px-8 py-16 dark:border-gray-700"
            aria-labelledby="features-heading"
            role="region"
          >
            <div className="mx-auto max-w-4xl">
              <div className="mb-16 text-center">
                <h2 
                  id="features-heading"
                  className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
                  role="heading"
                  aria-level="2"
                >
                  Diseñado especialmente para centros de salud
                </h2>
                <p 
                  className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400"
                  aria-describedby="features-heading"
                >
                  Una solución integral que cumple con las regulaciones del sector médico y optimiza la gestión administrativa de tu centro de salud.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="group cursor-default border-0 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
                  <div className="mb-6 flex justify-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-secondary-100 group-hover:bg-secondary-200 dark:bg-secondary-900">
                      <FontAwesomeIcon 
                        icon={faClock} 
                        className="text-2xl text-secondary-600 dark:text-secondary-400"
                        aria-label="Acceso médico 24/7"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Acceso 24/7 para emergencias
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Sistema disponible las 24 horas para atención de emergencias y gestión de pagos urgentes desde cualquier dispositivo.
                    </p>
                  </div>
                </Card>
                <Card className="group cursor-default border-0 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
                  <div className="mb-6 flex justify-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary-200 dark:bg-primary-900">
                      <FontAwesomeIcon 
                        icon={faShieldHeart} 
                        className="text-2xl text-primary-600 dark:text-primary-400"
                        aria-label="Seguridad médica HIPAA"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Cumplimiento normativo médico
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Cumple con HIPAA y regulaciones locales de protección de datos médicos. Auditorías automáticas y trazabilidad completa.
                    </p>
                  </div>
                </Card>
                <Card className="group cursor-default border-0 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 sm:col-span-2 lg:col-span-1">
                  <div className="mb-6 flex justify-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-secondary-100 group-hover:bg-secondary-200 dark:bg-secondary-900">
                      <FontAwesomeIcon 
                        icon={faStethoscope} 
                        className="text-2xl text-secondary-600 dark:text-secondary-400"
                        aria-label="Diseñado para personal médico"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Diseñado para personal médico
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Interfaz optimizada para el flujo de trabajo médico. Personal de recepción y enfermería puede operar sin capacitación extensa.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Sección de beneficios médicos específicos */}
          <section 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-12 text-white"
            aria-labelledby="medical-features-heading"
            role="region"
          >
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 text-center">
                <h2 
                  id="medical-features-heading"
                  className="mb-4 text-2xl font-bold sm:text-3xl"
                  role="heading"
                  aria-level="2"
                >
                  Características especializadas para centros de salud
                </h2>
                <p 
                  className="text-primary-100"
                  aria-describedby="medical-features-heading"
                >
                  Funcionalidades diseñadas específicamente para optimizar la gestión administrativa médica
                </p>
              </div>
              <ul 
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                role="list"
                aria-label="Lista de características médicas especializadas"
              >
                <li className="flex items-center space-x-3" role="listitem">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                    <FontAwesomeIcon icon={faCheck} className="text-sm text-white" />
                  </div>
                  <span className="text-sm font-medium">Facturación médica automatizada</span>
                </li>
                <li className="flex items-center space-x-3" role="listitem">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                    <FontAwesomeIcon icon={faCheck} className="text-sm text-white" />
                  </div>
                  <span className="text-sm font-medium">Códigos CIE-10 integrados</span>
                </li>
                <li className="flex items-center space-x-3" role="listitem">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                    <FontAwesomeIcon icon={faCheck} className="text-sm text-white" />
                  </div>
                  <span className="text-sm font-medium">Reportes epidemiológicos</span>
                </li>
                <li className="flex items-center space-x-3" role="listitem">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                    <FontAwesomeIcon icon={faCheck} className="text-sm text-white" />
                  </div>
                  <span className="text-sm font-medium">Integración con seguros médicos</span>
                </li>
                <li className="flex items-center space-x-3" role="listitem">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                    <FontAwesomeIcon icon={faCheck} className="text-sm text-white" />
                  </div>
                  <span className="text-sm font-medium">Control de inventario médico</span>
                </li>
                <li className="flex items-center space-x-3" role="listitem">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                    <FontAwesomeIcon icon={faCheck} className="text-sm text-white" />
                  </div>
                  <span className="text-sm font-medium">Trazabilidad de medicamentos</span>
                </li>
                <li className="flex items-center space-x-3" role="listitem">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                    <FontAwesomeIcon icon={faCheck} className="text-sm text-white" />
                  </div>
                  <span className="text-sm font-medium">Auditorías automáticas</span>
                </li>
                <li className="flex items-center space-x-3" role="listitem">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                    <FontAwesomeIcon icon={faCheck} className="text-sm text-white" />
                  </div>
                  <span className="text-sm font-medium">Backup automático de datos</span>
                </li>
              </ul>
            </div>
          </section>
        </Card>
      </div>
    </main>
  );
}
