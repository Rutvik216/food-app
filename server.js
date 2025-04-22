const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv")
const connectDb = require("./config/db");

//env
dotenv.config();

connectDb();

//rest object
const app = express();

//middlware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route

app.use("/api/v1/test", require("./routes/testroute"));
app.use("/api/v1/auth", require("./routes/authroutes"));
app.use('/api/v1/user', require("./routes/userroutes"));
app.use('/api/v1/resturant', require("./routes/resturantroutes"));
app.use('/api/v1/booking', require("./routes/bookingroutes"));



app.get("/", (req, resp) => {
  return resp.status(200).send("<h1> welcom to food  server  </h1>");
});
port = process.env.PORT;

app.listen(port, () => {
  console.log("server is running");
});
