import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import { encrypt } from './crypt';

export default function generateCardCVC(baseCrypt: string): string {
    const number = faker.phone.number('###')
    return encrypt(baseCrypt, number)
}