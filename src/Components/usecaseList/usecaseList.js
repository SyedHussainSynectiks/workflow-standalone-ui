import React from "react";
import style from "./usecaseList.module.css";
import Check from "../../../public/assets/Check.svg";
import search from "../../../public/assets/search2.svg";
import Image from "next/image";

const UsecaseList = () => {
  return (
    <>
    <h2 className="text-3xl font-extrabold text-left w-[100%]">Procurement Solution</h2>

      <div className="w-[100%] text-left text-slate-400 flex gap-14 my-4">
        <p>Last Updated By Siddhesh.D</p>
        <p>24 Min Ago</p>
      </div>
      <p className="pb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam neque sapiente vero id veritatis, minima, quis harum inventore, labore ipsum vel suscipit magni quas exercitationem.
      </p>
      <div className={style.listTable}>
        <div className="flex justify-between">
          <h3 className={style.heading}>Development Workflow Overview</h3>
          <div className="flex gap-x-2">
            <select
              className="w-48 px-3 py-1 border border-neutral-300 bg-transparent"
              I
              placeholder="Sort By"
            >
              <option>Sort By</option>
            </select>
            <div className="w-48 px-3 py-1 border border-neutral-300 bg-transparent flex">
              <input type="text" placeholder="Search Usecase" className="border-r-2 border-slate-300 w-36" />
              <Image src={search} className="ml-2"/>
            </div>
          </div>
        </div>
        {/* <div className={style.headingRow}>
            <div className="flex justify-evenly">
              <div className="w-full border-2 ">
                <h4>Usecase</h4>
              </div>
              <div className="w-full border-2 headings">
                <h4>Requirement</h4>
              </div>
              <div className="w-full border-2 headings">
                <h4>Mock Development</h4>
              </div>
              <div className="w-full border-2 headings">
                <h4>Actual Development</h4>
              </div>
              <div className="w-full border-2 headings">
                <h4>CI/CD Test</h4>
              </div>
              <div className="w-full border-2 headings">
                <h4>Staging/Release</h4>
              </div>
              <div className="w-full border-2 headings">
                <h4>Publish/Operate</h4>
              </div>
            </div>
          </div> */}

        <div className={style.tableContainer}>
          {/* Loop through rows */}
          <div className={style.listHeading}>
            <div className={style.tableRow}>
              <div className={style.tableCell}>
                <h4>Usecse</h4>
              </div>
              <div className={style.tableCell}>
                <h4>Requirement</h4>
              </div>
              <div className={style.tableCell}>
                <h4>Mock Development</h4>
              </div>
              <div className={style.tableCell}>
                <h4>Actual Development</h4>
              </div>
              <div className={style.tableCell}>
                <h4>CI/CD Test</h4>
              </div>
              <div className={style.tableCell}>
                <h4>Staging/Release</h4>
              </div>
              <div className={style.tableCell2}>
                <h4>Publish/Operate</h4>
              </div>
            </div>
          </div>
          <div className={style.listBody}>
            <div className={style.bodyRow}>
              <div className={style.tableCell}>
                <h4 className={style.usecaseNo}>Usecse1</h4>
              </div>
              <div className={style.tableCell}>
                <Image src={Check} alt="" />
              </div>
              <div className={style.tableCell}>
                <Image src={Check} alt="" />
              </div>
              <div className={style.tableCell}>
                <Image src={Check} alt="" />
              </div>
              <div className={style.tableCell}>
                {/* <Image src={Check} alt="" /> */}
              </div>
              <div className={style.tableCell}>
                {/* <Image src={Check} alt="" /> */}
              </div>
              <div className={style.tableCell2}>
                {/* <Image src={Check} alt="" /> */}
              </div>

              <div className={style.tableCell}>
                <h4 className={style.usecaseNo}>Usecse2</h4>
              </div>
              <div className={style.tableCell}>
                <Image src={Check} alt="" />
              </div>
              <div className={style.tableCell}>
                <Image src={Check} alt="" />
              </div>
              <div className={style.tableCell}>
                <Image src={Check} alt="" />
              </div>
              <div className={style.tableCell}>
                <Image src={Check} alt="" />
              </div>
              <div className={style.tableCell}>
                {/* <Image src={Check} alt="" /> */}
              </div>
              <div className={style.tableCell2}>
                {/* <Image src={Check} alt="" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsecaseList;
