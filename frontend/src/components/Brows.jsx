import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
// const reandomJobs = [1,2,3]
const Brows = () => {
    const { allJobs} = useSelector(store => store.job);
  return (
    // <div>
    //     <Navbar/>
    //     <div className='max-w-5xl mx-auto mt-5'>
    //         <h1 className='font-bold text-xl  my-10'>Search Results {allJobs.length}</h1>
    //         <div className='grid grid-cols-3 gap-4 mt-5'>
    //         {/* {
    //             allJobs.map((item, index) => {
    //                 return (
    //                     <Job/>
    //                 )
    //             })
    //         } */}

    //         {
    //             allJobs.length <= 0 ? <span>Jon not found</span> :(
    //               <div className="flex-1 h-[88vh] overflow-auto pb-5">
    //                 <div className="grid grid-cols-3 gap-4">
    //                     {
    //                       allJobs.map((job) =>(
    //                         <div key={job?._id}>
    //                           <Job job={job}/>
    //                         </div>
    //                       ))
    //                     }
                        
    //                 </div>
    //               </div>
    //             )
    //           }
    //         </div>
    //     </div>
    // </div>

    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-5">
        <div>
          <div className="flex gap-5">
            <div className="w-20%">

            {/* <FilterCard /> */}
            </div>
              {
                allJobs.length <= 0 ? <span>Jon not found</span> :(
                  <div className="flex-1 h-[88vh] overflow-auto pb-5">
                    <div className="grid grid-cols-3 gap-4">
                        {
                          allJobs.map((job) =>(
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
  )
}

export default Brows
