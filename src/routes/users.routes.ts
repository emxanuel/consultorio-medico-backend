import { addUser, verifyAccountInUser } from "../controllers/users.controller";
import { Router } from "express";
import { checkUserMiddleware } from "../middlewares/check-user.middleware";

const usersRouter = Router();

usersRouter.post("/", addUser);
usersRouter.get("/verify", checkUserMiddleware, verifyAccountInUser);

export default usersRouter;