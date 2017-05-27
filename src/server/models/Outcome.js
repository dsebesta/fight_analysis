module.exports = (sequelize, DataTypes) => {
    const Outcomes = sequelize.define('outcomes', {
        title: {
            type: DataTypes.STRING
        }
    });
    return Outcomes;
};