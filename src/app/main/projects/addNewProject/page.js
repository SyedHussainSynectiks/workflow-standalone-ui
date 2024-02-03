"use client";
import React, { useState } from "react";
import Link from "next/link";
import NavLink from "@/app/nav-link";
import { Button, Modal } from "antd";

import { baseUrl } from "@/api";

import axios from "axios";
import { useRouter } from "next/navigation";

import useProject, { project, setProject } from "@/HOC/Project/Project";

import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

import { UploadPopul2 } from "./uploadPopul";
import { UploadCompleted } from "./uploadPopul";

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
  const [project, setProject] = useProject({
    projectName: "",
    projectManager: "",
    projectDescription: "",
    projectDepartment: "",
    startDate: "",
    endDate: "",
    projectIcon: "",
  });

  console.log(project);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      name: project.projectName,
      project_manager_id: project.projectManager,
      project_description: project.projectDescription,
      department: project.projectDepartment,
      start_date: project.startDate,
      end_date: project.endDate,
      projectIcon: project.projectIcon,
    };

    try {
      const response = await fetch(
        "https://jp2malu3r8.execute-api.us-east-1.amazonaws.com/dev/project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        console.log("API working");
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
        {/* <div className="flex flex-row items-center justify-center bg-white border rounded-sm shadow-sm border-slate-200   w-28 h-8 px-1 py-4 flex-shrink-0 text-black font-sans  text-sm font-normal leading-snug gap-2">
          All Project{" "}
          <span className="w-2 h-3">
            <img src="/Images/downarrow.svg" />{" "}
          </span>{" "}
        </div> */}
      </section>
      {/* Shows a Details of Project */}
      <section className="flex flex-col items-center flex-shrink-0 justify-between w-auto py-1 bg-white ">
        <form className="flex flex-col px-6 py-5 items-center justify-center gap-3">
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
          {/* <div className="flex flex-row items-center justify-between">
                        <label
                            className="text-black  text-left font-sans text-base font-normal not-italic leading-6 w-40 h-6"
                            for="Project"
                        >
                            Add Resources :
                        </label>
                        <textarea
                            type="text"
                            id="name"
                            placeholder="Please enter name"
                            className="text-slate-500 font-sans text-sm font-normal not-italic leading-6  self-stretch items-center flex-1 border  rounded-sm  border-slate-200 bg-slate-100 shadow px-1 py-1 h-20 w-96 m-1"
                        />
                    </div> */}

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
            {/* <RangePicker
            id="projectDuration"
              className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 self-stretch items-center flex-1 border rounded-sm border-slate-200 bg-slate-100 shadow px-1 py-1 h-8 w-96 m-1"
              onChange={(values) => {
                endDate( values.map(item=> {
                  console.log(item)
                    return moment(item).format("YYYY-DD-MM");
                  }));
              }}
            /> */}
            <div>
              <DatePicker
                id="projectStartDate"
                placeholder="Start Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200 bg-slate-100 shadow px-1 py-1 h-8 w-[184px] m-1"
                onChange={(values) => {
                  project.startDate(
                    values.map((item) => {
                      console.log(item);
                      return moment(item).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
                    })
                    // ,{handleChange}
                    // , values={project:project.startDate}
                  );
                }}

              // value={project.startDate}
              />
              <span>-</span>
              <DatePicker
                id="projectEndDate"
                placeholder="End Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200 bg-slate-100 shadow px-1 py-1 h-8 w-[184px] m-1"
                onChange={(values) => {
                  endDate(
                    values.map((item) => {
                      console.log(item);
                      return moment(item).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
                    })
                  );
                }}
              // value={project.endDate}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <label
              className="text-black  text-left font-sans text-base font-normal not-italic leading-6 w-40 h-6"
              htmlFor="budget"
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
                  okButtonProps={{ className:'bg-blue-500' }}
                >
                  <UploadPopul2 onSubmit={handleCloseModals} />
                </Modal>
              </div>
            </div>
          </div>
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