import React, { useState } from 'react';
import Resume from './Resume';

const dummyData = [
  {
    Name: "ANN RESMY JOSEPH",
    Role: "Full Stack Development Faculty",
    Email: "annresmy@gmail.com",
    Phone: "9074710460",
    Address: "Kottayam, Kerala",
    LinkedIn: "https://linkedin.com/in/ann-resmy-joseph-261208203",
    Profile: "Passionate Full Stack Development Faculty and Program Associate, dedicated to inspiring future technologists and enhancing educational programs with innovative teaching methods and cutting-edge web technologies.",
    ProfessionalExperience: [
      {
        title: "FULL STACK DEVELOPMENT FACULTY",
        company: "TECHMAGHI LLP",
        duration: "03/2024 – present | Kochi, India",
      },
      {
        title: "FULL STACK ENGINEER INTERN",
        company: "ICT Academy of Kerala",
        duration: "07/2023 – 12/2023 | Thiruvananthapuram",
      },
      {
        title: "SKILL DEVELOPMENT CONSULTANT FACULTY",
        company: "Goan Institute International Consociation of Education",
        duration: "07/2022 – 02/2023 | Edappally",
      },
      {
        title: "DATA ANALYTICS INTERN",
        company: "IPSR Solutions Limited",
        duration: "08/2021 – 12/2021 | Kottayam",
        details: "Online Internship",
      },
      {
        title: "INTERNSHALA STUDENT PARTNER",
        company: "Internshala",
        duration: "03/2019 – 05/2019 | Delhi",
        details: "Part-time virtual internship",
      },
    ],
    Education: [
      {
        degree: "B.TECH IN ELECTRONICS AND COMMUNICATIONS",
        institution: "College of Engineering Kallooppara",
        details: "CGPA: 6.52",
      },
      {
        degree: "HIGHER SECONDARY EDUCATION",
        institution: "St. John HSS Nedumkunnam",
        details: "Percentage: 90.33%",
      },
      {
        degree: "HIGH SCHOOL",
        institution: "St. John Nedumkunnam",
        details: "CGPA: 8.4",
      },
    ],
    InternshipsAndTrainings: [
      "Completed 14-day Summer Internship in basic telecom technology at BSNL Thiruvalla.",
      "Completed industrial training program in Embedded System from UNITED NDT Training and Inspection Center Kochi.",
      "National Hardware Startup Conclave HARDTECH KOCHI By Maker Village (March 10, 2018).",
      "2-day workshop on Raspberry Pi and Arduino by Network Systems Thiruvalla conducted at College of Engineering Kallooppara.",
    ],
    Projects: [
      {
        name: "Web development project: Kerala Tourism",
        url: "https://resmy13.github.io/keralatourism/",
      },
      {
        name: "ICT assignment: Form Validation",
        url: "https://resmy13.github.io/ICTassignment2FormValidation/",
      },
      {
        name: "Gleaming Rose Angler",
        url: "https://gleaming-rose-angler.cyclic.app/",
      },
      {
        name: "SMART SURVEILLANCE SYSTEM USING PIR SENSOR NETWORK AND GSM MODULE (Design only, mini project at college)",
      },
      {
        name: "ELECTRONIC TRAVEL AID FOR THE VISUALLY IMPAIRED (Final year Main Project at College)",
      },
    ],
    Skills: "Good Interpersonal skills, Attention to detail, Leadership skills, Ethics, Visual Studio, VLSI Basics, Embedded Systems (beginner), Linux basics, Raspberry Pi and Python, Github, C programming, React, Bootstrap, Technical Content Writing, Public Speaking, Adaptability, Problem Solving, CSS, Data Analytics, Design Engineering, Artistic skills, Research, MS office, MongoDB (beginner), Node.js, NPM, Creativity, Effective Communication skills, Time management",
    Languages: "Malayalam, Hindi, English, Tamil",
    Declaration: "I hereby declare that the information provided in this CV is accurate and true to the best of my knowledge.",
  },
];

const UploadCSV = () => {
  const [parsedData, setParsedData] = useState(dummyData);

  return (
    <div className="container mx-auto p-4">
      <Resume data={parsedData} />
    </div>
  );
};

export default UploadCSV;
