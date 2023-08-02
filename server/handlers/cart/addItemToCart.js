const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * add an item in cart
 * @param request
 * @param response
 */
const addItemToCart = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);
  const item = request.body;

  //   check if required fields are empty
  if (!item._id || !item.quantity) {
    response.status(400).json({
      status: 400,
      message: "Missing data!",
    });
  }

  //   check if quantity is 0 or lower
  if (item.quantiy <= 0) {
    response.status(400).json({
      status: 400,
      message: "Need to have at least 1 time the item to add to cart.",
    });
  }

  // information to add item to cart
  const newItem = {
    _id: item._id,
    quantity: item.quantity,
  };

  try {
    await client.connect();
    const db = client.db("e-commerce");

    const checkItemInCart = await db
      .collection("cart")
      .findOne({ _id: item._id });
    // check if the item is already in the cart
    if (checkItemInCart) {
      response.status(400).json({
        status: 400,
        message: "Item has already been added to the cart.",
      });
      client.close();
      return;
    }

    const checkItem = await db.collection("items").findOne({ _id: item._id });
    if (!checkItem) {
      response.status(404).json({
        status: 404,
        message: "Item not found.",
      });
      client.close();
      return;
    }

    // check if the item has enough stock to add to cart
    if (checkItem.numInStock < item.quantity || checkItem.numInStock <= 0) {
      response.status(400).json({
        status: 400,
        message: "Stock is too low to add that quantity of item.",
      });
      client.close();
      return;
    }

    const result = await db.collection("cart").insertOne(newItem);

    response.status(200).json({
      status: 200,
      message: "New item added to your cart.",
      data: newItem,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
  client.close();
};

module.exports = { addItemToCart };
