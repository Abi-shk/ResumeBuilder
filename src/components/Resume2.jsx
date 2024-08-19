import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { FaUser, FaGraduationCap, FaBriefcase, FaProjectDiagram, FaTools, FaLanguage, FaFileAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import FileUpload from './FileUpload';
import Header from './Header';

const Resume = () => {
  const [resumeData, setResumeData] = useState([]);

  if (!resumeData || resumeData.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center p-8 bg-gray-50">
          <FileUpload setResumeData={setResumeData} />
          <p className="text-center mt-4">Please Upload a CSV File</p>
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
      <div className="flex flex-col items-center p-4 bg-gray-50 font-serif">
        {resumeData.map((item, index) => (
          <div
            key={index}
            id={`resume-${index}`}
            className="bg-white p-4 rounded-lg shadow-md mb-4 w-full max-w-[700px] ml-10 mt-4"
            style={{ fontSize: '10pt', pageBreakInside: 'avoid' }}
          >
          <div className="text-center mb-4">
  <h1 className="text-3xl font-extrabold">{item.Name}</h1>
  <p className="text-base text-gray-700">{item.Role}</p>
  <div className="flex justify-center items-center space-x-4 text-gray-600">
    <div className="flex items-center">
      <FaPhoneAlt className="mr-1" />
      <span>{item.Phone}</span>
    </div>
    <div className="flex items-center">
      <FaEnvelope className="mr-1" />
      <a href={`mailto:${item.Email}`} className="hover:underline">{item.Email}</a>
    </div>
    <div className="flex items-center">
      <FaMapMarkerAlt className="mr-1" />
      <span>{item.Address}</span>
    </div>
    <div className="flex items-center">
      <FaLinkedin className="mr-1 text-blue-600" />
      <a href={item.LinkedIn} className="text-blue-600 hover:underline">LinkedIn</a>
    </div>
  </div>
</div>


            <Section title="PROFILE" icon={<FaUser />} content={item.Profile} />

            {item.ProfessionalExperience && item.ProfessionalExperience.length > 0 && (
              <Section title="PROFESSIONAL EXPERIENCE" icon={<FaBriefcase />}>
                {item.ProfessionalExperience.map((exp, idx) => (
                  <div key={idx} className="mt-2">
                    <h3 className="text-lg font-bold">{exp.title}</h3>
                    <p className="text-gray-600">{exp.duration}</p>
                    <p className="text-gray-700 mt-1">{exp.company}</p>
                    {exp.details && <p className="mt-1 text-gray-800">{exp.details}</p>}
                  </div>
                ))}
              </Section>
            )}

           <Section title="EDUCATION" icon={<FaGraduationCap />}>
  {item.Education.map((edu, idx) => (
    <div key={idx} className="mt-2">
      <h3 className="text-lg font-bold">
        {edu.degree} 
        {edu.year && <span className="text-gray-600"> ({edu.year})</span>}
      </h3>
      <p className="text-gray-700">{edu.institution}</p>
      <p className="text-gray-600">{edu.details}</p>
    </div>
  ))}
</Section>


            <Section title="INTERNSHIPS AND TRAININGS" icon={<FaTools />}>
              <ul className="list-none pl-2 mt-2 text-gray-800">
                {item.InternshipsAndTrainings.map((training, idx) => (
                  <li key={idx} className="mt-1 flex items-start">
                    <span className="text-lg text-black">•</span>
                    <span className="ml-2">{training}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="PROJECTS" icon={<FaProjectDiagram />}>
              <ul className="list-none pl-2 mt-2 text-gray-800">
                {item.Projects.map((project, idx) => (
                  <li key={idx} className="mt-1">
                    <a href={project.url} className="text-black hover:underline">
                      <span className="text-lg text-black">•</span>
                      <span className="ml-2">{project.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="SKILLS" icon={<FaTools />}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                {item.Skills.map((skill, idx) => (
                  <div key={idx}>
                    <li className="mt-1 text-gray-800 text-base flex items-start">
                      <span className="text-lg text-black">•</span>
                      <span className="ml-2">{skill}</span>
                    </li>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="LANGUAGES" icon={<FaLanguage />}>
              <ul className="grid grid-cols-4 gap-2 mt-2 text-gray-800 list-none pl-0">
                {item.Languages.map((language, idx) => (
                  <li key={idx} className="mt-1 flex items-center">
                    <span className="text-lg text-black">•</span>
                    <span className="ml-2">{language}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="DECLARATION" icon={<FaFileAlt />} content={item.Declaration} />

            <div className="flex justify-center mt-2">
              <button
                className="download-button px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

const Section = ({ title, icon, children, content }) => (
  <section className="mb-6">
    <h2 className="text-xl font-bold text-center border-t-2 border-b-2 border-gray-700  flex items-center justify-center py-2">
      <span className="mr-4">{icon}</span>
      {title}
    </h2>
    <div className="mt-2 text-gray-800 text-left">{content || children}</div>
  </section>
);

export default Resume;
