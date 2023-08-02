const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

// retrieves all the purchases made
const getPurchases = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("e-commerce");

    const data = await db.collection("purchases").find().toArray();
    if (data === null || data === []) {
      response.status(404).json({
        status: 404,
        message: "Array of database is empty",
      });
    } else {
      response.status(200).json({
        status: 200,
        data: data,
        message: "all the purchases made",
      });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
  client.close();
};

module.exports = { getPurchases };
