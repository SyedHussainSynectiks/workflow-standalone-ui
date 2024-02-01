'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    PlusSquareFilled,
    DownOutlined,
} from '@ant-design/icons';
import { Avatar, Space, Button, Card, Typography, Col, Row, Dropdown, message, Menu, } from 'antd';
import axios from 'axios';


import { InProgress, Completed, Unassigned } from '@/Components/Badges';
import api from '@/api';
import Meta from 'antd/es/card/Meta';
import Image from 'next/image';
import slice from '@/Context/slice';

const { Title, Paragraph, Text } = Typography;

const getData = async () => {

    try {
        const response = await api.get('/project');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};


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

    const handleMenuClick = (e) => {
        // message.info('Click on menu item.');
        // console.log('click', e);
        setSelectedStatus(e.key === 'all' ? null : e.key);
    };
    const capitalizeText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };
    const dropdownText = selectedStatus ? `${capitalizeText(selectedStatus)}` : 'All Projects';
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
            case 'inprogress':
                return <InProgress />;
            case 'completed':
                return <Completed />;
            case 'unassigned':
                return <Unassigned />;
            // Add more cases if needed
            default:
                return null; // Default case
        }
    };
    return (
        <>
            <div style={{ margin: '18px 16px', padding: '0px 10px', minHeight: 280 }}>
                <h1 className='ml-2 uppercase text-3xl'>workflow Management</h1>

                {/* Total Projects Card */}
                <div className='bg-white flex flex-row justify-between items-center py-2 px-5  '>
                    <Title level={3}>All Projects</Title>
                    <Dropdown overlay={
                        <Menu onClick={handleMenuClick}>
                            <Menu.Item key="all">All Projects</Menu.Item>
                            <Menu.Item key="inprogress">In Progress</Menu.Item>
                            <Menu.Item key="completed">Completed</Menu.Item>
                            <Menu.Item key="unassigned">Unassigned</Menu.Item>
                        </Menu>
                    }>

                        <a key="all" onClick={(e) => e.preventDefault()}>
                            <Space>
                                {dropdownText}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>

                </div>

                {/* Complete Projects, In Progress Projects, & UnAssign Projects */}
                <div className='my-5'>
                    <Row gutter={16}>
                        {filteredData.map((item, index) => (
                            <Col span={6} className='mb-4'>
                                <Card headerFontSize={22} bordered={false} >

                                    <Meta
                                        avatar={<Avatar src={item.image_url} size={32} shape="square" />}
                                        title={item.name} className='text-lg flex align-middle' />
                                    <div className='w-full h-[2px] bg-gray-100 mt-2 mb-4'></div>
                                    <div className='flex flex-row justify-start items-center p-0'>
                                        <Text className='text-xl'>Total Usecases {item.total_usecases}</Text>
                                    </div>
                                    <div className='flex flex-row justify-start items-center my-4'>
                                        <h4>Total Resources {item.total_resources}</h4>
                                    </div>
                                    <div className='flex flex-row justify-start items-center'>
                                        {checkStatus(item.status)}
                                    </div>
                                </Card>
                            </Col>
                        ))}

                    </Row>
                    <Row>
                        <Col span={6}>
                            <Card className='my-5 p-14'>
                                <Link href='/main/projects/addNewProject' className="flex flex-row justify-around items-center bg-gray-200 p-2 w-50">
                                    <PlusSquareFilled style={{ fontSize: '24px' }} /> <Title level={4}>Project</Title>
                                </Link>
                            </Card>
                        </Col>
                    </Row>
                </div>
                {/* <allProjects /> */}
                {/* <projectLayout /> */}
            </div >
        </>
    );
};

export default ProjectLayout;
