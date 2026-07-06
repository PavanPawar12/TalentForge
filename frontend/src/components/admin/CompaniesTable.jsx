// import React from 'react'
// import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'

// const CompaniesTable = () => {
//     const { companies } = useSelector(store => store.company)
//     return (
//         <div>
//             <Table>
//                 <TableCaption> A List of your recent registed companues</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Logo</TableHead>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {
//                         companies.length <= 0 ? <span>You haven't registered any company yet</span> : (
//                             <div>
//                                 {
//                                     companies?.map((company) => {
//                                         return (
//                                             <div>
//                                                 <TableCell>
//                                                     <Avatar>
//                                                         <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILstzE4n4jxRaa2LcTb5Uf_JKLVtXIZjL3w&s" />
//                                                     </Avatar>
//                                                 </TableCell>
//                                                 <TableCell>Company Name</TableCell>
//                                                 <TableCell>18-07-2024</TableCell>
//                                                 <TableCell className="text-right cursor-pointer">
//                                                     <Popover>
//                                                         <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
//                                                         <PopoverContent className='w-32'>
//                                                             <div className='flex items-center gap-3 '>
//                                                                 <Edit2 className='w-4 ' />
//                                                                 <span>Edit</span>
//                                                             </div>
//                                                         </PopoverContent>
//                                                     </Popover>
//                                                 </TableCell>

//                                             </div>

//                                         )
//                                     })
//                                 }
//                             </div>
//                         )
//                     }
//                 </TableBody>
//             </Table>
//         </div>
//     )
// }

// export default CompaniesTable


import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies = [], searchCompanyByText} = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies)

  const navigate = useNavigate();
  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if(!searchCompanyByText) {
        return true
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany) 
  },[companies, searchCompanyByText])
  return (
    <Table>
      <TableCaption>
        A list of your recently registered companies
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {companies.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              You haven't registered any company yet.
            </TableCell>
          </TableRow>
        ) : (
          companies.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={
                      company.logo ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILstzE4n4jxRaa2LcTb5Uf_JKLVtXIZjL3w&s"
                    }
                  />
                </Avatar>
              </TableCell>

              <TableCell>{company.name}</TableCell>

              <TableCell>
                {new Date(company.createdAt.split("T")[0]).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>

                  <PopoverContent className="w-32">
                    <div  onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 cursor-pointer">
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

export default CompaniesTable;