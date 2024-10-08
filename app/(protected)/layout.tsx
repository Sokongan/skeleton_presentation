
import AuthLayout from '@/components/AuthLayout'; // Adjust the path if necessary
import { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children?: ReactNode }) {
  return (
    <AuthLayout>
        {children}
    </AuthLayout>
  );
}