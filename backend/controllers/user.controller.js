import { User } from '../models/user.models.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from '../utils/cloudinary.js';

const getCookieOptions = () => ({
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
});

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        if (!['student', 'recruiter'].includes(role)) {
            return res.status(400).json({
                message: "Role must be either student or recruiter",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: `User already exist with this email.`,
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Optional profile photo upload (field name: "file")
        let profilePhoto = "";
        if (req.file) {
            // Only accept images for profile photo at registration
            if (!req.file.mimetype.startsWith("image/")) {
                return res.status(400).json({
                    message: "Profile photo must be an image file",
                    success: false
                });
            }
            const fileUri = getDataUri(req.file);
            let cloudResponse;
            try {
                cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "image",
                    folder: "talentforge/profiles",
                });
            } catch (uploadError) {
                console.log("Profile photo upload failed:", uploadError);
                return res.status(502).json({
                    message: "Profile photo upload failed. Please try again without a photo or contact support.",
                    success: false
                });
            }
            profilePhoto = cloudResponse.secure_url;
        }

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto
            }
        })

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }

}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // console.log(email, password, role)
        // console.log(req.body)
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // check role is currect or not
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200)
            .cookie("token", token, getCookieOptions())
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).clearCookie("token", getCookieOptions()).json({
            message: "Logged out successfully",
            success: true,

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const userId = req.id; // middleware authentication

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Prevent email duplication when changing email
        if (email && email !== user.email) {
            const emailTaken = await User.findOne({ email });
            if (emailTaken) {
                return res.status(409).json({
                    message: "This email is already in use",
                    success: false
                });
            }
            user.email = email;
        }

        // Optional file upload (field name: "file").
        // Single-file upload: PDFs/docs are stored as resume,
        // images are stored as profile photo.
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const isResume = req.file.mimetype === "application/pdf" ||
                req.file.mimetype === "application/msword" ||
                req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

            if (isResume) {
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "raw",
                    folder: "talentforge/resumes",
                });
                user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
                user.profile.resumeOriginalName = req.file.originalname; // Save the original file name
            } else if (req.file.mimetype.startsWith("image/")) {
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    resource_type: "image",
                    folder: "talentforge/profiles",
                });
                user.profile.profilePhoto = cloudResponse.secure_url;
            } else {
                return res.status(400).json({
                    message: "Unsupported file type. Upload an image or a PDF/DOC resume.",
                    success: false
                });
            }
        }

        // updating data
        if (fullname) user.fullname = fullname
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio !== undefined) user.profile.bio = bio
        if (skills !== undefined) {
            const skillsArray = Array.isArray(skills)
                ? skills
                : String(skills).split(",");
            user.profile.skills = skillsArray
                .map((s) => String(s).trim())
                .filter((s) => s.length > 0);
        }
        await user.save();

        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "profile updated successfully.",
            user: updatedUser,
            success: true
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}