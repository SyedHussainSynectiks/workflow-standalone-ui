
"use client";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Breadcrumb, Tabs } from "antd";
import Templates from '@/Components/AddingTemplateAndCreating/SelectingTemplate'
import CreatingTemplate from "@/Components/AddingTemplateAndCreating/CreatingTemplate";
const onChange = (key) => {

  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Select Template",
    children: <Templates/>,
  },
  {
    key: "2",
    label: "Create Template",
    children: <CreatingTemplate/>,
  },
];
const page = () => {
  const DefaultToggleValue = useSelector((state) => state.addUsecase.StagesToggleValue)
  console.log("pageToggle", DefaultToggleValue)
  const [activeSection, setActiveSection] = useState("Procurement");

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  return (
    <div >
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
              title:"Create Template",
            },
          ]}
        />
       <h1 className="text-2xl font-semibold p-2 bg-white">Project</h1>
        <p className="p-2 bg-white">
          Form pages are used to collect or verify information to users, and
          basic forms are common in scenarios where there are fewer data items.
        </p>
      <Tabs defaultActiveKey={DefaultToggleValue} items={items} onChange={onChange} />
    </div>
  );
};

export default page;
