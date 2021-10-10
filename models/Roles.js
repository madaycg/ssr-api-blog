module.exports = (sequelize, Model, DataTypes) => {
  class Roles extends Model {}

  Roles.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      reed: {
        type: DataTypes.INTEGER,
      },
      write: {
        type: DataTypes.INTEGER,
      },
      edit: {
        type: DataTypes.INTEGER,
      },
      admin: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      }
    
    },
    {
      sequelize,
      modelName: "roles",
    }
  );

  return Roles;
};
