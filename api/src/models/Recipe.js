const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
    },
    score:{
      type:DataTypes.FLOAT,
    },
    steps: {
      type: DataTypes.TEXT,
    },
    image:{
      type:DataTypes.STRING,
    },
    createInDb:{
      type:DataTypes.BOOLEAN,
      defaultValue:true,
    }


  });
};
