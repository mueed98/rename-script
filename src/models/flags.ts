import mongoose from 'mongoose'
const flagSchema = new mongoose.Schema({
    flagTimestamp : { type: Date, default: Date.now },
    user : { type: mongoose.Types.ObjectId, ref: "users", default : null },
    post : { type: mongoose.Types.ObjectId, ref: "posts" },
    flagged : { type: Boolean ,default: false},
}, { strict: true });



export default mongoose.model("flags", flagSchema);