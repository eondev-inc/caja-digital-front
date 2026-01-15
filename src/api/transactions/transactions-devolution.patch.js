import axiosInstance from '../axios';

/**
 * Realiza la devolución de una transacción
 * @param {string} transactionId - UUID de la transacción a devolver
 * @returns {Promise<object>} - Respuesta de la API
 * @throws {Error} - Error en caso de fallo en la petición
 * @author Copilot
 */
export const devolutionTransaction = async (transactionId) => {
  try {
    const response = await axiosInstance.patch(
      `/transactions/devolution/${transactionId}`
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al realizar devolución:', error);
    throw error;
  }
};
