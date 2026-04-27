import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'
const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false);

     const toggleShowPassword = () => {
       setShowPassword((prevState) => !prevState);
     };
  return (
    <div>
        <label className="text-[13px] text-slate-800 ">{label}</label>
        <div className="input-box">
            <input 
              type={type=='password' ? showPassword ? 'text' : 'password' : type} 
              value={value}
              onChange={(e)=>onChange(e)}
              placeholder={placeholder}
              className='w-full bg-transparent outline-none'
              />
              {type === 'password' && (
                  <>
                {showPassword ? 
                    <FaRegEyeSlash size={22} onClick={()=>toggleShowPassword()} className='text-slate-500 cursor-pointer' />
                 : <FaRegEye size={22} onClick={()=>toggleShowPassword()} className='text-primary cursor-pointer' />}
              </>
            )}
        </div>
      
    </div>
  )
}

export default Input
