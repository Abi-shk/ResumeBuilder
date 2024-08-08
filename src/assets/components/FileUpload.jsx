import React from 'react';
import { csvToJson } from '../../utils';

const FileUpload = ({ setResumeData }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = await csvToJson(file);
      setResumeData(data);
      console.log(data)
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
