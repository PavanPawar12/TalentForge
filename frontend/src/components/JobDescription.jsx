import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
// import useGetAllJobs from '../hooks/useGetAllJobs';
import { useEffect } from 'react';
import { setSingleJob } from '../redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT} from './utils/constant';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);

    const { user } = useSelector( store => store.auth);

    const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const params = useParams();

    const jobId = params.id;
    const dispatch = useDispatch();

    const applyHandler = async() => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            // console.log(res.data);
            if(res.data.success) {
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    // console.log(singleJob)
    useEffect(()=> {
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});

                if(res.data.success) {
                    // dispatch(setSingleJob(res.data.jobs));
                    // dispatch(setSingleJob({
                    //     ...singleJob, applications: [
                    //         ...singleJob.applications,
                    //         { applicant: user._id }
                    //     ]
                    // }));

                    dispatch(setSingleJob(res.data.jobs));
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJobs();
    },[jobId, dispatch]); // , user?._id use it later

    return (
        <div className='max-w-7xl mx-auto my-10 pl-30 pr-20' >
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>

                    <div className='flex items-center gap-2 mt-4'>
                        <Badge  variant="ghost" className="text-blue-700 font-bold" >{singleJob?.position}</Badge>
                        <Badge variant="ghost" className="text-[#F83002] font-bold" >{singleJob?.jobType}</Badge>
                        <Badge variant="ghost" className="text-[#7209b7] font-bold" >{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null: applyHandler}
                    className={`rounded-lg ${isApplied
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-[#7209b7] hover:bg-[#5f32ad]'
                        }`}
                > 
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-500 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}</span></h1>
                <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h1>
                <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription