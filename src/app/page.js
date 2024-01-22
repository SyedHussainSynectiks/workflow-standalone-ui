"use client"
import Image from "next/image";
import Login from "@/app/login/page";
import UsecaseList from "./../Components/usecaseList/usecaseList";
import Newform from "./main/projects/allUseCases/page";
import PieCart from "@/Components/Graphs/pieCart";
import ProjectResours from "@/Components/projectResours/projectResours";
import TabsComponent from "@/Components/Tabs/Tabs";
import UseCaseTabs from "@/Components/useCaseTabsScrol/useCaseTabs";
import ProjectForm from "../app/main/projects/addNewProject/page";
import App from "@/Components/Projects/calendar";
import Page from "./main/projects/marketingUseCase/page";
import {Projectmanager} from "./main/projects/resourcePool/popup/Addresources";
import {UiDeveloperResourcePool} from "./main/projects/resourcePool/popup/Addresources";
import {CiCdResourcePool} from "./main/projects/resourcePool/popup/Addresources";
import {TesterResourcePool} from "./main/projects/resourcePool/popup/Addresources";
import AssineTo from "@/Components/useCaseAssine/assineTo";
import {UploadPopul} from "./main/projects/addNewProject/uploadPopul";
import {UploadPopul2} from "./main/projects/addNewProject/uploadPopul";
import { UploadCompleted } from "./main/projects/addNewProject/uploadPopul"; 
import {UiResourcePool} from "./main/projects/resourcePool/popup/Addresources";

import showResources from "./main/projects/displayResources/page";
import AddUserPage from "./main/projects/addusecaseform/page";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Login />
      {/* <UsecaseList /> */}
      {/* <ProjectResours /> */}
      {/* <TabsComponent/> */}
      {/* <UiResourcePool/> */}

      
      <Projectmanager/>
      <UiDeveloperResourcePool/>
      <CiCdResourcePool/>
      <TesterResourcePool/>
      <UploadPopul/>
      <UploadCompleted/>
      <UploadPopul2/>
      <App />
<ProjectForm/>
      {/* <AssineTo /> */}
      <UseCaseTabs/>
      <Newform />
      <showResources/>
      <Page/>
    </main>
  );
}
