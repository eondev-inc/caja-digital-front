import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Label, Select, Spinner } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';

/**
 * Componente de filtros de fecha para reportes.
 * Renderiza inputs de fecha inicio/fin y botón de generación.
 *
 * @param {Object}   props
 * @param {string}   props.reportType    - Tipo de reporte ('daily-sales' | 'reconciliations' | 'by-professional' | 'by-prevision')
 * @param {Array}    [props.professionals] - Lista de profesionales [{id, professional_name}]
 * @param {Array}    [props.previsions]    - Lista de previsiones [{id, name}]
 * @param {boolean}  props.loading       - Estado de carga
 * @param {Function} props.onGenerate    - Callback con los filtros seleccionados
 */
const ReportFilters = ({ reportType = '', professionals = [], previsions = [], loading, onGenerate }) => {
  const today = new Date().toISOString().split('T')[0];
  const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split('T')[0];

  const [startDate, setStartDate] = useState(firstOfMonth);
  const [endDate, setEndDate] = useState(today);
  const [professionalId, setProfessionalId] = useState('');
  const [previsionId, setPrevisionId] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!startDate || !endDate) {
      setValidationError('Las fechas son obligatorias.');
      return;
    }
    if (startDate > endDate) {
      setValidationError('La fecha de inicio no puede ser posterior a la fecha de fin.');
      return;
    }

    onGenerate({ startDate, endDate, professionalId: professionalId || undefined, previsionId: previsionId || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="dark:bg-slate-700/40 flex flex-wrap items-end gap-4 rounded-lg bg-gray-50 p-4">
      {/* Fecha inicio */}
      <div className="min-w-[140px]">
        <Label htmlFor="startDate" value="Fecha inicio" className="mb-1 block text-sm" />
        <input
          id="startDate"
          type="date"
          value={startDate}
          max={endDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {/* Fecha fin */}
      <div className="min-w-[140px]">
        <Label htmlFor="endDate" value="Fecha fin" className="mb-1 block text-sm" />
        <input
          id="endDate"
          type="date"
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {/* Filtro por profesional */}
      {reportType === 'by-professional' && professionals.length > 0 && (
        <div className="min-w-[180px]">
          <Label htmlFor="professionalId" value="Profesional (opcional)" className="mb-1 block text-sm" />
          <Select
            id="professionalId"
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
            sizing="sm"
          >
            <option value="">Todos los profesionales</option>
            {professionals.map((p) => (
              <option key={p.id} value={p.id}>
                {p.professional_name}
              </option>
            ))}
          </Select>
        </div>
      )}

      {/* Filtro por previsión */}
      {reportType === 'by-prevision' && previsions.length > 0 && (
        <div className="min-w-[180px]">
          <Label htmlFor="previsionId" value="Previsión (opcional)" className="mb-1 block text-sm" />
          <Select
            id="previsionId"
            value={previsionId}
            onChange={(e) => setPrevisionId(e.target.value)}
            sizing="sm"
          >
            <option value="">Todas las previsiones</option>
            {previsions.map((pv) => (
              <option key={pv.id} value={pv.id}>
                {pv.name}
              </option>
            ))}
          </Select>
        </div>
      )}

      {/* Botón generar */}
      <Button type="submit" color="success" disabled={loading} className="shrink-0">
        {loading ? (
          <>
            <Spinner size="sm" className="mr-2" aria-hidden="true" />
            Generando...
          </>
        ) : (
          <>
            <HiSearch className="mr-2 size-4" aria-hidden="true" />
            Generar reporte
          </>
        )}
      </Button>

      {/* Error de validación */}
      {validationError && (
        <p className="w-full text-sm text-red-600 dark:text-red-400" role="alert">
          {validationError}
        </p>
      )}
    </form>
  );
};

ReportFilters.propTypes = {
  reportType: PropTypes.string,
  professionals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      professional_name: PropTypes.string.isRequired,
    })
  ),
  previsions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool.isRequired,
  onGenerate: PropTypes.func.isRequired,
};

export default ReportFilters;
