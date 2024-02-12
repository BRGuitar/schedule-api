const express = require("express");
const bodyParser = require("body-parser");
const v1ScheduleRouter = require("./v1/routes/scheduleRoutes");
const v1ClientRouter = require("./v1/routes/clientRoutes");
const v1RecordRouter = require("./v1/routes/recordRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/schedule", v1ScheduleRouter);
app.use("/api/v1/clients", v1ClientRouter);
app.use("/api/v1/records", v1RecordRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
