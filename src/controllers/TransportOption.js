const TransportOption = require("../models/TransportOption")

let sendRes = {
    success: true,
    message: "Proper Error/Success message",
    data: []
}

async function getTransportOption(req, res) {
    try {
        let findData = {}

        const userData = await TransportOption.find(findData)

        sendRes.message = "Data fetch successfully"
        sendRes.data = userData

        return res.status(200).send(sendRes)
    } catch (error) {
        onsole.error(error);
        sendRes.message = error.message
        return res.status(error.status).send(sendRes);
    }
}

async function getTransportOptionById(req, res) {
    try {
        let id = req.params.id

        if (!id) {
            sendRes.success = false
            sendRes.message = "Id missing"
            return res.status(400).send(sendRes)
        }

        let findData = {
            _id: id
        }

        const userData = await TransportOption.find(findData)

        sendRes.message = "Data fetch successfully"
        sendRes.data = userData

        return res.status(200).send(sendRes)
    } catch (error) {
        onsole.error(error);
        sendRes.message = error.message
        return res.status(error.status).send(sendRes);
    }
}

async function createTransportOption(req, res) {
    try {
        let data = req.body;

        if (!data.fromCity || !data.toCity || !data.type) {
            sendRes.success = false
            sendRes.message = "Required param missing"
            return res.status(400).send(sendRes)
        }

        let createData = {
            fromCity: data.fromCity,
            toCity: data.toCity,
            type: data.type
        }

        if (data.provider) {
            createData.provider = data.provider
        }

        if (data.estimatedDuration) {
            createData.estimatedDuration = data.estimatedDuration
        }

        if (data.estimatedCost) {
            createData.estimatedCost = data.estimatedCost
        }

        if (data.currency) {
            createData.currency = data.currency
        }

        if (data.provider) {
            createData.estimatedCost = data.estimatedCost
        }

        if (data.bookingUrl) {
            createData.bookingUrl = data.bookingUrl
        }

        if (data.notes) {
            createData.notes = data.notes
        }

        const createTransport = await TransportOption.create(createData)

        sendRes.message = "Data fetch successfully"
        sendRes.data = createTransport

        return res.status(200).send(sendRes)
    } catch (error) {
        onsole.error(error);
        sendRes.message = error.message
        return res.status(error.status).send(sendRes);
    }
}

async function updateTransportOption(req, res) {
    try {
        let data = req.body;

        if (!data) {
            sendRes.success = false
            sendRes.message = "Not allowed"
            return res.status(400).send(sendRes)
        }

        if (!data.fromCity || !data.toCity || !data.type) {
            sendRes.success = false
            sendRes.message = "Required data missing"
            return res.status(400).send(sendRes)
        }

        let createData = {
            fromCity: data.fromCity,
            toCity: data.toCity,
            type: data.type
        }

        if (data.provider) {
            createData.provider = data.provider
        }

        if (data.estimatedDuration) {
            createData.estimatedDuration = data.estimatedDuration
        }

        if (data.estimatedCost) {
            createData.estimatedCost = data.estimatedCost
        }

        if (data.currency) {
            createData.currency = data.currency
        }

        if (data.provider) {
            createData.estimatedCost = data.estimatedCost
        }

        if (data.bookingUrl) {
            createData.bookingUrl = data.bookingUrl
        }

        if (data.notes) {
            createData.notes = data.notes
        }

        let findData = {
            _id: data._id
        }

        const updateTransport = await TransportOption.findOneAndUpdate(findData, createData, { new: true })

        sendRes.message = "Data updated successfully"
        sendRes.data = updateTransport

        return res.status(200).send(sendRes)
    } catch (error) {
        onsole.error(error);
        sendRes.message = error.message
        return res.status(error.status).send(sendRes);
    }
}

async function deleteTransportOption() {
    try {
        let id = req.params.id

        if (!id) {
            sendRes.success = false
            sendRes.message = "Id missing"
            return res.status(400).send(sendRes)
        }

        let findData = {
            _id: id
        }

        const userData = await TransportOption.findByIdAndDelete(findData)

        sendRes.message = "Data deleted successfully"

        return res.status(200).send(sendRes)
    } catch (error) {
        onsole.error(error);
        sendRes.message = error.message
        return res.status(error.status).send(sendRes);
    }
}

module.exports = {
    getTransportOption,
    getTransportOptionById,
    createTransportOption,
    updateTransportOption,
    deleteTransportOption
}