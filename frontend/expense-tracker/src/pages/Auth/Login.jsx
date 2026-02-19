import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/layouts/Inputs/input';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // const navigate = useNavigate();
  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
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
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>
          Welcome Back
        </h3>
        <p className='text-xs text-slate-700  mt-1.25 mb-6'>Please enter your credentials to continue</p>
        <form onSubmit={handleLogin}> 
          
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password (min 8 characters)"
            type="password"
            
          />
          {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            Login
          </button>
          <p className=" text-[13px] text-slate-700 mt-4">
            Don't have an account? <Link className="text-primary font-medium underline cursor-pointer" to="/signup">Sign Up</Link>
          </p>
        </form>
    </div>
  </AuthLayout>
)
}

export default Login
