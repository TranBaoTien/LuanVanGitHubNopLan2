'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    //     return queryInterface.bulkInsert('Users', [{
    //       fullname: 'Bao Tien',
    //     username: 'baotien',
    //     password: '$2a$10$uVGIbsNtqUVaghSYkwnJ5.cKNyXaLf.qMA9s3w942ULcor/WOaioW',
    //     idtype: 1,
    //     email: 'baotien@gmail.com',
    //     phone: 919089047
    //     },
    //     {
    
    //         fullname: 'Bao Nhan',
    //       username: 'baonhan',
    //       password:'$2a$10$uVGIbsNtqUVaghSYkwnJ5.cKNyXaLf.qMA9s3w942ULcor/WOaioW',
    //       idtype: 1,
    //       email: 'baonhan@gmail.com',
    //       phone: 902214601
    //     }
      
    //   ]);
    return queryInterface.bulkInsert('Typeuser', [{
        name: "Khach Hang"
      },
      {
  
        name: "Admin"
      }
    
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
