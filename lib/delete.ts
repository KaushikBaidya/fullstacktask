'use server';
import Library from "@/models/libraryModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./db";

export const deleteBook = async (id: FormData) => {
  await connectToMongoDB();
  
  const bookId = id.get("id");

  try {
    // Deleting the book with the specified ID
    await Library.deleteOne({ _id: bookId });
    
    // Revalidate the path where the books are listed
    revalidatePath("/books");

    return "Book deleted";
  } catch (error) {
    console.log(error);
    return { message: "Error deleting book" };
  }
};
