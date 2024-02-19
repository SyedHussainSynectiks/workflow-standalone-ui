"use client";
import api from "@/api";
import React from "react";
import { useState, useEffect } from "react";
import useProject from "@/HOC/Project/Project";
import Image from "next/image";
import user from "../../../../public/assets/profile1.svg"

export const Projectmanager = (props) => {
  // All Hooks
  // project
  const [projectManager, setprojectManager] = useState([]);

  // select User
  const [selectUser, setSelectUser] = useState([]);

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        projectManager: [],
      },
    ],
  });

  // HandleCheckBoxChange
  const handleCheckboxChange = (userId) => {
    // Check if userId is already in selectUser
    if (selectUser.includes(userId)) {
      // If yes, remove it
      setSelectUser((prevState) => prevState.filter((id) => id !== userId));
    } else {
      // If no, add it
      setSelectUser((prevState) => [...prevState, userId]);
    }

    // console.log(userId)
    // console.log(selectUser)
  };

  console.log(selectUser);

  const handleSelectionAndClose = () => {
    // console.log(selectUser);
    setProject((prevProject) => {
      const updatedResourcePool = [
        {
          projectManager: selectUser,
        },
      ];
      return {
        ...prevProject,
        resourcePool: updatedResourcePool,
      };
    });
    props.onSubmit();
  };

  // console.log(project);

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            role: "Project Manager",
          },
        });
        console.log(response.data);
        const data = response.data;
        setprojectManager(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
  <div className="w-[100%] px-2 flex justify-center rounded">
    <div className=" w-[100%] ">
      {/* Project Manager useState Hook Data Map */}
      <div className="flex flex-col gap-6">
        {/* Display a static UI without mapping */}
        {projectManager.map((Manager, index) => (
        <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
          <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
            
            <div className="flex items-center gap-3">
             <Image src={user}/>
              <div>
                <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                  Olivia Rhye @olivia
                </h1>
                <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                  hi.....
                  olivia@example.com
                </h3>
              </div>
            </div>
            <div>
              {/* CheckBox Button */}
              <input
                type="checkbox"
                // checked={selectUser.includes(someHardcodedResourceId)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
))}
        <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
          <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
            
            <div className="flex items-center gap-3">
             <Image src={user}/>
              <div>
                <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                  Olivia Rhye @olivia
                </h1>
                <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                  hi.....
                  olivia@example.com
                </h3>
              </div>
            </div>
            <div>
              {/* CheckBox Button */}
              <input
                type="checkbox"
                // checked={selectUser.includes(someHardcodedResourceId)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
          <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
            
            <div className="flex items-center gap-3">
             <Image src={user}/>
              <div>
                <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                  Olivia Rhye @olivia
                </h1>
                <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                  hi.....
                  olivia@example.com
                </h3>
              </div>
            </div>
            <div>
              {/* CheckBox Button */}
              <input
                type="checkbox"
                // checked={selectUser.includes(someHardcodedResourceId)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        {/* Repeat the above structure for each item you want to display */}
      </div>
      
    </div>
  </div>
</div>

  );
};

// Api Developer
export const ApiDeveloper = (props) => {
  // All Hooks
  // API Developer
  const [apiDeveloper, setApiDeveloper] = useState([]);

  // select User
  const [selectUser, setSelectUser] = useState([]);

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        apiDeveloper: [],
      },
    ],
  });

  // useEffect to fetch all API Developers
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            role: "API Developer",
          },
        });
        console.log(response.data);
        const data = response.data;
        setApiDeveloper(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // HandleCheckBoxChanges
  const handleCheckboxChange = (userId) => {
    // Check if userId is already in selectUser
    if (selectUser.includes(userId)) {
      // If yes, remove it
      setSelectUser((prevState) => prevState.filter((id) => id !== userId));
    } else {
      // If no, add it
      setSelectUser((prevState) => [...prevState, userId]);
    }
  };

  // handleSelectionAndClose
  const handleSelectionAndClose = () => {
    // console.log(selectUser);
    setProject((prevProject) => {
      const updatedResourcePool = [
        ...prevProject.resourcePool, // Keep existing properties
        {
          apiDeveloper: selectUser,
        },
      ];
      return {
        ...prevProject,
        resourcePool: updatedResourcePool,
      };
    });

    props.onSubmit();
  };

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
    <div className="w-[100%] px-2 flex justify-center rounded">
      <div className=" w-[100%] ">
        {/* Project Manager useState Hook Data Map */}
        <div className="flex flex-col gap-6">
          {/* Display a static UI without mapping */}
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
  
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* Repeat the above structure for each item you want to display */}
        </div>
        
      </div>
    </div>
  </div>
  );
};

