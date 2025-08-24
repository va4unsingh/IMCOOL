import express from "express";
import dbConnect from "./dbConnect.js";
import User from "./schema.js";

const app = express();
app.use(express.json());

dbConnect();

app.post("/users", async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({
      message: "Please Enter all fields",
    });
  }

  await User.create({
    name,
    username,
    password,
  });

  res.status(200).json({
    message: "done",
  });
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    message: "Got all user",
    users,
  });
});

app.listen(3000);
