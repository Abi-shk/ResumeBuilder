// ResumeContent.js
import React from 'react';
import Section from './Section';

const ResumeContent = ({ item, index, downloadPDF }) => (
  <div key={index} className="w-full max-w-[800px]">
    <div
      id={`resume-${index}`}
      className="bg-white p-6 rounded-lg shadow-lg mb-2 w-full relative"
      style={{ fontSize: '12pt', pageBreakInside: 'avoid' }}
    >
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-800">{item.Name}</h1>
        <p className="text-lg text-gray-700 italic">{item.Role}</p>
        <div className="flex justify-center items-center space-x-6 text-gray-600 mt-2">
          <div className="flex items-center space-x-1">
            <span>{item.Phone}</span>
          </div>
          <div className="flex items-center space-x-1">
            <a href={`mailto:${item.Email}`} className="hover:underline">{item.Email}</a>
          </div>
          <div className="flex items-center space-x-1">
            <span>{item.Address}</span>
          </div>
          <div className="flex items-center space-x-1">
            <a href={item.LinkedIn} className="text-blue-600 hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>

      <Section title="PROFILE" content={item.Profile} />

      {item.ProfessionalExperience && item.ProfessionalExperience.length > 0 && (
        <Section title="PROFESSIONAL EXPERIENCE">
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

      <Section title="EDUCATION">
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

      <Section title="INTERNSHIPS AND TRAININGS">
        <ul className="list-none pl-2 mt-2 text-gray-800">
          {item.InternshipsAndTrainings.map((training, idx) => (
            <li key={idx} className="mt-1 flex items-start">
              <span className="text-lg text-black">•</span>
              <span className="ml-2">{training}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="PROJECTS">
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

      <Section title="SKILLS">
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

      <Section title="LANGUAGES">
        <ul className="grid grid-cols-4 gap-2 mt-2 text-gray-800 list-none pl-0">
          {item.Languages.map((language, idx) => (
            <li key={idx} className="mt-1 flex items-center">
              <span className="text-lg text-black">•</span>
              <span className="ml-2">{language}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="DECLARATION" content={item.Declaration} />
    </div>
    {/* Single Download Button Below Each Template */}
    <div className="flex justify-end">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md mt-2 download-button"
        onClick={() => downloadPDF(index, item.Name)}
      >
        Download {item.Name.toUpperCase()}'s PDF
      </button>
    </div>
  </div>
);

export default ResumeContent;
