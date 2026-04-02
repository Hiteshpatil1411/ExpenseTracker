const Income = require ("../models/Income")
const Expense = require("../models/Expense")
const {Types} = require("mongoose")

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(userId);

        const since60Days = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
        const since30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const [
            totalIncome,
            totalExpense,
            last60DaysIncomeTransactions,
            last60DaysExpenseTransactions,
            last30DaysExpenseTransactions,
            lastIncomeT,
            lastExpenseT,
        ] = await Promise.all([
            // Total income (all time)
            Income.aggregate([
                { $match: { userId: userObjectId } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),

            // Total expense (all time)
            Expense.aggregate([
                { $match: { userId: userObjectId } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]),

            // Last 60 days income transactions
            Income.find({
                userId,
                date: { $gte: since60Days }
            }).sort({ date: -1 }),

            // Last 60 days expense transactions
            Expense.find({
                userId,
                date: { $gte: since60Days }
            }).sort({ date: -1 }),

            // Last 30 days expense transactions
            Expense.find({
                userId,
                date: { $gte: since30Days }
            }).sort({ date: -1 }),

            // Last 5 income transactions
            Income.find({ userId })
                .sort({ date: -1 })
                .limit(5),

            // Last 5 expense transactions
            Expense.find({ userId })
                .sort({ date: -1 })
                .limit(5),
        ]);

        // Calculate totals from transactions
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, txn) => sum + txn.amount, 0
        );

        const expenseLast60Days = last60DaysExpenseTransactions.reduce(
            (sum, txn) => sum + txn.amount, 0
        );

        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, txn) => sum + txn.amount, 0
        );

        // Merge and sort last 5 transactions
        const lastTransactions = [
            ...lastIncomeT.map(txn => ({ ...txn.toObject(), type: "income" })),
            ...lastExpenseT.map(txn => ({ ...txn.toObject(), type: "expense" }))
        ].sort((a, b) => b.date - a.date).slice(0, 5);

        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};