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
exports.answerToVisit = exports.getVisitsByPatientId = exports.getVisitById = exports.getVisits = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getVisits = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.visits.findMany({
        include: {
            person: true,
        },
    });
});
exports.getVisits = getVisits;
const getVisitById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.visits.findUnique({
        where: { id },
        include: {
            person: true,
        },
    });
});
exports.getVisitById = getVisitById;
const getVisitsByPatientId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.visits.findMany({
        where: { patient_id: id },
        include: {
            person: true,
        },
    });
});
exports.getVisitsByPatientId = getVisitsByPatientId;
const answerToVisit = (id, diagnosis, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.visits.update({
        where: { id },
        data: {
            diagnosis,
            status,
        },
    });
});
exports.answerToVisit = answerToVisit;
