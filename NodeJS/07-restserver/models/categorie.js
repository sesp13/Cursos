const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
    unique: true
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    //The same as the exported name in UserSchema
    ref: "User",
    required: [true, "The user's id is required"],
  },
});

//Modify to Json method
CategorySchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject();
  return data;
};

module.exports = model("Category", CategorySchema);
