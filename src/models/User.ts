import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        mobile: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        role: { type: String, default: 'user' },
        resetOtp: { type: String },
        resetOtpExpiry: { type: Date },
    },
    { timestamps: true }
);

// This prevents mongoose from keeping the old schema without the OTP fields during hot-reloads
if (mongoose.models.User) {
    delete mongoose.models.User;
}

export default mongoose.model("User", UserSchema);
