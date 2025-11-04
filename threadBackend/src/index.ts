import express from "express";
import dotenv from "dotenv";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connectDB } from "./database/database.js";
import { User } from "./models/userModel.js";
import { connectGraphql } from "./graphql/graphql.js";


dotenv.config(); // Load .env first

const PORT = 8089;
const mongoUrl = process.env.MONGO_URI;
console.log("MongoDB URI:", mongoUrl);

if (!mongoUrl) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1);
}

async function init() {
    await connectDB(mongoUrl as string);


  const app = express();
  app.use(express.json());

  const graphQl = connectGraphql();

  

  const { url } = await startStandaloneServer(graphQl, {
    listen: { port: PORT },
  });

  console.log(`🚀  GraphQL Server ready at: ${url}`);

  app.get("/", (req, res) => {
    res.json({ message: "Thread Backend Service is running" });
  });

  app.listen(PORT, () => {
    console.log(`✅ Thread Backend Service is running on port ${PORT}`);
  });
}

init();
