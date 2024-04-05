"use client";
import React from "react";
import { Button, notification } from "antd";
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
import user from "../../../../../public/assets/user.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Resourcepool = () => {
  const axios = require("axios");
  const [workflowData, setWorkflowData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const testerData = teamData.find((team) => team.TesterId);
  const productManagerIdData = teamData.find((team) => team.UxResearcherId);
  const uiDeveloperData = teamData.find((team) => team.UiDesignerId);
  const apiDeveloperIdData = teamData.find((team) => team.ApiDeveloperId);
  const projectName = useSelector((state) => state.addProject.ProjectName);
  const route = useRouter();
  const ProjectId = (ProjectId) => {
    dispatch(addProjectId(ProjectId));
    // console.log(ProjectId)
  };
  const projectId = useSelector((state) => state.addProject.id);
  console.log(projectId);
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
  }, []);
  const dispatch = useDispatch();
  const WorkflowId = (ProjectId) => {
    dispatch(addWorkFlowId(ProjectId));
    // console.log(ProjectId)
  };
  console.log(workflowData);
  const openNotification = (placement, type, message) => {
    notification[type]({
      message: message,
      placement: placement,
    });
  };

  const handleDevUseCases = (data) => {
    if (data > 0) {
      route.push("/main/projects/developmentUsecases");
    } else {
      openNotification("topRight", "error", "No Usecases Added");
    }
  };

  const handleUseCasesForn = (data) => {
    ;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/project/${projectId}/team`
        );
        const responseData = response.data;
        console.log("responsedata ", responseData);
        console.log(JSON.stringify(responseData));
        setTeamData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [projectId]);
  console.log("teamData", teamData);

  return (
    <div className="space-y-4 border-t-[2rem] border-[#F5F5F5]">
      // <div className="bg-white flex px-5 justify-between items-center border border-gray-300 rounded-lg pt-2">
      //   // <div>
      //   //   <h1 className="text-2xl font-semibold leading-snug tracking-normal text-left">
      //   //     Solution
      //   //   </h1>
      //   //   <p className="text-xs font-normal leading-tight tracking-normal">
      //   //     Procurement is the systematic process of identifying, acquiring, and
      //   //     managing the goods, services, or works needed by an organization to
      //   //     meet its operational requirements.
      //   //   </p>
      //   // </div>
      //   // <div className="flex flex-col items-center">
      //   //   <p className="text-xs font-normal leading-tight tracking-normal text-left">
      //   //     Created By
      //   //   </p>
      //   //   <img
      //   //     src="https://cdn.pixabay.com/photo/2015/07/20/12/53/gehlert-852762_1280.jpg"
      //   //     className="w-[2.5rem] h-[2.5rem] rounded-full"
      //   //   />
      //   //   <p
      //   //     className="text-xs f
      //   //             ont-semibold leading-tight tracking-normal text-left"
      //   //   >
      //   //     Siddhesh
      //   //   </p>
      //   // </div>
      // </div>
      <div>
        <div className="p-5 space-y-3 border border-x-2 border-b-0 border-gray-300 bg-white  rounded-t-lg">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl leading-normal tracking-normal text-left">
              {projectName}
            </h1>
            // <Button
            //   icon={<PlusCircleFilled style={{ color: "white" }} />}
            //   type='primary' className="bg-[#1890FF;] w-[7.5rem] px-4 py-1 font-medium text-white"
            // >
            //   Workflow
            // </Button>
          </div>
        </div>
        <div className="p-5 space-y-3 border border-x-2 border-t-0 border-gray-300 bg-white rounded-b-lg  flex gap-2 items-center overflow-x-auto">
          {workflowData.map((data, index) => {
            console.log("mapingData: ", data);
            console.log(data.workflow_name);
            return (
              <div className="flex space-x-2 cursor-pointer">
                <div
                  className=" border border-grey-300 rounded-lg px-4 py-5 space-y-2 w-[21rem]"
                  onClick={() => {
                    WorkflowId(data.workflow_id),
                      handleDevUseCases(data.total_usecases);
                  }}
                >
                  <div key={index}>
                    <div className="flex items-center w-[100%] justify-between">
                      <h3 className="font-semibold text-blue-600">
                        {data.workflow_name}
                      </h3>

                      <Button
                        className="bg-blue-500 text-white"
                        type="primary"
                        
                        onClick={(e) => {
                          e.stopPropagation();
                          WorkflowId(data.workflow_id);
                          route.push("/main/projects/usecaseForm")
                        }}
                      >
                        Add
                      </Button>
                    </div>

                    <p>
                      Total Usecases -{" "}
                      <span className="text-blue-600">
                        {data.total_usecases}
                      </span>
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-lg flex flex-col space-y-3 py-5 px-8 ">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold leading-normal tracking-normal text-left">
            Procurement Resource Pool
          </h1>
          // <div className="space-x-5">
          //   <Search
          //     placeholder="Search employe"
          //     onSearch={onSearch}
          //     style={{
          //       width: "16.5rem",
          //       height: "2rem",
          //     }}
          //   />
          //   <Button
          //     icon={<PlusCircleFilled style={{ color: "white" }} />}
          //     type='primary' className="bg-[#1890FF] w-[7.5rem] px-4 py-1 font-medium text-white"
          //   >
          //     Resources
          //   </Button>
          // </div>
        </div>
        <div className="flex space-x-2 overflow-x-scroll">
          {teamData.map((data) => (
            <div className="flex flex-col space-y-5 w-1/4 border border-gray-200 rounded-lg p-4">
              {Object.entries(data).map(([key, innerData], index) => (
                <div key={index}>
                  <div className="pl-1 pb-2 border border-x-0 border-t-0 border-b-gray-300">
                    <h1 className="font-semibold text-xl">
                      {innerData[0].designation}
                    </h1>
                    <p className="text-gray-400">{innerData.length} Members</p>{" "}
                    {/* Displaying number of members */}
                  </div>
                  {innerData.map((team, index) => (
                    <div
                      key={index}
                      className="flex space-x-4 items-center w-[15.625rem] h-[2.625rem] my-3"
                    >
                      <Image
                        src={team.image_url ? team.image_url : user}
                        height={35}
                        width={35}
                      />
                      <div>
                        <p>{team.name}</p>
                        <p className="text-gray-400">{team.designation}</p>
                      </div>
                    </div>
                  ))}
                  <div className="text-blue-500 text-right">
                    <button className="hover:text-blue-700 hover:underline">
                      View All
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resourcepool;
