import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import mongoose from "mongoose";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Valid Job id is required",
                success: false
            })
        };

        // check if the user has already applied fo the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            })
        }

        // check if the jobs exist
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!application) {
            return res.status(404).json({
                message: "No Application",
                success: false
            })
        }

        return res.status(200).json({
            application,
            success: true
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

// admin can see how many user are applied

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        });
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}


export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

         if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            })
        }

        const normalizedStatus = String(status).toLowerCase();
        if (!['pending', 'accepted', 'rejected'].includes(normalizedStatus)) {
            return res.status(400).json({
                message: "Invalid status. Must be pending, accepted or rejected",
                success: false
            })
        }

        // find the application by applicantion id
        const application = await Application.findById(applicationId).populate('job');

         if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }

        // Only the recruiter who posted the job can update the status
        if (!application.job || application.job.created_by.toString() !== req.id) {
            return res.status(403).json({
                message: "You are not authorized to update this application",
                success: false
            })
        }
        // update the status

        application.status = normalizedStatus;
        await application.save();
        
        return res.status(200).json({
                message: "Status updated successfully",
                success: true
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
