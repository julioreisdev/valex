import Cryptr from 'cryptr';
export function encrypt(base: string, value: string): string {
    const cryptr = new Cryptr(base)
    return cryptr.encrypt(value)
}

export function decrypt(base: string, value: string): string {
    const cryptr = new Cryptr(base)
    return cryptr.decrypt(value)
}