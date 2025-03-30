import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Card, Label, Modal, TextInput } from 'flowbite-react';
import { HiArrowLeft } from 'react-icons/hi';
import { useStore } from "../../app/store";
import { useNavigate } from 'react-router-dom';
import { getOpenRegister, createOpenRegister } from '../../api';
import { ErrorModal } from '../../components/Commons/ErrorModal';

const OpenRegister = () => {
  const [openingAmount, setOpeningAmount] = useState('');
  const [showError, setShowError] = useState(false);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const { userInfo, setOpenRegister, openRegister } = useStore()
  const navigateTo = useNavigate()

  const handleOpenRegister = async () => {
    const response = await createOpenRegister(openingAmount);
    console.log(response);
    if (response.statusCode === 200 || response.statusCode === 201) {

      setOpenRegister(response.data);
      navigateTo('/dashboard');
    } else {
      setShowError(true);
    }
  }

  const handleCloseModal = () => {
    setShowError(false);
    navigateTo('/dashboard');
  }

  useEffect(() => {
    if (Object.keys(openRegister).length <= 0) {
      //Hay que solicitar el estado de la caja
      const [ userEntityInfo ] = userInfo.entity_users.map((entities) => {
        return entities
      })

      const fetchOpenRegister = async (entityId) => {
        const registerResponse = await getOpenRegister(entityId);

        console.log(registerResponse.status, JSON.stringify(registerResponse.data));

        if (registerResponse.status === 200) {
          setOpenRegister(registerResponse.data);
          navigateTo('/dashboard');
        }
      };

      fetchOpenRegister(userEntityInfo.entities.id);
    } else {
      navigateTo('/dashboard');
    }
  }, [openRegister]);

  return (
    <div className="p-4 max-w-[1080px] mx-auto">
      {/* Register Details Card */}
      <Card className="mb-6">
        {/* Header Navigation */}
        <div className="mb-6">
          <Breadcrumb className="px-2 py-1 rounded">
            <Breadcrumb.Item icon={HiArrowLeft} href='/dashboard'>Volver</Breadcrumb.Item>
            <Breadcrumb.Item>Caja digital</Breadcrumb.Item>
            <Breadcrumb.Item className="text-blue-600">Apertura de caja</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        {/* Main Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy-700">Apertura de caja</h1>
          <p className="text-gray-600">
            Abre tu caja para registrar, ingresar comprobantes, anular y ver tu historial de movimientos.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-4">
            <div className="p-2 bg-green-100 rounded">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-green-500">Datos de caja</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 p-4 rounded-xl shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-500">Nombre cajero</p>
              <p className="mt-1 text-gray-900">{userInfo.surnames} { userInfo.forenames}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Rut cajero</p>
              <p className="mt-1 text-gray-900">{userInfo.nid}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Fecha Apertura</p>
              <p className="mt-1 text-gray-900">{ new Date().toISOString() }</p>
            </div>
          </div>

          <div className="mt-8">
            <Label htmlFor="initial-amount" className="text-lg font-medium text-gray-700">
              ¿Con qué monto abrirás tu caja hoy?
            </Label>
            <div className="mt-2">
              <Label>Fondo inicial</Label>
              <div className="flex gap-4 items-center">
                <TextInput
                  id="initial-amount"
                  type="number"
                  placeholder="$"
                  className="max-w-xs"
                  value={openingAmount}
                  onChange={(e) => setOpeningAmount(e.target.value)}
                />
                <Button color="blue" onClick={() => handleOpenRegister()}>
                  Abrir Caja
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {showError && <ErrorModal message="Ya existe una caja abierta" show={showError} onClose={handleCloseModal} />}
    </div>
  );
};

export default OpenRegister;