import { Button, TextInput } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faUserMd } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function ItemsTable({ items, onAdd, onRemove, onUpdate }) {
  return (
    <div className="mt-6 overflow-hidden rounded-lg bg-white shadow-md">
      <div className="bg-primary-500 p-4 text-white">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <FontAwesomeIcon icon={faUserMd} />
          Detalle de Servicios Médicos
        </h3>
      </div>
      <div className="grid grid-cols-12 gap-4 border-b bg-neutral-50 p-4 font-medium text-secondary-700">
        <div className="col-span-5">Servicio/Tratamiento</div>
        <div className="col-span-2 text-center">Cantidad</div>
        <div className="col-span-2 text-center">Precio</div>
        <div className="col-span-2 text-center">Subtotal</div>
        <div className="col-span-1 text-center">Acción</div>
      </div>

      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-12 items-center gap-4 border-b border-neutral-200 p-4 transition-colors hover:bg-neutral-50">
          <div className="col-span-5">
            <TextInput
              placeholder="Ej: Consulta, Examen..."
              value={item.description}
              className="rounded-lg border-neutral-300 focus:border-primary-500 focus:ring-primary-200"
              onChange={(e) => onUpdate(index, 'description', e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <TextInput
              type="number"
              min="1"
              className="rounded-lg border-neutral-300 text-center focus:border-primary-500 focus:ring-primary-200"
              value={item.quantity}
              onChange={(e) => onUpdate(index, 'quantity', e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <TextInput
              type="number"
              min="0"
              step="0.01"
              className="rounded-lg border-neutral-300 text-center focus:border-primary-500 focus:ring-primary-200"
              value={item.total_price}
              placeholder="0.00"
              onChange={(e) => onUpdate(index, 'total_price', e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <TextInput
              type="text"
              className="border-neutral-200 bg-neutral-50 text-center font-semibold text-primary-700"
              value={`$${(item.subtotal || 0).toLocaleString('es-CL')}`}
              disabled
            />
          </div>
          <div className="col-span-1 flex justify-center">
            <Button color="failure" size="sm" onClick={() => onRemove(index)} disabled={items.length === 1}>
              <FontAwesomeIcon icon={faTrash} className="size-4" />
            </Button>
          </div>
        </div>
      ))}

      <div className="border-t bg-neutral-50 p-4">
        <Button type="button" color="light" size="sm" className="flex items-center border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100" onClick={onAdd}>
          <FontAwesomeIcon icon={faPlus} className="mr-2 size-4" />
          <span>Agregar Servicio Médico</span>
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
};
