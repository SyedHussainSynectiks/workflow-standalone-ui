"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PlusSquareFilled, DownOutlined } from "@ant-design/icons";
import {
    Avatar,
    Space,
    Button,
    Card,
    Typography,
    Col,
    Row,
    Dropdown,
    message,
    Menu,
} from "antd";
import axios from "axios";
import { Pagination } from "antd";

import { InProgress, Completed, Unassigned } from "@/Components/Badges";
import api from "@/api";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { MdOutlineWatchLater } from "react-icons/md";

const { Title, Paragraph, Text } = Typography;

const getData = async () => {
    try {
        const response = await api.get("/project");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};
const gettingData = getData()
console.log(gettingData)
const ProjectLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);



    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setData(result);
        };
        fetchData();
    }, []);
    const toggleSider = () => {
        setCollapsed(!collapsed);
    };
    console.log(getData)

    const handleMenuClick = (e) => {
        // message.info('Click on menu item.');
        // console.log('click', e);
        setSelectedStatus(e.key === "all" ? null : e.key);
    };
    const capitalizeText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };
    const dropdownText = selectedStatus
        ? `${capitalizeText(selectedStatus)}`
        : "All Projects";
    const menuProps = {
        // items,
        onClick: handleMenuClick,
    };
    const filteredData = selectedStatus
        ? data.filter((item) => item.status.toLowerCase() === selectedStatus)
        : data;
    // Check Status and return badge according to the badge
    const checkStatus = (status) => {
        switch (status.toLowerCase()) {
            case "inprogress":
                return <InProgress />;
            case "completed":
                return <Completed />;
            case "unassigned":
                return <Unassigned />;
            // Add more cases if needed
            default:
                return null; // Default case
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // const [pageSize, setPageSize] = useState(1);
    const totalItems = data.length; // Total number of items
    const itemsPerPage = 8; // Number of items per page
    // const paginatedData = filteredData.slice(
    //     (currentPage - 1) * pageSize,
    //     Math.min(currentPage * pageSize, filteredData.length)
    // );

    // Add a variable to store the initial paginatedData
    // const initialPaginatedData = paginatedData.slice(0);
    const { Meta } = Card;
    const { Text } = Typography;
    const renderRowsForPage = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        const rows = [];
        for (let i = startIndex; i < endIndex; i++) {
            const item = filteredData[i];
            rows.push(
                <Col span={6} className="mb-4" key={i}>
                    <Link href="/main/projects/workflowlist">
                        <Card headerFontSize={22} bordered={false}>
                            <Meta
                                avatar={
                                    <Avatar
                                        className="bg-blue-200 rounded-full p-2"
                                        src={item.image_url}
                                        size={34}
                                        shape="square"
                                    />
                                }
                                title={item.name}
                                className="text-lg flex align-middle"
                            />
                            <div className="w-full h-[2px] bg-gray-100 mt-2 mb-4"></div>

                            <div className="flex flex-row justify-start items-center p-0">
                                <Text className="text-xl">
                                    Total Use cases : {item.total_usecases}
                                </Text>
                            </div>
                            <div className="flex flex-row justify-start items-center my-4">
                                <h4>{item.total_resources} Use cases in Progress</h4>
                            </div>

                            <div className="flex ">
                                {" "}
                                <MdOutlineWatchLater className="size-6" />{" "}
                                <div className="pl-6 pb-2"> 7 Days</div>{" "}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-row justify-start items-center pt-1">
                                    {checkStatus(item.status)}
                                </div>

                                <div className="pl-5 flex">
                                    <Avatar src="{}" />
                                    <Avatar src="{}" />
                                    <Avatar src="{}" />
                                </div>
                            </div>
                        </Card>
                    </Link>
                </Col>
            );
        }
        return rows;
    };


    return (
        <>
            <div style={{ margin: "18px 16px", padding: "0px 10px", minHeight: 280 }}>
                <h1 className="ml-2uppercase text-3xl">workflow Management</h1>

                {/* Total Projects Card */}
                <div className="bg-white flex flex-row justify-between items-center py-2 px-5  ">
                    <Dropdown
                        overlay={
                            <Menu onClick={handleMenuClick}>
                                <Menu.Item key="all">All Projects</Menu.Item>
                                <Menu.Item key="inprogress">In Progress</Menu.Item>
                                <Menu.Item key="completed">Completed</Menu.Item>
                                <Menu.Item key="unassigned">Unassigned</Menu.Item>
                            </Menu>
                        }
                    >
                        <a key="all" onClick={(e) => e.preventDefault()}>
                            <Space>
                                {dropdownText}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                    <div className="">
                        <button className="   py-1  px-4 bg-blue-500 text-white bg-primary-6">
                            <Link href="/main/projects/addNewProject"> Create Project</Link>
                        </button>
                    </div>
                </div>

                {/* Complete Projects, In Progress Projects, & UnAssign Projects */}
                <div className="my-5">
                    <div className='space-y-10'>
                        <Row gutter={16}>
                            {renderRowsForPage()}
                        </Row>

                        {/* <div>Data for Page {currentPage}</div> */}

                        {/* Pagination component */}
                        <Pagination
                            total={totalItems}
                            pageSize={itemsPerPage}
                            current={currentPage}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
                {/* <allProjects /> */}
                {/* <projectLayout /> */}
            </div>
        </>
    );
};

export default ProjectLayout;
