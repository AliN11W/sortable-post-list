import { API_URL } from "@/constants/index";
import { PostType } from "@/types";

export default function usePost() {
  const fetchPosts = async (
    limit: number
  ): Promise<{ posts?: PostType[]; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/posts`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      let posts = await response.json();

      // Limit the number of posts as it is not done on the server
      posts = posts.slice(0, limit);

      // Add a custom title to each post as requested
      posts.forEach((post: PostType) => {
        post.title = `Post ${post.id}`;
      });

      return { posts };
    } catch (error) {
      console.error(error);
      return { error: "An error occurred while fetching the posts." };
    }
  };

  return {
    fetchPosts,
  };
}
