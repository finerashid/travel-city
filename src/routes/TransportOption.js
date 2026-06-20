const express = require("express")

const {
    getTransportOption,
    getTransportOptionById,
    createTransportOption,
    updateTransportOption,
    deleteTransportOption
} = require("../controllers/TransportOption")

const router = express.Router()

router.get("/get", getTransportOption)
router.get("/get/:id", getTransportOptionById)
router.post("/create", createTransportOption)
router.patch("/update/:id", updateTransportOption)
router.delete("/delete/:id", deleteTransportOption)

module.exports = router;