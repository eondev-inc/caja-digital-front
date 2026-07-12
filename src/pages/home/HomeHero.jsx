import { Button } from 'flowbite-react';
import cajaImg from '/img/cash-register.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHospital,
  faArrowRight,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TRUST_BADGES = [
  'Sin tarjeta de crédito',
  'Implementación en 24h',
  'Soporte en español',
];

export const HomeHero = () => {
  return (
    <section
      className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
      aria-labelledby="main-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="dark:bg-primary-900/30 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 dark:border-primary-800">
              <span className="size-2 rounded-full bg-primary-500"></span>
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Para centros de salud en Chile
              </span>
            </div>

            <div className="space-y-4">
              <h1
                id="main-heading"
                className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl"
              >
                La caja que
                <span className="block text-primary-600 dark:text-primary-400">
                  cuida tu centro
                </span>
                <span className="block text-secondary-600 dark:text-secondary-400">
                  de salud
                </span>
              </h1>
              <p className="mx-auto max-w-xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 lg:mx-0">
                Gestión de pagos, facturación médica y reportes especializados —
                todo en una plataforma diseñada para el sector salud chileno.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                as={Link}
                to="/register"
                color="blue"
                size="xl"
                className="shadow-lg transition-all hover:shadow-xl focus:ring-4 focus:ring-primary-300"
                aria-label="Solicitar demostración de Caja Digital"
              >
                <FontAwesomeIcon
                  icon={faHospital}
                  className="mr-2"
                  aria-hidden="true"
                />
                Solicitar demo gratuita
              </Button>
              <Button
                href="#features"
                color="light"
                size="xl"
                className="shadow-sm transition-all hover:shadow-md focus:ring-4 focus:ring-secondary-300"
                aria-label="Ver características del sistema"
              >
                Ver características
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2"
                  aria-hidden="true"
                />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              {TRUST_BADGES.map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-primary-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-100 to-secondary-100 opacity-60 dark:opacity-20"
                aria-hidden="true"
              ></div>
              <img
                src={cajaImg}
                alt="Pantalla del sistema de caja registradora para centros médicos"
                className="relative size-72 rounded-2xl border border-gray-200 object-cover shadow-2xl dark:border-gray-700 sm:size-96"
                loading="eager"
                width="384"
                height="384"
              />
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 rounded-xl border border-primary-100 bg-white px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <div className="size-2 animate-pulse rounded-full bg-primary-500"></div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">
                    Sistema activo
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  99.9% uptime garantizado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
