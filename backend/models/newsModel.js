import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  content:String,
  url: String,
  image:String,
  publishedAt: Date,
  source:Object,
  category:String
});

export const News = mongoose.model('News', newsSchema);
