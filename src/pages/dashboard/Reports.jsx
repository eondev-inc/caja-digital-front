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
import ReportFilters from '../../components/Reports/ReportFilters';
import ReportViewer from '../../components/Reports/ReportViewer';
import { useReports } from './reports/hooks/useReports';

/**
 * Página de Reportes.
 * Contiene 4 tabs: Ventas Diarias, Cuadraturas, Por Profesional, Por Previsión.
 * Cada tab genera un PDF descargable filtrado por fechas.
 */
const Reports = () => {
  const r = useReports();

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-5xl px-4 py-6">
        <Card className="border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
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

          <Tabs aria-label="Reportes disponibles" variant="underline">
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
                <ReportFilters reportType="daily-sales" loading={r.loadingDaily} onGenerate={r.handleDailySales} />
                <ReportViewer blob={r.blobDaily} filename="ventas-diarias.pdf" error={r.errorDaily} />
              </div>
            </Tabs.Item>

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
                <ReportFilters reportType="reconciliations" loading={r.loadingRecon} onGenerate={r.handleReconciliations} />
                <ReportViewer blob={r.blobRecon} filename="cuadraturas.pdf" error={r.errorRecon} />
              </div>
            </Tabs.Item>

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
                  professionals={r.professionals}
                  loading={r.loadingProf}
                  onGenerate={r.handleByProfessional}
                />
                <ReportViewer blob={r.blobProf} filename="por-profesional.pdf" error={r.errorProf} />
              </div>
            </Tabs.Item>

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
                  previsions={r.previsions}
                  loading={r.loadingPrev}
                  onGenerate={r.handleByPrevision}
                />
                <ReportViewer blob={r.blobPrev} filename="por-prevision.pdf" error={r.errorPrev} />
              </div>
            </Tabs.Item>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};

export default Reports;
