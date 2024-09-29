import { addUser, verifyAccountInUser } from "../controllers/users.controller";
import { Router } from "express";

const usersRouter = Router();

usersRouter.post("/", addUser);
usersRouter.get("/verify", verifyAccountInUser);

export default usersRouter;