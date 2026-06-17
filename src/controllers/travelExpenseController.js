const TravelExpense = require('../models/TravelExpense');

const createTravelExpense = async (req, res) => {                       /// To create travel-expense
    try{
        const travelExpense = await TravelExpense.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Travel expense created succesfully",
            data: travelExpense,
        });                                                     /// agar suuces hua toh
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });                                                    /// agar fail hua toh
    }
}   

const getTravelExpenses = async (req, res) => {
    try {
        const travelExpenses = await TravelExpense.find();

        return res.status(200).json({
            success: true,
            message: "Travel expense getched succesfully",
            data: travelExpenses,
        });                                                     /// agar suuces hua toh
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });           
    }
}


module.exports = {createTravelExpense, getTravelExpenses}