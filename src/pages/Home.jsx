import { Button } from "flowbite-react";
import cajaImg from '/img/cash-register.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faShieldHeart,
  faStethoscope,
  faCheck,
  faHospital,
  faArrowRight,
  faChartLine,
  faHeadset,
  faServer,
  faBolt,
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

/* ─── Static color class maps (avoids dynamic Tailwind strings) ─────────── */

const COLOR_CLASSES = {
  primary: {
    bg: "bg-primary-100",
    bgHover: "group-hover:bg-primary-200",
    bgDark: "dark:bg-primary-900/40",
    text: "text-primary-600",
    textDark: "dark:text-primary-400",
  },
  secondary: {
    bg: "bg-secondary-100",
    bgHover: "group-hover:bg-secondary-200",
    bgDark: "dark:bg-secondary-900/40",
    text: "text-secondary-600",
    textDark: "dark:text-secondary-400",
  },
};

/* ─── Data ─────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: faClock,
    color: "secondary",
    title: "Disponible 24/7",
    description:
      "Acceso permanente para emergencias y turnos nocturnos. Gestión de pagos urgentes desde cualquier dispositivo.",
  },
  {
    icon: faShieldHeart,
    color: "primary",
    title: "Normativa médica",
    description:
      "Cumple regulaciones de protección de datos médicos vigentes en Chile. Auditorías automáticas y trazabilidad completa.",
  },
  {
    icon: faStethoscope,
    color: "secondary",
    title: "Fácil para el equipo",
    description:
      "Interfaz diseñada para recepción y enfermería. Personal operativo sin capacitación extensa.",
  },
  {
    icon: faFileInvoice,
    color: "primary",
    title: "Facturación médica",
    description:
      "Emisión de boletas y facturas adaptadas al sector salud. Integración con seguros y FONASA.",
  },
  {
    icon: faBolt,
    color: "secondary",
    title: "Alta velocidad",
    description:
      "Cobros completados en segundos. Sin tiempos de espera que afecten la atención al paciente.",
  },
  {
    icon: faServer,
    color: "primary",
    title: "Datos seguros",
    description:
      "Backups automáticos y encriptación de extremo a extremo. Tu información siempre protegida.",
  },
];

const STATS = [
  { value: "500+", label: "Centros de salud", icon: faHospital },
  { value: "99.9%", label: "Disponibilidad", icon: faServer },
  { value: "24/7", label: "Soporte técnico", icon: faHeadset },
  { value: "50k+", label: "Transacciones diarias", icon: faChartLine },
];

const MEDICAL_CHECKS = [
  "Facturación médica automatizada",
  "Códigos CIE-10 integrados",
  "Reportes para auditorías SII",
  "Integración con seguros médicos",
  "Control de inventario médico",
  "Trazabilidad de medicamentos",
  "Auditorías automáticas",
  "Backup automático de datos",
];

const PRICING = [
  {
    name: "Básico",
    price: "$49.990",
    period: "/mes",
    description: "Para consultorios y policlínicos pequeños",
    features: [
      "1 caja registradora",
      "Hasta 500 transacciones/mes",
      "Reportes básicos",
      "Soporte por email",
    ],
    cta: "Empezar gratis",
    highlight: false,
  },
  {
    name: "Clínica",
    price: "$129.990",
    period: "/mes",
    description: "Para clínicas y centros de salud medianos",
    features: [
      "Hasta 5 cajas registradoras",
      "Transacciones ilimitadas",
      "Facturación médica completa",
      "Integración FONASA / Isapres",
      "Reportes avanzados",
      "Soporte 24/7",
    ],
    cta: "Solicitar demo",
    highlight: true,
  },
  {
    name: "Hospital",
    price: "Personalizado",
    period: "",
    description: "Para hospitales y redes de salud",
    features: [
      "Cajas ilimitadas",
      "Multi-sucursal",
      "API de integración",
      "SLA garantizado",
      "Capacitación in-site",
      "Gerente de cuenta dedicado",
    ],
    cta: "Contactar ventas",
    highlight: false,
  },
];

/* ─── Component ─────────────────────────────────────────── */

