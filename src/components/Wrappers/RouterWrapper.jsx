// eslint-disable-next-line react/prop-types
export const RouterWrapper = ({ element: Component, layout: Layout, ...rest}) => {
 // Implement logic for authentication
  return (
    <Layout {...rest}>
      <Component {...rest} />
    </Layout>
  );
}
