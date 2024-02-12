'use client'
import React, { useState } from 'react'
const Page = () => {

    const details = { assignto: '', describe: '', select1: '', date1: '', comm1: '', select2: '', date2: '', comm2: ''}
    const Second = { Sassignto: '', Sdescribe: '', Sselect1: '', Sdate1: '', Scomm1: '', Sselect2: '', Sdate2: '', Scomm2: '' };
    const Third = { Tassignto: '', Tdescribe: '', Tselect1: '', Tdate1: '', Tcomm1: '', Tselect2: '', Tdate2: '', Tcomm2: '' };
    const Fourth = { Fassignto: '', Fdescribe: '', Fselect1: '', Fdate1: '', Fcomm1: '', Fselect2: '', Fdate2: '', Fcomm2: '' };
    const Fifth = { Fiassignto: '', Fidescribe: '', Fiselect1: '', Fidate1: '', Ficomm1: '', Fiselect2: '', Fidate2: '', Ficomm2: '' };
    const Six = { Siassignto: '', Sidescribe: '', Siselect1: '', Sidate1: '', Sicomm1: '', Siselect2: '', Sidate2: '', Sicomm2: '' };
    const [Idea, setIdea] = useState(details)
    const [PlanAssign, setPlanAssign] = useState(Second)
    const [Create, setCreate] = useState(Third)
    const [ReviewAprov, setReviewAprov] = useState(Fourth)
    const [PublishPromo, setPublishPromo] = useState(Fifth)
    const [MeasureArcv, setMeasureArcv] = useState(Six)
  
    const setOnchange = (e) => {
      const { name, value } = e.target;
      setIdea({ ...Idea, [name]: value })
      setPlanAssign({ ...PlanAssign, [name]: value })
      setCreate({ ...Create, [name]: value })
      setReviewAprov({ ...ReviewAprov, [name]: value })
      setPublishPromo({ ...PublishPromo, [name]: value })
      setMeasureArcv({ ...MeasureArcv, [name]: value })
    }
  
    const submitHandler = (e) => {
      e.preventDefault();
      const Data = [Idea, PlanAssign, Create, ReviewAprov, PublishPromo, MeasureArcv]
      console.log(Data);
    }
  
    return (
      <div >
  
        <div className='flex w-[100%] flex-col items-start gap-5'>
          <div className='flex w-[100%] h-7 flex-col justify-center text-black text-2xl non-italic font-semibold leading-snug'>Procurement Workflow</div>
          <div className='text-black text-2xl font-semibold leading-normal bg-white px-4 py-4 w-[100%] h-14 flex items-center'>Marketing workflow Usecase </div>
          <div className='text-black text-2xl font-semibold leading-normal bg-white px-4 py-4 w-[100%] h-14 flex items-center'>Basic Details</div>
        </div>
  
        <div className='flex flex-col w-[100%] items-start gap-2.5 shrink-0'>
          <form>
            <div className='flex flex-col items-end gap-3 ml-10 mt-5 '>
              <div className='flex  text-center items-center  mb-11 gap-2'>
              <label>UserCase Name:</label>
              <input type='text' className='w-[35.5rem] h-[3rem] p-1 border border-white shadow-md' placeholder='Admin name'></input>
              </div>
              <div className='flex  text-center items-center  mb-11 gap-2'>
              <label>Assign to:</label>
              <input type='text' className='w-[35.5rem] h-[3rem] p-1 border border-white shadow-md' placeholder='Project name'></input>
              </div>
              <div className='flex  text-center items-top  mb-11 gap-2'>
              <label>UserCase description:</label>
              <textarea className='w-[35.5rem] h-[4.7500rem] p-1 border border-white shadow-md' placeholder='Description.....'></textarea>
                </div>

              {/* <div className='flex flex-col text-end justify-between mb-11 gap-2'>
                <label>UserCase Name:</label>
                <label>Assign to:</label>
                <label>UserCase description:</label>
              </div>
              <div className='flex flex-col justify-between gap-6'>
                <input type='text' className='w-[35.5rem] p-1 border border-white shadow-md' placeholder='Admin name'></input>
                <input type='text' className='w-[35.5rem] p-1 border border-white shadow-md' placeholder='Project name'></input>
                <textarea className='w-[35.5rem] h-[4.7500rem] p-1 border border-white shadow-md' placeholder='Description.....'></textarea>
              </div> */}
            </div>
          </form>
        </div>
  
        {/* //Workflow Head section */}
  
  
        <div className='text-black text-2xl font-semibold leading-normal bg-white px-4 py-3 w-[100%] flex items-center mt-6 mb-6'>Workflow Stage Details</div>
  
        <form onSubmit={submitHandler} className='mb-6'>
          {/* Idea section */}
  
          <div className='flex w-[100%] flex-col items-center shrink-0  gap-8 bg-white mb-4'>
            <div className='w-[100%] px-6 py-4  flex items-center  justify-between border-y border-b-neutral-300 border border-t-0 border-x-0'>
              <div className='text-blue-500 text-xl non-italic font-medium leading-normal '>1. Idea</div>
              <button><div className='text-blue-500'>View More</div></button>
            </div>
  
            <div className='flex px-6 items-start self-stretch w-[100%] gap-4 border-y border-t-neutral-300 border-b-0'>
              <div className='flex flex-col items-start w-[50%]  gap-4 '>
                <label className=' text-blue-400 text-sm font-normal leading-snug' for='Assign'>Assign To:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' id='Assign' placeholder='example' name='assignto' value={Idea.assignto} onChange={setOnchange} />
              </div>
  
              <div className='flex flex-col items-start w-[50%]  gap-4'>
                <label className=' text-blue-400 text-sm font-normal leading-snug'>Description:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' placeholder='example' name='describe' value={Idea.describe} onChange={setOnchange} />
              </div>
            </div>
          </div>
  
          {/* Requirement Sub-Stage Details */}
          <div className='w-[100%] py-2 bg-white'>
            <div className=' w-[95%] flex px-6 py-4 flex-col items-start border-b-neutral-300 border border-t-0 border-x-0 bg-white mt-2 text-blue-600 text-l font-medium leading-normal'>Idea Sub-Stage Details</div>
            <div className='w-[95%]'>
  
              <div className='flex items-center justify-between border-t-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' I>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='date1' value={Idea.date1} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='comm1' value={Idea.comm1} onChange={setOnchange}></input>
                </div>
              </div>
  
              <div className='flex items-center justify-between border-y-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
  
                <div className='flex flex-col gap-2 w-[20%] '>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' name='select2' value={Idea.select2} onChange={setOnchange}>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='date2' value={Idea.date2} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='comm2' value={Idea.comm2} onChange={setOnchange}></input>
                </div>
  
              </div>
  
  
            </div>
          </div>
         
        </form>
  
  
        {/* 2.Plan & Assign */}
        <form onSubmit={submitHandler}>
          {/* Requirement section */}
  
          <div className='flex w-[100%] flex-col items-center shrink-0  gap-8 bg-white mb-4'>
            <div className='w-[100%] px-6 py-4  flex items-center  justify-between border-y border-b-neutral-300 border border-t-0 border-x-0'>
              <div className='text-blue-500 text-xl non-italic font-medium leading-normal '>2. Plan & Assign</div>
              <button><div className='text-blue-500'>View More</div></button>
            </div>
  
            <div className='flex px-6 items-start self-stretch w-[100%] gap-4 border-y border-t-neutral-300 border-b-0'>
              <div className='flex flex-col items-start w-[50%]  gap-4 '>
                <label className=' text-blue-400 text-sm font-normal leading-snug' for='Assign'>Assign To:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' id='Assign' placeholder='example' name='Sassignto' value={PlanAssign.Sassignto} onChange={setOnchange} />
              </div>
  
              <div className='flex flex-col items-start w-[50%]  gap-4'>
                <label className=' text-blue-400 text-sm font-normal leading-snug'>Description:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' placeholder='example' name='Sdescribe' value={PlanAssign.Sdescribe} onChange={setOnchange} />
              </div>
            </div>
          </div>
  
          {/* Requirement Sub-Stage Details */}
          <div className='w-[100%] py-2 bg-white'>
            <div className=' w-[95%] flex px-6 py-4 flex-col items-start border-b-neutral-300 border border-t-0 border-x-0 bg-white mt-2 text-blue-600 text-l font-medium leading-normal'>Plan&Assign Sub-Stage Details</div>
            <div className='w-[95%]'>
  
              <div className='flex items-center justify-between border-t-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' I>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='Sdate1' value={PlanAssign.Sdate1} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='Scomm1' value={PlanAssign.Scomm1} onChange={setOnchange}></input>
                </div>
              </div>
  
              <div className='flex items-center justify-between border-y-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
  
                <div className='flex flex-col gap-2 w-[20%] '>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' name='Sselect2' value={PlanAssign.Sselect2} onChange={setOnchange}>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='Sdate2' value={PlanAssign.Sdate2} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='Scomm2' value={PlanAssign.Scomm2} onChange={setOnchange}></input>
                </div>
  
              </div>
  
  
            </div>
          </div>
          <div className='flex items-center justify-end p-4'>
            <div className='flex gap-4 text-lg'>
              <button className='w-28 h-10 border'>Cancel</button>
              <button className='w-28 h-10 border bg-blue-500 text-white' type='submit'>Save</button>
            </div>
          </div>
        </form>

        {/* 3.Create */}
        <form onSubmit={submitHandler}>
          {/* Requirement section */}
  
          <div className='flex w-[100%] flex-col items-center shrink-0  gap-8 bg-white mb-4'>
            <div className='w-[100%] px-6 py-4  flex items-center  justify-between border-y border-b-neutral-300 border border-t-0 border-x-0'>
              <div className='text-blue-500 text-xl non-italic font-medium leading-normal '>3.Create</div>
              <button><div className='text-blue-500'>View More</div></button>
            </div>
  
            <div className='flex px-6 items-start self-stretch w-[100%] gap-4 border-y border-t-neutral-300 border-b-0'>
              <div className='flex flex-col items-start w-[50%]  gap-4 '>
                <label className=' text-blue-400 text-sm font-normal leading-snug' for='Assign'>Assign To:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' id='Assign' placeholder='example' name='Tassignto' value={Create.Tassignto} onChange={setOnchange} />
              </div>
  
              <div className='flex flex-col items-start w-[50%]  gap-4'>
                <label className=' text-blue-400 text-sm font-normal leading-snug'>Description:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' placeholder='example' name='Tdescribe' value={Create.Tdescribe} onChange={setOnchange} />
              </div>
            </div>
          </div>
  
          {/* Requirement Sub-Stage Details */}
          <div className='w-[100%] py-2 bg-white'>
            <div className=' w-[95%] flex px-6 py-4 flex-col items-start border-b-neutral-300 border border-t-0 border-x-0 bg-white mt-2 text-blue-600 text-l font-medium leading-normal'>Create Sub-Stage Details</div>
            <div className='w-[95%]'>
  
              <div className='flex items-center justify-between border-t-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' I>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='Tdate1' value={Create.Tdate1} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='Tcomm1' value={Create.Tcomm1} onChange={setOnchange}></input>
                </div>
              </div>
  
              <div className='flex items-center justify-between border-y-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
  
                <div className='flex flex-col gap-2 w-[20%] '>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' name='Tselect2' value={Create.Tselect2} onChange={setOnchange}>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='Tdate2' value={Create.Tdate2} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='Tcomm2' value={Create.Tcomm2} onChange={setOnchange}></input>
                </div>
  
              </div>
  
            </div>
          </div>
          <div className='flex items-center justify-end p-4'>
            <div className='flex gap-4 text-lg'>
              <button className='w-28 h-10 border'>Cancel</button>
              <button className='w-28 h-10 border bg-blue-500 text-white' type='submit'>Save</button>
            </div>
          </div>
        </form>

        {/* 4.Review & Approve */}
        <form onSubmit={submitHandler}>
          {/* Requirement section */}
  
          <div className='flex w-[100%] flex-col items-center shrink-0  gap-8 bg-white mb-4'>
            <div className='w-[100%] px-6 py-4  flex items-center  justify-between border-y border-b-neutral-300 border border-t-0 border-x-0'>
              <div className='text-blue-500 text-xl non-italic font-medium leading-normal '>4. Review & Approve</div>
             <button> <div className='text-blue-500'>View More</div></button>
            </div>
  
            <div className='flex px-6 items-start self-stretch w-[100%] gap-4 border-y border-t-neutral-300 border-b-0'>
              <div className='flex flex-col items-start w-[50%]  gap-4 '>
                <label className=' text-blue-400 text-sm font-normal leading-snug' for='Assign'>Assign To:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' id='Assign' placeholder='example' name='Fassignto' value={ReviewAprov.Fassignto} onChange={setOnchange} />
              </div>
  
              <div className='flex flex-col items-start w-[50%]  gap-4'>
                <label className=' text-blue-400 text-sm font-normal leading-snug'>Description:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' placeholder='example' name='Fdescribe' value={ReviewAprov.Fdescribe} onChange={setOnchange} />
              </div>
            </div>
          </div>
  
          {/* Requirement Sub-Stage Details */}
          <div className='w-[100%] py-2 bg-white'>
            <div className=' w-[95%] flex px-6 py-4 flex-col items-start border-b-neutral-300 border border-t-0 border-x-0 bg-white mt-2 text-blue-600 text-l font-medium leading-normal'>Review&Approve Sub-Stage Details</div>
            <div className='w-[95%]'>
  
              <div className='flex items-center justify-between border-t-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' I>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='Fdate1' value={ReviewAprov.Fdate1} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='Fcomm1' value={ReviewAprov.Fcomm1} onChange={setOnchange}></input>
                </div>
              </div>
  
              <div className='flex items-center justify-between border-y-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
  
                <div className='flex flex-col gap-2 w-[20%] '>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' name='select2' value={ReviewAprov.select2} onChange={setOnchange}>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='Fdate2' value={ReviewAprov.Fdate2} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='F
                  comm2' value={ReviewAprov.Fcomm2} onChange={setOnchange}></input>
                </div>
  
              </div>
  
  
            </div>
          </div>
          <div className='flex items-center justify-end p-4'>
            <div className='flex gap-4 text-lg'>
              <button className='w-28 h-10 border'>Cancel</button>
              <button className='w-28 h-10 border bg-blue-500 text-white' type='submit'>Save</button>
            </div>
          </div>
        </form>
  
        {/* 5.Publish & Promote */}
        <form onSubmit={submitHandler}>
          {/* Requirement section */}
  
          <div className='flex w-[100%] flex-col items-center shrink-0  gap-8 bg-white mb-4'>
            <div className='w-[100%] px-6 py-4  flex items-center  justify-between border-y border-b-neutral-300 border border-t-0 border-x-0'>
              <div className='text-blue-500 text-xl non-italic font-medium leading-normal '>5. Publish & Promote</div>
              <button><div className='text-blue-500'>View More</div></button>
            </div>
  
            <div className='flex px-6 items-start self-stretch w-[100%] gap-4 border-y border-t-neutral-300 border-b-0'>
              <div className='flex flex-col items-start w-[50%]  gap-4 '>
                <label className=' text-blue-400 text-sm font-normal leading-snug' for='Assign'>Assign To:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' id='Assign' placeholder='example' name='Fiassignto' value={PublishPromo.Fiassignto} onChange={setOnchange} />
              </div>
  
              <div className='flex flex-col items-start w-[50%]  gap-4'>
                <label className=' text-blue-400 text-sm font-normal leading-snug'>Description:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' placeholder='example' name='Fidescribe' value={PublishPromo.Fidescribe} onChange={setOnchange} />
              </div>
            </div>
          </div>
  
          {/* Requirement Sub-Stage Details */}
          <div className='w-[100%] py-2 bg-white'>
            <div className=' w-[95%] flex px-6 py-4 flex-col items-start border-b-neutral-300 border border-t-0 border-x-0 bg-white mt-2 text-blue-600 text-l font-medium leading-normal'>Publish&Prmote Sub-Stage Details</div>
            <div className='w-[95%]'>
  
              <div className='flex items-center justify-between border-t-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' I>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='Fidate1' value={PublishPromo.Fidate1} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='Ficomm1' value={PublishPromo.Ficomm1} onChange={setOnchange}></input>
                </div>
              </div>
  
              <div className='flex items-center justify-between border-y-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
  
                <div className='flex flex-col gap-2 w-[20%] '>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' name='Fiselect2' value={PublishPromo.Fiselect2} onChange={setOnchange}>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='Fidate2' value={PublishPromo.Fidate2} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='Ficomm2' value={PublishPromo.Ficomm2} onChange={setOnchange}></input>
                </div>
  
              </div>
  
             
  
            </div>
          </div>
          <div className='flex items-center justify-end p-4'>
            <div className='flex gap-4 text-lg'>
              <button className='w-28 h-10 border'>Cancel</button>
              <button className='w-28 h-10 border bg-blue-500 text-white' type='submit'>Save</button>
            </div>
          </div>
        </form>

        {/* 6.Measure & Archive */}
        <form onSubmit={submitHandler}>
          {/* Requirement section */}
  
          <div className='flex w-[100%] flex-col items-center shrink-0  gap-8 bg-white mb-4'>
            <div className='w-[100%] px-6 py-4  flex items-center  justify-between border-y border-b-neutral-300 border border-t-0 border-x-0'>
              <div className='text-blue-500 text-xl non-italic font-medium leading-normal '>6. Measure & Archive</div>
              <button><div className='text-blue-500'>View More</div></button>
            </div>
  
            <div className='flex px-6 items-start self-stretch w-[100%] gap-4 border-y border-t-neutral-300 border-b-0'>
              <div className='flex flex-col items-start w-[50%]  gap-4 '>
                <label className=' text-blue-400 text-sm font-normal leading-snug' for='Assign'>Assign To:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' id='Assign' placeholder='example' name='Siassignto' value={MeasureArcv.Siassignto} onChange={setOnchange} />
              </div>
  
              <div className='flex flex-col items-start w-[50%]  gap-4'>
                <label className=' text-blue-400 text-sm font-normal leading-snug'>Description:</label>
                <input type='text' className='w-[100%] h=[1.375rem] p-1 border border-neutral-300 rounded-sm' placeholder='example' name='Sidescribe' value={MeasureArcv.Sidescribe} onChange={setOnchange} />
              </div>
            </div>
          </div>
  
          {/* Requirement Sub-Stage Details */}
          <div className='w-[100%] py-2 bg-white'>
            <div className=' w-[95%] flex px-6 py-4 flex-col items-start border-b-neutral-300 border border-t-0 border-x-0 bg-white mt-2 text-blue-600 text-l font-medium leading-normal'>Measure&Archive Sub-Stage MeasureArcv</div>
            <div className='w-[95%]'>
  
              <div className='flex items-center justify-between border-t-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' I>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='Sidate1' value={MeasureArcv.Sidate1} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='Sicomm1' value={MeasureArcv.Sicomm1} onChange={setOnchange}></input>
                </div>
              </div>
  
              <div className='flex items-center justify-between border-y-2 w-[100%] py-2'>
                <h1 className='text-blue-500 ml-5'>***********************</h1>
  
                <div className='flex flex-col gap-2 w-[20%] '>
                  <label className='w-[100%]'>Assign To:</label>
                  <select className='w-[100%] px-3 py-1 border border-neutral-300' name='Siselect2' value={MeasureArcv.Siselect2} onChange={setOnchange}>
                    <option>@</option>
                  </select>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Start - End date</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='date' name='Sidate2' value={MeasureArcv.Sidate2} onChange={setOnchange}></input>
                </div>
  
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label className='w-[100%]'>Comments</label>
                  <input className='w-[100%] px-3 py-1 border border-neutral-300' type='text' name='Sicomm2' value={MeasureArcv.Sicomm2} onChange={setOnchange}></input>
                </div>
  
              </div>
  
             
  
            </div>
          </div>
          <div className='flex items-center justify-end p-4'>
            <div className='flex gap-4 text-lg'>
              <button className='w-28 h-10 border'>Cancel</button>
              <button className='w-28 h-10 border bg-blue-500 text-white' type='submit'>Save</button>
            </div>
          </div>
        </form>
      </div>
    )
  }

export default Page;
