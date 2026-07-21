import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // Datos del formulario de registro — no incluye password ni confirmPassword
      // para evitar persistir credenciales en sessionStorage
      formData: {
        forenames: '',
        surnames: '',
        nid: '',
        email: '',
        entity_id: '',
        checkBox: false,
      },
      setFormData: (formData) => set({ formData }),

      accessToken: '',
      setAccessToken: (accessToken) => set({ accessToken }),

      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

      userInfo: {},
      setUserInfo: (userInfo) => set({ userInfo }),

      openRegister: {},
      setOpenRegister: (openRegister) => set({ openRegister }),

      // Preferencia de modo oscuro — persiste en sessionStorage
      darkMode: false,
      setDarkMode: (darkMode) => set({ darkMode }),
    }),
    {
      name: 'allData',
      storage: createJSONStorage(() => sessionStorage),
      version: 2,
      // Persist only non-sensitive UI state. Auth/session data must remain in memory.
      partialize: (state) => ({
        formData: state.formData,
        darkMode: state.darkMode,
      }),
      migrate: (persistedState = {}, version) => {
        if (version < 2) {
          // Whitelist: only non-sensitive UI state. Drops any legacy
          // auth/session keys (accessToken, isAuthenticated, userInfo,
          // openRegister) so they cannot leak across the v1 -> v2 upgrade.
          return {
            formData: persistedState.formData ?? {
              forenames: '',
              surnames: '',
              nid: '',
              email: '',
              entity_id: '',
              checkBox: false,
            },
            darkMode: persistedState.darkMode ?? false,
          };
        }

        return persistedState;
      },
    },
  ),
);
