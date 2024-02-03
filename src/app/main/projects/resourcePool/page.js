"use client";

import { TbTriangleInvertedFilled } from "react-icons/tb";
import { Button, Modal } from "antd";
import { useState } from "react";
// import { AddResources } from "./popup/Addresources";

import AddResourceModal from "@/Components/main/projects/resourcePool/AddResourceModal";

// ResourceField Components
import ResourceField from "@/Components/main/projects/resourcePool/ResourceField";

// Array of ResourcePoolData
export const resourcePoolData = [
  "Project Manager",
  "UX Researcher",
  "UI Designer",
  "UI Developer",
  "API Developer",
  "Tester",
  "CI/CD",
];

export default function Home() {
  // Hooks
  const [modalOpen, setModalOepn] = useState(false);

  // Function to open the corresponding modal
  const openModal = (modalSetter) => {
    modalSetter(true);
  };

  // Function to close modals
  const handleCloseModals = () => {
    setModalOepn(false);
  };

  return (
    <>
      <div className="main flex flex-col bg-white w-full rounded-lg  ">
        <h2 className="ml-4 mt-5 text-black font-segoe-ui text-2xl font-semibold leading-24">
          Resource Pool
        </h2>

        <div className="flex mt-8">
          <div className="div flex flex-col gap-4  justify-center ml-8">
        
            {resourcePoolData.map((resource, index) => (
              <ResourceField
                key={index} // It's a good practice to provide a unique key when mapping over an array in React
                resource={resource}
                onClick={() => openModal(setModalOepn)}
              />
            ))}
          </div>
        </div>

        {/* Next button */}
        <div className="btn relative bg-white mb-10">
          <button className=" absolute right-0 top-0   py-1  px-4 bg-blue-500 text-white bg-primary-6   ">
            Next
          </button>
        </div>
      </div>
    </>
  );
}
