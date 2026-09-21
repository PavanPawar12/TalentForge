

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { setUser } from "../redux/authSlice";
import  {toast}  from 'sonner';
import { USER_API_END_POINT } from "./utils/constant";
const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null
    });

    // Sync form with latest user data every time the dialog opens
    useEffect(() => {
        if (open && user) {
            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phoneNumber: user?.phoneNumber || "",
                bio: user?.profile?.bio || "",
                skills: user?.profile?.skills?.join(", ") || "",
                file: null
            });
        }
    }, [open, user]);

    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name]: e.target.value});
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({...input, file})
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if(input.file){
          formData.append("file", input.file);
        }
        try {
          setLoading(true);
          const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
            headers : {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          });
          if(res.data.success) {
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
            setOpen(false);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
          setLoading(false);
        }
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form className="space-y-5" onSubmit={submitHandler}>
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              name="fullname"
              placeholder="Enter your name"
              className="col-span-3"
              value={input.fullname}
              onChange={changeEventHandler}
            />
          </div>
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              email
            </Label>
            <Input
              id="email"
              type="email"
               name="email"
              placeholder="Enter your email"
              className="col-span-3"
               value={input.email}
               onChange={changeEventHandler}
            />
          </div>

          {/* Phone Number */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              name="phoneNumber"
              placeholder="Enter phone number"
              className="col-span-3"
               value={input.phoneNumber}
               onChange={changeEventHandler}
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="bio" className="text-right pt-2">
              Bio 
            </Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Write something about yourself..."
              className="col-span-3"
              value={input.bio}
              onChange={changeEventHandler}
            />
          </div>

          {/* Skills */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">
              Skills
            </Label>
            <Input
              id="skills"
              type="text"
              name="skills"
              placeholder="React, Node.js, MongoDB"
              className="col-span-3"
              value={input.skills}
              onChange={changeEventHandler}
            />
          </div>

          {/* Resume / Photo (backend stores PDFs as resume, images as profile photo) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              Resume / Photo
            </Label>
            <Input
              id="file"
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              className="col-span-3"
              onChange={fileChangeHandler}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >

                Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;