// cicd
export const CiCdResourcePool = (props) => {
  const [CiCd, setCiCd] = useState([]);
  const [selectUser, setSelectUser] = useState([]);

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        cicd: [],
      },
    ],
  });

  // handleSelectionAndCLose
  const handleSelectionAndClose = () => {
    // console.log(selectUser);

    setProject((prevProject) => {
      const updatedResourcePool = [
        {
          cicid: selectUser,
        },
      ];
      return {
        ...prevProject,
        resourcePool: updatedResourcePool,
      };
    });

    props.onSubmit();
  };

  // HandleCheckBoxChange
  const handleCheckboxChange = (userId) => {
    // Check if userId is already in selectUser
    if (selectUser.includes(userId)) {
      // If yes, remove it
      setSelectUser((prevState) => prevState.filter((id) => id !== userId));
    } else {
      // If no, add it
      setSelectUser((prevState) => [...prevState, userId]);
    }

    // console.log(userId)
    // console.log(selectUser)
  };

  // console.log(project);

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            role: "CI/CD",
          },
        });

        console.log(response.data);
        const data = response.data;
        setCiCd(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
    <div className="w-[100%] px-2 flex justify-center rounded">
      <div className=" w-[100%] ">
        {/* Project Manager useState Hook Data Map */}
        <div className="flex flex-col gap-6">
          {/* Display a static UI without mapping */}
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
  
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* Repeat the above structure for each item you want to display */}
        </div>
        
      </div>
    </div>
  </div>
  );
};

// Tester
export const TesterResourcePool = (props) => {
  const [Tester, setTester] = useState([]);
  const [selectUser, setSelectUser] = useState([]);

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        tester: [],
      },
    ],
  });

  // HandleCheckBoxChange
  const handleCheckboxChange = (userId) => {
    // Check if userId is already in selectUser
    if (selectUser.includes(userId)) {
      // If yes, remove it
      setSelectUser((prevState) => prevState.filter((id) => id !== userId));
    } else {
      // If no, add it
      setSelectUser((prevState) => [...prevState, userId]);
    }

    // console.log(userId)
    // console.log(selectUser)
  };

  console.log(selectUser);

  const handleSelectionAndClose = () => {
    // console.log(selectUser);

    setProject((prevProject) => {
      const updatedResourcePool = [
        {
          tester: selectUser,
        },
      ];
      return {
        ...prevProject,
        resourcePool: updatedResourcePool,
      };
    });

    props.onSubmit();
  };

  // console.log(project);

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            role: "Tester",
          },
        });
        console.log(response.data);
        const data = response.data;
        setTester(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
    <div className="w-[100%] px-2 flex justify-center rounded">
      <div className=" w-[100%] ">
        {/* Project Manager useState Hook Data Map */}
        <div className="flex flex-col gap-6">
          {/* Display a static UI without mapping */}
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
  
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* Repeat the above structure for each item you want to display */}
        </div>
        
      </div>
    </div>
  </div>
  );
};

export const UxDesignResourcePool = (props) => {
  // /get_resource_by_role

  const [uiDesigner, setUiDesigners] = useState([]);
  const [selectUser, setSelectUser] = useState([]);

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        uiDesigner: [],
      },
    ],
  });

  // HandleCheckBoxChange
  const handleCheckboxChange = (userId) => {
    // Check if userId is already in selectUser
    if (selectUser.includes(userId)) {
      // If yes, remove it
      setSelectUser((prevState) => prevState.filter((id) => id !== userId));
    } else {
      // If no, add it
      setSelectUser((prevState) => [...prevState, userId]);
    }

    // console.log(userId)
    // console.log(selectUser)
  };

  console.log(selectUser);

  const handleSelectionAndClose = () => {
    // console.log(selectUser);

    setProject((prevProject) => {
      const updatedResourcePool = [
        {
          uiDesigner: selectUser,
        },
      ];
      return {
        ...prevProject,
        resourcePool: updatedResourcePool,
      };
    });

    props.onSubmit();
  };

  // console.log(project);

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            role: "UI Designer",
          },
        });
        console.log(response.data);
        const data = response.data;
        setUiDesigners(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
  <div className="w-[100%] px-2 flex justify-center rounded">
    <div className="rounded-lg bg-white shadow-md w-[100%] border border-gray-200 border-t-0">
      {/* Project Manager useState Hook Data Map */}
      <div>
        {/* Display a static UI without mapping */}
        <div className="flex items-center justify-start py-6 pr-4 pl-4 gap-40">
          <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
            
            <div className="flex items-center gap-3">
             <Image src={user}/>
              <div>
                <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                  Olivia Rhye @olivia
                </h1>
                <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                  hi.....
                  olivia@example.com
                </h3>
              </div>
            </div>
            <div>
              {/* CheckBox Button */}
              <input
                type="checkbox"
                // checked={selectUser.includes(someHardcodedResourceId)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        {/* Repeat the above structure for each item you want to display */}
      </div>
    </div>
  </div>
</div>
  );
};

