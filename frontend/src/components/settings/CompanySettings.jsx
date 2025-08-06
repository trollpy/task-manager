import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';
import PropTypes from 'prop-types';

const CompanySettings = ({ company, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: company.name,
    logo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Company Settings</h2>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <Input
          label="Company Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Logo</label>
          {company.logo ? (
            <img src={company.logo} alt="Company Logo" className="h-16 w-16 object-contain" />
          ) : (
            <div className="h-16 w-16 bg-gray-200 flex items-center justify-center text-gray-500">
              No logo
            </div>
          )}
        </div>
        <FileUpload
          onFileChange={(file) => setFormData(prev => ({ ...prev, logo: file }))}
          accept="image/*"
          label="Upload New Logo"
        />
        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

CompanySettings.propTypes = {
  company: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default CompanySettings;