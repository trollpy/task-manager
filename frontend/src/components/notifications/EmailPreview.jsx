import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import PropTypes from 'prop-types';

const EmailPreview = ({ email, onSendTest, onSave }) => {
  const [subject, setSubject] = useState(email.subject);
  const [content, setContent] = useState(email.content);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Email Template: {email.name}</h2>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={() => onSendTest(email.id)}>
            Send Test
          </Button>
          <Button onClick={() => onSave(email.id, { subject, content })}>
            Save Changes
          </Button>
        </div>
      </div>
      <Card className="p-4">
        <Input
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mb-4"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="font-medium mb-2">Preview</h3>
        <div className="border p-4">
          <h4 className="text-lg font-medium mb-2">{subject}</h4>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </Card>
    </div>
  );
};

EmailPreview.propTypes = {
  email: PropTypes.object.isRequired,
  onSendTest: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default EmailPreview;