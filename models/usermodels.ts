import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },

  //whenever we protecting the route we need role

  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
  },

  //github and google id
  authProviderId: {
    type: String,
  },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
