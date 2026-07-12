import { Card, Alert } from 'flowbite-react';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import SalesHeader from '../../components/Sales/SalesHeader';
import ConfirmModal from '../../components/Sales/ConfirmModal';
import ReceiptModal from '../../components/Sales/ReceiptModal';
import NoRegisterModal from '../../components/Commons/NoRegisterModal';
import { SalesFormSection } from './sales/SalesFormSection';
import { useSales } from './sales/hooks/useSales';

const Sales = () => {
  const s = useSales();

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Card className="border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <SalesHeader />

          {s.alert.type && (
            <Alert
              color={s.alert.type === 'success' ? 'success' : 'failure'}
              icon={s.alert.type === 'success' ? HiCheckCircle : HiExclamationCircle}
              onDismiss={() => s.setAlert({ type: null, message: '' })}
              className="mb-2"
              role={s.alert.type === 'error' ? 'alert' : 'status'}
            >
              <span className="font-medium">
                {s.alert.type === 'success' ? '¡Éxito! ' : 'Error: '}
              </span>
              {s.alert.message}
            </Alert>
          )}

          <SalesFormSection
            register={s.register}
            handleSubmit={s.handleSubmit}
            control={s.control}
            errors={s.errors}
            isValid={s.isValid}
            isSubmitting={s.isSubmitting}
            paymentMethods={s.paymentMethods}
            professionals={s.professionals}
            previsions={s.previsions}
            invoiceItems={s.invoiceItems}
            addInvoiceItem={s.addInvoiceItem}
            removeInvoiceItem={s.removeInvoiceItem}
            updateInvoiceItem={s.updateInvoiceItem}
            showFolioInput={s.showFolioInput}
            onSubmit={s.onSubmit}
            handleCancel={s.handleCancel}
          />

          <ConfirmModal
            open={s.showConfirm}
            onClose={() => s.setShowConfirm(false)}
            onConfirm={s.confirmAndCreate}
            dataPreview={{
              invoice: s.watch('invoice'),
              payment_method_label: s.paymentMethods.find((m) => m.id === s.paymentMethod)?.description,
              total: s.computeTotals().total,
            }}
          />

          <ReceiptModal open={s.showReceipt} onClose={() => s.setShowReceipt(false)} data={s.receiptData} />
        </Card>

        <NoRegisterModal show={s.showNoRegisterModal} context="sales" />
      </div>
    </section>
  );
};

export default Sales;
