import { Request, Response } from "express";
import {
  getVisits,
  getVisitsByPatientId,
  getVisitById,
  answerToVisit,
} from "../services/database/visit";
import dayjs from "dayjs";

export const getAllVisits = async (req: Request, res: Response) => {
  const { dateRange, processed, pendient, canceled, name, accountKey } = req.query;
  let visits = await getVisits(accountKey as string);

  const [startDate, endDate] = dateRange
    ? (dateRange as string).split(",")
    : [null, null];

  if (startDate && endDate) {
    visits = visits.filter((visit) => {
      const visitDate = dayjs(visit.visit_date);
      return (
        visitDate.isAfter(dayjs(startDate).subtract(1, "day")) &&
        visitDate.isBefore(dayjs(endDate).add(1, "day"))
      );
    });
  }

  if (!pendient && !processed && !canceled && !name) {
    res.json([]);
    return;
  }

  const selectedStatuses: number[] = [];
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

  if (name){
    visits = visits.filter((visit) => visit.person.first_name.toLowerCase().includes(name.toString().toLowerCase()));
  }

  try {
    res.json(visits);
  } catch (error) {
    res.json(error);
  }
};

export const getVisit = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const visit = await getVisitById(Number(id));
    res.json(visit);
  } catch (error) {
    res.json(error);
  }
};

export const getVisitsPerPatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const visits = await getVisitsByPatientId(Number(id));
    res.json(visits);
  } catch (error) {
    res.json(error);
  }
};

export const answerVisit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { diagnosis, status } = req.body;
  try {
    const visit = await getVisitById(Number(id));
    const statusToSave = status === 'processed' ? 1 : 2;
    if (visit?.status !== 0) {
      throw new Error("Visit already answered");
    }
    const updatedVisit = await answerToVisit(Number(id), diagnosis, statusToSave);
    res.json(updatedVisit);
  } catch (error) {
    res.json(error);
  }
}