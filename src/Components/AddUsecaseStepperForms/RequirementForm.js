import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button, Menu, Typography } from "antd";
import {
  BarsOutlined,
  ShoppingOutlined,
  RiseOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
// import { axios } from 'axios';

const RequirementForm = (stepperState) => {
  const [size, setSize] = useState("small");
  console.log("propsValue", stepperState);

  const onChange = (e) => {
    setSize(e.target.value);
  };
  const arrayOfObjects = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" },
  ];

  const [requireData, setRequireData] = useState();
  const [requiretasks, setrequireTasks] = useState();
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId;
  const [loading, setLoading] = useState(true);
  console.log(UsecaseId);
  useEffect(() => {
    const axios = require("axios");
  
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/usecase/${UsecaseId}`,
      headers: {
        Accept: "application/json",
      },
    };
    setLoading(true); // Set loading state to true when fetching data
  
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data.usecase.stages));
        setRequireData(response.data);
        const stages = response.data.usecase.stages;
        const propsValue = Object.values(stepperState)[0];
        console.log(propsValue);
        const stage = stages.filter((obj) => Object.values(stepperState)[0] in obj);
        const tasks = stage[0][propsValue].tasks;
        console.log("tassks", tasks);
        setrequireTasks(tasks);
        console.log(tasks);
  
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [UsecaseId, stepperState]);
  
  console.log(requiretasks);

  const InsideDropDown = ({ name }) => {
    const [visible, setVisible] = useState(false);

    const items = [
      { key: "1", label: "Item 1" },
      { key: "2", label: "Item 2" },
      { key: "3", label: "Item 3" },
    ];

    const handleVisibleChange = (flag) => {
      setVisible(flag);
    };

    const handleButtonClick = () => {
      // Handle button click action here
    };

    return (
      <Dropdown
        visible={visible}
        onVisibleChange={handleVisibleChange}
        overlay={
          <Space direction="vertical">
            {items.map((item) => (
              <Button key={item.key} type="text">
                {item.label}
              </Button>
            ))}
          </Space>
        }
      >
        <Typography.Link onClick={(e) => e.preventDefault()}>
          <Space>
            {name}
            <DownOutlined />
          </Space>
        </Typography.Link>
        {visible && (
          <Button type="primary" onClick={handleButtonClick}>
            Action
          </Button>
        )}
      </Dropdown>
    );
  };
  const items = [
    {
      label: <InsideDropDown name={"UI Designer"} />,
      key: "0",
    },
    {
      label: <InsideDropDown name={"API Developer"} />,
      key: "1",
    },
    {
      label: <InsideDropDown name={"Tester"} />,
      key: "2",
    },
    {
      label: <InsideDropDown name={"UX Designer"} />,
      key: "3",
    },
  ];
  // console.log("requiredData:", requireData.usecase.stages  )
  return (
    <div>
      {requireData && (
        <div>
          <div className="flex space-x-5 items-center mb-3">
            <div>
              <img
                src={requireData.image}
                className="w-[7rem] h-[7rem] rounded-md"
              />
            </div>
            <div>
              <h1 className="my-3 text-xl font-medium leading-7 tracking-normal text-left">
                {requireData.assignee_name}
              </h1>
              <div className="my-3 flex space-x-2">
                <ShoppingOutlined style={{ fontSize: "1rem" }} />
                <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">
                  {requireData.role}
                </h3>
              </div>
              <div className="my-3 flex space-x-2">
                <BarsOutlined style={{ fontSize: "1rem" }} />
                <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">
                  {requireData.total_task}
                </h3>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">
                  Assigned date
                </p>
                <h3 className="text-base font-normal leading-tight tracking-normal text-left">
                  {requireData.usecase.creation_date}
                </h3>
              </div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">
                  Planned date
                </p>
                <h3 className="text-base font-normal leading-tight tracking-normal text-left">
                  {requireData.usecase.end_date}
                </h3>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">
                  Start date
                </p>
                <h3 className="text-base font-normal leading-tight tracking-normal text-left">
                  {requireData.usecase.start_date}
                </h3>
              </div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">
                  Deviation
                </p>
                <h3 className="text-base font-normal leading-tight tracking-normal text-left">
                  03days
                </h3>
              </div>
            </div>
          </div>
          {loading ? ( // If loading state is true, display a loading message or spinner
            <p>Loading...</p>
          ) : (
            requiretasks.map((data, index) => (
              <div className="mb-8" key={index}>
                <div
                  className="flex items-center justify-between py-3 px-2"
                  style={{ background: "rgba(230, 247, 255, 1)" }}
                >
                  <h1 className="text-base font-bold leading-tight tracking-normal text-left">
                    {data.name}
                  </h1>
                  <DownOutlined />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="border py-1 px-2"
                    >
                      <Space>
                        Assign
                        <DownOutlined />
                      </Space>
                    </button>
                  </Dropdown>
                  <div className="flex items-center space-x-2">
                    <MessageOutlined style={{ fontSize: "20px" }} />
                    <Button
                      type="primary"
                      style={{ background: "rgba(24, 144, 255, 1)" }}
                    >
                      Action
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default RequirementForm;

// import React from "react";
// import { Input, Select, Form, DatePicker, Button } from "antd";
// import { ShoppingOutlined, BarsOutlined, FileAddOutlined } from "@ant-design/icons"

// const { Option } = Select;

// const axios = require('axios');
// let data = JSON.stringify({
//     "example": {
//         "name": "string",
//         "updated_by_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "stages": [
//             {
//                 "Requirements1": {
//                     "tasks": [
//                     ],
//                     "checklist": [
//                     ]
//                 }
//             },
//             {
//                 "mock1": {
//                     "tasks": [
//                         "mytask-1",
//                         "task-2",
//                         "task-3"
//                     ],
//                     "checklist": [
//                         "thing 1",
//                         "thing 2",
//                         "thing 3"
//                     ]
//                 }
//             }
//         ]
//     }
// });

// let config = {
//     method: 'put',
//     maxBodyLength: Infinity,
//     url: 'https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/usecase/<uuid>',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     data: data
// };

// axios.request(config)
//     .then((response) => {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// const RequirementForm = () => {
//     return (
//         <div>
//             <div className='flex items-center justify-between mb-3'>
//                 <div className="flex space-x-2 items-center">
//                     <img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg" className='w-[7rem] h-[7rem] rounded-md' />
//                     <div>
//                         <h1 className="my-3 text-lg font-medium leading-7 tracking-normal text-left">Darlene Robertson</h1>
//                         <div className="my-3 flex space-x-2" >
//                             <ShoppingOutlined style={{ fontSize: "1rem" }} />
//                             <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">Project Manager</h3>
//                         </div>
//                         <div className="my-3 flex space-x-2" >
//                             <BarsOutlined style={{ fontSize: "1rem" }} />
//                             <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">10 Task</h3>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="flex space-x-3 my-10">
//                         <p className="text-sm font-medium leading-snug tracking-normal text-left">Assigned date</p>
//                         <h3 className='text-base font-normal leading-tight tracking-normal text-left'>February 24, 2023</h3>
//                     </div>
//                     <div className="flex space-x-3 my-10">
//                         <p className="text-sm font-medium leading-snug tracking-normal text-left">Planned date</p>
//                         <h3 className='text-base font-normal leading-tight tracking-normal text-left'>MM/DD/YY</h3>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="flex space-x-3 my-10">
//                         <p className="text-sm font-medium leading-snug tracking-normal text-left">Start date</p>
//                         <h3 className='text-base font-normal leading-tight tracking-normal text-left'>MM/DD/YY</h3>
//                     </div>
//                     <div className="flex space-x-3 my-10">
//                         <p className="text-sm font-medium leading-snug tracking-normal text-left">Deviation</p>
//                         <h3 className='text-base font-normal leading-tight tracking-normal text-left'>00days</h3>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex space-x-5">
//                 <div className="w-1/2 space-y-5 h-1/2">
//                     <div className="space-y-5 p-3 border h-1/4">
//                         <h3 className="text-sm font-bold leading-snug tracking-normal text-left">Create Usecase Document</h3>
//                         <FileAddOutlined className="flex justify-center items-center py-8" style={{ fontSize: "70px" }} />
//                     </div>
//                     <div className="border p-4 h-1/4">
//                         <h3>Checklist for requirement</h3>
//                         <div className="flex items-center m-4 space-x-3">
//                             <input type="checkbox" />
//                             <h3 className="text-sm font-normal leading-snug tracking-normal text-left">Use Case Document is stitched in netlify site in Use Cases Matrix</h3>
//                         </div>
//                         <div className="flex items-center m-4 space-x-3">
//                             <input type="checkbox" />
//                             <h3 className="text-sm font-normal leading-snug tracking-normal text-left">Screen Design is stitched in netlify site in Use Cases Matrix</h3>
//                         </div>
//                         <div className="flex items-center m-4 space-x-3">
//                             <input type="checkbox" />
//                             <h3 className="text-sm font-normal leading-snug tracking-normal text-left">Functional Design Review meeting is done with Technical Team</h3>
//                         </div>
//                         <div className="flex items-center m-4 space-x-3">
//                             <input type="checkbox" />
//                             <h3 className="text-sm font-normal leading-snug tracking-normal text-left">Scrum Planning with Micro Level Task Allocation is done</h3>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-1/2 border">
//                     <div className="flex justify-between m-2 border px-2 py-5 rounded-md">
//                         <div className="flex space-x-1">
//                             <img src="" className="w-8 h-8 rounded-full" />
//                             <div>
//                                 <p className="text-sm font-bold leading-tight tracking-normal text-left">Olivia Rhye @olivia</p>
//                                 <p className="text-sm font-normal leading-tight tracking-normal text-left">Product Manager, Integrations</p>
//                             </div>
//                         </div>
//                         <input type="checkbox" />
//                     </div>
//                     <div className="flex justify-between m-2 border px-2 py-5 rounded-md">
//                         <div className="flex space-x-1">
//                             <img src="" className="w-8 h-8 rounded-full" />
//                             <div>
//                                 <p className="text-sm font-bold leading-tight tracking-normal text-left">Phoenix Baker @phoenix</p>
//                                 <p className="text-sm font-normal leading-tight tracking-normal text-left">Product Manager, Integrations</p>
//                             </div>
//                         </div>
//                         <input type="checkbox" />
//                     </div>
//                     <div className="flex justify-between m-2 border px-2 py-5 rounded-md">
//                         <div className="flex space-x-1">
//                             <img src="" className="w-8 h-8 rounded-full" />
//                             <div>
//                                 <p className="text-sm font-bold leading-tight tracking-normal text-left">Lori Bryson @lori</p>
//                                 <p className="text-sm font-normal leading-tight tracking-normal text-left">Product Manager, Integrations</p>
//                             </div>
//                         </div>
//                         <input type="checkbox" />
//                     </div>
//                     <div className="flex justify-between m-2 border px-2 py-5 rounded-md">
//                         <div className="flex space-x-1">
//                             <img src="" className="w-8 h-8 rounded-full" />
//                             <div>
//                                 <p className="text-sm font-bold leading-tight tracking-normal text-left">Orlando Diggs @orlando</p>
//                                 <p className="text-sm font-normal leading-tight tracking-normal text-left">Product Manager, Integrations</p>
//                             </div>
//                         </div>
//                         <input type="checkbox" />
//                     </div>
//                     <div className="flex justify-between m-2 border px-2 py-5 rounded-md">
//                         <div className="flex space-x-1">
//                             <img src="" className="w-8 h-8 rounded-full" />
//                             <div>
//                                 <p className="text-sm font-bold leading-tight tracking-normal text-left">Kate Morrison @kate</p>
//                                 <p className="text-sm font-normal leading-tight tracking-normal text-left">Product Manager, Integrations</p>
//                             </div>
//                         </div>
//                         <input type="checkbox" />
//                     </div>

//                 </div>
//             </div>
//             <div className="flex items-center justify-center m-3">
//                 <Button type="primary" style={{ background: "rgba(24, 144, 255, 1)" }}>Next</Button>
//             </div>
//         </div>
//     );
// };

// export default RequirementForm;

// import React, { Children, useState } from 'react'
// import { DownOutlined, MessageOutlined } from "@ant-design/icons";
// import { Dropdown, Space, Button, Menu, Typography } from 'antd';

// const InsideDropDown = ({ name, }) => {
//     const [visible, setVisible] = useState(false);

//     const items = [
//         { key: '1', label: 'Item 1' },
//         { key: '2', label: 'Item 2' },
//         { key: '3', label: 'Item 3' },
//     ];

//     const handleVisibleChange = (flag) => {
//         setVisible(flag);
//     };

//     const handleButtonClick = () => {
//         // Handle button click action here
//     }
//     return (
//         <Dropdown
//         visible={visible}
//         onVisibleChange={handleVisibleChange}
//         overlay={
//             <Space direction="vertical">
//                 {items.map((item) => (
//                     <Button key={item.key} type="text">
//                         {item.label}
//                     </Button>
//                 ))}
//             </Space>
//         }
//     >
//         <Typography.Link onClick={(e) => e.preventDefault()}>
//             <Space>
//                 {name}
//                 <DownOutlined />
//             </Space>
//         </Typography.Link>
//         {visible && (
//             <Button type="primary" onClick={handleButtonClick}>
//                 Action
//             </Button>
//         )}
//     </Dropdown>

//     )
// }
// const items = [
//     {
//         label: <InsideDropDown name={"UI Designer"} />,
//         key: '0',
//     },
//     {
//         label: <InsideDropDown name={"API Developer"} />,
//         key: '1',
//     },
//     {
//         label: <InsideDropDown name={"Tester"} />,
//         key: '2',
//     },
//     {
//         label: <InsideDropDown name={"UX Designer"} />,
//         key: '3',
//     },
// ];

// const RequirementForm = () => {
//     return (
//         <div>
//             <div className='flex items-center justify-between py-3 px-2' style={{ background: "rgba(230, 247, 255, 1)" }}>
//                 <h1 className='text-base font-bold leading-tight tracking-normal text-left'>Create Usecase Document</h1>
//                 <DownOutlined />
//             </div>
//             <div className='flex items-center justify-between mt-2'>
//                 <Dropdown
//                     menu={{ items, }} trigger={['click']}
//                 >
//                     <button onClick={(e) => e.preventDefault()} className='border py-1 px-2'>
//                         <Space>
//                             Assign
//                             <DownOutlined />
//                         </Space>
//                     </button>
//                 </Dropdown>
//                 <div className='flex items-center space-x-2'>
//                     <MessageOutlined style={{ fontSize: "20px" }} />
//                     <Button type='primary' style={{ background: "rgba(24, 144, 255, 1)" }}>Action</Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RequirementForm
