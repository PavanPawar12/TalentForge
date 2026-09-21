import jwt from 'jsonwebtoken'

const isAuthenticated = async(req, res,next) => {
    try {
        // console.log("Cookies:", req.cookies);
        const token = req.cookies.token;

        // console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated.",
                success: false
            });
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded){
            return res.status(400).json({
                message:"Invalid token",
                success:false
            })
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Invalid or expired token.",
            success: false
        });
    }
}

export default isAuthenticated;

// middleware work between request and respose when you hit request first is checked by middleware.
