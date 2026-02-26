import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-slate-950">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary-600 dark:text-primary-400">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">Página no encontrada</h2>
        <p className="mb-8 text-gray-600 dark:text-slate-400">
          La página que buscas no existe o fue movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-800"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
