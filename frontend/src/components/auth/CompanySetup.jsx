import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../ui/Input';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';


const CompanySetup = () => {
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setupCompany } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName) {
      setError('Company name is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await setupCompany(companyName, logo);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Company Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Input
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <FileUpload
          onFileChange={setLogo}
          accept="image/*"
          label="Upload Company Logo (Optional)"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Setting up...' : 'Complete Setup'}
        </Button>
      </form>
    </div>
  );
};

export default CompanySetup;