import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { filterJobsByText } from '../lib/jobFilter'

const Brows = () => {
    useGetAllJobs();
    const { allJobs, searchJobByText } = useSelector(store => store.job);

    const filteredJobs = filterJobsByText(allJobs, searchJobByText);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-5 px-4">
        <h1 className='font-bold text-xl my-10'>
          {searchJobByText
            ? <>Search Results for &quot;{searchJobByText}&quot; ({filteredJobs.length})</>
            : <>All Jobs ({filteredJobs.length})</>
          }
        </h1>
        {
          filteredJobs.length <= 0 ? (
            <p className="text-gray-500">
              {searchJobByText
                ? "No jobs match your search. Try a different keyword."
                : "No jobs available right now."}
            </p>
          ) : (
            <div className="flex-1 pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {
                    filteredJobs.map((job) =>(
                      <div key={job?._id}>
                        <Job job={job}/>
                      </div>
                    ))
                  }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Brows
