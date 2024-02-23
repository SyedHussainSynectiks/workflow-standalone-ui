"use client"
import React, { useState } from 'react'
import { Button } from 'antd'
import { Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Array from './array';
import { useSelector } from 'react-redux';
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const AddEmployReview = () => {
    const [data, setData] = useState(Array);
    const projectData = useSelector((state) => state.addProject);
    console.log(projectData)
    const handleDelete = (id) => {
        const updatedData = data.filter(employee => employee.id !== id);
        console.log(updatedData);
        setData(updatedData);
    };

    return (
        <div>
            
            <div >
                <div className='rounded-md mt-5 space-y-5 p-5 bg-white'>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-bold leading-snug tracking-normal text-left'>Setup project</h1>
                        <div className='space-x-8'>
                            <Button icon={<EditOutlined />} >Edit</Button>
                            <Button type="primary" className='bg-blue-500' >create</Button>
                        </div>
                    </div>
                    <div className='flex space-x-10 w-screen items-center'>
                        <div><img src={projectData.image_url} className='w-[7rem] h-[7rem] rounded-md' /></div>
                        <div className='flex  '>
                            <div className='p-5 space-y-10 mx-5'>
                                <div>
                                    <p>Project Name</p>
                                    <h3 className='font-semibold'>{projectData.projectName}</h3>
                                </div>
                                <div>
                                    <p>Project department</p>
                                    <h3 className='font-semibold'>{projectData.projectDepartment}</h3>
                                </div>

                            </div>


                            <div className='p-5 space-y-10 mx-5'>
                                <div>
                                    <p>Project Description</p>
                                    <h3 className='font-semibold'>{projectData.projectDescription }</h3>
                                </div>
                                <div>
                                    <p>Project Duration</p>
                                    <h3 className='font-semibold'>{projectData.startDate}TO {projectData.endDate}</h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
         
            <div className='mt-5 flex flex-col space-y-4 bg-white rounded-md p-10'>
                <div className='flex justify-between'>
                    <h1 className='text-2xl font-semibold leading-normal tracking-normal text-left'>Resource Pool</h1>
                    <div>
                        <Search
                            placeholder="Search employe"
                            onSearch={onSearch}
                            style={{
                                width: '16.5rem',
                                height: '2rem'
                            }}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Designation</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Mail ID</th>
                                <th className="px-6 ml-9 py-3 text-left text-xs font-medium text-black uppercase tracking-wider" colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.length > 0 ? (data.map((filter) =>
                                <tr key={filter.id} className="bg-white">
                                    <td className=" py-2 whitespace-nowrap">
                                        <div className="flex items-center space-x-5">
                                            <img className="h-10 w-10 rounded-full" src={filter.name.image.src} alt="Profile" />
                                            <div className="text-sm font-medium text-gray-900">{filter.name.name}</div>
                                        </div>
                                    </td>
                                    <td className="py-2 text-sm text-center font-medium text-gray-900">{filter.Designation}</td>
                                    <td className="py-2 text-sm font-medium text-gray-900">{filter.MailID}</td>
                                    <td className="py-2 whitespace-nowrap text-sm space-x-5">
                                        <Button icon={<EditOutlined />} >Edit</Button>
                                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(filter.id)}>Remove</Button>

                                    </td>
                                    {/* <td className="py-2 whitespace-nowrap text-sm text-gray-500">
                                    </td> */}
                                </tr>
                            ))
                                : (
                                    <tr>
                                        <td colSpan={5} className='px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider'>No data Present</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    )
}

export default AddEmployReview