import mongoose from 'mongoose'
const followsSchema = new mongoose.Schema({
    follow_timestamp : { type: Date, default: Date.now },
    user : { type: mongoose.Types.ObjectId, ref: "users" },
    nft : { type: mongoose.Types.ObjectId, ref: "nfts" },
    unfollow : { type: Boolean ,default: true},
    unfollow_timestamp : { type: Date, default: null },
}, { strict: true });



export default mongoose.model("follows", followsSchema);