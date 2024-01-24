"use client";
import React, { useState } from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import AssineTo from "../useCaseAssine/assineTo";
import WorkViewDetails from "../useCaseWorkViewDetails/workViewDetails";
import UseCaseComments from "../useCaseWorkViewDetailsComments/UseCaseComments";


const UseCaseTabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  const onChange = (key) => {
    setActiveTab(key);
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
      <TabPane tab="Workflow View" key="2">
        <div className="my-8">
        <WorkViewDetails />
        </div>
        <div>
          <UseCaseComments/>
        </div>
      </TabPane>
      <TabPane tab="Asset View" key="3">
        <div className="my-8">
        {/* <WorkViewDetails /> */}
        </div>
      </TabPane>
      <TabPane tab="Planning" key="4">
        <div className="my-8">
        {/* <WorkViewDetails /> */}
        </div>
      </TabPane>
    </Tabs>
  );
};
export default UseCaseTabs;
