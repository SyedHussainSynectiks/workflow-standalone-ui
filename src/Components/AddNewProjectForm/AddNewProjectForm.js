"use client";
import React from "react";
import { DataStore } from "@aws-amplify/datastore";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavLink from "@/app/nav-link";

import { Form, Input, Upload, Button, message, DatePicker } from "antd";
import { useSelector } from "react-redux";
import api from "@/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";
import useProject from "@/HOC/Project/Project";

const { RangePicker } = DatePicker;



import moment from "moment";
import { useDispatch } from "react-redux";
import { updateFormData, UpdateStartDate } from "@/Context/AddNewProjectSlice/addProjectSlice";
import { notosans } from "@/font/font";

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

const AddNewProjectForm = ({ receiveFormDataFromChild }) => {
  const [imageBase64, setImageBase64] = useState();

  const formData = useSelector((state) => state.addProject);
  const [startDate, setStartDate] = useState(null);


  const disabledEndDate = (current) => {
    // Disable dates that are before the selected start date or are the selected start date
    return current && (current <= startDate);
  };
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // Update the project state as the user types
    setProject({ ...project, [e.target.name]: e.target.value });
    dispatch(updateFormData({ ...project, [e.target.name]: e.target.value }));

    console.log(project)
  };
  const handleStartDateChange = (date, dateString) => {
    const formattedStartDate = moment(dateString).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    setStartDate(date);
    setProject({
      ...project,
      startDate: formattedStartDate,
    });

    // Dispatch the updated form data with the startDate included
    dispatch(updateFormData({ ...project, startDate: formattedStartDate }));
  };


  const handleEndDateChange = (date, dateString) => {
    const formattedStartDate = moment(dateString).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    setProject({
      ...project,
      endDate: formattedStartDate,
    });

    // Dispatch the updated form data with the startDate included
    dispatch(updateFormData({ ...project, endDate: formattedStartDate }));
  };


  const [fileuploaded, setfileuploaded] = useState(false);
  const [convertedImages, setConvertedImages] = useState([]);
  const [convertedImagesString, setconvertedImagesString] = useState("");
  const [Attachments, setAttachments] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleFileChange = (info) => {
    const allFiles = info.fileList;
    const imgarray = allFiles.map((e) => e.originFileObj);
    setfileuploaded(true);
    setUploadingFiles(allFiles);
    convertImagesToBase64(imgarray);
  };

  const convertImagesToBase64 = async (images) => {
    const newConvertedImages = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      if (file) {
        const reader = new FileReader();
        const base64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        newConvertedImages.push({ fileName: file.name, data: base64 });
      }
    }
    setConvertedImages(newConvertedImages);
  };
  let accesstoken =
    "eyJraWQiOiJ0WExXYzd1ZGhyaVwvVEhLYldwK3F2bEw4SGtJTXQwZVBhUmlzQXhCd0lwRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwNDA4NjQ2OC1kMDUxLTcwMmQtOTY2Mi1hNWRmNTQ5ZjRlMzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfSlA1QjRXWGJIIiwiY3VzdG9tOnVzZXJfaWQiOiIyNGUyOTU0Yi05MzQzLTQ3MWQtODI2Yi0wMDAzYTBlNzZiYjEiLCJjdXN0b206b3JnX2lkIjoiNWM3NWE0MDQtMTJhOC00Yzc5LTkwZDgtNmIzMzgyNTE1NDlkIiwiY29nbml0bzp1c2VybmFtZSI6IjA0MDg2NDY4LWQwNTEtNzAyZC05NjYyLWE1ZGY1NDlmNGUzNCIsIm9yaWdpbl9qdGkiOiI0YjgyMTg1Zi1jZjFmLTRhNmEtOWQwYS1lZDU0ZjdiYWFhMTMiLCJhdWQiOiI3OXFhMDR1bXY1bzFoc2tvajVmcXRkMnM4cCIsImV2ZW50X2lkIjoiZjY2N2I5OTEtODliMS00OWJhLWEyNDYtMzUyZTlhMTBmNmUyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MTIzMDc2NTUsImV4cCI6MTcxMjM5NDA1NSwiY3VzdG9tOnJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMjMwNzY1NSwianRpIjoiMTY1M2UyNzMtY2Y4ZC00MmJiLThkODUtOWVlNjcwYmZhZmJlIiwiZW1haWwiOiJqZWRlZmVsMTU1QGNlbnRlcmYuY29tIn0.aFDIxpwQYQt1tTEPjJ-kPsJYprKVrXoL13ChiF6Y10yrbrGySYT7LI0uuWG09cse6Q96AcnGUK0d6gp5d_qjCaBjvf70DZ2MMjex0vLVFqXbEUv2Z9MCzybrSgR9IreYYkklzfMdFiCeL524L8S8hqrznZKWb-kpr4uB6ECZ2-45rvwa1iPzQ1LesMc-QvrKInENYDona49upkZZOv9cRHLxZ-p3u43P0-nOP0b50ZO7p8Xvmqe2G7Yu7fRVKeTD9fWkb0z_FQKavrrV07bctVXacRgrSflRM3kWnNtSaGrzpzNOnKnxKAHn62S2LaJG--XWrvVlyiLP2SfmTXkQcg";
    
  const uploadingImages = async () => {
    const newAttachments = [];
    for (let i = 0; i < convertedImages.length; i++) {
      try {
        const response = await axios.post(
          "https://i3mdnxvgrf.execute-api.us-east-1.amazonaws.com/dev/docUpload",
          convertedImages[i],
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );
        newAttachments.push(response.data.link);
        // setconvertedImagesString(response.data.link);
        console.log(response.data.link)
        setProject({ ...project, image_url: response.data.link })
        dispatch(updateFormData({ ...project, image_url: response.data.link }))
      } catch (error) {
        console.error(error);
        alert("Error uploading image. Please try again.");
      }
    }
    setAttachments([...newAttachments]);
    setConvertedImages([]); // Reset convertedImages after upload
    setUploadingFiles([]); // Clear uploading files after upload
  };

  useEffect(() => {
    if (fileuploaded && convertedImages.length > 0) {
      uploadingImages();
      setfileuploaded(false);
    }
  }, [fileuploaded, convertedImages]);




  const router = useRouter();

  // useProject
  const [project, setProject] = useState({
    projectName: "",
    projectDescription: "",
    projectDepartment: "",
    startDate: "",
    endDate: "",
    projectId: "",
    image_url: "",
  });

  const projectData = useSelector(state => state.addProject);
  console.log(projectData)
  function disabledDate(current) {
    // Disable all dates before today
    return current && current < moment().startOf('day');
  }
  return (
    <div>
      <section className="flex flex-col items-center flex-shrink-0  w-auto py-1 bg-white ">
        <Form
          {...layout}
          name="nest-messages"
          className={notosans.className}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item className={notosans.className}
            name={["ProjectName"]}
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
              className={notosans.className}
            />
          </Form.Item>

          <Form.Item className={notosans.className}
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
              className={notosans.className}
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
              className={notosans.className}
            />
          </Form.Item>

          <Form.Item className={notosans.className} name="range-time-picker" label="Project Duration">
            <div className="flex">
              <DatePicker
                id="projectStartDate"
                placeholder="Start Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200  px-1 py-1 h-8 w-[184px] m-1"
                // value={project.startDate}
                onChange={handleStartDateChange}
                disabledDate={disabledDate}
              // value={project.startDate}
              />
              <span>-</span>
              <DatePicker
                id="projectEndDate"
                placeholder="End Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200shadow px-1 py-1 h-8 w-[184px] m-1"
                disabledDate={disabledEndDate}
                onChange={handleEndDateChange}
              />
            </div>
          </Form.Item>

          <Form.Item className={notosans.className}
            name="Project Icon"
            label="Project Icon"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            {/* <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> */}


            <Upload
              name="image_url"
              type="file"
              accept="image/*"
              className="flex flex-col items-start ml-1"
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              alt="Uploaded Image"
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {/* <Button
            type="submit"
            className="ml-[90%] m-10 px-2 py-1 justify-center items-center rounded-sm border border-blue-500 bg-blue-500 shadow-sm h-8 font-sans text-center text-white text-sm font-normal not-italic leading-3 flex-row-reverse"
            onClick={handleSubmit}
          >
            Submit
          </Button> */}
        </Form>
      </section>
    </div>
  );
};

export default AddNewProjectForm;
