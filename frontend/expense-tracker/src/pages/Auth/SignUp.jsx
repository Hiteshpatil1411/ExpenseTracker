import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'

// import { useNavigate } from 'react-router-dom';
import ProfilePhotoSelector from '../../components/layouts/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import Input from '../../components/layouts/Inputs/input';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [fullName,setFullName]=useState("");
  const [profilePic,setProfilePic]=useState(null)
  const[email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const[error,setError]= useState(null)
  const handleSignUp = async(e)=>{
    e.preventDefault();
    let profileImageUrl="";
    if(!fullName){
      setError('Please Enter Full Name')
      return;
    }
        if(!validateEmail(email)){
          setError('Please Enter Vaild Email')
          return;
        }
        if(!password){
          setError('Plese Enter Password');
          return;
        }
        setError(null); // Clear previous errors
  }

  const navigate=useNavigate();

  
  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semmibold text-black">Create An Account</h3>
        <p className="text-xs text-slate-700 mb-6 mt-2.5">Join Us Today by Entering your Details Below.</p>
        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Enter Full Name"
            placeholder="Enter your Full Name"
            type="text"
            
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            
          />
          <div className="col-span-2">          
            <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password (min 8 characters)"
            type="password"
            
          />
          </div>

          {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
          
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          <p className=" text-[13px] text-slate-700 mt-4">
             Already have an account? <Link className="text-primary font-medium underline cursor-pointer" to="/login">Login</Link>
          </p>
          </div>
        </form>
      </div>

    </AuthLayout>
  )
}

export default SignUp
