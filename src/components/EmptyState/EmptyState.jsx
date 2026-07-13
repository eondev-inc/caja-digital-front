import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';

/**
 * Empty state primitive for data-driven pages.
 * Variants: default, info, warning, error.
 * Uses semantic tokens with dark mode parity.
 */
const variantStyles = {
  default: {
    bg: 'bg-neutral-50 dark:bg-neutral-800',
    border: 'border-neutral-200 dark:border-neutral-700',
    icon: 'text-neutral-400 dark:text-neutral-500',
    title: 'text-neutral-700 dark:text-neutral-200',
    desc: 'text-neutral-500 dark:text-neutral-400',
  },
  info: {
    bg: 'bg-info-50 dark:bg-info-900',
    border: 'border-info-200 dark:border-info-800',
    icon: 'text-info-500 dark:text-info-400',
    title: 'text-info-700 dark:text-info-300',
    desc: 'text-info-600 dark:text-info-400',
  },
  warning: {
    bg: 'bg-warning-50 dark:bg-warning-900',
    border: 'border-warning-200 dark:border-warning-800',
    icon: 'text-warning-500 dark:text-warning-400',
    title: 'text-warning-700 dark:text-warning-300',
    desc: 'text-warning-600 dark:text-warning-400',
  },
  error: {
    bg: 'bg-error-50 dark:bg-error-900',
    border: 'border-error-200 dark:border-error-800',
    icon: 'text-error-500 dark:text-error-400',
    title: 'text-error-700 dark:text-error-300',
    desc: 'text-error-600 dark:text-error-400',
  },
};

/* eslint-disable react/prop-types */
const EmptyState = ({
  icon,
  title = 'Sin datos',
  description = 'No hay información disponible en este momento.',
  action,
  variant = 'default',
}) => {
  const styles = variantStyles[variant] || variantStyles.default;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 rounded-xl border ${styles.border} ${styles.bg} p-8 text-center`}
    >
      <div className={styles.icon}>
        <FontAwesomeIcon
          icon={icon || faInbox}
          className="text-5xl"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-1">
        <h3 className={`text-lg font-semibold ${styles.title}`}>{title}</h3>
        <p className={`text-sm ${styles.desc}`}>{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;
