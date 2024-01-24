"use client"
import React, { useState } from 'react';
import { Button, Steps, Popover } from 'antd';

const { Step } = Steps;

const WorkViewDetails = () => {
    const [current, setCurrent] = useState(0);
  const [popoverVisible, setPopoverVisible] = useState(true);

    const onChange = (value) => {
      console.log('onChange:', value);
      setCurrent(value);
    };
  
  
    const renderStepContent = (index) => (
        <div>
          {/* Add specific content for each step */}
          {index === 0 && <h2>Requirements</h2>}
          {index === 1 && <h2>Mock Development</h2>}
          {index === 2 && <h2>Actual Development</h2>}
          {index === 3 && <h2>CI/CD Tests</h2>}
          {index === 4 && <h2>Staging/Release</h2>}
          {index === 5 && <h2>Publish/Operate</h2>}

        </div>
      );
      const handleButtonClick = () => {
        setPopoverVisible(!popoverVisible);
      };
  
    return (
      <>
        {/* <Button onClick={handleButtonClick}>Hover Button</Button> */}
        <Steps
          current={current}
          onChange={onChange}
        >
          {[0, 1, 2,3,4,5].map((index) => (
            <Step
              key={index}
              title={
                <Popover
                content={renderStepContent(index)}
                placement="top"
                visible={popoverVisible}              >

                     <span>{`Step ${index + 1}`}</span>
              </Popover>
              }
          
            />
          ))}
        </Steps>
  
      </>
    );
  };
  
export default WorkViewDetails
