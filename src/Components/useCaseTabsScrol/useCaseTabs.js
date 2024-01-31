// "use client";
import React, { useState } from "react";
import { Tabs, Button } from "antd";
const { TabPane } = Tabs;
import AssineTo from "../useCaseAssine/assineTo";
import WorkViewDetails from "../useCaseWorkViewDetails/workViewDetails";
import { UseCase1Comments } from "../useCaseWorkViewDetailsComments/UseCaseComments";
import AssestView from "../useCaseAssiteView/useCaseassiteView";

// import WorkViewDfrnt from "../useCaseWorkViewDetails/workViewDfrnt";
import Stepper from "../useCaseStepper/useCaseStepper";

const UseCaseTabs = () => {
    const [activeTab, setActiveTab] = useState("1");
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [stepsVisible, setStepsVisible] = useState(false);
    const [stepsNext, setAtepsNext] = useState(0);

    const onChange = (key) => {
        setActiveTab(key);
        if (key === "2") {
            setPopoverVisible(true);
        } else {
            setPopoverVisible(false);
        }
    };
    const handleTabChange = (key) => {
        setActiveTab(key);
        setStepsVisible(key === "2");
    };

    const handleNext = () => {

        // If steps are not visible, navigate to the next tab
        const nextTab = String(parseInt(activeTab, 10) + 1);
        setActiveTab(nextTab);
        if (nextTab === "2") {
            setPopoverVisible(true);
        } else {
            setPopoverVisible(false);

        }
    };

    const handlePrev = () => {
        if (stepsVisible) {
            // If steps are visible, trigger the previous step
            // Implement your logic to handle steps navigation
            return;
        }

        // If steps are not visible, navigate to the previous tab
        const prevTab = String(parseInt(activeTab, 10) - 1);
        setActiveTab(prevTab);
        if (prevTab === "2") {
            setPopoverVisible(true);
        } else {
            setPopoverVisible(false);

        }
    };

    return (
        <>
            <Tabs
                defaultActiveKey="1"
                activeKey={activeTab}
                onChange={onChange}
                tabBarStyle={{ margin: 10, fontSize: '2rem' }}
                tabBarGutter={250}
                className="bg-white px-4"
            >
                <TabPane tab="Overview" key="1" className="py-6 bg-white">
                    <AssineTo />
                </TabPane>
                <TabPane
                    tab="Workflow View"
                    key="2"
                    className="py-10 relative"
                    onClick={() => setPopoverVisible(!popoverVisible)}
                >
                    <div className="my-8 mb-[6rem] px-3 relative  px-6 pt-[1rem]">
                        {/* <WorkViewDetails popoverVisible={popoverVisible}  stepsNext={stepsNext}/> */}
                        <Stepper popoverVisible={popoverVisible} stepsNext={stepsNext} />
                    </div>
                    <div className="border-t-2 border-dashed">
                        {/* <UseCase1Comments />
            <UseCase1Comments /> */}
                    </div>
                </TabPane>
                <TabPane tab="Asset View" key="3">
                    <div className="my-8"><AssestView /></div>
                </TabPane>
                <TabPane tab="Planning" key="4">
                    <div className="my-8">{/* <WorkViewDetails /> */}</div>
                </TabPane>
            </Tabs>
            <div className="flex gap-4 justify-end mt-4">
                {activeTab > "1" && (
                    <button className="bg-blue-400 text-white p-3 rounded-lg" onClick={handlePrev} onChange={onChange}>
                        Previous
                    </button>
                )}
                {activeTab < "4" && (
                    <button className="bg-blue-400 text-white p-3 rounded-lg" onClick={handleNext} onChange={onChange}>
                        Next
                    </button>
                )}
            </div>
        </>
    );
};

export default UseCaseTabs;