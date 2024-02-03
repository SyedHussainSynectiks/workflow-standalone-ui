"use client";

import React, { useState } from "react";
import Link from "next/link";
import NavLink from "@/app/nav-link";
import { Button, Modal } from "antd";

import api from "@/api";

import axios from "axios";
import { useRouter } from "next/navigation";

import useProject from "@/HOC/Project/Project";

import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

import { UploadPopul2 } from "./uploadPopul";
import { UploadCompleted } from "./uploadPopul";

import moment from "moment";

export default function ProjectForm() {
  // State variables to control the visibility of each modal
  const [isPrjectIconModalOpen, setIsPrjectIconModalOpen] = useState(false);

  // Function to open the corresponding modal
  const openModal = (modalSetter) => {
    modalSetter(true);
  };

  const handleCloseModals = () => {
    setIsPrjectIconModalOpen(false);
  };
  const router = useRouter();

  // useProject
  const [project, setProject] = useProject({
    projectName: "",
    projectDescription: "",
    projectDepartment: "",
    startDate: "",
    endDate: "",
    projectId: "",
  });

  console.log(project);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      name: project.projectName,
      description: project.projectDescription,
      department: project.projectDepartment,
      start_date: project.startDate,
      end_date: project.endDate,
      image_url: "https://i.imgur.com/PujQY5Y.png",
    };

    // Api Functions
    try {
      const response = await api.post("/project", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("API Response:", data);
        console.log("API Response:", data.id);
        console.log("API working");

        // Update projectId in the project state
        setProject((prevProject) => ({
          ...prevProject,
          projectId: data.id, // Replace 'data.projectId' with the actual field from your response data
        }));
        
        // ... rest of the code
      } else {
        console.error(
          "Error sending data:",
          response.status,
          response.statusText
        );
      }

      router.push("/main/projects/resourcePool");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleChange = (e) => {
    // Update the project state as the user types
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* This section shows Header of Adding New Projects   */}
      <section className="flex flex-row w-[1218] h-14 px-3 py-6 justify-between items-center bg-white  mb-4">
        <div className="text-black font-sans text-xl font-semibold not-italic leading-7 w-40  flex items-center  gap-1 h-10">
          Add New Project
        </div>
      </section>

      {/* Shows a Details of Project */}
      <section className="flex flex-col items-center flex-shrink-0 justify-between w-auto py-1 bg-white ">
        <form className="flex flex-col px-6 py-5 items-center justify-center gap-3">
          {/* Project Name */}
          <div className="flex flex-row items-center justify-between">
            <label
              className="text-black  text-left font-sans text-base font-normal not-italic leading-6 w-40 h-6"
              htmlFor="Project"
            >
              Project Name:
            </label>

            <input
              type="text"
              name="projectName"
              id="projectName" // Unique ID for each input
              placeholder="Project name"
              className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200 bg-slate-100 shadow px-1 py-1 h-8 w-96 m-1"
              value={project.projectName}
              onChange={handleChange}
            />
          </div>

          {/* Project Description */}
          <div className="flex flex-row items-baseline justify-between">
            <label
              className="text-black  text-left font-sans text-base font-normal not-italic leading-6 w-40 h-6"
              htmlFor="Project"
            >
              Project Description :
            </label>
            <textarea
              name="projectDescription"
              id="projectDescription" // Unique ID for each input
              placeholder="Description.."
              className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200 bg-slate-100 shadow px-1 py-1 h-28 w-96 m-1"
              value={project.projectDescription}
              onChange={handleChange}
            />
          </div>

          {/* Project Departement */}
          <div className="flex flex-row items-center justify-between">
            <label
              className="text-black  text-left font-sans text-base font-normal not-italic leading-6 w-40 h-6"
              htmlFor="Project"
            >
              Project Department :
            </label>
            <input
              type="text"
              name="projectDepartment"
              id="projectDepartment" // Unique ID for each input
              placeholder=" Please describe your customer service, internal customers directly.."
              className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 self-stretch items-center flex-1 border rounded-sm border-slate-200 bg-slate-100 shadow px-1 py-1 h-8 w-96 m-1"
              value={project.projectDepartment}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-row items-center justify-between">
            <label
              className="text-black  text-left font-sans text-base font-normal not-italic leading-6 w-40 h-6"
              htmlFor="Project"
            >
              Project Duration :
            </label>

            <div>
              <DatePicker
                id="projectStartDate"
                placeholder="Start Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200 bg-slate-100 shadow px-1 py-1 h-8 w-[184px] m-1"
                onChange={(date, dateString) =>
                  setProject({
                    ...project,
                    startDate: moment(dateString).format(
                      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
                    ),
                  })
                }

                // value={project.startDate}
              />
              <span>-</span>
              <DatePicker
                id="projectEndDate"
                placeholder="End Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200 bg-slate-100 shadow px-1 py-1 h-8 w-[184px] m-1"
                onChange={(date, dateString) =>
                  setProject({
                    ...project,
                    endDate: moment(dateString).format(
                      "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
                    ),
                  })
                }
                // value={project.endDate}
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <label
              className="text-black  text-left font-sans text-base font-normal not-italic leading-6 w-40 h-6"
              htmlFor="projectIcon"
            >
              project Icon :
            </label>
            <div className="w-96">
              <div className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 self-stretch items-center flex-1 border rounded-sm border-slate-200 bg-slate-100 shadow px-1 py-1 h-8  m-1">
                <a
                  href="#"
                  className="flex justify-between items-center"
                  onClick={() => openModal(setIsPrjectIconModalOpen)}
                >
                  <span className=" text-neutral-5 font-segoe-ui text-base  font-normal leading-6 text-gray-300">
                    Upload Icons
                  </span>
                </a>
                <Modal
                  id="projectIcon"
                  open={isPrjectIconModalOpen}
                  onCancel={handleCloseModals}
                  closable={false}
                  onOk={handleCloseModals}
                  width={430}
                  okButtonProps={{ className: "bg-blue-500" }}
                >
                  <UploadPopul2 onSubmit={handleCloseModals} />
                </Modal>
              </div>
            </div>
          </div>

          {/* HandleSubmit Button */}
          <Button
            type="submit"
            className="ml-[90%] m-10 px-1 py-1 justify-center items-center rounded-sm border border-blue-500 bg-blue-500 shadow-sm w-16 h-8 font-sans text-center text-white text-sm font-normal not-italic leading-3 flex-row-reverse"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </form>

        <Link
          className="px-6 py-3 bg-blue-500"
          href="/main/projects/resourcePool"
        >
          Next
        </Link>
      </section>
    </>
  );
}
