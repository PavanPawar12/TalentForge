import { useEffect, useState } from 'react'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../components/utils/constant.js'

const useGetAppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    setAppliedJobs(res.data.application || []);
                }
            } catch (err) {
                console.log(err);
                setError(err.response?.data?.message || "Failed to load applied jobs");
            } finally {
                setLoading(false);
            }
        }
        fetchAppliedJobs();
    }, [])

    return { appliedJobs, loading, error };
}

export default useGetAppliedJobs;
