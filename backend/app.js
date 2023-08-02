const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const fileupload = require("express-fileupload")

const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true, // Enable credentials (cookies, authorization headers, etc)
};


app.use(cors(corsOptions));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173','http://127.0.0.1:4000');
//     next();
// });
app.use(express.json());
app.use(cookieParser());
app.use(fileupload({
    useTempFiles: true
}))

// Route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentsRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(errorMiddleware);

module.exports = app;
