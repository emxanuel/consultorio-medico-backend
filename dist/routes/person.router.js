"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = require("express");
const personRouter = (0, express_1.Router)();
personRouter.get("/:id", controllers_1.getPerson);
personRouter.post("/", controllers_1.addPerson);
exports.default = personRouter;
