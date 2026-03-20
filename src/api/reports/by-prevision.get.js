import axiosInstance from '../axios';

/**
 * Obtiene el reporte de atenciones por previsión como blob PDF.
 *
 * @param {Object} params
 * @param {string} params.startDate - Fecha inicio YYYY-MM-DD
 * @param {string} params.endDate - Fecha fin YYYY-MM-DD
 * @param {string} [params.previsionId] - UUID de la previsión (opcional)
 * @returns {Promise<{success: boolean, blob?: Blob, error?: string}>}
 */
export const getByPrevisionReport = async ({ startDate, endDate, previsionId } = {}) => {
  try {
    const params = { startDate, endDate };
    if (previsionId) params.previsionId = previsionId;

    const response = await axiosInstance.get('/reports/by-prevision', {
      params,
      responseType: 'blob',
      timeout: 30000,
    });

    return { success: true, blob: response.data };
  } catch (error) {
    console.error('Error al generar reporte por previsión:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'No se pudo generar el reporte. Intente nuevamente.';
    return { success: false, error: errorMessage, statusCode: error.response?.status };
  }
};
