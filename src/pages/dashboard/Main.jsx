import { Card } from "flowbite-react";


const Main = () => {
  const dashboardOptions = [
    {
      title: "Open Register",
      description: "Open a new cash register for your store",
      imgSrc: "img/cash-register.jpg",
      link: "/open-register"
    },
    {
      title: "Close Register",
      description: "Close an existing cash register for your store",
      imgSrc: "img/cash-register.jpg",
      link: "/close-register"
    },
    {
      title: "Sales",
      description: "View sales data for your store",
      imgSrc: "img/cash-register.jpg",
      link: "/sales"
    },
    {
      title: "Anullments",
      description: "Manage products for your store",
      imgSrc: "img/cash-register.jpg",
      link: "/anullments"
    },
    {
      title: "Customers",
      description: "Manage customers for your store",
      imgSrc: "img/cash-register.jpg",
      link: "/customers"
    },
    {
      title: "Settings",
      description: "Manage settings for your store",
      imgSrc: "img/cash-register.jpg",
      link: "/settings"
    }
  ]
  return (
    <section>
      <div className="container mx-auto mt-5 p-4">
        <div className="-mx-2 flex flex-wrap">
          {[...dashboardOptions].map((_, index) => (
            <Card className="m-3 max-w-sm cursor-pointer" imgSrc="img/cash-register.jpg" horizontal key={index} >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                { _.title }
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                { _.description }
              </p>

            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Main;