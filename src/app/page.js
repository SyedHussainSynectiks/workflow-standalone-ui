"use client"
import Image from "next/image";
// import page from "./main/projects/addedResources/page";
import Page from "./main/projects/useCaseDetails/page";
import WorkViewDetails from "@/Components/useCaseWorkViewDetails/workViewDetails";
import Login from "@/app/login/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      {/* <Login /> */}
      <Page/>
      {/* <WorkViewDetails/> */}
    </main>
  );
}