export const UiDeveloperResourcePool = (props) => {
  const [uiDeveloper, setuiDeveloper] = useState([]);
  const [selectUser, setSelectUser] = useState([]);

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        uiDeveloper: [],
      },
    ],
  });

  // HandleCheckBoxChange
  const handleCheckboxChange = (userId) => {
    // Check if userId is already in selectUser
    if (selectUser.includes(userId)) {
      // If yes, remove it
      setSelectUser((prevState) => prevState.filter((id) => id !== userId));
    } else {
      // If no, add it
      setSelectUser((prevState) => [...prevState, userId]);
    }

    // console.log(userId)
    // console.log(selectUser)
  };

  console.log(selectUser);

  // handleSelectionAndClose
  const handleSelectionAndClose = () => {
    // console.log(selectUser);

    setProject((prevProject) => {
      const updatedResourcePool = [
        {
          uiDeveloper: selectUser,
        },
      ];
      return {
        ...prevProject,
        resourcePool: updatedResourcePool,
      };
    });

    props.onSubmit();
  };

  // console.log(project);

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            role: "UI Developer",
          },
        });
        console.log(response.data);
        const data = response.data;
        setuiDeveloper(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
    <div className="w-[100%] px-2 flex justify-center rounded">
      <div className=" w-[100%] ">
        {/* Project Manager useState Hook Data Map */}
        <div className="flex flex-col gap-6">
          {/* Display a static UI without mapping */}
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
  
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* Repeat the above structure for each item you want to display */}
        </div>
        
      </div>
    </div>
  </div>
  );
};

export const UxResearcher = (props) => {
  const [uxResearcher, setuxResearcher] = useState([]);
  const [selectUser, setSelectUser] = useState([]);

  // useProject
  const [project, setProject] = useProject({
    resourcePool: [
      {
        uxResearcher: [],
      },
    ],
  });

  // HandleCheckBoxChange
  const handleCheckboxChange = (userId) => {
    // Check if userId is already in selectUser
    if (selectUser.includes(userId)) {
      // If yes, remove it
      setSelectUser((prevState) => prevState.filter((id) => id !== userId));
    } else {
      // If no, add it
      setSelectUser((prevState) => [...prevState, userId]);
    }
  };

  console.log(selectUser);

  const handleSelectionAndClose = () => {
    // console.log(selectUser);

    setProject((prevProject) => {
      const updatedResourcePool = [
        {
          uxResearcher: selectUser,
        },
      ];
      return {
        ...prevProject,
        resourcePool: updatedResourcePool,
      };
    });

    props.onSubmit();
  };

  // console.log(project);

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            role: "UX Researcher",
          },
        });
        console.log(response.data);
        const data = response.data;
        setuxResearcher(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white w-[100%]">
    <div className="w-[100%] px-2 flex justify-center rounded">
      <div className=" w-[100%] ">
        {/* Project Manager useState Hook Data Map */}
        <div className="flex flex-col gap-6">
          {/* Display a static UI without mapping */}
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
  
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start py-3 pr-4 pl-4 gap-40 bg-white shadow-md border border-gray-200 border-t-0 rounded-lg">
            <div className="flex justify-between items-center gap-6 pl-3 w-[100%]">
              
              <div className="flex items-center gap-3">
               <Image src={user}/>
                <div>
                  <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                    Olivia Rhye @olivia
                  </h1>
                  <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                    hi.....
                    olivia@example.com
                  </h3>
                </div>
              </div>
              <div>
                {/* CheckBox Button */}
                <input
                  type="checkbox"
                  // checked={selectUser.includes(someHardcodedResourceId)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* Repeat the above structure for each item you want to display */}
        </div>
        
      </div>
    </div>
  </div>
  );
};
