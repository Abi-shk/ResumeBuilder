import React from 'react';
import html2pdf from 'html2pdf.js';

const Resume = ({ data }) => {
  console.log('Resume Component Data:', data);

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const downloadPDF = (resumeId) => {
    const element = document.getElementById(`resume-${resumeId}`);
    const button = document.querySelector(`#resume-${resumeId} .download-button`);
    button.style.display = 'none';

    const opt = {
      margin: [10, 10, 10, 10], // top, right, bottom, left
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 }, // Increase scale for better clarity
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).toPdf().get('pdf').then((pdf) => {
      pdf.save('resume.pdf');
      button.style.display = 'block';
    });
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50">
      {data.map((item, index) => (
        <div
          key={index}
          id={`resume-${index}`}
          className="bg-white p-8 rounded-lg shadow-md mb-8 w-full max-w-4xl"
        >
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold">{item.Name}</h1>
            <p className="text-xl text-gray-700">{item.Role}</p>
            <p className="text-gray-600">
              <a href={`mailto:${item.Email}`} className="hover:underline">{item.Email}</a> | {item.Phone} | {item.Address}
            </p>
            <p>
              <a href={item.LinkedIn} className="text-blue-600 hover:underline">{item.LinkedIn}</a>
            </p>
          </div>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">Profile</h2>
            <p className="mt-2 text-gray-800">{item.Profile}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">Professional Experience</h2>
            {item.ProfessionalExperience.map((exp, idx) => (
              <div key={idx} className="mt-4">
                <h3 className="text-lg font-bold">{exp.title}</h3>
                <p className="text-gray-700">{exp.company}</p>
                <p className="text-gray-600">{exp.duration}</p>
                {exp.details && <p className="mt-2 text-gray-800">{exp.details}</p>}
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">Education</h2>
            {item.Education.map((edu, idx) => (
              <div key={idx} className="mt-4">
                <h3 className="text-lg font-bold">{edu.degree}</h3>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="text-gray-600">{edu.details}</p>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">Internships and Trainings</h2>
            <ul className="list-disc pl-6 mt-2 text-gray-800">
              {item.InternshipsAndTrainings.map((training, idx) => (
                <li key={idx} className="mt-1">{training}</li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">Projects</h2>
            <ul className="list-disc pl-6 mt-2 text-gray-800">
              {item.Projects.map((project, idx) => (
                <li key={idx} className="mt-1">
                  <a href={project.url} className="text-blue-600 hover:underline">{project.name}</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {item.Skills.split(', ').map((skill, idx) => (
                <div key={idx} className="list-disc pl-4">
                  <li className="mt-1 text-gray-800 text-base">{skill}</li>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">Languages</h2>
            <ul className="list-disc pl-6 mt-2 text-gray-800">
              {item.Languages.split(', ').map((language, idx) => (
                <li key={idx} className="mt-1">{language}</li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold border-b-2 border-gray-700 pb-2">Declaration</h2>
            <p className="mt-2 text-gray-800">{item.Declaration}</p>
          </section>

          <div className="flex justify-center">
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
  );
};

export default Resume;
