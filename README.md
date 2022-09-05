# valex
Projeto Valex da Driven Education. A API será responsável pela criação, recarga, ativação, assim como o processamento das compras.

Criação de cartão: post -> /cards

    No headers:
    x-api-key

    No body:
    {
        "employeId": number,
        "cardType": string,
        "isVirtual": boolean
    }
________________________________

Ativação de cartão: post -> /activate

    {
        "employeId": number,
        "cardType": string,
        "cvc": string,
        "password": string
    }

_________________________________

Saldo: get -> /balance/:cardId

_________________________________

Bloquear ou desbloquear cartão: 

    para bloquear: post -> /block
    para desbloquear: post -> /unblock

    {
        "cardId": 8,
        "password": "1234"
    }

________________________________

Recarga: post -> /recharge

    No headers:
    x-api-key

    {
        "cardId": number,
        "value" number
    }

________________________________

Compra: post -> /buy

    {
        "cardId": number,
        "password": string,
        "amount": number,
        "businessId": number
    }
