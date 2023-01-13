require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());



run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).send({
    acknowledged: true,
    message: "OK",
    description: "Jobbox Starter establishment successful.",
  });
});

app.listen(port, () => {
  console.log(`Jobbox Starter listening on port ${port}`);
});
