import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import FileUpload from './FileUpload';
import Header from './Header';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
const Resume3 = () => {
  const [resumeData, setResumeData] = useState([]);

  if (!resumeData || resumeData.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center p-8 bg-gray-50">
          <FileUpload setResumeData={setResumeData} />
          <p className='text-center mt-4'>Please Upload a CSV File</p>
        </div>
      </>
    );
  }

  const downloadPDF = (resumeId) => {
    const element = document.getElementById(`resume-${resumeId}`);
    const button = document.querySelector(`#resume-${resumeId} .download-button`);
    button.style.display = 'none';

    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'Resume.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().from(element).set(opt).toPdf().get('pdf').then((pdf) => {
      pdf.save('resume.pdf');
      button.style.display = 'block';
    });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-8 bg-gray-50">
        {resumeData.map((item, index) => (
          <div
            key={index}
            id={`resume-${index}`}
            className="relative bg-white rounded-lg shadow-md mb-8 w-full max-w-[900px]"
            style={{ fontSize: '12pt', pageBreakInside: 'avoid' }}
          >
          <div className="flex">
  <div className="w-1/3 p-6 bg-gray-200 text-gray-800 flex flex-col items-center">
    <div className="text-center mb-4">
      <h1 className="text-3xl font-extrabold">{item.Name}</h1>
      <p className="text-lg text-gray-700">{item.Role}</p>
    </div>
    <div className="mb-4 text-gray-600">
      <p className="flex items-center mb-2">
        <FaEnvelope className="mr-2 text-gray-600" />
        <a href={`mailto:${item.Email}`} className="hover:underline">{item.Email}</a>
      </p>
      <p className="flex items-center mb-2">
        <FaPhone className="mr-2 text-gray-600" />
        {item.Phone}
      </p>
      <p className="flex items-center">
        <FaMapMarkerAlt className="mr-2 text-gray-600" />
        {item.Address}
      </p>
    </div>
    <div className="text-center">
      <p>
        <a href={item.LinkedIn} className="text-blue-600 hover:underline">LinkedIn</a>
      </p>
    </div>

                <section className="mb-4">
                  <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2">PROFILE</h2>
                  <p className="mt-2">{item.Profile}</p>
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2">EDUCATION</h2>
                  {item.Education.map((edu, idx) => (
                    <div key={idx} className="mt-2">
                      <h3 className="text-lg font-bold">
                        {edu.degree}
                        {edu.year && <span className="ml-2 text-gray-600">({edu.year})</span>}
                      </h3>
                      <p>{edu.institution}</p>
                      <p className="text-gray-600">{edu.details}</p>
                    </div>
                  ))}
                </section>

                <section className="mb-4">
                  <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2">DECLARATION</h2>
                  <p className="mt-2">{item.Declaration}</p>
                </section>
              </div>

              <div className="w-2/3 p-6">
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

                <section className="mb-4">
                  <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2">LANGUAGES</h2>
                  <ul className="grid grid-cols-4 gap-4 mt-2 text-gray-800 list-none pl-0">
                    {item.Languages.map((language, idx) => (
                      <li key={idx} className="mt-1 flex items-center">
                        <span style={{ fontSize: '1.2em', color: 'black' }}>•</span>
                        <span className="ml-2">{language}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <button
                className="download-button px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => downloadPDF(index)}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Resume3;
