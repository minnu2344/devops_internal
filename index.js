const express = require("express");
const app = express();
app.use(express.json());

// In-memory list
let students = [
  { id: 1, name: "Ravi", age: 20 },
  { id: 2, name: "Sita", age: 22 },
];

// GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// POST add student
app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PATCH update student
app.patch("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) return res.status(404).json({ message: "Student not found" });

  if (req.body.name) student.name = req.body.name;
  if (req.body.age) student.age = req.body.age;

  res.json(student);
});

// DELETE student
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted" });
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
