import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
//   const URI = `mongodb+srv://nean:nean123@admin-cluster.12dyvdd.mongodb.net/?retryWrites=true&w=majority`;
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
