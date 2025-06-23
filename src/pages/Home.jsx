import { Badge, Button, Card } from "flowbite-react";
import cajaImg from '/img/cash-register.jpg';

export const Home = () => {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center">
      <Card className="bg-white dark:bg-gray-900 max-w-5xl w-full mx-auto my-12 rounded-lg shadow-xl border-0">
        <header className="flex flex-col md:flex-row items-center gap-8 p-8">
          <img
            src={cajaImg}
            alt="Caja registradora digital"
            className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            loading="lazy"
            width="320"
            height="320"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-2">
              Caja Registradora Digital
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Gestiona tus ventas, controla tu caja y lleva el registro de tus transacciones de manera simple, segura y desde cualquier lugar. ¡Convierte tu negocio en una experiencia digital!
            </p>
            <Button color="blue" size="lg" className="mt-2" aria-label="Comenzar ahora">
              Comenzar ahora
            </Button>
          </div>
        </header>
        <section className="px-8 pb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">
            ¿Por qué elegir nuestra caja registradora web?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="space-y-4 border-0 shadow-none bg-transparent">
              <Badge color="info" className="font-medium justify-center mx-auto w-fit" aria-label="Accesible 24/7">
                Accesible 24/7
              </Badge>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Siempre disponible
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Accede a tu caja y gestiona tus ventas desde cualquier dispositivo, en cualquier momento y lugar.
              </p>
            </Card>
            <Card className="space-y-4 border-0 shadow-none bg-transparent">
              <Badge color="success" className="font-medium justify-center mx-auto w-fit" aria-label="Seguridad avanzada">
                Seguridad avanzada
              </Badge>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Tus datos protegidos
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Utilizamos tecnología de cifrado y copias de seguridad automáticas para que tu información esté siempre segura.
              </p>
            </Card>
            <Card className="space-y-4 border-0 shadow-none bg-transparent">
              <Badge color="purple" className="font-medium justify-center mx-auto w-fit" aria-label="Fácil de usar">
                Fácil de usar
              </Badge>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Interfaz intuitiva
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">
                Diseñada para que cualquier persona pueda registrar ventas y controlar la caja sin complicaciones.
              </p>
            </Card>
          </div>
        </section>
      </Card>
    </main>
  );
}
