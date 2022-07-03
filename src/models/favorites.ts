import mongoose from 'mongoose'
const favoriteSchema = new mongoose.Schema({
    fav_timestamp : { type: Date, default: Date.now },
    user : { type: mongoose.Types.ObjectId, ref: "users", default : null },
    posts : { type: mongoose.Types.ObjectId, ref: "posts" },
    unfave : { type: Boolean ,default: true},
    unfav_timestamp : { type: Date, default: null },
}, { strict: true });



export default mongoose.model("favorites", favoriteSchema);