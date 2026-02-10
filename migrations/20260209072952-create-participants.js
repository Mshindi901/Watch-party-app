'use strict';

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Participants', {
      id: {
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID
      },
      guestId: {
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        type: Sequelize.UUID
      },
      RoomId: {
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'id'
        },
        type: Sequelize.UUID
      },
      joinedAt: {
        type: Sequelize.DATE,
        allowNull: false
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
    await queryInterface.dropTable('Participants');
  }
};