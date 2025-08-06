import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="text-center p-8 max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;