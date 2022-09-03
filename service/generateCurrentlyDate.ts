export default function generateCurrentlyDate(): string {
    const month: string = (new Date().getMonth() + 1).toString()
    const year: string = (new Date().getFullYear()).toString()

    let date = ''
    if (month.length === 1) {
        date = `0${month}/${year[2]}${year[3]}`
    } else {
        date = `${month}/${year[2]}${year[3]}`
    }

    return date
}