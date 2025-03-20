import { useState } from 'react'; // import useState from react
import { useNavigate } from 'react-router-dom'; // import useNavigate from react-router-dom
import { toast } from 'react-toastify';   // import toast from react-toastify
import { createPost } from '@/data';  // import createPost from data folder

const CreatePost = () => {
  // useNavigate is a hook that returns a function that lets you navigate programmatically
  const navigate = useNavigate();
 // useState is a hook that lets you add state to your functional components 
  const [{ title, author, image, content }, setForm] = useState({
    title: '',
    author: '',
    image: '',
    content: ''
  });
  // loading is state variable that indicates whether the form is being submitted or not
  const [loading, setLoading] = useState(false);

  // handleChange is a function that updates the state of the form when the user types in the input fields
  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // handleSubmit is a function that handles the form submission when the user clicks the submit button
  const handleSubmit = async e => {
    try {
      // preventDefault is a method that prevents the default behavior of the form submission
      e.preventDefault();
      // check if all fields are filled and throw an error if any field is empty
      if (!title || !author || !image || !content) throw new Error('All fields are required');
      // check if the image URL is valid and throw an error if it is not
      setLoading(true);
      // create a new post using the createPost function from the data folder
      const newPost = await createPost({ title, author, image, content });
    
      // setForm empty to reset the form fields after successful submission
      setForm({ title: '', author: '', image: '', content: '' });
      // navigate to the newly created post using the navigate function from react-router-dom
      navigate(`/post/${newPost._id}`);
    } catch (error) {
      // catch any error that occurs during the form submission and display it using toast
      toast.error(error.message);
    } finally {
      // setLoading to false to indicate that the form submission is complete
      setLoading(false);
    }
  };

  return (
    <form className='md:w-1/2 mx-auto flex flex-col gap-3' onSubmit={handleSubmit}>
      <div className='flex gap-2 justify-between'>
        <label className='form-control grow'>
          <div className='label-text'>Title</div>
          <input
            name='title'
            value={title}
            onChange={handleChange}
            placeholder='A title for your post...'
            className='input input-bordered w-full'
          />
        </label>
        <label className='form-control grow'>
          <div className='label-text'>Author</div>
          <input
            name='author'
            value={author}
            onChange={handleChange}
            placeholder='Your name...'
            className='input input-bordered w-full'
          />
        </label>
      </div>
      <label className='form-control w-full'>
        <div className='label-text'>Image URL</div>
        <input
          name='image'
          value={image}
          onChange={handleChange}
          placeholder='The URL of an image for your post...'
          className='input input-bordered w-full'
        />
      </label>
      <label className='form-control'>
        <div className='label-text'>Content</div>
        <textarea
          name='content'
          value={content}
          onChange={handleChange}
          className='textarea textarea-bordered h-24'
          placeholder='The content of your post...'
        ></textarea>
      </label>
      <button className='btn btn-primary self-center' disabled={loading}>
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
