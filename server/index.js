const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const adminRouter=require("./src/controllers/admin.controller");
const cityRouter = require("./src/controllers/city.controller");
const busRouter = require("./src/controllers/bus.controller");
const userRouter=require("./src/controllers/user.controller");
const orderRouter=require("./src/controllers/order.controller")
const paymentController = require('./src/controllers/payment.controller');
// const cityRoutes = require("./routes/cityRoutes");
const connect = require("./src/configs/db");

app.use(cors({
 {
    origin:"https://swami-travel-bus.vercel.app",
    methods:["POST","GET","PUT","DELETE"],
    credentials: true
  }
));
app.use(express.json());
app.use("/admin",adminRouter);
app.use("/user",userRouter);
app.use("/city", cityRouter);
app.use("/bus", busRouter);
app.use("/order", orderRouter);

//Razorpay payment
app.use("/api/payment", paymentController);

// app.use("/cities", cityRoutes);

app.listen(port, async () => {
  try {
    await connect();
    console.log(`listening on http://localhost:8080`);
    console.log('Server is running')
  } catch (error) {
    console.log(error.message);
  }
});
