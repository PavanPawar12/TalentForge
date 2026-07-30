import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import {USER_API_END_POINT} from '../utils/constant.js'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice.js';
import { Loader2 } from 'lucide-react';

    import heroImage from "../../assets/jobhero.png"; // your image
const SignUp = () => {

  const [input, setInput] = useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  })

  const { loading } = useSelector(store => store.auth);
  const dispatch  = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  } 
  
  const chanageFileHandler = (e) => {
    setInput({...input, file:e.target.files?.[0]});
  }
  const submitHandler = async(e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if(input.file){
      formData.append("file", input.file);
    }
    
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
       headers:{
        "Content-Type":"multipart/form-data"
       },
       withCredentials:true,
      });
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);

      if (error.response) {
          toast.error(error.response.data.message);
      } else {
          toast.error(error.message);
      }

    } finally {
        dispatch(setLoading(false)) 
    }
  }
  return (
    // <div>
    //   <Navbar />
    //   <div className='flex items-center justify-center max-w-7xl mx-auto px-4 '>
    //     <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
    //       <h1 className='font-bold text-xl mb-5'>Sign Up </h1>
    //       <div className='my-2'>
    //         <Label>Full name</Label>
    //         <Input
    //           type="text"
    //           value={input.fullname}
    //           name="fullname"
    //           onChange={changeEventHandler}  
    //           placeholder='Enter name..'
    //         />
    //       </div>
    //       <div className='my-2'>
    //         <Label>Email</Label>
    //         <Input
    //           type="Email"
    //           value={input.email}
    //           name="email"
    //           onChange={changeEventHandler}
    //           placeholder='Enter email..'
    //         />
    //       </div>
    //       <div className='my-2'>
    //         <Label>PhoneNumber</Label>
    //         <Input
    //           type="tel"
    //           value={input.phoneNumber}
    //           name="phoneNumber"
    //           onChange={changeEventHandler}
    //           placeholder='8080808080'
    //         />
    //       </div>
    //       <div className='my-2'>
    //         <Label>Password</Label>
    //         <Input
    //           type="password"
    //           value={input.password}
    //           name="password"
    //           onChange={changeEventHandler}
    //           placeholder='12345...'
    //         />
    //       </div>
         
    //       {/* role */}
    //       <div className='flex items-center justify-between'>
    //       <div className=''>
    //         <RadioGroup className="w-fit flex gap-7">
    //           <div className="flex items-center gap-3">
    //             <Input
    //             type="radio"
    //             name="role"
    //             value="student"
    //             checked={input.role === 'student'}
    //             onChange={changeEventHandler}
    //             className="cursor-pointer"
    //             />
    //             <Label htmlFor="r1">Student</Label>
    //           </div>
    //           <div className="flex items-center gap-3">
    //             <Input
    //             type="radio"
    //             name="role"
    //             value="recruiter"
    //             checked={input.role === 'recruiter'}
    //             onChange={changeEventHandler}
    //             className="cursor-pointer"
    //             />
    //             <Label htmlFor="r2">Recruiter</Label>
    //           </div>
    //         </RadioGroup>
    //       </div>
    //       </div> 
    //        {/* profile image */}
    //       <div className='flex '>
    //         <div className='my-2'>
    //           <Label>profile</Label>
    //           <input 
    //             type="file"
    //             accept="image/*"
    //             onChange={chanageFileHandler} 
    //             placeholder=''
    //             className='cursor-pointer'
    //           />
    //         </div>
    //         <div className='my-2'>
    //           <Label>Resume pdf</Label>
    //           <input
    //             type="file"
    //             accept=".pdf,.doc,.docx"
    //           />
    //         </div>
    //       </div>
    //       {
    //         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait </Button>:<Button type="submit" className="w-full my-4">Signup</Button>
    //       }
    //       <span>Already have an account? <Link to='/login' className='text-blue-400'>Login</Link></span>
    //     </form>

    //   </div>
    // </div>

<div>

  <Navbar />
<div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-violet-50 via-white to-purple-100 flex items-center justify-center px-4 py-10">
  <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

    {/* Left Side */}
    <div className="hidden lg:flex items-center justify-center bg-[#F8F5FF] p-10">
      <img
        src={heroImage}
        alt="Authentication"
        className="w-full max-w-md"
      />
    </div>

    {/* Right Side */}
    <div className="p-8 md:p-12">
      <form onSubmit={submitHandler} className="space-y-5">

        <div>
          <h1 className="text-3xl font-bold">
            Sign Up
          </h1>
          <p className="text-gray-500 mt-2">
            Create your TalentForge account
          </p>
        </div>

        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            className="h-12 rounded-xl"
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            placeholder="Enter your name"
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            className="h-12 rounded-xl"
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input
            className="h-12 rounded-xl"
            type="tel"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            className="h-12 rounded-xl"
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="Enter password"
          />
        </div>

        <div>
          <Label className="mb-3 block">Select Role</Label>

          <div className="grid grid-cols-2 gap-4">

            <label
              className={`border rounded-xl p-3 cursor-pointer text-center transition ${
                input.role === "student"
                  ? "border-[#6A38C2] bg-violet-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              Student
            </label>

            <label
              className={`border rounded-xl p-3 cursor-pointer text-center transition ${
                input.role === "recruiter"
                  ? "border-[#6A38C2] bg-violet-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                className="hidden"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />
              Recruiter
            </label>

          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label>Profile Photo</Label>
            <Input
              className="rounded-xl cursor-pointer"
              type="file"
              accept="image/*"
              onChange={chanageFileHandler}
            />
          </div>

          <div className="space-y-2">
            <Label>Resume</Label>
            <Input
              className="rounded-xl cursor-pointer"
              type="file"
              accept=".pdf,.doc,.docx"
            />
          </div>

        </div>

        {loading ? (
          <Button className="w-full h-12 rounded-xl">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button className="w-full h-12 rounded-xl bg-[#6A38C2] hover:bg-[#5a2db0]">
            Sign Up
          </Button>
        )}

        <p className="text-center text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="ml-2 text-[#6A38C2] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </form>
    </div>

  </div>
</div>
</div>
  )
}

export default SignUp



