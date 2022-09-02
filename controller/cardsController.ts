import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository";
import createCardsService from "../service/createCardsService";

export async function postCard(req: Request, res: Response) {
  const { ['x-api-key']: VALUE_KEY }: any = req.headers
  const apiKey: string = VALUE_KEY
  const {
    employeId,
    cardType,
    isVirtual
  }:
    {
      employeId: number;
      cardType: TransactionTypes;
      isVirtual: boolean;
    } = res.locals.body

  try {
    const result = await createCardsService(
      {
        apiKey,
        employeId,
        cardType,
        isVirtual,
      })
    return res.sendStatus(201)
  } catch (error: any) {
    if (error.code === 'unauthorized') return res.sendStatus(401)
    if (error.code === 'conflict') return res.sendStatus(409)
    return res.status(500).send(error)
  }
}