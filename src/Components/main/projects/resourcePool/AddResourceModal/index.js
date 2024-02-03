"use client";
import api from "@/api";
import React from "react";
import { useState, useEffect } from "react";

// HOC
import useProject from "@/HOC/Project/Project";

const AddResourceModal = ({ onSubmit, resourceRole }) => {
  // All Hooks
  // project
  const [resource, setResource] = useState([]);

  // select User
  const [selectUser, setSelectUser] = useState([]);

  // useProject
  const [project, setProject] = useProject({
    resourcePool: {},
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

  // console.log(selectUser);

  const handleSelectionAndClose = () => {
    // console.log(selectUser);

    setProject((prevProject) => {
      const updatedResourcePool = {
        ...prevProject.resourcePool, // Copy previous data
        resourceRole: [selectUser], // Add or update specific property
        // Add other properties if needed
      };

      return {
        ...prevProject,
        resourcePool: updatedResourcePool,
        // Add other properties if needed
      };
    });

    onSubmit();
  };

  console.log(project);

  // useEffect to fetch all users
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await api.get("/get_resource_by_role", {
          params: {
            role: resourceRole,
          },
        });
        console.log(response.data);
        const data = response.data;
        setResource(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white p-5 w-[100%]">
      <div className="flex items-center justify-between">
        <h1 className="text-slate-700 text-xl non-italic font-semibold leading-none">
          List Of {resourceRole}
        </h1>
        <button
          onClick={handleSelectionAndClose}
          className="flex items-center justify-center py-1 px-[0.94rem] border border-blue-500 bg-blue-500 rounded-sm text-white cursor-pointer"
        >
          Add
        </button>
      </div>
      <div>
        <input
          className="border border-gray-500 bg-white rounded w-64 h-9 pl-3"
          placeholder="Search"
        ></input>
      </div>
      <div className="w-[100%] border border-gray-400 p-5 flex justify-center rounded">
        <div className="rounded-lg bg-white shadow-md w-[100%] border border-gray-200 border-t-0">
          <div className=" flex flex-col gap-5 mt-3 ">
            <div className="text-black font-segoe-ui text-base font-semibold leading-normal flex items-center justify-start  px-16 pl-24 gap-60  ">
              <h1>Name</h1>
              <div className="flex w-[80%] justify-around pr-4 gap-24">
                <h1 className="">Last Active</h1>
                <h1 className=" ">Role</h1>
              </div>
            </div>
            <div className="flex items-center justify-around">
              <div className="border border-gray-200 w-[95%] "></div>
            </div>
          </div>

          {/* Project Manager useState Hook Data Map */}
          <div>
            {resource.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-start py-6 pr-20 pl-4 gap-40"
              >
                <div className="flex items-center gap-6 pl-3">
                  <div>
                    {/* CheckBox Button */}
                    <input
                      type="checkbox"
                      checked={selectUser.includes(resource.resource_id)}
                      onChange={() =>
                        handleCheckboxChange(resource.resource_id)
                      }
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      className="rounded-full w-16 h-16"
                      src={resource.image_url}
                    ></img>
                    <div>
                      <h1 className="text-gray-800 font-segoe-ui text-base font-bold leading-normal">
                        {resource.resource_name}
                      </h1>
                      <h3 className="text-neutral-300 font-segoe-ui text-base font-normal leading-normal">
                        {resource.email}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-[52%] ">
                  <div className="text-sm non-italic font-normal leading-none text-blue-500 align-">
                    {resource.lastActive}
                  </div>
                  <div className="text-neutral-400 font-segoe-ui text-base font-normal mr-1">
                    {resourceRole}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResourceModal;
