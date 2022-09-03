import { Card, findByTypeAndEmployeeId, TransactionTypes, update } from "../repositories/cardRepository";
import { Employee, findById } from "../repositories/employeeRepository";
import { decrypt } from "./crypt";
import bcrypt from 'bcrypt'
import generateCurrentlyDate from "./generateCurrentlyDate";

export default async function activateCardService(
  employeId: number,
  cardType: TransactionTypes,
  cvc: string,
  password: string
) {

  const card: Card = await findByTypeAndEmployeeId(cardType, employeId)
  const employe: Employee = await findById(employeId)
  const cvcValid = decrypt(employe.cpf, card.securityCode) === cvc
  const expired: boolean = generateCurrentlyDate() === card.expirationDate

  if (!card || card.password || expired || !cvcValid) {
    throw { code: "unauthorized" }
  }

  await update(card.id,
    {
      originalCardId: card.id,
      password: bcrypt.hashSync(password, 10),
      isBlocked: false
    }
  )

  return 'Cartão desbloqueado!'
}