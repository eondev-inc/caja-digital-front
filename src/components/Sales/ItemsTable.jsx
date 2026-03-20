import { Button, Select, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faUserMd } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

/**
 * Tabla de ítems de la venta con fila única por ítem.
 * Columnas: Servicio | Profesional | Previsión | Cantidad | Precio | Subtotal | Acción
 * En mobile apila verticalmente cada ítem.
 */
export default function ItemsTable({ items, onAdd, onRemove, onUpdate, professionals, previsions }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Cabecera de la sección */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-primary-500 px-4 py-3 dark:border-slate-700">
        <FontAwesomeIcon icon={faUserMd} className="text-white" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-white">Detalle de Servicios Médicos</h3>
      </div>

      {/* Cabecera de columnas — solo visible en lg+ */}
      <div className="hidden border-b border-gray-100 bg-gray-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-700 lg:grid lg:grid-cols-12 lg:gap-2">
        <div className="col-span-3 text-xs font-medium text-gray-600 dark:text-gray-300">Servicio / Tratamiento</div>
        <div className="col-span-2 text-xs font-medium text-gray-600 dark:text-gray-300">Profesional</div>
        <div className="col-span-2 text-xs font-medium text-gray-600 dark:text-gray-300">Previsión</div>
        <div className="col-span-1 text-center text-xs font-medium text-gray-600 dark:text-gray-300">Cant.</div>
        <div className="col-span-2 text-center text-xs font-medium text-gray-600 dark:text-gray-300">Precio</div>
        <div className="col-span-1 text-center text-xs font-medium text-gray-600 dark:text-gray-300">Subtotal</div>
        <div className="col-span-1 text-center text-xs font-medium text-gray-600 dark:text-gray-300">
          <span className="sr-only">Eliminar</span>
        </div>
      </div>

      {/* Filas de ítems */}
      {items.map((item, index) => (
        <div
          key={index}
          className="dark:hover:bg-slate-700/50 border-b border-gray-100 px-3 py-2 transition-colors last:border-0 hover:bg-gray-50 dark:border-slate-700"
        >
          {/* Layout desktop: fila única de 12 cols */}
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-12 lg:items-center">
            {/* Servicio */}
            <div className="lg:col-span-3">
              <label className="mb-0.5 block text-xs text-gray-500 dark:text-gray-400 lg:hidden">
                Servicio / Tratamiento
              </label>
              <TextInput
                sizing="sm"
                placeholder="Ej: Consulta, Examen..."
                value={item.description}
                onChange={(e) => onUpdate(index, 'description', e.target.value)}
              />
            </div>

            {/* Profesional */}
            <div className="lg:col-span-2">
              <label className="mb-0.5 block text-xs text-gray-500 dark:text-gray-400 lg:hidden">
                Profesional (opcional)
              </label>
              <Select
                sizing="sm"
                value={item.professional_uuid || ''}
                onChange={(e) => onUpdate(index, 'professional_uuid', e.target.value)}
                className="w-full"
              >
                <option value="">Sin profesional</option>
                {professionals?.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.professional_name}
                    {prof.specialty ? ` — ${prof.specialty}` : ''}
                  </option>
                ))}
              </Select>
            </div>

            {/* Previsión */}
            <div className="lg:col-span-2">
              <label className="mb-0.5 block text-xs text-gray-500 dark:text-gray-400 lg:hidden">
                Previsión (opcional)
              </label>
              <Select
                sizing="sm"
                value={item.prevision_id || ''}
                onChange={(e) => onUpdate(index, 'prevision_id', e.target.value)}
                className="w-full"
              >
                <option value="">Sin previsión</option>
                {previsions?.map((prev) => (
                  <option key={prev.id} value={prev.id}>
                    {prev.name}
                  </option>
                ))}
              </Select>
            </div>

            {/* Cantidad */}
            <div className="lg:col-span-1">
              <label className="mb-0.5 block text-xs text-gray-500 dark:text-gray-400 lg:hidden">
                Cantidad
              </label>
              <TextInput
                sizing="sm"
                type="number"
                min="1"
                className="text-center"
                value={item.quantity}
                onChange={(e) => onUpdate(index, 'quantity', e.target.value)}
              />
            </div>

            {/* Precio */}
            <div className="lg:col-span-2">
              <label className="mb-0.5 block text-xs text-gray-500 dark:text-gray-400 lg:hidden">
                Precio unit.
              </label>
              <TextInput
                sizing="sm"
                type="number"
                min="0"
                step="1"
                className="text-center"
                value={item.total_price}
                placeholder="0"
                onChange={(e) => onUpdate(index, 'total_price', e.target.value)}
              />
            </div>

            {/* Subtotal (readonly) */}
            <div className="lg:col-span-1">
              <label className="mb-0.5 block text-xs text-gray-500 dark:text-gray-400 lg:hidden">
                Subtotal
              </label>
              <TextInput
                sizing="sm"
                type="text"
                className="cursor-default bg-gray-50 text-center font-semibold text-primary-700 dark:bg-slate-700 dark:text-primary-400"
                value={`$${(item.subtotal || 0).toLocaleString('es-CL')}`}
                disabled
                readOnly
                tabIndex={-1}
              />
            </div>

            {/* Acción: eliminar */}
            <div className="flex justify-end lg:col-span-1 lg:justify-center">
              <Button
                color="failure"
                size="xs"
                onClick={() => onRemove(index)}
                disabled={items.length === 1}
                aria-label="Eliminar ítem"
                className="cursor-pointer"
              >
                <FontAwesomeIcon icon={faTrash} className="size-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Footer: agregar ítem */}
      <div className="border-t border-gray-100 bg-gray-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-700">
        <Button
          type="button"
          color="light"
          size="xs"
          className="dark:bg-primary-900/30 dark:hover:bg-primary-900/50 cursor-pointer border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 dark:border-primary-800 dark:text-primary-400"
          onClick={onAdd}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1.5 size-3" />
          Agregar Servicio Médico
        </Button>
      </div>
    </div>
  );
}

ItemsTable.propTypes = {
  items: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  professionals: PropTypes.array,
  previsions: PropTypes.array,
};
