'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   await queryInterface.createTable('respostas', { 
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    conteudo: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    perguntaId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'perguntas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    usuariod: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('respostas');
     
  }
};
