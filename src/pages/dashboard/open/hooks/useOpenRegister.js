import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { openingAmountSchema } from '../../../../utils/openingAmountSchema';
import { useStore } from '../../../../app/store';
import { useNavigate } from 'react-router-dom';
import { getOpenRegister, createOpenRegister } from '../../../../api';

/**
 * Hook that manages all OpenRegister page state and side-effects:
 * form handling, register status check, and open register submission.
 */
export const useOpenRegister = () => {
  const [showAlreadyOpenModal, setShowAlreadyOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo, setOpenRegister, openRegister } = useStore();
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(openingAmountSchema),
    mode: 'onBlur',
  });

  // Primitive dep (narrowed from userInfo.entity_users object chain) so the
  // effect below never derefs undefined and only re-runs on id change.
  const entityId = userInfo?.entity_users?.[0]?.entities?.id;

  const onSubmit = async (data) => {
    if (entityId == null) {
      setError('Sesión sin datos de usuario. Iniciá sesión nuevamente.');
      return;
    }
    const payload = {
      initial_amount: data.openingAmount,
      entity_id: entityId,
    };

    const response = await createOpenRegister(payload);

    if (response.status === 200 || response.status === 201) {
      setOpenRegister(response.data);
      navigateTo('/dashboard');
    } else {
      setShowAlreadyOpenModal(true);
    }
  };

  const handleCloseAlreadyOpenModal = () => {
    setShowAlreadyOpenModal(false);
    navigateTo('/dashboard');
  };

  useEffect(() => {
    if (Object.keys(openRegister ?? {}).length > 0) {
      setShowAlreadyOpenModal(true);
      setIsLoading(false);
      return;
    }

    // After reload-with-session, POST /auth/refresh returns {accessToken}
    // only and userInfo stays {} until next login — skip fetch, no .map.
    if (entityId == null) {
      setError('Sesión sin datos de usuario. Iniciá sesión nuevamente.');
      setIsLoading(false);
      return;
    }

    const fetchOpenRegister = async (id) => {
      try {
        setIsLoading(true);
        const registerResponse = await getOpenRegister(id);

        if (registerResponse.status === 200) {
          setOpenRegister(registerResponse.data);
          setShowAlreadyOpenModal(true);
        }
      } catch (err) {
        setError(err.message || 'Error al verificar el estado de la caja');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpenRegister(entityId);
  }, [openRegister, setOpenRegister, entityId]);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    showAlreadyOpenModal,
    handleCloseAlreadyOpenModal,
    userInfo,
    isLoading,
    error,
  };
};
