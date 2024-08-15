import axiosInstance from '@/utils/axiosInstances';

export const refresh = async ({ token }) => {
    return await axiosInstance.post('/auth/refresh', {
      refresh_token: token,
    });
};