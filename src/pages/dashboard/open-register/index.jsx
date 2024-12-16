import { Breadcrumb, Button, Card, Label, TextInput } from "flowbite-react";
import { HiHome } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { HiCalculator, HiCurrencyDollar } from 'react-icons/hi';
import { useState } from "react";

const OpenRegister = () => {
  const [initialAmount, setInitialAmount] = useState('');
  const navigate = useNavigate();
  const dateNow = new Date().toLocaleString();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInitialAmount(e.target.value);
    // Logic to open the cash register with the initial amount
    console.log(`Opening register with initial amount: ${initialAmount}`);
  };

  const goBack = () => {
    navigate('/dashboard');
    console.log('Going back to the dashboard');
  }

  return (
    <section>
      <div className="container mx-auto mt-1 max-w-screen-lg p-3">
        <Card className="mx-2 mt-8 p-5">
          <Breadcrumb>
            <Breadcrumb.Item 
              className='cursor-pointer'
              onClick={goBack} icon={HiHome}>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Open register</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="text-2xl font-bold tracking-tight">
            Open register
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Abre tu caja para registrar, ingresar comprobantes, <span className='font-semibold'>anular y ver tu historial de movimientos.</span>
          </p>
          <hr></hr>

          <Card>
            <div className='flex flex-col p-2'>
              <div className='flex flex-row justify-start'>
                <div><HiCalculator className='text-[36px] text-blue-500'/></div>
                <div className='p-1'><span className='text-gray-500 dark:text-gray-400'>Register Data</span></div>
              </div>

              <div className='mt-3 flex flex-row justify-between'>
                <div className='flex flex-col'>
                  <p><span className='mr-4 font-semibold'>Nombre del cajero </span>Yerffrey Romero</p>
                  <p><span className='mr-20 font-semibold'>Rut cajero</span> 25121892-7</p>
                </div>
                <div className='flex flex-col'>
                  <p><span className='mr-4 font-semibold'>Código de lugar</span> 60002</p>
                  <p></p>
                </div>

                <div className='mr-20 flex flex-col'>
                  <p><span className='mr-4 font-semibold'>Company</span>Alkaeda Inc.</p>
                  <p><span className='mr-4 font-semibold'>Shift Init </span> {dateNow}</p>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className='flex flex-col'>
              <div>
                <h2 className='text-xl font-semibold text-blue-500'>Initial amount</h2>
              </div>
              <div className='flex flex-row justify-items-start'>
                <div>
                  <div className="mb-2">
                    <Label htmlFor="email1" value="Your email" />
                  </div>
                  <TextInput 
                    id="email1" 
                    type="email"
                    value={initialAmount}
                    placeholder="name@flowbite.com" 
                    icon={HiCurrencyDollar} 
                    required 
                  />
                </div>
                <div>
                  <Button color="blue" className='mx-6 mt-8' onClick={handleSubmit}>Open register</Button>
                </div>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </section>
  );
};

export default OpenRegister;