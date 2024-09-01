// Resume.js
import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Header from './Header';
import ResumeContent from './ResumeContent';
import LoadingOverlay from './LoadingOverlay';
import html2pdf from 'html2pdf.js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Footer from './Footer';

const Resume2 = () => {
  const [resumeData, setResumeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  if (!resumeData || resumeData.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-col flex-grow items-center p-8 bg-gray-50">
          <FileUpload setResumeData={setResumeData} />
          <p className='text-center mt-4'>Please Upload a CSV File</p>
        </div>
        <Footer />
      </div>
    );
  }

  const generatePDF = async (element, name) => {
    const downloadButtons = element.querySelectorAll('.download-button');
    downloadButtons.forEach(button => button.style.display = 'none');

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${name.toUpperCase()}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    const pdf = html2pdf().from(element).set(opt).toPdf();

    pdf.get('pdf').then(function (pdfObj) {
      const totalPages = pdfObj.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdfObj.setPage(i);
        pdfObj.setFontSize(10);
      }
    });

    const blob = await pdf.outputPdf('blob');

    downloadButtons.forEach(button => button.style.display = 'block');

    return blob;
  };

  const downloadPDF = async (index, name) => {
    const element = document.getElementById(`resume-${index}`);
    const blob = await generatePDF(element, name);
    saveAs(blob, `${name.toUpperCase()}.pdf`);
  };

  const downloadAllPDFs = async () => {
    setIsLoading(true);
  
    const zip = new JSZip();
  
    for (const [index, item] of resumeData.entries()) {
      const element = document.getElementById(`resume-${index}`);
      const blob = await generatePDF(element, item.Name);
      
      // Generate a unique filename by appending the index to the name
      const fileName = `${item.Name.toUpperCase()}_${index + 1}.pdf`;
      
      zip.file(fileName, blob);
      setLoadingProgress(((index + 1) / resumeData.length) * 100);
    }
  
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'all_resumes.zip');
  
    setIsLoading(false);
    setLoadingProgress(0);
  };
  

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-8 bg-gray-50">
        <div className="flex flex-wrap items-center justify-center w-full space-x-4 mb-4">
          {/* <FileUpload setResumeData={setResumeData} /> */}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
            onClick={downloadAllPDFs}
          >
            Download All PDFs
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData.map((item, index) => (
            <ResumeContent key={index} item={item} index={index} downloadPDF={downloadPDF} />
          ))}
        </div>
      </div>
      <LoadingOverlay isLoading={isLoading} loadingProgress={loadingProgress} />
    </>
  );
};

export default Resume2;
