const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();
const PORT = 4000 || process.env.PORT;
const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once("open", () => {
  console.log("Now connected to MONGODB Atlas.");
});

app.use("/users", userRoutes);
app.use("/workout", workoutRoutes);

// if (require.main === module) {
//   app.listen(PORT, () => {
//     console.log(`API is now online on port ${PORT}`);
//   });
// }

// module.exports = { app, mongoose };

app.listen(PORT, () => {
  console.log(`running at port ${PORT}`);
});
