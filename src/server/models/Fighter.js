module.exports = (sequelize, DataTypes) => {
    const Fighter = sequelize.define('fighters', {
        fighter_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        fighter_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fighter_url: {
            type: DataTypes.STRING
        }
    });
    return Fighter;
};

