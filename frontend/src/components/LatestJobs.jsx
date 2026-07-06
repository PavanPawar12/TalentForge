

import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { allJobs = [] } = useSelector(store => store.job);
  // console.log(allJobs)
  return (
    <div className="max-w-7xl mx-auto my-20 px-5">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      
        {
          allJobs.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No Job Available
            </div>
          ) :(
            allJobs.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job}/>
            ))
          )
        }
      </div>
    </div>
  );
};

export default LatestJobs;
