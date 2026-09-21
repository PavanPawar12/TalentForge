import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { setSingleJob } from '../redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT} from './utils/constant';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector( store => store.auth);

    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);
    const [applying, setApplying] = useState(false);

    const isApplied = singleJob?.applications?.some(application => {
        const applicantId = typeof application.applicant === 'object'
            ? application.applicant?._id
            : application.applicant;
        return applicantId === user?._id;
    }) || singleJob?.applications?.includes?.(user?._id) || false;

    const params = useParams();

    const jobId = params.id;
    const dispatch = useDispatch();

    const fetchSingleJob = async () => {
        try {
            setLoading(true);
            setLoadError(null);
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});

            if(res.data.success) {
                // Backend returns `job` (and `jobs` alias for compatibility)
                dispatch(setSingleJob(res.data.job || res.data.jobs));
            }
        } catch (error) {
            console.log(error)
            setLoadError(error.response?.data?.message || "Failed to load job details");
        } finally {
            setLoading(false);
        }
    }

    const applyHandler = async() => {
        try {
            setApplying(true);
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if(res.data.success) {
                toast.success(res.data.message);
                // Refresh job so "Already Applied" and applicant count update
                await fetchSingleJob();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply for this job");
        } finally {
            setApplying(false);
        }
    }

    useEffect(()=> {
        fetchSingleJob();
    },[jobId]); // eslint-disable-next-line react-hooks/exhaustive-deps

    if (loading) {
        return (
            <div>
                <Navbar />
                <p className='max-w-7xl mx-auto my-10 px-6 text-gray-500'>Loading job details...</p>
            </div>
        );
    }

    if (loadError || !singleJob) {
        return (
            <div>
                <Navbar />
                <p className='max-w-7xl mx-auto my-10 px-6 text-red-500'>{loadError || "Job not found."}</p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-6 lg:px-10' >
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        {singleJob?.company?.name && (
                            <p className='text-sm text-gray-500 mt-1'>{singleJob.company.name}</p>
                        )}

                        <div className='flex items-center gap-2 mt-4'>
                            <Badge  variant="ghost" className="text-blue-700 font-bold" >{singleJob?.position} Positions</Badge>
                            <Badge variant="ghost" className="text-[#F83002] font-bold" >{singleJob?.jobType}</Badge>
                            <Badge variant="ghost" className="text-[#7209b7] font-bold" >{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                    onClick={isApplied || applying ? null : applyHandler}
                    disabled={isApplied || applying}
                        className={`rounded-lg ${isApplied
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-[#7209b7] hover:bg-[#5f32ad]'
                            }`}
                    >
                        {isApplied ? 'Already Applied' : applying ? 'Applying...' : 'Apply Now'}
                    </Button>
                </div>
                <h1 className='border-b-2 border-b-gray-500 font-medium py-4'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Requirements: <span className='pl-4 font-normal text-gray-800'>{Array.isArray(singleJob?.requirements) ? singleJob.requirements.join(", ") : singleJob?.requirements}</span></h1>
                    <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
