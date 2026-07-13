/**
 * Skeleton loading primitive.
 * Variants: text (animated lines), circular, rectangular.
 * Uses semantic tokens with dark mode parity.
 */
/* eslint-disable react/prop-types */
const Skeleton = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
}) => {
  const baseClasses =
    'animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded';

  if (variant === 'circular') {
    const size = width || height || '3rem';
    return (
      <div
        className={`${baseClasses} rounded-full ${className}`}
        style={{ width: size, height: size }}
        role="status"
        aria-label="Cargando..."
      />
    );
  }

  if (variant === 'rectangular') {
    return (
      <div
        className={`${baseClasses} ${className}`}
        style={{
          width: width || '100%',
          height: height || '1rem',
        }}
        role="status"
        aria-label="Cargando..."
      />
    );
  }

  // Text variant: multiple lines
  return (
    <div className={`space-y-2 ${className}`} role="status" aria-label="Cargando...">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${baseClasses} h-4 ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

export default Skeleton;
