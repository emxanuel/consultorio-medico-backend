import { getEmergencyContactPerPerson } from "../controllers";

import { Router } from "express";

const emergencyContactRouter = Router();

emergencyContactRouter.get("/patient/:id", getEmergencyContactPerPerson);

export default emergencyContactRouter;