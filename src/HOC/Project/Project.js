import React, { useState, useEffect } from 'react';

const useProject = () => {
  // Check if there is any data in localStorage for 'project' key
  const storedProject = JSON.parse(localStorage.getItem('project')) || [];

  const [project, setProject] = useState(storedProject);

  useEffect(() => {
    // Update localStorage whenever the 'project' state changes
    localStorage.setItem('project', JSON.stringify(project));
  }, [project]);

  return [project, setProject];
};

export default useProject;