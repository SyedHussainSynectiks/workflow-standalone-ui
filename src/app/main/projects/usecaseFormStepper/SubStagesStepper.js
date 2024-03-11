'use client'

import React, { useState, useEffect } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import RequirementForm from "@/Components/AddUsecaseStepperForms/RequirementForm";
import { addStagesName } from "@/Context/useCaseSlice/useCaseSlice";

const SubStagesStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepperState, setStepperState] = useState("");
  const [complete, setComplete] = useState(false);
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId;
  const [requireData, setRequireData] = useState();
  const [activeStepTitle, setActiveStepTitle] = useState("");

  useEffect(() => {
    const axios = require("axios");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/usecase/${UsecaseId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        console.log(response.data);
        setRequireData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [UsecaseId]);

  useEffect(() => {
    // Automatically set the first step as active when component mounts
    if (requireData && requireData.usecase && requireData.usecase.stages.length > 0) {
      const firstStepTitle = Object.keys(requireData.usecase.stages[0])[0];
      setActiveStepTitle(firstStepTitle);
    }
  }, [requireData]);

  useEffect(() => {
    // Set stepperState to the title of the first step when requireData is loaded
    if (requireData && requireData.usecase && requireData.usecase.stages.length > 0) {
      const firstStepTitle = Object.keys(requireData.usecase.stages[0])[0];
      setStepperState(firstStepTitle);
    }
  }, [requireData]);

  const mappedSteps =
    requireData && requireData.usecase
      ? requireData.usecase.stages.map((stage) => ({
          title: Object.keys(stage)[0], // Extracting the stage name from the dynamic key
        }))
      : [];

  const handleStepClick = (stepIndex, title) => {
    setCurrentStep(stepIndex + 1);
    setActiveStepTitle(title);
    setStepperState(title);
    console.log(title);
  };

  const dispatch = useDispatch();
  console.log("maap step", mappedSteps);

  return (
    <>
      <div className="flex gap-2">
        <div className="flex flex-col py-6  w-[auto] px-4 gap-y-[7rem] ">
          {mappedSteps?.map((step, i) => (
            console.log(step.title),
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${
                i + 1 < currentStep || complete ? "complete" : ""
              } `}
              onClick={() => handleStepClick(i, step.title)}
            >
              <div className="step cursor-pointer">
                {i + 1 < currentStep || complete ? i+1 : i + 1}
              </div>
              <p className="text-gray-500 ml-2 whitespace-pre-wrap cursor-pointer ">{step.title}</p>
            </div>
          ))}
        </div>
        <div className="bg-white w-[100%]">
        <RequirementForm  stepperState={stepperState} />
        </div>
      </div>
    </>
  );
};

export default SubStagesStepper;
