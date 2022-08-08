import { connectToDatabase } from "../../../utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
// fijate en la clase ObjectId que pasa un string a ObjectId de Mongo

type Data = { message: string } | { error: any };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  const { db } = await connectToDatabase();

  if (method === "DELETE") {
    try {
      // necesaria serialización a ObjectId de req.query.id.Fijate que no funciona sino.Esto seguramente sea por trabajar con la conexion,etc.No es importante.
      await db.collection("posts").deleteOne({ _id: new ObjectId(req.query.id as string) });
      return res.status(200).json({ message: `Post deleted successfully` });
    } catch (error) {
      return res.status(500).json({
        error: error,
      });
    }
  }
}
