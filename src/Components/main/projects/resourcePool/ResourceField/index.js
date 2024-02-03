"use client";
import React, { useState } from "react";

import { Modal } from "antd";
import AddResourceModal from "@/Components/main/projects/resourcePool/AddResourceModal";

const ResourceField = ({ resource }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-row items-center">
      <h3 className="text-black font-segoe-ui text-base font-normal leading-6 mr-5 w-32 ">
        {resource}
      </h3>
      <div className="input px-6 py-5 mr-4 bg-neutral-1 shadow-md w-[402px]">
        <button
          className="flex justify-between items-center w-full"
          onClick={openModal}
        >
          <span className="text-neutral-5 font-segoe-ui text-base italic font-semibold leading-6 text-gray-300">
            Add {resource}
          </span>
        </button>
        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
          closable={false}
          width={1000}
        >
          {/* Content of your modal */}
          <AddResourceModal onSubmit={closeModal} resourceRole={resource} />
          {/* <AddResourceModal onClose={closeModal} resourceRole={resource} /> */}
        </Modal>
      </div>

      <div className="text-gray-300 rounded-md bg-neutral-1 shadow-md px-6 py-5">
        <span>00</span>
      </div>
    </div>
  );
};

export default ResourceField;
