import mongoose from 'mongoose'
const nftCollectionSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  slug: String,
  address: String,
  block_number: Number,
  contract_type: String,
  description: String,
  banner_image_url: String, 
  featured_image_url: String,
  image_url: String,
  total_tokens:String,
  time_added: { type: Date, default: Date.now },

  chat_url: String,
  created_date: String,
  default_to_fiat: Boolean,
  discord_url: String,
  external_url: String,
  featured: Boolean,
  hidden: Boolean,
  is_subject_to_whitelist: Boolean,
  medium_username: String,
  only_proxied_transfers: Boolean,
  payout_address: String,
  require_email: Boolean,
  short_description: String,
  telegram_url: String,
  twitter_username: String,
  instagram_username:String,
  wiki_url: String,
  is_nsfw: Boolean,

  total_posts : {type: Number, default: 0},
  total_favs : {type: Number, default: 0},
  total_follows : {type: Number, default: 0},
}, { strict: true });


export default mongoose.model("collections", nftCollectionSchema);
