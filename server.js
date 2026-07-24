const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
const blogs = [];
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
// Serve CSS and JS from public folder

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Add Blog page
app.get("/add-blog.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "add-blog.html"));
});
app.post("/add-blog", (req, res) => {
    const { title, author, content } = req.body;

   const blog = {
        title,
        author,
        content
    };

    blogs.push(blog);

    console.log(blogs);

    res.send("Blog submitted successfully!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});