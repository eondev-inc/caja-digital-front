import { Badge, Button, Card } from "flowbite-react";

export const Home = () => {

  return (
    <>
      <section className="mx-5 mt-10 rounded-lg bg-slate-50 antialiased shadow-md dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Cash Register
            </h2>
            <p className="mt-4 text-base font-normal text-gray-500 dark:text-gray-400 sm:text-xl">
              Crafted with skill and care to help our clients grow their business!
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-20 gap-y-12 text-center sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="space-y-4">
              <div className="px-8">
                <Badge color="gray" size="sm">
                  Alphabet Inc.
                </Badge >
              </div>
              
              <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                Official website
              </h3>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                Flowbite helps you connect with friends, family and communities of people who share your interests.
              </p>
              <Button color="blue">
                View case study
                <svg aria-hidden="true" className="-mr-1 ml-2 size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg>
              </Button>
            </Card>

            <Card className="space-y-4">
              <div className="px-8">
                <Badge color="gray" size="sm">
                  Microsoft Corp.
                </Badge>
              </div>
              <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                Management system
              </h3>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                Flowbite helps you connect with friends, family and communities of people who share your interests.
              </p>
              <Button color="blue">
                View case study
                <svg aria-hidden="true" className="-mr-1 ml-2 size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg>
              </Button>
            </Card>

            <Card className="space-y-4">
              <div className="px-8">
                <Badge color="gray" size="sm">
                  Adoobe Inc.
                </Badge>
              </div>
              <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                Logo design
              </h3>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                Flowbite helps you connect with friends, family and communities of people who share your interests.
              </p>
              <Button href="#" color="blue">
                View case study
                <svg aria-hidden="true" className="-mr-1 ml-2 size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
