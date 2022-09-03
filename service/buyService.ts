import { Card, findById as findByIdCard } from "../repositories/cardRepository"
import generateCurrentlyDate from "./generateCurrentlyDate"
import bcrypt from 'bcrypt'
import { Business, findById as findByIdBusiness } from "../repositories/businessRepository"
import { insert, PaymentWithBusinessName } from "../repositories/paymentRepository"
import { Recharge } from "../repositories/rechargeRepository"
import balance from "./balance"

export default async function buyService(
  cardId: number,
  password: string,
  amount: number,
  businessId: number
) {
  const card: Card = await findByIdCard(cardId)
  const business: Business = await findByIdBusiness(businessId)
  if (!card || !business) {
    throw { code: "notFound" }
  }

  const expired: boolean = generateCurrentlyDate() === card.expirationDate
  const passwordValid: boolean = bcrypt.compareSync(password, `${card.password}`)
  const balanceValue: {
    balance: number,
    transactions: PaymentWithBusinessName[],
    recharges: Recharge[]
  } = await balance(cardId)

  if (
    card.isBlocked
    || expired
    || !passwordValid
    || (card.type !== business.type)
    || (balanceValue.balance < amount)
  ) {
    throw { code: "unauthorized" }
  }

  await insert({ cardId: cardId, amount: amount, businessId: businessId })

  return 'Compra efetuada com sucesso!'
}