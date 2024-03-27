"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message, Steps, theme, notification, Breadcrumb } from "antd";
import { AddResourcePool2 } from "@/Components/AddResourcePool/AddresoucrePool2";
import AddNewProjectForm from "@/Components/AddNewProjectForm/AddNewProjectForm";
import AddEmployReview from "@/Components/AddEmployeeReview/AddEmployReview";
import { useDispatch, useSelector } from "react-redux";
import { updateId, updateProjectName } from "@/Context/AddNewProjectSlice/addProjectSlice";
import { addProjectId } from "@/Context/AddresourcesSlice/addresourcesSlice";
import Link from "next/link";
import { notosans } from "@/font/font";

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
  const EditButton = useSelector((state) => state.addProject.ProjectStepperValue)
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
      !projectData.endDate ||
      !projectData.image_url
    ) {
      message.error(
        "Please fill in all fields before proceeding to the next step"
      );
      return;
    }
    setCurrent(current + 1);
    // if (current === 0) {

    //   try {
    //     // console.log(projectData)
    //     await Apisubmit(projectData);

    //   } catch (error) {
    //     console.error("Error submitting data:", error);
    //   }
    // }
    // // Apisubmit(projectData);
    // // console.log(projectData);

    // const roles = [
    //   { ProductManagerId: ProductManager },
    //   { UxdesignerId: Uxdesigner },
    //   { UiDesignerId: UiDesigner },
    //   { ApiDeveloperId: ApiDeveloper },
    //   { TesterId: Tester },
    //   { UxResearcherId: UxResearcher },
    //   { CiCdId: CiCd},
    // ];

    // const filteredRoles = roles.filter(role => Object.values(role)[0].length > 0);

    // console.log("filteredRoles", filteredRoles)
    // if (current === 1) {
    //   // console.log("TesterId", TesterId)
    //   // console.log(object)
    //   const postData = {
    //     project_id: projectId,
    //     team_name: projectData.projectName,
    //     created_by_id: "550e8400-e29b-41d4-a716-446655440001",
    //     roles: filteredRoles,
    //   };

    //   console.log("Before PUT request");
    //   // console.log(project.projectId);
    //   console.log(JSON.stringify(postData));
    //   console.log("projectData", postData);

    //   let config = {
    //     method: "put",
    //     maxBodyLength: Infinity,
    //     url: `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/project/${projectId}/team`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     data: postData,
    //   };

    //   axios
    //     .request(config)
    //     .then((response) => {
    //       console.log(JSON.stringify(response.data));

    //       setCurrent(current + 1);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });

    // }
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


  const DefaultToggleValue = useSelector((state) => state.addProject.ProjectStepperValue)
  console.log("pageToggle", DefaultToggleValue)

  return (
    <>

      <div className="w-auto py-2 px-1 mb-2 bg-white">
        <Breadcrumb
          className="bg-white p-2"
          items={[
            {
              title: <a className={notosans.className} href="/main"> Home</a>
            },
            {
              title: <a className={notosans.className} href="/main/projects">Projects Overview</a>,
            },
            {
              title: "Create Project",
            },
          ]}
        />

        <h1 className={`${notosans.className} text-2xl font-semibold`}>Create Project</h1>
        <p>
          Form pages are used to collect or verify information to users, and
          basic forms are common in scenarios where there are fewer data items.
        </p>
        {toggleValue.toString()}
      </div>
      <div className={`${notosans.className} w-auto py-1 bg-white m-5`}>
        <Steps current={current} className="px-[10rem] py-3 p-5">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} className={notosans.className} />
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
              className={`${notosans.className} ml-[90%] m-10 px-2 py-1 justify-center items-center rounded-sm border border-blue-500 bg-blue-500 shadow-sm h-8 font-sans text-center text-white text-sm font-normal not-italic leading-3 flex-row-reverse`}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
}


