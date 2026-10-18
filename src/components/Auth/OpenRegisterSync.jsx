import { useEffect, useRef } from 'react';
import { getOpenRegister } from '../../api';
import { useStore } from '../../app/store';

/**
 * Rehydrates `openRegister` from the server once the session is ready.
 * The store persists only formData/darkMode, so after a reload screens
 * gated on `openRegister` would wrongly show "no open register" even
 * when the backend still has one. Runs once per entity/session and
 * publishes `registerSynced` so screens wait for this first resolution
 * instead of assuming there is no register. Otherwise a cold page load
 * latches the "no register" modal before this fetch settles.
 */
export const OpenRegisterSync = () => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const entityId = useStore(
    (state) => state.userInfo?.entity_users?.[0]?.entities?.id,
  );
  const openRegisterId = useStore((state) => state.openRegister?.id);
  const setOpenRegister = useStore((state) => state.setOpenRegister);
  const setRegisterSynced = useStore((state) => state.setRegisterSynced);
  const syncedEntityId = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      syncedEntityId.current = null;
      setRegisterSynced(false);
      return;
    }
    // Nothing to fetch: the register is already in the store, this entity
    // was already synced, or the user has no entity to sync against.
    if (openRegisterId || syncedEntityId.current === entityId || !entityId) {
      setRegisterSynced(true);
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
      } finally {
        setRegisterSynced(true);
      }
    };

    sync();
  }, [
    isAuthenticated,
    entityId,
    openRegisterId,
    setOpenRegister,
    setRegisterSynced,
  ]);

  return null;
};
