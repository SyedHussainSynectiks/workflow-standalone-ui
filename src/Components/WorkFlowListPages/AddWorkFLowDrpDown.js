import React, { useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import SelectTemplateDropDown from "./../WorkFlowListPages/SelectTemplateDropDown";

const WorkFlowDropDown = () => {
    const [visible, setVisible] = useState(false);
    const [showSelectTemplate, setShowSelectTemplate] = useState(false);

    const handleMenuClick = (e) => {
        if (e.key === "selectTemplate") {
            setVisible(false);
            setShowSelectTemplate(true);
        } else if (e.key === "createNewTemplate") {
            setVisible(false);
            setShowSelectTemplate(false);
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="selectTemplate" icon={<FileTextOutlined />}>
                Select Template
            </Menu.Item>
            <Menu.Item key="createNewTemplate" icon={<PlusOutlined />}>
                Create New Template
            </Menu.Item>
        </Menu>
    );

    const handleButtonClick = () => {
        setVisible(!visible);
        setShowSelectTemplate(false); // Hide SelectTemplateDropDown on button click
    };

    return (
        <>
            <Dropdown
                overlay={menu}
                placement="bottomCenter"
                arrow
                visible={visible}
                onClick={handleButtonClick}
            >
                <Button
                    type="primary"
                    size={50}
                    className="bg-blue-500 hover:bg-blue-400"
                >
                    Add Workflow
                </Button>
            </Dropdown>

            {showSelectTemplate && (
                <SelectTemplateDropDown onClick={() => setShowSelectTemplate(false)} />
            )}
        </>
    );
};

export default WorkFlowDropDown;