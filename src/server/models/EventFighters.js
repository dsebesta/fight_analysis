module.exports = (sequelize, DataTypes) => {
    const EventFighters = sequelize.define('event_fighters', {
        fighter_id: {
            type: DataTypes.INTEGER
        },
        event_id: {
            type: DataTypes.INTEGER
        },
        event_match_id: {
            type: DataTypes.INTEGER
        }
    });
    return EventFighters;
};