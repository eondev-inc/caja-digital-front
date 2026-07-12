import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../../../utils/validationSchema';
import { registerUser } from '../../../api/auth/register.post';
import { getEntities } from '../../../api/general-settings/entities.get';
import { useStore } from '../../../app/store';

/**
 * Hook that manages all Register page state and side-effects:
 * form handling, entity loading, user registration, and modal visibility.
 */
export const useRegister = () => {
  const { formData, setFormData } = useStore();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error al crear el usuario');
  const [entities, setEntities] = useState([]);
  const [loadingEntities, setLoadingEntities] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData,
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await getEntities();
        if (Array.isArray(response)) {
          setEntities(response);
        }
      } catch {
        setEntities([]);
      } finally {
        setLoadingEntities(false);
      }
    };

    fetchEntities();
  }, []);

  const onSubmit = async (data) => {
    // Persistir solo campos no sensibles (excluir password y confirmPassword)
    setFormData({
      forenames: data.forenames,
      surnames: data.surnames,
      nid: data.nid,
      email: data.email,
      entity_id: data.entity_id,
      checkBox: data.checkBox,
    });

    // Construir payload limpio para el backend
    const payload = {
      forenames: data.forenames,
      surnames: data.surnames,
      nid: data.nid,
      email: data.email,
      password: data.password,
      entity_id: data.entity_id,
    };

    try {
      const response = await registerUser(payload);
      if (response.status !== 201) {
        setErrorMessage(
          'Error al crear el usuario. Verifica los datos e intenta nuevamente.',
        );
        setShowError(true);
      } else {
        setFormData({
          forenames: '',
          surnames: '',
          nid: '',
          email: '',
          entity_id: '',
          checkBox: false,
        });
        setShowSuccess(true);
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message === 'El usuario ya está registrado'
          ? 'El RUT o correo electrónico ya está registrado en el sistema.'
          : 'Error al crear el usuario. Verifica los datos e intenta nuevamente.';
      setErrorMessage(msg);
      setShowError(true);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    entities,
    loadingEntities,
    showSuccess,
    setShowSuccess,
    showError,
    setShowError,
    errorMessage,
    onSubmit,
  };
};
