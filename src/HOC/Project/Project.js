import React, { useState, useEffect } from 'react';

export const useProject = () => {
  // Check if there is any data in localStorage for 'project' key
  const storedProject = JSON.parse(localStorage.getItem('project')) || [];

  const [project, setProject] = useState(storedProject);

  useEffect(() => {
    // Update localStorage whenever the 'project' state changes
    localStorage.setItem('project', JSON.stringify(project));
  }, [project]);

  return [project, setProject];
};



// export const withFormData = (WrappedComponent) => {
//   return (props) => {
//     const [formData, setFormData] = useState([]);

//     const handleInputChange = (value) => {
//       // Update the form data array
//       setFormData((prevData) => {
//         if (prevData.includes(value)) {
//           // If value is already in the array, remove it
//           return prevData.filter((item) => item !== value);
//         } else {
//           // Otherwise, add it to the array
//           return [...prevData, value];
//         }
//       });
//     };

//     const onSubmit = (selectedData) => {
//       // Handle the selected data, you can replace this with your logic
//       console.log('Selected Data:', selectedData);
//     };

//     // Provide the form data and input change handler as props to the wrapped component
//     return (
//       <WrappedComponent
//         {...props}
//         formData={formData}
//         handleInputChange={handleInputChange}
//         onSubmit={onSubmit}
//       />
//     );
//   };
// };