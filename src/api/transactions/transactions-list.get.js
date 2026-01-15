import axiosInstance from '../axios';

/**
 * Lista las transacciones de una entidad con paginación y búsqueda
 * El userId está implícito en el token de autenticación
 * @param {string} entityId - UUID de la entidad
 * @param {object} params - Parámetros de consulta (page, limit, search)
 * @returns {Promise<object>} - Respuesta con las transacciones paginadas
 * @throws {Error} - Error en caso de fallo en la petición
 * @author Copilot
 */
export const listTransactionsByUser = async (entityId, params = {}) => {
  try {
    const { page = 1, limit = 10, search = '' } = params;
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });

    const response = await axiosInstance.get(
      `/transactions/list-by-user/${entityId}?${queryParams.toString()}`
    );
    
    return response.data;
  } catch (error) {
    console.error('Error al listar transacciones:', error);
    throw error;
  }
};
