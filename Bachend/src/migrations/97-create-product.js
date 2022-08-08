'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique:true
      },
    
      xuatxu: {
        allowNull: true,
        type: Sequelize.STRING
      },
      timebaohanh: {
        allowNull: true,
        type: Sequelize.STRING
      },
      size: {
        allowNull: true,
        type: Sequelize.STRING
      },
      weigth: {
        allowNull: true,
        type: Sequelize.STRING
      },
      chatlieu: {
        allowNull: true,
        type: Sequelize.STRING
      },
      chip: {
        allowNull: true,
        type: Sequelize.STRING
      },
      sonhan: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ram: {
        allowNull: true,
        type: Sequelize.STRING
      },
      sizescreen: {
        allowNull: true,
        type: Sequelize.STRING
      },
      technologyscreen: {
        allowNull: true,
        type: Sequelize.STRING
      },
      dophangiai: {
        allowNull: true,
        type: Sequelize.STRING
      },
      camsau: {
        allowNull: true,
        type: Sequelize.STRING
      },
      camtruoc: {
        allowNull: true,
        type: Sequelize.STRING
      },
      musim: {
        allowNull: true,
        type: Sequelize.STRING
      },
      congsac: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pin: {
        allowNull: true,
        type: Sequelize.STRING
      },
      hedieuhanh: {
        allowNull: true,
        type: Sequelize.STRING
      },
      img: {
        allowNull: true,
        type: Sequelize.STRING
      },
      idth: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Thuonghieus',
          key: 'id',
        }
      },
      idtype: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Typeproducts',
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
    await queryInterface.dropTable('Products');
  }
};