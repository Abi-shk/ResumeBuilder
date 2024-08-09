import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Resume from './components/Resume';
import './App.css';
import Header from './components/Header';
// import UploadCSV from './components/UploadCSV';

const App = () => {
  const [resumeData, setResumeData] = useState([]);

  return (
    <div className="App">
      <Header/>
      <FileUpload setResumeData={setResumeData} />
      {/* <UploadCSV/> */}
      <Resume data={resumeData} />
    </div>
  );
};

export default App;
