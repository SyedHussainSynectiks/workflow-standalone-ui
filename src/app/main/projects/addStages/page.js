'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
    AccountBookFilled,
    BellFilled,
    ProjectFilled,
    IdcardFilled,
    SignalFilled,
    SearchOutlined,
    VideoCameraOutlined,
    RightOutlined,
    LeftOutlined,
} from '@ant-design/icons';
import { Space, Layout, Menu, Button, theme, Card, Avatar, Badge, Input, Divider, Typography, Col, Row, Dropdown, message, Checkbox, Anchor, Modal } from 'antd';
import Navbar from '@/Components/Navbar/Navbar';
import ProjectResource from '@/Components/ProjectResource/ProjectResource'
const { Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
export default function ProjectForm() {
    const [collapsed, setCollapsed] = useState(false);
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const toggleSider = () => {
        setCollapsed(!collapsed);
    };
    const items = [
        {
            label: 'All Projects',
            key: '1',
        },
        {
            label: 'In Progress',
            key: '1',
        },
        {
            label: 'Completed',
            key: '3',
        },

    ];
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <>
            <Layout theme="dark" style={{ minHeight: '100vh' }}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme="light"
                    className="fixed "
                    style={{ position: 'fixed', height: '100vh' }}
                >
                    <h5 className='uppercase bg-[#001529] text-white text-2xl p-4'>Synect<span className='text-red-700'>i</span>ks</h5>
                    {/* ... your existing Sider content */}
                    <Menu className='relative'
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <ProjectFilled />,
                                label: 'Dashboard',
                                path: '/'
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'Projects',
                                path: '/projects'
                            },
                            {
                                key: '3',
                                icon: <SignalFilled />,
                                label: 'Team',
                            },
                            {
                                key: '4',
                                icon: <IdcardFilled />,
                                label: 'Reports',
                            },
                            {
                                key: '5',
                                icon: <AccountBookFilled />,
                                label: 'Preference',
                            },
                            {
                                key: '6',
                                icon: <BellFilled />,
                                label: 'Notifications',
                                path: (
                                    <Link href='/main'>Dashboard</Link>
                                )
                            },
                        ]}
                    />
                    {/* <Menu className='relative'
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}                    >
                        <div className=''><ProjectFilled />
                            <Link href='/main'>Dashboard</Link>
                        </div>
                        <div><VideoCameraOutlined />
                            <Link href='/projects'>Projects</Link>
                        </div>
                    </Menu> */}
                    <Button theme="dark"
                        className='bg-white absolute top-2/4 -right-3'
                        type="text"
                        icon={collapsed ? < RightOutlined className='' /> : <LeftOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 16,
                            height: 64,
                            clipPath: `polygon(0 0, 100% 21%, 99% 80%, 0% 100%)`
                        }}
                    />
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
                    <Navbar />
                    <Content style={{ margin: '18px 16px', padding: '0px 10px', minHeight: 280 }} className='relative'>
                        <h1 className='ml-2 uppercase text-3xl'>workflow Management</h1>
                        <div className='bg-white flex flex-row justify-between items-center py-2 px-5 mb-5'>
                            <Title level={3}>Stages</Title>
                        </div>

                        {/* Shows a Details of Project */}
                        <section>
                            {/* left Conatiner Box  Stages */}
                            <div className="AddSatge1Txt">Add Stages</div>
                            <div className="flex flex-row">
                                <div>
                                    <div className="LeftStagesSection">
                                        {/* Stages start */}
                                        <div className="LeftSectionStagesStage1">
                                            <div className="Satge1Txt">Stage 1</div>
                                            <div>
                                                <div className="RequirementStages">Requirement</div>
                                                <div > <Button onClick={showModal}>
                                                    +Add Sub Stages
                                                </Button>
                                                    <Modal title="Add Checklist" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                                       <div className='my-4 flex flex-row  items-center justify-between'>
                                                        <Checkbox/>
                                                        <p>Lorem ipsum dolor sit amet.</p>
                                                        <hr />
                                                       </div>
                                                        <div className='my-4 flex flex-row  items-center justify-between'>
                                                        <Checkbox/>
                                                        <p>Lorem ipsum dolor sit amet.</p>
                                                        <hr />
                                                       </div>
                                                        <div className='my-4 flex flex-row  items-center justify-between'>
                                                        <Checkbox/>
                                                        <p>Lorem ipsum dolor sit amet.</p>
                                                        <hr />
                                                       </div>
                                                    </Modal></div>
                                                <div className="AddCheckListStages">+Add Check List</div>
                                            </div>
                                        </div>
                                        <div className="LeftSectionStagesStage1">
                                            <div className="Satge1Txt">Stage 2</div>
                                            <div>
                                                <div className="RequirementStages">Mock Development</div>
                                                <div className="AddStages">+Add Sub Stages</div>
                                                <div className="AddCheckListStages">+Add Check List</div>
                                            </div>
                                        </div>
                                        <div className="LeftSectionStagesStage1">
                                            <div className="Satge1Txt">Stage 3</div>
                                            <div>
                                                <div className="RequirementStages">Actual Development</div>
                                                <div className="AddStages">+Add Sub Stages</div>
                                                <div className="AddCheckListStages">+Add Check List</div>
                                            </div>
                                        </div>
                                        <div className="LeftSectionStagesStage1">
                                            <div className="Satge1Txt">+Add Stages</div>
                                            <div>
                                                <div className="RequirementStages"></div>
                                                <div className="AddStages"></div>
                                                <div className="AddCheckListStages"></div>
                                            </div>
                                        </div>
                                        {/* Stages end */}
                                    </div> </div>
                                <div className="RightStagesSection w-full p-5">
                                    <Title level={3}>Add Resources</Title>

                                    <div
                                        style={{
                                            padding: '20px',
                                        }}
                                    >
                                        <Anchor
                                            direction="horizontal"
                                            items={[
                                                {
                                                    key: 'part-1',
                                                    href: '#part-1',
                                                    title: 'All',
                                                },
                                                {
                                                    key: 'part-2',
                                                    href: '#part-2',
                                                    title: 'Selected',
                                                },
                                                {
                                                    key: 'part-3',
                                                    href: '#part-3',
                                                    title: 'Available',
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div>
                                        <div
                                            id="part-1"
                                            style={{
                                                textAlign: 'center',
                                                background: 'rgba(0,255,0,0.02)',
                                            }}

                                        />
                                        <div
                                            id="part-2"
                                            style={{
                                                textAlign: 'center',
                                                background: 'rgba(0,0,255,0.02)',
                                            }}
                                        >
                                            <ProjectResource />
                                        </div>
                                        <div
                                            id="part-3"
                                            style={{
                                                textAlign: 'center',
                                                background: '#FFFBE9',
                                            }}
                                        />
                                    </div>


                                </div>
                                {/* <div className="AddStagsCol">+Add Stages</div> */}
                            </div>
                            <div>                     <Button className="absolute right-5 bottom-0 bg-blue-500 text-white my-4"><Link href='/projects/addStage'>Save</Link></Button>
                            </div>
                        </section>


                    </Content>
                </Layout>
            </Layout>

        </>
    );
}
