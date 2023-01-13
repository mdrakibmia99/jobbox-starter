require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@todoapp.mfoky.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// start 

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

const run = async () => {
  try {
    const db = client.db("jobbox-starter");
    const userCollection = db.collection("user");
    const jobCollection = db.collection("job");

    console.log(`Successfully connected with Jobbox Starter`);

    app.post("/user", async (req, res) => {
      const user = req.body;

      const result = await userCollection.insertOne(user);

      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;

      const result = await userCollection.findOne({ email });

      if (result?.email) {
        return res.send({ status: true, data: result });
      }

      res.send({ status: false });
    });