export const Home = () => {
  return (
    <div
      className="min-h-screen bg-white dark:bg-slate-950"
      aria-labelledby="main-heading"
    >

      {/* ── HERO ─────────────────────────────────────────── */}
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
                  Gestión de pagos, facturación médica y reportes especializados — todo en una plataforma diseñada para el sector salud chileno.
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
                  <FontAwesomeIcon icon={faHospital} className="mr-2" aria-hidden="true" />
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
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" aria-hidden="true" />
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                {[
                  "Sin tarjeta de crédito",
                  "Implementación en 24h",
                  "Soporte en español",
                ].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-primary-500"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-100 to-secondary-100 opacity-60 dark:opacity-20" aria-hidden="true"></div>
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
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">Sistema activo</span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">99.9% uptime garantizado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section
        className="border-y border-gray-100 bg-primary-600 dark:border-slate-700 dark:bg-primary-800"
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
                <dd className="mt-1 text-sm font-medium text-primary-100">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
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
              Cada función pensada para el flujo de trabajo médico y las regulaciones del sector salud chileno.
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
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDICAL CHECKS ───────────────────────────────── */}
      <section
        className="bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-700 dark:to-secondary-700"
        aria-labelledby="checks-heading"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2
              id="checks-heading"
              className="mb-3 text-3xl font-bold text-white sm:text-4xl"
            >
              Funcionalidades especializadas
            </h2>
            <p className="text-primary-100">
              Todo lo que necesita un centro de salud moderno en un solo sistema.
            </p>
          </div>
          <ul
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Lista de funcionalidades médicas especializadas"
          >
            {MEDICAL_CHECKS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon icon={faCheck} className="text-sm text-white" />
                </div>
                <span className="text-sm font-medium text-white">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
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
              Precios en pesos chilenos. Sin costos ocultos. Cancela cuando quieras.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {PRICING.map(({ name, price, period, description, features, cta, highlight }) => (
              <article
                key={name}
                className={[
                  "relative flex flex-col rounded-2xl p-8",
                  highlight
                    ? "border-2 border-primary-500 bg-primary-50 shadow-xl dark:border-primary-400 dark:bg-primary-900/20"
                    : "border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800",
                ].join(" ")}
              >
                {highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary-600 px-4 py-1 text-xs font-bold text-white">
                      MÁS POPULAR
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{price}</span>
                  {period && (
                    <span className="ml-1 text-base text-gray-500 dark:text-gray-400">{period}</span>
                  )}
                </div>
                <ul className="mb-8 flex-1 space-y-3" aria-label={`Características del plan ${name}`}>
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="mt-0.5 shrink-0 text-primary-500 dark:text-primary-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  as={Link}
                  to="/register"
                  color={highlight ? "blue" : "light"}
                  size="lg"
                  className={[
                    "w-full transition-all focus:ring-4",
                    highlight
                      ? "shadow-md hover:shadow-lg focus:ring-primary-300"
                      : "focus:ring-gray-200",
                  ].join(" ")}
                >
                  {cta}
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────── */}
      <section
        id="contact"
        className="bg-gray-50 dark:bg-slate-900"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2
            id="cta-heading"
            className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl"
          >
            Listo para modernizar tu centro de salud
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-gray-600 dark:text-gray-400">
            Únete a más de 500 centros de salud que ya gestionan sus cobros con Caja Digital. Implementación en 24 horas.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              as={Link}
              to="/register"
              color="blue"
              size="xl"
              className="shadow-lg transition-all hover:shadow-xl focus:ring-4 focus:ring-primary-300"
              aria-label="Crear cuenta gratuita en Caja Digital"
            >
              <FontAwesomeIcon icon={faHospital} className="mr-2" aria-hidden="true" />
              Crear cuenta gratuita
            </Button>
            <Button
              as={Link}
              to="/login"
              color="light"
              size="xl"
              className="transition-all focus:ring-4 focus:ring-gray-200"
            >
              Iniciar sesión
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
            Sin tarjeta de crédito · Cancela cuando quieras · Soporte en español
          </p>
        </div>
      </section>

    </div>
  );
};
