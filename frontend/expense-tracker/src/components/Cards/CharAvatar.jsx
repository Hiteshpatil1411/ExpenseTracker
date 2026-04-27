import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({ fullName, width, height, style }) => {
  

  return (
    <div className={`${width|| 'w-20'} ${height|| 'h-20'} ${style|| 'text-xl'} bg-gray-300 flex items-center justify-center rounded-full mb-4 text-gray-900 font-medium `}>
      <span className={style}>{getInitials(fullName)|| ""}</span>
    </div>
  )
}

export default CharAvatar
