"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const person_router_1 = __importDefault(require("./person.router"));
const visits_router_1 = __importDefault(require("./visits.router"));
const emergencyContact_router_1 = __importDefault(require("./emergencyContact.router"));
const insurance_router_1 = __importDefault(require("./insurance.router"));
const router = (0, express_1.Router)();
router.get("/", (_, res) => {
    res.json("Hello World!");
});
router.use("/patients", person_router_1.default);
router.use("/visits", visits_router_1.default);
router.use("/emergencyContact", emergencyContact_router_1.default);
router.use("/insurance", insurance_router_1.default);
exports.default = router;
