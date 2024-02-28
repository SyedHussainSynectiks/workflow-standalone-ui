"use client";
import React from "react";
import { Button } from "antd";
import { Input } from "antd";
import { Progress } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import newform from "../usecaseForm/page";
import { addProjectId } from "@/Context/AddresourcesSlice/addresourcesSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addWorkFlowId } from "@/Context/AddresourcesSlice/addresourcesSlice";
const { Search } = Input;
import { useSelector } from "react-redux";
const onSearch = (value, _e, info) => console.log(info?.source, value);

const Resourcepool = () => {
  const axios = require("axios");
  const [workflowData, setWorkflowData] = useState([]);


  const ProjectId= (ProjectId)=>{
    dispatch(addProjectId(ProjectId))
    // console.log(ProjectId)
  }
  const setprojectIds = useSelector((state) => state.addResources);
  const projectId = setprojectIds.id[0].prjectId;
console.log(projectId)
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/project/${projectId}/workflow`,
      headers: {
        Accept: "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setWorkflowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Make sure to include an empty dependency array to run the effect only once
  const dispatch = useDispatch();
  const WorkflowId = (ProjectId) => {
    dispatch(addWorkFlowId(ProjectId));
    // console.log(ProjectId)
  };
  console.log(workflowData);
  return (
    <div className="space-y-4">
      <div className="bg-white flex px-5 justify-between items-center border border-gray-300 rounded-lg pt-2">
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
      <div className="p-5 space-y-3 border border-gray-300 bg-white rounded-lg">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl leading-normal tracking-normal text-left">
            Procurement Workflows
          </h1>
          <Button
            icon={<PlusCircleFilled style={{ color: "white" }} />}
            className="bg-[#1890FF;] w-[7.5rem] px-4 py-1 font-medium text-white"
          >
            Workflow
          </Button>
        </div>
        {workflowData.map((data, index) => {
          console.log("mapingData: ", data);
          console.log(data.workflow_name);
          return (
            <div key={index} className="flex space-x-4" >
                <Link
                 href="/main/projects/developmentUsecases" className="w-[100%]" onClick={()=>{WorkflowId(data.workflow_id)}}>
              <div className="w-1/4 border border-black-300 rounded-lg px-4 py-5 space-y-2" >
                < >
                  <div className="flex items-center w-[100%] justify-between">
                    <h3 className="font-semibold text-blue-600">
                      {data.workflow_name}
                    </h3>
                    <Link
                      href="/main/projects/usecaseForm"
                      onClick={() => {
                        WorkflowId(data.workflow_id);
                      }}
                    >
                      <Button className="bg-blue-500 text-white">Add</Button>
                    </Link>
                  </div>
                  <p>
                    Total Usecases -{" "}
                    <span className="text-blue-600">{data.total_usecases}</span>
                  </p>
                  <Progress percent={data.total_usecases} showInfo={false} />
                  <p>
                    Completed Task -{" "}
                    <span className="text-orange-600">
                      {data.task_completed}%
                    </span>
                  </p>
                  <Progress
                    percent={data.task_completed}
                    showInfo={false}
                    strokeColor={"orange"}
                  />
                </>
              </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="bg-white border border-gray-300 rounded-lg flex flex-col space-y-3 py-5 px-8 ">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold leading-normal tracking-normal text-left">
            Procurement Resource Pool
          </h1>
          <div className="space-x-5">
            <Search
              placeholder="Search employe"
              onSearch={onSearch}
              style={{
                width: "16.5rem",
                height: "2rem",
              }}
            />
            <Button
              icon={<PlusCircleFilled style={{ color: "white" }} />}
              className="bg-[#1890FF] w-[7.5rem] px-4 py-1 font-medium text-white"
            >
              Resources
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex flex-col space-y-5 w-1/4 border border-gray-200 rounded-lg p-4">
            <div className="pl-1 pb-2 border border-x-0 border-t-0 border-b-gray-300">
              <h1 className="font-semibold text-xl">Design Department</h1>
              <p className="text-gray-400">20 Members</p>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Dianne Russell</p>
                <p className="text-gray-400">Lead UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/07/20/12/53/gehlert-852762_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Arlene McCoy</p>
                <p className="text-gray-400">Sr. UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/05/04/02/people-875597_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Cody Fisher</p>
                <p className="text-gray-400">Sr. UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2017/09/25/13/12/man-2785071_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Theresa Webb</p>
                <p className="text-gray-400">UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Ronald Richards</p>
                <p className="text-gray-400">UI/UX Designer</p>
              </div>
            </div>
            <div className="text-blue-500 text-right ">
              <button className="hover:text-blue-700 hover:underline">
                View All
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-5 w-1/4 border border-gray-200 rounded-lg p-4">
            <div className="pl-1 pb-2 border border-x-0 border-t-0 border-b-gray-300">
              <h1 className="font-semibold text-xl">UI Developers</h1>
              <p className="text-gray-400">20 Members</p>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Dianne Russell</p>
                <p className="text-gray-400">Lead UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/07/20/12/53/gehlert-852762_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Arlene McCoy</p>
                <p className="text-gray-400">Sr. UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/05/04/02/people-875597_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Cody Fisher</p>
                <p className="text-gray-400">Sr. UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2017/09/25/13/12/man-2785071_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Theresa Webb</p>
                <p className="text-gray-400">UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Ronald Richards</p>
                <p className="text-gray-400">UI/UX Designer</p>
              </div>
            </div>
            <div className="text-blue-500 text-right ">
              <button className="hover:text-blue-700 hover:underline">
                View All
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-5 w-1/4 border border-gray-200 rounded-lg p-4">
            <div className="pl-1 pb-2 border border-x-0 border-t-0 border-b-gray-300">
              <h1 className="font-semibold text-xl">API Developers</h1>
              <p className="text-gray-400">20 Members</p>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Dianne Russell</p>
                <p className="text-gray-400">Lead UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/07/20/12/53/gehlert-852762_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Arlene McCoy</p>
                <p className="text-gray-400">Sr. UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/05/04/02/people-875597_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Cody Fisher</p>
                <p className="text-gray-400">Sr. UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2017/09/25/13/12/man-2785071_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Theresa Webb</p>
                <p className="text-gray-400">UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Ronald Richards</p>
                <p className="text-gray-400">UI/UX Designer</p>
              </div>
            </div>
            <div className="text-blue-500 text-right ">
              <button className="hover:text-blue-700 hover:underline">
                View All
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-5 w-1/4 border border-gray-200 rounded-lg p-4">
            <div className="pl-1 pb-2 border border-x-0 border-t-0 border-b-gray-300">
              <h1 className="font-semibold text-xl">Testers</h1>
              <p className="text-gray-400">20 Members</p>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Dianne Russell</p>
                <p className="text-gray-400">Lead UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/07/20/12/53/gehlert-852762_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Arlene McCoy</p>
                <p className="text-gray-400">Sr. UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/05/04/02/people-875597_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Cody Fisher</p>
                <p className="text-gray-400">Sr. UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2017/09/25/13/12/man-2785071_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Theresa Webb</p>
                <p className="text-gray-400">UI/UX Designer</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem]">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_1280.jpg"
                  className="w-[2.5rem] h-[2.5rem] rounded-full"
                />
              </div>
              <div>
                <p>Ronald Richards</p>
                <p className="text-gray-400">UI/UX Designer</p>
              </div>
            </div>
            <div className="text-blue-500 text-right ">
              <button className="hover:text-blue-700 hover:underline">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resourcepool;
