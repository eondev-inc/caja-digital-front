import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

/**
 * Error boundary — catches render errors in child tree.
 * Logs to console (future Sentry hook). Renders fallback UI.
 * Uses semantic tokens with dark mode parity.
 */
/* eslint-disable react/prop-types */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Console error for now — future Sentry hook
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center gap-4 rounded-xl border border-error-200 bg-error-50 p-8 text-center dark:border-error-800 dark:bg-error-900"
        >
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-4xl text-error-500 dark:text-error-400"
            aria-hidden="true"
          />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-error-700 dark:text-error-300">
              Algo salió mal
            </h3>
            <p className="text-sm text-error-600 dark:text-error-400">
              Ocurrió un error inesperado. Por favor, recarga la página.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-error-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-fast hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-300 focus:ring-offset-2 dark:bg-error-700 dark:hover:bg-error-600 dark:focus:ring-error-800"
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
