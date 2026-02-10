'use strict';

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      roomcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hostId: {
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        type: Sequelize.UUID,
      },
      videoUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currentTime: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      isplaying: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};