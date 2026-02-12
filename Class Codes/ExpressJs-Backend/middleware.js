/* =========================================
   Import required modules
========================================= */

const express = require("express");      // Express framework for creating server
const fs = require("fs").promises;       // File system with promises (async/await support)


/* =========================================
   App & Server Configuration
========================================= */

const app = express();   // Create express application
const PORT = 8000;       // Server will run on port 8000


// Middleware to automatically parse JSON body from requests
// Example: req.body will work
app.use(express.json());


/* =========================================
   GLOBAL MIDDLEWARES
========================================= */


/* ---------- 1. Logging Middleware ----------
   👉 Har request ko log.txt file me store karega
   👉 Helps in debugging & tracking API calls
*/
app.use(async (req, res, next) => {
  try {

    // Log format: Date - Method - URL
    const log = `${new Date().toString()} - ${req.method} - ${req.url}\n`;

    // Append means add at end (overwrite nahi karega)
    await fs.appendFile("log.txt", log);

    // Pass control to next middleware/route
    next();

  } catch (err) {
    console.log("Logging error:", err);

    // Even if logging fails, server should continue
    next();
  }
});


/* ---------- Example Middleware (commented) ----------
   Just for demo purpose
*/
/*
const fileAuthMiddleware = (req, res, next) => {
    console.log("I am checking file access");
    return res.send("Auth Failed");
};
*/


/* ---------- 2. Authentication Middleware ----------
   👉 Authorization header check karega
   👉 Token match hua toh allow
   👉 warna 401 Unauthorized
*/
const auth_Middleware = (req, res, next) => {

    // Get token from request header
    const token = req.header("Authorization");

    // Simple hardcoded token check
    if (token === "123") {
        console.log("Authentication successful");

        // Allow request
        next();

    } else {

        // Block request
        res.status(401).send("Unauthorized");
    }
};



/* =========================================
   FILE HANDLING FUNCTIONS
========================================= */


/* ---------- Read Students ----------
   👉 users.json read karega
   👉 JSON parse karega
   👉 Agar file exist nahi karti toh create karega
*/
const readStudentsFromFile = async () => {
  try {

    const data = await fs.readFile("users.json", "utf-8");

    // Convert JSON string → JS array
    return JSON.parse(data || "[]");

  } catch (err) {

    // If file not found, create empty array file
    await fs.writeFile("users.json", "[]");

    return [];
  }
};


/* ---------- Write Students ----------
   👉 Updated records ko file me save karega
   👉 Pretty format (indentation = 2 spaces)
*/
const writeStudentsToFile = async (records) => {

  await fs.writeFile(
    "users.json",
    JSON.stringify(records, null, 2)
  );
};



/* =========================================
   ROUTES
========================================= */


/* ---------- GET /students ----------
   👉 All students list return karega
   👉 Protected route (authentication required)
*/
app.get("/students", auth_Middleware, async (req, res) => {

  try {

    // Read students from file
    const students = await readStudentsFromFile();

    // Send as JSON response
    res.status(200).json(students);

  } catch (err) {

    res.status(500).json({
      message: "Error reading students",
    });
  }
});



/* =========================================
   START SERVER
========================================= */

app.listen(PORT, () => {

  console.log(`🚀 Server is listening on ${PORT}`);

});
