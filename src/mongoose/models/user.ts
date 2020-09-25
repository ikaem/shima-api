import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  password: string;
  email: string;
  currentSocket?: string;
  userRooms?: {
    seen: boolean;
    roomID: string;
  }[];
  refreshToken?: string;
}

// define the user's database schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    currentSocket: {
      type: String,
      required: false,
    },
    userRooms: {
      type: [
        {
          seen: Boolean,
          roomID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
          },
        },
      ],
      default: [],
    },
    refreshToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// define model from the schema
const User = mongoose.model<IUser>("User", userSchema);

// export the model
export default User;
