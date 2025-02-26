import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    age: Number,
    email: String,
    password: {
      type: String,
      required: true,
      //   select: false, // hide password in response
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  // hash the password before saving it to the database
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// export const user =  mongoose.model("User", userSchema);
const user = mongoose.model("User", userSchema);
export default user;
