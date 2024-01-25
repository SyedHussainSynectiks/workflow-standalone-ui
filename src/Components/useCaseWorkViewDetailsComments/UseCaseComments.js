import React from 'react'
import use from "../../../public/assets/user1.svg"
import comment from "../../../public/assets/Comment.svg"
import user2 from "../../../public/assets/user0.svg"
import Image from 'next/image'

const UseCaseComments = () => {
  return (
    <div>
       <div className="w-[100%] border shadow-md mb-6 mt-4">
        <h2 className="text-black-500 text-m font-bold p-2 border bg-neutral-200">
          Updates and Comments
        </h2>
        <div className='flex justify-between px-4'>
            <div className='flex items-center gap-3 py-6 '>
                <h2>Assign Name :</h2>
                <Image src={use} className='rounded-full w-10 '/>
                <p>Angela Moss</p>
            </div>
            <div className='flex gap-2 items-center'>
                <Image src={comment}/>
                <button className='bg-blue-400 text-white p-2'>Action</button>
            </div>
        </div>
      </div>

      <div className="w-[100%] border shadow-md mb-6 mt-4">
        <h2 className="text-black-500 text-m font-bold p-2 border bg-neutral-200">
          Design Specs
        </h2>
        <div className='flex justify-between px-4'>
            <div className='flex items-center gap-3 py-6 '>
                <h2>Assign Name :</h2>
                <Image src={user2} className='rounded-full w-10 '/>
                <p>Jenner</p>
            </div>
            <div className='flex gap-2 items-center'>
                <Image src={comment}/>
                <button className='bg-blue-400 text-white p-2'>Action</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UseCaseComments
