import React, { useState } from 'react';

const FileUploadComponent = () => {
  const [file, setFile] = useState(null); // Stores the file object
  const [fileUrl, setFileUrl] = useState(null); // Stores the preview URL

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile); // Save the file for future backend use
      setFileUrl(URL.createObjectURL(uploadedFile)); // Generate a preview URL
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <label htmlFor="file-upload" className="cursor-pointer font-medium text-gray-600">
        Click or Drag to Upload
      </label>
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        className="hidden"
      />
      {file && (
        <div className="mt-2 text-gray-600">
          <span>Uploaded file: </span>
          <span className="font-medium">{file.name}</span>
        </div>
      )}
      {fileUrl && (
        <div className="mt-4">
          <img src={fileUrl} alt="Uploaded preview" className="max-w-xs max-h-64" />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;