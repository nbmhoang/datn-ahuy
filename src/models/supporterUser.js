'use strict';
module.exports = (sequelize, DataTypes) => {
    const Supporter_User = sequelize.define('Supporter_User', {
        supporterId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specializationId: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    }, {});
    Supporter_User.associate = function(models) {
        models.Supporter_User.belongsTo(models.User, { foreignKey: 'supporterId' });
    };
    return Supporter_User;
};