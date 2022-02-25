import express, { Request, Response, NextFunction } from "express";
import { db } from "./util/database";
import { router as usersRouter } from "./v1/routes/users";
import v1 from "./v1";
import { initModels } from "./v1/models/init-models";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelizejs from "@adminjs/sequelize";
import { actor } from "./v1/models/actor";
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
app.use("/api/v1", v1);

app.use("/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  return res.send("hello world");
});
AdminJS.registerAdapter(AdminJSSequelizejs);

(async () => {
  try {
    initModels(db);
    await db.sync({ force: false });

    const adminJsOptions = {
      resources: [
        {
          resource: db.models.language,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.actor,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.category,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.city,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.country,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.address,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.film,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.film_actor,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.film_category,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.inventory,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.language,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.payment,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.rental,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.staff,
          options: { navigation: { name: null, icon: "" } },
        },
        {
          resource: db.models.store,
          options: { navigation: { name: null, icon: "" } },
        },
      ],
      databases: [],
      rootPath: "/admin",
    };

    const adminJs = new AdminJS(adminJsOptions);
    const router = AdminJSExpress.buildRouter(adminJs);
    app.use(adminJs.options.rootPath, router);
    app.listen(PORT, () => {
      console.log(`server run on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
