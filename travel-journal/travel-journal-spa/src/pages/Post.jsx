import { useEffect, useState } from 'react'; // import useEffect and useState from react
import { useParams } from 'react-router-dom';  // import useParams from react-router-dom
import { getSinglePost } from '@/data';   // import getSinglePost from data folder
import { PostSkeleton } from '@/components';  // import PostSkeleton from components folder
import { toast } from 'react-toastify'; // import toast from react-toastify

const Post = () => {
  const { id } = useParams();  // useParams is a hook that returns an object of key/value pairs of URL parameters
  const [loading, setLoading] = useState(true);  // loading is state variable that indicates whether the post is being fetched or not
  const [post, setPost] = useState(null);  // post is state variable that stores the post fetched from the API


  // useEffect is a hook that lets you perform side effects in your functional components
  useEffect(() => {
    (async () => {
      try {
        // Fetch a single post by ID from the API using the getSinglePost function from the data folder
        const posts = await getSinglePost(id);
        // setPost is a function that updates the state of the post variable with the fetched post
        setPost(posts);
      } catch (error) {
        // catch any error that occurs during the fetching and display it using toast
        toast.error(error.message);
      } finally {
        // setLoading to false to indicate that the post fetching is complete
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <PostSkeleton />;
  return (
    <>
      <h1 className='text-center text-4xl'>{post.title}</h1>
      <img src={post.image} alt={post.title} className='rounded-lg max-h-96 mx-auto' />
      <p>{post.content}</p>
    </>
  );
};

export default Post;
