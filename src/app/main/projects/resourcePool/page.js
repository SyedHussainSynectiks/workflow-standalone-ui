"use client";

import { TbTriangleInvertedFilled } from "react-icons/tb";
import { Button, Modal } from "antd";
import { useState } from "react";
import Projectmanager from "./popup/Addresources";
import ApiDeveloper from "./popup/ApiDeveloper";
import CiCdResourcePool from "./popup/Ci-CdResourcePool";
import TesterResourcePool from "./popup/TesterResourcePool";
import UiDesignResourcePool from "./popup/uiDesignResourcePool";
import UiDeveloperResourcePool from "./popup/uiDeveloperResourcePool";
import UxResearcher from "./popup/uxResearcher";

import Link from "next/link";

export default function Home() {
  // State variables to control the visibility of each modal
  const [isProjectManagerModalOpen, setIsProjectManagerModalOpen] =
    useState(false);
  const [isUiDesignerModalOpen, setIsUiDesignerModalOpen] = useState(false);
  const [isUiDeveloperModalOpen, setIsUiDeveloperModalOpen] = useState(false);
  const [isApiDeveloperModalOpen, setIsApiDeveloperModalOpen] = useState(false);
  const [isTesterModalOpen, setIsTesterModalOpen] = useState(false);
  const [isUxResearcherModalOpen, setIsUxResearcherModalOpen] = useState(false);
  const [isCiCdModalOpen, setIsCiCdModalOpen] = useState(false);

  // Function to open the corresponding modal
  const openModal = (modalSetter) => {
    modalSetter(true);
  };

  // Function to close all modals
  const handleCloseModals = () => {
    setIsProjectManagerModalOpen(false);
    setIsUiDesignerModalOpen(false);
    setIsUiDeveloperModalOpen(false);
    setIsApiDeveloperModalOpen(false);
    setIsTesterModalOpen(false);
    setIsUxResearcherModalOpen(false);
    setIsCiCdModalOpen(false);
  };
  return (
    <>
      <div className="main flex flex-col bg-white w-full rounded-lg  ">
        <h2 className="ml-4 mt-5 text-black font-segoe-ui text-2xl font-semibold leading-24">
          Resource Pool
        </h2>

        <div className="flex mt-8">
          <div className="flex flex-col items-start ml-4 gap-14 justify-center">
            <h3 className="text-black font-segoe-ui text-base font-normal leading-6 mr-10">
              Project Manager
            </h3>
            <h3 className="text-black font-segoe-ui text-base font-normal leading-6 mr-10">
              UI Designer
            </h3>
            <h3 className="text-black font-segoe-ui text-base font-normal leading-6 mr-10">
              UI Developer
            </h3>
            <h3 className="text-black font-segoe-ui text-base font-normal leading-6 mr-10">
              API Developer
            </h3>
            <h3 className="text-black font-segoe-ui text-base font-normal leading-6 mr-10">
              Tester
            </h3>
            <h3 className="text-black font-segoe-ui text-base font-normal leading-6 mr-10">
              UX Researcher
            </h3>
            <h3 className="text-black font-segoe-ui text-base font-normal leading-6 mr-10">
              CI/CD
            </h3>
          </div>
          <div className="div flex flex-col gap-4">
            <div className=" flex flex-row">
              <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
                <a
                  href="#"
                  className="flex justify-between items-center"
                  onClick={() => openModal(setIsProjectManagerModalOpen)}
                >
                  <span className=" text-neutral-5 font-segoe-ui text-base italic font-semibold leading-6 text-gray-300">
                    Add Project Manager
                  </span>
                  <TbTriangleInvertedFilled className=" text-gray-300 text-sm" />
                </a>
                <Modal
                  open={isProjectManagerModalOpen}
                  onCancel={handleCloseModals}
                  width={1000}
                >
                  <Projectmanager />
                </Modal>
              </div>
              <div className=" text-gray-300 rounded-md bg-neutral-1 shadow-md px-6 py-5">
                <span>00</span>
              </div>
            </div>
            <div className=" flex flex-row">
              <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
                <a
                  href="#"
                  className="flex justify-between items-center"
                  onClick={() => openModal(setIsUiDesignerModalOpen)}
                >
                
                  <span className=" text-neutral-5 font-segoe-ui text-base italic font-semibold leading-6 text-gray-300">
                    Add UI Designer
                  </span>
                  <TbTriangleInvertedFilled className=" text-gray-300 text-sm" />
                </a>
                <Modal
                  open={isUiDesignerModalOpen}
                  onCancel={handleCloseModals}
                  width={1000}
                >
                  <UiDesignResourcePool />
                </Modal>
              </div>
              <div className=" text-gray-300 rounded-5 border border-solid border-neutral-5 bg-neutral-1 shadow-md px-6 py-5">
                <span>00</span>
              </div>
            </div>
            <div className=" flex flex-row">
              <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
                <a
                  href="#"
                  className="flex justify-between items-center"
                  onClick={()=> openModal(setIsUiDeveloperModalOpen)}>
                 
                  <span className=" text-neutral-5 font-segoe-ui text-base italic font-semibold leading-6 text-gray-300">
                    Add UI Developer
                  </span>
                  <TbTriangleInvertedFilled className=" text-gray-300 text-sm" />
                </a>
                <Modal
                  open={isUiDeveloperModalOpen}
                  onCancel={handleCloseModals}
                  width={1000}
                >
                  <UiDeveloperResourcePool />
                </Modal>
              </div>
              <div className=" text-gray-300 rounded-5 border border-solid border-neutral-5 bg-neutral-1 shadow-md px-6 py-5">
                <span>00</span>
              </div>
            </div>
            <div className=" flex flex-row">
            <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
              <a href="#" className="flex justify-between items-center" onClick={()=>openModal(setIsApiDeveloperModalOpen)}>    
                   <span className=" text-neutral-5 font-segoe-ui text-base italic font-semibold leading-6 text-gray-300">Add API Developer</span>
                <TbTriangleInvertedFilled className=" text-gray-300 text-sm" /></a>
                <Modal
                  open={isApiDeveloperModalOpen}
                  onCancel={handleCloseModals}
                  width={1000}
                >
                  <ApiDeveloper />
                </Modal>
            </div>
            <div className=" text-gray-300 rounded-5 border border-solid border-neutral-5 bg-neutral-1 shadow-md px-6 py-5">
              <span>00</span>
            </div>
          </div>
          <div className=" flex flex-row">
            <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
              <a href="#" className="flex justify-between items-center" onClick={()=>openModal(setIsTesterModalOpen)}>               <span className=" text-neutral-5 font-segoe-ui text-base italic font-semibold leading-6 text-gray-300">Add Tester</span>
                <TbTriangleInvertedFilled className=" text-gray-300 text-sm" /></a>
                <Modal
                  open={isTesterModalOpen}
                  onCancel={handleCloseModals}
                  width={1000}
                >
                  <TesterResourcePool />
                </Modal>
            </div>
            <div className=" text-gray-300 rounded-5 border border-solid border-neutral-5 bg-neutral-1 shadow-md px-6 py-5">
              <span>00</span>
            </div>
          </div>
          <div className=" flex flex-row">
            <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
              <a href="#" className="flex justify-between items-center" onClick={()=>openModal(setIsUxResearcherModalOpen)}>               <span className=" text-neutral-5 font-segoe-ui text-base italic font-semibold leading-6 text-gray-300">Add UX Researcher</span>
                <TbTriangleInvertedFilled className=" text-gray-300 text-sm" /></a>
                <Modal
                  open={isUxResearcherModalOpen}
                  onCancel={handleCloseModals}
                  width={1000}
                >
                  <UxResearcher />
                </Modal>
            </div>
            <div className=" text-gray-300 rounded-5 border border-solid border-neutral-5 bg-neutral-1 shadow-md px-6 py-5">
              <span>00</span>
            </div>
          </div>
          <div className=" flex flex-row mb-5">
            <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px] ">
              <a href="#" className="flex justify-between items-center" onClick={()=>openModal(setIsCiCdModalOpen)}>              
               <span className=" text-neutral-5 font-segoe-ui text-base italic font-semibold leading-6 text-gray-300">Add CI/CD</span>
                <TbTriangleInvertedFilled className=" text-gray-300 text-sm" /></a>
                <Modal
                  open={isCiCdModalOpen}
                  onCancel={handleCloseModals}
                  width={1000}
                >
                  <CiCdResourcePool />
                </Modal>
            </div>
            <div className=" text-gray-300 rounded-5 border border-solid border-neutral-5 bg-neutral-1 shadow-md px-6 py-5">
              <span>00</span>
            </div>
          </div>
          </div>
        </div>
        <div className="btn relative bg-white mb-10">
          <Link
            href="/main/projects/addedResources"
            className=" absolute right-0 top-0   py-1  px-4 bg-blue-500 text-white bg-primary-6   "
          >
            Next
          </Link>
        </div>
      </div>
    </>
  );
}
