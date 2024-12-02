import e from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import { checkUserMiddleware } from "./middlewares/check-user.middleware";
import { excludeRoutes } from "./middlewares/exclude-routes.middleware";
import { corsMiddleware } from "./middlewares/cors.middleware";

const app = e();
dotenv.config();
app.use(e.urlencoded({ extended: true }));
app.use(e.json());
app.use(corsMiddleware);
app.use(excludeRoutes(checkUserMiddleware, ["/api/v1/patients", "/api/v1/users"]));

app.use("/api/v1", router);

app.get("/api", (req, res) => {
  res.json("Hello World!");
});

app.listen(80, () => {
  console.log("Server is running on port", 80);
});
