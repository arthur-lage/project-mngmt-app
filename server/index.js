require("dotenv").config();

const cors = require("cors");
const colors = require("colors");
const express = require("express");
const PORT = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");

const schema = require("./schema/schema");

const app = express();

app.use(cors());

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => {
  console.log("Listening to port: " + PORT);
});
