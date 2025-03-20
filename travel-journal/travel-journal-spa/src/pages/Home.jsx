import { useEffect, useState } from 'react';  // import useEffect and useState from react
import { toast } from 'react-toastify';   // import toast from react-toastify
import { getPosts } from '@/data';    // import getPosts from data folder
import { PostCard, PostsSkeleton } from '@/components';   // import PostCard and PostsSkeleton from components folder


const Home = () => {
  const [loading, setLoading] = useState(true); // loading is state variable that indicates whether the posts are being fetched or not
  const [posts, setPosts] = useState([]);  // posts is state variable that stores the array of posts fetched from the API

  // useEffect is a hook that lets you perform side effects in your functional components
  // It takes a function that runs after the component renders and an array of dependencies that determine when the effect should run
  useEffect(() => {
    (async () => {
      try {
        // Fetch all posts from the API using the getPosts function from the data folder
        const posts = await getPosts();
        // setPosts is a function that updates the state of the posts variable with the fetched posts
        setPosts(posts);

      } catch (error) {
        // catch any error that occurs during the fetching and display it using toast
        toast.error(error.message);


      } finally {
        // setLoading to false to indicate that the posts fetching is complete
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <PostsSkeleton />;
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 '>
      {posts.map(post => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  );
};

export default Home;
