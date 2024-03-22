"use client";
import React, { useEffect, useState, useRef } from "react";
import { Form, Input, Modal, Tabs, Upload, notification } from "antd";
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
import Item from "antd/es/list/Item";
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
        console.log(response.data);

        console.log(JSON.stringify(response.data.stages));
        // setRequireData(response.data);
        const stages = response.data.stages;
        console.log(stages);
        const propsValue = Object.values(stepperState)[0];
        // const creationDate = new Date(requireData.usecase.creation_date);
        // const formattedDate = creationDate.toISOString().slice(0, 10); // YYYY-MM-DD format
        // setformatedDate(formattedDate);
        const stage = stages.filter(
          (obj) => Object.values(stepperState)[0] in obj
        );
        const tasks = stage[0][propsValue].tasks;
        const Docs = tasks.docs;
        console.log(tasks);
        console.log(Docs);
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
        visible={visible}
        onVisibleChange={handleVisibleChange}
        overlay={
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

  //////////---------------- Doc upload starts here
  const [image, setimage] = useState([]);
  const [fileuploaded, setfileuploaded] = useState(false);
  const [convertedImages, setConvertedImages] = useState([]);
  const [convertedImagesString, setconvertedImagesString] = useState("");
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
  let accesstoken =
    "eyJraWQiOiJ0WExXYzd1ZGhyaVwvVEhLYldwK3F2bEw4SGtJTXQwZVBhUmlzQXhCd0lwRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjNGI4YjRhOC05MDExLTcwMmUtOTY2ZC1lZDQ3NmUzODY5ZDciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfSlA1QjRXWGJIIiwiY3VzdG9tOnVzZXJfaWQiOiI2NDY4ZjIzNi02NmM4LTRlMjItYWVlYS0xMDA0YjE0YzVjMjkiLCJjdXN0b206b3JnX2lkIjoiYjk0YTU2NGQtODlmNy00NmQxLWJkNDEtYzZmNzQwMzQ5N2JjIiwiY29nbml0bzp1c2VybmFtZSI6ImM0YjhiNGE4LTkwMTEtNzAyZS05NjZkLWVkNDc2ZTM4NjlkNyIsIm9yaWdpbl9qdGkiOiIwYzg0NzM0OS03YzY0LTQwMDQtOTQ3MC0xOGY1NGEwMmI3OWYiLCJhdWQiOiI3OXFhMDR1bXY1bzFoc2tvajVmcXRkMnM4cCIsImV2ZW50X2lkIjoiZDY1NjJmNmYtZmQyMC00NGFmLWFjNmQtZWZkMzg4ZWRmZjQ4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3MTA5ODg4MDAsImV4cCI6MTcxMTA3NTIwMCwiY3VzdG9tOnJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMDk4ODgwMCwianRpIjoiYWQxMWFiNGQtZDJmZS00MWI0LThmOGQtZjVmZGUwNjViNmMxIiwiZW1haWwiOiJpdHphbHRhZmh1c2FpbkBnbWFpbC5jb20ifQ.pztB9zhnz4rql7dXshoz0_l-q52mn7yJr6wI8KBvjBVGE1Ab2ZMyqLUoTxKS8YE8kb_9-Rsf1qKk6tNTHOMVEFsizPgQA1KgxGspuVFRjzAFz8K4xoL3z8XT7aT3XHpF5CTv3jQjhw1Vpvea63FCAx-5VG_xw-EkEzpKLzhNhYGfZAJzvQd1EE7AhUDIJCp6NCX0oAVDsfv1fPihJyWVjvoFOZumR9fTNfchlzIoquLLMey5wnNovKBT-jSBGjFUh9nZKJmTugZYKana4YO3VxhCgPaawZg-PpU36HWe0nK7OjBJq7TVjW4natfR-q9_YJrLLgLfsz-sE1vDcs9o2w";
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
        setconvertedImagesString(response.data.link);
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
  console.log(convertedImagesString);

  /////////--------------  Doc upload ends

  //////---------------Doc Link



  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [linkUpload, setlinkUpload] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  


  const inputName = (e) => {
    setName(e.target.value);
  };

  const inputLink = (e) => {
    setLink(e.target.value);
  };

 
  const handleSubmit = async () => {
    if (!link) {
      console.log('No link provided');
      return;
    }

    try {
      
      // Fetch the image from the provided URL
      const response = await fetch(link);
      const response1 = response.url
      console.log(response1)
      console.log(response)
      const blob = await response.blob();

      // Convert the blob to base64
      const base64 = await blobToBase64(blob);

      // Prepare data to send to API

      const newAttachments = [];
      const request = {
        // name: name,
        fileName:name,
        data: base64
      };

      // Send data to API
      const apiResponse = await axios.post('https://i3mdnxvgrf.execute-api.us-east-1.amazonaws.com/dev/docUpload',
      request,
      {
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json',
          Authorization: "Bearer eyJraWQiOiJ0WExXYzd1ZGhyaVwvVEhLYldwK3F2bEw4SGtJTXQwZVBhUmlzQXhCd0lwRT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNGE4MDQ5OC1hMDAxLTcwMmQtOWY5Ni00NzMwZWVmMDNhZWUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfSlA1QjRXWGJIIiwiY3VzdG9tOnVzZXJfaWQiOiJkOTI5NGQ3OS0zOGEwLTQ2MTgtYTFiNi03ODE2M2Y0Y2U5ZjciLCJjdXN0b206b3JnX2lkIjoiZjFlNzNkMTktMmMzZi00MjVmLWI4ZTQtZmIzMWNiN2JkMDcxIiwiY29nbml0bzp1c2VybmFtZSI6IjE0YTgwNDk4LWEwMDEtNzAyZC05Zjk2LTQ3MzBlZWYwM2FlZSIsImN1c3RvbTpwYXNzd29yZCI6IlFAMTIzNDUiLCJvcmlnaW5fanRpIjoiOTRiMjAwNjgtMDRiZC00NzUwLTkzY2EtMjlkMzM4ODZjYjMxIiwiYXVkIjoiNzlxYTA0dW12NW8xaHNrb2o1ZnF0ZDJzOHAiLCJldmVudF9pZCI6ImZjZmQ5NWE1LTlmN2YtNDIzOS04MTViLTI3NWQwNjYyMGE5ZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzEwODMwMTE2LCJleHAiOjE3MTA5MTY1MTYsImN1c3RvbTpyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTA4MzAxMTYsImp0aSI6Ijk2MzFlZDcwLTBmZGUtNGQ4NC05ZTE2LThjZDFiYmQ5NDliOCIsImVtYWlsIjoibW9oYW1tZWQ4MTQyM25hZGVlbUBnbWFpbC5jb20ifQ.4X1q2WvyjWkTHhtNxg331DwKstIlzdTac8d6fUBmxy3FIpflQsF4o8NUjZ--2CNS0FqCal4TKxqY46Dj8qbzr1DcXQXhB755gTxXYAmJ-LHHtv-FzLtjp6JBbRZG2ortP2dVP2obeDq0Cxw6doVq35ElBVjDXIXV18L6zD64E8lBhzb_FJHIINCbwh9OjMMdz8s85kqmdqzFdEYRbQKKWMjoOuSuoOhJvYXJpo4lwra4AcqNMdICkBQSeF8mRAe9A37oJRltZlZ5cT29E3PrO1tZqAlUIUhOfnnyW6l2gZUjWl7w25um6vf1c0y-IMwxjZtTJHf8sl68Ns5YXvTbOg"
        }}  );
   

     

      
      // Handle API response
      console.log(apiResponse.data);

      newAttachments.push(apiResponse.data.link);
      setAttachments([...Attachments, ...newAttachments]);
      setConvertedImages([]); // Reset convertedImages after upload
      setUploadingFiles([]); // Clear uploading files after upload

    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  // Function to convert Blob to base64
  // const blobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result.split(',')[1]);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // };




  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
      //   if (reader.result) {
          resolve(reader.result);
      //   } else {
      //     reject(new Error('Error reading Blob'));
      //   }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  




  //////---------------Doc Link End



  const [DocumentAssign, setDocumentAssign] = useState({
    doc_name: "",
  });

  const handleChange = (e) => {
    // Update the project state as the user types
    setDocumentAssign({ ...DocumentAssign, [e.target.name]: e.target.value });
    console.log(DocumentAssign);
  };
  //------------Docs Post
  const UploadingDoc = () => {
    const currentTask = requiretasks.at(AssignIndex);
    // console.log("Docs", currentTask)
    (currentTask.docs[0] = {
      doc_name: DocumentAssign.doc_name,
      doc_url: convertedImagesString,
    }),
      console.log("Docs", currentTask);
    // handleAssignButtonClick(AssignResourseId);
    HandleUploadingDoc(), handleCancel();
  };

  const HandleUploadingDoc = async () => {
    let data = JSON.stringify({
      doc_name: DocumentAssign.doc_name,
      doc_url: convertedImagesString,
    });
    console.log("request :", data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/task/${TaskId}/doc`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const axios = require('axios');

  ///------------Docs Post

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
  const [AssignDocs, setAssignDocs] = useState();
  const [AssignImg, setAssignImg] = useState();
  const [AssignResourseId, setAssignResurseId] = useState();
  const [TaskId, setTaskId] = useState();
  const [AssigneeImg, setAssigneeImg] = useState(null);
  // console.log(AssignName, AssignIndex);
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
    setIsModalOpen(false);
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

  // const handleSelectedResourse = (index, resource_id, name, image_url) => {
  //   console.log("passing values", index, resource_id);
  //   const UpdatedTask = {
  //     assigne_index: index,
  //     assigneId: resource_id,
  //     assigneName: name,
  //     assigne_image: image_url,
  //   };
  //   setSelectedAssignee(UpdatedTask);
  // };
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
    (currentTask.assigned_to.Id = AssignResourseId),
      (currentTask.assigned_to.name = AssignName),
      (currentTask.assigned_to.image = AssignImg);
    handleAssignButtonClick(AssignResourseId);
  };

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
                        className="bg-white border text-black p-2 rounded-md flex items-center gap-1 "
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
                          {data.docs &&
                            data.docs.length > 0 &&
                            data.docs.map((doc, index) => (
                              <Image
                                key={index}
                                src={doc.doc_url}
                                alt={doc.doc_name}
                                height={34}
                                width={30}
                              />
                            ))}

                          {/* {AssignDocs === data.id && ( */}
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
                                          <button
                                            key={inx}
                                            onClick={() =>
                                              handleSubItemClick(
                                                itemIndex === selectedSubItem
                                                  ? null
                                                  : itemIndex
                                              )
                                            }
                                            className="font-semibold"
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
                                                          className="py-1 w-[100%]"
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
                                                            // handleSelectedResourse(
                                                            //   item.resource_id
                                                            // );

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
                            setAssignDocs(data.id);
                            handleTaskId(data.id);

                            console.log("selected TaskId", data.id);
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
                              <li onClick={showModal}>
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
                          <Form.Item
                            className="flex items-center ml-4 mt-2 "
                            name={["doc_name"]}
                            label="Enter Document Name"
                            rules={[
                              {
                                message: "Please input the Document Name!",
                              },
                            ]}
                          >
                            <Input
                              name="doc_name"
                              id="DocsName"
                              value={DocumentAssign.doc_name}
                              className="h-6"
                              onChange={handleChange}
                            />
                          </Form.Item>
                          <Button
                            className="mt-1"
                            onClick={() => {
                              UploadingDoc();
                            }}
                          >
                            Upload
                          </Button>
                        </Modal>

                        <Modal title="Document Upload" open={isModalOpen} onOk={()=>{handleOk(), handleSubmit()}} onCancel={handleCancel}>

                              <div className="flex flex-col gap-4">

                                <input onChange={(e)=>{inputName(e)}}  className="p-2 border rounded " placeholder="Enter Name"></input>
                                <div className="flex w-full ">
                                 <button className="mr-2 border rounded p-2">https://</button>
                                <input onChange={(e)=>{inputLink(e)}} className="p-2 border rounded  w-full" placeholder="Paste link here "  ></input>
                                  </div>
                              </div>

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
              <div className="px-4 py-2 flex items-center gap-2 " key={index}>
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
