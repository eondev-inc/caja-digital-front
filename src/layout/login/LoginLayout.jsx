import { FooterLogin } from "./FooterLogin";
import { HeaderLogin } from "./HeaderLogin";

// eslint-disable-next-line react/prop-types
export const LoginLayout = ({ children }) => {
  
  const title = 'Sistema POS - Recepción Médica';
  
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 via-gray-50 to-blue-50">
      <HeaderLogin title={ title }/>
      <main className="relative grow overflow-hidden pt-20">
        {/* Background Pattern for POS App */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute left-10 top-10 size-20 rotate-12 rounded-lg border-2 border-green-300"></div>
          <div className="absolute right-20 top-32 size-16 rounded-full border-2 border-blue-300"></div>
          <div className="absolute bottom-20 left-1/4 size-12 rotate-45 rounded border-2 border-green-300"></div>
          <div className="absolute bottom-32 right-1/3 size-14 -rotate-12 rounded-lg border-2 border-blue-300"></div>
        </div>
        <div className="relative z-10">
          { children }
        </div>
      </main>
      <FooterLogin />
    </div>
  );
  
}
