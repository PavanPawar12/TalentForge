import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { setApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "../components/utils/constant.js";
import { setApplicants } from "../redux/applicationSlice.js";
// import { APPLICATION_API_END_POINT } from "@/utils/constant";

const useGetApplicants = (jobId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${jobId}/applicants`,
                    {
                        withCredentials: true,
                    }
                );
                console.log("Response:", res.data);
                console.log("Success:", res.data.success);
                if (res.data.success) {
                    dispatch(setApplicants(res.data.job));
                } 
            } catch (error) {
                console.log(error);
            }
        };

        if (jobId) {
            fetchApplicants();
        }
    }, [jobId, dispatch]);
};

export default useGetApplicants;