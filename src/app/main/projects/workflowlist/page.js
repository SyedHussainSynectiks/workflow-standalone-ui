"use client"
import React, { useState } from 'react';
import { Breadcrumb, Tabs } from 'antd';
import Resourcepool from './Resourcepool'
import WorkFlowOverView from "@/Components/WorkFlowOverView/WorkFlowOverView"
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';



const page = () => {
    const [size, setSize] = useState('small');
    const  router = useRouter();
    const projectData = useSelector((state) => state.addProject);
    const projectName = useSelector((state) => state.addProject.ProjectName);
    console.log(projectName)
    console.log(projectData);

    return (
        <div className='ml-3'>
            <div>
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
              title:`${projectName}`,
            },
          ]}
        />
                <h1 className='text-3xl font-semibold leading-snug tracking-normal text-left bg-white'>{projectName}</h1></div>
            <div>
                <Tabs
                    defaultActiveKey="1"
                    size={size}
                    style={{
                        marginBottom: 32,
                        border: 'none',
                    }}
                    items={new Array(2).fill(null).map((_, i) => {
                        const id = String(i + 1);
                        if (id == 1) {
                            return {
                                label: `Procurement Overview`,
                                key: id,
                                children: <WorkFlowOverView/>,
                            };
                        }
                        else if (id == 2) {
                            return {
                                label: `Resource pool`,
                                key: id,
                                children: <Resourcepool />,
                            };
                        }
                    })}
                />
            </div>
        </div>
    )
}

export default page