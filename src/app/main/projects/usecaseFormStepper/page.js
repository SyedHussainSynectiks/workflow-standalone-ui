"use client";
import React, { useState, useEffect } from "react";
import { Breadcrumb, Steps, Tooltip } from "antd";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";

import SubStagesStepper from "./SubStagesStepper";
import UseCasesOverView from "@/Components/AddUsecaseStepperForms/UseCasesOverView";
import Planning from "@/Components/AddUsecaseStepperForms/Planning";


import { Tabs } from "antd";

const Stepper = () => {
  const projectName = useSelector((state) => state.addProject.ProjectName);
  const UseCaseNames = useSelector((state) => state.addUsecase.UseCaseNames);
  console.log(UseCaseNames)
  const items = [
    {
      key: "1",
      label: "Overview",
      children: <UseCasesOverView />,
    },
    {
      key: "2",
      label: "Workflow View",
      children: <SubStagesStepper />,
    },
    {
      key: "3",
      label: "Asset view",
      children: "",
    },
    {
      key: "4",
      label: "Planning",
      children: <Planning />,
    },
  ];

  return (
    <>
      <div className=" px-2 ">
        <Breadcrumb
          className="bg-white p-2"
          items={[
            {
              // title: <a path="/main"> Home</a>
              path: '/main',
              breadcrumbName: 'Home'
            },
            {
              path: '/main/projects',
              breadcrumbName: { projectName }
              // title: <a href="/main/projects">{projectName}</a>,
            },
            {
              path: '/main/projects/developmentUsecases',
              breadcrumbName: 'Development WorkFlow'
              // title: <a href="/main/projects/developmentUsecases">Development WorkFlow</a>,
            },
            {
              title: `${UseCaseNames}`,
            },
          ]}
        />
        <div className=" bg-white p-4">
          <h1 className="flex w-[100%] bg-white  h-7 flex-col justify-center text-black  text-2xl non-italic font-semibold leading-snug">
            {UseCaseNames}
          </h1>
          <p>
            Form pages are used to collect or verify information to users, and
            basic forms are common in scenarios where there are fewer data
            items.
          </p>

          <div className="mt-3   ">
            <Tabs defaultActiveKey="1" items={items} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stepper;
