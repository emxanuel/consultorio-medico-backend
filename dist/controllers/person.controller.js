"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPerson = exports.getPerson = void 0;
const person_1 = require("../services/database/person");
const getPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const person = yield (0, person_1.getPersonById)(Number(id));
    res.json(person);
});
exports.getPerson = getPerson;
const addPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientInfo, emergencyContactInfo, visitInfo, insuranceInfo } = req.body;
    const p = patientInfo;
    const i = insuranceInfo;
    const e = emergencyContactInfo;
    const v = visitInfo;
    // console.log(emergencyContactInfo, visitInfo, insuranceInfo);
    try {
        if (!p || !i || !e || !v) {
            throw new Error("Missing required fields");
        }
        if (!v.reason) {
            throw new Error("Missing required fields");
        }
        const person = yield (0, person_1.createPerson)(p, i, e, v);
        res.json(person);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.addPerson = addPerson;
