
import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { BarsOutlined, ShoppingOutlined, RiseOutlined, MessageOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
// import { axios } from 'axios';


const RequirementForm = () => {

  const [size, setSize] = useState('small');

  const onChange = (e) => {
    setSize(e.target.value)
  }

  const [requireData, setRequireData] = useState();
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId

  console.log(UsecaseId);
  useEffect(() => {
    const axios = require('axios'); 
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/usecase/${UsecaseId}`,
          {
            headers: {
              'Accept': 'application/json'
            }
          }
        );
        console.log(response.data);
        setRequireData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()
  }, [UsecaseId]);

  return (
    <div>
      {requireData && (
      
          <div className='flex space-x-5 items-center mb-3'>
            <div>
              <img src={requireData.image} className='w-[7rem] h-[7rem] rounded-md' />
            </div>
            <div>
              <h1 className="my-3 text-xl font-medium leading-7 tracking-normal text-left">{requireData.assignee_name}</h1>
              <div className="my-3 flex space-x-2" >
                <ShoppingOutlined style={{ fontSize: "1rem" }} />
                <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">{requireData.role}</h3>
              </div>
              <div className="my-3 flex space-x-2" >
                <BarsOutlined style={{ fontSize: "1rem" }} />
                <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">{requireData.total_task}</h3>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">Assigned date</p>
                <h3 className='text-base font-normal leading-tight tracking-normal text-left'>{requireData.usecase.creation_date}</h3>
              </div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">Planned date</p>
                <h3 className='text-base font-normal leading-tight tracking-normal text-left'>{requireData.usecase.end_date}</h3>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">Start date</p>
                <h3 className='text-base font-normal leading-tight tracking-normal text-left'>{requireData.usecase.start_date}</h3>
              </div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">Deviation</p>
                <h3 className='text-base font-normal leading-tight tracking-normal text-left'>03days</h3>
              </div>
            </div>
          </div>
      )}


      <div className='bg-white border rounded-md mt-3'>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={size}
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            if (id == 1) {
              return {
                label: `All`,
                key: id,
                children: (
                  <div className='flex flex-col pl-3'>
                    <div className='flex items-center space-x-3 my-3'>
                      <RiseOutlined style={{ background: "rgba(240, 240, 240, 1)", color: "rgba(24, 144, 255, 1)", padding: "5px", fontSize: "1rem" }} className='rounded-lg' />
                      <h3 className='text-base font-normal leading-normal tracking-normal text-left'>Yahiyaalikhan</h3>
                      <p className='text-sm font-normal leading-snug tracking-normal text-left'>Created the task about 2 hours ago</p>
                    </div>
                    <div className='flex items-center space-x-3 my-3'>
                      <RiseOutlined style={{ background: "rgba(240, 240, 240, 1)", color: "rgba(24, 144, 255, 1)", padding: "5px", fontSize: "1rem" }} className='rounded-lg' />
                      <h3 className='text-base font-normal leading-normal tracking-normal text-left'>Yahiyaalikhan</h3>
                      <p className='text-sm font-normal leading-snug tracking-normal text-left'>assign task to Ghouse about 6 hours ago</p>
                    </div>
                    <div className='flex items-center space-x-3 my-3'>
                      <RiseOutlined style={{ background: "rgba(240, 240, 240, 1)", color: "rgba(24, 144, 255, 1)", padding: "5px", fontSize: "1rem" }} className='rounded-lg' />
                      <h3 className='text-base font-normal leading-normal tracking-normal text-left'>Ghouse</h3>
                      <p className='text-sm font-normal leading-snug tracking-normal text-left'>Filled the task about 6 hours ago</p>
                    </div>
                    <div className='flex items-center space-x-3 my-3'>
                      <RiseOutlined style={{ background: "rgba(240, 240, 240, 1)", color: "rgba(24, 144, 255, 1)", padding: "5px", fontSize: "1rem" }} className='rounded-lg' />
                      <h3 className='text-base font-normal leading-normal tracking-normal text-left'>Ghouse</h3>
                      <p className='text-sm font-normal leading-snug tracking-normal text-left'>Started the task about 8 hours ago.</p>
                    </div>
                    <div className='flex items-center space-x-3 my-3'>
                      <RiseOutlined style={{ background: "rgba(240, 240, 240, 1)", color: "rgba(24, 144, 255, 1)", padding: "5px", fontSize: "1rem" }} className='rounded-lg' />
                      <h3 className='text-base font-normal leading-normal tracking-normal text-left'>Ghouse</h3>
                      <p className='text-sm font-normal leading-snug tracking-normal text-left'>completed the task about 12 hours ago</p>
                    </div>
                    <div className='flex items-center space-x-3 my-3'>
                      <MessageOutlined style={{ background: "rgba(240, 240, 240, 1)", color: "rgba(24, 144, 255, 1)", padding: "5px", fontSize: "1rem" }} className='rounded-lg' />
                      <div>
                        <h3 className='text-xs font-normal leading-snug tracking-normal text-left'>Ghouse</h3>
                        <p className='text-xs font-normal leading-snug tracking-normal text-left'>Commented about 12 hours ago</p>
                      </div>
                    </div>
                    <div className='ml-10'>
                      <textarea value={"A design system for enterprise-level products. Create an efficient and enjoyable work experience."} className='w-1/2 border p-2 resize-none rounded-sm'></textarea>
                    </div>
                  </div>
                ),
              };
            }
            else if (id == 2) {
              return {
                label: `Detailed log`,
                key: id,
                children: `Content of card tab ${id}`,
              };
            }
            else if (id == 3) {
              return {
                label: `Comment`,
                key: id,
                children: `Content of card tab ${id}`,
              };
            }
          })}
        />
      </div >
    </div>
  );
};

export default RequirementForm;