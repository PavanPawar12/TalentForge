import { Job } from '../models/job.model.js'
import { Application } from '../models/application.model.js'
import { User } from '../models/user.models.js'
import mongoose from 'mongoose'

const ensureRecruiter = async (userId) => {
    const user = await User.findById(userId);
    return user && user.role === 'recruiter';
}

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!(await ensureRecruiter(userId))) {
            return res.status(403).json({
                message: "Only recruiters can post jobs",
                success: false
            })
        }
        
        // Explicit presence check: 0 / "0" are values, only
        // undefined / null / blank strings count as missing.
        const requiredFields = { title, description, requirements, salary, location, jobType, experience, position, companyId };
        const missing = Object.entries(requiredFields)
            .filter(([, value]) => value === undefined || value === null || String(value).trim() === "")
            .map(([key]) => key);
        if (missing.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missing.join(", ")}`,
                success: false
            })
        }

        const salaryNum = Number(salary);
        const experienceNum = Number(experience);
        const positionNum = Number(position);
        if (![salaryNum, experienceNum, positionNum].every(Number.isFinite)) {
            return res.status(400).json({
                message: "Salary, experience and position must be valid numbers",
                success: false
            })
        }
        if (positionNum < 1) {
            return res.status(400).json({
                message: "Position must be at least 1",
                success: false
            })
        }

        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                message: "Invalid company id",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: Array.isArray(requirements)
                ? requirements.map(item => String(item).trim()).filter(Boolean)
                : String(requirements).split(",").map(item => item.trim()).filter(Boolean),
            salary: salaryNum,
            location,
            jobType,
            experienceLevel: experienceNum,
            position: positionNum,
            company: companyId,
            created_by: userId,
        });

        return res.status(201).json({
            message: "Job posted successfully",
            job,
            success: true,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
}
// for student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ]
        };

        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({ createdAt:-1});
        if (!jobs) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}
// for student 
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
            .populate({ path: "company" })
            .populate({ path: "applications" });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            jobs: job, // kept for backward compatibility with existing frontend
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}

// how many job are created by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })
            .populate({
                path:"company"
            }).sort({createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
        
    }
}

// Update a job (only the recruiter who posted it)
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        if (!(await ensureRecruiter(userId))) {
            return res.status(403).json({
                message: "Only recruiters can update jobs",
                success: false
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        if (job.created_by.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this job",
                success: false
            });
        }

        const { title, description, requirements, salary, location, jobType, experience, position } = req.body;
        if (title) job.title = title;
        if (description) job.description = description;
        if (requirements) {
            job.requirements = Array.isArray(requirements)
                ? requirements.map(item => String(item).trim()).filter(Boolean)
                : String(requirements).split(",").map(item => item.trim()).filter(Boolean);
        }
        if (salary) job.salary = Number(salary);
        if (location) job.location = location;
        if (jobType) job.jobType = jobType;
        if (experience) job.experienceLevel = Number(experience);
        if (position) job.position = Number(position);

        await job.save();

        return res.status(200).json({
            message: "Job updated successfully",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}

// Delete a job (only the recruiter who posted it)
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        if (!(await ensureRecruiter(userId))) {
            return res.status(403).json({
                message: "Only recruiters can delete jobs",
                success: false
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        if (job.created_by.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this job",
                success: false
            });
        }

        await Application.deleteMany({ job: jobId });
        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message: "Job deleted successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}
