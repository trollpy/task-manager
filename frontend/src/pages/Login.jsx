import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Card from '../components/ui/Card';

const Login = () => {
  const handleLogin = (email, password) => {
    console.log('Login with:', email, password);
    // Actual login logic would be handled by auth context
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login to SmartTasker</h1>
        <LoginForm onSubmit={handleLogin} />
        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Register here
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;