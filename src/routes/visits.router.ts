import { Router } from "express";
import { getVisitsPerPatient, getAllVisits, getVisit } from "@/controllers";

const visitsRouter = Router();

visitsRouter.get("/", getAllVisits);
visitsRouter.get("/:id", getVisit);
visitsRouter.get("/patient/:id", getVisitsPerPatient);


export default visitsRouter;