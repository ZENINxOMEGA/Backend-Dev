const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const port = 8000;

// JSON body read karne ke liye
app.use(express.json());

// users.json ka exact path (safe method)
const filePath = path.join(__dirname, "users.json");

// ✅ Add new student & save in users.json
app.post("/student/add", (req, res) => {
  const student = req.body; // frontend se aaya data

  // basic validation
  if (!student || Object.keys(student).length === 0) {
    return res.status(400).json({
      message: "Please provide student data"
    });
  }

  // file read
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error reading file"
      });
    }

    let users = [];

    // agar file empty ho ya corrupted ho
    try {
      users = data ? JSON.parse(data) : [];
    } catch (error) {
      return res.status(500).json({
        message: "Invalid JSON format in users.json"
      });
    }

    // new student add
    users.push(student);

    // file write
    fs.writeFile(
      filePath,
      JSON.stringify(users, null, 2),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: "Error writing file"
          });
        }

        // success response
        res.status(201).json({
          message: "Student added successfully",
          totalStudents: users.length,
          student
        });
      }
    );
  });
});

// ✅ Optional: Get all students (test ke liye)
app.get("/students", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Error reading file"
      });
    }

    const users = data ? JSON.parse(data) : [];
    res.json(users);
  });
});

// server start
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});