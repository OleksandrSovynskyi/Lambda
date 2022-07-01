import express, { Express } from "express";
import dotenv from "dotenv";
import * as mongoDB from "mongodb";
import { router } from "./routes";

dotenv.config();

const app: Express = express();
app.use("/", router);

const port = process.env.PORT;

export async function connectToDatabase() {
  const url: string = process.env.DB_CONN_STRING ?? "url default";

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(url);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  const dataCollection: mongoDB.Collection = db.collection(
    process.env.DATA_COLLECTION_NAME ?? "data default"
  );
  collections.data = dataCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${dataCollection.collectionName}`
  );
}

connectToDatabase();

export const collections: { data?: mongoDB.Collection } = {};

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
