import { Router } from "express";
import { getVisitsPerPatient, getAllVisits, getVisit, answerVisit } from "@/controllers";

const visitsRouter = Router();

visitsRouter.get("/", getAllVisits);
visitsRouter.get("/:id", getVisit);
visitsRouter.get("/patient/:id", getVisitsPerPatient);
visitsRouter.put("/:id/answer", answerVisit);


export default visitsRouter;