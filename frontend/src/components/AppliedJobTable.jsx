import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'

const statusVariant = (status) => {
  switch (status) {
    case 'accepted':
      return 'bg-green-600';
    case 'rejected':
      return 'bg-red-600';
    default:
      return 'bg-gray-600';
  }
}

const AppliedJobTable = () => {
  const { appliedJobs, loading, error } = useGetAppliedJobs();

  if (loading) {
    return <p className="text-sm text-gray-500 py-4">Loading applied jobs...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500 py-4">{error}</p>;
  }

  return (
    <div>
      <Table>
        <TableCaption>A List of your applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
            appliedJobs.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500">
                        You haven&apos;t applied to any jobs yet.
                    </TableCell>
                </TableRow>
            ) : (
                appliedJobs.map((application) => (
                    <TableRow key={application._id}>
                        <TableCell>{application.createdAt?.split("T")[0]}</TableCell>
                        <TableCell>{application.job?.title || "—"}</TableCell>
                        <TableCell>{application.job?.company?.name || "—"}</TableCell>
                        <TableCell className="text-right">
                            <Badge className={`${statusVariant(application.status)} capitalize`}>
                                {application.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))
            )
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
