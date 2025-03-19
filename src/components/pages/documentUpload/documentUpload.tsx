import React, { useState } from 'react';
import { documentRequests } from '../../../api/document-api';
import { toast } from 'react-toastify';

const DocumentUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [showCheckbox, setShowCheckbox] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      // Validate file type (image only)
      if (!selectedFile.type.startsWith('image/')) {
        toast.error('Please upload a valid image file.');
        return;
      }

      setFile(selectedFile);
      setFileUploaded(true);
      setShowCheckbox(true);
    } else {
      setFile(null);
      setFileUploaded(false);
      setShowCheckbox(false);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (event.target.checked && file) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error('No document selected!');
      return;
    }
  
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append('file', file); // Append the file
    formData.append('prompt', prompt); // Append the prompt
  
    // Debugging: Log FormData entries
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      const response = await documentRequests.addDocumentApi(formData);
      if (!response.error) {
        toast.success('Document successfully submitted!');
        setFile(null);
        setFileUploaded(false);
        setShowCheckbox(false);
        setIsChecked(false);
        setResult(response.data);
      } else {
        toast.error(response.error || 'An error occurred while submitting the document');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while submitting the document');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f4f4f9', padding: '20px', width: '100vw' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', height:"210px",boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', width: '80%', maxWidth: '600px', textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Upload Document</h2>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'block', margin: '10px auto', padding: '10px' }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ display: 'block', margin: '10px auto', padding: '10px', width: '80%' }}
          />
        </div>
        {showCheckbox && (
          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                disabled={isSubmitting}
                style={{ marginRight: '10px' }}
              />
              I confirm that I have uploaded the correct document.
            </label>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', height: '210px', marginBottom: '19px', marginLeft: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', width: '80%', maxWidth: '600px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>Results</h2>
        {result ? (
          <p style={{ color: '#333', wordWrap: 'break-word' }}>{result}</p>
        ) : (
          <p style={{ color: '#999' }}>Results will be displayed here after file processing.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;