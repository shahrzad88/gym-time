module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      values: ['Yoga', 'Pilates', 'Boxing', 'Cycling', 'Cardio', 'Weights', 'calisthenics'],
      required: true,
    },
    startTime: {
      type: DataTypes.DATE,
      required: true
    },
    endTime: {
      type: DataTypes.DATE,
      required: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    creator: {
      type: DataTypes.UUID, //user_id
      required: true
    }
  });
  Activity.associate = function(models) {
    // We're saying that a Workout should belong to a User
    // A Workout can't be created without a User due to the foreign key constraint
    Activity.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Activity;
};
