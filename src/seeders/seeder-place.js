'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Places', [
            {
                name: 'Huế',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sài Gòn',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Đà Nẵng',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Quảng Nam',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Hà Nội',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Places', null, {});
    }
};
