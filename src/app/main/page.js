"use client";

import Image from "next/image";

// importing ant d components
import {
    Divider,
} from "antd";
import StackedBarChart from "@/Components/Charts/StackedBarChart";
import { useRouter } from "next/navigation";
import ProjectsList from "@/Components/Projectslists/Projectslist";
import Resources from "@/Components/Resources/Resources";
import Barchart from "@/Components/Charts/Barchart";
import DashCards from "@/Components/Cards/Cards";

const Dashboard = () => {
    return (
        <>
            <div className="mx-8 space-y-7 mt-3">
                <h1 className="ml-2 uppercase text-3xl">workflow Management</h1>
                <div className="flex flex-row gap-9 w-full ml-4">
                    <DashCards />
                </div>
                <div className="flex flex-col space-y-6">
                    <div className="bg-white my-6 p-10">
                        <div className="flex flex-col">
                            <h2 className="text-3xl mb-5">Project Overview</h2>
                            <Barchart />
                        </div>
                    </div>
                </div>
                <div className="bg-white my-6 p-10">
                    <div className="flex flex-col justify-center items-start">
                        <div className="flex flex-col">
                            <h2 className="text-3xl">Top Project Resources</h2>
                            <h5 className="text-xl">
                                Top most resources working on top projects
                            </h5>
                        </div>
                        <StackedBarChart />
                    </div>
                </div>
                <div className="my-5">
                    <ProjectsList />
                </div>
                <div>
                    <Resources />
                </div>
            </div>
        </>
    );
};

export default Dashboard;