// Section.js
import React from 'react';

const Section = ({ title, content, children }) => (
  <div className="mt-4">
    <h2 className="text-xl font-bold text-blue-800">{title}</h2>
    {content && <p className="mt-2 text-gray-800">{content}</p>}
    {children}
  </div>
);

export default Section;
