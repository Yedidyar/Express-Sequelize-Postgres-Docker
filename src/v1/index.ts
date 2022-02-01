import express from "express";
import { db } from "../util/database";
import sequelizeUi from "./sequelize-ui";

const router = express.Router();
router.use("/sequelize-ui-endpoint", sequelizeUi(db));

export default router;
