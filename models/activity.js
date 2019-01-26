module.exports = function(sequelize, DataTypes) {
  //Defining the Activity model that represent a user workout activity.
  var Activity = sequelize.define("Activity", {
    //id: Primary key
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    //type: the target activity can be any type of workout that can be done at a gym.
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
    //location: the address of the gym that activity is going to take place
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //creator: the user who created the activity
    creator: {
      //user_id
      type: DataTypes.UUID,
      required: true
    }
  });
  Activity.associate = function(models) {
    //We're saying that a Workout should belong to a User
    //A Workout can't be created without a User due to the foreign key constraint
    Activity.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  //export Activity model.
  return Activity;
};
