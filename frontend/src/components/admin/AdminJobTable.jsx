import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "../utils/constant";

const AdminJobTable = () => {
  const { allAdminJobs = []} = useSelector((store) => store.job);
  const { searchCompanyByText } = useSelector((store) => store.company);
  const [filterJobs, setFilterJobs] = useState([]);

  const navigate = useNavigate();

  const deleteHandler = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job? This will also remove its applications.")) {
      return;
    }
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        // Refresh list by removing deleted job locally is handled on next fetch;
        // simplest reliable refresh:
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchCompanyByText) return true;

      return job?.title?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });

    setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchCompanyByText]);
   
  return (
    <Table>
      <TableCaption>
        A list of your recently posted jobs
      </TableCaption>
      
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filterJobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No jobs found.
            </TableCell>
          </TableRow>
        ) : (
          filterJobs.map((job) => (
              
            <TableRow key={job._id}>
              <TableCell>{job.company?.name}</TableCell>

              <TableCell>{job.title}</TableCell>

              <TableCell>
                {new Date(job.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>

                  <PopoverContent className="w-36">
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                      className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicant`)}
                      className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 rounded"
                    >
                      <Eye className="w-4 h-4"/>
                      <span>Applicants</span>
                    </div>
                    <div
                      onClick={() => deleteHandler(job._id)}
                      className="flex items-center gap-2 cursor-pointer p-1 hover:bg-red-50 text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4"/>
                      <span>Delete</span>
                    </div>

                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AdminJobTable;