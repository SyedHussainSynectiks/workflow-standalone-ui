"use client";
import React, { useEffect, useState, useRef } from "react";
import { Col, Modal, Row, Tabs, Upload, notification } from "antd";
import {
  BugOutlined,
  CaretDownOutlined,
  DownOutlined,
  FileProtectOutlined,
  LinkOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Button, Menu, Typography, Skeleton } from "antd";
import {
  BarsOutlined,
  ShoppingOutlined,
  RiseOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";
import Image from "next/image";
import userImg from "../../../public/assets/user.png";
// import { axios } from 'axios';

//Doc upload//
import { Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
const { Dragger } = Upload;
//Doc upload//

const RequirementForm = (stepperState) => {
  const [size, setSize] = useState("small");
  console.log("propsValue", stepperState);

  const onChange = (e) => {
    setSize(e.target.value);
  };
  const arrayOfObjects = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" },
  ];

  const [requireData, setRequireData] = useState();
  const [formatedDate, setformatedDate] = useState();
  const [requiretasks, setrequireTasks] = useState([]);
  const [requireChecklist, setrequireChecklist] = useState();
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId;
  const [loading, setLoading] = useState(true);

  const [RolesDetails, setRolesDetails] = useState();
  const [Roles, setRoles] = useState();
  const [teamData, setTeamData] = useState([]);
  const setprojectIds = useSelector((state) => state.addResources);
  const projectId = setprojectIds.id[0].prjectId;
  console.log(UsecaseId);
  useEffect(() => {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/usecase/${UsecaseId}/task`,
      headers: {
        Accept: "application/json",
      },
    };
    setLoading(true); // Set loading state to true when fetching data

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(response.data)

        console.log(JSON.stringify(response.data.stages));
        // setRequireData(response.data);
        const stages = response.data.stages;
        console.log(stages)
        const propsValue = Object.values(stepperState)[0];
        // const creationDate = new Date(requireData.usecase.creation_date);
        // const formattedDate = creationDate.toISOString().slice(0, 10); // YYYY-MM-DD format
        // setformatedDate(formattedDate);
        const stage = stages.filter(
          (obj) => Object.values(stepperState)[0] in obj
        );
        const tasks = stage[0][propsValue].tasks;
        console.log(tasks)
        const checkList = stage[0][propsValue].checklist;
        // console.log("tassks", tasks);
        // console.log("checklist", checkList);
        setrequireTasks(tasks);
        // window.addEventListener("load", () => {
        //   const storedCurrentTask = localStorage.getItem("currentTask");
        //   if (storedCurrentTask) {
        //     const parsedCurrentTask = JSON.parse(storedCurrentTask);
        //     setrequireTasks(parsedCurrentTask);
        //   }
        // });

        setrequireChecklist(checkList);
        // console.log(tasks);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/project/${projectId}/team`
        );
        const responseData = response.data;
        console.log("responsedata ", responseData);
        console.log(JSON.stringify(responseData));
        const data = response.data;
        setRolesDetails(data.map((obj) => Object.values(obj)));
        setRoles(data.map((obj) => Object.keys(obj)));
        setTeamData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [UsecaseId, stepperState, projectId]);
  console.log(Roles);

  console.log("teamData", teamData);
  console.log("teamDetails", RolesDetails);
  console.log(requiretasks);

  const InsideDropDown = ({ name }) => {
    const [visible, setVisible] = useState(false);

    const items = [
      { key: "1", label: "Item 1" },
      { key: "2", label: "Item 2" },
      { key: "3", label: "Item 3" },
    ];

    const handleVisibleChange = (flag) => {
      setVisible(flag);
    };

    const handleButtonClick = () => {
      // Handle button click action here
    };

    return (
      <Dropdown
        open={visible}
        onOpenChange={handleVisibleChange}
        menu={
          <Space direction="vertical">
            {items.map((item) => (
              <Button key={item.key} type="text">
                {item.label}
              </Button>
            ))}
          </Space>
        }
      >
        <Typography.Link onClick={(e) => e.preventDefault()}>
          <Space>
            {name}
            <DownOutlined />
          </Space>
        </Typography.Link>
        {visible && (
          <Button type="primary" onClick={handleButtonClick}>
            Action
          </Button>
        )}
      </Dropdown>
    );
  };
  let items = [];
  if (Roles) {
    items = Roles.map((data, index) => ({
      label: data,
      items: ["Resource 1", "Resource 2", "Resource 3"],
    }));
  }

  // const props = {
  //   action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  //   onChange({ file, fileList }) {
  //     if (file.status !== "uploading") {
  //       console.log(file, fileList);
  //     }
  //   },
  //   defaultFileList: [
  //     {
  //       uid: "1",
  //       name: "yyy.png",
  //       status: "done",
  //       url: "http://www.baidu.com/yyy.png",
  //     },
  //     {
  //       uid: "2",
  //       name: "yyy.png",
  //       status: "done",
  //       url: "http://www.baidu.com/yyy.png",
  //     },
  //   ],
  // };

  // Doc upload starts here
  const [image, setimage] = useState([]);
  const [fileuploaded, setfileuploaded] = useState(false);
  const [convertedImages, setConvertedImages] = useState([]);
  const [Attachments, setAttachments] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);

  console.log(Attachments);
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
  let accesstoken = "eyJraWQiOiJ0WExXYzd1ZGhyaVwvVEhLYldwK3F2bEw4SGtJTXQwZVBhUmlzQXhCd0lwRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNGI4YjRhOC05MDExLTcwMmUtOTY2ZC1lZDQ3NmUzODY5ZDciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfSlA1QjRXWGJIIiwiY3VzdG9tOnVzZXJfaWQiOiI2NDY4ZjIzNi02NmM4LTRlMjItYWVlYS0xMDA0YjE0YzVjMjkiLCJjdXN0b206b3JnX2lkIjoiYjk0YTU2NGQtODlmNy00NmQxLWJkNDEtYzZmNzQwMzQ5N2JjIiwiY29nbml0bzp1c2VybmFtZSI6ImM0YjhiNGE4LTkwMTEtNzAyZS05NjZkLWVkNDc2ZTM4NjlkNyIsIm9yaWdpbl9qdGkiOiI3ODNlMTY1NC02N2IzLTQ5ZTUtYjA2Yy04ODY5Y2VlZWM5ZjIiLCJhdWQiOiI3OXFhMDR1bXY1bzFoc2tvajVmcXRkMnM4cCIsImV2ZW50X2lkIjoiOTQ4MmU4NWEtZDNmZC00M2EzLWE0MjQtY2Q4YThkZjU1Mjk3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MTA4MjU5MDYsImV4cCI6MTcxMDgyOTUwNiwiY3VzdG9tOnJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMDgyNTkwNiwianRpIjoiMWFjZjI4YTYtNWIzOS00NGViLWE2NTYtMWJhYmEwYzlmMGMyIiwiZW1haWwiOiJpdHphbHRhZmh1c2FpbkBnbWFpbC5jb20ifQ.2OvOuWfshkKKiTqkZaHrLE9hJHQ2YYid1B_cIXRCGAU6hi6RddiDfNpjUFCFC6NNK0kBwafPvMW-SYbzf9qphXrewqgzPT0zbnnOzUpO8RQnGRu7j5avNMF7XFeWZiZiUsyhctX2sUKyM_cGU_fdiS2ePrG0gjgz1DhKf1PIiyBHMBPklOIHZEMTG4xRYJVWdm81J7QJeLjCmVPs0tnxwS--STwd5_zlGARqUipkGzHTgZkyUPWBXsvrM_BQmMwJW-QXS78TyNqwRXJS4eHvNHIIL5PRBajRO0EpauXcuHLtskzgGfXZmFFVXAVYfh0vLgWYb6kzfLMmTAXnM6uHjQ"
  const uploadingImages = async () => {
    const newAttachments = [];
    for (let i = 0; i < convertedImages.length; i++) {
      try {
        const response = await axios.post(
          "https://i3mdnxvgrf.execute-api.us-east-1.amazonaws.com/dev/docUpload",
          convertedImages[i], {
          headers: {
            'Authorization': `Bearer ${accesstoken}`
          }
        }
        );
        newAttachments.push(response.data.link);
      } catch (error) {
        console.error(error);
        alert("Error uploading image. Please try again.");
      }
    }
    setAttachments([...Attachments, ...newAttachments]);
    setConvertedImages([]); // Reset convertedImages after upload
    setUploadingFiles([]); // Clear uploading files after upload
  };

  useEffect(() => {
    if (fileuploaded && convertedImages.length > 0) {
      uploadingImages();
      setfileuploaded(false);
    }
  }, [fileuploaded, convertedImages]);

  const getFileNameFromUrl = (url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  };

  const UploadDocs = () => (
    <Dragger
      multiple
      onChange={(e) => {
        handleFileChange(e);
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );

  /////////  Doc upload ends

  const [isOpen, setIsOpen] = useState(false);
  const [openItemIndex, setOpenItemIndex] = useState(null);
  const [openActionIndex, setopenActionIndex] = useState(null);
  const [openImageIndex, setopenImageIndex] = useState([]);
  const dropdownRef = useRef(null);
  const [showOptions, setShowOptions] = useState(
    requiretasks ? Array(requiretasks.length).fill(false) : []
  );
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedAssignee, setSelectedAssignee] = useState();
  const [selectedAssign, setSelectedAssign] = useState();
  const [selectedAssignName, setSelectedAssignName] = useState();
  const [AssignName, setAssignName] = useState();
  const [AssignIndex, setAssignIndex] = useState();
  const [AssignImg, setAssignImg] = useState();
  const [AssignResourseId, setAssignResurseId] = useState();
  const [TaskId, setTaskId] = useState();
  const [AssigneeImg, setAssigneeImg] = useState(null);
  console.log(AssignName, AssignIndex);
  const openNotification = (placement, type, message) => {
    notification[type]({
      message: message,
      placement: placement,
    });
  };

  const toggleSaved = (index) => {
    setopenImageIndex((prevIndexes) => {
      const currentIndex = prevIndexes.indexOf(index);
      if (currentIndex === -1) {
        return [...prevIndexes, index];
      } else {
        return prevIndexes.filter((i) => i !== index);
      }
    });
  };

  const toggleOptions = (index) => {
    const newShowOptions = [...showOptions];
    newShowOptions[index] = !newShowOptions[index];
    setShowOptions(newShowOptions);
    // setopenActionIndex(openActionIndex === index ? null : index);

    setopenActionIndex(index);
  };
  const handleOptionClick = () => {
    setShowUploadModal(true);
  };
  const handleCancel = () => {
    setShowUploadModal(false);
  };
  const toggleDropDown = (index) => {
    setIsOpen(!isOpen);
  };

  const toggleSubItems = (index) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };
  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

  const handleSelectedResourse = (index, resource_id, name, image_url) => {
    console.log("passing values", index, resource_id);
    const UpdatedTask = {
      assigne_index: index,
      assigneId: resource_id,
      assigneName: name,
      assigne_image: image_url,
    };
    setSelectedAssignee(UpdatedTask);
  };
  console.log("selectedResource", selectedAssignee);

  const handleTaskId = (taskId) => {
    setTaskId(taskId);
    console.log("selectedTaskId", taskId);
  };
  const handleAssigneName = (name) => {
    setSelectedAssignName(name);
  };
  const assigndbutton = () => {
    const currentTask = requiretasks.at(AssignIndex);
    (currentTask.assigneId = AssignResourseId),
      (currentTask.assigneName = AssignName),
      (currentTask.assigne_image = AssignImg);

    requiretasks[AssignIndex] = currentTask;
    handleAssignButtonClick(AssignResourseId);
  };

  // LocalStorage-----
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    console.log("currentTask", JSON.stringify(currentTask));
  });
  // window.addEventListener("load", () => {
  //   const storedCurrentTask = localStorage.getItem("currentTask");
  //   if (storedCurrentTask) {
  //     const parsedCurrentTask = JSON.parse(storedCurrentTask);
  //     setrequireTasks(parsedCurrentTask);
  //   }
  // });

  const handleAssignButtonClick = (id) => {
    console.log("Selected SubItem:", id);

    const axios = require("axios");

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/task/${TaskId}/assign/${id}`,
      headers: {
        Accept: "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        openNotification("topRight", "success", `${response.data.message}`);
        console.log("resporns Datar", response.data);
        const currentTask = requiretasks.at(AssignIndex);
        (currentTask.assigneId = AssignResourseId),
          (currentTask.assigneName = AssignName),
          (currentTask.assigne_image = AssignImg);

        requiretasks[AssignIndex] = currentTask;
        console.log(config);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const actionButtons = document.querySelectorAll('.action-button');
  // console.log("requiredData:", requireData.usecase.stages  )
  return (
    <div>
      {/* {requireData && (
        <div className=" w-[100%] px-4">
          <div className="flex space-x-5 items-center mb-3 ">
            <div>
              <img
                src={requireData.image}
                className="w-[7rem] h-[7rem] rounded-md"
              />
            </div>
            <div>
              <h1 className="my-3 text-xl font-medium leading-7 tracking-normal text-left">
                {requireData.assignee_name}
              </h1>
              <div className="my-3 flex space-x-2">
                <ShoppingOutlined style={{ fontSize: "1rem" }} />
                <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">
                  {requireData.role}
                </h3>
              </div>
              <div className="my-3 flex space-x-2">
                <BarsOutlined style={{ fontSize: "1rem" }} />
                <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">
                  {requireData.total_task}
                </h3>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">
                  Assigned date
                </p>
                <h3 className="text-base font-normal leading-tight tracking-normal text-left">
                  {formatedDate}
                </h3>
              </div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">
                  Planned date
                </p>
                <h3 className="text-base font-normal leading-tight tracking-normal text-left">
                  {requireData.usecase.end_date}
                </h3>
              </div>
            </div>
            <div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">
                  Start date
                </p>
                <h3 className="text-base font-normal leading-tight tracking-normal text-left">
                  {requireData.usecase.start_date}
                </h3>
              </div>
              <div className="flex space-x-3 my-10">
                <p className="text-sm font-medium leading-snug tracking-normal text-left">
                  Deviation
                </p>
                <h3 className="text-base font-normal leading-tight tracking-normal text-left">
                  03days
                </h3>
              </div>
            </div>
          </div> */}
      {loading ? (
        <p>
          {" "}
          <Skeleton
            active
            paragraph={{
              rows: 6,
            }}
          />
        </p>
      ) : (
        <>
          {requiretasks.map(
            (data, index) => (
              console.log("taskData", data),
              (
                <div className="mb-8" key={index}>
                  <div
                    className="flex items-center justify-between py-3 px-2"
                    style={{ background: "rgba(230, 247, 255, 1)" }}
                  >
                    <h1 className="text-base font-bold leading-tight tracking-normal text-left">
                      {data.name}
                    </h1>
                    <DownOutlined />
                  </div>
                  <div
                    className="flex items-center justify-between mt-2 px-4"
                    key={index}
                  >
                    <div
                      ref={dropdownRef}
                      className="relative flex items-center gap-4"
                    >
                      <button
                        onClick={() => toggleSubItems(index)}
                        className="bg-blue-500 border text-white p-2 rounded-md flex items-center gap-1"
                      >
                        Assign
                        <img
                          width="15"
                          src="https://img.icons8.com/ios/50/expand-arrow--v2.png"
                          alt="expand-arrow--v2"
                        />
                      </button>
                      {loading ? (
                        <p></p>
                      ) : (
                        <div className="flex gap-2 w-[2]" id="AssigneeImg">
                          <Image
                            src={data.assigned_to.image}
                            alt={data.assigned_to.name}
                            height={34}
                          ></Image>
                          {(index === openActionIndex || showOptions[index]) && (
                            <div>
                              <h2>Attachments</h2>

                              <div className="flex flex-row gap-4">
                                {uploadingFiles.map((file, index) => (
                                  <div
                                    key={index}
                                    style={{ marginBottom: 10 }}
                                  >
                                    {/* {getFileNameFromUrl(file.url)} */}
                                    {file.name} -{" "}
                                    <Progress percent={file.percent} />
                                    {/* {setimage(file.name)} */}
                                  </div>
                                ))}
                                {Attachments.map((file, index) => (
                                  <div key={index}>
                                    {file.endsWith("pdf") ? (
                                      //  <iframe src={file} title={file.name} width="400" height="300" />
                                      <Link href={file} target="_blank">
                                        {/* {uploadingFiles.map((file, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            {file.name}
            {setimageName(file.name)}
          </div>
        ))} */}
                                        <Image
                                          src={
                                            "https://media.istockphoto.com/id/1209500169/vector/document-papers-line-icon-pages-vector-illustration-isolated-on-white-office-notes-outline.jpg?s=612x612&w=0&k=20&c=Dt2k6dEbHlogHilWPTkQXAUxAL9sKZnoO2e055ihMO0="
                                          }
                                          height={30}
                                          width={30}
                                        />
                                      </Link>
                                    ) : (
                                      <div>
                                        <img
                                          src={file}
                                          alt={file.name}
                                          height={50}
                                          width={50}
                                        />

                                        {/* <a href={file} download={file.name}>{file.name}</a> */}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {openItemIndex === index && showOptions && (
                        <ul className="absolute top-10 left-0 bg-white text-black shadow-md rounded-md z-[2]">
                          <div className="flex items-center justify-center">
                            <SearchOutlined className="pl-2" />
                            <input
                              type="text"
                              placeholder="Search Role"
                              className="outline-none ml-2"
                            />
                          </div>
                          {teamData.map(
                            (itemsData, itemIndex) => (
                              console.log(itemsData),
                              (
                                <li key={itemIndex} className="p-2">
                                  <div className="flex items-center justify-between">
                                    {Object.keys(itemsData).map(
                                      (key, inx) => (
                                        console.log(key),
                                        (
                                          <button className="bg-blue-500"
                                            key={inx}
                                            onClick={() =>
                                              handleSubItemClick(
                                                itemIndex ===
                                                  selectedSubItem
                                                  ? null
                                                  : itemIndex
                                              )
                                            }
                                          >
                                            {key}
                                          </button>
                                        )
                                      )
                                    )}
                                    <CaretDownOutlined />
                                  </div>
                                  {selectedSubItem === itemIndex &&
                                    itemsData && (
                                      <ul>
                                        <li className=" ">
                                          {Object.values(itemsData).map(
                                            (subItem, i) => (
                                              <React.Fragment key={i}>
                                                {Array.isArray(subItem) &&
                                                  subItem.map(
                                                    (item, j) => (
                                                      console.log(
                                                        item.resource_id
                                                      ),
                                                      (
                                                        <button
                                                          key={j}
                                                          className="py-1 w-[100%] bg-blue-500"
                                                          style={{
                                                            backgroundColor:
                                                              selectedAssign ===
                                                                item.resource_id // Assuming selectedSubItem is the selected name
                                                                ? "#E6F7FF"
                                                                : "transparent",
                                                          }}
                                                          onClick={() => {
                                                            setAssignIndex(
                                                              index
                                                            );
                                                            setAssignResurseId(
                                                              item.resource_id
                                                            ),
                                                              setAssignName(
                                                                item.name
                                                              ),
                                                              setAssignImg(
                                                                items.image_url
                                                              );

                                                            handleTaskId(
                                                              data.id
                                                            );
                                                            handleSelectedResourse(
                                                              item.resource_id
                                                            );
                                                            handleTaskId(
                                                              data.id
                                                            );
                                                            handleAssigneName(
                                                              item.name
                                                            );
                                                            setSelectedAssign(
                                                              item.resource_id
                                                            );
                                                          }}
                                                        >
                                                          {item.name}
                                                          {/* Assuming name is the property to be displayed */}
                                                        </button>
                                                      )
                                                    )
                                                  )}
                                              </React.Fragment>
                                            )
                                          )}
                                        </li>
                                        <button
                                          onClick={() => {
                                            // handleAssignButtonClick(
                                            //   selectedAssign
                                            // );
                                            assigndbutton();
                                            handleSubItemClick(
                                              itemIndex === selectedSubItem
                                                ? null
                                                : itemIndex
                                            );

                                            toggleSaved(index);
                                          }}
                                          className="action-button bg-sky-500 px-2 py-1 text-white rounded-sm  "
                                        >
                                          Assign
                                        </button>
                                      </ul>
                                    )}
                                </li>
                              )
                            )
                          )}
                        </ul>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <MessageOutlined style={{ fontSize: "20px" }} />
                      <div className="relative">
                        <button
                          onClick={() => {
                            toggleOptions(index), setAssignIndex(index);
                          }}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold p-2 rounded"
                        >
                          Action
                        </button>

                        {openActionIndex === index && (
                          <div className="absolute z-10 bg-white w-[10rem] p-2 -left-[50%] rounded-lg shadow-lg overflow-hidden">
                            <ul>
                              <li onClick={handleOptionClick}>
                                <FileProtectOutlined /> Upload Document
                              </li>
                              <li onClick={handleOptionClick}>
                                <LinkOutlined /> Upload Link
                              </li>
                              <li onClick={handleOptionClick}>
                                <BugOutlined /> Raise Issue
                              </li>
                            </ul>
                          </div>
                        )}

                        <Modal
                          title="Upload Document"
                          visible={showUploadModal}
                          onCancel={handleCancel}
                          footer={null}
                        >
                          {/* <Upload > */}
                          {/* <Button icon={<UploadOutlined />}>
                                  Upload
                                </Button> */}
                          {/* </Upload> */}
                          <UploadDocs />
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          )}

          <div className="mt-6 border ">
            <h2 className="text-l font-medium p-2">
              Checklist for requirement
            </h2>
            {requireChecklist.map((checklistdata, index) => (
              <div
                className="px-4 py-2 flex items-center gap-2 "
                key={index}
              >
                <input type="checkbox"></input>
                <p>{checklistdata.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    // )}
    // </div>
  );
};

export default RequirementForm;

//-------------------------------------------------////-------------------------------------------------///

// import React from "react";
// import { Input, Select, Form, DatePicker, Button } from "antd";
// import { ShoppingOutlined, BarsOutlined, FileAddOutlined } from "@ant-design/icons"

// const { Option } = Select;

// const axios = require('axios');
// let data = JSON.stringify({
//     "example": {
//         "name": "string",
//         "updated_by_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "stages": [
//             {
//                 "Requirements1": {
//                     "tasks": [
//                     ],
//                     "checklist": [
//                     ]
//                 }
//             },
//             {
//                 "mock1": {
//                     "tasks": [
//                         "mytask-1",
//                         "task-2",
//                         "task-3"
//                     ],
//                     "checklist": [
//                         "thing 1",
//                         "thing 2",
//                         "thing 3"
//                     ]
//                 }
//             }
//         ]
//     }
// });

// let config = {
//     method: 'put',
//     maxBodyLength: Infinity,
//     url: 'https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/usecase/<uuid>',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     data: data
// };

// axios.request(config)
//     .then((response) => {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// const RequirementForm = () => {
//     return (
//         <div>
//             <div className='flex items-center justify-between mb-3'>
//                 <div className="flex space-x-2 items-center">
//                     <img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg" className='w-[7rem] h-[7rem] rounded-md' />
//                     <div>
//                         <h1 className="my-3 text-lg font-medium leading-7 tracking-normal text-left">Darlene Robertson</h1>
//                         <div className="my-3 flex space-x-2" >
//                             <ShoppingOutlined style={{ fontSize: "1rem" }} />
//                             <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">Project Manager</h3>
//                         </div>
//                         <div className="my-3 flex space-x-2" >
//                             <BarsOutlined style={{ fontSize: "1rem" }} />
//                             <h3 className="text-base font-normal leading-normal tracking-normal text-left space-y-4">10 Task</h3>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="flex space-x-3 my-10">
//                         <p className="text-sm font-medium leading-snug tracking-normal text-left">Assigned date</p>
//                         <h3 className='text-base font-normal leading-tight tracking-normal text-left'>February 24, 2023</h3>
//                     </div>
//                     <div className="flex space-x-3 my-10">
//                         <p className="text-sm font-medium leading-snug tracking-normal text-left">Planned date</p>
//                         <h3 className='text-base font-normal leading-tight tracking-normal text-left'>MM/DD/YY</h3>
//                     </div>
//                 </div>
//                 <div>
//                     <div className="flex space-x-3 my-10">
//                         <p className="text-sm font-medium leading-snug tracking-normal text-left">Start date</p>
//                         <h3 className='text-base font-normal leading-tight tracking-normal text-left'>MM/DD/YY</h3>
//                     </div>
//                     <div className="flex space-x-3 my-10">
//                         <p className="text-sm font-medium leading-snug tracking-normal text-left">Deviation</p>
//                         <h3 className='text-base font-normal leading-tight tracking-normal text-left'>00days</h3>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex space-x-5">
//                 <div className="w-1/2 space-y-5 h-1/2">
//                     <div className="space-y-5 p-3 border h-1/4">
//                         <h3 className="text-sm font-bold leading-snug tracking-normal text-left">Create Usecase Document</h3>
//                         <FileAddOutlined className="flex justify-center items-center py-8" style={{ fontSize: "70px" }} />
//                     </div>
//                     <div className="border p-4 h-1/4">
//                         <h3>Checklist for requirement</h3>
//                         <div className="flex items-center m-4 space-x-3">
//                             <input type="checkbox" />
//                             <h3 className="text-sm font-normal leading-snug tracking-normal text-left">Use Case Document is stitched in netlify site in Use Cases Matrix</h3>
//                         </div>
//                         <div className="flex items-center m-4 space-x-3">
//                             <input type="checkbox" />
//                             <h3 className="text-sm font-normal leading-snug tracking-normal text-left">Screen Design is stitched in netlify site in Use Cases Matrix</h3>
//                         </div>
//                         <div className="flex items-center m-4 space-x-3">
//                             <input type="checkbox" />
//                             <h3 className="text-sm font-normal leading-snug tracking-normal text-left">Functional Design Review meeting is done with Technical Team</h3>
//                         </div>
//                         <div className="flex items-center m-4 space-x-3">
//                             <input type="checkbox" />
//                             <h3 className="text-sm font-normal leading-snug tracking-normal text-left">Scrum Planning with Micro Level Task Allocation is done</h3>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="w-1/2 border">
//                     <div className="flex justify-between m-2 border px-2 py-5 rounded-md">
//                         <div className="flex space-x-1">
//                             <img src="" className="w-8 h-8 rounded-full" />
//                             <div>
//                                 <p className="text-sm font-bold leading-tight tracking-normal text-left">Olivia Rhye @olivia</p>
//                                 <p className="text-sm font-normal leading-tight tracking-normal text-left">Product Manager, Integrations</p>
//                             </div>
//                         </div>
//                         <input type="checkbox" />
//                     </div>
//                     <div className="flex justify-between m-2 border px-2 py-5 rounded-md">
//                         <div className="flex space-x-1">
//                             <img src="" className="w-8 h-8 rounded-full" />
//                             <div>
//                                 <p className="text-sm font-bold leading-tight tracking-normal text-left">Phoenix Baker @phoenix</p>
//                                 <p className="text-sm font-normal leading-tight tracking-normal text-left">Product Manager, Integrations</p>
//                             </div>
//                         </div>
//                         <input type="checkbox" />
//                     </div>
//                     <div className="flex justify-between m-2 border px-2 py-5 rounded-md">
//                         <div className="flex space-x-1">
//                             <img src="" className="w-8 h-8 rounded-full" />
//                             <div>
//                                 <p className="text-sm font-bold leading-tight tracking-normal text-left">Lori Bryson @lori</p>
//                                 <p className="text-sm font-normal leading-tight tracking-normal text-left">Product Manager, Integrations</p>
//                             </div>
//                         </div>
//                         <input type="checkbox" />
//                     </div>
//                     <div className="flex justify-between m-2 border px-2 py-5 rounded-md">
//                         <div className="flex space-x-1">
//                             <img src="" className="w-8 h-8 rounded-full" />
//                             <div>
//                                 <p className="text-sm font-bold leading-tight tracking-normal text-left">Orlando Diggs @orlando</p>
//                                 <p className="text-sm font-normal leading-tight tracking-normal text-left">Product Manager, Integrations</p>
//                             </div>
//                         </div>
//                         <input type="checkbox" />
//                     </div>
//                     <div className="flex justify-between m-2 border px-2 py-5 rounded-md">
//                         <div className="flex space-x-1">
//                             <img src="" className="w-8 h-8 rounded-full" />
//                             <div>
//                                 <p className="text-sm font-bold leading-tight tracking-normal text-left">Kate Morrison @kate</p>
//                                 <p className="text-sm font-normal leading-tight tracking-normal text-left">Product Manager, Integrations</p>
//                             </div>
//                         </div>
//                         <input type="checkbox" />
//                     </div>

//                 </div>
//             </div>
//             <div className="flex items-center justify-center m-3">
//                 <Button type="primary" style={{ background: "rgba(24, 144, 255, 1)" }}>Next</Button>
//             </div>
//         </div>
//     );
// };

// export default RequirementForm;

// import React, { Children, useState } from 'react'
// import { DownOutlined, MessageOutlined } from "@ant-design/icons";
// import { Dropdown, Space, Button, Menu, Typography } from 'antd';

// const InsideDropDown = ({ name, }) => {
//     const [visible, setVisible] = useState(false);

//     const items = [
//         { key: '1', label: 'Item 1' },
//         { key: '2', label: 'Item 2' },
//         { key: '3', label: 'Item 3' },
//     ];

//     const handleVisibleChange = (flag) => {
//         setVisible(flag);
//     };

//     const handleButtonClick = () => {
//         // Handle button click action here
//     }
//     return (
//         <Dropdown
//         visible={visible}
//         onVisibleChange={handleVisibleChange}
//         overlay={
//             <Space direction="vertical">
//                 {items.map((item) => (
//                     <Button key={item.key} type="text">
//                         {item.label}
//                     </Button>
//                 ))}
//             </Space>
//         }
//     >
//         <Typography.Link onClick={(e) => e.preventDefault()}>
//             <Space>
//                 {name}
//                 <DownOutlined />
//             </Space>
//         </Typography.Link>
//         {visible && (
//             <Button type="primary" onClick={handleButtonClick}>
//                 Action
//             </Button>
//         )}
//     </Dropdown>

//     )
// }
// const items = [
//     {
//         label: <InsideDropDown name={"UI Designer"} />,
//         key: '0',
//     },
//     {
//         label: <InsideDropDown name={"API Developer"} />,
//         key: '1',
//     },
//     {
//         label: <InsideDropDown name={"Tester"} />,
//         key: '2',
//     },
//     {
//         label: <InsideDropDown name={"UX Designer"} />,
//         key: '3',
//     },
// ];

// const RequirementForm = () => {
//     return (
//         <div>
//             <div className='flex items-center justify-between py-3 px-2' style={{ background: "rgba(230, 247, 255, 1)" }}>
//                 <h1 className='text-base font-bold leading-tight tracking-normal text-left'>Create Usecase Document</h1>
//                 <DownOutlined />
//             </div>
//             <div className='flex items-center justify-between mt-2'>
//                 <Dropdown
//                     menu={{ items, }} trigger={['click']}
//                 >
//                     <button onClick={(e) => e.preventDefault()} className='border py-1 px-2'>
//                         <Space>
//                             Assign
//                             <DownOutlined />
//                         </Space>
//                     </button>
//                 </Dropdown>
//                 <div className='flex items-center space-x-2'>
//                     <MessageOutlined style={{ fontSize: "20px" }} />
//                     <Button type='primary' style={{ background: "rgba(24, 144, 255, 1)" }}>Action</Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RequirementForm
