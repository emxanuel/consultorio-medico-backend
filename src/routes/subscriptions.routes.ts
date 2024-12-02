import { Router } from "express";
import { createSubscriptionController } from "../controllers/subscriptions.controller";

const subscriptionsRouter = Router(); 

subscriptionsRouter.post("/", createSubscriptionController);

export default subscriptionsRouter;