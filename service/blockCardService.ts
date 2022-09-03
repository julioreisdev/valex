import { Card, findById, update } from "../repositories/cardRepository"
import generateCurrentlyDate from "./generateCurrentlyDate"
import bcrypt from 'bcrypt'

export default async function blockCardService(id: number, password: string, block: boolean) {
  const card: Card = await findById(id)
  if (!card) {
    throw { code: "notFound" }
  }
  const expired: boolean = generateCurrentlyDate() === card.expirationDate
  const passwordValid: boolean = bcrypt.compareSync(password, `${card.password}`)
  if (expired || (block && card.isBlocked) || (!block && !card.isBlocked) || !passwordValid) {
    throw { code: "unauthorized" }
  }

  await update(id, { isBlocked: block })

  const message = block ? "Cartão bloqueado com sucesso!" : "Cartão desbloqueado com sucesso!"
  return message
}