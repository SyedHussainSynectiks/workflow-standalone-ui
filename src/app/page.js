"use client"
import Image from "next/image";
import Dashboard from "./main/page";
import Login from "@/app/account/login/page";
import AddResourcePool2 from "@/Components/AddResourcePool/AddresoucrePool2";
import { notosans } from "@/font/font";

export default function Home() {
  return (
    <main className={`${notosans.className} flex min-h-screen flex-col items-center justify-between`}>
      <Login />
      {/* <Dashboard/> */}
      {/* <Page/> */}
      {/* <Stepper/> */}
      {/* <WorkViewDetails/> */}
    </main>
  );
}
