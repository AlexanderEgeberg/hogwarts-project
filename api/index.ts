import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { pool } from "./db.ts";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/houses", async (req: Request, res: Response) => {
  const { rows } = await pool.query("SELECT name FROM houses ORDER BY name");
  res.json(rows);
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
