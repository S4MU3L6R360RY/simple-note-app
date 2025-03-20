const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Default route to serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 404 Not Found Middleware (Handles unknown routes)
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error to console
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
