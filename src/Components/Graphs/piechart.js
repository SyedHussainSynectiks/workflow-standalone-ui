import React from "react";
import { Progress, Space } from "antd";
const CircularProgress = () => (
    <Space wrap>
        <Progress
            type="circle"
            percent={44}
            format={(percent) => `${percent}%`}
            strokeWidth={13}
            size={120}
        />
    </Space>
);
export default CircularProgress;