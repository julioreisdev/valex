import { findByCardId as findByCardIdTransactions, PaymentWithBusinessName } from "../repositories/paymentRepository"
import { findByCardId, Recharge } from "../repositories/rechargeRepository"

export default async function balance(cardId: number) {
  const transactions: PaymentWithBusinessName[] = await findByCardIdTransactions(cardId)
  const recharges: Recharge[] = await findByCardId(cardId)
  let balance: number = 0

  transactions.map((t) => {
    balance = balance - t.amount
  })
  recharges.map((r) => {
    balance = balance + r.amount
  })

  return { balance, transactions, recharges }
}