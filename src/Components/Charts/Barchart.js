"use client";
import api from "@/api";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
const accessToken = getAccessTokenFromCookie();
const Barchart = () => {
    const  [data, setData] = useState([])
  const axios = require("axios");
useEffect(()=>{
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://sux5ckl6l6.execute-api.us-east-1.amazonaws.com/stage/projects_usecase_overview",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      setData(response.data);
    //   console.log("name", response.data[0].project_name)
    })
    .catch((error) => {
      console.log(error);
    });
} ,[]); //componentDidMount

// const data = useMemo(() => {
//     if (!fetchdata) return []; // return empty array if fetchdata is not available yet
  
//     return fetchdata.map(item => ({
//       name: item.project_name,
//       incomplete: item.incomplete,
//       complete: item.completed
//     }));
//   }, [fetchdata]);
  return (
    <>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="project_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="completed"
            fill="#FF85C0"
            barSize={35}
            activeBar={<Rectangle fill="#FF85C0" stroke="blue" barSize={10} />}
          />
          <Bar
            dataKey="incomplete"
            fill="#B37FEB"
            barSize={35}
            activeBar={
              <Rectangle fill="#B37FEB" stroke="purple" barSize={20} />
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Barchart;
