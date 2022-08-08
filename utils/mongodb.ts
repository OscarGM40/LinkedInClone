import { Db, MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient | null= null;
let cachedDb: Db | null = null;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

// funcion helper que me permite conectarme a la db(puede ser mejor idea que abrir y cerrar una conexión ya que parece que está devolviendo la conexión actual y no creando más como hace Fernando.Sea como sea son las dos mejores formas de proceder)
export async function connectToDatabase() {
  /* si ya hay un Client y Db en cache los retorno y salgo */
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  /* si no los hay,creo una conexión */
  const client = await MongoClient.connect(uri!);
  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
