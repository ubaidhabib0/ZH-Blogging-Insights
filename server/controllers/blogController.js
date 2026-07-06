const Blog = require("../models/Blog");
const slugify = require("slugify");

// Create Blog
exports.createBlog = async (req, res) => {
    try {

        const { title, content, category } = req.body;

        const blog = await Blog.create({
            title,
            slug: slugify(title, { lower: true, strict: true }),
            content,
            category,
            author: req.user._id
        });

        res.status(201).json({
            success: true,
            blog
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get All Blogs
exports.getBlogs = async (req, res) => {
    try {

        const blogs = await Blog.find()
            .populate("author", "fullName username")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: blogs.length,
            blogs
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get Single Blog
exports.getBlog = async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.id)
            .populate("author", "fullName username");

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        blog.views++;

        await blog.save();

        res.json({
            success: true,
            blog
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Update Blog
exports.updateBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (
            blog.author.toString() !== req.user._id.toString() &&
            req.user.role !== "admin" &&
            req.user.role !== "superadmin"
        ) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.category = req.body.category || blog.category;
        blog.slug = slugify(blog.title, { lower: true, strict: true });

        await blog.save();

        res.json({
            success: true,
            blog
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Delete Blog
exports.deleteBlog = async (req, res) => {

    try {

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (
            blog.author.toString() !== req.user._id.toString() &&
            req.user.role !== "admin" &&
            req.user.role !== "superadmin"
        ) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        await blog.deleteOne();

        res.json({
            success: true,
            message: "Blog deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};