import Image from 'next/image';
import Login from '@/app/login/page';
import UsecaseList from './../Components/usecaseList/usecaseList';
import Newform from './main/projects/allUseCases/page';
import PieCart from '@/Components/Graphs/pieCart';
import ProjectResours from '@/Components/projectResours/projectResours';
import Page from './main/projects/marketingUseCase/page';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      {/* <Login /> */}
    {/* <UsecaseList /> */}
    <ProjectResours/>
    {/* <Newform /> */}
    {/* <Page/> */}
    </main>
  )
}
