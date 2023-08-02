const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

/**
 * updateItemQuantityCart updates the quantity of an item in the cart
 * @param request
 * @param response
 */
const updateItemQuantityCart = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    const { itemId, quantity } = request.body;

    try {
    await client.connect();
    const db = client.db("e-commerce");

    const checkItem = await db.collection("cart").findOne({ _id: itemId });
    if (!checkItem) {
        response.status(404).json({
        status: 404,
        message: "Item not found in the cart.",
        });
        client.close();
        return;
    }

    // check if the quantity is 0 or lower
    if (quantity <= 0) {
        response.status(400).json({
        status: 400,
        message: "Quantity should be greater than 0.",
        });
        client.close();
        return;
    }

    // check if the item has enough stock to update the quantity in cart
    const checkItemStock = await db.collection("items").findOne({ _id: itemId });
    if (!checkItemStock) {
        response.status(404).json({
        status: 404,
        message: "Item not found.",
        });
        client.close();
        return;
    }

    if (checkItemStock.numInStock < quantity || checkItemStock.numInStock <= 0) {
        response.status(400).json({
        status: 400,
        message: "Stock is too low to update the quantity of the item.",
        });
        client.close();
        return;
    }

    await db.collection("cart").updateOne(
        { _id: itemId },
        {
        $set: { quantity: quantity },
        }
    );

    response.status(200).json({
        status: 200,
        message: "Updated item quantity in the cart.",
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

module.exports = { updateItemQuantityCart };