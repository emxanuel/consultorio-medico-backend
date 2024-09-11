import { Request, Response } from "express";
import { getInsuranceByPersonId } from "@/services/database/insurance";

export const getInsurancePerPerson = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const insurance = await getInsuranceByPersonId(Number(id));  
        res.json(insurance);
    }
    catch(error){
        res.json(error);
    }
}