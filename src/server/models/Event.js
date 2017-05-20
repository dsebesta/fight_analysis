module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('events', {
        event_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
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
        }
    });
    return Event;
};