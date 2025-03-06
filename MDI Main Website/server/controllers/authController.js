const userModel = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodemailer.js');
const { WELCOME_EMAIL_TEMPLETE, RESET_PASSWORD_EMAIL_TEMPLETE } = require('../config/emailTemplates.js');

// Helper Function to Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            residence: user.residence,
            role: user.role,
        },
        // Ensure JWT_SECRET is trimmed here as well for consistency
        process.env.JWT_SECRET.trim(),
        { expiresIn: '7d' }
    );
};

// REGISTER USER
const register = async (req, res) => {
    const { name, email, residence, password } = req.body;

    if (!name || !email || !residence || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, residence, password: hashedPassword });
        await user.save();

        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to MDI Learning Platform',
            html: WELCOME_EMAIL_TEMPLETE.replace("{{name}}", user.name),
        });

        return res.status(201).json({
            success: true,
            message: 'Registration completed successfully',
            data: {
                token,
                user: { id: user._id, name: user.name, email: user.email, residence: user.residence, role: user.role }
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// USER LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: 'Invalid Email or Password' });
        }

        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                token,
                user: { id: user._id, name: user.name, email: user.email, residence: user.residence, role: user.role }
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// USER LOGOUT
const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// SEND RESET OTP
const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes
        await user.save();

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Password Reset',
            html: RESET_PASSWORD_EMAIL_TEMPLETE.replace("{{otp}}", otp).replace("{{name}}", user.name),
        });

        return res.status(200).json({ success: true, message: 'Password reset OTP sent to your email' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.resetOtp !== otp || Date.now() > user.resetOtpExpireAt) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = null;
        user.resetOtpExpireAt = null;
        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// AUTHENTICATION CHECK
const isAuthenticated = (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// VERIFY OTP
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user || user.resetOtp !== otp || Date.now() > user.resetOtpExpireAt) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        return res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    login,
    logout,
    sendResetOtp,
    resetPassword,
    isAuthenticated,
    verifyOtp,
};