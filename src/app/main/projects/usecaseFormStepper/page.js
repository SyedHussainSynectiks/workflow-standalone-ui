"use client";
import React, { useState, useEffect } from "react";
import { Steps, Tooltip } from "antd";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";

import SubStagesStepper from "./SubStagesStepper";
import UseCasesOverView from "@/Components/AddUsecaseStepperForms/UseCasesOverView";
import Planning from "@/Components/AddUsecaseStepperForms/Planning";

import { Tabs } from "antd";



const Stepper = () => {
//   const [currentStep, setCurrentStep] = useState(0);

// const [stepperState , setstepperState] = useState( );
//   const [requireData, setRequireData] = useState();
//   const setUsecaseId = useSelector((state) => state.addUsecase);
//   const UsecaseId = setUsecaseId.useCaseId;

//   useEffect(() => {
//     const axios = require("axios");
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/usecase/${UsecaseId}`,
//           {
//             headers: {
//               Accept: "application/json",
//             },
//           }
//         );
//         console.log(response.data);
//         setRequireData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [UsecaseId]);

//   const handleStepClick = ( title,stepIndex ) => {
//     setCurrentStep(stepIndex);
//     console.log(title)
//     setstepperState(title)
//     console.log("stapper state", title)
//     // for(let i = 0 ; i===title;i++){
//     //   console.log(mappedSteps[i].title)
//     //   setstepperState(mappedSteps[i].title)
//     // }
//     // const currentStepTitle = mappedSteps[stepIndex]?.title;
//     // console.log(currentStepTitle)
//     // setstepperState(currentStepTitle);
//   };
//   const handleContentChange = () => {
//     switch (currentStep) {
//       case 0:
//         return <RequirementForm />;
//       case 1:
//         return <RequirementForm />;
//       case 2:
//         return <ActualDevelopmentForm />;
//       case 3:
//         return <CICDTestForm />;
//       case 4:
//         return <StageReleaseForm />;
//       case 5:
//         return <PublishandOperateForm />;
//       default:
//         return null;
//     }
//   };

//   const mappedSteps =
//     requireData && requireData.usecase
//       ? requireData.usecase.stages.map((stage) => ({
//           title: Object.keys(stage)[0] // Extracting the stage name from the dynamic key
//         }
//         ))
       
//       : [];
 

  // const Contentdata = () => {
  //   return (
  //     <div className="flex w-100% ">
  //       <div className="w-10% h-screen">
  //         <Steps
  //           current={currentStep}
  //           onChange={handleStepClick}
  //           direction="vertical"
  //           className="w-[200px] h-[100%] gap-4 p-2 justify-center border bg-white"
  //         >
  //           {mappedSteps.map((step, index) => (
  //             <Steps.Step
  //               key={index}
  //               title={step.title}
  //               onClick={() => handleStepClick(step.title, index)}
  //               icon={
  //                 index < currentStep ? (
  //                   <TiTick size={24} fontWeight={1} />
  //                 ) : null
  //               }
  //             />
  //           ))}
  //         </Steps>
  //       </div>
  //       <div className="my-[5rem] w-screen  p-8 mt-2">
  //         {handleContentChange()}
  //       </div>
  //     </div>
  //   );
  // };

  const items = [
    {
      key: "1",
      label: "Overview",
      children: <UseCasesOverView />,
    },
    {
      key: "2",
      label: "Workflow View",
      children: <SubStagesStepper />,
    },
    {
      key: "3",
      label: "Asset view",
      children: "" ,
    },
    {
      key: "4",
      label: "Planning",
      children: <Planning/>,
    },
  ];

  return (
    <>
      <div className=" px-2 ">
        <div className=" bg-white p-4">
          <h1 className="flex w-[100%] bg-white  h-7 flex-col justify-center text-black  text-2xl non-italic font-semibold leading-snug">
            Procurement (Development workflow)
          </h1>
          <p>
            Form pages are used to collect or verify information to users, and
            basic forms are common in scenarios where there are fewer data
            items.
          </p>

          <div className="mt-3   ">
            <Tabs defaultActiveKey="1" items={items}  />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stepper;
