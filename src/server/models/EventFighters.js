module.exports = (sequelize, DataTypes) => {
    const EventFighters = sequelize.define('event_fighters', {
        event_match_id: {
            type: DataTypes.INTEGER
        }
    });
    return EventFighters;
};