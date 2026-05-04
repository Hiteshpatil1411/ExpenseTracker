import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';
const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
    <div> 
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
            dataKey="amount"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip  content={CustomTooltip}/>
          <Legend content={CustomLegend}/>
          {
            showTextAnchor && (
                <>
              <text
                x="50%"
                y="50%"
                dy={-25}
                textAnchor='middle'
                fill='#666'
                fontSize="14px"
              >
                {label}
              </text>
               <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor='middle'
                fill='#333'
                fontSize="26px"
                fontWeight="semi-bold"
              >
                {totalAmount}
              </text>
              </>
            )
          }
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart
