import {PrismaClient} from "@prisma/client";
import {Expense} from "../models/Expense";
import {updateWallet} from "./wallet-data-store";

const prisma = new PrismaClient();

export async function addExpense(e:Expense,name:string) {
    try{
        const newExpense = await prisma.expense.create({
            data:{
                name: e.name,
                amount: e.amount,
                category: e.category,
                date: e.date,
                description: e.description,
                isDeleted: false
            }
        })
        const wallet = await prisma.wallet.findUnique({
            where:{name: name}
        })
        if(!wallet){
            throw new Error("Not Found")
        }

        const updatedAmount = wallet.amount - e.amount;
        if(updatedAmount > 0){
            throw new Error("Insufficient Amount in wallet")
        }

        const updatedWallet = await updateWallet(
            {...wallet, amount: updatedAmount},
            name
        )
        console.log("New expense successfully added", newExpense,updatedWallet);
        return {newExpense,updatedWallet};
    }catch(err){
        console.log(err);
    }
}

export async function updateExpense(e:Expense,name:string) {
    try {
        const updatedExpense = await prisma.expense.update({
            where:{name:name, isDeleted:false},
            data:{
                name: e.name,
                amount: e.amount,
                category: e.category,
                date: e.date,
                description: e.description,
                isDeleted: false
            }
        })
        console.log("Expense successfully updated", updatedExpense);
        return updatedExpense;
    }catch (err){
        console.log(err);
    }
}

export async function removeExpense(e:Expense,name:string) {
    try{
        const deletedExpense = await prisma.expense.update({
            where:{name:name},
            data:{isDeleted:true},
        })
        console.log("Expense successfully deleted", deletedExpense);
        return deletedExpense;
    }catch(err){
        console.log(err);
    }
}

export async function getAllExpenses(){
    try {
        return prisma.expense.findMany({
            where:{isDeleted:false},
        })
    }catch (err){
        console.log("Error getting all expenses")
    }
}