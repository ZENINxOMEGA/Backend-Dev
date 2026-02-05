const express = require('express');
const app = express();
const port = 3000;

// body se JSON data read karne ke liye
app.use(express.json());

// sample users data (temporary DB samajh lo)
const users = [
  { id: 1, name: "Aniket", branch: "CSE", subjects: ["Math", "Science"] },
  { id: 2, name: "Jane", branch: "ECE", subjects: ["English", "History"] },
  { id: 3, name: "Doe", branch: "CSE", subjects: ["Art", "PE"] },
  { id: 4, name: "Max", branch: "ME", subjects: ["Thermo", "Design"] }
];

// root route → server check karne ke liye
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ Get all users
// agar query me ?branch=CSE aaya → sirf wahi branch ke users
app.get('/users', (req, res) => {
  const branchQuery = req.query.branch; // URL se branch read karo

  if (branchQuery) {
    // branch ke basis pe filter
    const filteredUsers = users.filter(
      u => u.branch.toLowerCase() === branchQuery.toLowerCase()
    );
    return res.json(filteredUsers);
  }
  else {
    // agar branch nahi di → sab users bhej do
    return res.json(users);
  }
});

// ✅ get user by id
// example: /users/2
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); // URL se id nikali
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user); // user mil gaya
  } else {
    res.status(404).json({ message: "User not found" }); // nahi mila
  }
});

// ✅ search user by name
// example: /search?name=sa
app.get('/search', (req, res) => {
  const nameQuery = req.query.name; // query param se name

  if (!nameQuery) {
    return res.status(400).json({ message: "Name query is required" });
  }

  // name ke basis pe search (partial match bhi chalega)
  const matchedUsers = users.filter(u =>
    u.name.toLowerCase().includes(nameQuery.toLowerCase())
  );

  res.json(matchedUsers);
});

// ✅ POST request → new student add karne ke liye
// example: /student/register
app.post('/student/register', (req, res) => {
  const student = req.body; // frontend se aaya data

  if (!student) {
    return res.status(400).send("Please provide student data");
  }

  // naye student ko users array me add karo
  users.push(student);

  // updated users list bhej do
  res.status(200).json(users);
});

// server start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
