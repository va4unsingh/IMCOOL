import express from "express";
const app = express();
app.use(express.json());

// User routes
app.post("/users", async (req, res) => {});

app.get("/users/:id", async (req, res) => {});

app.put("/users/:id", async (req, res) => {});

app.delete("/users/:id", async (req, res) => {});

// Todos
app.post("/todos", async (req, res) => {});

app.get("/todos/:id", async (req, res) => {});

app.put("/todos/:id", async (req, res) => {});

app.delete("/todos/:id", async (req, res) => {});
