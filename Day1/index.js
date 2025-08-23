import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];

// create
app.post("/users", (req, res) => {
  const user = { id: Date.now(), name: req.body.name };
  users.push(user);
  res.status(201).json(user);
});

// Read all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Read single user
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);

  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// DELETE
app.delete("/users/:id", (req, res) => {
   users = users.filter((u) => u.id != req.params.id);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => console.log(`CRUD app running on port ${PORT}`));
