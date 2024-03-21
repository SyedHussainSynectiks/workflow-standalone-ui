"use client";
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message, Steps, theme,notification, Breadcrumb } from "antd";
import {AddResourcePool2} from "@/Components/AddResourcePool/AddresoucrePool2";
import AddNewProjectForm from "@/Components/AddNewProjectForm/AddNewProjectForm";
import AddEmployReview from "@/Components/AddEmployeeReview/AddEmployReview";
import { useDispatch, useSelector } from "react-redux";
import { updateId, updateProjectName } from "@/Context/AddNewProjectSlice/addProjectSlice";
import { addProjectId } from "@/Context/AddresourcesSlice/addresourcesSlice";
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
  const projectData = useSelector((state) => state.addProject);
  const ProductManager = useSelector((state) => state.addResources.ProjectManager);
  const Uxdesigner = useSelector((state) => state.addResources.UXDesigner);
  const UiDesigner = useSelector((state) => state.addResources.UIDeveloper);
  const ApiDeveloper = useSelector((state) => state.addResources.APIDeveloper);
  const Tester = useSelector((state) => state.addResources.Tester);
  const UxResearcher = useSelector((state) => state.addResources.UXResearcher);
  const CiCd = useSelector((state) => state.addResources.CICDSpecialist);

  const openNotification = (placement, type, message) => {
    notification[type]({
      message: message,
      placement: placement,
    });
  };



  const projectId = useSelector((state) => state.addProject.id);

  console.log("projectId : ", projectId);
  // console.log("resourceIn Project", resourcesId);
  console.log(projectData);

  const [toggleValue, setToggleValue] = useState(false);
  const [formData, setFormData] = useState({});

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
      !projectData.projectName ||
      !projectData.projectDescription ||
      !projectData.projectDepartment ||
      !projectData.startDate ||
      !projectData.endDate
    ) {
      message.error(
        "Please fill in all fields before proceeding to the next step"
      );
      return;
    }
    if (current === 0) {

      try {
        // console.log(projectData)
        await Apisubmit(projectData);

      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
    // Apisubmit(projectData);
    // console.log(projectData);

    const roles = [
      { ProductManagerId: ProductManager },
      { UxdesignerId: Uxdesigner },
      { UiDesignerId: UiDesigner },
      { ApiDeveloperId: ApiDeveloper },
      { TesterId: Tester },
      { UxResearcherId: UxResearcher },
      { CiCdId: CiCd},
    ];

    const filteredRoles = roles.filter(role => Object.values(role)[0].length > 0);

    console.log("filteredRoles", filteredRoles)
    if (current === 1) {
      // console.log("TesterId", TesterId)
      // console.log(object)
      const postData = {
        project_id: projectId,
        team_name: projectData.projectName,
        created_by_id: "550e8400-e29b-41d4-a716-446655440001",
        roles: filteredRoles,
      };

      console.log("Before PUT request");
      // console.log(project.projectId);
      console.log(JSON.stringify(postData));
      console.log("projectData", postData);

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/project/${projectId}/team`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: postData,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));

          setCurrent(current + 1);
        })
        .catch((error) => {
          console.log(error);
        });


    }
  };

  const axios = require("axios");

  const Apisubmit = async (project) => {


    const projectname = project.projectName;
    console.log(projectname);
    dispatch(updateProjectName(projectname))
    
    let data = JSON.stringify({
      name: project.projectName,
      description: project.projectDescription,
      department: project.projectDepartment,
      start_date: project.startDate,
      end_date: project.endDate,
      image_url: "https://i.imgur.com/PujQY5Y.png",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/project",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const result = response.data;
        console.log("success:", result, result.id);
        dispatch(updateId(result.id));

        setCurrent(current + 1);
      })
      .catch((error) => {
        console.log(error);
        const errorStatus = error.response.data.message
        console.log(errorStatus)
        openNotification("topRight", "error", ` ${errorStatus}`);
      });
  };
  const dispatch = useDispatch();

  return (
    <>

      <div className="w-auto py-2 px-1 mb-2 bg-white">
      <Breadcrumb
        className="bg-white p-2"
          items={[
            {
              title:<a href="/main"> Home</a>
            },
            {
              title: <a href="/main/projects">Projects Overview</a>,
            },
            {
              title:"Create Project",
            },
          ]}
        />

        <h1 className="text-2xl font-semibold ">Create Project</h1>
        <p>
          Form pages are used to collect or verify information to users, and
          basic forms are common in scenarios where there are fewer data items.
        </p>
        {toggleValue.toString()}
      </div>
      <div className="w-auto py-1 bg-white m-5">
        <Steps current={current} className="px-[10rem] py-3 p-5">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ marginTop: 24 }}>
          {/* Render content based on current step */}
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

          {current === steps.length - 1 && (
            <Link href="/main/projects/workflowlist">
              <Button
                type="primary"
                className="ml-[90%] m-10 px-2 py-1 justify-center items-center rounded-sm border border-blue-500 bg-blue-500 shadow-sm h-8 font-sans text-center text-white text-sm font-normal not-italic leading-3 flex-row-reverse"

              >
                Create
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}