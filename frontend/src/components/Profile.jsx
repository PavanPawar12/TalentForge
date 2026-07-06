import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'

// const skills = ["Html", "css", "Js","react js"]
// const isResume = true;
const Profile = () => {

    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>

                    <div className='flex items-center gap-4'>

                        <Avatar className="h-24 w-24 ">
                            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILstzE4n4jxRaa2LcTb5Uf_JKLVtXIZjL3w&s" alt="alt" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant='outline'><Pen /></Button>
                </div>
                <div>
                    <div className='my-5'>
                        <div className='flex items-center gap-3 my-2'>
                            <Mail />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <Contact />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className='my-5'>
                        <h1>Skills</h1>
                        <div className='flex items-center gap-1'>
                            {
                                user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                            }
                        </div>
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label className="text-md font-bold">Resume</Label>
                        {/* {
                            isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a>: <span>NA</span>
                        } */}
                        {user?.profile?.resume ? (
                            <a
                                href={user.profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                {user.profile.resumeOriginalName}
                            </a>
                        ) : (
                            <span>NA</span>
                        )}

                    </div>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1>All applied job</h1>
                {/* application job */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile;  