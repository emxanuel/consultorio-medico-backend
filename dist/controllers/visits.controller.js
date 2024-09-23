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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerVisit = exports.getVisitsPerPatient = exports.getVisit = exports.getAllVisits = void 0;
const visit_1 = require("../services/database/visit");
const dayjs_1 = __importDefault(require("dayjs"));
const getAllVisits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let visits = yield (0, visit_1.getVisits)();
    const { dateRange, processed, pendient, canceled, name } = req.query;
    const [startDate, endDate] = dateRange
        ? dateRange.split(",")
        : [null, null];
    if (startDate && endDate) {
        visits = visits.filter((visit) => {
            const visitDate = (0, dayjs_1.default)(visit.visit_date);
            return (visitDate.isAfter((0, dayjs_1.default)(startDate).subtract(1, "day")) &&
                visitDate.isBefore((0, dayjs_1.default)(endDate).add(1, "day")));
        });
    }
    if (!pendient && !processed && !canceled && !name) {
        res.json([]);
        return;
    }
    const selectedStatuses = [];
    if (pendient) {
        selectedStatuses.push(0);
    }
    if (processed) {
        selectedStatuses.push(1);
    }
    if (canceled) {
        selectedStatuses.push(2);
    }
    if (selectedStatuses.length > 0) {
        visits = visits.filter((visit) => selectedStatuses.includes(visit.status));
    }
    if (name) {
        visits = visits.filter((visit) => visit.person.first_name.toLowerCase().includes(name.toString().toLowerCase()));
    }
    try {
        res.json(visits);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getAllVisits = getAllVisits;
const getVisit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const visit = yield (0, visit_1.getVisitById)(Number(id));
        res.json(visit);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getVisit = getVisit;
const getVisitsPerPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const visits = yield (0, visit_1.getVisitsByPatientId)(Number(id));
        res.json(visits);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getVisitsPerPatient = getVisitsPerPatient;
const answerVisit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { diagnosis, status } = req.body;
    try {
        const visit = yield (0, visit_1.getVisitById)(Number(id));
        const statusToSave = status === 'processed' ? 1 : 2;
        if ((visit === null || visit === void 0 ? void 0 : visit.status) !== 0) {
            throw new Error("Visit already answered");
        }
        const updatedVisit = yield (0, visit_1.answerToVisit)(Number(id), diagnosis, statusToSave);
        res.json(updatedVisit);
    }
    catch (error) {
        res.json(error);
    }
});
exports.answerVisit = answerVisit;
