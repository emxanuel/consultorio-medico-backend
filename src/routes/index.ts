import { Router } from "express";
import personRouter from "./person.routes";
import visitsRouter from "./visits.router";
import emergencyContactRouter from "./emergencyContact.routes";
import insuranceRouter from "./insurance.routes";
import usersRouter from "./users.routes";

const router = Router();

router.get("/", (_, res) => {
  res.json("Hello World!");
});

router.use("/patients", personRouter)
router.use("/visits", visitsRouter)
router.use("/emergencyContact", emergencyContactRouter)
router.use("/insurance", insuranceRouter)
router.use("/users", usersRouter)

export default router;