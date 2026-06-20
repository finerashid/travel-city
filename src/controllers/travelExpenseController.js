const TravelExpense = require('../models/TravelExpense');
require('../models/User');
require('../models/TravelItinerary');

const validateObejectId = require("../middlewares/validateObjectId");

const createTravelExpense = async (req, res) => {                       /// To create travel-expense
    try{
        const travelExpense = await TravelExpense.create(req.body);   ///...req.body, user: req.user._id     for just user 

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
    
    const page =Number(req.query.page) || 1;
    const limit =Number(req.query.limit) || 10;
    const sort = req.query.sort || "-createdAT";

    const skip =(page - 1)* limit;
    
    try {
        const travelExpenses = await TravelExpense.find()    /// {user: req.user._id}   for only user 
        .populate("user", "name email")
        .populate("itinerary", "title budget")
        .sort(sort)
        .skip(skip)
        .limit(limit);

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
        const expense = await TravelExpense.findById(req.params.id)  ///findOne ({_id: req.params.id, user:req.user._id})   for only user
        .populate("user", "name email")
        .populate("itinerary", "title budget");
 
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
        const travelExpense = await TravelExpense.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true,});   ///findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body,{new: true, runValidators: true,}) for only user 
 
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


const deleteTravelExpenses = async (req, res) => {
    try{
        const travelExpense = await TravelExpense.findByIdAndDelete(req.params.id);  ///findOneAndDelete({_id: req.params.id, user: req.user._id})   for only user

        if(!travelExpense) {
           return res.status(404).json({
            success: false,
            message: "Travel expense not found",
            data: null,                                         /// agar travel expense ki id match nahi hui to fail honga
        });   
        }

        return res.status(200).json({
            success: true,
            message: "Travel expense deleted succesfully",
            data: travelExpense,                                      /// agar suuces hua toh
        });                    
    }  catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,                                         /// agar fail hua toh
        });  
    }
}


module.exports = {createTravelExpense, getTravelExpenses, getTravelExpenseById, updateTravelExpense, deleteTravelExpenses,};