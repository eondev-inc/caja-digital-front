import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/auth';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ element: Component, layout: Layout, accessToken, ...rest }) => {
  const expired = isTokenExpired(accessToken);
  if (expired) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout {...rest}>
      <Component {...rest} />
    </Layout>
  );
};
