import { Request, Response } from "express"
import rechargeService from "../service/rechargeService"

export async function recharge(req: Request, res: Response) {
  const { ['x-api-key']: VALUE_KEY }: any = req.headers
  const { cardId, value }: { cardId: number, value: number } = res.locals.body
  const apiKey: string = VALUE_KEY
  try {
    const result = await rechargeService(apiKey, cardId, value)
    return res.status(200).send(result)
  } catch (error: any) {
    if (error.code === 'unauthorized') return res.sendStatus(401)
    if (error.code === 'conflict') return res.sendStatus(409)
    if (error.code === 'notFound') return res.sendStatus(404)
    return res.status(500).send(error)
  }
}