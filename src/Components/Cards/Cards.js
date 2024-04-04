import React, { useEffect, useState } from 'react';
import { Avatar, Card, Col, Row, Typography, Tooltip, Button, Progress, Radio, Badge } from 'antd';
import { CheckCircleOutlined, IssuesCloseOutlined, ClockCircleOutlined, StopOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;
// import { useMediaQuery } from 'react-responsive';
import api from '@/api';
import { notosans } from '@/font/font';
const DashCards = ({ }) => {
  const [size, setSize] = useState('large');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await axios.get('https://jp2malu3r8.execute-api.us-east-1.amazonaws.com/dev/org_projects_overview');
        const result = await api.get('/org_projects_overview');
        setData(result.data);
        console.log(result.data)
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>


      <Row gutter={16} className='mt-4 w-full space-x-7 gap-5' >
        <Col span={5} style={{ borderRadius: '5px', height: 'fit-content', padding: '0px',width:"full" }}>
          <Card className='h-[12rem]'
            bordered={false}
            style={{
              boxShadow: "0px 0px 5px 1px rgba(0 , 0, 0, 0.2)",
              width: "15rem",
            }}>
            <div className="flex items-center justify-between">
              <span className="text-lg leading-snug text-left text-black font-semibold">Total Projects </span>
              <CheckCircleOutlined style={{ color: '#1890FF' }} />
            </div>
            <Title level={2}>{data.total_projects}</Title>
            <p className='text-sm font-semibold leading-snug text-left'>Progress {data.percentage_completed}%</p>
            <Progress type="line" percent={data.percentage_completed} strokeWidth={4} strokeColor="#F8D236" trailColor='#F6EEFF' />
            <Paragraph className='text-sm font-normal leading-snug text-left text-black'>Total Task {data.total_tasks}</Paragraph>
          </Card>
        </Col>

        <Col span={5} style={{ borderRadius: '5px', height: 'fit-content', padding: '0px',width:"full" }}>
          <Card className=' h-[12rem]'
            style={{
              boxShadow: "0px 0px 5px 1px rgba(0 , 0, 0, 0.2)",
              width: "15rem"
            }}
            bordered={false}>
            <div className="flex items-center justify-between">
              <span className="text-lg leading-snug text-left text-black font-semibold">Completed Projects </span> <IssuesCloseOutlined style={{ color: '#52C41A' }} />

            </div>
            <Title level={2}>{data.completed}</Title>
            <Progress type="line" percent={`${Math.round((data.completed / data.total_projects) * 100)}`} strokeWidth={9} strokeLinecap='square' strokeColor="#52C41A" trailColor='#F6EEFF' />
            <Paragraph className='pt-4 text-sm font-normal leading-snug text-left text-black'>Completed Before 05 Days</Paragraph>
          </Card>
        </Col>
        <Col span={5} style={{ borderRadius: '5px', height: "fit-content", padding: '0px',width:"full"  }}>
          <Card className='h-[12rem]'
            style={{
              boxShadow: "0px 0px 5px 1px rgba(0 , 0, 0, 0.2)",
              width: "15rem"
            }}
            bordered={false}>
            <div className="flex items-center justify-between">
              <span className="text-lg leading-snug text-left text-black font-semibold">Inprogress Projects </span> <ClockCircleOutlined style={{ color: '#FAAD14' }} />
            </div>
            <Title level={2}>{data.in_progress}</Title>
            <Progress type="line" percent={`${Math.round((data.in_progress / data.total_projects) * 100)}`} strokeWidth={9} strokeLinecap='square' strokeColor="#F8D236" trailColor='#F6EEFF' />
            <Paragraph className='pt-4 text-sm font-normal leading-snug text-left text-black'>View Details</Paragraph>
          </Card>
        </Col>

        <Col span={5} style={{ borderRadius: '5px', height: 'fit-content', padding: '0px',width:"full" }}>
          <Card className='h-[12rem]'
            style={{
              boxShadow: "0px 0px 5px 1px rgba(0 , 0, 0, 0.2)",
              width: "15rem"
            }}
            bordered={false}>
            <div className="flex items-center justify-between">
              <span className="text-lg leading-snug text-left text-black font-semibold">Unassign Projects </span> <StopOutlined style={{ color: '#FF4D4F' }} />
            </div>
            <Title level={2}>{data.unassigned}</Title>
            {/* <Progress type="line" percent={30} strokeWidth={16} strokeLinecap='square' strokeColor="#FF4D4F" trailColor='#F6EEFF' /> */}
            <Progress type="line" percent={`${Math.round((data.unassigned / data.total_projects) * 100)}`} strokeWidth={16} strokeLinecap='square' strokeColor="#FF4D4F" trailColor='#F6EEFF' />
            <Paragraph className='pt-4 text-sm font-normal leading-snug text-left text-black'>view Details</Paragraph>

          </Card>
        </Col>
      </Row>
    </>
  )
};
export default DashCards;