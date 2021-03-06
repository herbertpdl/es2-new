const Sequelize = require("sequelize");

module.exports = (sequelize, DataType) => {
    const Questionalternative = sequelize.define(
      "Questionalternative",
      {        
        alternative_id: DataType.INTEGER,
        question_id: DataType.INTEGER,
      },
      {
        freezeTableName: true
      }
    );

    Questionalternative.removeAttribute('id');

    return Questionalternative;
  };