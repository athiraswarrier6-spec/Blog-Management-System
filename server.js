const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Store blogs in an array
const blogs = [];

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {

    let blogHTML = "";

    blogs.forEach((blog) => {
        blogHTML += `
            <article>
                <h3>${blog.title}</h3>
                <p><strong>Author:</strong> ${blog.author}</p>
                <p>${blog.content}</p>
            </article>
        `;
    });

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Blog Management System</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>

        <header>
            <h1>Blog Management System</h1>

            <nav>
                <a href="/">Home</a> |
                <a href="/add-blog.html">Add Blog</a>
            </nav>
        </header>

        <main>

            <h2>Welcome to Blog Management System</h2>
            <p>Read and share amazing blogs.</p>

            <h2>Latest Blog Posts</h2>

            ${blogHTML}

        </main>

        <footer>
            <p>&copy; 2026 Blog Management System. All Rights Reserved.</p>
        </footer>

    </body>
    </html>
    `);

});

// Add Blog Page
app.get("/add-blog.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "add-blog.html"));
});

// Add Blog API
app.post("/add-blog", (req, res) => {

    const { title, author, content } = req.body;

    const blog = {
        title,
        author,
        content
    };

    blogs.push(blog);

    console.log(blogs);

    res.redirect("/");

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});