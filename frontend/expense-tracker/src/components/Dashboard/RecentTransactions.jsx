import React from 'react'
import { LuAArrowDown, LuArrowRight } from 'react-icons/lu'

import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
const RecentTransactions = ({  transactions, onSeeMore }) => {
  return (
   <div className='card '>
  <div className="flex items-center justify-between">
    <h5 className="text-lg font-semibold">Recent Transactions</h5>
    <button onClick={onSeeMore} className="card-btn hover:text-blue-700">
      See All <LuArrowRight className='text-base'/>
    </button>
  </div>

  <div className="mt-3">
    {transactions?.slice(0, 5)?.map((transaction) => (
      <TransactionInfoCard
        key={transaction._id}
        title={transaction.type === 'expense' ? transaction.category : transaction.source}
        icon={transaction.icon}
        date={moment(transaction.date).format("Do MMM YYYY")}
        amount={transaction.amount}
        type={transaction.type}
        hideDeleteBtn
      />
    ))}
  </div>
</div>
  )
}

export default RecentTransactions
