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

export async function updateWallet(w:Wallet,name:string) {
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

export async function removeWallet(name:string) {
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

export async function getAllWallets(){
    try{
        const wallets = await prisma.wallet.findMany({
            where:{isDeleted:false}
        })
        return wallets;
    }catch (err){
        console.log("Error getting all wallets")
    }
}

export async function getWalletAmount(){
    try{
        const walletAmount = await prisma.wallet.findMany({
            where:{isDeleted:false},
            select:{
                amount: true
            }
        });
        return walletAmount.map(wallet => wallet.amount)
    }catch(err){
        console.log(err);
    }
}