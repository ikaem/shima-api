import mongoose from "mongoose";

export interface IMessage {
  authorID: string;
  content: string;
  _id: string;
  createdAt: Date;
}

export interface IRoom extends mongoose.Document {
  name: string;
  privateRoom: boolean;
  messages?: IMessage[];
}

const messageSchema = new mongoose.Schema(
  {
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: Boolean,
      trim: true,
    },
    privateRoom: {
      type: Boolean,
      required: true,
    },
    messages: [
      messageSchema,
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;
