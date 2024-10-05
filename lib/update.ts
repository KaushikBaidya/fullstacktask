'use server';
import Library from "@/models/libraryModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./db";

export const updateBook = async (formData: FormData) => {
  await connectToMongoDB();
  
  // Extracting the book ID and updated fields from formData
  const bookId = formData.get("id");
  const title = formData.get("title");
  const author = formData.get("author");
  const publishedDate = formData.get("publishedDate");
  const genres = formData.getAll("genres") as string[];
  const image = formData.get("image");
  const description = formData.get("description");

  try {
    // Updating the book using the Library model
    await Library.updateOne(
      { _id: bookId },
      {
        $set: {
          title,
          author,
          publishedDate: new Date(publishedDate as string),
          genres,
          image,
          description,
        },
      }
    );
    
    // Revalidate the path where the books are listed
    revalidatePath("/books");

    return "Book updated";
  } catch (error) {
    console.log(error);
    return { message: "Error updating book" };
  }
};
