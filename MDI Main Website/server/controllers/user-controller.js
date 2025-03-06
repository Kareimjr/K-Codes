const userModel = require('../models/userModel.js');

const getUserData = async (req, res) => {
    try {
        // Correctly getting user ID from req.user (set by userAuth middleware)
        const { id } = req.user;

        // Fetch user data from the database using the ID
        const userData = await userModel.findById(id);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Return user data excluding sensitive info like password
        res.status(200).json({
            success: true,
            userData: {
                _id: userData._id,
                email: userData.email,
                name: userData.name,
                role: userData.role,
                residence: userData.residence,
                createdAt: userData.createdAt,  // Optional: if you want to show account creation date
                updatedAt: userData.updatedAt,  // Optional: last updated time
                // Add more non-sensitive fields as needed
            }
        });

    } catch (error) {
        console.error("Error in getUserData:", error); // Log error for easier debugging
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message, // Include error message for troubleshooting
        });
    }
};

module.exports = { getUserData };