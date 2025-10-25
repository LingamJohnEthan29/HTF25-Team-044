import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  walletAddress: { type: String, required: true, unique: true },
  name: String
});

export default model('User', UserSchema);
