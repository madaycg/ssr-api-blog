module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: {
          msg: "Email in use",
        },
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      roleId: {
        type: DataTypes.BIGINT.UNSIGNED,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  return User;
};
