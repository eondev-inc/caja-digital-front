import axiosInstance from '../axios';

/**
 * Obtiene el reporte de atenciones por profesional como blob PDF.
 *
 * @param {Object} params
 * @param {string} params.startDate - Fecha inicio YYYY-MM-DD
 * @param {string} params.endDate - Fecha fin YYYY-MM-DD
 * @param {string} [params.professionalId] - UUID del profesional (opcional)
 * @returns {Promise<{success: boolean, blob?: Blob, error?: string}>}
 */
export const getByProfessionalReport = async ({ startDate, endDate, professionalId } = {}) => {
  try {
    const params = { startDate, endDate };
    if (professionalId) params.professionalId = professionalId;

    const response = await axiosInstance.get('/reports/by-professional', {
      params,
      responseType: 'blob',
      timeout: 30000,
    });

    return { success: true, blob: response.data };
  } catch (error) {
    console.error('Error al generar reporte por profesional:', error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'No se pudo generar el reporte. Intente nuevamente.';
    return { success: false, error: errorMessage, statusCode: error.response?.status };
  }
};
