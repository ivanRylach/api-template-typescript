import { MongoClient } from "mongodb";
import { mongodbPassword, mongodbURI, mongodbUsername } from "../utils/config";

export const mongoClient = new MongoClient(mongodbURI, {
  auth: {
    username: mongodbUsername,
    password: mongodbPassword,
  },
});

export const bookkeepingDB = mongoClient.db("bookkeeping");
