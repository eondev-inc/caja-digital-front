import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Alert } from 'flowbite-react';
import { HiDownload, HiExclamationCircle } from 'react-icons/hi';

/**
 * Visor de PDF embebido. Recibe un Blob y lo muestra en un iframe.
 * Ofrece botón de descarga directa.
 *
 * @param {Object}  props
 * @param {Blob}    props.blob      - Blob PDF generado por el backend
 * @param {string}  props.filename  - Nombre del archivo al descargar
 * @param {string}  [props.error]   - Mensaje de error (si aplica)
 */
const ReportViewer = ({ blob, filename, error }) => {
  const [objectUrl, setObjectUrl] = useState(null);

  useEffect(() => {
    if (!blob) {
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(blob);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [blob]);

  if (error) {
    return (
      <Alert color="failure" icon={HiExclamationCircle} className="mt-4" role="alert">
        <span className="font-medium">Error al generar el reporte:</span> {error}
      </Alert>
    );
  }

  if (!objectUrl) return null;

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename ?? 'reporte.pdf';
    a.click();
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Barra de acciones */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Vista previa del reporte generado
        </p>
        <Button color="success" size="sm" onClick={handleDownload}>
          <HiDownload className="mr-2 size-4" aria-hidden="true" />
          Descargar PDF
        </Button>
      </div>

      {/* iframe embebido */}
      <iframe
        src={objectUrl}
        title="Reporte PDF"
        className="h-[600px] w-full rounded-lg border border-gray-200 dark:border-slate-600"
        aria-label="Vista previa del reporte en PDF"
      />
    </div>
  );
};

ReportViewer.propTypes = {
  blob: PropTypes.instanceOf(Blob),
  filename: PropTypes.string,
  error: PropTypes.string,
};

export default ReportViewer;
