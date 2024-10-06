'use server';
import Library from '@/models/libraryModel';
import { connectToMongoDB } from '@/lib/db';

export const deleteBook = async (id: string) => {
  await connectToMongoDB();
  try {
    await Library.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting book:', error);
    return { success: false, message: 'Error deleting book' };
  }
};

