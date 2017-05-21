module.exports = (sequelize, DataTypes) => {
    const Venue = sequelize.define('events', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
        },
        elevation: {
            type: DataTypes.INTEGER
        }
    });
    return Venue;
};