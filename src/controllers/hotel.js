const Hotel = require("../models/Hotel")
const City = require("../models/City")
const Country = require("../models/Country")
const Mosque = require("../models/Mosque")

const addHotel = async (req, res) => {
     sendRes = {
        "success": false,
        "message": "Something went wrong",
        "data": {}
    }
    try {
    let hotelDetails = req.body
    if(!hotelDetails || !hotelDetails.name || !hotelDetails.city || !hotelDetails.country){
        sendRes.message = "Kindly fill up the required fields"
        return res.status(400).send(sendRes)
    }

    let createHotel = {
        name: hotelDetails.name,
        city: hotelDetails.city,
        country: hotelDetails.country
    }

    if(hotelDetails.address){
        createHotel.address = hotelDetails.address
    }
    if(hotelDetails.location){
        createHotel.location = hotelDetails.location
    }
    if(hotelDetails.starRating){
        createHotel.starRating = hotelDetails.starRating
    }
    if(hotelDetails.pricePerNight){
        createHotel.pricePerNight = hotelDetails.pricePerNight
    }
    if(hotelDetails.amenities){
        createHotel.amenities = hotelDetails.amenities
    }
    if(hotelDetails.muslimFriendlyScore){
        createHotel.muslimFriendlyScore = hotelDetails.muslimFriendlyScore
    }
    if(hotelDetails.nearbyMosques){
        createHotel.nearbyMosques = hotelDetails.nearbyMosques
    }
    if(hotelDetails.images){
        createHotel.images = hotelDetails.images
    }

    const hotelDBDoc = await Hotel.create(createHotel)

    sendRes.success = true
    sendRes.message = "A new hotel document successfully created"
    sendRes.data = hotelDBDoc

    return res.status(200).send(sendRes)
    } catch (error) {
        console.log("Errro in adding a hotel", error)
        return res.status(500).send(sendRes)
    }
    
}

const getHotels = async (req,res)=>{
    sendRes = {
        "success": false,
        "message": "Something went wrong",
        "data": {}
    }
    try {
        const filter = req.body
        const filterHotel = {}
        const{sort,order} = req.query
        const plusOrMinus = order === "asc"? 1:-1

        if(filter.name){
            filterHotel.name = {$regex:filter.name, $options:"i"}
        }
        if(filter.city){
            filterHotel.city = {$regex:filter.city, $options:"i"}
        }
        if(filter.country){
            filterHotel.country = {$regex:filter.country, $options:"i"}
        }
        if(filter.address){
            filterHotel.address = {$regex:filter.address, $options:"i"}
        }

        if(Object.keys(filter).length === 0){
        const hotelList = await Hotel.find()
        .populate('city')
        .populate('country')
        .populate('nearbyMosques.mosque')
        .sort({[sort]:plusOrMinus})

        sendRes.success = true
        sendRes.message = "Here is the list of Hotels"
        sendRes.data = hotelList

        return res.status(200).send(sendRes)
        }

        const hotelByFilter = await Hotel.find(filterHotel)
        .populate('city')
        .populate('country')
        .populate('nearbyMosques.mosque')
        

        if(hotelByFilter.length === 0){
            sendRes.message = "No data matches the value passed"
            return res.status(400).send(sendRes)
        }

        sendRes.success = true
        sendRes.message = "Here is your required data"
        sendRes.data = hotelByFilter

        console.log(sort);
        

        return res.status(200).send(sendRes)
        
    } catch (error) {
        console.log("Error in listing hotels",error);
        return res.status(500).send(sendRes)
        
    }
}

const getHotelsById = async (req,res)=>{
    sendRes = {
        "success": false,
        "message": "Something went wrong",
        "data": {}
    }
    try {
        const hotelId = req.params.id

        const hotelsById = await Hotel.findById(hotelId).populate('city').populate('country').populate('nearbyMosques.mosque')

        if(!hotelsById){
            sendRes.message = "No hotel found corresponding to given ID"
            return res.status(400).send(sendRes)
        }

        sendRes.success = true
        sendRes.message = "Here is your requires hotel details"
        sendRes.data = hotelsById
        return res.status(200).send(sendRes)
    } catch (error) {
        console.log("Error while fetching hotel by Id", error);
        res.status(400).send(sendRes)
    }
    
}

const updateHotel = async (req,res)=>{
    sendRes = {
        "success": false,
        "message": "Something went wrong",
        "data": {}
    }
    try {
        const hotelId = req.params.id
        const update = req.body

        const updateById = await Hotel.findByIdAndUpdate(hotelId,{$set:update},{new:true,runValidators:true}).populate('city').populate('country').populate('nearbyMosques.mosque')

        if(Object.keys(update).length === 0){
            sendRes.message = "No values passed for update"
            return res.status(400).send(sendRes)
        }

        if(!updateById){
            sendRes.message = "No hotel found corresponding to given ID"
            return res.status(400).send(sendRes)
        }

        sendRes.success = true
        sendRes.message = "Update done successfully"
        sendRes.data = updateById

        return res.status(200).send(sendRes)

    } catch (error) {
        console.log("Error while editing hotel by Id", error);
        res.status(400).send(sendRes)
    }
}

const deleteHotel = async (req,res)=>{
     sendRes = {
        "success": false,
        "message": "Something went wrong",
        "data": {}
    }
    try {
       const hotelId = req.params.id
       
       const deletedData = await Hotel.findById(hotelId)
       const deleteById = await Hotel.findByIdAndDelete(hotelId)

       if(!deleteById){
        sendRes.message = "Wrong Id provided"
        return res.status(400).send(sendRes)
       }

       sendRes.success = true
       sendRes.message = "The following data has been deleted successfully"
       sendRes.data = deletedData

       return res.status(200).send(sendRes)
    } catch (error) {
        console.log("Error while deleting hotel by Id", error);
        res.status(400).send(sendRes)
    }
}

module.exports = {
    addHotel,
    getHotels,
    getHotelsById,
    updateHotel,
    deleteHotel
}