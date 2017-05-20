module.exports = (sequelize, DataTypes) => {
    const Fighter = sequelize.define('fighters', {
        fighter_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER
        }
    });
    return Fighter;
};