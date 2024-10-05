'use server';
import Library from "@/models/libraryModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./db";

export const createBook = async (formData: FormData) => {
  await connectToMongoDB();
  
  // Extracting book details from formData
  const title = formData.get("title");
  const author = formData.get("author");
  const publishedDate = formData.get("publishedDate");
  const genres = formData.getAll("genres") as string[];
  const image = formData.get("image");
  const description = formData.get("description");

  try {
    // Creating a new book using the Library model
    const newBook = await Library.create({
      title,
      author,
      publishedDate: new Date(publishedDate as string), // Convert date string to Date
      genres,
      image,
      description,
    });
    
    // Saving the new book
    await newBook.save();
    
    // Revalidate the path where the books are listed
    revalidatePath("/books");

    return newBook.toString();
  } catch (error) {
    console.log(error);
    return { message: "Error creating book" };
  }
};
