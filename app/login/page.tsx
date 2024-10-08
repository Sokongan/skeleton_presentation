import { LoginForm } from '@/components/LoginForm';
import { ModeToggle } from '@/components/ModeToggle';

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="absolute top-4 right-4">
                <ModeToggle />
            </div>
            <LoginForm />
        </div>
    );
}
