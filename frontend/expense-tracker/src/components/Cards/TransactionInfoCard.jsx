import React from 'react'
import { LuUtensils,LuTrendingDown,LuTrendingUp,LuTrash2 } from 'react-icons/lu'

const TransactionInfoCard = ({  title, icon, date, amount, type, hideDeleteBtn }) => {
        const  getAmountStyles = (type) => type === 'income' ? 'bg-green-100 text-green-500' : 'bg-red-50 text-red-500';
          
            
  return (
    <div className='group relative flex items-center gap-4  p-3  rounded-lg border border-gray-200/50 shadow-sm shadow-gray-100 hover:shadow-md hover:bg-gray-200 transition duration-150'>
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 rounded-full drop-shadow-xl bg-gray-400/70"> 
            {icon?(
              <img src={icon} alt={title} className="w-6 h-6 object-contain" />
            ):(
              <LuUtensils />
            )}
        </div>    


        <div className="flex-1 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700 font-semibold">{title}</p>
            <p className="text-xs text-gray-400 mt-1">{date}</p>
          </div>

          <div className="flex items-center gap-2">
            {!hideDeleteBtn && (
              <button className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-400 hover:text-red-500" onClick={() => console.log('Delete transaction with id:')}>
                <LuTrash2 size={18}/></button>    )}

                <div className={`flex items-center gap-2 px-3 py-1 rounded-nmd  ${getAmountStyles(type)}`}>
                  <h6 className="tex-xs font-semibold ">
                    {type === 'income' ? "+" : "-"}${amount}
                  </h6>
                  {type === 'income' ? (
                    <LuTrendingUp className="text-green-500" />
                  ) : (
                    <LuTrendingDown className="text-red-500" />
                  )}
                </div>

            </div>  


        </div>
      
    </div>
  )
}

export default TransactionInfoCard
