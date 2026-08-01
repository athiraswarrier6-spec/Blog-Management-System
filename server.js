const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
// Store blogs in an array
const blogs = [];

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================= HOME PAGE =================
app.get("/", (req, res) => {

    let blogHTML = "";

    blogs.forEach((blog, index) => {
        blogHTML += `
            <article style="border:1px solid #ccc;padding:15px;margin-bottom:15px;border-radius:8px;">
    <h3>${blog.title}</h3>
    <p><strong>Author:</strong> ${blog.author}</p>
    <p>${blog.content}</p>

    <a href="/edit-blog/${index}">
        <button>Edit Blog</button>
    </a>

    <a href="/delete-blog/${index}">
        <button style="background-color:red;color:white;">
            Delete Blog
        </button>
    </a>

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

            <hr>
        </header>

        <main>

            <h2>Welcome to Blog Management System</h2>

            <p>Read and share amazing blogs.</p>

            <h2>Latest Blog Posts</h2>

            ${blogHTML}

        </main>

        <footer>

            <hr>

            <p>&copy; 2026 Blog Management System. All Rights Reserved.</p>

        </footer>

    </body>

    </html>
    `);

});

// ================= ADD BLOG PAGE =================
app.post("/add-blog", (req, res) => {

    const { title, author, content } = req.body;

    blogs.push({
        title,
        author,
        content
    });

    console.log(blogs);

    res.status(200).json({
        message: "Blog added successfully"
    });

});

// ================= ADD BLOG =================
app.post("/add-blog", (req, res) => {

    const { title, author, content } = req.body;

    blogs.push({
        title,
        author,
        content
    });

    console.log(blogs);

    res.redirect("/");

});

// ================= EDIT PAGE =================
app.get("/edit-blog/:id", (req, res) => {

    const id = req.params.id;

    const blog = blogs[id];

    if (!blog) {

        return res.send("Blog not found");

    }

    res.send(`

    <!DOCTYPE html>

    <html>

    <head>

        <title>Edit Blog</title>

        <link rel="stylesheet" href="/style.css">

    </head>

    <body>

        <header>

            <h1>Edit Blog</h1>

        </header>

        <main>

            <form action="/update-blog/${id}" method="POST">

                <label>Blog Title</label><br>

                <input
                    type="text"
                    name="title"
                    value="${blog.title}"
                    required
                ><br><br>

                <label>Author Name</label><br>

                <input
                    type="text"
                    name="author"
                    value="${blog.author}"
                    required
                ><br><br>

                <label>Blog Content</label><br>

                <textarea
                    name="content"
                    rows="6"
                    required>${blog.content}</textarea><br><br>

                <button type="submit">

                    Update Blog

                </button>

            </form>

        </main>

    </body>

    </html>

    `);

});

// ================= UPDATE BLOG =================
app.post("/update-blog/:id", (req, res) => {

    const id = req.params.id;

    blogs[id] = {

        title: req.body.title,

        author: req.body.author,

        content: req.body.content

    };

    console.log(blogs);

    res.redirect("/");

});
// ================= DELETE BLOG =================
app.get("/delete-blog/:id", (req, res) => {

    const id = req.params.id;

    if (blogs[id]) {
        blogs.splice(id, 1);
    }

    console.log(blogs);

    res.redirect("/");

});

// ================= START SERVER =================
app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});