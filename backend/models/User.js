const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  { timestamps: true }
);

// Indexes for better query performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

// Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// Method to compare passwords
// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

module.exports = mongoose.model("User", userSchema);
