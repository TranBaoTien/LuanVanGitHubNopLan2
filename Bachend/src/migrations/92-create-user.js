'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        
      },
      fullname: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
        unique:true
      },
      password: {
        type: Sequelize.STRING
      },
      idtype: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Typeusers',
          key: 'id',
        }
      },
      email: {
        type: Sequelize.STRING,
        unique:true
      },
      phone: {
        type: Sequelize.INTEGER,
       
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
    await queryInterface.dropTable('Users');
  }
};