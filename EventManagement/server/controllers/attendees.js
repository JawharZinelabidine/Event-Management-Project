const { Users, Events } = require("../database")



module.exports = {
    createAttendees: async (req, res) => {
        const { users_ID, events_ID } = req.params
        try {
            const user = await Users.findByPk(users_ID);
            const event = await Events.findByPk(events_ID);

            if (!user || !event) {
                console.error('User or event not found.');
                return;
            }

            await user.addAttendee(event);
            console.log('User added to the event successfully');
        } catch (error) {
            console.error('Error:', error.message);
        }
    },
    getAttendee: async (req, res) => {
        const { id } = req.params
        try {
            const result = await Events.findAll({
                include: {
                    model: Users,
                    as: 'Attendee',
                    where: { id: id },
                },
            });
            res.status(200).json(result);
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    removeAttendee: async (req, res) => {
        const { users_ID, events_ID } = req.params
        try {

            const user = await Users.findByPk(users_ID);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.removeAttendee(events_ID);

            res.status(204).send('event removed');
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

}