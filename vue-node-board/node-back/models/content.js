module.exports = (sequelize, DataTypes) => {
  return sequelize.define('content', {
    writer: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(3000),
    },
    boardnum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // db에 한글 사용이 가능하도록 함
  });
}