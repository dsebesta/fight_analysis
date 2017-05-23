module.exports = (sequelize, DataTypes) => {
    const EventFighters = sequelize.define('event_fighters', {
        event_match_id: {
            type: DataTypes.INTEGER
        },
        event_match_position_id: {
            type: DataTypes.INTEGER
    }
    });
    return EventFighters;
};