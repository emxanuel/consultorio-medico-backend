import { Request, Response } from "express";
import { getVisits, getVisitsByPatientId, getVisitById } from "@/services/database/visit";

export const getAllVisits = async (_: Request, res: Response) => {
    const visits = await getVisits();
    
    try{
        res.json(visits);
    }
    catch(error){
        res.json(error);
    }
}

export const getVisit = async (req: Request, res: Response) => {
    const { id } = req.params;
    try{
        const visit = await getVisitById(Number(id));
        res.json(visit);
    }
    catch(error){
        res.json(error);
    }
}


export const getVisitsPerPatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try{
    const visits = await getVisitsByPatientId(Number(id));  
    res.json(visits);
  }
  catch(error){
    res.json(error);
  }
};
