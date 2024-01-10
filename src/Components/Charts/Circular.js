import React from 'react';
import { Progress, Space } from 'antd';
const CircularProgress = () => (
    <Space wrap>
        <Progress type="circle" percent={75} format={(percent) => `${percent}%`} strokeWidth={20} size={250} />
    </Space>
);
export default CircularProgress;