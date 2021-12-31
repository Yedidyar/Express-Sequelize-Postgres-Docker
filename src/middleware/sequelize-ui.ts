import express, { NextFunction, Request, Response } from "express";
import { Model, ModelCtor } from "sequelize/types";
const router = express.Router();

const sequelizeUi = (models: ModelCtor<Model>[]) => {
  return async (req: Request, res: Response) => {
    await getAllModelsWithData(models, res);
  };
};

async function getAllModelsWithData(models: ModelCtor<Model>[], res: Response) {
  const allModels: Model[][] = [];
  for (const model of models) {
    allModels.push(await model.findAll());
  }

  res.json(allModels);
}

export default sequelizeUi;
