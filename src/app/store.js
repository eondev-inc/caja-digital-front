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
    }
  )
);
