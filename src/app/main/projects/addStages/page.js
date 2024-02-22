"use client"
import React, { useState } from 'react'
import { CloseCircleFilled, SaveOutlined, DeleteFilled, PlusCircleFilled } from '@ant-design/icons'
import { Input, Button, Form } from 'antd';

const onFinish = (values) => {
  console.log('Received values of form:', values);
};

const page = () => {
  const axios = require('axios');
let data = JSON.stringify({
  "example": {
    "name": "string",
    "created_by_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "stages": [
      {
        "Requirements1": {
          "tasks": [
            "task-1",
            "task-2",
            "task-3"
          ],
          "checklist": [
            "thing 1",
            "thing 2",
            "thing 3"
          ]
        }
      },
      {
        "mock1": {
          "tasks": [
            "mytask-1",
            "task-2",
            "task-3"
          ],
          "checklist": [
            "thing 1",
            "thing 2",
            "thing 3"
          ]
        }
      }
    ]
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: '{{baseUrl}}/workflow',
  headers: { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

  const [addStage, SetAddStage] = useState(false)
  const [addchecklist, SetCheckList] = useState(false)
  const [addsubstage, SetAddSubStage] = useState(false)
  return (
    <div>
      <div className='flex justify-between  items-center'>
        <h1 className='text-3xl font-semibold leading-snug tracking-normal text-left'>Workflow Management</h1>
        <CloseCircleFilled style={{ fontSize: "20px", color: 'blue' }} />
      </div>
      <h3 className='text-2xl font-medium leading-loose tracking-normal text-left pl-3'>Creating Workflow</h3>
      <div className='flex justify-between p-4 items-center bg-white'>
        <Input placeholder='example' className='w-1/2' />
        <Button icon={<SaveOutlined />} type='primary' className='bg-blue-500' onClick={() => SetAddStage(true)}>Add Stage</Button>
      </div>

      {addStage && (<div className='py-2 mt-2 flex flex-col space-y-2'>
        <h3 className='text-base font-medium leading-normal tracking-normal text-left'>Add Stage</h3>
        <div className='bg-white p-4 flex items-center justify-between'>

          <h4 className='text-sm font-normal leading-snug tracking-normal'>Stage Name :</h4>
          <Input placeholder='Requirement' className='w-1/2' />
          <DeleteFilled style={{ color: 'red' }} onClick={() => {
            SetAddStage(false);
            SetCheckList(false);
            SetAddSubStage(false)
          }} />

          <Button type='primary' className='bg-blue-500' onClick={() => SetCheckList(true)}>Add Checklist</Button>
          <Button type='primary' className='bg-blue-500' onClick={() => SetAddSubStage(true)}>Add Sub Stages </Button>

        </div>
      </div>)}



      {addsubstage && (
        <Form
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <div className='py-2 mt-2 space-y-2'>
                <h3 className='text-base font-medium leading-normal tracking-normal text-left'>Add Sub Stage</h3>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className='bg-white px-4 flex items-center justify-between'>
                    <h4 className='text-sm font-normal leading-snug tracking-normal w-1/4'>Sub Stage Name :</h4>
                    <Form.Item
                      {...restField}
                      name={[name, 'first']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Requirement',
                        },
                      ]}
                      style={{ margin: "10px" }}
                      className='w-full'
                    >
                      <Input placeholder='Requirement' className='' />
                    </Form.Item>
                    <DeleteFilled style={{ color: 'red' }} className='w-1/4' onClick={() => remove(name)} />
                    <Button type='primary' className='bg-blue-500' onClick={() => add()}>Add Sub Stage</Button>
                  </div>
                ))}
                <div className='bg-white px-4 flex items-center justify-between'>
                  <h4 className='text-sm font-normal leading-snug tracking-normal w-1/4'>Sub Stage Name :</h4>
                  <Form.Item style={{ margin: "10px" }} className='w-full'>
                    <Input placeholder='Requirement' className='' />
                  </Form.Item>
                  <DeleteFilled style={{ color: 'red' }} className='w-1/4' onClick={() => SetAddSubStage(false)} />
                  <Button type='primary' className='bg-blue-500' onClick={() => add()}>Add Sub Stage</Button>
                </div>
              </div>
            )}
          </Form.List>
          {/* <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      )}

      {addchecklist && (
        <Form
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <div className='py-2 mt-2 space-y-2'>
                <h3 className='text-base font-medium leading-normal tracking-normal text-left'>Create check list</h3>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className='bg-white px-4 flex items-center justify-between'>
                    <h4 className='text-sm font-normal leading-snug tracking-normal w-1/4'>Check List :</h4>
                    <Form.Item
                      {...restField}
                      name={[name, 'first']}
                      rules={[
                        {
                          required: true,
                          message: 'Missing Requirement',
                        },
                      ]}
                      style={{ margin: "10px" }}
                      className='w-full'
                    >
                      <Input placeholder='Requirement' className='' />
                    </Form.Item>
                    <DeleteFilled style={{ color: 'red' }} className='w-1/4' onClick={() => remove(name)} />
                    <Button type='primary' className='bg-blue-500' onClick={() => add()}>Add Check List</Button>
                  </div>
                ))}
                <div className='bg-white px-4 flex items-center justify-between'>
                  <h4 className='text-sm font-normal leading-snug tracking-normal w-1/4'>Check List :</h4>
                  <Form.Item style={{ margin: "10px" }} className='w-full'>
                    <Input placeholder='Requirement' className='' />
                  </Form.Item>
                  <DeleteFilled style={{ color: 'red' }} className='w-1/4' onClick={() => SetCheckList(false)} />
                  <Button type='primary' className='bg-blue-500' onClick={() => add()}>Add Check List</Button>
                </div>
              </div>
            )}
          </Form.List>
          {/* <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      )}
    </div>
  )
}

export default page