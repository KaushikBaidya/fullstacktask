'use server';
import Library from "@/models/libraryModel";
import { connectToMongoDB } from "./db";

export const getBooks = async () => {
  await connectToMongoDB();

  try {
    const books = await Library.find({});
    return books;
  } catch (error) {
    console.log(error);
    return { message: "Error retrieving books" };
  }
};
