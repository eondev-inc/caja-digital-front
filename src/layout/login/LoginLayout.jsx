import { FooterLogin } from "./FooterLogin";
import { HeaderLogin } from "./HeaderLogin";

// eslint-disable-next-line react/prop-types
export const LoginLayout = ({ children }) => {
  
  const title = 'My App';
  
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <HeaderLogin title={ title }/>
      <main className='grow' >{ children }</main>
      <FooterLogin />
    </div>
  );
  
}
