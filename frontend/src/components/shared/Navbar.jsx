import React from 'react'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from "../utils/constant.js"
import { setUser } from '../../redux/authSlice.js';
import axios from 'axios'
import { toast } from 'sonner';
const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  // console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const haldleLogout = async() => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {
        headers: {
            "Content-Type": "application/json"
        },
      
        withCredentials: true
    });
      // console.log(res)
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  }
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-around mx-auto max-w-7xl h-16'>
        <div>
          <Link to="/" className='text-2xl font-bold'> Talent <span className='text-[#f83002]'>Forge</span></Link>
        </div>
        <div>
          <ul className='flex font-medium items-center gap-5'>
            {
              user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link> </li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link> </li>
                  <li> <Link to="/browse">Browse</Link> </li>
                
                </>
              )
            }
          </ul>
        </div>
        {
          !user ? (
            <>
              <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Sign Up
                </Button></Link>   
              </div>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"

                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className='flex gap-4 space-y-2'>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className='flex flex-col text-gray-600'>
                  {
                    user && user.role === 'student' && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                      </div>
                    )
                  }
                  <div className='flex w-fit items-center gap-2 cursor-pointer'>
                    <LogOut />
                    <Button onClick={haldleLogout} variant="link">
                      Logout
                    </Button>                    
                    </div>
                </div>
              </PopoverContent>
            </Popover>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
