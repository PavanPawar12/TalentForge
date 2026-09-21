// Load env first: this module reads CLOUD_* at import time, and ES module
// imports are hoisted before dotenv.config() in backend/index.js runs.
import 'dotenv/config';

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// console.log("Cloudinary Config:", cloudinary.config());

export default cloudinary;