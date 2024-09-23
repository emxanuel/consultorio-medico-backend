"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = require("express");
const emergencyContactRouter = (0, express_1.Router)();
emergencyContactRouter.get("/patient/:id", controllers_1.getEmergencyContactPerPerson);
exports.default = emergencyContactRouter;
