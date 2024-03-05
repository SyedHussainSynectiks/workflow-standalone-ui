"use client"
import React, { useState, useEffect } from "react";
import { Steps, Tooltip } from "antd";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
// import { UseCase1Comments } from "../useCaseWorkViewDetailsComments/UseCaseComments";
// import { UseCase2Comments } from "../useCaseWorkViewDetailsComments/UseCaseComments";
// import { UseCase3Comments } from "../useCaseWorkViewDetailsComments/UseCaseComments";
// import CustomPopover from "./customPopover";

import Mock from "@/Components/AddUsecaseStepperForms/Mock";
import ActualDevelopmentForm from "@/Components/AddUsecaseStepperForms/ActualDevelopmentForm";
import CICDTestForm from "@/Components/AddUsecaseStepperForms/CI-CD-TestForm";
import StageReleaseForm from "@/Components/AddUsecaseStepperForms/Stage-ReleaseForm";
import PublishandOperateForm from "@/Components/AddUsecaseStepperForms/PublishandOperateForm";
import RequirementForm from "@/Components/AddUsecaseStepperForms/RequirementForm";

// Mock


const Stepper = ({ popoverVisible, setWorkFlowView }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const [requireData, setRequireData] = useState();
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId

  useEffect(() => {
    const axios = require('axios');
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/usecase/${UsecaseId}`,
          {
            headers: {
              'Accept': 'application/json'
            }
          }
        );
        console.log(response.data);
        setRequireData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData()
  }, [UsecaseId]);

  const handleContentChange = () => {
    switch (currentStep) {
      case 0:
        return <RequirementForm />;
      case 1:
        return <Mock />;
      case 2:
        return <ActualDevelopmentForm />;
      case 3:
        return <CICDTestForm />;
      case 4:
        return <StageReleaseForm />;
      case 5:
        return <PublishandOperateForm />;
      default:
        return null;
    }
  };


  const mappedSteps = requireData && requireData.usecase
    ? requireData.usecase.stages.map(stage => ({
      title: Object.keys(stage)[0] // Extracting the stage name from the dynamic key
    }))
    : [];


  return (
    <>
      <div className=" bg-white px-4 py-4 ">
        <h1 className="flex w-[100%] h-7 flex-col justify-center text-black  text-2xl non-italic font-semibold leading-snug">
          Procurement (Development workflow)
        </h1>
        <p>Form pages are used to collect or verify information to users, and basic forms are common in scenarios where there are fewer data items.</p>
      </div>
      <div className="flex w-100% ">

        <div className="w-20% h-full ml-4 mt-4">
          <Steps
            current={currentStep}
            onChange={handleStepClick}
            direction="vertical"
            className="bg-white w-[250px] h-[100%] gap-4 p-5 justify-center"
          >
            {mappedSteps.map((step, index) => (
              <Steps.Step
                key={index}
                title={step.title}
                icon={index < currentStep ? <TiTick size={24} fontWeight={1} /> : null}
              />
            ))}
          </Steps>
        </div>




        <div className="my-[5rem] w-100% ml-6 p-8 mt-4 bg-white">{handleContentChange()}</div>
      </div>



    </>
  );
};

export default Stepper;
