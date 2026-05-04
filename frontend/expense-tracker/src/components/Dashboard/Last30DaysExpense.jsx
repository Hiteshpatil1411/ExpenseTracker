import React, { useEffect, useMemo, useState } from 'react'

import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Cards/CustomBarChart'

const Last30DaysExpense = ({ data }) => {
    

    const chartData = useMemo(() => prepareExpenseBarChartData(data), [data])
  return (
    <div className='card col-span-1'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data={chartData} />
      
    </div>
  )
}

export default Last30DaysExpense
