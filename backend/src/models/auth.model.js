import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        
      },
      password : {
        type: String,
      }


    },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified) {
    return
  }
  const hash = await  bcrypt.hash(this.password)
  this.password = this.password
  return
})

userSchema.method.comparePassword= async function (pazsword) {
  return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("User", userSchema);

export default userModel