module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('events', {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        venue: {
            type: DataTypes.STRING
        },
        event_date: {
            type: DataTypes.STRING
        },
        sherdog_url: {
            type: DataTypes.STRING
        },
        fighter_id: {
            type: DataTypes.INTEGER
        }
    });
    return Event;
};