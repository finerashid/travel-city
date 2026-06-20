const express = require("express")

const {
    getTransportOption,
    getTransportOptionById,
    createTransportOption,
    updateTransportOption,
    deleteTransportOption
} = require("../controllers/TransportOption")

const router = express.Router()
const { authenticate } = require("../middlewares/authMiddleware");

router.get("/", authenticate, getTransportOption)
router.get("/:id", authenticate, getTransportOptionById)
router.post("/", authenticate, createTransportOption)
router.patch("/:id", authenticate, updateTransportOption)
router.delete("/:id", authenticate, deleteTransportOption)

module.exports = router;