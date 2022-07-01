import express, { Request, Response } from "express";
import { collections } from "./app";
import DataItem from "./models/dataItem";

export const router = express.Router();

router.use(express.json());

router.get("/[a-zA-Z0-9]+", async (req: Request, res: Response) => {
  try {
    const url: string = req.url;
    const urlSplit = url.split("");
    urlSplit.shift();
    const route = urlSplit.join("");
    const findResult = await collections?.data
      ?.find({ route: route })
      .toArray();
    const result = findResult?.map((el) => {
      return el.data;
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/[a-zA-Z0-9]+", async (req: Request, res: Response) => {
  try {
    const url: string = req.url;
    const urlSplit = url.split("");
    urlSplit.shift();
    const route = urlSplit.join("");
    const newData = { route: route, data: req.body } as DataItem;
    const result = await collections?.data?.insertOne(newData);
    result
      ? res
          .status(201)
          .send(
            `Successfully created a new dataItem with id ${result.insertedId}`
          )
      : res.status(500).send("Failed to create a new dataItem.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
