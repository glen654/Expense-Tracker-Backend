import {Category} from "./enums/Category";

export class Expense{
    name: string;
    amount: number;
    category: Category;
    date: string;
    description: string;
    isDeleted: boolean;

    constructor(name: string, amount: number, category: Category, date: string, description: string, isDeleted: boolean) {
        this.name = name;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.description = description;
        this.isDeleted = isDeleted;
    }
}