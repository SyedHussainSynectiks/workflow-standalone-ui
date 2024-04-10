"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message, Steps, theme, notification, Breadcrumb } from "antd";
import { AddResourcePool2 } from "@/Components/AddResourcePool/AddresoucrePool2";
import AddNewProjectForm from "@/Components/AddNewProjectForm/AddNewProjectForm";
import AddEmployReview from "@/Components/AddEmployeeReview/AddEmployReview";
import { useDispatch, useSelector } from "react-redux";
import { updateId, updateProjectName } from "@/Context/AddNewProjectSlice/addProjectSlice";
import { addStepperValue } from "@/Context/AddNewProjectSlice/addProjectSlice";
import Link from "next/link";

const { Step } = Steps;

const steps = [
  {
    title: "Set up Project",
    content: <AddNewProjectForm />,
  },
  {
    title: "Resource pool",
    content: <AddResourcePool2 />,
  },
  {
    title: "Review",
    content: <AddEmployReview />,
  },
];

export default function page({ formNext }) {
  const projectData = useSelector((state) => state.addProject.Projectform);
  const EditButton = useSelector((state) => state.addProject.ProjectStepperValue)
  const projectId = useSelector((state) => state.addProject.id);

  console.log("projectId : ", projectId);
  // console.log("resourceIn Project", resourcesId);
  console.log(projectData);

  const [toggleValue, setToggleValue] = useState(false);
  const [formData, setFormData] = useState({});
  const [fetchProject, setfetchProject] = useState()
  const axios = require('axios');
  useEffect(()=>{
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://m41stqhs8f.execute-api.us-east-1.amazonaws.com/dev/project',
    headers: { 
      'Accept': 'application/json'
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    setfetchProject(response.data.projects);
  })
  .catch((error) => {
    console.log(error);
  });
  
  },[])
  
  console.log("Projectfetch",fetchProject)

  // Function to receive the form data from the child component
  const receiveFormDataFromChild = (data) => {
    console.log("Received data from child:", data);
    setFormData(data); // Update the state in the parent component
  };
  // const ProjectId = (ProjectId) => {
  //   dispatch(addProjectId(ProjectId));
  //   // console.log(ProjectId)
  // };
  const nonViewsteps = [
    {
      title: "Set up Project",
      content: <AddNewProjectForm />,
    },
    {
      title: "Resource pool",
      content: <AddResourcePool2 />,
    },
    {
      title: "Review",
      content: <AddEmployReview />,
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent(current - 1);
  };

  // const next = () => {
  //   setCurrent(current + 1);

  // };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    textAlign: "center",
    color: token.colorTextTertiary,
    marginTop: 16,
  };
  // Api project push

  const handleSubmit = async () => {
    if (
      !projectData.ProjectName ||
      !projectData.projectDescription ||
      !projectData.projectDepartment ||
      !projectData.startDate ||
      !projectData.endDate
      // ||
      // !projectData.image_url
    ) {
      message.error(
        "Please fill in all fields before proceeding to the next step"
      );
      return;
    }
    if (EditButton === "0") {
      setCurrent(current + 2);
    } else {
      setCurrent(current + 1);
    }

    dispatch(addStepperValue(""))
  };

  console.log("editbutton ", EditButton)
  const dispatch = useDispatch();

  useEffect(() => {
    if (EditButton === "0") {
      setCurrent(current - 2); // Dispatch action to update stepper's current step
    } else if (EditButton === "1") {
      setCurrent(current - 1)
    }
  }, [EditButton]);


  const DefaultToggleValue = useSelector((state) => state.addResources.ProjectStepperValue)
  console.log("pageToggle", DefaultToggleValue)

  return (
    <>

      <div className="w-auto py-2 px-1 mb-2 bg-white">
        <Breadcrumb
          className="bg-white p-2"
          items={[
            {
              title: <a href="/main"> Home</a>
            },
            {
              title: <a href="/main/projects">Projects Overview</a>,
            },
            {
              title: "Create Project",
            },
          ]}
        />

        <h1 className="text-2xl font-semibold ">Create Project</h1>
        <p>
          Form pages are used to collect or verify information to users, and
          basic forms are common in scenarios where there are fewer data items.
        </p>
      </div>
      <div className="w-auto py-1 bg-white m-5">
        <Steps current={current} className="px-[10rem] py-3 p-5">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ marginTop: 24 }}>
          {steps[current].content}
        </div>

        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleSubmit}
              className="ml-[90%] m-10 px-2 py-1 justify-center items-center rounded-sm border border-blue-500 bg-blue-500 shadow-sm h-8 font-sans text-center text-white text-sm font-normal not-italic leading-3 flex-row-reverse"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

