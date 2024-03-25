import React from 'react'
import Image from 'next/image'
import { addToggleValue } from '@/Context/useCaseSlice/useCaseSlice'
import Overviewimage from "../../../public/assets/overviewbg.svg"
import Selecttemplate from "../../../public/assets/Selecttemplate.svg"
import Createtemplate from "../../../public/assets/Createtemplate.svg"
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'antd';

function Overview() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full h-screen bg-white rounded border-t-[2rem] border-[#F5F5F5]">
        <Row align="middle" className="h-full">
          <Col span={12} className="pr-8">
            <Image src={Overviewimage} className="ml-8" alt="Overview" />
          </Col>
          <Col span={12} className="pl-4">
            <Row gutter={24} justify="center" align="middle">
              <Col>
                <div className="w-56 border-gray-300 h-40 border-2 rounded-lg">
                  <Link
                    href="/main/projects/addStages"
                    onClick={() => dispatch(addToggleValue("1"))}
                    className="w-full flex flex-col items-center"
                  >
                    <Image
                      src={Selecttemplate}
                      className="mt-3 mb-4"
                      alt="Select Template"
                    />
                    <h2>Select Template</h2>
                  </Link>
                </div>
              </Col>
              <Col>
                <div className="w-56 border-gray-300 h-40 text-center items-center border-2 rounded-lg">
                  <Link
                    href="/main/projects/addStages"
                    onClick={() => dispatch(addToggleValue("2"))}
                    className="w-full flex flex-col items-center"
                  >
                    <Image
                      src={Createtemplate}
                      className="mt-3 mb-4"
                      alt="Create Template"
                    />
                    <h2>Create Template</h2>
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Overview