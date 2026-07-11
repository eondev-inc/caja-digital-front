import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  calculateReconciliation,
  createReconciliation,
  approveReconciliation,
  getPaymentMethods,
} from '../../../../api';
import { useStore } from '../../../../app/store';

/**
 * Hook that manages all CloseRegister page state and side-effects:
 * payment methods loading, reconciliation calculation, amount entry tracking,
 * close submission, and approval workflow.
 */
export const useCloseRegister = () => {
  const navigate = useNavigate();
  const { openRegister, userInfo, setOpenRegister } = useStore();

  const [loading, setLoading] = useState(true);
  const [calculationData, setCalculationData] = useState(null);
  const [error, setError] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [enteredAmounts, setEnteredAmounts] = useState({});
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [reconciliationId, setReconciliationId] = useState(null);
  const [approving, setApproving] = useState(false);
  const [showNoRegisterModal, setShowNoRegisterModal] = useState(false);
  useEffect(() => {
    const fetchAll = async () => {
      if (!openRegister?.id) {
        setLoading(false);
        setShowNoRegisterModal(true);
        return;
      }

      const entityId =
        (userInfo.entity_users?.length > 0 && userInfo.entity_users[0]?.entities?.id) || '';

      setLoading(true);
      setError(null);

      const [methodsResult, calcResult] = await Promise.allSettled([
        getPaymentMethods(),
        calculateReconciliation({ entity_id: entityId }),
      ]);

      if (methodsResult.status === 'fulfilled') {
        const methods = Array.isArray(methodsResult.value) ? methodsResult.value : [];
        setPaymentMethods(methods);
        const initial = {};
        methods.forEach((m) => {
          initial[m.description] = 0;
        });
        setEnteredAmounts(initial);
      }

      if (calcResult.status === 'fulfilled') {
        const result = calcResult.value;
        if (result.success) {
          setCalculationData(result.data);
        } else {
          setError(result.error || 'No se pudo cargar la información de cuadratura.');
        }
      } else {
        setError('No se pudo cargar la información de cuadratura.');
      }

      setLoading(false);
    };

    fetchAll();
  }, [openRegister, userInfo]);

  /** Sum of all entered amounts */
  const totalEntered = useMemo(
    () => Object.values(enteredAmounts).reduce((sum, v) => sum + Number(v), 0),
    [enteredAmounts],
  );

  /** Differences between expected and entered amounts per payment method */
  const differences = useMemo(() => {
    if (!calculationData) return null;
    const expected = calculationData.transactionDetailsByPaymentMethod || {};
    const totalExpected = calculationData.totalAmount || 0;

    const byMethod = {};
    paymentMethods.forEach((m) => {
      const desc = m.description;
      const exp = expected[desc]?.totalAmount || 0;
      const entered = Number(enteredAmounts[desc] ?? 0);
      byMethod[desc] = {
        expected: exp,
        entered,
        diff: entered - exp,
      };
    });

    return {
      byMethod,
      totalExpected,
      total: totalEntered - totalExpected,
    };
  }, [calculationData, enteredAmounts, paymentMethods, totalEntered]);

  const hasDiscrepancies = useMemo(
    () => (differences ? differences.total !== 0 : false),
    [differences],
  );

  /** Format amount as CLP currency */
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount || 0);

  /** Submit close register */
  const handleSubmitClose = async () => {
    if (!calculationData) return;
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const totalSales = Object.values(
      calculationData.transactionDetailsByType || {},
    ).reduce((sum, type) => sum + (type.count || 0), 0);

    const sales_summary = {};
    Object.entries(enteredAmounts).forEach(([desc, amount]) => {
      sales_summary[desc] = Number(amount);
    });

    const result = await createReconciliation({
      open_register_id: calculationData.openRegisterId,
      closing_balance: calculationData.initialAmount + totalEntered,
      total_sales: totalSales,
      sales_summary,
      notes: notes.trim() || undefined,
    });

    setSubmitting(false);

    if (result.success) {
      setReconciliationId(result.data?.id || result.data?.reconciliation_id);
      setSuccessMessage('Cierre de caja enviado a revisión exitosamente');
      setShowApprovalModal(true);
    } else {
      setError(result.error || 'No se pudo realizar el cierre de caja');
    }
  };

  /** Approve close register */
  const handleApproveClose = async () => {
    if (!reconciliationId) {
      setError('No se encontró el ID de la reconciliación');
      return;
    }
    setApproving(true);
    setError(null);

    const result = await approveReconciliation(reconciliationId);
    setApproving(false);

    if (result.success) {
      setOpenRegister({});
      setSuccessMessage('¡Cierre de caja aprobado exitosamente! Redirigiendo...');
      setShowApprovalModal(false);
      setTimeout(() => navigate('/dashboard'), 2000);
    } else {
      setError(result.error || 'No se pudo aprobar el cierre de caja');
    }
  };

  return {
    loading,
    calculationData,
    error,
    paymentMethods,
    enteredAmounts,
    setEnteredAmounts,
    notes,
    setNotes,
    submitting,
    successMessage,
    showApprovalModal,
    setShowApprovalModal,
    reconciliationId,
    approving,
    showNoRegisterModal,
    totalEntered,
    differences,
    hasDiscrepancies,
    formatCurrency,
    handleSubmitClose,
    handleApproveClose,
    navigate,
  };
};
