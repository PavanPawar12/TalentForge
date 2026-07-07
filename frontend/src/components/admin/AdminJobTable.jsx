


// import React from "react";
// import {
//   Table,
//   TableCaption,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "../ui/table";

// import { Avatar, AvatarImage } from "../ui/avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../ui/popover";

// import { Edit2, MoreHorizontal } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminJobTable = () => {
//   const { companies = [], searchCompanyByText} = useSelector((store) => store.company);
//   const { allAdminJobs } = useSelector((store) => store.job)
//   const [filterJobs, setFilterJob ] = useState(allAdminJobs)

//   const navigate = useNavigate();
//   useEffect(() => {
//     const filteredCompany = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
//       if(!searchCompanyByText) {
//         return true 
//       };
//       return job?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
//     });
//     setFilterJob(filteredCompany) 
//   },[companies, searchCompanyByText])
//   return (
//     <Table>
//       <TableCaption>
//         A list of your recent Posted Jobs
//       </TableCaption>

//       <TableHeader>
//         <TableRow>
//           <TableHead>Company Name</TableHead>
//           <TableHead>Role</TableHead>
//           <TableHead>Date</TableHead>
//           <TableHead className="text-right">Action</TableHead>
//         </TableRow>
//       </TableHeader>

//       <TableBody>
//         {filterJobs.length === 0 ? (
//           <TableRow>
//             <TableCell colSpan={4} className="text-center">
//               You haven't registered any company yet.
//             </TableCell>
//           </TableRow>
//         ) : (
//           filterJobs.map((job) => (
//             <TableRow key={job._id}>
             

//               <TableCell>{job.name}</TableCell>

//               <TableCell>
//                 {job.role}
//               </TableCell>

//               <TableCell className="text-right">
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <MoreHorizontal className="cursor-pointer" />
//                   </PopoverTrigger>

//                   <PopoverContent className="w-32">
//                     <div  onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 cursor-pointer">
//                       <Edit2 className="w-4 h-4" />
//                       <span>Edit</span>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </TableCell>
//             </TableRow>
//           ))
//         )}
//       </TableBody>
//     </Table>
//   );
// };

// export default AdminJobTable;



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

import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobTable = () => {
  const { allAdminJobs = [] } = useSelector((store) => store.job);
  const { searchCompanyByText } = useSelector((store) => store.company);

  const [filterJobs, setFilterJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchCompanyByText) return true;

      return job.title
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
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
              <TableCell>{job.name}</TableCell>

              <TableCell>{job.title}</TableCell>

              <TableCell>
                {new Date(job.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>

                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
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