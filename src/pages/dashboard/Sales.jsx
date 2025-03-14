import React, { useState, useEffect } from 'react';
import { Button, TextInput, Select, Textarea, Card } from 'flowbite-react';
import { getPaymentMethods } from '../../api/general-settings/payment-methods.get';

const Sales = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [items, setItems] = useState([{ description: '', amount: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch payment methods from the endpoint
    getPaymentMethods()
      .then(response => setPaymentMethods(response))
      .catch(error => console.error('Error fetching payment methods:', error));
  }, []);

  useEffect(() => {
    // Calculate total amount
    const total = items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    setTotalAmount(total);
  }, [items]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', amount: 0 }]);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = () => {
    const saleData = {
      paymentMethod: selectedPaymentMethod,
      items,
      totalAmount
    };
    console.log('Sale data:', saleData);
  };

  return (
    <>
      <Card className="mb-6">
        
      </Card>
    </>
  );
};

export default Sales;