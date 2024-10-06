'use server';
import Library from "@/models/libraryModel";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./db";

export const updateBook = async (formData: FormData, updatedData: { genres: string[]; title: string; author: string; publishedDate: string; image: string; description: string; }) => {
  await connectToMongoDB();
  
  // Extracting the book ID and updated fields from formData
  const bookId = formData.get("id") as string | null;
  const title = formData.get("title") as string | null;
  const author = formData.get("author") as string | null;
  const publishedDate = formData.get("publishedDate") as string | null;
  const genres = formData.getAll("genres") as string[];
  const image = formData.get("image") as string | null;
  const description = formData.get("description") as string | null;

  // Check if required fields are present
  if (!bookId || !title || !author || !publishedDate || !genres || !image) {
    return { success: false, message: "Required fields are missing" };
  }

  try {
    // Updating the book using the Library model
    await Library.updateOne(
      { _id: bookId },
      {
        $set: {
          title,
          author,
          publishedDate: new Date(publishedDate),
          genres,
          image,
          description,
        },
      }
    );
    
    // Revalidate the path where the books are listed
    revalidatePath("/books");

    return { success: true, message: "Book updated successfully" };
  } catch (error) {
    console.error("Error updating book:", error);
    return { success: false, message: "Error updating book" };
  }
};


// 'use server';
// import Library from "@/models/libraryModel";
// import { revalidatePath } from "next/cache";
// import { connectToMongoDB } from "./db";

// export const updateBook = async (formData: FormData, updatedData: { genres: string[]; title: string; author: string; publishedDate: string; image: string; description: string; }) => {
//   await connectToMongoDB();
  
//   // Extracting the book ID and updated fields from formData
//   const bookId = formData.get("id");
//   const title = formData.get("title");
//   const author = formData.get("author");
//   const publishedDate = formData.get("publishedDate");
//   const genres = formData.getAll("genres") as string[];
//   const image = formData.get("image");
//   const description = formData.get("description");

//   try {
//     // Updating the book using the Library model
//     await Library.updateOne(
//       { _id: bookId },
//       {
//         $set: {
//           title,
//           author,
//           publishedDate: new Date(publishedDate as string),
//           genres,
//           image,
//           description,
//         },
//       }
//     );
    
//     // Revalidate the path where the books are listed
//     revalidatePath("/books");

//     return "Book updated";
//   } catch (error) {
//     console.log(error);
//     return { message: "Error updating book" };
//   }
// };
