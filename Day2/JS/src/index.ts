import express from "express";
import { User } from "./schema.js";
import mongoose from "mongoose";
const app = express();
app.use(express.json());

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

    const user = User.findByIdAndDelete(id);
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
app.post("/todos", async (req, res) => {});

app.get("/todos/:id", async (req, res) => {});

app.put("/todos/:id", async (req, res) => {});

app.delete("/todos/:id", async (req, res) => {});
