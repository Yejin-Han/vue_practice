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
    imgcnt: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    /* updatedAt, createdAt은 sequelize에서 자동으로 생성해준다고 함 */
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // db에 한글 사용이 가능하도록 함
  });
}