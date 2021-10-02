require("dotenv").config();

const serverless = require("serverless-http");
var bodyParser = require("body-parser");
let mongoose = require("mongoose");
const express = require("express");

const { NODE_ENV } = process.env;
const config = require("./config");
const currencyFormat = require("./routes/currencyFormat");

const app = express();
app.use(bodyParser.json());

// db connection
mongoose.connect(config.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("connected", () => console.log("Database is connected!"));
db.on("error", () => console.log("connection error:"));

app.get("/test", (req, res) =>
  res.json({ message: "Welcome to our EveryMundo!" })
);

app
  .route("/currency-formats")
  .get(currencyFormat.getCurrencyFormats)
  .post(currencyFormat.postCurrencyFormat);
app
  .route("/currency-formats/:id")
  .patch(currencyFormat.updateCurrencyFormat)
  .delete(currencyFormat.deleteCurrencyFormat);

// app.get("/hello", (req, res, next) =>
//   res.status(200).json({
//     message: "Hello from path!",
//   })
// );

app.use((req, res, next) =>
  res.status(404).json({
    error: "Not Found",
  })
);

if (NODE_ENV === "dev") {
  app.listen(3000, () => {
    console.log("Listening on port " + 3000);
  });
  module.exports = app;
} else {
  module.exports = serverless(app);
}
