"use client"
import Image from "next/image";

import Login from "@/app/account/login/page";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Login />

      {/* <Page/> */}
      {/* <Stepper/> */}
      {/* <WorkViewDetails/> */}
    </main>
  );
}
