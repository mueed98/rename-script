
import mongoose from 'mongoose'
const whitelistSchema = new mongoose.Schema({
  address: {type: String, required:true,unique: true, index: true, sparse: true },
  allowed: {type: Boolean, default: false},
}, { strict: true });



export default mongoose.model("whitelist", whitelistSchema);