import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="h-screen">
      <div className="flex h-full items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
