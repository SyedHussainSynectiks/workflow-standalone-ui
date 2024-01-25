"use client";
import React, { useState } from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import AssineTo from "../useCaseAssine/assineTo";
import WorkViewDetails from "../useCaseWorkViewDetails/workViewDetails";
import UseCaseComments from "../useCaseWorkViewDetailsComments/UseCaseComments";

const UseCaseTabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [popoverVisible, setPopoverVisible] = useState();
  const onChange = (key) => {
    setActiveTab(key);
    if (key === "2") {
      setPopoverVisible(true);
    } else {
      setPopoverVisible(false);
    }
  };

  return (
    <Tabs
      defaultActiveKey="1"
      activeKey={activeTab}
      onChange={onChange}
      tabBarStyle={{ margin: 10 }}
      tabBarGutter={100}
    >
      <TabPane tab="Overview" key="1">
        <AssineTo />
      </TabPane>
      <TabPane
        tab="Workflow View"
        key="2"
        className="py-10 relative"
        onClick={() => handlePopoverVisibilityChange(!setPopoverVisible)}
      >
        <div className="my-8 mb-[6rem] px-3 relative" >
          <WorkViewDetails popoverVisible={popoverVisible} />
        </div>
        <div className="border-t-2 border-dashed">
          <UseCaseComments />
          <UseCaseComments />
          <UseCaseComments />
          <UseCaseComments />

        </div>
      </TabPane>
      <TabPane
        tab="Asset View"
        key="3"
        onClick={() => handlePopoverVisibilityChange(!setPopoverVisible)}
      >
        <div className="my-8">{/* <WorkViewDetails /> */}</div>
      </TabPane>
      <TabPane tab="Planning" key="4">
        <div className="my-8">{/* <WorkViewDetails /> */}</div>
      </TabPane>
    </Tabs>
  );
};
export default UseCaseTabs;
