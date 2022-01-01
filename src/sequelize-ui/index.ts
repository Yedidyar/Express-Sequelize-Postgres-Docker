import express, { Request, Response } from "express";
import { Model, ModelCtor, Sequelize } from "sequelize/types";

const router = express.Router();

const sequelizeUi = (db: Sequelize) => {
  const models = db.models;
  router.get("/", (req: Request, res: Response) =>
    getAllModels(req, res, models)
  );
  router.get("/schema/:name", (req: Request, res: Response) =>
    getModelSchemaByName(req, res, models)
  );
  router.get("/rows/:name", (req: Request, res: Response) =>
    getModelRowsById(req, res, models)
  );

  return router;
};

const getAllModels = async (
  req: Request,
  res: Response,
  models: {
    [key: string]: ModelCtor<Model<any, any>>;
  }
) => {
  const result: { [key: string]: Model<any, any>[] } = {};
  for (const key in models) {
    result[key] = await models[key].findAll();
  }

  res.json(result);
};
const getModelSchemaByName = async (
  req: Request,
  res: Response,
  models: {
    [key: string]: ModelCtor<Model<any, any>>;
  }
) => {
  if (!models[req.params.name]) {
    res.json("model doesn't found").status(400);
    return;
  }
  const model = models[req.params.name];

  res.json(await model.describe());
};

const getModelRowsById = async (
  req: Request,
  res: Response,
  models: {
    [key: string]: ModelCtor<Model<any, any>>;
  }
) => {
  if (!models[req.params.name]) {
    res.json("model doesn't found").status(400);
    return;
  }

  const model = models[req.params.name];
  res.json(
    await model.findAll({ attributes: { exclude: ["updatedAt", "createdAt"] } })
  );
};

export default sequelizeUi;
