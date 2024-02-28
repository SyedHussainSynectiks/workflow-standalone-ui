"use client";
import api from "@/api";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Page() {
  const [usecases, setUsecases] = useState([]);
  const [stages, setStages] = useState([]);
  const setprojectIds = useSelector((state) => state.addResources);
  const projectId = setprojectIds.id[0].prjectId;
  const setWorkFlowIds = useSelector((state) => state.addResources);
  const workFlowId = setWorkFlowIds.id[0].workFlowId;
console.log(projectId)
console.log(workFlowId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/usecase",
          {
            params: {
              project_id: `${projectId}`,
              workflow_id: `${workFlowId}`,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        setUsecases(data.usecases);
        setStages(data.stages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <main className="h-full  w-full">
        <div className="ProcurWrongFlex">
          <div className="ProcurWrkFlwTxt">Procurement workflow</div>
        </div>
        <section className="TopBarMainSectionFlex">
          <p className="UseCasesTxt">UseCases</p>
          <div className="BtnSearchFlexLeft">
            <div className="SearchTxtSearchBarFlex">
              <input
                className="SearchTxt ml-2 border border-neutral-500"
                type="text"
                placeholder="Search text"
              />
              <span>
                <button className="UseCaseBtnClr">
                  {/* <Image src={Search} alt="#" /> */}
                </button>
              </span>
            </div>
            <button className="ResoucesViewBtn">Action</button>
          </div>
        </section>
        <section className="flex h-full flex-row justify-start gap-3 p-3 overflow-x-scroll items-start">
          {stages.map((stage, index) => {
            const stageUsecases = usecases.filter(
              (usecase) => usecase.current_stage === stage
            );
            console.log(stageUsecases);
            return (
              <div
                key={index}
                className="bg-white w-64 flex flex-col px-3 py-3 items-center justify-center"
              >
                <div className="pb-3  flex flex-row  justify-center">
                  <p className="RequirementText">{stage}</p>
                </div>
                {stageUsecases.length > 0 ? (
                  <div className="w-[100%]">
                    {stageUsecases.map((usecase, index) => ( //assignee_id
                    <Link href="/main/projects/usecaseFormStepper">
                      <div
                        key={index}
                        className=" w-[100%] rounded-lg p-3 leading-4 gap-3"

                      >
                        <p className="UseCaseTxt">{usecase.usecase_name}</p>
                        <div className="flex flex-row justify-start items-center w-[100%] gap-2">
                          <div className="w-[100%]">
                            <div className="flex flex-row justify-between">
                              <p className="AssignedColTxtUsecaseComp">
                                Assigned to
                              </p>
                              <p className="NameProfileColUsecaseComp ">
                                {usecase.assignee_name}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <p className="AssignedColTxtUsecaseComp">
                                No. of Resources:
                              </p>
                              <p className="NameProfileColUsecaseComp">
                                {usecase.total_resources}
                              </p>
                            </div>
                            <div className="flex">
                              <p className="AssignedColTxtUsecaseComp">
                                Dates:
                              </p>
                              <p className="NameProfileColUsecaseCompDate">
                                {usecase.end_date}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
