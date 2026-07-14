import React from 'react'
import { JOB_API_END_POINT } from '../components/utils/constant.js'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../redux/jobSlice'
const useGetAllAdminJobs = () => {

    const dispatch = useDispatch();
    useEffect(()=> {
        const fetchAlladminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials:true });
                if(res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAlladminJobs();
    },[])
}

export default useGetAllAdminJobs;
