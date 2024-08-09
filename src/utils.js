import Papa from 'papaparse';

// Function to convert CSV to JSON
export const csvToJson = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data.map(item => ({
          ...item,
          Skills: item.Skills ? item.Skills.split(', ') : [],
          Languages: item.Languages ? item.Languages.split(', ') : [],
          Education: parseField(item.Education, ['degree', 'institution', 'details']),
          ProfessionalExperience: parseField(item.ProfessionalExperience, ['title', 'company', 'duration']),
          InternshipsAndTrainings: item.InternshipsAndTrainings ? item.InternshipsAndTrainings.split(', ') : [],
          Projects: parseProjects(item.Projects)
        }));
        resolve(data);
      },
      error: (error) => reject(error)
    });
  });
};

// Helper function to parse Education and Experience fields
const parseField = (fieldString, keys) => {
  if (!fieldString) return [];
  return fieldString.split('; ').map(field => {
    const obj = {};
    keys.forEach(key => {
      const value = field.match(new RegExp(`${key}: ([^;]*)`));
      obj[key] = value ? value[1] : '';
    });
    return obj;
  });
};

// Helper function to parse Projects
const parseProjects = (projectsString) => {
  if (!projectsString) return [];
  return projectsString.split('; ').map(project => {
    const [name, url] = project.split(', url: ');
    return { name, url };
  });
};
