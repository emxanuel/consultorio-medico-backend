"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const insuranceRouter = (0, express_1.Router)();
insuranceRouter.get("/patient/:id", controllers_1.getInsurancePerPerson);
exports.default = insuranceRouter;
