

// Define the NotFound component as a functional component
export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">404 Not Found</h1>
      <p className="text-lg text-gray-600">The page you are looking for does not exist.</p>
    </div>
  );
};

// Define prop types for the component
NotFound.propTypes = {
  // Add any prop types if necessary
};

export default NotFound;