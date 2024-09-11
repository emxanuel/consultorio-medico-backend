import { Router } from "express";
import personRouter from "./person.router";
import visitsRouter from "./visits.router";
import emergencyContactRouter from "./emergencyContact.router";
import insuranceRouter from "./insurance.router";

const router = Router();

router.get("/", (_, res) => {
  res.json("Hello World!");
});

router.use("/person", personRouter)
router.use("/visits", visitsRouter)
router.use("/emergencyContact", emergencyContactRouter)
router.use("/insurance", insuranceRouter)

export default router;