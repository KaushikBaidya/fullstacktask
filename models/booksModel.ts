// Importing mongoose along with Document and Model types
import mongoose, { Document, Model } from "mongoose";

// Defining the structure of a library book using a TypeScript interface
export interface Library {
  title: string;
  author: string;
  publishedDate: Date;
  genres: string[];
  image: string; // URL to the book cover image
  description?: string; // Optional field for book description
}

// Merging ILibrary with mongoose's Document interface to create a new interface
export interface LibraryDocument extends Library, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Defining a mongoose schema for the library book document
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
      type: [String], // Array of strings representing book genres
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
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: true,
  }
);

// Creating a mongoose model for the library book document
const Library: Model<LibraryDocument> =
  mongoose.models?.Library || mongoose.model("Library", librarySchema);

export default Library;
