import { Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PRICING = [
  {
    name: 'Básico',
    price: '$49.990',
    period: '/mes',
    description: 'Para consultorios y policlínicos pequeños',
    features: [
      '1 caja registradora',
      'Hasta 500 transacciones/mes',
      'Reportes básicos',
      'Soporte por email',
    ],
    cta: 'Empezar gratis',
    highlight: false,
  },
  {
    name: 'Clínica',
    price: '$129.990',
    period: '/mes',
    description: 'Para clínicas y centros de salud medianos',
    features: [
      'Hasta 5 cajas registradoras',
      'Transacciones ilimitadas',
      'Facturación médica completa',
      'Integración FONASA / Isapres',
      'Reportes avanzados',
      'Soporte 24/7',
    ],
    cta: 'Solicitar demo',
    highlight: true,
  },
  {
    name: 'Hospital',
    price: 'Personalizado',
    period: '',
    description: 'Para hospitales y redes de salud',
    features: [
      'Cajas ilimitadas',
      'Multi-sucursal',
      'API de integración',
      'SLA garantizado',
      'Capacitación in-site',
      'Gerente de cuenta dedicado',
    ],
    cta: 'Contactar ventas',
    highlight: false,
  },
];

export const HomePricing = () => {
  return (
    <section
      id="pricing"
      className="bg-white dark:bg-slate-950"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2
            id="pricing-heading"
            className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl"
          >
            Planes para cada centro de salud
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
            Precios en pesos chilenos. Sin costos ocultos. Cancela cuando
            quieras.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {PRICING.map(
            ({ name, price, period, description, features, cta, highlight }) => (
              <article
                key={name}
                className={[
                  'relative flex flex-col rounded-2xl p-8',
                  highlight
                    ? 'border-2 border-primary-500 bg-primary-50 shadow-xl dark:border-primary-400 dark:bg-primary-900/20'
                    : 'border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800',
                ].join(' ')}
              >
                {highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary-600 px-4 py-1 text-xs font-bold text-white">
                      MÁS POPULAR
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                    {name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {description}
                  </p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    {price}
                  </span>
                  {period && (
                    <span className="ml-1 text-base text-gray-500 dark:text-gray-400">
                      {period}
                    </span>
                  )}
                </div>
                <ul
                  className="mb-8 flex-1 space-y-3"
                  aria-label={`Características del plan ${name}`}
                >
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="mt-0.5 shrink-0 text-primary-500 dark:text-primary-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  as={Link}
                  to="/register"
                  color={highlight ? 'blue' : 'light'}
                  size="lg"
                  className={[
                    'w-full transition-all focus:ring-4',
                    highlight
                      ? 'shadow-md hover:shadow-lg focus:ring-primary-300'
                      : 'focus:ring-gray-200',
                  ].join(' ')}
                >
                  {cta}
                </Button>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
