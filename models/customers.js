// Author: Tom Hollis
// Inspired/informed by https://medium.com/@paigen11/sequelize-the-orm-for-sql-databases-with-nodejs-daa7c6d5aca3
const sequelize = require('sequelize');

exports.model = (db) => { 
    return db.define('customers', {
        CustomerId: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CustFirstName: { 
            type: sequelize.STRING,
            allowNull: false
        },
        CustLastName: {
            type: sequelize.STRING,
            allowNull: false
        },
        CustAddress: {
            type: sequelize.STRING,
            allowNull: false
        },
        CustCity: {
            type: sequelize.STRING,
            allowNull: false           
        },
        CustProv: {
            type: sequelize.STRING,
            allowNull: false           
        },
        CustPostal: {
            type: sequelize.STRING,
            allowNull: false           
        },
        CustCountry: {
            type: sequelize.STRING,
            allowNull: true          
        },
        CustHomePhone: {
            type: sequelize.STRING,
            allowNull: true           
        },
        CustBusPhone: {
            type: sequelize.STRING,
            allowNull: false           
        },
        CustEmail: {
            type: sequelize.STRING,
            allowNull: false           
        },
        AgentId: {
            type: sequelize.INTEGER,
            allowNull: true           
        },
        CustUsername: {
            type: sequelize.STRING,
            allowNull: true          
        },
        CustPassword: {
            type: sequelize.STRING,
            allowNull: true           
        }
    });
};