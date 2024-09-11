import { addPerson, getPerson } from "@/controllers";
import { Router } from "express";

const personRouter = Router();

personRouter.get("/:id", getPerson);
personRouter.post("/", addPerson)

export default personRouter;