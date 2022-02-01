import express, { Request, Response } from "express";
import { Model, ModelCtor, Sequelize } from "sequelize/types";

const router = express.Router();

const sequelizeUi = (db: Sequelize) => {
  const models = db.models;
  router.get("/", (req: Request, res: Response) =>
    getAllModels(req, res, models)
  );
  router.get("/schema", (req: Request, res: Response) =>
    getModelSchemasName(req, res, models)
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

  res.json(result);
};

const getModelSchemasName = (
  req: Request,
  res: Response,
  models: AllModels
) => {
  res.json(Object.keys(models));
};

const getModelSchemaByName = async (
  req: Request,
  res: Response,
  models: AllModels
) => {
  if (!models[req.params.name]) {
    res.json("model doesn't found").status(400);
    return;
  }
  const model = models[req.params.name];

  res.json(await model.describe());
};

const getModelByName = async (
  req: Request,
  res: Response,
  models: AllModels
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

interface AllModels {
  [key: string]: ModelCtor<Model<any, any>>;
}
export default sequelizeUi;