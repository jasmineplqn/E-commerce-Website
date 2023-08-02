const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const DB_NAME = "e-commerce";
// to require the Fs in order for readfilesync to work
const fs = require("fs");


// Read the JSON files
const companiesData = fs.readFileSync("./data/companies.json", "utf8");
const itemsData = fs.readFileSync("./data/items.json", "utf8");

// Parse the JSON data
const companies = JSON.parse(companiesData);
const items = JSON.parse(itemsData);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
    console.log("Connecting to the client");
    // connecting the server 
    await client.connect();
    console.log("Connected");

    const db = client.db(DB_NAME);
    console.log("Inserting data");

    // Insert companies, mapping one company at a time
    const companiesArray = Object.keys(companies).map((company) => ({
    name: companies[company].name,
    url: companies[company].url,
    country: companies[company].country,
    _id: companies[company]._id,
    }));
    await db.collection("companies").insertMany(companiesArray);
    
    
    // Insert items, mapping one item at a time
    const itemsArray = Object.keys(items).map((item) => ({
        name: items[item].name,
        price: items[item].price,
        body_location: items[item].body_location,
        category: items[item].category,
        _id: items[item]._id,
        imageSrc: items[item].imageSrc,
        numInStock: items[item].numInStock,
        companyId: items[item].companyId
    }));
    
    await db.collection("items").insertMany(itemsArray);

    console.log("Data insertion successful");
    } catch (err) {
    console.error(err.message);
    } finally {
    client.close();
    }
};

batchImport();