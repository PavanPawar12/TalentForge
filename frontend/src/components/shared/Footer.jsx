// import React from 'react'

// const Footer = () => {
//   return (
//     <div>
//       <footer>
//         <div>
//             <div>
//                 <div>
//                     <h2>Job Hunt</h2>
//                     <p>Your componey. All rights reserved.</p>
//                 </div>
//                 <div>
//                     {/* <a href="">
//                         <svg/>
//                     </a>
//                     <a href="">
//                         <svg/>
//                     </a>
//                     <a href="">
//                         <svg/>
//                     </a> */}
//                 </div>
//             </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default Footer


import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#6A38C2] text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* 1️⃣ Company Info */}
        <div>
          <h2 className="text-3xl font-bold mb-3">Job Hunt</h2>
          <p className="text-gray-200 leading-relaxed">
            Your trusted platform to find dream jobs and connect with top companies.
            Explore opportunities and build your future today.
          </p>
        </div>

        {/* 2️⃣ Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300 transition-all">Home</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-all">About Us</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-all">Jobs</a></li>
            <li><a href="#" className="hover:text-gray-300 transition-all">Contact</a></li>
          </ul>
        </div>

        {/* 3️⃣ Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4 mt-4">
            <a
              href="#"
              className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-[#6A38C2] transition-all"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-[#6A38C2] transition-all"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-[#6A38C2] transition-all"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-[#6A38C2] transition-all"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} Job Hunt. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
