import React, { useEffect, useState } from 'react'
import { Button, Table } from "antd"
import { CaretRightOutlined } from "@ant-design/icons"
import axios from 'axios'
import { useSelector } from "react-redux"
const Planning = () => {
  const setUsecaseId = useSelector((state) => state.addUsecase);
  const UsecaseId = setUsecaseId.useCaseId;
  // const [open, setOpen] = useState(false)
  const [reciveddata, setRecivedData] = useState([]);
  const [open, setOpen] = useState(Array(reciveddata.length).fill(false));

  const toggleRequirement = (index) => {
    const newOpenState = [...open];
    newOpenState[index] = !newOpenState[index];
    setOpen(newOpenState);
  };

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://spj7xgf470.execute-api.us-east-1.amazonaws.com/dev/usecase/${UsecaseId}/planning`,
      headers: {
        'Accept': 'application/json'
      }
    };

    axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setRecivedData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(reciveddata);

  return (
    <div>
      <div className='flex items-center justify-between mx-5'>
        <h1 className='text-base font-medium leading-normal tracking-normal text-left'>Use Case1</h1>
        <Button type='primary' style={{ color: "white", background: "rgba(24, 144, 255, 1)" }}>Detail View</Button>
      </div>
      <div className='w-full mt-5'>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: '40%' }} className='p-1 pr-10 text-sm text-left'>Stages</th>
              <th style={{ width: '12%' }} className='p-1 pr-10 text-sm border border-y-0 border-r-0 border-l-2'>Assign to</th>
              <th style={{ width: '12%' }} className='p-1 pr-10 text-sm border border-y-0 border-r-0 border-l-2'>Start Date</th>
              <th style={{ width: '12%' }} className='p-1 pr-10 text-sm border border-y-0 border-r-0 border-l-2'>Deviation</th>
              <th style={{ width: '12%' }} className='p-1 pr-10 text-sm border border-y-0 border-r-0 border-l-2'>End Date</th>
              <th style={{ width: '12%' }} className='p-1 pr-10 text-sm border border-y-0 border-r-0 border-l-2'>Deviation</th>
            </tr>
          </thead>
          <tbody>
            {reciveddata.map((Data, index) => (
              <tr key={index}>
                <td colSpan={6}>
                  {Object.keys(Data).map((key) => (
                    <button
                      key={key}
                      onClick={() => toggleRequirement(index)}
                      className='flex justify-between items-center text-base font-normal leading-snug tracking-normal text-left w-[15rem] p-2 my-3'
                      style={{ border: "none", padding: "0px" }}
                    >
                      <span className=' text-blue-400'>{key}</span>
                      <CaretRightOutlined style={{ transform: open[index] ? 'rotate(90deg)' : 'rotate(0deg)' }} />
                    </button>
                  ))}
                  {open[index] && (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <colgroup>
                        <col style={{ width: '40%' }} />
                        <col style={{ width: '12%' }} />
                        <col style={{ width: '12%' }} />
                        <col style={{ width: '12%' }} />
                        <col style={{ width: '12%' }} />
                        <col style={{ width: '12%' }} />
                      </colgroup>
                      {Object.values(Data).map((values) => (
                        Object.values(values).map((valuesdata) => (
                          valuesdata.map((actualData) => (
                            <tr key={actualData.name}>
                              <td className='text-sm font-semibold leading-snug text-left py-3  '>{actualData.name}</td>
                              <td className='text-sm font-semibold leading-snug text-left py-3 pl-2'>Angela Moss</td>
                              <td className='text-sm font-semibold leading-snug text-left py-3 pl-4'>{actualData.start_date}</td>
                              <td className='text-sm font-semibold leading-snug text-left py-3 pl-10'>{actualData.start_deviation}</td>
                              <td className='text-sm font-semibold leading-snug text-left py-3 pl-5'>{actualData.end_date}</td>
                              <td className='text-sm font-semibold leading-snug text-left py-3 pl-5'>{actualData.end_deviation}</td>
                            </tr>
                          ))
                        ))
                      ))}
                    </table>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  )
}

export default Planning