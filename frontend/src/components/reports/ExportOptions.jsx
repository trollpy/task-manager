import { useState } from 'react';
import Dropdown from '../ui/Dropdown';
import Button from '../ui/Button';

const ExportOptions = () => {
  const [format, setFormat] = useState('PDF');
  const [range, setRange] = useState('This Month');

  const handleExport = () => {
    console.log(`Exporting ${range} report as ${format}`);
    // Actual export logic would go here
  };

  return (
    <div className="flex space-x-2">
      <Dropdown
        trigger={
          <button className="px-3 py-1 border rounded-md">
            {format}
          </button>
        }
      >
        {['PDF', 'CSV', 'Excel'].map(format => (
          <button
            key={format}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setFormat(format)}
          >
            {format}
          </button>
        ))}
      </Dropdown>
      <Dropdown
        trigger={
          <button className="px-3 py-1 border rounded-md">
            {range}
          </button>
        }
      >
        {['This Week', 'This Month', 'Last Month', 'Custom Range'].map(range => (
          <button
            key={range}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => setRange(range)}
          >
            {range}
          </button>
        ))}
      </Dropdown>
      <Button size="sm" onClick={handleExport}>
        Export
      </Button>
    </div>
  );
};

export default ExportOptions;