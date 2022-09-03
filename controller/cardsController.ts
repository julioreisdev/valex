import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository";
import activateCardService from "../service/activateCardService";
import { balanceService } from "../service/balanceService";
import blockCardService from "../service/blockCardService";
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
    return res.status(201).send(result)
  } catch (error: any) {
    if (error.code === 'unauthorized') return res.sendStatus(401)
    if (error.code === 'conflict') return res.sendStatus(409)
    if (error.code === 'notFound') return res.sendStatus(404)
    return res.status(500).send(error)
  }
}

export async function activateCard(req: Request, res: Response) {
  const { employeId, cardType, cvc, password }: 
  { 
    employeId: number; 
    cardType: TransactionTypes; 
    cvc: string; 
    password: string; 
  } = res.locals.body
  try {
    const result = await activateCardService(employeId, cardType, cvc, password)
    return res.status(201).send({result})
  } catch (error: any) {
    if (error.code === 'unauthorized') return res.sendStatus(401)
    if (error.code === 'conflict') return res.sendStatus(409)
    if (error.code === 'notFound') return res.sendStatus(404)
    return res.status(500).send(error)
  }
}

export async function balance(req: Request, res: Response) {
  const cardId: number = Number(req.params.cardId);
  try {
    const result = await balanceService(cardId)
    return res.status(200).send(result)
  } catch (error: any) {
    if (error.code === 'unauthorized') return res.sendStatus(401)
    if (error.code === 'conflict') return res.sendStatus(409)
    if (error.code === 'notFound') return res.sendStatus(404)
    return res.status(500).send(error)
  }
}

export async function blockCard(req: Request, res: Response) {
  const {cardId, password}: {cardId: number; password: string} = res.locals.body
  try {
    const result = await blockCardService(cardId, password, true)
    return res.status(200).send(result)
  } catch (error: any) {
    if (error.code === 'unauthorized') return res.sendStatus(401)
    if (error.code === 'conflict') return res.sendStatus(409)
    if (error.code === 'notFound') return res.sendStatus(404)
    return res.status(500).send(error)
  }
}

export async function unBlockCard(req: Request, res: Response) {
  const {cardId, password}: {cardId: number; password: string} = res.locals.body
  try {
    const result = await blockCardService(cardId, password, false)
    return res.status(200).send(result)
  } catch (error: any) {
    if (error.code === 'unauthorized') return res.sendStatus(401)
    if (error.code === 'conflict') return res.sendStatus(409)
    if (error.code === 'notFound') return res.sendStatus(404)
    return res.status(500).send(error)
  }
}