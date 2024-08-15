import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/useAuthStore';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const formSchema = z.object({
    email: z.string().email({ message: 'Email tidak valid' }),
    password: z.string().min(8, { message: 'Password harus memiliki minimal 8 karakter' }),
  });

  const { auth_token, doLogin } = useAuthStore();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState({ type: '', message: '' });
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const data = await doLogin(values);
      if ( data.auth_token) {
        setLoginStatus({ type: 'success', message: 'Login berhasil!' });
      
      } else {
        setLoginStatus({ type: 'error', message: 'Login gagal. Periksa email dan password Anda.' });
      }
    } catch (error) {
      setLoginStatus({ type: 'error', message: 'Login gagal. Periksa email dan password Anda.' });
    }
  };

  useEffect(() => {
    if (auth_token) {
      console.log('Navigating to dashboard...');
      navigate('/dashboard');
    }
  },[auth_token, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="max-w-md w-full p-3 shadow-lg rounded-lg">
        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" className="w-40" />
        </div>
        <CardHeader>
          <CardTitle className="text-xl text-green-600">Masuk</CardTitle>
          <CardDescription>
            Masukkan detail akun Anda untuk masuk.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                id="email"
                {...form.register('email')}
                placeholder="example@gmail.com"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {form.formState.errors.email && <span className="text-red-600 text-sm">{form.formState.errors.email.message}</span>}
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...form.register('password')}
                  placeholder="******"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {/* {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} */}
                </button>
              </div>
              {form.formState.errors.password && <span className="text-red-600 text-sm">{form.formState.errors.password.message}</span>}
            </div>
            <Button type="submit" className="w-full bg-green-600">
              Masuk
            </Button>
            {loginStatus.message && (
              <div className={`mt-4 text-sm ${loginStatus.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {loginStatus.message}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;