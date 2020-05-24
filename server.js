const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.get("/", (req, res) => res.send("API Running"));

// watch for express port environment variable or defualt to local port
const PORT = process.env.PORT || 5000;

//pass in port and run call back on connection
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
