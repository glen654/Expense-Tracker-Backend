import express from "express";
import {Expense} from "../models/Expense";
import {addExpense, getAllExpenses, removeExpense, updateExpense} from "../database/expense-data-store";

const router = express.Router();

router.post('/add',async (req,res)=>{
    const expense:Expense = {
        name: req.body.name,
        amount:req.body.amount,
        category: req.body.category,
        date: req.body.date,
        description: req.body.description,
        isDeleted: false
    }
    try {
        const addedExpense = await addExpense(expense,expense.name);
        res.json(addedExpense);
    }catch (err){
        console.log(err)
        res.status(400).send("Error saving expense");
    }
})

router.put('/update/:name',async (req,res)=>{
    const name: string = req.params.name;
    const expense:Expense = {
        name: req.body.name,
        amount:req.body.amount,
        category: req.body.category,
        date: req.body.date,
        description: req.body.description,
        isDeleted: false
    }
    try{
        const updatedExpense = await updateExpense(expense,name);
        res.json(updatedExpense);
    }catch (err){
        console.log(err)
        res.status(400).send("Error updating expense");
    }
})

router.delete('/delete/:name',async (req,res)=>{
    const name: string = req.params.name;
    try{
        const deletedExpense = await removeExpense(name);
        res.json(deletedExpense);
    }catch (err){
        console.log(err)
        res.status(400).send("Error deleting expense");
    }
})

router.get('/view',async (req,res)=> {
    try{
        const expenses = await getAllExpenses();
        res.json(expenses);
    }catch (err){
        console.log(err)
        res.status(400).send("Error getting all expense");
    }
})

export default router;