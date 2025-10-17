import axiosInstance from '../axios';

/**
 * Obtiene el cálculo de cuadratura de caja para una entidad específica
 * 
 * @param {Object} data - Datos para el cálculo
 * @param {string} data.entity_id - ID de la entidad
 * @returns {Promise} Respuesta con los detalles de la cuadratura
 * @throws {Error} Error de red o de la API
 */
export const calculateReconciliation = async (data) => {
  try {
    const payload = {
      entity_id: data.entity_id?.trim() ?? '',
    };

    const response = await axiosInstance.post('/reconciliation/calculate', payload);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error calculating reconciliation:', error);
    
    // Manejo de errores específicos
    const errorMessage = error.response?.data?.message 
      || error.message 
      || 'No se pudo calcular la cuadratura. Por favor, intente nuevamente.';
    
    return {
      success: false,
      error: errorMessage,
      statusCode: error.response?.status,
    };
  }
};
