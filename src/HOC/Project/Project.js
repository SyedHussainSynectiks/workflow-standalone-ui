// import react, { useState, useEffect } from 'react';

// const useProject = () => {
//   // Check if there is any data in localStorage for 'project' key
//   const storedProject = JSON.parse(localStorage.getItem('project')) || [];

//   const [project, setProject] = useState(storedProject);
//   const addSelectedData = (selectedData) => {
//     // Update the project state with the selected data
//     setProject([...project, ...selectedData]);
//   };

//   useEffect(() => {
//     // Update localStorage whenever the 'project' state changes
//     localStorage.setItem('project', JSON.stringify(project));
//   }, [project]);

//   return [project, addSelectedData];
// };

// export default useProject;