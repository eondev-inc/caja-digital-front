import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const MEDICAL_CHECKS = [
  'Facturación médica automatizada',
  'Códigos CIE-10 integrados',
  'Reportes para auditorías SII',
  'Integración con seguros médicos',
  'Control de inventario médico',
  'Trazabilidad de medicamentos',
  'Auditorías automáticas',
  'Backup automático de datos',
];

export const HomeMedicalChecks = () => {
  return (
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
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-sm text-white"
                />
              </div>
              <span className="text-sm font-medium text-white">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
