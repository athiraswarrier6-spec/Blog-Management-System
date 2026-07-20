const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Add Blog Page
app.get("/add-blog", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "add-blog.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});