const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The user's id is required"],
  },
  price: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
    default: ""
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//Modify to Json method
ProductSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Product", ProductSchema);
