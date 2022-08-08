import { Long, Timestamp } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

type Data =
  | { message: string }
  | { post: any }
  | { posts: Array<any> }
  | { error: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body, method } = req;

  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
      const posts = await db
        .collection("posts")
        .find()
        .sort({ _id: -1 })
        .toArray();
      return res.status(201).json({ posts });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  }

  if (method === "POST") {
    try {
      const post = await db.collection("posts").insertOne({
        ...body,
        // timestamp: new Timestamp(new Long(Date.now())),
      });
      return res.status(201).json({ post });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  }
}
