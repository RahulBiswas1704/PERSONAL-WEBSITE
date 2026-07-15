import { getSortedPosts } from "@/lib/posts";
import HomeThemeRouter from "@/components/HomeThemeRouter";

export default function Home() {
  // We fetch server-side data here (reading from the filesystem)
  const posts = getSortedPosts().slice(0, 3); // Get latest 3 posts

  // We pass the data into our Client-side Theme Router
  return <HomeThemeRouter posts={posts} />;
}
