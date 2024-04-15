"use client";
import { Form, Input, Upload, Button, message, DatePicker, notification, Select, Breadcrumb } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router';
import moment from "moment";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
    labelCol: {
      span: 8,
      style: {
        fontsize: "medium", // Darken the label color
      },
    },
    wrapperCol: {
      span: 16,
    },
  },
  wrapperCol: {
    span: 16,
  },
};

const newform = () => {
  const [assignees, setAssignees] = useState([]);
  const [loading, setLoading] = useState(true);
  const setprojectIds = useSelector((state) => state.addResources);
  const projectId = setprojectIds.id[0].prjectId;
  const setWorkFlowIds = useSelector((state) => state.addResources);
  const workFlowId = setWorkFlowIds.id[0].workFlowId;
  const [api, contextHolder] = notification.useNotification();
  const projectName = useSelector((state) => state.addProject.ProjectName);

  const openNotification = (placement, type, message) => {
    api[type]({
      message: message,
      placement: placement,
    });
  };

  const router = useRouter();

  const [project, setProject] = useState({
    usecase_name: "",
    assigned_to_id: "",
    description: "",
    start_date: null,
    end_date: null,
    workflow_id: `${workFlowId}`,
    project_id: `${projectId}`,
    created_by_id: "5b5e750a-3244-402d-b7cb-50f035badf51",
  });
  console.log(project);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };
  const [startDate, setStartDate] = useState(null);


  const disabledEndDate = (current) => {
    // Disable dates that are before the selected start date or are the selected start date
    return current && (current <= startDate);
  };

  const handleAssigneChange = (value, name,) => {
    // const { name, value } = e.target;
    setProject({ ...project, [value]: name });
    // dispatch(setSelectedAssignee(value));
  };

  const handleStartDateChange = (date, dateString) => {
    setStartDate(date);
    setProject({
      ...project,
      start_date: moment(dateString).format("YYYY-MM-DD"),
    });
  };

  const handleEndDateChange = (date, dateString) => {
    setProject({
      ...project,
      end_date: moment(dateString).format("YYYY-MM-DD"),
    });
  };
  const accessToken = getAccessTokenFromCookie();
  const axios = require("axios");
  const handleSubmit = async () => {
    let data = JSON.stringify({
      project_id: `${project.project_id}`,
      created_by_id: `${project.created_by_id}`,
      usecase_name: `${project.usecase_name}`,
      assigned_to_id: `${project.assigned_to_id}`,
      // assigned_to_id: ,
      description: `${project.description}`,
      workflow_id: `${project.workflow_id}`,
      start_date: `${project.start_date}`,
      end_date: `${project.end_date}`,
    });
    console.log("data:", data);
    console.log("data:", data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://sux5ckl6l6.execute-api.us-east-1.amazonaws.com/stage/usecase",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        openNotification("topRight", "success", "UseCase saved successfully!");
        router.push("/main/projects/developmentUsecases")
      })
      .catch((error) => {
        console.log(error);
        openNotification("topRight", "error", "Fill the Form Correctly.");
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sux5ckl6l6.execute-api.us-east-1.amazonaws.com/stage/project/${projectId}/team`,{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = response.data;
        console.log("responsedata ", responseData);
        console.log(JSON.stringify(responseData));
        const data = response.data;
        console.log("REsourcesData", data)
        console.log(data.map((obj) => obj.ProductManagerId));
        const mapResourses = (data.map((obj) => obj.ProductManagerId));

        const values = mapResourses.flatMap((ProductManagerId) => ProductManagerId);
        console.log("Values:", values);
        setAssignees(values.filter((obj) => obj !== undefined));
        // setRoles(data.map((obj) => Object.keys(obj)));
        // setTeamData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  function disabledDate(current) {
    // Disable all dates before today
    return current && current < moment().startOf('day');
  }

  return (
    <div className="">
      <div className="flex w-[100%] flex-col items-start gap-5">
        <div className=" bg-white px-2 py-2 w-[100%] ">
          <Breadcrumb
            className="bg-white p-2 mb-3"
            items={[
              {
                title: <a href="/main"> Home</a>
              },
              {
                title: <a href="/main/projects">Projects Overview</a>,
              },
              {
                title: "Use Cases",
              },
            ]}
          />
          <h1 className="flex w-[100%] h-7 flex-col justify-center text-black  text-2xl non-italic font-semibold leading-snug">
            {projectName}(Development workflow)
          </h1>
          <p>
            Form pages are used to collect or verify information to users, and
            basic forms are common in scenarios where there are fewer data
            items.
          </p>
        </div>
      </div>

      <section className="flex flex-col items-center flex-shrink-0 mt-4 mx-auto  w-auto py-1 h-screen bg-white">
        <h1 className="text-black text-2xl font-semibold leading-normal  px-4 py-4 w-[100%] flex items-center">
          Basic Details
        </h1>
        <Form className="flex flex-col"
          {...layout}
          name="nest-messages"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name={["UsecaseName"]}
            label="Usecase Name :"
            rules={[
              {
                message: "Please input the project name!",
              },
            ]}
          >
            <Input
              value={project.usecase_name}
              name={["usecase_name"]}
              label="Usecase Name :"
              id="projectName"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name={["AssignTo"]}
            label="Assign To :"
            rules={[
              {
                message: "Please input the project description!",
              },
            ]}
          >
            <Select
              placeholder="Select assignee"
              loading={loading}
              onChange={(value, name, resource_id) => {
                handleAssigneChange("assigned_to_id", value, name);
                console.log(resource_id)
              }}
            >
              {assignees.map((assignee, index) => (
                // console.log("Assigne Data", assignee),
                <Option key={index} value={assignee.resource_id}>{assignee.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name={["UsecaseDescription"]}
            label="Usecase Description :"
            rules={[
              {
                message: "Please input the project department!",
              },
            ]}
          >
            <Input
              name="description"
              id="description"
              value={project.description}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item name="range-time-picker" label="Project Duration">
            <div className="flex">
              <DatePicker
                id="projectStartDate"
                placeholder="Start Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200  px-1 py-1 h-8 w-[184px] m-1"
                onChange={handleStartDateChange}
                disabledDate={disabledDate}
              // value={project.startDate}
              />
              <span>-</span>
              <DatePicker
                id="projectEndDate"
                placeholder="End Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200shadow px-1 py-1 h-8 w-[184px] m-1"
                // onChange={(date, dateString) =>
                //   setProject({
                //     ...project,
                //     endDate: moment(dateString).format(
                //       "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
                //     ),
                //   })
                // }
                // value={project.endDate}
                disabledDate={disabledDate}
                onChange={handleEndDateChange}
              />
            </div>
          </Form.Item>

          {/* <Button
            type="submit"
            className="ml-[90%] m-10 px-2 py-1 justify-center items-center rounded-sm border border-blue-500 bg-blue-500 shadow-sm h-8 font-sans text-center text-white text-sm font-normal not-italic leading-3 flex-row-reverse"
            onClick={handleSubmit}
          >
            Submit
          </Button> */}

          <Button type="primary" className="bg-blue-500 "
            style={{
              width: '150px',
              marginLeft: '50%'
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Next
          </Button>
          {contextHolder}
        </Form>
      </section>

      {/* //Workflow Head section */}
    </div>
  );
};

export default newform;
