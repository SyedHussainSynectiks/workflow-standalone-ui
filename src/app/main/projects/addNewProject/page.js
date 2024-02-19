"use client"
import React, { useState, useEffect } from "react";
import { Button, message, Steps, theme } from "antd";
import AddResourcePool2 from "@/Components/AddResourcePool/AddresoucrePool2";;
import AddNewProjectForm from "@/Components/AddNewProjectForm/AddNewProjectForm";
// import AddEmplyee from "@/app/main/projects/addEmployee/AddEmplyee";
import pages from "@/app/main/projects/resourcePool/page"
import AddEmployReview from "@/Components/AddEmployeeReview/AddEmployReview";

const { Step } = Steps;

const steps = [
  {
    title: "Set up Project",
    content: <AddNewProjectForm />,
  },
  {
    title: "Resource pool",
    content: <AddResourcePool2/>,
  },
  {
    title: "Review",
    content: <AddEmployReview/>,
  },
];

export default function ProjectForm({ formNext }) {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     setCurrent(formNext);
//   }, [formNext]);

  const prev = () => {
    setCurrent(current - 1);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    textAlign: "center",
    color: token.colorTextTertiary,
    marginTop: 16,
  };

  return (
    <>
    <div className="w-auto py-2 px-1 mb-2 bg-white">
        <h1 className="text-2xl font-semibold ">Create Project</h1>
        <p>
        Form pages are used to collect or verify information to users, and basic forms are common in scenarios where there are fewer data items.
        </p>
    </div>
    <div className="w-auto py-1 bg-white">
      <Steps current={current} items={items} className="px-[10rem] py-3" />
      <div style={contentStyle}>
        {/* Render content based on current step */}
        {steps[current].content}
      </div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && ( 
          <Button type="primary" onClick={() => next()} className="ml-[90%] m-10 px-2 py-1 justify-center items-center rounded-sm border border-blue-500 bg-blue-500 shadow-sm h-8 font-sans text-center text-white text-sm font-normal not-italic leading-3 flex-row-reverse">
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success("Processing complete!")} className="ml-[90%] m-10 px-2 py-1 justify-center items-center rounded-sm border border-blue-500 bg-blue-500 shadow-sm h-8 font-sans text-center text-white text-sm font-normal not-italic leading-3 flex-row-reverse">
            Done
          </Button>
        )}
        {/* {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )} */}
      </div>
    </div>
    </>
  );
}