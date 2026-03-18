import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const app = express();

app.get("/", async (req, res) => {
  const data = await prisma.user.findMany();
  res.json(data);
});

app.post("/", async (req, res) => {
  const data = await prisma.user.create({
    data: {
      username: Math.random().toString(36).substring(7),
      pasword: Math.random().toString(36).substring(7),
    },
  });
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
