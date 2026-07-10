import { useState, useEffect } from 'react';
import {
  getPaymentMethods,
  getPrevisions,
  getProfessionals,
  getTransactionTypes,
} from '../../../../api';
import { useStore } from '../../../../app/store';

/**
 * Hook that manages Sales catalog data:
 * payment methods, previsions, professionals, and transaction types.
 */
export const useSalesCatalogs = () => {
  const { openRegister } = useStore();

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [previsions, setPrevisions] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [ventaTransactionTypeId, setVentaTransactionTypeId] = useState(null);

  // Cargar catálogos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [methods, prevs, profs, txTypes] = await Promise.all([
          getPaymentMethods(),
          getPrevisions(),
          getProfessionals(),
          getTransactionTypes(),
        ]);
        setPaymentMethods(Array.isArray(methods) ? methods : []);
        setPrevisions(Array.isArray(prevs) ? prevs : []);
        setProfessionals(Array.isArray(profs) ? profs : []);

        const ventaType = Array.isArray(txTypes)
          ? txTypes.find((t) => t.transaction_name === 'VENTA')
          : null;
        if (ventaType) {
          setVentaTransactionTypeId(ventaType.id);
        }
      } catch (error) {
        console.error('Error cargando catálogos:', error);
      }
    };

    fetchData();
  }, []);

  return {
    paymentMethods,
    previsions,
    professionals,
    ventaTransactionTypeId,
    openRegister,
  };
};
