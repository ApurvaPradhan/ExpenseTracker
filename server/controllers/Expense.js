const expenseScheme = require("../models/expenseModel");
exports.addExpense = async (req, res) => {
  const { source, amount, description, category, date } = req.body;
  const income = new expenseScheme({
    source,
    amount,
    category,
    description,
    date,
  });
  try {
    //validations
    if (!source || !category || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(income);
};
exports.getExpense = async (req, res) => {
  try {
    const incomes = await expenseScheme.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await expenseScheme.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense Deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Failed to delete expense:${err.message}` });
  }
};
