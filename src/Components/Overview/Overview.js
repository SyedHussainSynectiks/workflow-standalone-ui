import React from 'react'
import Image from 'next/image'
import { addToggleValue } from '@/Context/useCaseSlice/useCaseSlice'
import Overviewimage from "../../../public/assets/overviewbg.svg"
import Selecttemplate from "../../../public/assets/Selecttemplate.svg"
import Createtemplate from "../../../public/assets/Createtemplate.svg"
import Link from 'next/link'
import { useDispatch } from 'react-redux'

function Overview() {
  const  dispatch = useDispatch();
  return (
    <>
        <div className='w-[100%] flex border h-screen items-center bg-white'>
           <div className='w-[50%] '>
                <Image src={Overviewimage} className=' ml-24 ' />
           </div>

           <div className='w-[50%] flex justify-evenly items-center'>
               
               <div className='w-[25%] border-blue-200 h-40   border-2 rounded-lg '>
               <Link href="/main/projects/addStages" onClick={()=>{dispatch(addToggleValue("1"))}} className='w-[100%] flex flex-col items-center'>
               <Image src={Selecttemplate} className='mt-3 mb-4  '  />
               <h2>Select Template</h2>
               </Link>
               </div>
               


               <div className='w-[25%] border-blue-200 h-40  text-center  items-center border-2 rounded-lg '>
               <Link href="/main/projects/addStages" onClick={()=>{dispatch(addToggleValue("2"))}} className='w-[100%] flex flex-col items-center'>
               <Image src={  Createtemplate } className=' mt-3 mb-4  ' />
               <h2>Create Template</h2>
               </Link>
               </div>
                
           </div>


        </div>
    </>
  )
}

export default Overview