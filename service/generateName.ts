export default function generateCardName (initialName: string[]): string {
    let cardName: string = ''
    if (initialName.length < 3) {
        cardName = initialName.join(" ").toUpperCase()
    } else {
        cardName += initialName[0] + " "
        for (let i = 1; i < initialName.length - 1; i++) {
            if (initialName[i].length >= 3) {
                cardName += initialName[i][0] + " "
            } else {
                cardName += initialName[i] + " "
            }
        }
        cardName += initialName[initialName.length - 1]
        cardName = cardName.toUpperCase()
    }

    return cardName
}