
import mongoose, { Document, Model } from "mongoose";


export interface Library {
  title: string;
  author: string;
  publishedDate: Date;
  genres: string[];
  image: string; 
  description?: string; 
}


export interface LibraryDocument extends Library, Document {
  createdAt: Date;
  updatedAt: Date;
}


const librarySchema = new mongoose.Schema<LibraryDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    genres: {
      type: [String], 
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
   
    timestamps: true,
  }
);


const Library: Model<LibraryDocument> =
  mongoose.models?.Library || mongoose.model("Library", librarySchema);

export default Library;
