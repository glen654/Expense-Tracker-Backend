import express from "express";
import {Wallet} from "../models/Wallet";
import {addWallet, getAllWallets, getWalletAmount, removeWallet, updateWallet} from "../database/wallet-data-store";

const router = express.Router();

router.post("/add",async (req, res) => {
    const wallet:Wallet = {
        name: req.body.name,
        amount: req.body.amount,
        isDeleted: false
    }
    try{
        const addedWallet = await addWallet(wallet);
        res.json(addedWallet);
    }catch (err){
        console.log(err)
        res.status(400).send("Error saving wallet");
    }
})

router.post('/update/:name',async (req,res)=>{
    const name: string = req.params.name;
    const wallet:Wallet = {
        name: req.body.name,
        amount: req.body.amount,
        isDeleted: false
    }
    try{
        const updatedWallet = await updateWallet(wallet,name);
        res.json(updatedWallet);
    }catch (err){
        console.log(err)
        res.status(400).send("Error updating wallet");
    }
})

router.delete('/delete/:name',async (req,res)=>{
    const name: string = req.params.name;
    try{
        const deletedWallet = await removeWallet(name);
        res.json(deletedWallet);
    }catch (err){
        console.log(err)
        res.status(400).send("Error deleting wallet");
    }
})

router.get('/view',async (req,res)=>{
    try{
        const wallets = await getAllWallets();
        res.json(wallets);
    }catch (err){
        console.log(err)
        res.status(400).send("Error getting all wallets");
    }
})

router.get('/amount', async (req,res) => {
    try{
        const amount = await getWalletAmount();
        res.json(amount);
    }catch (err){
        console.log(err)
        res.status(400).send("Error getting wallet amount");
    }
})

export default router;