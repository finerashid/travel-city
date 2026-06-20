const Country = require('../models/Country');

// Create a new country
const createCountry = async (req, res) => {
    let sendRes = {
"success": false,
"message": "Country creation failed",
"data": {}
    }
  try {
    let countryDetails = req.body;
    if (!countryDetails.name || !countryDetails.code || !countryDetails.continent || !countryDetails) {
        sendRes.message = "Missing required fields: name, code, continent";
        return res.status(400).send(sendRes);
    }
    let create = {
        name: countryDetails.name,
        code: countryDetails.code,
        continent: countryDetails.continent
    };
    if (countryDetails.description) 
        {create.description = countryDetails.description};
    if (countryDetails.currency) 
        {create.currency = countryDetails.currency};
    if (countryDetails.languages) 
        {create.languages = countryDetails.languages};
    if (countryDetails.bestTimeToVisit) 
        {create.bestTimeToVisit = countryDetails.bestTimeToVisit};
    if (countryDetails.safetyLevel) 
        {create.safetyLevel = countryDetails.safetyLevel}; 

    

    const newdoc = await Country.create(create);
    sendRes.success = true;
    sendRes.message = "Country created successfully";
    sendRes.data = newdoc;
    return res.status(201).send(sendRes)

  } catch (error) {
    sendRes.message = "Error creating country";
    return res.status(500).send(sendRes);
  }
};

//get country detail
 const getCountry = async (req, res) => {
       let sendRes = {
"success": false,
"message": "Country retrieval failed",
"data": {}
    }
    try {
        const countryfilter = req.body;
        const country = await Country.findOne(countryfilter);
        if (!country) {
            sendRes.message = "Country not found";
            return res.status(404).send(sendRes);
        }   
        if (Object.keys(countryfilter).length === 0) {
            let countries = await Country.find();
            sendRes.success = true;
            sendRes.message = "Countries retrieved successfully";
            sendRes.data = countries;
            return res.status(200).send(sendRes);
        }
        sendRes.success = true;
        sendRes.message = "Country retrieved successfully";
        sendRes.data = country;
        return res.status(200).send(sendRes);
    } catch (error) {
        sendRes.message = "Error retrieving country";
        return res.status(500).send(sendRes);
    }           
 }

const getCountryById = async (req, res) => {
    let sendRes = {
        "success": false,
        "message": "Country retrieval failed",
        "data": {}
    }
    try {
        const countryId = req.params.id;    
        const country = await Country.findById(countryId);
        if (!country) {
            sendRes.message = "Country not found";
            return res.status(404).send(sendRes);
        }                   
        sendRes.success = true;
        sendRes.message = "Country retrieved successfully";
        sendRes.data = country;
        return res.status(200).send(sendRes);
    } catch (error) {
        sendRes.message = "Error retrieving country";
        return res.status(500).send(sendRes);
    }       

}   

const updateCountry = async (req, res) => {
    let sendRes = {
        "success": false,           
        "message": "Country update failed",
        "data": {}
    }   
    try {
        const countryId = req.params.id;
        const updateData = req.body;
        const updatedCountry = await Country.findByIdAndUpdate(countryId, updateData, { new: true });

        if (!updatedCountry) {
            sendRes.message = "Country not found";
            return res.status(404).send(sendRes);
        }

        sendRes.success = true;
        sendRes.message = "Country updated successfully";
        sendRes.data = updatedCountry;
        return res.status(200).send(sendRes);
    } catch (error) {
        sendRes.message = "Error updating country";
        return res.status(500).send(sendRes);
    }
}

const deleteCountry = async (req, res) => {
    let sendRes = {
        "success": false,   
        "message": "Country deletion failed",
        "data": {}
    }           
    try {
        const countryId = req.params.id;
        const deletedCountry = await Country.findByIdAndDelete(countryId);

        if (!deletedCountry) {
            sendRes.message = "Country not found";
            return res.status(404).send(sendRes);
        }

        sendRes.success = true;
        sendRes.message = "Country deleted successfully";
        sendRes.data = deletedCountry;
        return res.status(200).send(sendRes);   
        
    }
        catch (error) {
        sendRes.message = "Error deleting country";
        return res.status(500).send (sendRes);
    }   
}
   

module.exports = { createCountry, getCountry, getCountryById, updateCountry, deleteCountry };