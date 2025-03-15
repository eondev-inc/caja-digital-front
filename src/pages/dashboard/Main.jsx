import { Breadcrumb, Card } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


const Main = () => {
  const navigateTo = useNavigate()
  const dashboardOptions = [
    {
      title: "Open Register",
      description: "Open a new cash register for your store",
      imgSrc: "img/cash-register.jpg",
      link: "./open-register"
    },
    {
      title: "Close Register",
      description: "Close an existing cash register for your store",
      imgSrc: "img/cash-register.jpg",
      link: "./close-register"
    },
    {
      title: "Sales",
      description: "View sales data for your store",
      imgSrc: "img/cash-register.jpg",
      link: "./sales"
    },
    {
      title: "Anullments",
      description: "Manage products for your store",
      imgSrc: "img/cash-register.jpg",
      link: "./anullments"
    },
    {
      title: "Customers",
      description: "Manage customers for your store",
      imgSrc: "img/cash-register.jpg",
      link: "./customers"
    },
    {
      title: "Settings",
      description: "Manage settings for your store",
      imgSrc: "img/cash-register.jpg",
      link: "./settings"
    }
  ]

  const goTo = (route) => {
    navigateTo(route)
  }
  return (
    <section>
      <div className="container mx-auto mt-1 max-w-screen-xl p-3">
        <Card className="mx-2 mt-8 p-5">
          <Breadcrumb>
            <Breadcrumb.Item href="#" icon={HiHome}>Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-2xl font-bold tracking-tight">
            Register Machine
          </h1>
          <p className="font-normal tracking-tight text-gray-700 dark:text-gray-400">
            Manage your finances online with everything you need. 
            <span className="font-bold">
              Open and close your register, 
              void transactions, balance, enter receipts, and check reports.
            </span>
          </p>
          <br className="border-solid"/>
          <div className="grid grid-cols-2 p-5">
          { [...dashboardOptions].map((element, index) => (
            <div  key={index} className="justify-center">
              <Card 
                className="mx-5 mb-5 h-[160px] w-[417px] max-w-[417px] cursor-pointer hover:shadow-lg" 
                imgSrc="img/cash-register.jpg" horizontal
                onClick={() => goTo(element.link)}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  { element.title }
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  { element.description }
                </p>
              </Card>
            </div>
          )) }
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Main;