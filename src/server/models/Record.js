module.exports = (sequelize, DataTypes) => {
    const Record = sequelize.define('records', {
        name: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        result: {
            type: DataTypes.STRING
        },
        method: {
            type: DataTypes.STRING
        },
        referee: {
            type: DataTypes.STRING
        },
        round: {
            type: DataTypes.STRING
        },
        time: {
            type: DataTypes.STRING
        },
        opponent: {
            type: DataTypes.STRING
        },
        opponent_url: {
            type: DataTypes.STRING
        },

    });
    return Record;
};

