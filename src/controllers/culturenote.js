const CultureNote = require("../models/CultureNote")

let sendRes = {
    success: true,
    message: 'success',
    data: {}
}
const createCultureNote = async (req, res) => {
    try {
        let noteDetails = req.body

        if (!noteDetails || !noteDetails.title || !noteDetails.country || !noteDetails.content) {
            sendRes.message = "Required Params missing"
            return res.status(400).send(
                sendRes
            )
        }
        //Insert in db
        let createnote = {
            title: noteDetails.title,
            country: noteDetails.country,
            content: noteDetails.content

        }

        if (noteDetails.city) {
            createnote.city = noteDetails.city
        }

        if (noteDetails.category) {
            createnote.category = noteDetails.category
        }
        if (noteDetails.tags) {
            createnote.tags = noteDetails.tags
        }

        let noteDbRes = await CultureNote.create(createnote)

        if (noteDbRes) {
            sendRes.error = false
            sendRes.message = "CultureNote added successfully!"
            sendRes.data = noteDbRes
            return res.status(200).send(sendRes)
        }
    } catch (error) {
        console.log("Errro in adding CultureNote", error)

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        })
    }
}
const getCultureNote = async (req, res) => {
    try {
        let noteDetails = req.query
        let filternote = {}

        if (noteDetails.title) {
            filternote.title = noteDetails.title
        }
        if (noteDetails.country) {
            filternote.country = noteDetails.country
        }

        let noteDbRes = await CultureNote.find(filternote)

        sendRes.message = "Culture Note fetched successfully!"
        sendRes.data = noteDbRes

        return res.status(200).send(sendRes)
    } catch (error) {
        console.log("Errro in getting Cultura Note", error)
        return res.status(500).send(sendRes)
    }
}

const getCultureNoteById = async (req, res) => {
    try {
        const id = req.params.id;
        const noteDbRes = await CultureNote.findById(id);

        if (!noteDbRes) {
            return res.status(404).send({
                success: false,
                message: "Culture Note not found",
                data: null
            });
        }

        return res.status(200).send({
            success: true,
            message: "Culture Note fetched successfully!",
            data: noteDbRes
        });

    } catch (error) {
        console.log("Error in getting Culture Note by ID:", error);

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
};

const updateCultureNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const data = req.body;

        const noteDbRes = await CultureNote.findByIdAndUpdate(noteId, data,
            {
                new: true,
                runValidators: true
            }
        );

        if (!noteDbRes) {
            return res.status(404).send({
                success: false,
                message: "Culture Note not found",
                data: null
            });
        }

        return res.status(200).send({
            success: true,
            message: "Culture Note updated successfully!",
            data: noteDbRes
        });

    } catch (error) {
        console.log("Error updating Culture Note:", error);

        return res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }
}
const deleteCultureNote = async (req, res) => {
    try {
        const id = req.params.id;
        const noteDbRes = await CultureNote.findByIdAndDelete(id)

        if (noteDbRes) {
            sendRes.error = false
            sendRes.message = "Culture Note Deleted successfully!"
            sendRes.data = noteDbRes

            return res.status(200).send(sendRes)
        }
    } catch (error) {
        console.log("Errro in getting C Note", error)
        return res.status(500).send(sendRes)
    }
};


module.exports = {
    createCultureNote,
    getCultureNote,
    getCultureNoteById,
    updateCultureNote,
    deleteCultureNote
}