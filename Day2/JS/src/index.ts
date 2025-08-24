import express from "express";
import { Todo, User } from "./schema.js";
import mongoose from "mongoose";
import dbConnect from "./dbConnect.js";
const app = express();
app.use(express.json());

dbConnect();
// User routes
app.post("/users", async (req, res) => {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      return res.status(400).json({
        message: "Incomplete Fields",
        success: false,
      });
    }
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exist",
        success: false,
      });
    }

    const newUser = await User.create({
      name,
      username,
      password,
    });

    const userSafe: any = newUser.toObject();
    delete userSafe.password;

    res.status(201).json({
      message: "User created",
      success: true,
      user: userSafe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      success: false,
    });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const { name, email } = req.body;
    const updatedData = { name, email };

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully",
      user, // optional: you can return the deleted user info
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});

// Todos
app.post("/todos", async (req, res) => {
  try {
    const { title, user, completed } = req.body;

    if (!title || !user) {
      return res.status(400).json({
        message: "Incomplete Fields",
        success: false,
      });
    }

    const todo = await Todo.create({
      title,
      user,
    });

    if (!todo) {
      res.status(400).json({
        message: "Failed to create todo",
        success: false,
      });
    }

    res.status(201).json({
      message: "Todo created",
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal error while creating todo",
      success: false,
    });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    }
    res.status(200).json({
      message: "got your todo",
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal error while getting todo",
      success: false,
    });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const { title, completed } = req.body;
    if (!title && completed === undefined) {
      return res.status(400).json({
        message: "Incomplete Fields",
        success: false,
      });
    }
    const updatedData = { title, completed };

    const todo = await Todo.findByIdAndUpdate(id, updatedData, { new: true });
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "todo not found" });
    }

    res.json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal error while updating todo",
      success: false,
    });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    }
    res.json({
      success: true,
      message: "todo deleted successfully",
      todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});

app.listen(3000);
