import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Header from './Header';
import Footer from './Footer';
import LoadingOverlay from './LoadingOverlay';
import html2pdf from 'html2pdf.js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Resume = () => {
  const [resumeData, setResumeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  if (!resumeData || resumeData.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-col flex-grow items-center p-8 bg-gray-50">
          <FileUpload setResumeData={setResumeData} />
          <p className="text-center mt-4">Please Upload a CSV File</p>
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
    const totalItems = resumeData.length;

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
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
            onClick={downloadAllPDFs}
          >
            Download All PDFs
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData.map((item, index) => (
            <div
              key={index}
              id={`resume-${index}`}
              className="bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-[700px] ml-10 mt-4"
              style={{ fontSize: '12pt', pageBreakInside: 'avoid'}}
            >
              <div className="text-center mb-4">
                <h1 className="text-3xl font-extrabold">{item.Name}</h1>
                <p className="text-lg text-gray-700">{item.Role}</p>
                <p className="text-gray-600">
                  <a href={`mailto:${item.Email}`} className="hover:underline">{item.Email}</a> | {item.Phone} | {item.Address}
                </p>
                <p>
                  <a href={item.LinkedIn} className="text-blue-600 hover:underline">{item.LinkedIn}</a>
                </p>
              </div>

              {/* Profile Section */}
              <section className="mb-4">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2">PROFILE</h2>
                <p className="mt-2 text-gray-800">{item.Profile}</p>
              </section>

              {/* Professional Experience Section */}
              {item.ProfessionalExperience && item.ProfessionalExperience.length > 0 && (
                <section className="mb-4">
                  <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2">PROFESSIONAL EXPERIENCE</h2>
                  {item.ProfessionalExperience.map((exp, idx) => (
                    <div key={idx} className="mt-2">
                      <h3 className="text-lg font-bold">{exp.title}</h3>
                      <p className="text-gray-600">{exp.duration}</p>
                      <p className="text-gray-700 mt-1">{exp.company}</p>
                      {exp.details && <p className="mt-2 text-gray-800">{exp.details}</p>}
                    </div>
                  ))}
                </section>
              )}

              {/* Education Section */}
              <section className="mb-4">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2">EDUCATION</h2>
                {item.Education.map((edu, idx) => (
                  <div key={idx} className="mt-2 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold flex items-center">
                        {edu.degree}
                        {edu.year && <span className="ml-2 text-gray-600">({edu.year})</span>}
                      </h3>
                      <p className="text-gray-700 ">{edu.institution}</p>
                      <p className="text-gray-600">{edu.details}</p>
                    </div>
                  </div>
                ))}
              </section>

              {/* Internships and Trainings Section */}
              <section className="mb-4">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2">INTERNSHIPS AND TRAININGS</h2>
                <ul className="list-none pl-2 mt-2 text-gray-800">
                  {item.InternshipsAndTrainings.map((training, idx) => (
                    <li key={idx} className="mt-1 flex items-start">
                      <span style={{ fontSize: '1.2em', color: 'black' }}>•</span>
                      <span className="ml-2 mt-1">{training}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Projects Section */}
              <section className="mb-4">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2">PROJECTS</h2>
                <ul className="list-none pl-2 mt-2 text-gray-800">
                  {item.Projects.map((project, idx) => (
                    <li key={idx} className="mt-1 flex items-center">
                      <a href={project.url} className="text-black hover:underline">
                        <span style={{ fontSize: '1.2em', color: 'black' }}>•</span>
                        <span className="ml-2">{project.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Skills Section */}
              <section className="mb-4">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2">SKILLS</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  {item.Skills.map((skill, idx) => (
                    <div key={idx} className="list-none pl-2">
                      <li className="mt-1 text-gray-800 text-base flex items-start">
                        <span style={{ fontSize: '1.2em', color: 'black' }}>•</span>
                        <span className="ml-2">{skill}</span>
                      </li>
                    </div>
                  ))}
                </div>
              </section>

              {/* Language Section */}
              <section className="mb-4">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2">LANGUAGES</h2>
                <ul className="list-none pl-2 mt-2 text-gray-800">
                  <div className="grid grid-cols-4">
                    {item.Languages.map((language, idx) => (
                      <li key={idx} className="mt-1 flex items-start">
                        <span style={{ fontSize: '1.2em', color: 'black' }}>•</span>
                        <span className="ml-2 mt-1">{language}</span>
                      </li>
                    ))}
                  </div>
                </ul>
              </section>

              {/* Declaration Section */}
              <section className="mb-4">
                <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2">DECLARATION</h2>
                <p className="mt-2 text-gray-800">{item.Declaration}</p>
              </section>

              <div className="text-center">
                <button
                  className="download-button mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
                  onClick={() => downloadPDF(index, item.Name)}
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <LoadingOverlay isLoading={isLoading} loadingProgress={loadingProgress} />
    </>
  );
};

export default Resume;
