import { Footer } from "flowbite-react";

export const FooterNoLogin = () => {

  return (
    <Footer container>
      <Footer.Copyright href="#" by="Flowbite™" year={new Date().getFullYear()} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
