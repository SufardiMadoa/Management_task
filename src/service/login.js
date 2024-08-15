import axiosInstance from '@/utils/axiosInstances';

export const login = async ({ email, password }) => {
  const res = await axiosInstance.post('/auth/login', {
    email,
    password,
  });
  console.log('Login response:', res.data);
  return res.data;
};


