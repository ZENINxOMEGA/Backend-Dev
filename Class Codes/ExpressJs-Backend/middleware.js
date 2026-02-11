const express = require("express");
const fs = require("fs").promises;

const app = express();
const PORT = 8000;

app.use(express.json());

/* -------- Middleware -------- */

app.use(async (req, res, next) => {
  try {
    const log = `${new Date().toString()} - ${req.method} - ${req.url}\n`;

    await fs.appendFile("log.txt", log);
    
    next();
  } catch (err) {
    console.log("Logging error:", err);
    next(); // server ko rukne mat do
  }
});

/*
const fileAuthMiddleware = (req, res, next) => {
    console.log("I am checking file access");
    return res.send("Auth Failed");
};
*/

const auth_Middleware = ((req, res, next) => {
    const token = req.header("Authorization"); // singular

    if (token === "123") {
        console.log("Authenticication succesfull");
        
        next();
       
    } else {
        res.status(401).send("Unauthorized");
    }
});


/* -------- File Functions -------- */

const readStudentsFromFile = async () => {
  try {
    const data = await fs.readFile("users.json", "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    // agar file exist nahi karti
    await fs.writeFile("users.json", "[]");
    return [];
  }
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("users.json", JSON.stringify(records, null, 2));
};

/* -------- Routes -------- */

app.get("/students",auth_Middleware, async (req, res) => {
  try {
    const students = await readStudentsFromFile();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({
      message: "Error reading students",
    });
  }
});


         
/* -------- Server -------- */

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on ${PORT}`);
});