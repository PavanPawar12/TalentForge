// import React from "react";
// import { useSelector } from "react-redux";

// const ApplicantsTable = () => {

//     const { applicants } = useSelector((store) => store.application);
    
//     console.log("Redux Data: ", applicants)
//     return (
//         <div className="overflow-x-auto border rounded-md">

//             <table className="w-full">

//                 <thead className="bg-gray-100">

//                     <tr>
//                         <th className="p-3 text-left">Name</th>
//                         <th className="p-3 text-left">Email</th>
//                         <th className="p-3 text-left">Phone</th>
//                         <th className="p-3 text-left">Resume</th>
//                         <th className="p-3 text-left">Status</th>
//                     </tr>

//                 </thead>

//                 <tbody>

//                     {applicants?.applications?.map((item) => (

//                         <tr key={item._id} className="border-t">

//                             <td className="p-3">
//                                 {item.applicant.fullname}
//                             </td>

//                             <td className="p-3">
//                                 {item.applicant.email}
//                             </td>

//                             <td className="p-3">
//                                 {item.applicant.phoneNumber}
//                             </td>

//                             <td className="p-3">

//                                 <a
//                                     href={item.applicant.profile.resume}
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="text-blue-600"
//                                 >
//                                     View Resume
//                                 </a>

//                             </td>

//                             <td className="p-3">

//                                 <select
//                                     defaultValue={item.status}
//                                     className="border rounded px-2 py-1"
//                                 >
//                                     <option>pending</option>
//                                     <option>accepted</option>
//                                     <option>rejected</option>
//                                 </select>

//                             </td>

//                         </tr>

//                     ))}

//                 </tbody>

//             </table>

//         </div>
//     );
// };

// export default ApplicantsTable;


import React from "react";
import { useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.applicant?.fullname}</TableCell>

                <TableCell>{item.applicant?.email}</TableCell>

                <TableCell>{item.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-500">No Resume</span>
                  )}
                </TableCell>

                <TableCell>
                  <select
                    defaultValue={item.status}
                    className="border rounded-md px-2 py-1 outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;