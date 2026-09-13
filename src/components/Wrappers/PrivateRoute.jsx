import { Navigate } from 'react-router-dom';
import { Alert, Button, Spinner } from 'flowbite-react';
import { isTokenExpired } from '../../utils/auth';
import { useStore } from '../../app/store';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ element: Component, layout: Layout, accessToken, ...rest }) => {
  const authStatus = useStore((s) => s.authStatus);
  const storeToken = useStore((s) => s.accessToken);
  const bootstrapError = useStore((s) => s.bootstrapError);
  const token = storeToken || accessToken;

  if (authStatus === 'pending') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" aria-label="Cargando sesión" />
      </div>
    );
  }

  if (authStatus === 'error') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <Alert color="failure">
            <span>
              {bootstrapError ??
                'Sin conexión. Revisá tu conexión e intentá nuevamente.'}
            </span>
          </Alert>
          <Button
            className="mx-auto mt-4"
            onClick={() => window.dispatchEvent(new CustomEvent('auth:retry'))}
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (authStatus === 'guest' || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout {...rest}>
      <Component {...rest} />
    </Layout>
  );
};
