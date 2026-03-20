import axiosInstance from '../axios';

/**
 * Obtiene el reporte de ventas diarias como blob PDF.
 *
 * @param {Object} params
 * @param {string} params.startDate - Fecha inicio YYYY-MM-DD
 * @param {string} params.endDate - Fecha fin YYYY-MM-DD
 * @param {string} [params.userId] - ID del cajero (solo ADMIN/SUPERVISOR)
 * @returns {Promise<{success: boolean, blob?: Blob, error?: string}>}
 */
export const getDailySalesReport = async ({ startDate, endDate, userId } = {}) => {
  try {
    const params = { startDate, endDate };
    if (userId) params.userId = userId;

    const response = await axiosInstance.get('/reports/daily-sales', {
      params,
      responseType: 'blob',
      timeout: 30000,
    });

    return { success: true, blob: response.data };
  } catch (error) {
    console.error('Error al generar reporte de ventas diarias:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'No se pudo generar el reporte. Intente nuevamente.';
    return { success: false, error: errorMessage, statusCode: error.response?.status };
  }
};
