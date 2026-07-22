const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve CSS and JS from public folder
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Add Blog page
app.get("/add-blog.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "add-blog.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});