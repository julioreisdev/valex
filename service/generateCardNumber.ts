import { faker } from '@faker-js/faker';

export default function generateCardNumber(): string {
    const cardNumber = faker.phone.number('#### #13 ########-#')
    return cardNumber
}