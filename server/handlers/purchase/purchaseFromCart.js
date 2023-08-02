const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
("use strict");

/**
 * purchase item(s) in cart, will update the stock of the purchased item(s)
 * and remove all the items from the cart and will respond with the item(s) purchased
 * @param request
 * @param response
 */
const purchaseFromCart = async (request, response) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("e-commerce");

    // get all the items in cart
    const cart = await db.collection("cart").find().toArray();

    // check if item in cart
    if (cart.length <= 0) {
      response.status(400).json({
        status: 400,
        message: "No item in the cart!",
      });
      client.close();
      return;
    }

    // get all the items
    const items = await db.collection("items").find({}).toArray();

    // check if items has enough in stock to update or else we respond with an error
    for (const purchasedItem of cart) {
      const item = items.find((item) => purchasedItem._id === item._id);
      if (item.numInStock < purchasedItem.quantity) {
        response.status(400).json({
          status: 400,
          message: "Stock is too low to add that quantity of item.",
        });
        client.close();
        return;
      }
    }

    // updates the stock, will reduce the stock by the quantity purchased
    for (const purchasedItem of cart) {
      const item = items.find((item) => purchasedItem._id === item._id);
      const updateStock = await db
        .collection("items")
        .updateOne(
          { _id: item._id },
          { $set: { numInStock: item.numInStock - purchasedItem.quantity } }
        );
    }

    // add to purchases collection, will save all our purchases in this collection
    const purchase = { _id: uuidv4(), purchases: cart };
    const purchases = await db.collection("purchases").insertOne(purchase);

    // clear all items from the cart after purchase
    const clear = await db.collection("cart").deleteMany({});

    response.status(200).json({
      status: 200,
      message: "Purchased successfully.",
      data: purchase,
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

module.exports = { purchaseFromCart };
