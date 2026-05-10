import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('obrascost_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('obrascost_token');
      // Evitar loop si ya estamos en /login
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login?reason=expired');
      }
    }
    return Promise.reject(error);
  },
);

export const getData = async <T>(url: string): Promise<T> => {
  const res = await api.get<T>(url);
  return res.data;
};

export const postData = async <Body, Res = Body>(url: string, body: Body): Promise<Res> => {
  const res = await api.post<Res>(url, body);
  return res.data;
};

export const patchData = async <Body, Res = Body>(url: string, body: Body): Promise<Res> => {
  const res = await api.patch<Res>(url, body);
  return res.data;
};

export const deleteData = async (url: string): Promise<void> => {
  await api.delete(url);
};
