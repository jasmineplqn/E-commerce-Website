const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "e-commerce";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to retrieve items from the database.
const getItems = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const itemsCollection = db.collection("items");

    // Fetch all items from the collection
    const items = await itemsCollection.find().toArray();

    // Send the items as a JSON response.
    res.status(200).json({ status: 200, items });
  } catch (error) {
    console.error("An error occurred while retrieving items:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getItems };
