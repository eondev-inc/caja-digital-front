
import PropTypes from 'prop-types';
import { HeaderNoLogin } from "./HeaderNoLogin";
import { FooterNoLogin } from "./FooterNoLogin";

export const NoLoginLayout = ({ children, title }) => {
  const pageTitle = title || "Caja Registradora Digital";
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <HeaderNoLogin title={pageTitle} />
      
      {/* Main Content */}
      <main className="w-full flex-1">
        <div className="min-h-full">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <FooterNoLogin />
    </div>
  );
}

NoLoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};
