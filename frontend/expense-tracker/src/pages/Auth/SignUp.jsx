import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'



import { validateEmail } from '../../utils/helper';

import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import UserProvider,{ UserContext } from '../../context/UserContext'
import uploadImage from '../../utils/uploadImage';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import Input from '../../components/Inputs/Input';

const SignUp = () => {
  const [fullName,setFullName]=useState("");
  const [profilePic,setProfilePic]=useState(null)
  const[email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const { updateUser } = useContext(UserContext);

  const navigate=useNavigate();
  const[error,setError]= useState(null)
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
        setError('Please Enter Full Name');
        return;
    }
    if (!validateEmail(email)) {
        setError('Please Enter Valid Email');
        return;
    }
    if (!password) {
        setError('Please Enter Password');
        return;
    }

    setError("");

    let profileImageUrl = "";

    try {
        // Upload profile pic first if selected
        if (profilePic) {
           const imgUploadRes =  await uploadImage(profilePic);
           profileImageUrl = imgUploadRes.imageUrl||"";
        }

        // Register
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            fullName,
            email,
            password,
            profileImageUrl,
           
        });

        const { token, user } = response.data;

        if (token) {
            localStorage.setItem("token", token);
            updateUser(user);
            navigate("/dashboard");
        }
    } catch (err) {
        if (err.response && err.response.data.message) {
            setError(err.response.data.message);
        } else {
            setError("An error occurred. Please try again later.");
        }
    }
};


  
  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl  font-bold text-black">Create An Account</h3>
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
