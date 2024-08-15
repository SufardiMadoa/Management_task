import axiosInstance from '@/utils/axiosInstances';
import { useAuthStore } from '@/store/useAuthStore'; // Path ini mungkin perlu disesuaikan

export const todos = async (auth_token) => {
    const res = await axiosInstance.get('/todos', {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    });
    // console.log('Login response:', res.data);
    return res.data;
  };