import React from 'react'
import { JOB_API_END_POINT } from '../components/utils/constant'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAlljobs } from '../redux/jobSlice'
const useGetAllJobs = () => {

    const dispatch = useDispatch();
    useEffect(()=> {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`, {withCredentials:true});
                if(res.data.success) {
                    dispatch(setAlljobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs;
