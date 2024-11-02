import { Router } from "express";
import { getVisitsPerPatient, getAllVisits, getVisit, answerVisit } from "../controllers";
import { checkUserMiddleware } from "../middlewares/check-user";

const visitsRouter = Router();

visitsRouter.get("/", getAllVisits);
visitsRouter.get("/:id", getVisit);
visitsRouter.get("/patient/:id", getVisitsPerPatient);
visitsRouter.put("/:id/answer", answerVisit);


export default visitsRouter;