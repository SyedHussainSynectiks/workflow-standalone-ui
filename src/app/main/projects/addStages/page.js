
"use client";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
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
    <div>
      <Tabs defaultActiveKey={DefaultToggleValue} items={items} onChange={onChange} />
    </div>
  );
};

export default page;
