// import React from 'react'
// import { Button } from "./ui/button";
// import { Search } from "lucide-react";
// const HeroSection = () => {
//   return (
//     <div className="text-center">
//       <div className="flex flex-col gap-5 my-10">
       
//         <h1 className="text-5xl font-bold">
//           Search, Apply & <br />
//           Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
//         </h1>
//         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nostrum itaque eveniet, repudiandae voluptate excepturi!</p>
//         <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
//             <input type="text" placeholder="Find your dream jobs.." className="outline-none border-none w-full"/>
//             <Button className="rounded-r-full bg-[#6A38C2]">
//                 <Search className="h-5 w-5"/>
//             </Button>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default HeroSection


import React from "react";
import heroBg from "../assets/jobhero.png"
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[90vh] bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-white/20"></div>

      <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Search, Apply <br />
            & Get Your{" "}
            <span className="text-[#6A38C2]">
              Dream Jobs
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-base sm:text-lg">
            Find thousands of verified jobs from top companies and
            apply with just one click.
          </p>

          {/* Search Box */}
          <div className="mt-8 flex w-full max-w-xl rounded-full overflow-hidden shadow-xl bg-white">
            <input
              type="text"
              placeholder="Find your dream job..."
              className="flex-1 px-6 py-4 outline-none"
            />

            <Button className="rounded-none rounded-r-full bg-[#6A38C2] hover:bg-[#5b2fb0] px-6">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 