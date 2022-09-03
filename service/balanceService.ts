import { Card, findById } from "../repositories/cardRepository"
import { PaymentWithBusinessName } from "../repositories/paymentRepository"
import { Recharge } from "../repositories/rechargeRepository"
import balance from "./balance"

export async function balanceService(id: number) {
  const card: Card = await findById(id)
  const balanceValue: {
    balance: number,
    transactions: PaymentWithBusinessName[],
    recharges: Recharge[]
  } = await balance(id)

  if (!card) {
    throw { code: "notFound" }
  }

  return balanceValue
}