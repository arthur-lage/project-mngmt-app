require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");

const app = express();

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
