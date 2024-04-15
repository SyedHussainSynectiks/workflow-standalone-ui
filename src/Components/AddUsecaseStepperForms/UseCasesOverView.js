"use client "
import React, { useEffect, useState } from "react";
import { Tabs, Steps } from "antd";
import {
  BarsOutlined,
  ShoppingOutlined,
  RiseOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import Image from "next/image";
import user from "../../../public/assets/user.png"
import getAccessTokenFromCookie from "@/utils/getAccessToken";
// import { axios } from 'axios';

const UseCasesOverView = () => {
  const [size, setSize] = useState("small");

  const onChange = (e) => {
    setSize(e.target.value);
  };

  const [requireData, setRequireData] = useState();
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId;
  const accessToken = getAccessTokenFromCookie();

  console.log(UsecaseId);
  useEffect(() => {
    const axios = require("axios");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://sux5ckl6l6.execute-api.us-east-1.amazonaws.com/stage/usecase/${UsecaseId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(JSON.stringify(response.data));
        const data = response.data
        console.log(data.usecase.stages)
        setRequireData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [UsecaseId]);

  const mappedSteps = requireData && requireData.usecase
    ? requireData.usecase.stages.map(stage => ({
      title: Object.keys(stage)[0] // Extracting the stage name from the dynamic key
    }))
    : [];
  return (
    <div>
      <div className="flex w-100% ">
        <div className="w-10% h-screen m-2">
          <Steps
            direction="vertical"
            className=" w-[200px] h-[100%] gap-4 p-2 justify-center border bg-white"

          >
            {mappedSteps.map((step, index) => (
              <Steps.Step
                key={index}
                title={step.title}
                status="wait"
              />
            ))}
          </Steps>
        </div>
        <div>
          {requireData && (
            <div className="flex space-x-5 items-center mb-3">
              <div>
                <Image
                height={64}
                width={64} 
                  src={requireData.image ? requireData.image : user}
                  // src={user}
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
                <div class="flex flex-col space-y-4">
                  <div class="flex space-x-3">
                    <p class="text-sm font-medium leading-snug tracking-normal text-left">Assigned date</p>
                    <h3 class="text-base font-normal leading-tight tracking-normal text-left">
                      {requireData.usecase.creation_date}</h3>
                  </div>
                  <div class="flex space-x-3">
                    <p class="text-sm font-medium leading-snug tracking-normal text-left">Planned date</p>
                    <h3 class="text-base font-normal leading-tight tracking-normal text-left">{requireData.usecase.end_date}
                    </h3>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex flex-col space-y-4">
                  <div class="flex space-x-3">
                    <p class="text-sm font-medium leading-snug tracking-normal text-left">Start date</p>
                    <h3 class="text-base font-normal leading-tight tracking-normal text-left">{requireData.usecase.start_date}
                    </h3>
                  </div>
                  <div class="flex space-x-3">
                    <p class="text-sm font-medium leading-snug tracking-normal text-left">Deviation</p>
                    <h3 class="text-base font-normal leading-tight tracking-normal text-left">03days</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="border rounded-md mt-3">
            <Tabs
              defaultActiveKey="1"
              type="card"
              size={size}
              items={new Array(3).fill(null).map((_, i) => {
                const id = String(i + 1);
                if (id == 1) {
                  return {
                    label: `All`,
                    key: id,
                    children: (
                      <div className="flex flex-col pl-3">
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Yahiyaalikhan
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            Created the task about 2 hours ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Yahiyaalikhan
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            assign task to Ghouse about 6 hours ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Ghouse
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            Filled the task about 6 hours ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Ghouse
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            Started the task about 8 hours ago.
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Ghouse
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            completed the task about 12 hours ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <MessageOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <div>
                            <h3 className="text-xs font-normal leading-snug tracking-normal text-left">
                              Ghouse
                            </h3>
                            <p className="text-xs font-normal leading-snug tracking-normal text-left">
                              Commented about 12 hours ago
                            </p>
                          </div>
                        </div>
                        <div className="ml-10 mx-10">
                          <textarea
                            value={
                              "A design system for enterprise-level products. Create an efficient and enjoyable work experience."
                            }
                            className="w-full border p-2 resize-none rounded-sm"
                          ></textarea>
                        </div>
                      </div>
                    ),
                  };
                } else if (id == 2) {
                  return {
                    label: `Detailed log`,
                    key: id,
                    children: (
                      <div className="flex flex-col  ml-5">
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Yahiyaalikhan
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            Created the task about 2 hours ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Yahiyaalikhan
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            assign task to Ghouse about 6 hours ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Ghouse
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            Filled the task about 6 hours ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Ghouse
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            Started the task about 8 hours ago.
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Ghouse
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            completed the task about 12 hours ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Yahiyaalikhan
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            Reviewed the task 24 hours ago
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Yahiyaalikhan
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            sended for approval to
                            <span className="text-base font-normal leading-normal tracking-normal text-left">
                              Akbarkhan
                            </span>
                            On February 21st 2024 at 3:00PM
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 my-3">
                          <RiseOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <h3 className="text-base font-normal leading-normal tracking-normal text-left">
                            Akbarkhan
                          </h3>
                          <p className="text-sm font-normal leading-snug tracking-normal text-left">
                            Approved the design On February 22nd 2024 at 1:00PM
                          </p>
                        </div>
                      </div>
                    ),
                  };
                } else if (id == 3) {
                  return {
                    label: `Comment`,
                    key: id,
                    children: (
                      <div className="flex flex-col m-3">
                        <div className="flex items-center space-x-3 my-3">
                          <MessageOutlined
                            style={{
                              background: "rgba(240, 240, 240, 1)",
                              color: "rgba(24, 144, 255, 1)",
                              padding: "5px",
                              fontSize: "1rem",
                            }}
                            className="rounded-lg"
                          />
                          <div>
                            <h3 className="text-xs font-normal leading-snug tracking-normal text-left">
                              Ghouse
                            </h3>
                            <p className="text-xs font-normal leading-snug tracking-normal text-left">
                              Commented about 12 hours ago
                            </p>
                          </div>
                        </div>
                        <div className="ml-10">
                          <textarea
                            value={
                              "A design system for enterprise-level products. Create an efficient and enjoyable work experience."
                            }
                            className="w-full border p-2 resize-none rounded-sm"
                          ></textarea>
                        </div>
                      </div>
                    ),
                  };
                }
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCasesOverView;
