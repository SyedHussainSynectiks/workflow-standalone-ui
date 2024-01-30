// import React from 'react'
// import ProjectLayout from './layout'
// import allProjects from '@/Components/Projects/allProject'
// const page = () => {
//     return (
//         <>
//             <allProjects />
//             <ProjectLayout />
//         </>
//     )
// }

// export default page
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    PlusSquareFilled,
    DownOutlined,
} from '@ant-design/icons';
import { Space, Button, Card, Typography, Col, Row, Dropdown, message, } from 'antd';
import axios from 'axios';

import { InProgress, Completed, Unassigned } from '@/Components/Badges';

const { Title, Paragraph, Text } = Typography;

const getData = async () => {

    try {
        const response = await axios.get('https://siwuzhkr1i.execute-api.us-east-1.amazonaws.com/dev/project');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};


const ProjectLayout = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);

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
        message.info('Click on menu item.');
        console.log('click', e);
    };
    const menuProps = {
        // items,
        onClick: handleMenuClick,
    };

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
                <div className='bg-white flex flex-row justify-between items-center py-2 px-5'>
                    <Title level={3}>All Projects</Title>
                    {/* <div><Button> All Project</Button></div> */}
                    <Dropdown menu={menuProps}>
                        <Button>
                            <Space>
                                All Project
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
                <div className='my-5'>
                    <Row gutter={16}>
                        {data.map((item, index) => (
                            <Col span={6} className='mb-4'>
                                <Card title={item.proejct_name} headerFontSize={22} bordered={false} >
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
            </div>
        </>
    );
};

export default ProjectLayout;
