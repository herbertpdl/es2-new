module.exports = (sequelize, DataType) => {
  const Course = sequelize.define(
    "Curso",
    {
      name: DataType.STRING,
      period: DataType.INTEGER,
    },
    {
      freezeTableName: true
    }
    
  );

  return Course;
};