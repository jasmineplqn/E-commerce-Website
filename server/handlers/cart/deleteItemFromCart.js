const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * Delete an item from the cart
 * @param request
 * @param response
 */
const deleteItemFromCart = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const itemId = request.params.itemId;

  try {
    await client.connect();
    const db = client.db("e-commerce");

    // Check if the item exists in the cart
    const checkItemInCart = await db.collection("cart").find();
    if (!checkItemInCart) {
      response.status(404).json({
        status: 404,
        message: "Item not found in the cart.",
      });
      client.close();
      return;
    }

    // Delete the item from the cart
    await db.collection("cart").deleteOne();

    response.status(200).json({
      status: 200,
      message: "Item deleted from the cart.",
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: 500,
      message: "Server error",
    });
  } finally {
    client.close();
  }
};

module.exports = { deleteItemFromCart };