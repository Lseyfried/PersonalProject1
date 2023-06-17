// const MongoClient = require("mongodb").MongoClient;
// //reactPratice
// const url =
//   "mongodb+srv://Kisoi:reactPratice@reactnodepratice1.qvjxvrg.mongodb.net/?retryWrites=true&w=majority";

// const createPlace = async (req, res, next) => {
//   const newPlace = {
//     title: req.body.title,
//     description: req.body.description,
//     location: req.body.location,
//     address: req.body.address,
//     creator: req.body.creator,
//   };
//   const client = new MongoClient(url);
//   try {
//     await client.connect();
//     const db = client.db();
//     const result = db.collection("places").insertOne(newPlace);
//   } catch (error) {
//     return res.json({ message: "Could not store the data" });
//   }
//   client.close();
//   res.json(newPlace);
// };

// const getPlaces = async (req, res, next) => {};

// exports.createPlace = createPlace;
// exports.getPlaces = getPlaces;
