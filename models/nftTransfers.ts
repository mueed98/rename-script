import mongoose from "mongoose";
const nftTransferSchema = new mongoose.Schema({
  _id: String,
  from_address: String,
  to_address: String,
  price: { type: Number, default: 0 },
  block_number: String,
  block_timestamp: Date,
  block_hash: String,
  transaction_hash: String,
  nft :{ type: mongoose.Types.ObjectId, ref: "nfts" }
}, { strict: true });


// Connects launchesSchema with the "launches" collection
export default mongoose.model("nftTransfers", nftTransferSchema);
