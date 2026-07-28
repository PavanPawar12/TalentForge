import { User } from '../models/user.models.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
// import getDataUri from "../utils/datauri.js";
// import cloudinary from '../utils/cloudinary.js';
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        console.log("filled data: ",fullname, email, phoneNumber, password, role);
    

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        // console.log(req.body)
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: `User already exist with this email.`,
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
            // profile
        })

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
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
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict"
            })
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
        // console.log("Something is showing: ", req.body);
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,

        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;



        // const file = req.file;
        // // console.log("req.file:", file);

        // let cloudResponse = null;

        // if (file) {
        //     const fileUri = getDataUri(file);
        //     console.log("Data URI:", fileUri);

        //     cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        //         resource_type: "auto",
        //     });

        //     // console.log("Cloudinary Response:", cloudResponse);
        // }




        // console.log(req.file);
        // console.log(res.body);
        const userId = req.id; // middleware authentication

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        // updating data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) {
            user.profile.skills = skills.split(",");
        }
        // resume comes later here  ??? when we setup cloudinary
        // if (cloudResponse) {
        //     user.profile.resume = cloudResponse.secure_url // save the cloudinary url 
        //     user.profile.resumeOriginalName = file.originalname // Save the original file name
        // }
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