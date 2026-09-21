import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { filterJobsByText } from "../lib/jobFilter";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchJobByText } = useSelector(store => store.job);

  const filteredJobs = filterJobsByText(allJobs, searchJobByText);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-5 px-4">
        <div>
          <div className="flex gap-5">
            <div className="w-20%">

            <FilterCard />
            </div>
              {
                filteredJobs.length <= 0 ? (
                  <div className="flex-1 text-center py-20">
                    <p className="text-lg font-medium">No jobs found</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {searchJobByText
                        ? `No results for "${searchJobByText}". Try a different keyword or clear the filter.`
                        : "There are no jobs available right now. Please check back later."}
                    </p>
                  </div>
                ) :(
                  <div className="flex-1 h-[88vh] overflow-auto pb-5">
                    {searchJobByText && (
                      <p className="text-sm text-gray-500 mb-3">
                        {filteredJobs.length} result{filteredJobs.length !== 1 ? "s" : ""} for &quot;{searchJobByText}&quot;
                      </p>
                    )}
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
      </div>

      {/* JOb Card */}
    </div>
  );
};

export default Jobs;
