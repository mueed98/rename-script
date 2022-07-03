import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
    title : String,
    created_At : { type: Date, default: Date.now },
    updated_At : { type: Date, default: null },
    user : { type: mongoose.Types.ObjectId, ref: "users" },
    nft : { type: mongoose.Types.ObjectId, ref: "nfts" },
    nftCollection: { type: mongoose.Types.ObjectId, ref: "collections" },
    
    postContent : String,
    mediaFiles : [String],
    tags : {type : Array, default: []  },
    flags : { type: mongoose.Types.ObjectId, ref: "users" },
    deleted : { type: Boolean ,default: false},
    deleted_At : { type: Date ,default: null},
    deleted_By :{ type: mongoose.Types.ObjectId, ref: "users" },

    total_favs: {type:Number, default: 0},
}, { strict: true });


export default mongoose.model("posts", postSchema);