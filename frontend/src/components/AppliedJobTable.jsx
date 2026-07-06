
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A List of your applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Compony</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {

            [1,2].map((Item, index)=>(
                <TableRow key={index}>
                    <TableCell>11-10-2025</TableCell>
                    <TableCell>Frontend Developer</TableCell>
                    <TableCell>Google</TableCell>
                    <TableCell className="text-right"><Badge>Selected</Badge></TableCell>
                </TableRow>
            ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable

