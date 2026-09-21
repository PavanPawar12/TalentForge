import React from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import useGetApplicants from "@/hooks/useGetApplicants";

const Applicants = () => {
    const { id } = useParams();

    useGetApplicants(id);

    return (
        <div>
            <Navbar />

            <div className="max-w-7xl mx-auto my-8">
                <h1 className="text-2xl font-bold mb-6">
                    Applicants
                </h1>

                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;