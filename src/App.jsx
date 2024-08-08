import React, { useState } from 'react';
import FileUpload from './assets/components/FileUpload';
import Resume from './assets/components/Resume';
import './App.css';
import UploadCSV from './assets/components/UploadCSV';

const App = () => {
  const [resumeData, setResumeData] = useState([]);

  return (
    <div className="App">
      <h1>Resume Maker</h1>
      <FileUpload setResumeData={setResumeData} />
      <UploadCSV/>
      <Resume data={resumeData} />
    </div>
  );
};

export default App;
