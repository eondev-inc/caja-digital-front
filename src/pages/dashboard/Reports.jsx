import { useState, useEffect } from 'react';
import { Card, Breadcrumb, Tabs } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faChartLine,
  faUserMd,
  faHeartPulse,
  faBalanceScale,
} from '@fortawesome/free-solid-svg-icons';
import {
  getDailySalesReport,
  getReconciliationsReport,
  getByProfessionalReport,
  getByPrevisionReport,
  getProfessionals,
  getPrevisions,
} from '../../api';
import ReportFilters from '../../components/Reports/ReportFilters';
import ReportViewer from '../../components/Reports/ReportViewer';

/**
 * Página de Reportes.
 * Contiene 4 tabs: Ventas Diarias, Cuadraturas, Por Profesional, Por Previsión.
 * Cada tab genera un PDF descargable filtrado por fechas.
 */
const Reports = () => {
  const [professionals, setProfessionals] = useState([]);
  const [previsions, setPrevisions] = useState([]);

  const [loadingDaily, setLoadingDaily] = useState(false);
  const [blobDaily, setBlobDaily] = useState(null);
  const [errorDaily, setErrorDaily] = useState(null);

  const [loadingRecon, setLoadingRecon] = useState(false);
  const [blobRecon, setBlobRecon] = useState(null);
  const [errorRecon, setErrorRecon] = useState(null);

  const [loadingProf, setLoadingProf] = useState(false);
  const [blobProf, setBlobProf] = useState(null);
  const [errorProf, setErrorProf] = useState(null);

  const [loadingPrev, setLoadingPrev] = useState(false);
  const [blobPrev, setBlobPrev] = useState(null);
  const [errorPrev, setErrorPrev] = useState(null);

  /** Carga listas de profesionales y previsiones al montar */
  useEffect(() => {
    const loadOptions = async () => {
      const [profResult, prevResult] = await Promise.allSettled([
        getProfessionals(),
        getPrevisions(),
      ]);
      if (profResult.status === 'fulfilled') {
        setProfessionals(Array.isArray(profResult.value) ? profResult.value : []);
      }
      if (prevResult.status === 'fulfilled') {
        setPrevisions(Array.isArray(prevResult.value) ? prevResult.value : []);
      }
    };
    loadOptions();
  }, []);

  const handleDailySales = async (filters) => {
    setLoadingDaily(true);
    setErrorDaily(null);
    setBlobDaily(null);
    const result = await getDailySalesReport(filters);
    setLoadingDaily(false);
    if (result.success) {
      setBlobDaily(result.blob);
    } else {
      setErrorDaily(result.error);
    }
  };

  const handleReconciliations = async (filters) => {
    setLoadingRecon(true);
    setErrorRecon(null);
    setBlobRecon(null);
    const result = await getReconciliationsReport(filters);
    setLoadingRecon(false);
    if (result.success) {
      setBlobRecon(result.blob);
    } else {
      setErrorRecon(result.error);
    }
  };

  const handleByProfessional = async (filters) => {
    setLoadingProf(true);
    setErrorProf(null);
    setBlobProf(null);
    const result = await getByProfessionalReport(filters);
    setLoadingProf(false);
    if (result.success) {
      setBlobProf(result.blob);
    } else {
      setErrorProf(result.error);
    }
  };

  const handleByPrevision = async (filters) => {
    setLoadingPrev(true);
    setErrorPrev(null);
    setBlobPrev(null);
    const result = await getByPrevisionReport(filters);
    setLoadingPrev(false);
    if (result.success) {
      setBlobPrev(result.blob);
    } else {
      setErrorPrev(result.error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Card className="border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <Breadcrumb.Item
              href="/dashboard"
              icon={HiHome}
              className="text-primary-600 dark:text-primary-400"
            >
              Inicio
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-gray-600 dark:text-gray-400">
              Reportes
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faChartBar}
                className="text-2xl text-primary-600 dark:text-primary-400"
                aria-hidden="true"
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Reportes</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Genera y descarga reportes del sistema filtrados por fecha.
            </p>
          </div>

          {/* Tabs */}
          <Tabs aria-label="Reportes disponibles" variant="underline">
            {/* Tab 1: Ventas Diarias */}
            <Tabs.Item
              title="Ventas Diarias"
              icon={() => (
                <FontAwesomeIcon icon={faChartLine} className="mr-2 text-primary-600" aria-hidden="true" />
              )}
            >
              <div className="py-4">
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Listado de transacciones completadas en el período seleccionado.
                </p>
                <ReportFilters
                  reportType="daily-sales"
                  loading={loadingDaily}
                  onGenerate={handleDailySales}
                />
                <ReportViewer
                  blob={blobDaily}
                  filename="ventas-diarias.pdf"
                  error={errorDaily}
                />
              </div>
            </Tabs.Item>

            {/* Tab 2: Cuadraturas */}
            <Tabs.Item
              title="Cuadraturas"
              icon={() => (
                <FontAwesomeIcon icon={faBalanceScale} className="mr-2 text-primary-600" aria-hidden="true" />
              )}
            >
              <div className="py-4">
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Historial de cuadraturas y cierres de caja en el período seleccionado.
                </p>
                <ReportFilters
                  reportType="reconciliations"
                  loading={loadingRecon}
                  onGenerate={handleReconciliations}
                />
                <ReportViewer
                  blob={blobRecon}
                  filename="cuadraturas.pdf"
                  error={errorRecon}
                />
              </div>
            </Tabs.Item>

            {/* Tab 3: Por Profesional */}
            <Tabs.Item
              title="Por Profesional"
              icon={() => (
                <FontAwesomeIcon icon={faUserMd} className="mr-2 text-primary-600" aria-hidden="true" />
              )}
            >
              <div className="py-4">
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Atenciones y montos agrupados por profesional en el período seleccionado.
                </p>
                <ReportFilters
                  reportType="by-professional"
                  professionals={professionals}
                  loading={loadingProf}
                  onGenerate={handleByProfessional}
                />
                <ReportViewer
                  blob={blobProf}
                  filename="por-profesional.pdf"
                  error={errorProf}
                />
              </div>
            </Tabs.Item>

            {/* Tab 4: Por Previsión */}
            <Tabs.Item
              title="Por Previsión"
              icon={() => (
                <FontAwesomeIcon icon={faHeartPulse} className="mr-2 text-primary-600" aria-hidden="true" />
              )}
            >
              <div className="py-4">
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Atenciones y montos agrupados por previsión de salud en el período seleccionado.
                </p>
                <ReportFilters
                  reportType="by-prevision"
                  previsions={previsions}
                  loading={loadingPrev}
                  onGenerate={handleByPrevision}
                />
                <ReportViewer
                  blob={blobPrev}
                  filename="por-prevision.pdf"
                  error={errorPrev}
                />
              </div>
            </Tabs.Item>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default Reports;
