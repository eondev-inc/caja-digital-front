import React, { useState } from 'react';
import { Card } from "flowbite-react";

const OpenRegister = () => {
  const [initialAmount, setInitialAmount] = useState('');

  const handleInputChange = (e) => {
    setInitialAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to open the cash register with the initial amount
    console.log(`Opening register with initial amount: ${initialAmount}`);
  };

  return (
    <div className='flex mt-10'>
      <Card className='m-3 w-[460px] max-w-sm'>
        <h6 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-ali">
          Open Register
        </h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
      </Card>
    </div>
  );
};

export default OpenRegister;