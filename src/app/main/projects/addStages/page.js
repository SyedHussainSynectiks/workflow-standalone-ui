"use client";

import Image from "next/image";
import AddStages from "../../../../../public/assets/createWorkflow.svg";
import { HiPlusCircle } from "react-icons/hi2";
import { MdCancel } from "react-icons/md";
import react from "react";
import { Input } from "antd";

export default function page() {
  return (
    <>
      <div className="w-[100] ">
         <div className="flex items-center justify-between">
         <h1 className="text-3xl mb-2 font-semibold">Workflow Management</h1>
        <MdCancel className="text-3xl text-blue-400"  />
         </div>
        <div className="flex  w-[100%]  bg-white ">
          <div className="p-10 w-[50%] mt-40 text-center item-ceter">
            <h2 className="text-3xl mb-2 font-semibold">Create a New workflow</h2>
            <p className="font-semibold text-start w-[405px] ml-28 mt-6 text-[#B8B8B8]">
              Workflow entails the structured sequence of tasks and processes
              required to complete a project or activity efficiently, ensuring
              smooth coordination and optimal resource utilization.
            </p>
            <Image src={AddStages} className="ml-32 mt-4" />
          </div>

          <div className="p-8 m-0 w-[50%] text-center">
            <h2 className="text-xl text-start font-medium">Workflow Name</h2>
            <Input className="w-72 h-8 mt-2 font-semibold mr-[400px] border-blue-500 " placeholder="example" />

           <div className="text-start">

           <div className="relative top-5 ">
              <h4 className="font-semibold">Add Stage</h4>

              <button className="w-16 h-14 mt-2 border-[#d9d9d9] rounded-xl text-2xl absolute bg-[#d9d9d9]">
                {" "}
                <HiPlusCircle className="ml-4 text-white text-3xl " />
              </button>
              <div className=" left-24 relative mt-2">
                <h6 className="font-medium">New Stage</h6>
                <p className="text-[#B8B8B8]">No Sub-stages</p>
              </div>
            </div>

            <div className="mt-14">
              <h4 className="font-semibold" >Add Sub-Stage</h4>

              <button className="w-16 mt-2 h-14 border-[#d9d9d9] rounded-xl text-2xl absolute bg-[#d9d9d9]">
                {" "}
                <HiPlusCircle className="ml-4 text-white text-3xl " />
              </button>
              <div className=" left-24 mt-2 relative">
                <h6 className="font-medium" >New Sub-Stage</h6>
                <p className="text-[#B8B8B8]">No Task</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold" >Create Check List</h4>
              <button className="w-16 h-14 mt-2 border-[#d9d9d9] rounded-xl text-2xl absolute bg-[#d9d9d9]">
                {" "}
                <HiPlusCircle className="ml-4 text-white text-3xl " />
              </button>
              <div className=" left-24 relative mt-2">
                <h6 className="font-medium" >Create Check List</h6>
                <p className="text-[#B8B8B8]" >No Task</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold  ml-2" >Stages</h4>
              <div className="mb-7  mt-2 ">
              <button className="w-16  h-14 border-[#d9d9d9] rounded-xl text-2xl absolute bg-[#d9d9d9]">
                {" "}
                <HiPlusCircle className="ml-4 text-white text-3xl " />
              </button>
              <div className=" left-24 relative  ">
                <h6 className="font-medium" >To Do</h6>
                <p className="text-[#B8B8B8]" >No Task</p>
              </div>
              </div>
             

              <div className="mb-7">
             <button className="w-16 h-14 border-[#d9d9d9] rounded-xl text-2xl absolute bg-[#d9d9d9]">
                {" "}
                <HiPlusCircle className="ml-4 text-white text-3xl " />
              </button>
              <div className=" left-24 relative mt-6">
                <h6 className="font-medium" >In Progress</h6>
                <p className="text-[#B8B8B8]" >No Task</p>
              </div>
             </div>


             <div>
             <button className="w-16 h-14 border-[#d9d9d9] rounded-xl text-2xl absolute bg-[#d9d9d9]">
                {" "}
                <HiPlusCircle className="ml-4 text-white text-3xl " />
              </button>
              <div className=" left-24 relative">
                <h6 className="font-medium">Done</h6>
                <p className="text-[#B8B8B8]" >No Task</p>
              </div>
             </div>
            </div>

           </div>


            <button className="p-4 w-56 mt-14  bg-indigo-600 text-white rounded-md " > Create Workflow  </button>

          </div>
        </div>
      </div>
    </>
  );
}
