import { Card, findById } from "../repositories/cardRepository"
import { findByCardId as findByCardIdTransactions, PaymentWithBusinessName } from "../repositories/paymentRepository"
import { findByCardId, Recharge } from "../repositories/rechargeRepository"

export async function balanceService(id: number) {
    const transactions: PaymentWithBusinessName[] = await findByCardIdTransactions(id)
    const recharges: Recharge[] = await findByCardId(id)
    const card: Card = await findById(id)
    let balance: number = 0

    transactions.map((t) => {
        balance = balance - t.amount
    })
    recharges.map((r) => {
        balance = balance + r.amount
    })

    if (!card) {
        throw {code: "notFound"}
    }

    return {balance, transactions, recharges}
}