import express, { Request, Response } from "express";
import { Model, ModelCtor, Sequelize } from "sequelize/types";

const router = express.Router();

const sequelizeUi = (db: Sequelize) => {
  const { models } = db;
  router.get("/", (req: Request, res: Response) =>
    getAllModels(req, res, models)
  );
  router.get("/schemas", (req: Request, res: Response) =>
    getModelsName(req, res, models)
  );
  router.get("find-all/schema-name/:name", (req: Request, res: Response) =>
    getModelByName(req, res, models)
  );
  router.get("/schema/name/:name", (req: Request, res: Response) =>
    getModelSchemaByName(req, res, models)
  );

  return router;
};

const getAllModels = async (req: Request, res: Response, models: AllModels) => {
  const result: { [key: string]: Model<any, any>[] } = {};
  for (const key in models) {
    result[key] = await models[key].findAll();
  }

  return res.json(result);
};

const getModelsName = (
  req: Request,
  res: Response<string[]>,
  models: AllModels
) => {
  return res.json(Object.keys(models));
};

const getModelSchemaByName = async (
  req: Request,
  res: Response,
  models: AllModels
) => {
  if (!models[req.params.name]) {
    return res.json("model doesn't found").status(400);
  }
  const model = models[req.params.name];

  return res.json(await model.describe());
};

const getModelByName = async (
  req: Request,
  res: Response,
  models: AllModels
) => {
  if (!models[req.params.name]) {
    return res.json("model doesn't found").status(400);
  }

  const model = models[req.params.name];
  return res.json(
    await model.findAll({ attributes: { exclude: ["updatedAt", "createdAt"] } })
  );
};

interface AllModels {
  [key: string]: ModelCtor<Model<any, any>>;
}
export default sequelizeUi;
