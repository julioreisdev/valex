import { findByTypeAndEmployeeId, insert, TransactionTypes } from "../repositories/cardRepository";
import { findByApiKey } from "../repositories/companyRepository"
import { findById } from "../repositories/employeeRepository";
import generateCardCVC from "./generateCardCVC";
import generateCardNumber from "./generateCardNumber";
import generateExpirationDate from "./generateExpirationDate";
import generateCardName from "./generateName";

export default async function createCardsService(data: {
  apiKey: string;
  employeId: number;
  cardType: TransactionTypes;
  isVirtual: boolean;
}) {
  if (!data.apiKey) {
    throw { code: "unauthorized" }
  }
  const company = await findByApiKey(data.apiKey)
  const employe = await findById(data.employeId)
  const card = await findByTypeAndEmployeeId(data.cardType, data.employeId)

  if (!company || !employe) {
    throw { code: "unauthorized" }
  }

  if (card) {
    throw { code: "conflict" }
  }

  const allName = employe.fullName.split(" ")
  const cardName: string = generateCardName(allName)
  const cardNumber: string = generateCardNumber()
  const expirationDate: string = generateExpirationDate()
  const cvc: string = generateCardCVC(employe.cpf)

  await insert(
    {
      employeeId: data.employeId,
      cardholderName: cardName,
      expirationDate: expirationDate,
      isBlocked: true,
      isVirtual: data.isVirtual,
      securityCode: cvc,
      number: cardNumber,
      type: data.cardType,
    }
  )

  return;
}