import { Navbar } from "flowbite-react";

// eslint-disable-next-line react/prop-types
export const HeaderLogin = ({ title }) => { 

  return (
    <>
      <Navbar fluid rounded className="rounded-b-sm">
        <Navbar.Brand href="#">
          
            <img src="img/image.png" alt="Logo" className="mr-3 h-6 sm:h-9" />
            <span className="text-lg font-bold">{ title }</span>
          
        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>Home</Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
