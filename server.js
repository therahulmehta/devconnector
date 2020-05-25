const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define routes api/users -> '/'
// End points are restful
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// watch for express port environment variable or defualt to local port
const PORT = process.env.PORT || 5000;

//pass in port and run call back on connection
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
