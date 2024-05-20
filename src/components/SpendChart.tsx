"use client"
import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
  } from "chart.js";
  import { useEffect, useState } from "react";
  import { Bar, Line, Pie } from "react-chartjs-2";
  
  // Register ChartJS components using ChartJS.register
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );
  
 // @ts-ignore

const SpendChart = ({data:dataset,...props}) => {
    const data = {
        labels: dataset.map((entry: any) => entry.day),
        datasets: [
          {
            label: "Price (USD)",
            data: dataset.map((entry: any) => entry.amount),
            borderColor: "orange",
            borderWidth: 2,
            pointRadius: 4,
          },
        ],
      };
  return (
        <div className='p-3'>
            <div className='flex justify-between mb-3'>
                <div className='text-sm self-center'>Expenses</div>
                <div className='text-xs text-white bg-primary-color p-2 px-3 rounded-full'>Weekly ^</div>
            </div>
          {/* <Line id='LineChart' data={data} />
          
          <Bar id='barChart' data={data} /> */}
          <img src="/chart.png" alt=""  />
        </div>
      
  )
}

export default SpendChart

