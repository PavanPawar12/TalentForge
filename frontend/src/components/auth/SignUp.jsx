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
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto px-4 '>
        <form onSubmit={submitHandler} className='w-[500px] pl-12 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up </h1>
          <div className='my-2'>
            <Label>Full name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}  
              placeholder='Enter name..'
            />
          </div>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="Email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder='Enter email..'
            />
          </div>
          <div className='my-2'>
            <Label>PhoneNumber</Label>
            <Input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder='8080808080'
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder=''
            />
          </div>
         
          {/* role */}
          <div className='flex items-center justify-between'>
          <div className=''>
            <RadioGroup className="w-fit flex gap-7">
              <div className="flex items-center gap-3">
                <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          </div> 
           {/* profile image */}
          <div className='flex '>
            <div className='my-2'>
              <Label>profile</Label>
              <input 
                type="file"
                accept="image/*"
                onChange={chanageFileHandler} 
                placeholder=''
                className='cursor-pointer'
              />
            </div>
            <div className='my-2'>
              <Label>Resume pdf</Label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
              />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait </Button>:<Button type="submit" className="w-full my-4">Signup</Button>
          }
          <span>Already have an account? <Link to='/login' className='text-blue-400'>Login</Link></span>
        </form>

      </div>
    </div>


  )
}

export default SignUp



