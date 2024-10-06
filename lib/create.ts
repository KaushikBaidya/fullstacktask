'use server';
import Library from "@/models/libraryModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./db";

export const createBook = async (formData: FormData) => {
  await connectToMongoDB();
  

  const title = formData.get("title");
  const author = formData.get("author");
  const publishedDate = formData.get("publishedDate");
  const genres = formData.getAll("genres") as string[];
  const image = formData.get("image");
  const description = formData.get("description");

  try {

    const newBook = await Library.create({
      title,
      author,
      publishedDate: new Date(publishedDate as string), 
      genres,
      image,
      description,
    });
    
  
    await newBook.save();
    
    revalidatePath("/books");

    return newBook.toString();
  } catch (error) {
    console.log(error);
    return { message: "Error creating book" };
  }
};
