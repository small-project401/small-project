const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const morgan = require("morgan");
app.use(cors());
app.use(morgan("dev"));
const port = process.env.PORT || 3031;
/////////////////////////////////
const errorHandler = require("./error-handlers/500.js");
const notFound = require("./error-handlers/404.js");
const logger = require("./middleware/logger");
// const v1Routes = require("./auth/routes/v1");
// const v2Routes = require("./auth/routes/v2");
// const authRoutes = require("./auth/routes/routes");
///////////////////////////////////////\
app.get("/", (req, res) => {
  res.status(200).send("Hello world 🤪");
});

//////////////////////////////////
// app.use(authRoutes);
////////////////////////
app.use(logger);
app.use(notFound);
// app.use("/api/v1", v1Routes);
// app.use("/api/v1", v2Routes);
app.use("*", notFound);
app.use(errorHandler);

function start() {
  app.listen(port, () => {
    console.log(`app listen to port ${port}`);
  });
}
module.exports = {
  server: app,
  start: start,
};
