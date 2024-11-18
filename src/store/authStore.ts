import create from 'zustand';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

interface AuthState {
  token: string | null;
  fingerprint: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('token'),
  fingerprint: null,
  loading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return;

    try {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      set({ fingerprint: visitorId, initialized: true });
    } catch (error) {
      set({ error: 'Failed to initialize fingerprint' });
    }
  },

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fingerprint: get().fingerprint
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      localStorage.setItem('token', data.token);
      set({ token: data.token, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  register: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fingerprint: get().fingerprint
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      localStorage.setItem('token', data.token);
      set({ token: data.token, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null });
  },
}));

export default useAuthStore;
