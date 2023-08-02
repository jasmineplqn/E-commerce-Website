const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "e-commerce";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Function to retrieve companies from the database.
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const companiesCollection = db.collection("companies");

    // Fetch all companies from the collection
    const companies = await companiesCollection.find().toArray();

    // Send the companies as a JSON response.
    res.status(200).json({ status: 200, companies });
  } catch (error) {
    console.error("An error occurred while retrieving companies:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getCompanies };
