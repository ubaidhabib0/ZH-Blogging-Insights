const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const authRoutes=require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Welcome To ZH Blogging Insights API"
    });

});

app.use("/api/auth",authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blogs", blogRoutes);

module.exports = app;