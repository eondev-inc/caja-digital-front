import { FooterLogin } from "./FooterLogin";
import { HeaderLogin } from "./HeaderLogin";

// eslint-disable-next-line react/prop-types
export const LoginLayout = ({ children }) => {
  
  const title = 'My App';
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <HeaderLogin title={ title }/>
      <main className='grow' >{ children }</main>
      <FooterLogin />
    </div>
  );
  
}
