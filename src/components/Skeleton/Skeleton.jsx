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
  // `block` keeps the div layout after switching to <output> (inline by default)
  const baseClasses =
    'animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded block';

  if (variant === 'circular') {
    const size = width || height || '3rem';
    return (
      <output
        className={`${baseClasses} rounded-full ${className}`}
        style={{ width: size, height: size }}
        aria-label="Cargando..."
      />
    );
  }

  if (variant === 'rectangular') {
    return (
      <output
        className={`${baseClasses} ${className}`}
        style={{
          width: width || '100%',
          height: height || '1rem',
        }}
        aria-label="Cargando..."
      />
    );
  }

  // Text variant: multiple lines
  return (
    <output className={`block space-y-2 ${className}`} aria-label="Cargando...">
      {Array.from({ length: lines }).map((_, i) => (
        <span
          key={i}
          className={`${baseClasses} h-4 ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </output>
  );
};

export default Skeleton;
