import { useSSRPostsState } from "atoms/postAtom";
import { handlePostState } from "atoms/postAtom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Input from "./Input";
import Post from './Post';
import { PostResponse } from '../interfaces/post.interface';

interface FeedProps {
  posts: PostResponse[]
}
const Feed = ({posts}:FeedProps) => {

  const [realTimePosts, setRealTimePosts] = useState<{posts:PostResponse[]}>()
  const [handlePost, setHandlePost] = useRecoilState<boolean>(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState<boolean>(useSSRPostsState);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      setRealTimePosts(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };
    fetchPosts();
  }, [handlePost, setHandlePost, setUseSSRPosts]);
  
  // console.log(realTimePosts, 'posts')

  return (
    <div className="space-y-6 pb-24 max-w-lg ">
      <Input />
      {/* Posts List */}
      {/* Server Side Hybrid */}
      {!useSSRPosts 
        ? realTimePosts?.posts?.map((post: PostResponse) => (<Post key={post._id} post={post} modalPost={false} />))
        : posts.map((post: PostResponse) => (<Post key={post._id} post={post} modalPost={false} />))
      }

    </div>
  );
};
export default Feed;
