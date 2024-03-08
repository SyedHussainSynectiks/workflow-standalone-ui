"use client";

import { TbTriangleInvertedFilled } from "react-icons/tb";
import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { Projectmanager } from "./popup";
import { ApiDeveloper } from "./popup";
import { CiCdResourcePool } from "./popup";
import { TesterResourcePool } from "./popup";
import { UxDesignResourcePool } from "./popup";
import { UiDeveloperResourcePool } from "./popup";
import { UxResearcher } from "./popup";
//Images
import Pmimage from "../../../public/assets/PM.svg";
import UxDesign from "../../../public/assets/UxDesign.svg";
import Uidev from "../../../public/assets/UiDeveloper.svg";
import Api from "../../../public/assets/ApiDeveloper.svg";
import tester from "../../../public/assets/tester.svg";
import UxResearch from "../../../public/assets/Uxresearch.svg";
import CiCd from "../../../public/assets/ci-cd.svg";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import axios from "axios";

// API
import api from "@/api";

// HOC
import useProject from "@/HOC/Project/Project";
import { useSelector } from "react-redux";
// useRouter
import { useRouter } from "next/navigation";
import { Tabs } from "antd";

const { TabPane } = Tabs;


const items = () => { 
  const ProductManagerLength = useSelector((state) => state.addResources.ProjectManagerLength);
  const UxDesignerLength = useSelector((state) => state.addResources.UxDesignerLength);
  const UIDeveloperLength = useSelector((state) => state.addResources.UIDeveloperLength);
  const APIDeveloperLength = useSelector((state) => state.addResources.APIDeveloperLength);
  const TesterLength = useSelector((state) => state.addResources.TesterLength);
  const UXResearcherLength = useSelector((state) => state.addResources.UXResearcherLength);
  const CICDSpecialistLength = useSelector((state) => state.addResources.CICDSpecialistLength);
  return[
  
  {
    key: "1",
    label: (
      <span>
        
        <div className=" flex flex-row items-center">
          <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
            <div className="flex justify-between items-center">
              <div className="flex ">
                <Image src={Pmimage} />
                <div className="flex flex-col justify-start">
                  <h2 className=" text-black font-segoe-ui text-base font-normal leading-6 mr-5 w-32 ">
                    Project Manager
                  </h2>
                  <p className=" pl-2 w-32 text-left">{ProductManagerLength} Members</p>
                </div>
              </div>
              <Button className="flex p-2 h-9 items-center gap-0 bg-blue-500">
                <PlusOutlined className="text-white text-lg" />{" "}
                <h1 className="text-white text-lg">Add</h1>
              </Button>
            </div>
          </div>
        </div>
      </span>
    ),
    children: <Projectmanager />,
  },
  {
    key: "2",
    label: (
      <span>
        <div className=" flex flex-row items-center">
          <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={UxDesign} />
                <div className="flex flex-col justify-start">
                  <h2 className=" text-black font-segoe-ui text-base text-left pl-2 font-normal leading-6 mr-5 w-32 ">
                    Ux Designer
                  </h2>
                  <p className=" pl-2 w-32 text-left">{UxDesignerLength} Members</p>
                </div>
              </div>
              <Button className="flex p-2 h-9 items-center gap-0 bg-blue-500">
                <PlusOutlined className="text-white text-lg" />{" "}
                <h1 className="text-white text-lg">Add</h1>
              </Button>
            </div>
          </div>
        </div>
      </span>
    ),
    children: <UxDesignResourcePool />,
  },
  {
    key: "3",
    label: (
      <span>
        <div className=" flex flex-row items-center">
          <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={Uidev} />
                <div className="flex flex-col justify-start">
                  <h2 className=" text-black font-segoe-ui text-base text-left pl-2 font-normal leading-6 mr-5 w-32 ">
                    UI Developer
                  </h2>
                  <p className=" pl-2 w-32 text-left">{UIDeveloperLength} Members</p>
                </div>
              </div>
              <Button className="flex p-2 h-9 items-center gap-0 bg-blue-500">
                <PlusOutlined className="text-white text-lg" />{" "}
                <h1 className="text-white text-lg">Add</h1>
              </Button>
            </div>
          </div>
        </div>
      </span>
    ),
    children: <UiDeveloperResourcePool />,
  },
  {
    key: "4",
    label: (
      <span>
        <div className=" flex flex-row items-center">
          <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={Api} />
                <div className="flex flex-col justify-start">
                  <h2 className=" text-black font-segoe-ui text-base text-left pl-2 font-normal leading-6 mr-5 w-32 ">
                    API Developer
                  </h2>
                  <p className=" pl-2 w-32 text-left">{APIDeveloperLength} Members</p>
                </div>
              </div>
              <Button className="flex p-2 h-9 items-center gap-0 bg-blue-500">
                <PlusOutlined className="text-white text-lg" />{" "}
                <h1 className="text-white text-lg">Add</h1>
              </Button>
            </div>
          </div>
        </div>
      </span>
    ),
    children: <ApiDeveloper />,
  },
  {
    key: "5",
    label: (
      <span>
        <div className=" flex flex-row items-center">
          <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={tester} />
                <div className="flex flex-col justify-start">
                  <h2 className=" text-black font-segoe-ui text-base text-left pl-2 font-normal leading-6 mr-5 w-32 ">
                    Tester
                  </h2>
                  <p className=" pl-2 w-32 text-left">{TesterLength} Members</p>
                </div>
              </div>
              <Button className="flex p-2 h-9 items-center gap-0 bg-blue-500">
                <PlusOutlined className="text-white text-lg" />{" "}
                <h1 className="text-white text-lg">Add</h1>
              </Button>
            </div>
          </div>
        </div>
      </span>
    ),
    children: <TesterResourcePool />,
  },
  {
    key: "6",
    label: (
      <span>
        <div className=" flex flex-row items-center">
          <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={UxResearch} />
                <div className="flex flex-col justify-start">
                  <h2 className=" text-black font-segoe-ui text-base text-left pl-2 font-normal leading-6 mr-5 w-32 ">
                    UX Researcher
                  </h2>
                  <p className=" pl-2 w-32 text-left">{UXResearcherLength} Members</p>
                </div>
              </div>
              <Button className="flex p-2 h-9 items-center gap-0 bg-blue-500">
                <PlusOutlined className="text-white text-lg" />{" "}
                <h1 className="text-white text-lg">Add</h1>
              </Button>
            </div>
          </div>
        </div>
      </span>
    ),
    children: <UxResearcher />,
  },
  {
    key: "7",
    label: (
      <span>
        <div className=" flex flex-row mb-5 items-center">
          <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
            <div className="flex justify-between items-center">
              <div className="flex">
                <Image src={CiCd} />
                <div className="flex flex-col justify-start">
                  <h2 className=" text-black font-segoe-ui text-base text-left pl-2 font-normal leading-6 mr-5 w-32 ">
                    CI/CD Specialist
                  </h2>
                  <p className=" pl-2 w-32 text-left">{CICDSpecialistLength} Members</p>
                </div>
              </div>
              <Button className="flex p-2 h-9 items-center gap-0 bg-blue-500">
                <PlusOutlined className="text-white text-lg" />{" "}
                <h1 className="text-white text-lg">Add</h1>
              </Button>
            </div>
          </div>
        </div>
      </span>
    ),
    children: <CiCdResourcePool />,
  },
]}
const onChange = (key) => {
  console.log(key);
};

export function AddResourcePool2({result}) {
 
  const [project, setProject] = useProject({});
  console.log(result)


  const router = useRouter();



  return (
    <>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        onChange={onChange}
        className="custom-tabs"
      >
        {items().map((item) => (
          <TabPane tab={item.label} key={item.key}>
            {item.children}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
}
