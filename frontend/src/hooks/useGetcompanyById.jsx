import React from 'react'
import { JOB_API_END_POINT } from '../components/utils/constant'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySclice'
const useGetcompanyById = (companyId) => {

    const dispatch = useDispatch();
    useEffect(()=> {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get${companyId}`, {withCredentials:true});
                if(res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default useGetcompanyById
