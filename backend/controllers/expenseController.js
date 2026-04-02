const XLSX =require("xlsx")
const Expense = require("../models/Expense")
// Add Expense Source
exports.addExpense = async (req,res) => {
    const userId=req.user.id;

    try{
        const {icon ,category,amount,date} = req.body;

        //validation
        if(!category || !amount ){
            return res.status(400).json({message:"category, Amount are required"})
        }

        const newExpense = new Expense ({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    }catch(error){
        console.error("Error adding Expense:",error);
        res.status(500).json({message:"Server Error"})
    }
}

// Get all Expense category
exports.getAllExpense = async (req,res) => {
    const userId = req.user.id;

    try{
        const expense =  await Expense.find({userId}).sort({date:-1});
        res.status(200).json(expense)
    }catch(error){
        console.error("Error fetching Expense:",error);
        res.status(500).json({message:"Server Error"})
    }
}

// Delete Expense category
exports.deleteExpense = async (req,res) => {
    const userId = req.user.id;

    try{
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message:"Expense Deleted Successfully"})

    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
}

// Download Expense Excel
exports.downloadExpenseExcel = async (req,res) => {
    const userId = req.user.id;

    try{
        const expense =await Expense.find({userId}).sort({date:-1})

        //prepare data for excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0],
        }));

        const wb = XLSX.utils.book_new();
        const ws =XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Expense")
        XLSX.writeFile(wb,"expense_details.xlsx")
        res.download("expense_details.xlsx")

    }catch(error){
        console.error("Error downloading expense excel:",error);
        res.status(500).json({message:"Server Error"})  
    }
}
