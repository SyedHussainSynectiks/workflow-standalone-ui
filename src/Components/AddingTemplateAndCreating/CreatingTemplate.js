"use client";

// export default page;
import React, { useState } from "react";
import { Input, Button, notification } from "antd";
import Link from "next/link";
import {
  DeleteFilled,
  SaveOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import api from "@/api/index"
import getAccessTokenFromCookie from "@/utils/getAccessToken";

const CreatingTemplate = () => {
  const [workFlowName, setWorkFlowName] = useState("");
  const [stages, setStages] = useState([]);
  const setprojectIds = useSelector((state) => state.addResources);
  const ProjectId = setprojectIds.id[0].prjectId;
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, type, message) => {
    notification[type]({
      message: message,
      placement: placement,
    });
  };

  const router = useRouter();
  console.log(ProjectId);
  const accessToken = getAccessTokenFromCookie();
  const postWorkflow = async () => {
    const axios = require("axios");
    let data = JSON.stringify({
      "name": `${workFlowName}`,
      "created_by_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "project_id": `${ProjectId}`,
      "stages": stages.map((stage) => ({
        "name": stage.stageName,
        "tasks": stage.subStages,
        "checklist": stage.checklist,
      })),
    });
    console.log(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://sux5ckl6l6.execute-api.us-east-1.amazonaws.com/stage/workflow",
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
        console.log("success:", response);
        openNotification("topRight", "success", "UseCase saved successfully!");

        router.push("/main/projects/workflowlist");
      })
      .catch((error) => {
        const seterror = { error }
        console.log(seterror)
        const errorStatus = error.response.data.message
        console.log(errorStatus)
        openNotification("topRight", "error", ` ${errorStatus}`);
        console.log(error);
      });
  };

  const handleAddStage = () => {
    setStages([
      ...stages,
      {
        stageName: "",
        subStages: [],
        checklist: [],
      },
    ]);

  };

  const handleStageNameChange = (index, value) => {
    const updatedStages = [...stages];
    updatedStages[index].stageName = value;
    setStages(updatedStages);
  };

  const handleAddSubstage = (index) => {
    const updatedStages = [...stages];
    updatedStages[index].subStages.push("");
    setStages(updatedStages);
  };

  const handleAddChecklist = (index) => {
    const updatedStages = [...stages];
    updatedStages[index].checklist.push("");
    setStages(updatedStages);
  };

  return (
    <div className="border rounded border-t-[2rem] border-[#F5F5F5]">
      <div className="flex justify-between p-4 items-center bg-white">
        <Input
          placeholder="WorkFlow Usecases"
          className="w-1/2"
          onChange={(e) => setWorkFlowName(e.target.value)}
        />
        <Button
          icon={<SaveOutlined />}
          type="primary"
          className="bg-blue-500"
          onClick={handleAddStage}
        >
          Add Stage
        </Button>
      </div>

      {stages.map((stage, index) => (
        <div key={index} className="py-2 px-4 mt-2 flex flex-col space-y-2">
          <h3 className="text-base font-medium leading-normal tracking-normal text-left">
            Add Stage
          </h3>
          <div className="bg-white p-4 flex items-center justify-between">
            <h4 className="text-sm font-normal leading-snug tracking-normal">
              Stage Name :
            </h4>
            <Input
              placeholder="Requirement"
              className="w-1/2"
              value={stage.stageName}
              onChange={(e) => handleStageNameChange(index, e.target.value)}
            />
            <DeleteFilled
              style={{ color: "red" }}
              onClick={() => {
                const updatedStages = stages.filter((_, i) => i !== index);
                setStages(updatedStages);
              }}
            />

            <Button
              type="primary"
              className="bg-blue-500"
              onClick={() => {
                handleAddChecklist(index);
              }}
            >
              Add Checklist
            </Button>
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={() => handleAddSubstage(index)}
            >
              Add Sub Stages
            </Button>

          </div>

          <div>
            {/* Render Substages */}
            {stage.subStages.map((subStage, subIndex) => (
              <div
                key={subIndex}
                className="bg-white p-4 flex items-center justify-between my-1 ml-10"
              >
                <h4 className="text-sm font-normal leading-snug tracking-normal">
                  Sub Stage Name :
                </h4>
                <Input
                  placeholder="Substage"
                  className="w-1/2"
                  value={subStage}
                  onChange={(e) => {
                    // if(subStage.length === 0){
                    // }
                    const newSubStageValue = e.target.value;
                    const updatedStages = [...stages];

                    // Check if the new value is unique within the same stage
                    const isUnique = !updatedStages[index].subStages.includes(newSubStageValue);

                    if (isUnique) {
                      updatedStages[index].subStages[subIndex] = newSubStageValue;
                      setStages(updatedStages);
                    } else {
                      setStages(updatedStages);
                      updatedStages[index].subStages[subIndex] = newSubStageValue;
                      console.error("Substage value must be unique within the same stage.");
                      openNotification("topRight", "error", "Sub Stages value should be different")
                    }
                  }}
                />
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    const updatedStages = [...stages];
                    updatedStages[index].subStages.splice(subIndex, 1); // Remove the sub-stage at subIndex
                    setStages(updatedStages);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div>
            {/* Render Checklists */}
            {stage.checklist.map((checklist, checklistIndex) => (
              <div
                key={checklistIndex}
                className="bg-white p-4 flex items-center justify-between my-1 ml-10"
              >
                <h4 className="text-sm font-normal leading-snug tracking-normal">
                  Checklist :
                </h4>
                <Input
                  placeholder="Checklist Item"
                  className="w-1/2"
                  value={checklist}
                  // onChange={(e) => {
                  //   const updatedStages = [...stages];
                  //   updatedStages[index].checklist[checklistIndex] =
                  //     e.target.value;
                  //   setStages(updatedStages);
                  // }}
                  onChange={(e) => {
                    const newChecklistValue = e.target.value;
                    const updatedChecklist = [...stages]
                    const isUniqueValue = !updatedChecklist[index].checklist.includes(newChecklistValue)

                    if (isUniqueValue) {
                      updatedChecklist[index].checklist[checklistIndex] = newChecklistValue;
                      setStages(updatedChecklist);
                    } else {
                      setStages(updatedChecklist);
                      updatedChecklist[index].checklist[checklistIndex] = newChecklistValue;
                      console.error("Checklist value must be unique within the same stage.");
                      openNotification("topRight", "error", "Checklist value should be different")
                    }
                  }}
                />
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    const updatedStages = [...stages];
                    updatedStages[index].checklist.splice(checklistIndex, 1); // Remove the checklist item at checklistIndex
                    setStages(updatedStages);
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-6 mb-5 w-[100%]">
        {/* <Link href="/main/projects/workflowlist"> */}
        <Button type='primary' className="bg-blue-500 text-white" onClick={postWorkflow} >
          Save
        </Button>
        {contextHolder}
        {/* </Link> */}
      </div>
    </div>
  );
};

export default CreatingTemplate;