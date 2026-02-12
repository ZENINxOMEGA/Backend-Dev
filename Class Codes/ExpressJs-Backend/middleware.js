/* =========================================
   Import required modules
========================================= */

const express = require("express");      // Express framework (server + routing)
const fs = require("fs").promises;       // File system with promise support (async/await)


/* =========================================
   Initialize Express App
========================================= */

const app = express();   // Create express app instance
const PORT = 8000;       // Server will run on port 8000


// Middleware to parse JSON request body
// Without this, req.body will be undefined
app.use(express.json());



/* =========================================
   -------- Middleware Section --------
========================================= */


/* ---------- Logging Middleware ----------
   👉 Every request gets logged into log.txt
   👉 Useful for debugging & tracking API usage
   👉 Runs for ALL routes because app.use()
*/
app.use(async (req, res, next) => {
  try {

    // Create log message (date + method + URL)
    const log = `${new Date().toString()} - ${req.method} - ${req.url}\n`;

    // Append log into file (does not overwrite)
    await fs.appendFile("log.txt", log);
    
    // Pass control to next middleware/route
    next();

  } catch (err) {
    console.log("Logging error:", err);

    // Even if logging fails, server should continue
    next();
  }
});


/* ---------- Example Dummy Middleware (commented) ----------
   Just for understanding middleware concept
*/
/*
const fileAuthMiddleware = (req, res, next) => {
    console.log("I am checking file access");
    return res.send("Auth Failed");
};
*/


/* ---------- Authentication Middleware ----------
   👉 Checks Authorization header
   👉 If token = "123" → allow request
   👉 else → block with 401 Unauthorized
*/
const auth_Middleware = ((req, res, next) => {

    // Read token from header
    const token = req.header("Authorization");

    if (token === "123") {
        console.log("Authentication successful");

        // Allow request to continue
        next();
       
    } else {

        // Stop request if token invalid
        res.status(401).send("Unauthorized");
    }
});



/* =========================================
   -------- File Handling Functions --------
========================================= */


/* ---------- Read Students Function ----------
   👉 Reads users.json
   👉 Converts JSON string → JS array
   👉 If file doesn't exist → create empty file
*/
const readStudentsFromFile = async () => {
  try {

    const data = await fs.readFile("users.json", "utf-8");

    // Return parsed data
    return JSON.parse(data || "[]");

  } catch (err) {

    // If file not found, create new empty file
    await fs.writeFile("users.json", "[]");

    return [];
  }
};


/* ---------- Write Students Function ----------
   👉 Writes updated student list to file
   👉 null,2 → pretty formatting (indentation)
*/
const writeStudentsToFile = async (records) => {
  await fs.writeFile("users.json", JSON.stringify(records, null, 2));
};



/* =========================================
   -------- Routes Section --------
========================================= */


/* ---------- GET /students ----------
   👉 Protected route (requires authentication)
   👉 Returns all students from users.json
*/
app.get("/students", auth_Middleware, async (req, res) => {
  try {

    // Fetch students from file
    const students = await readStudentsFromFile();

    // Send students as JSON response
    res.status(200).json(students);

  } catch (err) {

    // If any error occurs
    res.status(500).json({
      message: "Error reading students",
    });
  }
});



/* =========================================
   -------- Start Server --------
========================================= */

// Start server and listen on defined port
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on ${PORT}`);
});
