import e from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import { checkUserMiddleware } from "./middlewares/check-user";
import { excludeRoutes } from "./middlewares/exclude-routes.middleware";

const app = e();
dotenv.config();
app.use(e.urlencoded({ extended: true }));
app.use(e.json());
app.use(cors());
app.use(excludeRoutes(checkUserMiddleware, ["/api/v1/patients"]));

app.use("/api/v1", router);

app.get("/api", (req, res) => {
  res.json("Hello World!");
});

app.listen(80, () => {
  console.log("Server is running on port", 80);
});
