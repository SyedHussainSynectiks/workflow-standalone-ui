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
                <h1 className='text-3xl font-semibold leading-snug tracking-normal text-left bg-white pl-3'>{projectName}</h1>
                <div className="bg-white flex px-5 justify-between items-center pt-2">
                    <div>
                        <h1 className="text-2xl font-semibold leading-snug tracking-normal text-left">
                            Solution
                        </h1>
                        <p className="text-xs font-normal leading-tight tracking-normal">
                            Procurement is the systematic process of identifying, acquiring, and
                            managing the goods, services, or works needed by an organization to
                            meet its operational requirements.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-xs font-normal leading-tight tracking-normal text-left">
                            Created By
                        </p>
                        <img
                            src="https://cdn.pixabay.com/photo/2015/07/20/12/53/gehlert-852762_1280.jpg"
                            className="w-[2.5rem] h-[2.5rem] rounded-full"
                        />
                        <p
                            className="text-xs f
                    ont-semibold leading-tight tracking-normal text-left"
                        >
                            Siddhesh
                        </p>
                    </div>
                </div>
                </div>
            <div className='bg-white border-b-[2em] border-[#F5F5F5] mt-4'>
                <Tabs
                    defaultActiveKey="1"
                    size={size}
                    style={{
                        marginBottom: 32,
                        border: 'none',
                        padding: 0,
                        marginLeft: 15,
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