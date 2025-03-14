import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      formData: {
        surnames: '',
        forenames: '',
        nidType: 'rut',
        nid: '',
        email: '',
        password: '',
        confirmPassword: '',
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

    }),
    {
      name: 'allData',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
