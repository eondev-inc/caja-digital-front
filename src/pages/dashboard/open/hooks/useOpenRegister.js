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

  const onSubmit = async (data) => {
    const payload = {
      initial_amount: data.openingAmount,
      entity_id: userInfo.entity_users[0].entities.id,
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
    if (Object.keys(openRegister).length <= 0) {
      const [userEntityInfo] = userInfo.entity_users.map((entities) => entities);

      const fetchOpenRegister = async (entityId) => {
        const registerResponse = await getOpenRegister(entityId);

        if (registerResponse.status === 200) {
          setOpenRegister(registerResponse.data);
          setShowAlreadyOpenModal(true);
        }
      };

      fetchOpenRegister(userEntityInfo.entities.id);
    } else {
      setShowAlreadyOpenModal(true);
    }
  }, [openRegister, setOpenRegister, navigateTo, userInfo.entity_users]);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    showAlreadyOpenModal,
    handleCloseAlreadyOpenModal,
    userInfo,
  };
};
