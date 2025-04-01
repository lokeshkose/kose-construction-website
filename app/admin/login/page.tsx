'use client';
import LoginCard from '@/components/common/LoginCard';
import { useMessageContext } from '@/components/common/MessageProvider';
import { ApiWithoutToken } from '@/service/axiosService';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { success } = useMessageContext();
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleLogin = async (values: { mobile: string; password: string }) => {
    try {
      const response = await ApiWithoutToken.post('/api/user/login', values);
      if (response.status === 200) {
        router.push('/admin/dashboard/quotes');
        localStorage.setItem('token', response?.data?.token);
        localStorage.setItem('user', response?.data?.user);
        success(t('login.success_message'))
      }
    } catch (error) {}
  };
  return (
    <>
      <LoginCard onLogin={handleLogin}></LoginCard>
    </>
  );
};

export default Login;
