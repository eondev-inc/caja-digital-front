import axiosInstance from '../axios';

/**
 * Aprueba un cierre de caja enviado a revisión
 * 
 * @param {string} reconciliationId - ID de la reconciliación a aprobar
 * @returns {Promise} Respuesta de la aprobación del cierre
 * @throws {Error} Error de red o de la API
 * 
 */
export const approveReconciliation = async (reconciliationId) => {
  try {
    if (!reconciliationId || typeof reconciliationId !== 'string') {
      throw new Error('El ID de la reconciliación es requerido');
    }

    const response = await axiosInstance.post(
      `/reconciliation/approve/${reconciliationId.trim()}`
    );
    
    return {
      success: true,
      data: response.data,
      message: 'Cierre de caja aprobado exitosamente',
    };
  } catch (error) {
    console.error('Error approving reconciliation:', error);
    
    // Manejo de errores específicos
    let errorMessage = 'No se pudo aprobar el cierre de caja. Por favor, intente nuevamente.';
    
    if (error.response?.status === 403) {
      errorMessage = 'No tiene permisos para aprobar el cierre de caja.';
    } else if (error.response?.status === 404) {
      errorMessage = 'No se encontró el cierre de caja solicitado.';
    } else if (error.response?.status === 409) {
      errorMessage = 'El cierre de caja ya fue procesado anteriormente.';
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
