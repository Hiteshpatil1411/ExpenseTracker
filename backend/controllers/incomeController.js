const XLSX =require("xlsx")
const Income = require("../models/Income")
// Add Income Source
exports.addIncome = async (req,res) => {
    const userId=req.user.id;

    try{
        const {icon ,source,amount,date} = req.body;

        //validation
        if(!source || !amount ){
            return res.status(400).json({message:"Source, Amount are required"})
        }

        const newIncome = new Income ({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newIncome.save();
        res.status(201).json(newIncome);
    }catch(error){
        console.error("Error adding income:",error);
        res.status(500).json({message:"Server Error"})
    }
}

// Get all Income Source
exports.getAllIncome = async (req,res) => {
    const userId = req.user.id;

    try{
        const income =  await Income.find({userId}).sort({date:-1});
        res.status(200).json(income)
    }catch(error){
        console.error("Error fetching income:",error);
        res.status(500).json({message:"Server Error"})
    }
}

// Delete Income Source
exports.deleteIncome = async (req,res) => {
    const userId = req.user.id;

    try{
        await Income.findByIdAndDelete(req.params.id)
        res.json({message:"income Deleted Successfully"})

    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
}

// Download Income Excel
exports.downloadIncomeExcel = async (req,res) => {
    const userId = req.user.id;

    try{
        const income =await Income.find({userId}).sort({date:-1})

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0],
        }));

        const wb = XLSX.utils.book_new();
        const ws =XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb,ws,"Income")
        XLSX.writeFile(wb,"income_details.xlsx")
        res.download("income_details.xlsx")

    }catch(error){
        console.error("Error downloading income excel:",error);
        res.status(500).json({message:"Server Error"})  
    }
}
