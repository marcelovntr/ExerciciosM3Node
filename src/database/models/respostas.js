const Sequelize = require('sequelize')
const database = require('../config')

const Respostas = database.define('respostas',{
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
})
module.exports = { Respostas }