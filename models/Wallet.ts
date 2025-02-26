export class Wallet {
    name: string;
    amount: number;
    isDeleted: boolean;

    constructor(name: string, amount: number, isDeleted: boolean) {
        this.name = name;
        this.amount = amount;
        this.isDeleted = isDeleted;
    }
}