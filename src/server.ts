import express, { Request, Response, NextFunction } from "express";
import { db } from "./util/database";
import { User } from "./models/users";
import { router as usersRouter } from "./routes/users";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", [
    "GET",
    "POST",
    "PUT",
    "DELETE",
  ]);
  next();
});

app.use("/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});

(async () => {
  try {
    await db.sync({ force: false });

    app.listen(PORT, () => {
      console.log(`server run on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();