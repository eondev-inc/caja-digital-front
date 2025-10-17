import axiosInstance from '../axios';

/**
 * Limpia y valida un valor numérico
 * @param {*} value - Valor a limpiar
 * @returns {number} Número válido
 */
const cleanNumber = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
};

/**
 * Verifica si un valor está definido y no es vacío
 * @param {*} value - Valor a verificar
 * @returns {boolean} True si está definido
 */
const isDefined = (value) => 
  value !== undefined && 
  value !== null && 
  !(typeof value === 'string' && value.trim() === '');

/**
 * Crea un cierre de caja con los datos de cuadratura
 * 
 * @param {Object} data - Datos del cierre de caja
 */
export const createReconciliation = async (data) => {
  try {
    const {
      open_register_id,
      closing_balance,
      total_sales,
      sales_summary = {},
      notes,
    } = data;

    // Construir el payload limpio
    const payload = {
      open_register_id: open_register_id?.trim() ?? '',
      closing_balance: cleanNumber(closing_balance),
      total_sales: cleanNumber(total_sales),
      sales_summary: {
        efectivo: cleanNumber(sales_summary.efectivo ?? 0),
        debito: cleanNumber(sales_summary.debito ?? 0),
        credito: cleanNumber(sales_summary.credito ?? 0),
      },
    };

    // Agregar notas solo si están definidas
    if (isDefined(notes)) {
      payload.notes = notes.trim();
    }

    const response = await axiosInstance.post('/reconciliation/create', payload);
    
    return {
      success: true,
      data: response.data,
      message: 'Cierre de caja realizado exitosamente',
    };
  } catch (error) {
    console.error('Error creating reconciliation:', error);
    
    // Manejo de errores específicos
    let errorMessage = 'No se pudo realizar el cierre de caja. Por favor, intente nuevamente.';
    
    if (error.response?.status === 403) {
      errorMessage = 'No tiene permisos para realizar el cierre de caja.';
    } else if (error.response?.status === 404) {
      errorMessage = 'No se encontró el registro de caja abierta.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage,
      statusCode: error.response?.status,
    };
  }
};
