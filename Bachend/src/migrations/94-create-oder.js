'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Oders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      iduser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      note: {
        type: Sequelize.TEXT
      },
      idpay: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Payments',
          key: 'id',
        }
      },
      idvoucher: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vouchers',
          key: 'id',
        }
      },
      idstatus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Statuses',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Oders');
  }
};