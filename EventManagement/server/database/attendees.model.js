module.exports = (sequelize, DataTypes) => {
    const Attendees = sequelize.define("attendees", {});

    return Attendees;
};