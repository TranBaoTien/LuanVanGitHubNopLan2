'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Detailoders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quatity: {
        type: Sequelize.INTEGER
      },
      namepro: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      idpro: {
        type: Sequelize.INTEGER,
      
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        }
        
      },
      idoder: {
        type: Sequelize.INTEGER,
      
        allowNull: false,
        references: {
          model: 'Oders',
          key: 'id',
        }
      },
      summoney: {
        type: Sequelize.DOUBLE
      },
      idbh: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Detailoders');
  }
};