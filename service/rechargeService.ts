import { findById, update } from "../repositories/cardRepository"
import { findByApiKey } from "../repositories/companyRepository"
import { insert } from "../repositories/rechargeRepository"
import generateCurrentlyDate from "./generateCurrentlyDate"

export default async function (apiKey: string, cardId: number, value: number) {
  const company = await findByApiKey(apiKey)
  const card = await findById(cardId)
  const expired: boolean = generateCurrentlyDate() === card.expirationDate

  if (!company || ! card) {
    throw {code: "notFound"}
  }
  if (!apiKey || card.isBlocked || expired) {
    throw {code: "unauthorized"}
  }

  await insert({amount: value, cardId: cardId})

  return 'Recarga feita com sucesso!'
}