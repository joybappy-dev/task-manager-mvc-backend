import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send(
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    <!-- Link to your CSS file here -->
    <link rel="stylesheet" href="style.css">
</head>
<body style="background-color: black; color:orange; height: 100vh; text-align: center; margin-top:400px; font-family: arial; font-size: 30px;">
    <h1>Hello World</h1>
    <!-- Your content goes here -->

    <!-- Link to your JavaScript file here -->
    <script src="script.js"></script>
</body>
</html>`,
  );
});

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on ${process.env.PORT}`);
});
