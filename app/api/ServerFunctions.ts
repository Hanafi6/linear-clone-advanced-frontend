import axios from 'axios';


export let API = 'https://my-json-server.typicode.com/Hanafi6/api-leniar/users'
const baseUrl = 'https://69f7e80ddd0c226688ee0515.mockapi.io/'
// 1. إنشاء الـ Instance
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. دوال الـ CRUD الأساسية (Generics لضمان الـ Type Safety)

// جلب كل البيانات (Read All)
export const getAll = async <T>(endpoint: string): Promise<T[]> => {
  const response = await api.get<T[]>('/'+endpoint);
  return response.data;
};

export const Getusers = async <T>(api:string): Promise<T[]> => {
  const response = (await axios.get<T[]>(api)).data;
  return response;
}

// جلب عنصر واحد (Read Single)
export const getUserById = async <T>(endpoint: string, id: string | number): Promise<T> => {
  console.log(endpoint)
  const response = await axios.get<T>(`${endpoint}/${id}`);
  return response.data ;
};

// جلب عنصر واحد (Read Single)
export const getById = async <T>(endpoint: string, id: string | number): Promise<T> => {
  const response = await api.get<T>(`/${endpoint}/${id}`);
  return response.data ;
};

// إضافة عنصر جديد (Create)
export const create = async <T>(endpoint: string, data: Partial<T>): Promise<T> => {
  const response = await api.post<T>('/'+endpoint, data);
  return response.data;
};

// تحديث عنصر (Update)
export const update = async <T>(endpoint: string, id: string | number, data: Partial<T>): Promise<T> => {
  const response = await api.patch<T>(`/${endpoint}/${id}`, data);
  return response.data;
};

// حذف عنصر (Delete)
export const remove = async (endpoint: string, id: string | number): Promise<void> => {
  const respors = await api.delete(`/${endpoint}/${id}`);
};

export default api;