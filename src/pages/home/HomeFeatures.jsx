import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faShieldHeart,
  faStethoscope,
  faFileInvoice,
  faBolt,
  faServer,
} from '@fortawesome/free-solid-svg-icons';

const COLOR_CLASSES = {
  primary: {
    bg: 'bg-primary-100',
    bgHover: 'group-hover:bg-primary-200',
    bgDark: 'dark:bg-primary-900/40',
    text: 'text-primary-600',
    textDark: 'dark:text-primary-400',
  },
  secondary: {
    bg: 'bg-secondary-100',
    bgHover: 'group-hover:bg-secondary-200',
    bgDark: 'dark:bg-secondary-900/40',
    text: 'text-secondary-600',
    textDark: 'dark:text-secondary-400',
  },
};

const FEATURES = [
  {
    icon: faClock,
    color: 'secondary',
    title: 'Disponible 24/7',
    description:
      'Acceso permanente para emergencias y turnos nocturnos. Gestión de pagos urgentes desde cualquier dispositivo.',
  },
  {
    icon: faShieldHeart,
    color: 'primary',
    title: 'Normativa médica',
    description:
      'Cumple regulaciones de protección de datos médicos vigentes en Chile. Auditorías automáticas y trazabilidad completa.',
  },
  {
    icon: faStethoscope,
    color: 'secondary',
    title: 'Fácil para el equipo',
    description:
      'Interfaz diseñada para recepción y enfermería. Personal operativo sin capacitación extensa.',
  },
  {
    icon: faFileInvoice,
    color: 'primary',
    title: 'Facturación médica',
    description:
      'Emisión de boletas y facturas adaptadas al sector salud. Integración con seguros y FONASA.',
  },
  {
    icon: faBolt,
    color: 'secondary',
    title: 'Alta velocidad',
    description:
      'Cobros completados en segundos. Sin tiempos de espera que afecten la atención al paciente.',
  },
  {
    icon: faServer,
    color: 'primary',
    title: 'Datos seguros',
    description:
      'Backups automáticos y encriptación de extremo a extremo. Tu información siempre protegida.',
  },
];

export const HomeFeatures = () => {
  return (
    <section
      id="features"
      className="bg-gray-50 dark:bg-slate-900"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2
            id="features-heading"
            className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl"
          >
            Diseñado para centros de salud
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Cada función pensada para el flujo de trabajo médico y las
            regulaciones del sector salud chileno.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon, color, title, description }) => (
            <article
              key={title}
              className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-5">
                <div
                  className={`inline-flex size-14 items-center justify-center rounded-xl ${COLOR_CLASSES[color].bg} ${COLOR_CLASSES[color].bgHover} ${COLOR_CLASSES[color].bgDark}`}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className={`text-xl ${COLOR_CLASSES[color].text} ${COLOR_CLASSES[color].textDark}`}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
