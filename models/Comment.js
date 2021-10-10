module.exports = (sequelize, Model, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "comment",
    },
  );

  return Comment;
};
