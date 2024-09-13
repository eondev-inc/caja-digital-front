import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ element: Component, layout: Layout, isAuthenticated, ...rest}) => {
  
  return (
    isAuthenticated ? (
      <Layout {...rest}>
        <Component {...rest} />
      </Layout>
    ) : (
      <Navigate to="/login" replace/>
    )
  );
};
