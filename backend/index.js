import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from './routes/user.routes.js'
import companyRoute from './routes/compay.routes.js'
import jobRouter from './routes/job.routes.js'
import applicationRoute from './routes/application.routes.js'
import dns from 'dns'
import path from 'path'
// import cloudinary from './utils/cloudinary.js';

dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config({});

const app = express();
const __dirname = path.resolve();
// Test Cloudinary connection
// (async () => {
//     try {
//         const result = await cloudinary.api.ping();
//         console.log("✅ Cloudinary Ping:", result);
//     } catch (error) {
//         console.log("❌ Cloudinary Ping Error:", error);
//     }
// })(); 


// app.get('/', (req, res) => {
//     return res.status(200).json({
//         message:"I am comming from backend",
//         success: true
//     })
// })

// console.log("Cloud Name:", process.env.CLOUD_NAME);
// console.log("API Key:", process.env.API_KEY);
// console.log("API Secret:", process.env.API_SECRET);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
} 
app.use(cors(corsOptions))

// routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server Running at PORT: ${PORT}`);
})