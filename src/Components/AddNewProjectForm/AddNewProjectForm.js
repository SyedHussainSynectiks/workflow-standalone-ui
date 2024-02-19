"use client";
import React from "react";

import { useState } from "react";
import Link from "next/link";
import NavLink from "@/app/nav-link";

import { Form, Input, Upload, Button, message, DatePicker } from "antd";

import api from "@/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";
import useProject from "@/HOC/Project/Project";

const { RangePicker } = DatePicker;

import { UploadPopul2 } from "@/app/main/projects/addNewProject/uploadPopul";

import moment from "moment";
import { useDispatch } from "react-redux";
import { updateFormData } from "@/Context/AddNewProjectSlice/addProjectSlice";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddNewProjectForm = ({}) => {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // Update the form data in the Redux store
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  const next = () => {
    setCurrent(current + 1);
  };
  // State variables to control the visibility of each modal
  const [isPrjectIconModalOpen, setIsPrjectIconModalOpen] = useState(false);

  // Function to open the corresponding modal

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

  // const handleChange = (e) => {
  //   // Update the project state as the user types
  //   setProject({ ...project, [e.target.name]: e.target.value });
  // };
  return (
    <div>
      <section className="flex flex-col items-center flex-shrink-0  w-auto py-1 bg-white ">
        <Form
          {...layout}
          name="nest-messages"
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "email"]}
            label="Project Name"
            rules={[
              {
                message: "Please input the project name!",
              },
            ]}
          >
            <Input
              value={project.projectName}
              onChange={handleChange}
              name="projectName"
              id="projectName"
            />
          </Form.Item>

          <Form.Item
            name={["projectDescription"]}
            label="Project Description"
            rules={[
              {
                message: "Please input the project description!",
              },
            ]}
          >
            <Input
              name="projectDescription"
              id="projectDescription"
              value={project.projectDescription}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name={["projectDepartment"]}
            label="Project Department"
            rules={[
              {
                message: "Please input the project department!",
              },
            ]}
          >
            <Input
              name="projectDepartment"
              id="projectDepartment"
              value={project.projectDepartment}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item name="range-time-picker" label="Project Duration">
            <div className="flex">
              <DatePicker
                id="projectStartDate"
                placeholder="Start Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200  px-1 py-1 h-8 w-[184px] m-1"
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
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200shadow px-1 py-1 h-8 w-[184px] m-1"
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
          </Form.Item>

          <Form.Item
            name="Project Icon"
            label="Project Icon"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload
              name="file"
              className="flex items-start"
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              headers={{
                authorization: "authorization-text",
              }}
              onChange={(info) => {
                if (info.file.status !== "uploading") {
                  console.log(info.file, info.fileList);
                }
                if (info.file.status === "done") {
                  message.success(
                    `${info.file.name} file uploaded successfully`
                  );
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          {/* <Button
            type="submit"
            className="ml-[90%] m-10 px-2 py-1 justify-center items-center rounded-sm border border-blue-500 bg-blue-500 shadow-sm h-8 font-sans text-center text-white text-sm font-normal not-italic leading-3 flex-row-reverse"
            onClick={handleSubmit}
          >
            Next
          </Button> */}
        </Form>
      </section>
    </div>
  );
};

export default AddNewProjectForm;
