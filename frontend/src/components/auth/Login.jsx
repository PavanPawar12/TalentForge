import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant.js";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice.js";
import { Loader2 } from "lucide-react";
import heroImage from "../../assets/jobhero.png";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // console.log(res.data)
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    // <div>
    //   <Navbar />
    //   <div className='flex items-center justify-center max-w-7xl '>
    //     <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
    //       <h1 className='font-bold text-xl mb-5'>Login </h1>

    //       <div className='my-2'>
    //         <Label>Email</Label>
    //         <input
    //           type="Email"
    //           value={input.email}
    //           name="email"
    //           onChange={changeEventHandler}
    //           placeholder='Enter email..'
    //         />
    //       </div>

    //       <div className='my-2'>
    //         <Label>Password</Label>
    //         <input
    //           type="password"
    //           value={input.password}
    //           name="password"
    //           onChange={changeEventHandler}
    //           placeholder='12345...'
    //         />
    //       </div>

    //       {/* role */}
    //       <div className='flex items-center justify-between'>
    //         <div className=''>
    //           <RadioGroup className="w-fit flex gap-7">
    //             <div className="flex items-center gap-3">
    //               <Input
    //                 type="radio"
    //                 name="role"
    //                 value="student"
    //                 checked={input.role === 'student'}
    //                 onChange={changeEventHandler}
    //                 className="cursor-pointer"
    //               />
    //               <Label htmlFor="r1">Student</Label>
    //             </div>
    //             <div className="flex items-center gap-3">
    //               <Input
    //                 type="radio"
    //                 name="role"
    //                 value="recruiter"
    //                 checked={input.role === 'recruiter'}
    //                 onChange={changeEventHandler}
    //                 className="cursor-pointer"
    //               />
    //               <Label htmlFor="r2">Recruiter</Label>
    //             </div>
    //           </RadioGroup>
    //         </div>
    //       </div>
    //       {
    //         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait </Button>:<Button type="submit" className="w-full my-4">Login</Button>
    //       }
    //       <span>Don't have an account? <Link to='/signup' className='text-blue-400'>Signup</Link></span>
    //     </form>

    //   </div>
    // </div>
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-violet-50 via-white to-purple-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Left */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-[#F8F5FF] p-10">
            <img src={heroImage} alt="Signup" className="w-full max-w-md" />

            <h2 className="text-3xl font-bold mt-8 text-center">
              Find Your Dream Job
            </h2>

            <p className="text-gray-500 text-center mt-3">
              Join thousands of students and recruiters on TalentForge.
            </p>
          </div>

          {/* Right */}
          <div className="p-8 lg:p-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold">Login</h1>
              <p className="text-gray-500 mt-2">Welcome to TalentForge</p>
            </div>
              <div>
                <Label>Email</Label>
                <Input
                  className="h-12 rounded-xl mt-2"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  className="h-12 rounded-xl mt-2"
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
                    className={`border rounded-xl p-3 text-center cursor-pointer transition ${
                      input.role === "student"
                        ? "bg-violet-50 border-[#6A38C2] text-[#6A38C2]"
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
                    className={`border rounded-xl p-3 text-center cursor-pointer transition ${
                      input.role === "recruiter"
                        ? "bg-violet-50 border-[#6A38C2] text-[#6A38C2]"
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

  

              {loading ? (
                <Button className="w-full h-12 rounded-xl">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button className="w-full h-12 rounded-xl bg-[#6A38C2] hover:bg-[#5b2fb0]">
                  login
                </Button>
              )}

              <p className="text-center text-gray-500">
                Already have an account?
                <Link
                  to="/signup"
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
  );
};

export default Login;
