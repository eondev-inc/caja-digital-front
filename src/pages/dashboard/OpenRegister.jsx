import { Breadcrumb, Button, Card, Label, TextInput } from 'flowbite-react';
import { HiArrowLeft } from 'react-icons/hi';
import { GeneralModal } from '../../components/Commons/GeneralModal';
import { useOpenRegister } from './open/hooks/useOpenRegister';

const OpenRegister = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    showAlreadyOpenModal,
    handleCloseAlreadyOpenModal,
    userInfo,
  } = useOpenRegister();

  return (
    <div className="mx-auto max-w-[1080px] p-4">
      <Card className="mb-6">
        <div className="mb-6">
          <Breadcrumb className="rounded px-2 py-1">
            <Breadcrumb.Item icon={HiArrowLeft} href="/dashboard">
              Volver
            </Breadcrumb.Item>
            <Breadcrumb.Item>Caja digital</Breadcrumb.Item>
            <Breadcrumb.Item className="text-secondary-600 dark:text-secondary-400">
              Apertura de caja
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Apertura de caja
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Abre tu caja para registrar, ingresar comprobantes, anular y ver tu
            historial de movimientos.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-4">
            <div className="rounded bg-primary-100 p-2 dark:bg-primary-900">
              <svg
                className="size-6 text-primary-500 dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-primary-600 dark:text-primary-400">
              Datos de caja
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 rounded-xl border-2 p-4 shadow-sm dark:border-neutral-600 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Nombre cajero
              </p>
              <p className="mt-1 text-neutral-900 dark:text-neutral-100">
                {userInfo.surnames} {userInfo.forenames}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Rut cajero
              </p>
              <p className="mt-1 text-neutral-900 dark:text-neutral-100">
                {userInfo.nid}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Fecha Apertura
              </p>
              <p className="mt-1 text-neutral-900 dark:text-neutral-100">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mt-8">
              <Label
                htmlFor="openingAmount"
                className="text-lg font-medium text-neutral-700 dark:text-neutral-300"
              >
                ¿Con qué monto abrirás tu caja hoy?
              </Label>
              <div className="mt-2">
                <Label>Fondo inicial</Label>
                <div className="flex items-center gap-4">
                  <TextInput
                    id="openingAmount"
                    type="number"
                    placeholder="$"
                    className="max-w-xs"
                    color={errors.openingAmount ? 'failure' : 'gray'}
                    aria-describedby={
                      errors.openingAmount ? 'openingAmount-error' : undefined
                    }
                    aria-invalid={!!errors.openingAmount}
                    {...register('openingAmount')}
                  />
                  <Button
                    type="submit"
                    color="blue"
                    disabled={isSubmitting}
                    isProcessing={isSubmitting}
                  >
                    Abrir Caja
                  </Button>
                </div>
                {errors.openingAmount && (
                  <p
                    id="openingAmount-error"
                    className="mx-1 mt-1 text-left text-sm text-error-500"
                  >
                    {errors.openingAmount.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </Card>

      {showAlreadyOpenModal && (
        <GeneralModal
          title="Caja ya abierta"
          show={showAlreadyOpenModal}
          typeModal="info"
          buttonMessage="Ir al dashboard"
          onClose={handleCloseAlreadyOpenModal}
        >
          <p className="text-center text-neutral-700 dark:text-neutral-300">
            Ya existe una caja abierta asociada a tu usuario. Serás redirigido
            al dashboard para continuar.
          </p>
        </GeneralModal>
      )}
    </div>
  );
};

export default OpenRegister;
