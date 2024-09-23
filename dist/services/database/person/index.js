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
exports.createPerson = exports.getPersonById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPersonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.person.findUnique({
        where: { id },
        include: {
            emergency_contact: true,
            insurance: true,
        },
    });
});
exports.getPersonById = getPersonById;
const createPerson = (personInfo, insuranceInfo, emergencyContactInfo, visitInfo) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.person.create({
        data: Object.assign(Object.assign({}, personInfo), { insurance: {
                create: insuranceInfo,
            }, emergency_contact: {
                create: emergencyContactInfo,
            }, visits: {
                create: visitInfo
            } }),
    });
});
exports.createPerson = createPerson;
