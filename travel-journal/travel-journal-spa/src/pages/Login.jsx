import { useState } from 'react'; // import useState from react
import { Link } from 'react-router-dom';  // import Link from react-router-dom
import { toast } from 'react-toastify';   // import toast from react-toastify

const Login = () => {
  // set State for email and password using useState hook
  const [{ email, password }, setForm] = useState({
    email: '',
    password: ''
  });
  // set State for loading using useState hook
  const [loading, setLoading] = useState(false);

  // handleChange function to update the state of email and password when the user types in the input fields
  // It takes an event object as an argument and updates the state using the setForm function
  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // handleSubmit function to handle the form submission when the user clicks the submit button
  const handleSubmit = async e => {

    try {
      // preventDefault is a method that prevents the default behavior of the form submission
      e.preventDefault();

      // check if all fields are filled and throw an error if any field is empty
      if (!email || !password) throw new Error('All fields are required');
      // setLoading to true to indicate that the form submission is in progress
      setLoading(true);
      // console.log is used to log the email and password to the console for debugging purposes
      console.log(email, password);

    } catch (error) {
      // catch any error that occurs during the form submission t
      toast.error(error.message);
    } finally {
      // setLoading to false to indicate that the form submission is complete
      setLoading(false);
    }
  };

  return (
    <form className='my-5 md:w-1/2 mx-auto flex flex-col gap-3' onSubmit={handleSubmit}>
      <label className='input input-bordered flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='h-4 w-4 opacity-70'
        >
          <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
          <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
        </svg>
        <input
          name='email'
          value={email}
          onChange={handleChange}
          type='email'
          className='grow'
          placeholder='Email'
        />
      </label>
      <label className='input input-bordered flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='h-4 w-4 opacity-70'
        >
          <path
            fillRule='evenodd'
            d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
            clipRule='evenodd'
          />
        </svg>
        <input
          name='password'
          value={password}
          onChange={handleChange}
          type='password'
          className='grow'
          placeholder='Password'
        />
      </label>
      <small>
        Don&apos;t have an account?{' '}
        <Link to='/register' className='text-primary hover:underline'>
          Register!
        </Link>
      </small>
      <button className='btn btn-primary self-center' disabled={loading}>
        Login
      </button>
    </form>
  );
};

export default Login;
