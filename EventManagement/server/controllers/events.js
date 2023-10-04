const { Events } = require("../database")
const { Attendees } = require("../database")
const cloudinary = require('../utils/cloudinary');





module.exports = {
    getAllEvents: async (req, res) => {
        try {
            const event = await Events.findAll();
            res.status(201).json(event);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    addEvent: async (req, res) => {
        const { name, date, organizer, type, imageUrl, details, location } = req.body
        try {
            const event = await Events.create({ name, date, organizer, type, imageUrl, details, location });
            res.status(201).json(event);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    },

    updateEvent: async (req, res) => {
        const { name, date, organizer, type, imageUrl, details, location } = req.body
        const { id } = req.params
        try {
            const event = await Events.update({ name, date, organizer, type, imageUrl, details, location }, {
                where: {
                    id: id
                }
            });
            res.status(201).json(event);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    },

    removeEvent: async (req, res) => {
        const { id } = req.params
        try {
            await Attendees.destroy({
                where: {
                    events_id: id
                }
            })
            const result = await Events.destroy({
                where: {
                    id: id
                }
            })
            res.status(204).json(result);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    }

}