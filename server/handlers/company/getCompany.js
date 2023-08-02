const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * getCompany fetches a company using the companyId set from the request
 *  parameter from MongoDB and returns in the response the company.
 * @param request
 * @param response
 */
const getCompany = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const companyId = request.params.companyId;

  try {
    await client.connect();
    const db = client.db("e-commerce");

    const result = await db
      .collection("companies")
      .findOne({ _id: Number(companyId) });
    result
      ? response
          .status(200)
          .json({ status: 200, data: result, message: "company details" })
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

module.exports = { getCompany };
