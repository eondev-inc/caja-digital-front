import axiosInstance from '../axios';

/**
 * Cancela (anula) una transacción específica
 * @param {string} transactionId - UUID de la transacción a cancelar
 * @returns {Promise<object>} - Respuesta de la API
 * @throws {Error} - Error en caso de fallo en la petición
 * @author Copilot
 */
export const cancelTransaction = async (transactionId) => {
  try {
    const response = await axiosInstance.patch(
      `/transactions/cancel/${transactionId}`
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al cancelar transacción:', error);
    throw error;
  }
};
