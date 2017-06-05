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
        },
        fighter_url: {
            type: DataTypes.STRING
        },
        wins: {
            type: DataTypes.INTEGER
        },
        wins_ko: {
            type: DataTypes.INTEGER
        },
        wins_sub: {
            type: DataTypes.INTEGER
        },
        wins_dec: {
            type: DataTypes.INTEGER
        },
        wins_other: {
            type: DataTypes.INTEGER
        },
        losses: {
            type: DataTypes.INTEGER
        },
        losses_ko: {
            type: DataTypes.INTEGER
        },
        losses_sub: {
            type: DataTypes.INTEGER
        },
        losses_dec: {
            type: DataTypes.INTEGER
        },
        losses_other: {
            type: DataTypes.INTEGER
        },
        no_contest: {
            type: DataTypes.INTEGER
        },
        draw: {
            type: DataTypes.INTEGER
        },
        height: {
            type: DataTypes.STRING
        },
        weight: {
            type: DataTypes.STRING
        },
        weight_class: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.STRING
        },
        birthday: {
            type: DataTypes.STRING
        },
        locality: {
            type: DataTypes.STRING
        },
        nationality: {
            type: DataTypes.STRING
        },
        association: {
            type: DataTypes.STRING
        },
        ufc_fights: {
            type: DataTypes.INTEGER
        },
        mma_rounds: {
            type: DataTypes.INTEGER
        },
        days_last_fight: {
            type: DataTypes.INTEGER
        },
        days_last_win: {
            type: DataTypes.INTEGER
        },
        days_last_loss: {
            type: DataTypes.INTEGER
        },
        years_mma_career: {
            type: DataTypes.INTEGER
        },
        off_loss: {
            type: DataTypes.STRING
        },
        year_avg_rounds: {
            type: DataTypes.FLOAT
        }
    });
    return Fighter;
};

