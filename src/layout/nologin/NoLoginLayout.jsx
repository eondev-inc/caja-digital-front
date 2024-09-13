
import { HeaderNoLogin } from "./HeaderNoLogin";
import { FooterNoLogin } from "./FooterNoLogin";

export const NoLoginLayout = ({ children }) => {
  const title = "No Login Layout";
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderNoLogin title={title}/>
      <main className="grow">{ children }</main>
      <FooterNoLogin 
        className="!static mx-auto mt-auto max-w-[1430px] !shadow-none"
      />
    </div>
  );
  
} 
