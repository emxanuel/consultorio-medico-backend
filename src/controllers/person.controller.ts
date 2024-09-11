import { Request, Response } from "express";
import { createPerson, getPersonById } from "@/services/database/person";
import { EmergencyContact, Insurance, Person, Visit } from "@/types";

export const getPerson = async (req: Request, res: Response) => {
    const { id } = req.params;
    const person = await getPersonById(Number(id));
    res.json(person);
};

export const addPerson = async (req: Request, res: Response) => {
    const { personInfo, emergencyContactInfo, visitInfo, insuranceInfo } = req.body;

    const p: Person = personInfo;
    const i: Insurance = insuranceInfo;
    const e: EmergencyContact = emergencyContactInfo;
    const v: Visit = visitInfo;
    console.log(p, i, e, v)

    // console.log(emergencyContactInfo, visitInfo, insuranceInfo);

    const person = await createPerson(p, i, e, v)

    res.json(person)
};