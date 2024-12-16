import { Navbar } from "flowbite-react";

// eslint-disable-next-line react/prop-types
export const HeaderNoLogin = ({ title }) => { 
  const appliedTitle = title || "Welcome to Cash Register";

  return (
    <>
      <Navbar fluid rounded className="sticky top-0 z-50 rounded-b-lg border-solid border-b-blue-200 shadow-md">
        <Navbar.Brand href="#">
          <img src="img/image.png" alt="Logo" className="mr-3 h-6 sm:h-9" />
          <span className="text-lg font-bold">{ appliedTitle }</span>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Link href="/" active>Home</Navbar.Link>
          <Navbar.Link href="/login">Login</Navbar.Link>
          <Navbar.Link href="/register">Register</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};