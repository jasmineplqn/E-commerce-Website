const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * getItem fetches an item using the itemId set from the request
 *  parameter from MongoDB and returns in the response the item.
 * @param request
 * @param response
 */
const getItem = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const itemId = request.params.itemId;

  try {
    await client.connect();
    const db = client.db("e-commerce");

    const result = await db
      .collection("items")
      .findOne({ _id: Number(itemId) });
    result
      ? response
          .status(200)
          .json({ status: 200, data: result, message: "item details" })
      : response.status(404).json({ status: 404, message: "Not Found" });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
  client.close();
};

module.exports = { getItem };
