// import React, { useState } from 'react';
// import FileUpload from './components/FileUpload';
// // import Resume from './components/Resume';
// import './App.css';
// import Header from './components/Header';
// import Resume3 from './components/Resume3';
// import Home from './components/Home';
// // import Resume2 from './components/Resume2';
// // import UploadCSV from './components/UploadCSV';

// const App = () => {
//   const [resumeData, setResumeData] = useState([]);

//   return (
//     <div className="App">
//       <Header/>
//       <Home/>
//       {/* <FileUpload setResumeData={setResumeData} /> */}
//       {/* <UploadCSV/> */}
//       {/* <Resume data={resumeData} /> */}
//       {/* <Resume2 data={resumeData}/> */}
//       {/* <Resume3 data={resumeData}/> */}
//     </div>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Resume from './components/Resume';
import Resume3 from './components/Resume3';
import Resume2 from './components/Resume2';
import Home from './components/Home';
import Resume4 from './components/Resume4';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/template1" element={<Resume />} />
        <Route path="/template2" element={<Resume2 />} />
        <Route path="/template3" element={<Resume3 />} />
        <Route path="/template4" element={<Resume4 />} />

      </Routes>
    </Router>
  );
}

export default App;
