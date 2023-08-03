"use strict";

const express = require("express");
const morgan = require("morgan");

const { getItem } = require("./handlers/item/getItem");
const { getCompany } = require("./handlers/company/getCompany");
const { getCart } = require("./handlers/cart/getCart");
const { addItemToCart } = require("./handlers/cart/addItemToCart");
const { getItems } = require("./handlers/item/getItems");
const { getCompanies } = require("./handlers/company/getCompanies");
const { deleteItemFromCart } = require("./handlers/cart/deleteItemFromCart");
const { deleteAllItemsFromCart } = require("./handlers/cart/deleteAllItemsFromCart");
const { purchaseFromCart } = require("./handlers/purchase/purchaseFromCart");
const { getPurchases } = require("./handlers/purchase/getPurchases");
const { getPurchase } = require("./handlers/purchase/getPurchase");
const { updateItemQuantityCart } = require("./handlers/cart/UpdateItemQuantityCart");

const { PORT, ENV} = process.env;

express()
  .use(function (req, res, next) {
    if(ENV && ENV === "PROD") {
      res.header("Access-Control-Allow-Origin", "https://gadgetgo.vercel.app");
    }  else {
      res.header("Access-Control-Allow-Origin", `http://localhost:${PORT}`);
    }  
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // get all the items
  .get("/api/get-items", getItems)
  // get one item and its details
  .get("/api/item/:itemId", getItem)
  // get all the companies
  .get("/api/get-companies", getCompanies)
  // get one company and its details
  .get("/api/company/:companyId", getCompany)
  // get the cart with all the items in it
  .get("/api/cart", getCart)
  // add item to the cart
  .post("/api/add-item-to-cart", addItemToCart)
  //delete 1 item from the cart
  .delete("/api/delete-item/:itemId", deleteItemFromCart)
  //delete all item from the cart
  .delete("/api/delete-AllItems", deleteAllItemsFromCart)
  // update item quantity in the cart
  .patch("/api/update-item-quantity", updateItemQuantityCart)
  // purchasing an item
  .post("/api/purchase-item", purchaseFromCart)
  // get all purchases made
  .get("/api/purchases", getPurchases)
  // get one purchase depending on the id
  .get("/api/purchase/:purchaseId", getPurchase)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
