import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import Card from '../components/ui/Card';

const Register = () => {
  const handleRegister = (name, email, password) => {
    console.log('Register with:', name, email, password);
    // Actual registration logic would be handled by auth context
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        <RegisterForm onSubmit={handleRegister} />
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login here
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;