'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Productreviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idoder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Oders',
          key: 'id',
        }
      },
      iduser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      
      start: {
        type: Sequelize.DOUBLE
      },
      cmt: {
        type: Sequelize.TEXT
      },
      edit: {
        type: Sequelize.BOOLEAN
      },
      idpro: {
        type: Sequelize.INTEGER,
        allowNull: false,
       
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
    await queryInterface.dropTable('Productreviews');
  }
};