import { Button, Card, Alert, Badge } from 'flowbite-react';

export const ColorTestComponent = () => {
  return (
    <div className="space-y-6 p-6">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        🎨 Test de Paleta Healthcare Professional
      </h2>
      
      {/* Test de Botones */}
      <Card className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Botones Flowbite</h3>
        <div className="flex flex-wrap gap-3">
          <Button color="blue">Azul Marino (blue)</Button>
          <Button color="green">Verde Éxito (green)</Button>
          <Button color="red">Rojo Error (red)</Button>
          <Button color="yellow">Amarillo Advertencia (yellow)</Button>
          <Button color="gray">Gris Neutral (gray)</Button>
        </div>
      </Card>

      {/* Test de Alertas */}
      <Card className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Alertas Flowbite</h3>
        <div className="space-y-3">
          <Alert color="success">
            <span className="font-medium">Éxito:</span> Operación completada correctamente.
          </Alert>
          <Alert color="warning">
            <span className="font-medium">Advertencia:</span> Revise los datos antes de continuar.
          </Alert>
          <Alert color="failure">
            <span className="font-medium">Error:</span> No se pudo procesar la transacción.
          </Alert>
          <Alert color="info">
            <span className="font-medium">Información:</span> Sistema actualizado correctamente.
          </Alert>
        </div>
      </Card>

      {/* Test de Badges */}
      <Card className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Badges Flowbite</h3>
        <div className="flex flex-wrap gap-3">
          <Badge color="success">Activo</Badge>
          <Badge color="warning">Pendiente</Badge>
          <Badge color="failure">Cancelado</Badge>
          <Badge color="info">Procesando</Badge>
          <Badge color="gray">Inactivo</Badge>
        </div>
      </Card>

      {/* Test de colores Tailwind custom */}
      <Card className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Colores Tailwind Personalizados</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-2 size-16 rounded-lg bg-primary-500"></div>
            <span className="text-sm text-gray-600">primary-500</span>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 size-16 rounded-lg bg-secondary-500"></div>
            <span className="text-sm text-gray-600">secondary-500</span>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 size-16 rounded-lg bg-success-500"></div>
            <span className="text-sm text-gray-600">success-500</span>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 size-16 rounded-lg bg-error-500"></div>
            <span className="text-sm text-gray-600">error-500</span>
          </div>
        </div>
      </Card>

      {/* Test de contrastes */}
      <Card className="p-4">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Test de Contraste y Legibilidad</h3>
        <div className="space-y-3">
          <div className="rounded bg-primary-500 p-3 text-white">
            Texto blanco sobre verde primario (primary-500)
          </div>
          <div className="rounded bg-secondary-700 p-3 text-white">
            Texto blanco sobre azul marino (secondary-700)
          </div>
          <div className="rounded bg-gray-100 p-3 text-gray-800">
            Texto oscuro sobre fondo claro (gray-100)
          </div>
          <div className="rounded bg-success-600 p-3 text-white">
            Mensaje de éxito (success-600)
          </div>
          <div className="rounded bg-error-600 p-3 text-white">
            Mensaje de error (error-600)
          </div>
        </div>
      </Card>
    </div>
  );
};