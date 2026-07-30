// import React from 'react'
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { LogOut, User2 } from 'lucide-react';
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { USER_API_END_POINT } from "../utils/constant.js"
// import { setUser } from '../../redux/authSlice.js';
// import axios from 'axios'
// import { toast } from 'sonner';
// const Navbar = () => {
//   const { user } = useSelector(store => store.auth);
//   // console.log(user)
//   const dispatch = useDispatch();
//   const navigate = useNavigate()

//   const haldleLogout = async() => {
//     try {
//       const res = await axios.post(`${USER_API_END_POINT}/logout`, {
//         headers: {
//             "Content-Type": "application/json"
//         },
      
//         withCredentials: true
//     });
//       // console.log(res)
//       if (res.data.success) {
//         dispatch(setUser(null));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       console.log(error.response.data.message);
//     }
//   }
//   return (
//     <div className='bg-white'>
//       <div className='flex items-center justify-around mx-auto max-w-7xl h-16'>
//         <div>
//           <Link to="/" className='text-2xl font-bold'> Talent <span className='text-[#f83002]'>Forge</span></Link>
//         </div>
//         <div>
//           <ul className='flex font-medium items-center gap-5'>
//             {
//               user && user.role === 'recruiter' ? (
//                 <>
//                   <li><Link to="/admin/companies">Companies</Link></li>
//                   <li><Link to="/admin/jobs">Jobs</Link> </li>
//                 </>
//               ) : (
//                 <>
//                   <li><Link to="/">Home</Link></li>
//                   <li><Link to="/jobs">Jobs</Link> </li>
//                   <li> <Link to="/browse">Browse</Link> </li>
                
//                 </>
//               )
//             }
//           </ul>
//         </div>
//         {
//           !user ? (
//             <>
//               <div className="flex items-center gap-2">
//                 <Link to="/login"><Button variant="outline">Login</Button></Link>
//                 <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
//                   Sign Up
//                 </Button></Link>   
//               </div>
//             </>
//           ) : (
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Avatar>
//                   <AvatarImage
//                     src="https://github.com/shadcn.png"
//                     alt="@shadcn"

//                   />
//                 </Avatar>
//               </PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div className='flex gap-4 space-y-2'>
//                   <Avatar className="cursor-pointer">
//                     <AvatarImage
//                       src="https://github.com/shadcn.png"
//                       alt="@shadcn"
//                     />
//                   </Avatar>
//                   <div>
//                     <h4 className='font-medium'>{user?.fullname}</h4>
//                     <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
//                   </div>
//                 </div>

//                 <div className='flex flex-col text-gray-600'>
//                   {
//                     user && user.role === 'student' && (
//                       <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                         <User2 />
//                         <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
//                       </div>
//                     )
//                   }
//                   <div className='flex w-fit items-center gap-2 cursor-pointer'>
//                     <LogOut />
//                     <Button onClick={haldleLogout} variant="link">
//                       Logout
//                     </Button>                    
//                     </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )
//         }
//       </div>
//     </div>
//   )
// }

// export default Navbar



import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant.js";
import { setUser } from "../../redux/authSlice.js";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const haldleLogout = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout Failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto h-16 px-5 lg:px-0 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight transition-transform duration-300 hover:scale-105"
        >
          Talent <span className="text-[#6A38C2]">Forge</span>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link
                  to="/admin/companies"
                  className="hover:text-[#6A38C2] transition-colors duration-300"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/jobs"
                  className="hover:text-[#6A38C2] transition-colors duration-300"
                >
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-[#6A38C2] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/jobs"
                  className="hover:text-[#6A38C2] transition-colors duration-300"
                >
                  Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/browse"
                  className="hover:text-[#6A38C2] transition-colors duration-300"
                >
                  Browse
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Side */}
        {!user ? (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="outline"
                className="rounded-full px-6 hover:border-[#6A38C2] hover:text-[#6A38C2]"
              >
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button className="rounded-full px-6 bg-[#6A38C2] hover:bg-[#5c2db0]">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer h-11 w-11 ring-2 ring-transparent hover:ring-[#6A38C2] transition duration-300">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto ||
                    "https://github.com/shadcn.png"
                  }
                  alt={user?.fullname}
                />
              </Avatar>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-80 rounded-2xl border shadow-xl"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                  />
                </Avatar>

                <div>
                  <h4 className="font-semibold text-lg">
                    {user?.fullname}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {user?.profile?.bio || "Welcome to TalentForge"}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t pt-4 flex flex-col gap-2">
                {user?.role === "student" && (
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-100 transition duration-300"
                  >
                    <User2 size={18} />
                    <span>View Profile</span>
                  </Link>
                )}

                <button
                  onClick={haldleLogout}
                  className="flex items-center gap-3 rounded-lg p-3 text-red-500 hover:bg-red-50 transition duration-300"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  );
};

export default Navbar;