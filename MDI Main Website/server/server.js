require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes.js');
const mediaRoutes = require('./routes/instructorRoutes/mediaRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const instructorCourseRoutes = require('./routes/instructorRoutes/courseRoutes.js');
const studentCourseRoutes = require('./routes/studentRoutes/courseRoutes.js');
const paymentRoutes = require("./routes/paymentRoutes.js");
const studentCourseProgressRoute = require("./routes/studentRoutes/courseProgressRoute.js");
const studentBoughtCoursesRoutes = require("./routes/studentRoutes/studentCoursesRoute.js");
const brandingRoutes = require('./routes/brandingRoute.js');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Fix: CORS Configuration (without trailing slash)
const corsOptions = {
    origin: [process.env.CLIENT_URL, 'https://mdihub.vercel.app'],  // Removed trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Ensure OPTIONS is included
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // ✅ Fix: Handle preflight requests

// Parse JSON, URL-encoded data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session middleware configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // Optionally, add cookie settings such as secure flag in production:
        // cookie: { secure: process.env.NODE_ENV === 'production' }
    })
);

app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.error(err));

// Routes configuration
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/media', mediaRoutes);
app.use('/instructor/course', instructorCourseRoutes);
app.use('/student/course', studentCourseRoutes);
app.use("/api/payments", paymentRoutes);
app.use('/student/courses-bought', studentBoughtCoursesRoutes);
app.use('/student/course-progress', studentCourseProgressRoute);
app.use('/api/branding', brandingRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
    });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
    });

    ws.send('Hello, you are connected to the WebSocket server');
});
