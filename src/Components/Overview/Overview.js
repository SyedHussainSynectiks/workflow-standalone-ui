import React from 'react'
import Image from 'next/image'
import { addToggleValue } from '@/Context/useCaseSlice/useCaseSlice'
import Overviewimage from "../../../public/assets/overviewbg.svg"
import Selecttemplate from "../../../public/assets/Selecttemplate.svg"
import Createtemplate from "../../../public/assets/Createtemplate.svg"
import Link from 'next/link'
import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux'

function Overview() {
  const dispatch = useDispatch();
  return (
    <>
      <Row align="middle" justify='apace-evenly'>
        <Col
          xs={{
            span: 5,
            offset: 1,
          }}
          lg={{
            span: 6,
            offset: 2,
          }}
        >
          <div className=''>
            <Image src={Overviewimage} className='  ' />
          </div>

        </Col>
        <Col
          xs={{
            span: 11,
            offset: 1,
          }}
          lg={{
            span: 6,
            offset: 2,
          }}
        >
          <div className='border-blue-200 h-40   border-2 rounded-lg '>
            <Link href="/main/projects/addStages" onClick={() => { dispatch(addToggleValue("1")) }} className='w-[100%] flex flex-col items-center'>
              <Image src={Selecttemplate} className='mt-3 mb-4  ' />
              <h2>Select Template</h2>
            </Link>
          </div>
        </Col>
        <Col
          xs={{
            span: 5,
            offset: 1,
          }}
          lg={{
            span: 6,
            offset: 2,
          }}
        >

          <div className='border-blue-200 h-40  text-center  items-center border-2 rounded-lg '>
            <Link href="/main/projects/addStages" onClick={() => { dispatch(addToggleValue("2")) }} className='w-[100%] flex flex-col items-center'>
              <Image src={Createtemplate} className=' mt-3 mb-4  ' />
              <h2>Create Template</h2>
            </Link>
          </div>
        </Col>
      </Row>
        <div className='w-[100%] flex border h-screen items-center bg-white  rounded border-t-[2rem] border-[#F5F5F5]'>

        <div className='w-[50%] flex justify-evenly items-center  space-x-24'>




        </div>


      </div>
    </>
  )
}

export default Overview