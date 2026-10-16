import { useEffect, useRef } from 'react';
import { getOpenRegister } from '../../api';
import { useStore } from '../../app/store';

/**
 * Rehydrates `openRegister` from the server once the session is ready.
 * The store persists only formData/darkMode, so after a reload screens
 * gated on `openRegister` would wrongly show "no open register" even
 * when the backend still has one. Runs once per entity/session.
 */
export const OpenRegisterSync = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const entityId = useStore(
    (state) => state.userInfo?.entity_users?.[0]?.entities?.id,
  );
  const openRegisterId = useStore((state) => state.openRegister?.id);
  const setOpenRegister = useStore((state) => state.setOpenRegister);
  const syncedEntityId = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      syncedEntityId.current = null;
      return;
    }
    if (!entityId || openRegisterId || syncedEntityId.current === entityId) {
      return;
    }
    syncedEntityId.current = entityId;

    const sync = async () => {
      try {
        const response = await getOpenRegister(entityId);
        if (response?.status === 200) {
          setOpenRegister(response.data);
        }
      } catch {
        // Network failure: keep the store empty; screens keep their guard.
      }
    };

    sync();
  }, [isAuthenticated, entityId, openRegisterId, setOpenRegister]);

  return null;
};
