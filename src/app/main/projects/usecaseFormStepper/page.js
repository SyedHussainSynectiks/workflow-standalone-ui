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
              title:<a href="/main"> Home</a>
            },
            {
              title: <a href="/main/projects">projects</a>,
            },
            {
              title: <a href="/main/projects/usecaseFormStepper">usecaseFormStepper</a>,
            },
          ]}
        />
        <div className=" bg-white p-4">
          <h1 className="flex w-[100%] bg-white  h-7 flex-col justify-center text-black  text-2xl non-italic font-semibold leading-snug">
            Procurement (Development workflow)
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
