import { Request, Response } from "express";
import { getEmergencyContactByPersonId } from "../services/database/emergency_contact";

export const getEmergencyContactPerPerson = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const emergencyContacts = await getEmergencyContactByPersonId(Number(id));  
        res.json(emergencyContacts);
    }
    catch(error){
        res.json(error);
    }
}