import React from "react";
import user from "../../../public/assets/user1.svg";
import Image from "next/image";

const AssineTo = () => {
  return (
    <>
      <div className="w-[100%]">
        <div>
          <h2 className="text-blue-400 text-xl font-normal leading-snu w-[100%]">
            Assigned to :
          </h2>
          <div className="w-80 p-6 border shadow-md mb-6 mt-4">
            <div className="flex gap-12">
              <div>
                <Image src={user} />
              </div>
              <div>
                <h3 className="text-blue-600 text-sl font-bold leading-snu">
                  Angela Moss
                </h3>
                <p className="text-grey-300 text-xs">Project Manager</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <h4 className="text-blue-400 text-xm font-normal">
                Current Task - User Document{" "}
              </h4>
              <p className="text-grey-300 text-sm">Total Task - 10 </p>
            </div>
          </div>

          <div className="w-80 p-6 border shadow-md mb-6 mt-6">
            <div className="wraper flex justify-between">
              <div className="column1 text-grey-300 text-sl flex flex-col gap-2">
                <p>Assigned date</p>
                <p>Planned start date</p>
                <p>Actual start date</p>
                <p>Deviation</p>
              </div>
              <div className="column2 text-grey-300 text-sl flex flex-col gap-2">
                <p>20/05/2022</p>
                <p>27/05/2022</p>
                <p>27/05/2022</p>
                <p>0 Days</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="bg-blue-400 text-white p-3">View Detailed Log</button>
        </div>
      </div>
      <div className="w-[100%] p-6 border shadow-md mb-6 mt-4">
        <h2 className="text-black-600 text-xl font-normal">
          Updates and Comments
        </h2>
        <input
          type="text"
          name=""
          id=""
          placeholder="Add new comment here"
          className="mt-4 h-12 bg-slate-100 w-[100%] p-4"
        />
      </div>
    </>
  );
};

export default AssineTo;
