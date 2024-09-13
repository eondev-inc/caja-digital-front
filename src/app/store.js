import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      formData: {
        name: '',
        forename: '',
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
    }),
    {
      name: 'register-form',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
