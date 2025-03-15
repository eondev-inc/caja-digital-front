import { Navbar } from "flowbite-react";

// eslint-disable-next-line react/prop-types
export const HeaderLogin = ({ title }) => {

  return (
    <>
      <Navbar fluid rounded className="rounded-b-xl">
        <Navbar.Brand href="#">

          <img src="img/image.png" alt="Logo" className="mr-3 h-6 sm:h-9" />
          <span className="text-lg font-bold">{title}</span>

        </Navbar.Brand>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>Dashboard</Navbar.Link>
          <Navbar.Link href="#">Open Register</Navbar.Link>
          <Navbar.Link href="#">Close Register</Navbar.Link>

        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
