import axiosInstance from '@/utils/axiosInstances';
import { useAuthStore } from '@/store/useAuthStore'; // Sesuaikan path ini

// Fungsi untuk mendapatkan item berdasarkan todo id
export const todo = async (auth_token, todoId) => {
  const res = await axiosInstance.get(`/todos/${todoId}/items`, {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
  return res.data;
};