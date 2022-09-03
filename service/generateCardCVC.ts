import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import { encrypt } from './crypt';

export default function generateCardCVC(baseCrypt: string) {
    const number = faker.phone.number('###')
    const data = {
        cvcEncrypted: encrypt(baseCrypt, number),
        cvc: number
    }
    return data
}