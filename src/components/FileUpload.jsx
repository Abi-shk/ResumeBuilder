import React from 'react';
import { csvToJson } from '../utils';

const FileUpload = ({ setResumeData }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const data = await csvToJson(file);
        setResumeData(data);
        console.log(data);
      } catch (error) {
        console.error('Error parsing CSV:', error);
      }
    }
  };

  return (
    <div className='text-center flex items-center justify-center flex-col'>
            <h1 className='font-semibold mt-4 text-3xl'>Resume Maker</h1>
            <div className='h-auto bg-slate-300 w-auto mt-4 rounded-lg mb-4'>
      <input type="file" accept=".csv" onChange={handleFileUpload}  className='p-6'/>

            </div>
    </div>
  );
};

export default FileUpload;
