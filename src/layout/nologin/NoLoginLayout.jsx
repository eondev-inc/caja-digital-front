
import PropTypes from 'prop-types';
import { HeaderNoLogin } from "./HeaderNoLogin";
import { FooterNoLogin } from "./FooterNoLogin";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

export const NoLoginLayout = ({ children, title }) => {
  const pageTitle = title || "Caja Digital";
  
  return (
    <div className="flex min-h-screen flex-col bg-primary-50 dark:bg-primary-950">
      {/* Header */}
      <HeaderNoLogin title={pageTitle} />
      
      {/* Main Content */}
      <main className="w-full flex-1">
        <div className="min-h-full">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
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
