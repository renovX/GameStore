import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config();
//import payRouter from "./routes/payment.js";
import stripeRouter from "./stripe.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: "true",
  })
);

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send("Error parsing data");
  } else {
    next();
  }
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/stripe", stripeRouter);
const PORT = process.env.PORT || 4555;
try {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
} catch (e) {
  console.log(e);
}
