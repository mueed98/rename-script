import mongoose from "mongoose";
const nftModelSchema = new mongoose.Schema({
  token_id: {type : String, index : true , default : null},
  owner : String,
  token_uri: String,
  numeric_id : {type: Number,index: true, default:null},
  nft_name : {type :String, default:null},
  shortName : {type :String, default:null},
  description : {type :String, default:null},
  block_number_minted: Number,
  synced_date: { type: Date, default: Date.now },
  image: {type :String, default:null},
  metadata: String,
  nftCollection: { type: mongoose.Types.ObjectId, ref: "collections" },
  total_posts : {type: Number, default: 0},
  total_favs : {type: Number, default: 0},
  total_follows : {type: Number, default: 0},
}, { strict: true });



export default mongoose.model("nfts", nftModelSchema);
