import { useState, useEffect } from 'react';
import {
  getDailySalesReport,
  getReconciliationsReport,
  getByProfessionalReport,
  getByPrevisionReport,
  getProfessionals,
  getPrevisions,
} from '../../../../api';

/**
 * Hook that manages all Reports page state and side-effects:
 * catalog loading (professionals, previsions) and 4 report type handlers.
 */
export const useReports = () => {
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

  /** Load professionals and previsions catalogs on mount */
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

  return {
    professionals,
    previsions,
    loadingDaily,
    blobDaily,
    errorDaily,
    handleDailySales,
    loadingRecon,
    blobRecon,
    errorRecon,
    handleReconciliations,
    loadingProf,
    blobProf,
    errorProf,
    handleByProfessional,
    loadingPrev,
    blobPrev,
    errorPrev,
    handleByPrevision,
  };
};
