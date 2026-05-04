import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,Legend,Cell, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data }) => {
    //function to alrernate bar colors
    const getBarColor = (index) => {
        return index %2 === 0 ? "#875cf5" : "#cfbefb";
      }


    const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className=" text-xs font-semibold text-purple-800 mb-1">
          {payload[0].payload.category}
        </p>
        <p className="text-sm text-gray-600">
          Amount:{" "}
          <span className="text-sm font-medium text-gray-900">
            ${payload[0].payload.amount.toFixed(2)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};
  return (
    <div className='bg-white mt-8'>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{ fontSize: 12 ,fill:"#555"}} stroke='none' />
          <YAxis tick={{ fontSize: 12 ,fill:"#555"}} stroke='none'/>
          <Tooltip content={CustomTooltip} />
          <Legend  />
          <Bar dataKey="amount" fill="#FF8042" activeDot={{r:8,fill:"yellow"}} 
          activeStyle={{ fill:"green" }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
