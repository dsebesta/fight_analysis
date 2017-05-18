module.exports = (sequelize, DataTypes) => {
    const Fighter = sequelize.define('fighters', {
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