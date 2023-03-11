const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.xck6hjy.mongodb.net/project_management?retryWrites=true&w=majority`,
    {}
  );

  console.log(
    `MongoDB connected: ${connection.connection.host}`.cyan.underline.bold
  );
};

module.exports = connectDB;
