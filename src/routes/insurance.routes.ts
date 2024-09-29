import { Router } from "express";
import { getInsurancePerPerson } from "../controllers";

const insuranceRouter = Router();

insuranceRouter.get("/patient/:id", getInsurancePerPerson);

export default insuranceRouter;