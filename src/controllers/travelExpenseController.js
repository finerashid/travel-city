const TravelExpense = require('../models/TravelExpense');

const validateObejectId = require("../middlewares/validateObjectId");

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
            message: "Travel expense fetched succesfully",
            data: travelExpenses,
        });                                                     /// agar suuces hua toh
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,                                         /// agar fail hua toh
        });           
    }
}


const getTravelExpenseById = async (req, res) => {
    try {
        const expense = await TravelExpense.findById(req.params.id);
 
        if(!expense) {
            return res.status(404).json({
            success: false,
            message: "Travel expense not found",
            data: null,                                         /// agar travel expense ki id match nahi hui to fail honga
        });   
        }

        return res.status(200).json({
            success: true,
            message: "Travel expense fetched succesfully",
            data: expense,                                      /// agar suuces hua toh
        });                    
    }  catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,                                         /// agar fail hua toh
        });  
}
}


const updateTravelExpense = async (req, res) => {
    try {
        const travelExpense = await TravelExpense.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true,});

        if(!travelExpense) {
           return res.status(404).json({
            success: false,
            message: "Travel expense not found",
            data: null,                                         /// agar travel expense ki id match nahi hui to fail honga
        });   
        }

        return res.status(200).json({
            success: true,
            message: "Travel expense updated succesfully",
            data: travelExpense,                                      /// agar suuces hua toh
        });                    
    }  catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,                                         /// agar fail hua toh
        });  
    }
};


module.exports = {createTravelExpense, getTravelExpenses, getTravelExpenseById, updateTravelExpense,};