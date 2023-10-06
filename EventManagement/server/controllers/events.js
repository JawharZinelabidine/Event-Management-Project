const { Events } = require("../database")
const { Attendees } = require("../database")
const cloudinary = require('../utils/cloudinary');
const { Readable } = require('stream')






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
        try {
            const { name, date, organizer, type, details, location } = req.body
            const imageBuffer = req.file.buffer;
            const imageStream = Readable.from(imageBuffer)


            const cloudinaryResult = await cloudinary.uploader.upload_stream({
                resource_type: 'image',
            },
                async (error, result) => {
                    if (error) {
                        console.error('Error uploading image to Cloudinary:', error);
                        res.status(500).json({ error: 'Image upload failed' });
                    }
                    console.log(cloudinaryResult)
                    const event = await Events.create({ name, date, organizer, type, imageUrl: result.secure_url, details, location });
                    res.status(201).json(event);
                }
            )

            imageStream.pipe(cloudinaryResult);

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    updateEvent: async (req, res) => {
        try {
            const { name, date, organizer, type, details, location } = req.body
            const { id } = req.params
            const imageBuffer = req.file.buffer;
            const imageStream = Readable.from(imageBuffer)


            const cloudinaryResult = await cloudinary.uploader.upload_stream({
                resource_type: 'image',
            },
                async (error, result) => {
                    if (error) {
                        console.error('Error uploading image to Cloudinary:', error);
                        res.status(500).json({ error: 'Image upload failed' });
                    }
                    console.log(cloudinaryResult)
                    const event = await Events.update({ name, date, organizer, type, imageUrl: result.secure_url, details, location }, {
                        where: {
                            id: id
                        }
                    });
                    res.status(201).json(event);
                }
            )

            imageStream.pipe(cloudinaryResult);

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



