import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHospital,
  faServer,
  faHeadset,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

const STATS = [
  { value: '500+', label: 'Centros de salud', icon: faHospital },
  { value: '99.9%', label: 'Disponibilidad', icon: faServer },
  { value: '24/7', label: 'Soporte técnico', icon: faHeadset },
  { value: '50k+', label: 'Transacciones diarias', icon: faChartLine },
];

export const HomeStats = () => {
  return (
    <section
      className="border-y border-neutral-100 bg-primary-600 dark:border-neutral-700 dark:bg-primary-800"
      aria-label="Estadísticas de Caja Digital"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map(({ value, label, icon }) => (
            <div key={label} className="text-center">
              <FontAwesomeIcon
                icon={icon}
                className="mb-3 text-2xl text-primary-200"
                aria-hidden="true"
              />
              <dt className="text-4xl font-bold text-white">{value}</dt>
              <dd className="mt-1 text-sm font-medium text-primary-100">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
