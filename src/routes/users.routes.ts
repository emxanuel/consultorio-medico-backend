import { addUser, getUserController, updateUserController, verifyAccountInUser } from "../controllers/users.controller";
import { Router } from "express";
import { checkUserMiddleware } from "../middlewares/check-user.middleware";

const usersRouter = Router();

usersRouter.post("/", addUser);
usersRouter.get("/verify", checkUserMiddleware, verifyAccountInUser);
usersRouter.get("/:email", checkUserMiddleware, getUserController);
usersRouter.put("/:email", checkUserMiddleware, updateUserController);

export default usersRouter;