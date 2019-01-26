module.exports = function(sequelize, DataTypes) {
  //Defining the user model
  var User = sequelize.define("User", {
    //id: Primary key
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    //username: a string that user enters as his/her username to login.
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //password: a string that user enters to confirm their identity to login.
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  //export User model.
  return User;
};
