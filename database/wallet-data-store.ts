import {Expense, PrismaClient} from "@prisma/client";
import {Wallet} from "../models/Wallet";

const prisma = new PrismaClient();

export async function addWallet(w:Wallet){
    try{
        const newWallet = await prisma.wallet.create({
            data:{
                name: w.name,
                amount: w.amount,
                isDeleted:false,
            }
        })
        console.log("Wallet successfully added", newWallet);
        return newWallet
    }catch(err){
        console.log(err);
    }
}

export async function updateWallet(w:Expense,name:string) {
    try{
        const updatedWallet = await prisma.wallet.update({
            where:{name:name},
            data:{
                name: w.name,
                amount: w.amount,
            }
        })
        console.log("Update wallet successfully updated", updatedWallet);
        return updatedWallet;
    }catch(err){
        console.log(err);
    }
}

export async function removeWallet(w:Expense,name:string) {
    try{
        const deletedWallet = await prisma.wallet.update({
            where:{name: name},
            data:{isDeleted: true}
        })
        console.log("Wallet successfully removed", deletedWallet);
        return deletedWallet
    }catch (err){
        console.log(err);
    }
}

export async function getWalletAmount(){
    try{
        const amount = await prisma.wallet.f
    }
}